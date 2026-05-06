from unittest.mock import ANY, AsyncMock, patch

from fastapi import FastAPI

from auth import user_identity
from auth.user_identity import NativeUser, UserTestClient
from models.ApplicationData import Decision
from models.user_record import Role, Status
from routers import waiver
from services.mongodb_handler import Collection

user_identity.JWT_SECRET = "not a good idea"

USER_APPLICANT = NativeUser(
    ucinetid="apply",
    display_name="Apply",
    email="apply@uci.edu",
    affiliations=["student"],
)

APPLICANT_IDENTITY = {
    "_id": "edu.uci.apply",
    "roles": [Role.APPLICANT],
    "status": Decision.ACCEPTED,
    "first_name": "Apply",
    "last_name": "User",
}

WAIVER_DOCUMENT = {
    "version": "v-2026-a",
    "text": "I agree to the terms and conditions.",
}

VALID_WAIVER_BODY = {
    "full_signature": "Apply User",
    "acknowledged": True,
    "waiver_version": "v-2026-a",
    "waiver_text": "I agree to the terms and conditions.",
}

app = FastAPI()
app.include_router(waiver.router, prefix="/waiver")

applicant_client = UserTestClient(USER_APPLICANT, app)


@patch("routers.waiver.send_waiver_confirmation_email", autospec=True)
@patch("routers.waiver.process_waiver_completion", autospec=True)
@patch("services.mongodb_handler.insert", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_submit_waiver_success(
    mock_retrieve_one: AsyncMock,
    mock_insert: AsyncMock,
    mock_process_waiver_completion: AsyncMock,
    mock_send_email: AsyncMock,
) -> None:
    """Successful waiver submission inserts a record and sends a confirmation email."""
    mock_retrieve_one.side_effect = [
        APPLICANT_IDENTITY,
        APPLICANT_IDENTITY,
        WAIVER_DOCUMENT,
    ]
    mock_insert.return_value = None
    mock_process_waiver_completion.return_value = None
    mock_send_email.return_value = None

    res = applicant_client.post("/waiver", json=VALID_WAIVER_BODY)

    assert res.status_code == 200

    mock_retrieve_one.assert_any_await(
        Collection.WAIVER_DOCUMENTS,
        {"version": "v-2026-a"},
        ["text"],
    )

    mock_insert.assert_awaited_once_with(
        Collection.WAIVER_SIGNATURES,
        {
            "user_id": "edu.uci.apply",
            "full_signature": "Apply User",
            "timestamp": ANY,
            "signer_ip": ANY,
            "waiver_text_hash": ANY,
            "waiver_version": "v-2026-a",
            "user_agent": ANY,
        },
    )

    mock_send_email.assert_awaited_once_with(
        email="apply@uci.edu",
        first_name="Apply",
        last_name="User",
        full_signature="Apply User",
        timestamp=ANY,
        waiver_text=WAIVER_DOCUMENT["text"],
    )


@patch("routers.waiver.send_waiver_confirmation_email", autospec=True)
@patch("services.mongodb_handler.update_one", autospec=True)
@patch("services.mongodb_handler.insert", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_submit_waiver_updates_user_status(
    mock_retrieve_one: AsyncMock,
    mock_insert: AsyncMock,
    mock_update_one: AsyncMock,
    mock_send_email: AsyncMock,
) -> None:
    mock_retrieve_one.side_effect = [
        APPLICANT_IDENTITY,
        APPLICANT_IDENTITY,
        WAIVER_DOCUMENT,
        APPLICANT_IDENTITY,
    ]
    mock_insert.return_value = None
    mock_update_one.return_value = True
    mock_send_email.return_value = None

    res = applicant_client.post("/waiver", json=VALID_WAIVER_BODY)

    assert res.status_code == 200

    mock_retrieve_one.assert_any_await(
        Collection.WAIVER_DOCUMENTS,
        {"version": "v-2026-a"},
        ["text"],
    )

    mock_update_one.assert_awaited_once_with(
        Collection.USERS,
        {"_id": "edu.uci.apply"},
        {"status": Status.WAIVER_SIGNED},
    )


@patch("routers.waiver.send_waiver_confirmation_email", autospec=True)
@patch("routers.waiver.process_waiver_completion", autospec=True)
@patch("services.mongodb_handler.insert", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_duplicate_waiver_submission_is_allowed(
    mock_retrieve_one: AsyncMock,
    mock_insert: AsyncMock,
    mock_process_waiver_completion: AsyncMock,
    mock_send_email: AsyncMock,
) -> None:
    mock_retrieve_one.side_effect = [
        APPLICANT_IDENTITY,
        APPLICANT_IDENTITY,
        WAIVER_DOCUMENT,
    ]
    mock_insert.return_value = None
    mock_process_waiver_completion.return_value = None
    mock_send_email.return_value = None

    res = applicant_client.post("/waiver", json=VALID_WAIVER_BODY)

    assert res.status_code == 200
    mock_insert.assert_awaited_once()


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_empty_signature_is_rejected(mock_retrieve_one: AsyncMock) -> None:
    mock_retrieve_one.return_value = APPLICANT_IDENTITY
    res = applicant_client.post(
        "/waiver", json={**VALID_WAIVER_BODY, "full_signature": ""}
    )
    assert res.status_code == 422


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_whitespace_only_signature_is_rejected(mock_retrieve_one: AsyncMock) -> None:
    mock_retrieve_one.return_value = APPLICANT_IDENTITY
    res = applicant_client.post(
        "/waiver", json={**VALID_WAIVER_BODY, "full_signature": "     "}
    )
    assert res.status_code == 422


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_special_characters_only_signature_is_rejected(
    mock_retrieve_one: AsyncMock,
) -> None:
    mock_retrieve_one.return_value = APPLICANT_IDENTITY
    res = applicant_client.post(
        "/waiver", json={**VALID_WAIVER_BODY, "full_signature": "12345!@#$%"}
    )
    assert res.status_code == 422


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_extremely_long_signature_is_rejected(mock_retrieve_one: AsyncMock) -> None:
    mock_retrieve_one.return_value = APPLICANT_IDENTITY
    res = applicant_client.post(
        "/waiver", json={**VALID_WAIVER_BODY, "full_signature": "A" * 10_000}
    )
    assert res.status_code == 422


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_unacknowledged_waiver_is_rejected(mock_retrieve_one: AsyncMock) -> None:
    """A submission without acknowledged=True should be rejected."""
    mock_retrieve_one.return_value = APPLICANT_IDENTITY
    res = applicant_client.post(
        "/waiver", json={**VALID_WAIVER_BODY, "acknowledged": False}
    )
    assert res.status_code == 400


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_get_waiver_document(mock_retrieve_one: AsyncMock) -> None:
    """Getting a waiver document by version returns the document."""
    mock_retrieve_one.return_value = WAIVER_DOCUMENT

    res = applicant_client.get("/waiver", params={"version": "v-2026-a"})

    assert res.status_code == 200
    assert res.json() == WAIVER_DOCUMENT
    mock_retrieve_one.assert_awaited_once_with(
        Collection.WAIVER_DOCUMENTS,
        {"version": "v-2026-a"},
        ["version", "text"],
    )


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_get_waiver_document_not_found(mock_retrieve_one: AsyncMock) -> None:
    """Getting a waiver document for an unknown version returns 404."""
    mock_retrieve_one.return_value = None

    res = applicant_client.get("/waiver", params={"version": "v-does-not-exist"})

    assert res.status_code == 404
    mock_retrieve_one.assert_awaited_once()
