import copy
import json
from datetime import datetime, timezone
from unittest.mock import AsyncMock, Mock, patch

import bson
from aiogoogle import HTTPError
from fastapi import FastAPI
from pydantic import HttpUrl

from auth.user_identity import NativeUser, UserTestClient
from models.ApplicationData import (
    ProcessedHackerApplicationData,
    ProcessedZotHacksHackerApplicationData,
)

from models.user_record import Applicant, Status, Role
from routers import user
from services.mongodb_handler import Collection
from utils import resume_handler

from utils.hackathon_context import HackathonName
from middleware.hackathon_context_middleware import HackathonContextMiddleware

# Tests will break again next year, tech should notice and fix :P
TEST_DEADLINE = datetime(2026, 10, 1, 8, 0, 0, tzinfo=timezone.utc)
user.DEADLINE = TEST_DEADLINE

USER_EMAIL = "pkfire@uci.edu"
USER_PKFIRE = NativeUser(
    ucinetid="pkfire",
    display_name="pkfire",
    email=USER_EMAIL,
    affiliations=["pkfire"],
)

SAMPLE_APPLICATION = {
    "first_name": "pk",
    "last_name": "fire",
    "pronouns": ["pk"],
    "ethnicity": "fire",
    "is_18_older": "true",
    "school": "UC Irvine",
    "education_level": "Fifth+ Year Undergraduate",
    "major": "Computer Science",
    "is_first_hackathon": "false",
    "linkedin": "",
    "portfolio": "https://github.com",
    "frq_change": "I am pkfire",
    "frq_video_game": "I am pkfire",
    "application_type": "Hacker",
    "email": "pkfire@uci.edu",
}

SAMPLE_ZOTHACKS_HACKER_APPLICATION = {
    "first_name": "pk",
    "last_name": "fire",
    "pronouns": ["pk"],
    "is_18_older": "false",
    "school_year": "2nd Year",
    "dietary_restrictions": ["No pork"],
    "allergies": "s",
    "major": "Computer Science",
    "hackathon_experience": "veteran",
    "elevator_pitch_saq": "s",
    "tech_experience_saq": "ss",
    "learn_about_self_saq": "s",
    "pixel_art_saq": "sss",
    "pixel_art_data": json.dumps([0] * 64),
    "comments": "a",
    "application_type": "Hacker",
}


SAMPLE_RESUME = ("my-resume.pdf", b"resume", "application/pdf")
SAMPLE_FILES = {"resume": SAMPLE_RESUME}
BAD_RESUME = ("bad-resume.doc", b"resume", "application/msword")
LARGE_RESUME = ("large-resume.pdf", b"resume" * 2_000_000, "application/pdf")
# The browser will send an empty file if not selected
EMPTY_RESUME = (
    "",
    b"",
    "application/octet-stream",
    {"content-disposition": 'form-data; name="resume"; filename=""'},
)

EXPECTED_RESUME_UPLOAD = ("pk-fire-69f2afc2.pdf", b"resume", "application/pdf")
SAMPLE_RESUME_URL = HttpUrl("https://drive.google.com/file/d/...")
SAMPLE_SUBMISSION_TIME = datetime(2024, 1, 12, 8, 1, 21, tzinfo=timezone.utc)
SAMPLE_VERDICT_TIME = None

EXPECTED_APPLICATION_DATA = ProcessedHackerApplicationData(
    **SAMPLE_APPLICATION,  # type: ignore[arg-type]
    resume_url=SAMPLE_RESUME_URL,
    submission_time=SAMPLE_SUBMISSION_TIME,
    verdict_time=SAMPLE_VERDICT_TIME,
)
assert EXPECTED_APPLICATION_DATA.linkedin is None

EXPECTED_APPLICATION_DATA_WITHOUT_RESUME = ProcessedHackerApplicationData(
    **SAMPLE_APPLICATION,  # type: ignore[arg-type]
    resume_url=None,
    submission_time=SAMPLE_SUBMISSION_TIME,
    verdict_time=SAMPLE_VERDICT_TIME,
)

EXPECTED_GLOBAL_FIELD_SCORES = {"hackathon_experience": -1000}

EXPECTED_ZOTHACKS_HACKER_APPLICATION_DATA = ProcessedZotHacksHackerApplicationData(
    **SAMPLE_ZOTHACKS_HACKER_APPLICATION,  # type: ignore[arg-type]
    resume_url=SAMPLE_RESUME_URL,
    submission_time=SAMPLE_SUBMISSION_TIME,
    reviews=[],
    review_breakdown={},
    global_field_scores=EXPECTED_GLOBAL_FIELD_SCORES,
    email=USER_EMAIL,
)

