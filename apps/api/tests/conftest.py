import os


def pytest_configure() -> None:
    """
    Ensure test collection is deterministic regardless of the developer shell env.

    In particular, `src/app.py` conditionally mounts `/dev/*` routes when
    `DEPLOYMENT=LOCAL`. 
    """
    os.environ.pop("DEPLOYMENT", None)
