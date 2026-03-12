import time
from unittest.mock import ANY, AsyncMock, Mock, patch

import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from onelogin.saml2.auth import OneLogin_Saml2_Auth
from onelogin.saml2.settings import OneLogin_Saml2_Settings

from auth.user_identity import NativeUser, issue_user_identity
from routers import saml
from services.mongodb_handler import Collection

SSO_URL = "https://shib.service.uci.edu/idp/profile/SAML2/Redirect/SSO"
SAMPLE_SETTINGS = OneLogin_Saml2_Settings(
    {
        "sp": {
            "entityId": "https://irvinehacks.com/shibboleth",
            "assertionConsumerService": {
                "url": "https://irvinehacks.com/api/saml/acs",
            },
        },
        "idp": {
            "entityId": "urn:mace:incommon:uci.edu",
            "singleSignOnService": {
                "url": SSO_URL,
            },
        },
    }
)

patch_saml_settings = patch(
    "routers.saml._get_saml_settings", new=(lambda: SAMPLE_SETTINGS)
)

client = TestClient(saml.router, follow_redirects=False)


@patch_saml_settings
def test_saml_login_redirects() -> None:
    """Tests that the login route redirects to the UCI Shibboleth SSO page"""
    res = client.get("/login")

    assert res.status_code == 307
    location = res.headers["location"]
    assert location.startswith(SSO_URL)
    assert location.endswith("&RelayState=%2F")


@patch_saml_settings
def test_saml_login_sends_relay_state() -> None:
    """Query parameter is turned into relay state with SAML request."""
    res = client.get("/login?return_to=%2Fflux-capacitor")

    assert res.status_code == 307
    location = res.headers["location"]
    assert location.startswith(SSO_URL)
    assert location.endswith("&RelayState=%2Fflux-capacitor")


@patch("routers.saml.issue_user_identity", autospec=True)  # module since direct import
@patch("services.mongodb_handler.update_one", autospec=True)
@patch("routers.saml._get_saml_auth", autospec=True)
def test_saml_acs_succeeds(
    mock_get_saml_auth: Mock,
    mock_mongodb_handler_update_one: AsyncMock,
    mock_issue_user_identity: Mock,
) -> None:
    """Tests that the ACS route can process a valid auth request"""
    mock_auth = Mock(OneLogin_Saml2_Auth)
    mock_get_saml_auth.return_value = mock_auth

    mock_auth.get_errors.return_value = []
    mock_auth.is_authenticated.return_value = True
    sample_attributes = {
        "email": ["hack@uci.edu"],
        "displayName": ["Hack at UCI"],
        "ucinetid": ["hack"],
        "uciaffiliation": ["group"],
    }
    mock_auth.get_friendlyname_attribute = sample_attributes.get
    # do the same thing, but mock will capture calls
    mock_issue_user_identity.side_effect = issue_user_identity

    # specifying raw data rather than using `data` parameter
    res = client.post(
        "/acs",
        content="RelayState=%2Fportal&SAMLResponse=PD94bWwgdmVyc3BvbnNlPg%3D%3D",
        headers={"content-type": "application/x-www-form-urlencoded"},
    )
    assert res.status_code == 303

    mock_auth.process_response.assert_called()
    mock_mongodb_handler_update_one.assert_awaited_once()

    # user is redirected to relay state
    assert res.headers["location"] == "/portal"
    # user identity is parsed properly from friendly-name attributes
    mock_issue_user_identity.assert_called_once_with(
        NativeUser(
            ucinetid="hack",
            display_name="Hack at UCI",
            email="hack@uci.edu",
            affiliations=["group"],
        ),
        ANY,  # the redirect response
    )
    # response sets appropriate JWT cookie for user identity
    assert res.headers["Set-Cookie"].startswith("venushacks_auth=ey")


# One-time code tests
@patch("services.mongodb_handler.insert", autospec=True)
async def test_generate_one_time_code_creates_and_stores_code(
    mock_mongodb_insert: AsyncMock,
) -> None:
    """Test that _generate_one_time_code creates a code and stores it in MongoDB."""
    user = NativeUser(
        ucinetid="testuser",
        display_name="Test User",
        email="test@uci.edu",
        affiliations=["student"],
    )

    mock_mongodb_insert.return_value = "test_code_id"

    code = await saml._generate_one_time_code(user)

    # Verify code is generated (should be a URL-safe string)
    assert isinstance(code, str)
    assert len(code) > 0

    # Verify MongoDB insert was called with correct data
    mock_mongodb_insert.assert_awaited_once()
    call_args = mock_mongodb_insert.await_args
    assert call_args is not None
    assert call_args[0][0] == Collection.CODES  # Collection.CODES
    code_data = call_args[0][1]  # The data dict

    assert code_data["code"] == code
    assert code_data["user"]["ucinetid"] == "testuser"
    assert code_data["user"]["display_name"] == "Test User"
    assert code_data["user"]["email"] == "test@uci.edu"
    assert code_data["user"]["affiliations"] == ["student"]
    assert "expires_at" in code_data
    assert "created_at" in code_data