EXPECTED_USER = Applicant(
    uid="edu.uci.pkfire",
    first_name="pk",
    last_name="fire",
    roles=(Role.APPLICANT, Role.HACKER),
    status=Status.PENDING_REVIEW,
    application_data=EXPECTED_APPLICATION_DATA,
)

EXPECTED_USER_WITHOUT_RESUME = Applicant(
    uid="edu.uci.pkfire",
    first_name="pk",
    last_name="fire",
    roles=(Role.APPLICANT, Role.HACKER),
    status=Status.PENDING_REVIEW,
    application_data=EXPECTED_APPLICATION_DATA_WITHOUT_RESUME,
)

EXPECTED_ZOTHACKS_HACKER_USER = Applicant(
    uid="edu.uci.pkfire",
    first_name="pk",
    last_name="fire",
    roles=(Role.APPLICANT, Role.HACKER),
    status=Status.PENDING_REVIEW,
    application_data=EXPECTED_ZOTHACKS_HACKER_APPLICATION_DATA,
)


resume_handler.FOLDER_MAP = {
    HackathonName.VENUSHACK: {
        "Hacker": "HACKER_RESUMES_FOLDER_ID",
        "Mentor": "MENTOR_RESUMES_FOLDER_ID",
    },
    HackathonName.ZOTHACKS: {
        "Hacker": "HACKER_RESUMES_FOLDER_ID",
        "Mentor": "MENTOR_RESUMES_FOLDER_ID",
    },
}

app = FastAPI()
app.include_router(user.router)
app.add_middleware(HackathonContextMiddleware)

client = UserTestClient(USER_PKFIRE, app)
client.headers.update({"X-Hackathon-Name": HackathonName.VENUSHACK})


