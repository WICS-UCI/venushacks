import json
import os
import base64


from aiogoogle import Aiogoogle
from aiogoogle.auth.creds import ServiceAccountCreds

GOOGLE_DRIVE_URL = "https://drive.google.com/file/d/"
SCOPES = ["https://www.googleapis.com/auth/drive.file"]


def _get_credentials() -> ServiceAccountCreds:
    """Get the credentials for the service account used to upload files."""
    service_account_file = os.getenv("SERVICE_ACCOUNT_FILE")
    service_account_credentials = os.getenv("GOOGLE_SERVICE_ACCOUNT_CREDENTIALS")

    if service_account_file:
        with open(service_account_file) as f:
            service_account_key = json.load(f)
    elif service_account_credentials:
        service_account_key = json.loads(base64.b64decode(service_account_credentials))
    else:
        raise RuntimeError("Service account credentials not found")

    return ServiceAccountCreds(scopes=SCOPES, **service_account_key)


async def upload_file(
    folder_id: str, file_name: str, file_bytes: bytes, file_type: str
) -> str:
    """Use the aiogoogle library to upload the provided file to the folder with
    the given `folder_id` and return a URL to the uploaded file."""
    creds = _get_credentials()
    async with Aiogoogle(service_account_creds=creds) as aiogoogle:
        drive_v3 = await aiogoogle.discover("drive", "v3")

        # Provide the given file name and set the upload destination by
        # specifying the given folder ID as a parent
        metadata = {"name": file_name, "parents": [folder_id]}

        # Create request object:
        req = drive_v3.files.create(
            upload_file=file_bytes,
            fields="id",
            json=metadata,
            supportsAllDrives=True,
        )

        # Manually set the content type to the type FastAPI provides, so that the
        # Google Drive API doesn't need to.
        req.upload_file_content_type = file_type

        # Upload file
        uploaded_file: dict[str, str] = await aiogoogle.as_service_account(req)
        file_id: str = uploaded_file["id"]

        return GOOGLE_DRIVE_URL + file_id
