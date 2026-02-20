from unittest.mock import AsyncMock, patch

from fastapi import FastAPI, status
from pymongo.errors import DuplicateKeyError

from auth.user_identity import NativeUser, UserTestClient
from models.user_record import Role
from routers import mailing_list
from services.mongodb_handler import Collection

USER_ORGANIZER = NativeUser(
    ucinetid="org",
    display_name="Org",
    email="org@uci.edu",
    affiliations=["student"],
)

app = FastAPI()
app.include_router(mailing_list.router, prefix="/mailing-list")

client = UserTestClient(USER_ORGANIZER, app)

ORGANIZER_IDENTITY = {"_id": USER_ORGANIZER.uid, "roles": [Role.ORGANIZER]}


@patch("services.mongodb_handler.insert", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_post_mailing_list_adds_document(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mongodb_handler_insert: AsyncMock,
) -> None:
    mock_mongodb_handler_retrieve_one.return_value = ORGANIZER_IDENTITY

    payload = {"email": "Test@Example.com", "timeSubmitted": "2026-02-05T12:00:00Z"}
    res = client.post("/mailing-list", json=payload)

    assert res.status_code == status.HTTP_201_CREATED
    mock_mongodb_handler_insert.assert_awaited_once_with(
        Collection.MAILING_LIST,
        {
            "_id": "test@example.com",
            "email": "test@example.com",
            "timeSubmitted": "2026-02-05T12:00:00Z",
        },
    )


@patch("services.mongodb_handler.insert", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_post_mailing_list_invalid_email_returns_error(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mongodb_handler_insert: AsyncMock,
) -> None:
    mock_mongodb_handler_retrieve_one.return_value = ORGANIZER_IDENTITY

    res = client.post(
        "/mailing-list", json={"email": "not-an-email", "timeSubmitted": "x"}
    )

    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert res.json()["detail"] == "Invalid email."
    mock_mongodb_handler_insert.assert_not_awaited()


@patch("services.mongodb_handler.insert", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_post_mailing_list_invalid_body_returns_error(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mongodb_handler_insert: AsyncMock,
) -> None:
    mock_mongodb_handler_retrieve_one.return_value = ORGANIZER_IDENTITY

    # Missing timeSubmitted
    res = client.post("/mailing-list", json={"email": "valid@example.com"})

    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert res.json()["detail"] == (
        "Invalid body. Expected JSON with fields: email (string), "
        "timeSubmitted (string)."
    )
    mock_mongodb_handler_insert.assert_not_awaited()


@patch("services.mongodb_handler.insert", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_post_mailing_list_duplicate_email_returns_error(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mongodb_handler_insert: AsyncMock,
) -> None:
    mock_mongodb_handler_retrieve_one.return_value = ORGANIZER_IDENTITY
    mock_mongodb_handler_insert.side_effect = DuplicateKeyError("E11000 duplicate key")

    res = client.post(
        "/mailing-list",
        json={"email": "dup@example.com", "timeSubmitted": "2026-02-05T12:00:00Z"},
    )

    assert res.status_code == status.HTTP_409_CONFLICT
    assert (
        res.json()["detail"]
        == "Duplicate email: this email is already on the mailing list."
    )
