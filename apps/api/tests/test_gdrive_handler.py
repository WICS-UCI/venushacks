from __future__ import annotations

from dataclasses import dataclass
from unittest.mock import AsyncMock, MagicMock, patch

from services import gdrive_handler

SAMPLE_NAME = "my-file-name"
SAMPLE_FOLDER_ID = "my-folder-id"
SAMPLE_BYTES = b"my-bytes"
SAMPLE_FILE_TYPE = "my-file-type"
SAMPLE_OUTPUT_ID = "12345"
UPLOAD_PATH = (
    "https://www.googleapis.com/upload/drive/v3/files?fields=id&supportsAllDrives=True"
)


@dataclass
class _FakeMediaUpload:
    upload_path: str
    multipart: bool = True


@dataclass
class _FakeRequest:
    method: str
    media_upload: _FakeMediaUpload
    json: dict[str, object]
    upload_file_content_type: str | None = None


class _FakeFilesResource:
    def create(
        self,
        *,
        upload_file: bytes,
        fields: str,
        json: dict[str, object],
        supportsAllDrives: bool,
    ) -> _FakeRequest:
        # Mimic key properties used by the unit test without a network call.
        _ = (upload_file, fields, supportsAllDrives)
        return _FakeRequest(
            method="POST",
            media_upload=_FakeMediaUpload(upload_path=UPLOAD_PATH, multipart=True),
            json=json,
        )


class _FakeDriveV3:
    files = _FakeFilesResource()


@patch("services.gdrive_handler._get_credentials")
@patch("aiogoogle.Aiogoogle.as_service_account")
@patch("aiogoogle.Aiogoogle.discover")
async def test_upload_single_file(
    mock_discover: AsyncMock,
    mock_asServiceAccount: AsyncMock,
    mock_getCredentials: MagicMock,
) -> None:
    """Test whether the Request object sent to the
    Google Drive API is generated properly."""
    mock_getCredentials.return_value = None
    mock_discover.return_value = _FakeDriveV3()
    mock_asServiceAccount.return_value = {"id": SAMPLE_OUTPUT_ID}

    output = await gdrive_handler.upload_file(
        SAMPLE_FOLDER_ID, SAMPLE_NAME, SAMPLE_BYTES, SAMPLE_FILE_TYPE
    )

    mock_asServiceAccount.assert_called_once()

    request = mock_asServiceAccount.call_args.args[0]
    assert request.method == "POST"
    assert request.media_upload.upload_path == UPLOAD_PATH
    assert request.json == {
        "name": SAMPLE_NAME,
        "parents": [SAMPLE_FOLDER_ID],
    }
    assert request.upload_file_content_type == SAMPLE_FILE_TYPE
    assert request.media_upload.multipart

    assert output == gdrive_handler.GOOGLE_DRIVE_URL + SAMPLE_OUTPUT_ID
