from unittest.mock import AsyncMock, patch

import pytest
from aiosendgrid import AsyncSendGridClient
from httpx import HTTPStatusError, Request, Response

from services import sendgrid_handler
from services.sendgrid_handler import ConfirmationPersonalization, Template

SAMPLE_SENDER = ("noreply@venushacks.com", "No Reply VenusHacks")
SAMPLE_RECIPIENTS: list[ConfirmationPersonalization] = [
    {
        "email": "hacker0@uci.edu",
        "first_name": "Hacker",
        "last_name": "Zero",
        "application_type": "Hacker",
    },
    {
        "email": "hacker1@uci.edu",
        "first_name": "Hacker",
        "last_name": "One",
        "application_type": "Hacker",
    },
]


@patch("aiosendgrid.AsyncSendGridClient")
async def test_send_single_email(mock_AsyncClient: AsyncMock) -> None:
    """Tests that sending a single email calls the AsyncClient as expected"""
    mock_client = AsyncMock(AsyncSendGridClient)
    mock_client.send_mail_v3.return_value = Response(202)
    mock_AsyncClient.return_value.__aenter__.return_value = mock_client

    recipient_data = SAMPLE_RECIPIENTS[0]

    await sendgrid_handler.send_email(
        Template.CONFIRMATION_EMAIL, SAMPLE_SENDER, recipient_data
    )
    mock_client.send_mail_v3.assert_awaited_once_with(
        body={
            "from": {
                "name": SAMPLE_SENDER[1],
                "email": SAMPLE_SENDER[0],
            },
            "personalizations": [
                {
                    "to": [{"email": recipient_data["email"]}],
                    "dynamic_template_data": recipient_data,
                }
            ],
            "template_id": Template.CONFIRMATION_EMAIL,
        }
    )


@patch("aiosendgrid.AsyncSendGridClient")
async def test_send_single_email_with_reply_to(mock_AsyncClient: AsyncMock) -> None:
    """Tests that sending a single email calls the AsyncClient as expected"""
    mock_client = AsyncMock(AsyncSendGridClient)
    mock_client.send_mail_v3.return_value = Response(202)
    mock_AsyncClient.return_value.__aenter__.return_value = mock_client

    recipient_data = SAMPLE_RECIPIENTS[0]

    await sendgrid_handler.send_email(
        Template.CONFIRMATION_EMAIL,
        SAMPLE_SENDER,
        recipient_data,
        reply_to=SAMPLE_SENDER,
    )
    mock_client.send_mail_v3.assert_awaited_once_with(
        body={
            "from": {
                "name": SAMPLE_SENDER[1],
                "email": SAMPLE_SENDER[0],
            },
            "personalizations": [
                {
                    "to": [{"email": recipient_data["email"]}],
                    "dynamic_template_data": recipient_data,
                }
            ],
            "template_id": Template.CONFIRMATION_EMAIL,
            "reply_to": {
                "name": SAMPLE_SENDER[1],
                "email": SAMPLE_SENDER[0],
            },
        }
    )


@patch("aiosendgrid.AsyncSendGridClient")
async def test_send_multiple_emails(mock_AsyncClient: AsyncMock) -> None:
    """Tests that sending multiple emails calls the AsyncClient as expected"""
    mock_client = AsyncMock(AsyncSendGridClient)
    mock_client.send_mail_v3.return_value = Response(202)
    mock_AsyncClient.return_value.__aenter__.return_value = mock_client

    await sendgrid_handler.send_email(
        Template.CONFIRMATION_EMAIL,
        SAMPLE_SENDER,
        SAMPLE_RECIPIENTS,
        True,
    )
    mock_client.send_mail_v3.assert_awaited_once_with(
        body={
            "from": {"name": SAMPLE_SENDER[1], "email": SAMPLE_SENDER[0]},
            "personalizations": [
                {
                    "to": [{"email": SAMPLE_RECIPIENTS[1]["email"]}],
                    "dynamic_template_data": SAMPLE_RECIPIENTS[1],
                },
                {
                    "to": [{"email": SAMPLE_RECIPIENTS[0]["email"]}],
                    "dynamic_template_data": SAMPLE_RECIPIENTS[0],
                },
            ],
            "template_id": Template.CONFIRMATION_EMAIL,
        }
    )


@patch("aiosendgrid.AsyncSendGridClient")
async def test_sendgrid_error_causes_runtime_error(mock_AsyncClient: AsyncMock) -> None:
    """Test that an issue with SendGrid causes a RuntimeError"""
    mock_client = AsyncMock(AsyncSendGridClient)
    mock_client.send_mail_v3.side_effect = HTTPStatusError(
        "SendGrid error",
        request=Request("POST", "/v3/mail/send"),
        response=Response(500),
    )

    mock_AsyncClient.return_value.__aenter__.return_value = mock_client

    with pytest.raises(RuntimeError):
        await sendgrid_handler.send_email(
            Template.CONFIRMATION_EMAIL,
            SAMPLE_SENDER,
            SAMPLE_RECIPIENTS,
            True,
        )
