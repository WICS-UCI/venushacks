import logging
import os

from fastapi import FastAPI

from routers import admin, director, guest, mailing_list, saml, user
# from middleware.hackathon_context_middleware import HackathonContextMiddleware

logging.basicConfig(level=logging.INFO)

# TODO: check FastAPI CLI usage instead
if os.getenv("DEPLOYMENT") == "LOCAL":
    from routers import dev
    from utils import dev_mock

    # Set `root_path` for docs to be accessible at localhost:3000/api/docs
    app = FastAPI(root_path="/api/", lifespan=dev_mock.lifespan)
    app.include_router(dev.router, prefix="/dev", tags=["dev"])
else:
    app = FastAPI()

app.include_router(saml.router, prefix="/saml", tags=["saml"])
app.include_router(guest.router, prefix="/guest", tags=["guest"])
app.include_router(user.router, prefix="/user", tags=["user"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])
app.include_router(director.router, prefix="/director", tags=["director"])
app.include_router(mailing_list.router, prefix="/mailing-list", tags=["mailing-list"])

# app.add_middleware(HackathonContextMiddleware)


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "hello"}