@patch("services.mongodb_handler.retrieve_one", autospec=True)
@patch("services.mongodb_handler.raw_update_one", autospec=True)
async def test_validate_one_time_code_with_valid_code(
    mock_raw_update_one: AsyncMock,
    mock_retrieve_one: AsyncMock,
) -> None:
    """Test that _validate_one_time_code works with a valid code."""
    current_time = time.time()
    code_data = {
        "code": "valid_code_123",
        "user": {
            "ucinetid": "testuser",
            "display_name": "Test User",
            "email": "test@uci.edu",
            "affiliations": ["student"],
        },
        "expires_at": current_time + 300,  # 5 minutes from now
        "created_at": current_time,
    }

    mock_retrieve_one.return_value = code_data
    mock_raw_update_one.return_value = True

    user = await saml._validate_one_time_code("valid_code_123")

    # Verify user is reconstructed correctly
    assert user.ucinetid == "testuser"
    assert user.display_name == "Test User"
    assert user.email == "test@uci.edu"
    assert user.affiliations == ["student"]

    # Verify code was removed after validation
    mock_raw_update_one.assert_awaited_once_with(
        Collection.CODES, {"code": "valid_code_123"}, {"$unset": {"code": ""}}
    )


@patch("services.mongodb_handler.retrieve_one", autospec=True)
async def test_validate_one_time_code_with_invalid_code(
    mock_retrieve_one: AsyncMock,
) -> None:
    """Test that _validate_one_time_code fails with an invalid code."""
    mock_retrieve_one.return_value = None  # Code not found

    with pytest.raises(HTTPException) as exc_info:
        await saml._validate_one_time_code("invalid_code")

    assert exc_info.value.status_code == 400
    assert "Invalid code" in str(exc_info.value.detail)


@patch("services.mongodb_handler.retrieve_one", autospec=True)
@patch("services.mongodb_handler.raw_update_one", autospec=True)
async def test_validate_one_time_code_with_expired_code(
    mock_raw_update_one: AsyncMock,
    mock_retrieve_one: AsyncMock,
) -> None:
    """Test that _validate_one_time_code fails with an expired code."""
    current_time = time.time()
    code_data = {
        "code": "expired_code_123",
        "user": {
            "ucinetid": "testuser",
            "display_name": "Test User",
            "email": "test@uci.edu",
            "affiliations": ["student"],
        },
        "expires_at": current_time - 100,  # Expired 100 seconds ago
        "created_at": current_time - 400,
    }

    mock_retrieve_one.return_value = code_data
    mock_raw_update_one.return_value = True

    with pytest.raises(HTTPException) as exc_info:
        await saml._validate_one_time_code("expired_code_123")

    assert exc_info.value.status_code == 400
    assert "Code expired" in str(exc_info.value.detail)

    # Verify expired code was cleaned up
    mock_raw_update_one.assert_awaited_once_with(
        Collection.CODES, {"code": "expired_code_123"}, {"$unset": {"code": ""}}
    )


@patch("routers.saml._validate_one_time_code", autospec=True)
@patch("routers.saml.issue_user_identity", autospec=True)
def test_exchange_code_with_valid_code(
    mock_issue_user_identity: Mock,
    mock_validate_one_time_code: AsyncMock,
) -> None:
    """Test that /exchange endpoint works with a valid code."""
    user = NativeUser(
        ucinetid="testuser",
        display_name="Test User",
        email="test@uci.edu",
        affiliations=["student"],
    )

    mock_validate_one_time_code.return_value = user
    mock_issue_user_identity.side_effect = issue_user_identity

    res = client.get("/exchange?code=valid_code_123")

    assert res.status_code == 303
    assert res.headers["location"] == "/"

    # Verify user identity was issued
    mock_issue_user_identity.assert_called_once_with(user, ANY)

    # Verify JWT cookie was set
    assert res.headers["Set-Cookie"].startswith("venushacks_auth=ey")
