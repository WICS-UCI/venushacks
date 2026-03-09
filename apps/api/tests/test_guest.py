from datetime import datetime
from unittest.mock import AsyncMock, Mock, patch

from fastapi import FastAPI
from fastapi.testclient import TestClient

from auth import guest_auth
from auth.guest_auth import GuestAuth, GuestRecord
from routers import guest

app = FastAPI()
app.include_router(guest.router)

client = TestClient(app, follow_redirects=False)

SAMPLE_EMAIL = "beaver@caltech.edu"
SAMPLE_LOGIN_DATA = {"email": SAMPLE_EMAIL}
SAMPLE_PASSPHRASE = "correct-horse-battery-staple"


# def test_non_edu_email_forbidden() -> None:
#     """Test that a guest with a non-edu email is forbidden from logging in."""
#     res = client.post("/login", data={"email": "elon@twitter.com"})
#     assert res.status_code == 403


def test_uci_email_forbidden_as_guest() -> None:
    """Test that a UCI email cannot be used with guest authentication."""
    res = client.post("/login", data={"email": "hack@uci.edu"})
    assert res.status_code == 403


@patch("utils.email_handler.send_guest_login_email", autospec=True)
@patch("auth.guest_auth._save_guest_key", autospec=True)
@patch("auth.guest_auth.utc_now", autospec=True)
@patch("auth.guest_auth._generate_passphrase", autospec=True)
@patch("auth.guest_auth._generate_confirmation_token", autospec=True)
@patch("auth.guest_auth._get_existing_key", autospec=True)
def test_guest_login_initiation(
    mock_get_existing_key: AsyncMock,
    mock_generate_confirmation_token: Mock,
    mock_generate_passphrase: Mock,
    mock_utc_now: Mock,
    mock_save_guest_key: AsyncMock,
    mock_send_guest_login_email: AsyncMock,
) -> None:
    """Test full guest login initiation flow."""

    mock_get_existing_key.return_value = None
    mock_generate_confirmation_token.return_value = "abcdef"
    mock_generate_passphrase.return_value = SAMPLE_PASSPHRASE
    mock_utc_now.return_value = datetime(2023, 2, 4)

    res = client.post("/login?return_to=%2FJPL", data=SAMPLE_LOGIN_DATA)

    mock_save_guest_key.assert_awaited_once_with(
        GuestRecord(
            uid="edu.caltech.beaver",
            guest_auth=GuestAuth(
                iat=datetime(2023, 2, 4),
                exp=datetime(2023, 2, 4, 0, 10, 0),
                key=guest_auth._generate_key("abcdef", SAMPLE_PASSPHRASE),
            ),
        )
    )
    mock_send_guest_login_email.assert_awaited_once_with(
        SAMPLE_EMAIL, SAMPLE_PASSPHRASE
    )

    assert res.status_code == 303
    assert (
        res.headers["location"]
        == "/guest-login?email=beaver%40caltech.edu&return_to=%2FJPL"
    )
    assert res.headers["Set-Cookie"].startswith("guest_confirmation=abcdef;")


@patch("auth.guest_auth._get_existing_key", autospec=True)
def test_requesting_login_when_previous_key_exists_redirects_to_guest_login(
    mock_get_existing_key: AsyncMock,
) -> None:
    """Test that requesting to log in as guest when the user has an existing,
    unexpired key redirects to guest-login, returns 303, and does not
    modify cookie"""

    mock_get_existing_key.return_value = "some-existing-key"
    res = client.post("/login", data=SAMPLE_LOGIN_DATA)

    assert "Set-Cookie" not in res.headers
    assert res.status_code == 303


@patch("auth.guest_auth._remove_guest_key", autospec=True)
@patch("auth.guest_auth._get_existing_key", autospec=True)
def test_successful_guest_verification_provides_identity(
    mock_get_existing_key: AsyncMock,
    mock_remove_guest_key: AsyncMock,
) -> None:
    """Test a guest successfully verifying guest credentials."""
    mock_get_existing_key.return_value = guest_auth._generate_key(
        "some-confirmation", SAMPLE_PASSPHRASE
    )

    res = client.post(
        "/verify?return_to=%2FJPL",
        data={"email": SAMPLE_EMAIL, "passphrase": SAMPLE_PASSPHRASE},
        cookies={"guest_confirmation": "some-confirmation"},
    )
    assert res.status_code == 303
    assert res.headers["Set-Cookie"].startswith("venushacks_auth=")
    assert res.headers["location"] == "/JPL"

    mock_remove_guest_key.assert_awaited_once_with("edu.caltech.beaver")


@patch("auth.guest_auth._remove_guest_key", autospec=True)
@patch("auth.guest_auth._get_existing_key", autospec=True)
def test_invalid_guest_verification_is_unauthorized(
    mock_get_existing_key: AsyncMock,
    mock_remove_guest_key: AsyncMock,
) -> None:
    """Test that a guest with invalid credentials is unauthorized."""
    mock_get_existing_key.return_value = "some-existing-key"

    res = client.post(
        "/verify?return_to=%2FJPL",
        data={
            "email": SAMPLE_EMAIL,
            "passphrase": "bad-passphrase",
        },
        cookies={"guest_confirmation": "not-a-confirmation"},
    )

    assert res.status_code == 401

    mock_remove_guest_key.assert_not_awaited()


@patch("auth.guest_auth._remove_guest_key", autospec=True)
@patch("auth.user_identity.issue_user_identity", autospec=True)
@patch("auth.guest_auth._get_existing_key", autospec=True)
def test_unsuccessful_guest_verification_redirect(
    mock_get_existing_key: AsyncMock,
    mock_issue_user_identity: AsyncMock,
    mock_remove_guest_key: AsyncMock,
) -> None:
    """Test a guest successfully verifying guest credentials."""
    mock_get_existing_key.return_value = guest_auth._generate_key(
        "some-confirmation", SAMPLE_PASSPHRASE
    )

    res = client.post(
        "/verify?return_to=MIT",
        data={"email": SAMPLE_EMAIL, "passphrase": SAMPLE_PASSPHRASE},
        cookies={"guest_confirmation": "some-confirmation"},
    )

    assert res.status_code == 400
    mock_issue_user_identity.assert_not_called()
    mock_remove_guest_key.assert_awaited_once_with("edu.caltech.beaver")
