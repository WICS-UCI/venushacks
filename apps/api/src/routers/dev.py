from fastapi import APIRouter
from fastapi.responses import RedirectResponse

from auth import user_identity
from auth.user_identity import NativeUser

router = APIRouter()


@router.get("/impersonate/{ucinetid}")
async def impersonate(ucinetid: str) -> RedirectResponse:
    """Simulate a user identity during local development (does not require https)."""
    user = NativeUser(
        ucinetid=ucinetid,
        display_name="Local Dev",
        email="dev@venushacks.com",
        affiliations=[],
    )

    res = RedirectResponse("/portal", status_code=303)
    user_identity.issue_user_identity(user, res)
    return res
