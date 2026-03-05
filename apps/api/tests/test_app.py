from fastapi.routing import APIRoute
from fastapi.testclient import TestClient

from app import app

client = TestClient(app)


def test_user_identity_accessible() -> None:
    """The user identity route needed in many places should be accessible."""
    res = client.get("/user/me")
    assert res.status_code == 200


def test_dev_routes_inaccessible_by_default() -> None:
    """Dev routes must not be accessible by default."""
    routes: list[APIRoute] = app.routes  # type: ignore[assignment]
    assert not any(route.path.startswith("/dev/") for route in routes)