@patch("utils.email_handler.send_application_confirmation_email", autospec=True)
@patch("services.mongodb_handler.update_one", autospec=True)
@patch("routers.user._is_past_deadline", autospec=True)
@patch("routers.user.datetime", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_successfully(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_datetime: Mock,
    mock_is_past_deadline: Mock,
    mock_mongodb_handler_update_one: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that a valid application is submitted properly."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.return_value = SAMPLE_RESUME_URL
    mock_datetime.now.return_value = SAMPLE_SUBMISSION_TIME
    mock_is_past_deadline.return_value = False
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    mock_gdrive_handler_upload_file.assert_awaited_once_with(
        resume_handler.FOLDER_MAP[HackathonName.VENUSHACK]["Hacker"],
        *EXPECTED_RESUME_UPLOAD,
    )
    mock_mongodb_handler_update_one.assert_awaited_once_with(
        Collection.USERS,
        {"_id": EXPECTED_USER.uid},
        EXPECTED_USER.model_dump(),
        upsert=True,
    )
    mock_send_application_confirmation_email.assert_awaited_once_with(
        USER_EMAIL, EXPECTED_USER, Role.HACKER
    )
    assert res.status_code == 201


@patch("utils.email_handler.send_application_confirmation_email", autospec=True)
@patch("services.mongodb_handler.update_one", autospec=True)
@patch("routers.user._is_past_deadline", autospec=True)
@patch("routers.user.datetime", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_zothacks_hacker_apply_successfully(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_datetime: Mock,
    mock_is_past_deadline: Mock,
    mock_mongodb_handler_update_one: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that a valid application is submitted properly."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.return_value = SAMPLE_RESUME_URL
    mock_datetime.now.return_value = SAMPLE_SUBMISSION_TIME
    mock_is_past_deadline.return_value = False
    res = client.post(
        "/apply", data=SAMPLE_ZOTHACKS_HACKER_APPLICATION, files=SAMPLE_FILES
    )

    mock_gdrive_handler_upload_file.assert_awaited_once_with(
        resume_handler.FOLDER_MAP[HackathonName.ZOTHACKS]["Hacker"],
        *EXPECTED_RESUME_UPLOAD,
    )
    mock_mongodb_handler_update_one.assert_awaited_once_with(
        Collection.USERS,
        {"_id": EXPECTED_ZOTHACKS_HACKER_USER.uid},
        EXPECTED_ZOTHACKS_HACKER_USER.model_dump(),
        upsert=True,
    )
    mock_send_application_confirmation_email.assert_awaited_once_with(
        USER_EMAIL, EXPECTED_ZOTHACKS_HACKER_USER, Role.HACKER
    )
    assert res.status_code == 201


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_invalid_data_causes_422(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that applying with invalid data is unprocessable."""
    bad_application = copy.deepcopy(SAMPLE_APPLICATION)
    bad_application["is_18_older"] = "maybe"
    res = client.post("/apply", data=bad_application, files=SAMPLE_FILES)

    mock_mongodb_handler_retrieve_one.assert_not_called()
    assert res.status_code == 422


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_invalid_application_type_causes_422(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that applying with invalid data is unprocessable."""
    bad_application = copy.deepcopy(SAMPLE_APPLICATION)
    bad_application["application_type"] = "NotValid"
    res = client.post("/apply", data=bad_application, files=SAMPLE_FILES)

    mock_mongodb_handler_retrieve_one.assert_not_called()
    assert res.status_code == 422


@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_when_user_exists_causes_400(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
) -> None:
    """Test that applying when a user already exists causes status 400."""
    mock_mongodb_handler_retrieve_one.return_value = {
        "_id": "edu.uci.pkfire",
        "roles": ["applicant"],
    }
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    mock_gdrive_handler_upload_file.assert_not_called()
    assert res.status_code == 400


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_invalid_resume_type_causes_415(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that applying with an invalid resume type is unprocessable."""
    mock_mongodb_handler_retrieve_one.return_value = None
    res = client.post("/apply", data=SAMPLE_APPLICATION, files={"resume": BAD_RESUME})

    assert res.status_code == 415


@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_large_resume_causes_413(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
) -> None:
    """Test that a request with a resume over the size limit causes status 413."""
    mock_mongodb_handler_retrieve_one.return_value = None
    res = client.post("/apply", data=SAMPLE_APPLICATION, files={"resume": LARGE_RESUME})

    mock_gdrive_handler_upload_file.assert_not_called()
    assert res.status_code == 413


@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_resume_upload_issue_causes_500(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
) -> None:
    """Test that an issue with the resume upload causes status 500."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.side_effect = HTTPError("Google Drive error")

    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    assert res.status_code == 500


@patch("utils.email_handler.send_application_confirmation_email", autospec=True)
@patch("services.mongodb_handler.update_one", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_user_insert_issue_causes_500(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_mongodb_handler_update_one: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that an issue with inserting a user into MongoDB causes status 500."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.return_value = SAMPLE_RESUME_URL
    mock_mongodb_handler_update_one.side_effect = RuntimeError
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    assert res.status_code == 500
    mock_mongodb_handler_update_one.assert_awaited_once()
    mock_send_application_confirmation_email.assert_not_called()


@patch("utils.email_handler.send_application_confirmation_email", autospec=True)
@patch("services.mongodb_handler.update_one", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_confirmation_email_issue_causes_500(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_mongodb_handler_update_one: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that an issue with sending the confirmation email causes status 500."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.return_value = SAMPLE_RESUME_URL
    mock_send_application_confirmation_email.side_effect = RuntimeError

    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    assert res.status_code == 500
    mock_mongodb_handler_update_one.assert_awaited_once()
    mock_send_application_confirmation_email.assert_awaited_once()


@patch("utils.email_handler.send_application_confirmation_email", autospec=True)
@patch("services.mongodb_handler.update_one", autospec=True)
@patch("routers.user._is_past_deadline", autospec=True)
@patch("routers.user.datetime", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_successfully_without_resume(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_datetime: Mock,
    mock_is_past_deadline: Mock,
    mock_mongodb_handler_update_one: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that a valid application is submitted properly without a resume."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_datetime.now.return_value = SAMPLE_SUBMISSION_TIME
    mock_is_past_deadline.return_value = False

    res = client.post("/apply", data=SAMPLE_APPLICATION, files={"resume": EMPTY_RESUME})

    assert res.status_code == 201
    mock_gdrive_handler_upload_file.assert_not_called()
    mock_mongodb_handler_update_one.assert_awaited_once_with(
        Collection.USERS,
        {"_id": EXPECTED_USER.uid},
        EXPECTED_USER_WITHOUT_RESUME.model_dump(),
        upsert=True,
    )
    mock_send_application_confirmation_email.assert_awaited_once_with(
        USER_EMAIL, EXPECTED_USER_WITHOUT_RESUME, Role.HACKER
    )


def test_application_data_is_bson_encodable() -> None:
    """Test that application data model can be encoded into BSON to store in MongoDB."""
    data = EXPECTED_APPLICATION_DATA.model_copy()
    data.linkedin = HttpUrl("https://linkedin.com")
    encoded = bson.encode(EXPECTED_APPLICATION_DATA.model_dump())
    assert len(encoded) == 404


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_application_data_with_other_throws_422(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    mock_mongodb_handler_retrieve_one.return_value = None
    contains_other = copy.deepcopy(SAMPLE_APPLICATION)
    contains_other["pronouns"].append("other")  # type: ignore[attr-defined]
    res = client.post("/apply", data=contains_other, files=SAMPLE_FILES)
    assert res.status_code == 422


def test_past_deadline_causes_403() -> None:
    """Test that users are forbidden from submitting applications past the deadline."""
    user.DEADLINE = datetime(2023, 12, 18, 20, 0, 0, tzinfo=timezone.utc)

    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)
    assert res.status_code == 403

    user.DEADLINE = TEST_DEADLINE
