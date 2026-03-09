from fastapi.testclient import TestClient

from auth import user_identity
from routers import dev

client = TestClient(dev.router)


def test_impersonate() -> None:
    """Test the dev token can provide a valid user identity."""
    res = client.get("/impersonate/stuffed", follow_redirects=False)

    assert res.status_code == 303
    assert res.headers["location"] == "/portal"
    set_cookie = res.headers["Set-Cookie"].split(";")[0]
    cookie_name, cookie_value = set_cookie.split("=")
    assert cookie_name == "venushacks_auth"

    # Confirm identity is valid and decodable
    identity = user_identity._decode_user_identity(cookie_value)
    assert identity is not None
    assert identity.uid == "edu.uci.stuffed"
