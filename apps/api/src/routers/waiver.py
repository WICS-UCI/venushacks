from datetime import datetime
from logging import getLogger
from typing import Annotated, Optional
import hashlib

from fastapi import APIRouter, Body, Depends, HTTPException, Request, status
from pydantic import BaseModel

from auth.authorization import require_role
from auth.user_identity import User, utc_now
from models.user_record import Role
from services import mongodb_handler, email_handler
from services.mongodb_handler import Collection
from utils.email_handler import recover_email_from_uid

log = getLogger(__name__)

router = APIRouter()


class WaiverSignatureRequest(BaseModel):
    full_signature: str
    acknowledged: bool
    waiver_version: str
    waiver_text: str


@router.post("/waiver")
async def submit_waiver(
    request: Request,
    body: WaiverSignatureRequest,
    user: Annotated[User, Depends(require_role({Role.APPLICANT}))],
) -> None:
    """Record a signed waiver acceptance for the authenticated user."""

    if not body.acknowledged:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="Waiver must be acknowledged."
        )

    # Pull canonical waiver text from the waivers collection
    waiver_record = await mongodb_handler.retrieve_one(
        Collection.WAIVER_DOCUMENTS,
        {"version": body.waiver_version},
        ["text"],
    )
    if not waiver_record:
        log.error("Waiver version %s not found in database", body.waiver_version)
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="Invalid waiver version."
        )

    canonical_waiver_text: str = waiver_record["text"]

    # Validate submitted text matches canonical version
    if canonical_waiver_text.strip() != body.waiver_text.strip():
        log.error(
            "%s submitted waiver text that does not match version %s",
            user,
            body.waiver_version,
        )
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="Waiver text does not match expected version."
        )

    # Prevent duplicate submissions
    existing = await mongodb_handler.retrieve_one(
        Collection.WAIVER_ACCEPTANCES,
        {"user_id": user.uid, "waiver_version": body.waiver_version},
    )
    if existing:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            detail="Waiver already signed for this version."
        )

    # Hash the canonical waiver text for the audit trail
    waiver_text_hash = hashlib.sha256(canonical_waiver_text.encode()).hexdigest()

    # Resolve signer IP, x-forwarded-for can be comma-separated if behind multiple proxies
    forwarded_for = request.headers.get("x-forwarded-for")
    signer_ip = (
        forwarded_for.split(",")[0].strip()
        if forwarded_for
        else (request.client.host if request.client else "unknown")
    )

    user_agent = request.headers.get("user-agent", "unknown")
    timestamp = utc_now()

    record = {
        "user_id": user.uid,
        "full_signature": body.full_signature,
        "timestamp": timestamp,
        "signer_ip": signer_ip,
        "waiver_text_hash": waiver_text_hash,
        "waiver_version": body.waiver_version,
        "user_agent": user_agent,
    }

    try:
        await mongodb_handler.insert(Collection.WAIVER_ACCEPTANCES, record)
    except RuntimeError:
        log.error("Could not save waiver acceptance for %s", user.uid)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    log.info("%s signed waiver version %s", user, body.waiver_version)

    try:
        await email_handler.send_waiver_confirmation_email(
            email=recover_email_from_uid(user.uid),
            first_name=body.first_name,
            last_name=body.last_name,
            full_signature=body.full_signature
            timestamp=timestamp,
            waiver_text=canonical_waiver_text,
        )
    except RuntimeError:
        log.error("Could not send waiver confirmation email to %s", user.uid)
