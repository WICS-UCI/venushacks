import base64
import hashlib
import random
from contextlib import asynccontextmanager
from logging import getLogger
from typing import Any, AsyncIterator, Iterable, Union
from unittest.mock import patch

from fastapi import FastAPI, Response
from fastapi.responses import RedirectResponse

from services.sendgrid_handler import Template
from utils import resume_handler

log = getLogger(__name__)

_HACKER_RESUMES_FOLDER_ID = "1a_Hacker_Resumes"
_MENTOR_RESUMES_FOLDER_ID = "1b_Mentor_Resumes"

_FOLDER_MAP = {
    "Hacker": _HACKER_RESUMES_FOLDER_ID,
    "Mentor": _MENTOR_RESUMES_FOLDER_ID,
}


def mock_set_cookie(self: RedirectResponse, *args: Any, **kwargs: Any) -> None:
    """Allow cookies on non-https for local development."""
    kwargs["secure"] = False
    return Response.set_cookie(self, *args, **kwargs)


async def mock_send_email(
    template_id: Template,
    sender_email: tuple[str, str],
    receiver_data: Union[dict[str, str], Iterable[dict[str, str]]],
    send_to_multiple: bool = False,
) -> None:
    """Mock sending of email through SendGrid."""
    if send_to_multiple:
        log.info(
            "Simulating sending %s email to %s", template_id.name, list(receiver_data)
        )
    else:
        log.info("Simulating sending %s email to %s", template_id.name, receiver_data)


async def mock_upload_file(
    folder_id: str, file_name: str, file_bytes: bytes, file_type: str
) -> str:
    """Mock uploading file to Google Drive."""
    log.info(
        "Simulating upload of file %s (%s, %s bytes) to %s",
        file_name,
        file_type,
        len(file_bytes),
        folder_id,
    )
    digest = base64.b64encode(hashlib.sha256(file_bytes).digest() + random.randbytes(7))
    file_id = digest.decode().replace("+", "_").replace("/", "_")
    return f"https://drive.venushacks.com/file/NOT_REAL/1c{file_id}"


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Patch usage of external services for local development."""

    # Important: these must be imported as `from services import handler`
    # rather than `from services.handler import function` when used to be patched
    patch("services.gdrive_handler.upload_file", new=mock_upload_file).start()
    patch("services.sendgrid_handler.send_email", new=mock_send_email).start()

    patch.object(
        resume_handler,
        "HACKER_RESUMES_FOLDER_ID",
        new=_HACKER_RESUMES_FOLDER_ID,
    ).start()
    patch.object(
        resume_handler,
        "MENTOR_RESUMES_FOLDER_ID",
        new=_MENTOR_RESUMES_FOLDER_ID,
    ).start()

    patch.object(
        resume_handler,
        "FOLDER_MAP",
        new=_FOLDER_MAP,
    ).start()

    patch.object(RedirectResponse, "set_cookie", new=mock_set_cookie).start()

    yield
    patch.stopall()
