from logging import getLogger
from typing import Annotated
from urllib.parse import urlencode

from fastapi import APIRouter, Cookie, Depends, Form, HTTPException, status
from fastapi.datastructures import URL
from fastapi.responses import RedirectResponse
from pydantic import EmailStr

from auth import guest_auth, user_identity

log = getLogger(__name__)

router = APIRouter()


def guest_email(email: Annotated[EmailStr, Form()]) -> EmailStr:
    """Require a university guest (non-UCI) email as a form field."""
    if user_identity.uci_email(email) and user_identity.UCI_SSO_ENABLED:
        log.info("%s attempted to log in as guest.", email)
        raise HTTPException(
            status.HTTP_403_FORBIDDEN, "UCI affiliates must log in with SSO."
        )
    if email.endswith("@venushacks.com"):
        # TODO: sponsor authentication
        raise HTTPException(status.HTTP_501_NOT_IMPLEMENTED)
    if not email.endswith(".edu"):
        log.info("%s attempted to log in as guest without a .edu address.", email)
        # raise HTTPException(
        #     status.HTTP_403_FORBIDDEN, "Only .edu emails are allowed to log in."
        # )
    return email


@router.post("/login")
async def guest_login(
    email: Annotated[EmailStr, Depends(guest_email)], return_to: str = "/portal"
) -> RedirectResponse:
    """Generate login passphrase and set cookie with confirmation token.
    The initiation will send an email with the passphrase."""
    try:
        confirmation = await guest_auth.initiate_guest_login(email)
    except RuntimeError as err:
        log.exception("During guest login: %s", err)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Redirect to guest login page on client
    # which displays a message to check email and enter passphrase
    query = urlencode({"email": email, "return_to": return_to})
    response = RedirectResponse(
        URL(path="/guest-login", query=query), status.HTTP_303_SEE_OTHER
    )

    if not confirmation:
        log.info("Guest %s recently requested a passphrase, ignoring request.", email)
        return response

    log.info("%s initiated guest login", email)
    response.set_cookie(
        "guest_confirmation", confirmation, max_age=600, secure=True, httponly=True
    )
    return response


@router.post("/verify")
async def verify_guest(
    email: Annotated[EmailStr, Depends(guest_email)],
    passphrase: Annotated[str, Form()],
    guest_confirmation: Annotated[str, Cookie()],
    return_to: str,
) -> RedirectResponse:
    """Verify guest token"""
    if not await guest_auth.verify_guest_credentials(
        email, passphrase, guest_confirmation
    ):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Unauthorized")

    log.info("%s authenticated as guest.", email)
    guest = guest_auth.acquire_guest_identity(email)

    if not return_to.startswith("/"):
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "return_to is not from the same origin"
        )

    res = RedirectResponse(return_to, status_code=status.HTTP_303_SEE_OTHER)
    user_identity.issue_user_identity(guest, res)
    return res
