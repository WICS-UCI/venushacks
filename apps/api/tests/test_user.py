from unittest.mock import AsyncMock, patch

from fastapi import FastAPI, status
from fastapi.testclient import TestClient

from auth.user_identity import GuestUser, UserTestClient
from models.ApplicationData import Decision
from models.user_record import Role, Status
from routers import user
from services.mongodb_handler import Collection

app = FastAPI()
app.include_router(user.router)

client = TestClient(app, follow_redirects=False)

# def test_login_as_uci_redirects_to_saml() -> None:
#     """Tests that logging in with UCI email redirects to SAML for UCI SSO"""
#     res = client.post("/login", data={"email": "hack@uci.edu"}, follow_redirects=False)
#     assert res.status_code == status.HTTP_303_SEE_OTHER
#     assert res.headers["location"] == "/api/saml/login?return_to=%2Fportal"

def test_login_as_non_uci_redirects_to_guest_login() -> None:
    """Test that logging in with a non-UCI email redirects to guest login endpoint."""
    res = client.post(
        "/login?return_to=%2Fbooks",
        data={"email": "jeff@amazon.com"},
        follow_redirects=False,
    )
    assert res.status_code == status.HTTP_307_TEMPORARY_REDIRECT
    assert res.headers["location"] == "/api/guest/login?return_to=%2Fbooks"


def test_logout() -> None:
    """Test that logging out removes the authentication cookie."""
    res = client.get("/logout")
    assert res.status_code == status.HTTP_303_SEE_OTHER
    assert res.headers["location"] == "/"
    assert res.headers["Set-Cookie"].startswith('venushacks_auth=""; Max-Age=0;')


def test_no_identity_when_unauthenticated() -> None:
    """Test that identity is empty when not authenticated."""
    res = client.get("/me")
    data = res.json()
    assert data == {"uid": None, "status": None, "roles": []}


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_plain_identity_when_no_user_record(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that identity contains just uid when there is no associated user record."""
    mock_mongodb_handler_retrieve_one.return_value = None
    client = UserTestClient(GuestUser(email="tree@stanford.edu"), app)
    res = client.get("/me")

    mock_mongodb_handler_retrieve_one.assert_awaited_once_with(
        Collection.USERS, {"_id": "edu.stanford.tree"}, ["roles", "status"]
    )
    data = res.json()
    assert data == {"uid": "edu.stanford.tree", "status": None, "roles": []}


@patch("services.mongodb_handler.update_one", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_user_with_status_waiver_signed_rsvp_changes_status_to_confirmed(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mongodb_handler_update_one: AsyncMock,
) -> None:
    """Test user with WAIVER_SIGNED status has new status of CONFIRMED after RSVP."""
    mock_mongodb_handler_retrieve_one.return_value = {"status": Status.WAIVER_SIGNED}

    client = UserTestClient(GuestUser(email="tree@stanford.edu"), app)
    res = client.post("/rsvp", follow_redirects=False)

    mock_mongodb_handler_update_one.assert_awaited_once_with(
        Collection.USERS, {"_id": "edu.stanford.tree"}, {"status": Status.CONFIRMED}
    )

    assert res.status_code == 303


@patch("services.mongodb_handler.update_one", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_user_with_status_confirmed_un_rsvp_changes_status_to_waiver_signed(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mongodb_handler_update_one: AsyncMock,
) -> None:
    """Test user with WAIVER_SIGNED status has new status of CONFIRMED after RSVP."""
    mock_mongodb_handler_retrieve_one.return_value = {"status": Status.CONFIRMED}

    client = UserTestClient(GuestUser(email="tree@stanford.edu"), app)
    res = client.post("/rsvp", follow_redirects=False)

    mock_mongodb_handler_update_one.assert_awaited_once_with(
        Collection.USERS, {"_id": "edu.stanford.tree"}, {"status": Status.WAIVER_SIGNED}
    )

    assert res.status_code == 303


@patch("services.mongodb_handler.update_one", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_user_with_status_attending_un_rsvp_changes_status_to_void(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mongodb_handler_update_one: AsyncMock,
) -> None:
    """Test user with ATTENDING status has new status of VOID after RSVP."""
    mock_mongodb_handler_retrieve_one.return_value = {"status": Status.ATTENDING}

    client = UserTestClient(GuestUser(email="tree@stanford.edu"), app)
    res = client.post("/rsvp", follow_redirects=False)

    mock_mongodb_handler_update_one.assert_awaited_once_with(
        Collection.USERS, {"_id": "edu.stanford.tree"}, {"status": Status.VOID}
    )

    assert res.status_code == 303


@patch("services.mongodb_handler.update_one", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_user_with_status_accepted_un_rsvp_returns_403(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mongodb_handler_update_one: AsyncMock,
) -> None:
    """Test user with ACCEPTED status has no status change after RSVP."""
    mock_mongodb_handler_retrieve_one.return_value = {"status": Decision.ACCEPTED}

    client = UserTestClient(GuestUser(email="tree@stanford.edu"), app)
    res = client.post("/rsvp", follow_redirects=False)

    mock_mongodb_handler_update_one.assert_not_awaited()

    assert res.status_code == 403


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_user_me_route_returns_correct_type(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test user me route returns correct fields as listed in user.IdentityResponse"""
    mock_mongodb_handler_retrieve_one.return_value = {
        "status": Status.WAIVER_SIGNED,
        "roles": [Role.VOLUNTEER],
    }

    client = UserTestClient(GuestUser(email="tree@stanford.edu"), app)
    res = client.get("/me")
    data = res.json()

    assert data == {
        "uid": "edu.stanford.tree",
        "status": Status.WAIVER_SIGNED,
        "roles": [Role.VOLUNTEER],
    }
