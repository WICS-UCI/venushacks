from datetime import datetime
from typing import Any
from unittest.mock import ANY, AsyncMock, call, patch

from fastapi import FastAPI

from auth.user_identity import NativeUser, UserTestClient
from models.ApplicationData import Decision
from models.user_record import Role, Status
from routers import director
from services.mongodb_handler import Collection
from services.sendgrid_handler import Template
from utils.email_handler import VH_SENDER


USER_REVIEWER = NativeUser(
    ucinetid="alicia",
    display_name="Alicia",
    email="alicia@uci.edu",
    affiliations=["student"],
)

USER_DIRECTOR = NativeUser(
    ucinetid="dir",
    display_name="Dir",
    email="dir@uci.edu",
    affiliations=["student"],
)

HACKER_REVIEWER_IDENTITY = {
    "_id": "edu.uci.alicia",
    "roles": ["Organizer", "Hacker Reviewer"],
}

DIRECTOR_IDENTITY = {"_id": "edu.uci.dir", "roles": [Role.ORGANIZER, Role.DIRECTOR]}

app = FastAPI()
app.include_router(director.router)

reviewer_client = UserTestClient(USER_REVIEWER, app)

director_client = UserTestClient(USER_DIRECTOR, app)

SAMPLE_ORGANIZER = {
    "email": "albert@uci.edu",
    "first_name": "Albert",
    "last_name": "Wang",
    "roles": [Role.ORGANIZER],
}

EXPECTED_ORGANIZER = director.OrganizerSummary(
    uid="edu.uci.albert", first_name="Albert", last_name="Wang", roles=[Role.ORGANIZER]
)


