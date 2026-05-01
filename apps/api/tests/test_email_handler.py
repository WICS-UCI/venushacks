from unittest.mock import AsyncMock, patch

from models.ApplicationData import Decision
from models.user_record import Role
from services.sendgrid_handler import ApplicationUpdatePersonalization, Template
from utils import email_handler
from utils.email_handler import VH_SENDER, VH_REPLY_TO


@patch("services.sendgrid_handler.send_email")
async def test_send_hacker_decision_email(
    mock_sendgrid_handler_send_email: AsyncMock,
) -> None:
    users = [
        ("test1", "test1@uci.edu"),
        ("test2", "test2@uci.edu"),
        ("test3", "test3@uci.edu"),
    ]

    expected_personalizations = [
        ApplicationUpdatePersonalization(first_name=name, email=email)
        for name, email in users
    ]

    await email_handler.send_decision_email(users, Decision.ACCEPTED, Role.HACKER)

    mock_sendgrid_handler_send_email.assert_called_once_with(
        Template.HACKER_ACCEPTED_EMAIL,
        VH_SENDER,
        expected_personalizations,
        True,
        reply_to=VH_REPLY_TO,
    )


@patch("services.sendgrid_handler.send_email")
async def test_send_mentor_decision_email(
    mock_sendgrid_handler_send_email: AsyncMock,
) -> None:
    users = [
        ("mentor1", "mentor1@uci.edu"),
        ("mentor2", "mentor2@uci.edu"),
        ("mentor3", "mentor3@uci.edu"),
    ]

    expected_personalizations = [
        ApplicationUpdatePersonalization(first_name=name, email=email)
        for name, email in users
    ]

    await email_handler.send_decision_email(users, Decision.REJECTED, Role.MENTOR)

    mock_sendgrid_handler_send_email.assert_called_once_with(
        Template.MENTOR_REJECTED_EMAIL,
        VH_SENDER,
        expected_personalizations,
        True,
        reply_to=VH_REPLY_TO,
    )


@patch("services.sendgrid_handler.send_email")
async def test_send_volunteer_decision_email(
    mock_sendgrid_handler_send_email: AsyncMock,
) -> None:
    users = [
        ("volunteer1", "volunteer1@uci.edu"),
        ("volunteer2", "volunteer2@uci.edu"),
        ("volunteer3", "volunteer3@uci.edu"),
    ]

    expected_personalizations = [
        ApplicationUpdatePersonalization(first_name=name, email=email)
        for name, email in users
    ]

    await email_handler.send_decision_email(users, Decision.REJECTED, Role.VOLUNTEER)

    mock_sendgrid_handler_send_email.assert_called_once_with(
        Template.VOLUNTEER_REJECTED_EMAIL,
        VH_SENDER,
        expected_personalizations,
        True,
        reply_to=VH_REPLY_TO,
    )
