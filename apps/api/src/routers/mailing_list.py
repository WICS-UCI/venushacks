from logging import getLogger
from typing import Annotated, Any, Mapping

from fastapi import APIRouter, Body, Depends, HTTPException, status
from pydantic import EmailStr, TypeAdapter, ValidationError
from pymongo.errors import DuplicateKeyError

from auth.authorization import require_role
from auth.user_identity import User
from models.user_record import Role
from services import mongodb_handler
from services.mongodb_handler import Collection

log = getLogger(__name__)

router = APIRouter()


def _validate_body(body: Mapping[str, Any]) -> tuple[str, str]:
    email_raw = body.get("email")
    time_submitted = body.get("timeSubmitted")

    if not isinstance(email_raw, str) or not isinstance(time_submitted, str):
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            (
                "Invalid body. Expected JSON with fields: email (string), "
                "timeSubmitted (string)."
            ),
        )

    try:
        validated_email = TypeAdapter(EmailStr).validate_python(email_raw)
    except ValidationError:
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            "Invalid email.",
        )

    return str(validated_email).lower(), time_submitted


@router.post("", status_code=status.HTTP_201_CREATED)
async def add_to_mailing_list(
    body: dict[str, Any] = Body(),
) -> None:
    """Add an email to the mailing list.

    Stores documents in the `mailing_list` collection with unique emails.
    """
    email, time_submitted = _validate_body(body)
    log.info("Adding %s to mailing list", email)

    # use email as _id to enforce uniqueness at the database level.
    doc: Mapping[str, Any] = {
        "_id": email,
        "email": email,
        "timeSubmitted": time_submitted,
    }

    try:
        await mongodb_handler.insert(Collection.MAILING_LIST, doc)
    except DuplicateKeyError:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            "Duplicate email: this email is already on the mailing list.",
        )
    except RuntimeError:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)