@patch("services.mongodb_handler.retrieve", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_can_retrieve_organizers(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mongodb_handler_retrieve: AsyncMock,
) -> None:
    """Test that the organizers can be processed."""

    mock_mongodb_handler_retrieve_one.return_value = DIRECTOR_IDENTITY
    mock_mongodb_handler_retrieve.return_value = [
        {
            "_id": "edu.uci.petr",
            "first_name": "Peter",
            "last_name": "Anteater",
            "roles": ["Organizer"],
        },
    ]

    res = director_client.get("/organizers")

    assert res.status_code == 200
    mock_mongodb_handler_retrieve.assert_awaited_once()
    data = res.json()
    assert data == [
        {
            "_id": "edu.uci.petr",
            "first_name": "Peter",
            "last_name": "Anteater",
            "roles": ["Organizer"],
        },
    ]


@patch("services.mongodb_handler.retrieve_one", autospec=True)
@patch("services.mongodb_handler.update_one", autospec=True)
def test_can_add_organizer(
    mock_mongodb_handler_update_one: AsyncMock,
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that organizers can be added"""
    mock_mongodb_handler_retrieve_one.return_value = DIRECTOR_IDENTITY

    res = director_client.post("/organizers", json=SAMPLE_ORGANIZER)

    mock_mongodb_handler_update_one.assert_awaited_once_with(
        Collection.USERS,
        {"_id": EXPECTED_ORGANIZER.uid},
        EXPECTED_ORGANIZER.model_dump(),
        upsert=True,
    )

    assert res.status_code == 201


@patch("services.sendgrid_handler.send_email", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
@patch("services.mongodb_handler.retrieve", autospec=True)
@patch("services.mongodb_handler.raw_update_one", autospec=True)
def test_apply_reminder_emails(
    mock_mongodb_handler_raw_update_one: AsyncMock,
    mock_mongodb_handler_retrieve: AsyncMock,
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_sendgrid_handler_send_email: AsyncMock,
) -> None:
    """Test that users that haven't submitted an application will be sent an email"""
    mock_mongodb_handler_retrieve_one.side_effect = [
        DIRECTOR_IDENTITY,
        {"recipients": ["edu.uci.emailsent"]},
    ]
    mock_mongodb_handler_retrieve.return_value = [
        {"_id": "edu.uci.emailsent"},
        {"_id": "edu.uci.petr"},
        {"_id": "edu.uci.albert"},
    ]

    res = director_client.post("/apply-reminder")
    assert res.status_code == 200
    mock_mongodb_handler_raw_update_one.return_value = True
    mock_mongodb_handler_raw_update_one.assert_awaited_once_with(
        Collection.EMAILS,
        {"_id": "apply_reminder"},
        {
            "$push": {
                "senders": (ANY, "edu.uci.dir", 2),
                "recipients": {"$each": ["edu.uci.petr", "edu.uci.albert"]},
            },
        },
        upsert=True,
    )

    mock_sendgrid_handler_send_email.assert_awaited_once_with(
        Template.APPLY_REMINDER,
        VH_SENDER,
        [
            {"email": "petr@uci.edu"},
            {"email": "albert@uci.edu"},
        ],
        True,
    )


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_get_apply_reminder_senders(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test getting all senders of apply reminder emails"""
    mock_mongodb_handler_retrieve_one.side_effect = [
        DIRECTOR_IDENTITY,
        {
            "_id": "apply_reminder",
            "senders": [(datetime(2025, 1, 10), "edu.uci.dir", 2)],
        },
    ]

    res = director_client.get("/apply-reminder")
    assert res.status_code == 200
    mock_mongodb_handler_retrieve_one.assert_awaited_with(
        Collection.EMAILS,
        {"_id": "apply_reminder"},
        ["senders"],
    )


@patch("services.mongodb_handler.update", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
@patch("services.mongodb_handler.retrieve", autospec=True)
def test_confirm_attendance_route(
    mock_mongodb_handler_retrieve: AsyncMock,
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mognodb_handler_update: AsyncMock,
) -> None:
    """Test that confirmed status changes to void with accepted."""

    mock_mongodb_handler_retrieve_one.return_value = DIRECTOR_IDENTITY
    mock_mongodb_handler_retrieve.return_value = [
        {
            "_id": "edu.uc.tester",
            "status": Decision.ACCEPTED,
        },
        {
            "_id": "edu.uc.tester2",
            "status": Status.WAIVER_SIGNED,
        },
        {
            "_id": "edu.uc.tester3",
            "status": Status.CONFIRMED,
        },
        {
            "_id": "edu.uc.tester4",
            "status": Decision.WAITLISTED,
        },
    ]

    # Not doing this will result in the return value acting as a mock, which would be
    # tracked in the assert_has_calls below.
    mock_mognodb_handler_update.side_effect = [True, True, True]

    res = director_client.post("/confirm-attendance")

    assert res.status_code == 200
    mock_mongodb_handler_retrieve.assert_awaited_once()
    mock_mognodb_handler_update.assert_has_calls(
        [
            call(
                Collection.USERS,
                {"_id": {"$in": ("edu.uc.tester3",)}},
                {"status": Status.ATTENDING},
            ),
            call(
                Collection.USERS,
                {"_id": {"$in": ("edu.uc.tester",)}},
                {"status": Status.VOID},
            ),
            call(
                Collection.USERS,
                {"_id": {"$in": ("edu.uc.tester2",)}},
                {"status": Status.VOID},
            ),
        ]
    )


@patch("services.mongodb_handler.retrieve_one", autospec=True)
@patch("services.mongodb_handler.raw_update_one", autospec=True)
def test_set_thresholds_correctly(
    mock_mongodb_handler_raw_update_one: AsyncMock,
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that the /set-thresholds route returns correctly"""
    mock_mongodb_handler_retrieve_one.return_value = DIRECTOR_IDENTITY

    res = director_client.post(
        "/set-thresholds", json={"accept": "10", "waitlist": "5"}
    )

    assert res.status_code == 200
    mock_mongodb_handler_raw_update_one.assert_awaited_once_with(
        Collection.SETTINGS,
        {"_id": "hacker_score_thresholds"},
        {"$set": {"accept": 10, "waitlist": 5}},
        upsert=True,
    )


@patch("services.mongodb_handler.retrieve_one", autospec=True)
@patch("services.mongodb_handler.raw_update_one", autospec=True)
def test_set_thresholds_with_empty_string_correctly(
    mock_mongodb_handler_raw_update_one: AsyncMock,
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that the /set-thresholds route returns correctly with -1"""
    mock_mongodb_handler_retrieve_one.return_value = DIRECTOR_IDENTITY

    res = director_client.post(
        "/set-thresholds", json={"accept": "10", "waitlist": "-1"}
    )

    assert res.status_code == 200
    mock_mongodb_handler_raw_update_one.assert_awaited_once_with(
        Collection.SETTINGS,
        {"_id": "hacker_score_thresholds"},
        {"$set": {"accept": 10}},
        upsert=True,
    )


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_organizer_set_thresholds_forbidden(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test whether anyone below a director can change threshold."""
    mock_mongodb_handler_retrieve_one.return_value = HACKER_REVIEWER_IDENTITY

    res = reviewer_client.post(
        "/set-thresholds", json={"accept": "12", "waitlist": "5"}
    )

    assert res.status_code == 403


@patch("routers.director._process_records_in_batches", autospec=True)
@patch("services.mongodb_handler.retrieve", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_release_hacker_decisions_works(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mongodb_handler_retrieve: AsyncMock,
    mock_admin_process_records_in_batches: AsyncMock,
) -> None:
    """Test that the /release/hackers route works"""
    returned_records: list[dict[str, Any]] = [
        {
            "_id": "edu.uci.sydnee",
            "first_name": "sydnee",
            "application_data": {
                "reviews": [
                    [datetime(2023, 1, 19), "edu.uci.alicia", 100],
                    [datetime(2023, 1, 19), "edu.uci.alicia2", 300],
                ]
            },
        }
    ]

    threshold_record: dict[str, Any] = {"accept": 10, "waitlist": 5}

    mock_mongodb_handler_retrieve_one.side_effect = [
        DIRECTOR_IDENTITY,
        threshold_record,
    ]
    mock_mongodb_handler_retrieve.return_value = returned_records
    mock_admin_process_records_in_batches.return_value = None

    res = director_client.post("/release/hackers")

    assert res.status_code == 200
    assert returned_records[0]["decision"] == Decision.ACCEPTED
