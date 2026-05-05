from logging import getLogger
from typing import Annotated
import hashlib
import re

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, field_validator

from auth.authorization import require_role
from auth.user_identity import User, utc_now
from models.user_record import Role
from services import mongodb_handler
from services.mongodb_handler import Collection
from utils.email_handler import recover_email_from_uid, send_waiver_confirmation_email
from utils.waiver_handler import process_waiver_completion

log = getLogger(__name__)

router = APIRouter()


class WaiverSignatureRequest(BaseModel):
    full_signature: str
    acknowledged: bool
    waiver_version: str
    waiver_text: str

    @field_validator("full_signature")
    @classmethod
    def validate_signature(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Signature must not be empty or whitespace.")
        if not re.search(r"[a-zA-Z]", v):
            raise ValueError("Signature must contain at least one letter.")
        if len(v) > 200:
            raise ValueError("Signature is too long.")
        return v


@router.get("/")
async def get_waiver(version: str) -> dict[str, str]:
    """Retrieve the canonical waiver document for a given version."""
    waiver_record = await mongodb_handler.retrieve_one(
        Collection.WAIVER_DOCUMENTS,
        {"version": version},
        ["version", "text"],
    )
    if not waiver_record:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="Waiver version not found.",
        )
    return waiver_record


@router.post("/")
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

    user_record = await mongodb_handler.retrieve_one(
        Collection.USERS,
        {"_id": user.uid},
        ["first_name", "last_name"],
    )
    if not user_record:
        log.error("Could not retrieve user record for %s", user.uid)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

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

    # Hash the canonical waiver text for the audit trail
    waiver_text_hash = hashlib.sha256(canonical_waiver_text.encode()).hexdigest()

    # Resolve signer IP. With a single trusted proxy, the real client IP is the
    # last entry in x-forwarded-for — earlier entries can be spoofed by the client.
    forwarded_for = request.headers.get("x-forwarded-for")
    signer_ip = (
        forwarded_for.split(",")[-1].strip()
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
        await mongodb_handler.insert(Collection.WAIVER_SIGNATURES, record)
    except RuntimeError:
        log.error("Could not save waiver acceptance for %s", user.uid)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    log.info("%s signed waiver version %s", user, body.waiver_version)

    await process_waiver_completion(
        uid=user.uid,
        email=recover_email_from_uid(user.uid),
    )

    try:
        await send_waiver_confirmation_email(
            email=recover_email_from_uid(user.uid),
            first_name=user_record["first_name"],
            last_name=user_record["last_name"],
            full_signature=body.full_signature,
            timestamp=timestamp,
            waiver_text=canonical_waiver_text,
        )
    except RuntimeError:
        log.error("Could not send waiver confirmation email to %s", user.uid)
