from datetime import datetime, timezone, timedelta
from logging import getLogger
from typing import Annotated, Any, Union, Optional
from urllib.parse import urlencode
import traceback

from fastapi import (
    APIRouter,
    Depends,
    Form,
    HTTPException,
    Request,
    status,
)
from fastapi.datastructures import URL, FormData
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, EmailStr, TypeAdapter, ValidationError

from auth import user_identity
from auth.user_identity import User, require_user_identity, use_user_identity
from models.ApplicationData import (
    FIELDS_SUPPORTING_OTHER,
    ProcessedApplicationDataUnion,
    RawHackerApplicationData,
    RawMentorApplicationData,
    RawVolunteerApplicationData,
    get_raw_hacker_discriminator_value,
    get_raw_mentor_discriminator_value,
)
from models.user_record import Applicant, Role, Status
from services import mongodb_handler
from services.mongodb_handler import Collection
from utils import email_handler, resume_handler

log = getLogger(__name__)

router = APIRouter()

PDT = timezone(timedelta(hours=-7))
DEADLINE = datetime(2026, 5, 3, 23, 59, tzinfo=PDT)

HACKATHON_EXPERIENCE_SCORE_MAP = {
    "first_time": 5,
    "some_experience": 0,
    "veteran": -1000,
}


class IdentityResponse(BaseModel):
    uid: Union[str, None] = None
    status: Union[str, None] = None
    roles: list[Role] = []
    submission_time: Union[datetime, None] = None


class DemographicInfo(BaseModel):
    pronouns: str
    ethnicity: str
    race: list[str]


class RSVPRequest(BaseModel):
    demographic_info: Optional[DemographicInfo] = None


def _is_past_deadline(now: datetime) -> bool:
    return now > DEADLINE


@router.post("/login")
async def login(
    email: EmailStr = Form(), return_to: str = "/portal"
) -> RedirectResponse:
    log.info("%s requested to log in", email)
    query = urlencode({"return_to": return_to})

    # if user_identity.uci_email(email) and user_identity.UCI_SSO_ENABLED:
    #     # redirect user for UCI SSO, changing to GET method
    #     return RedirectResponse(
    #         URL(path="/api/saml/login", query=query), status.HTTP_303_SEE_OTHER
    #     )

    # Forward POST request to guest login
    return RedirectResponse(
        URL(path="/api/guest/login", query=query), status.HTTP_307_TEMPORARY_REDIRECT
    )


@router.get("/logout")
async def logout() -> RedirectResponse:
    """Clear user identity cookie."""
    response = RedirectResponse("/", status.HTTP_303_SEE_OTHER)
    user_identity.remove_user_identity(response)
    return response


@router.get("/me")
async def me(
    user: Annotated[Union[User, None], Depends(use_user_identity)],
) -> IdentityResponse:
    log.info(user)
    if not user:
        return IdentityResponse()
    user_record = await mongodb_handler.retrieve_one(
        Collection.USERS, {"_id": user.uid}, ["roles", "status", "application_data"]
    )

    if not user_record:
        return IdentityResponse(uid=user.uid)

    submission_time = None

    app_data = user_record.get("application_data")
    if app_data:
        submission_time = app_data.get("submission_time")

    return IdentityResponse(
        uid=user.uid,
        roles=user_record.get("roles", []),
        status=user_record.get("status"),
        submission_time=submission_time,
    )


@router.post("/apply", status_code=status.HTTP_201_CREATED)
async def apply(
    user: Annotated[User, Depends(require_user_identity)],
    request: Request,
) -> str:
    form = await request.form()
    data = _parsed_form(form)

    discriminator = get_raw_hacker_discriminator_value(data)
    raw_application_data: Union[RawHackerApplicationData]
    try:
        if discriminator == "hacker":
            log.info(data)
            raw_application_data = RawHackerApplicationData.model_validate(data)
        else:
            raise ValueError("Cannot determine hacker application type")
    except ValidationError as e:
        log.info(
            "An error occurred while submitting an application for %s: %s\n%s",
            user,
            e,
            traceback.format_exc(),
        )
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, e.errors())

    return await _apply_flow(user, raw_application_data)


@router.post("/mentor", status_code=status.HTTP_201_CREATED)
async def mentor(
    user: Annotated[User, Depends(require_user_identity)], request: Request
) -> str:
    form = await request.form()
    data = _parsed_form(form)

    # Manually determine model to use
    discriminator = get_raw_mentor_discriminator_value(data)
    raw_application_data: Union[RawMentorApplicationData]
    try:
        if discriminator == "mentor":
            log.info(data)
            raw_application_data = RawMentorApplicationData.model_validate(data)
        else:
            raise HTTPException(
                status.HTTP_422_UNPROCESSABLE_ENTITY,
                "Cannot determine mentor application type",
            )
    except ValidationError as e:
        log.error(e.errors())
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, str(e))

    return await _apply_flow(user, raw_application_data)


@router.post("/volunteer", status_code=status.HTTP_201_CREATED)
async def volunteer(
    user: Annotated[User, Depends(require_user_identity)],
    request: Request,
) -> str:
    form = await request.form()
    data = _parsed_form(form)
    try:
        raw_application_data = RawVolunteerApplicationData.model_validate(data)
    except ValidationError as e:
        log.error(e.errors())
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, str(e))
    return await _apply_flow(user, raw_application_data)


async def _apply_flow(
    user: User,
    raw_application_data: Union[
        RawHackerApplicationData,
        RawMentorApplicationData,
        RawVolunteerApplicationData,
    ],
) -> str:
    """Common flow for all three types of applications."""
    # Check if current datetime is past application deadline
    now = datetime.now(timezone.utc)

    if _is_past_deadline(now):
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Applications have closed.")

    # check if user already has a role
    existing_record = await mongodb_handler.retrieve_one(
        Collection.USERS, {"_id": user.uid, "roles": {"$exists": True}}, ["roles"]
    )

    if existing_record and existing_record.get("roles"):
        log.error(
            "User %s already has role %s but tried to apply.",
            user,
            existing_record["roles"],
        )
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "User already has a role.")

    raw_app_data_dump = raw_application_data.model_dump()

    # Reject unprocessed other values
    for field in FIELDS_SUPPORTING_OTHER:
        value = raw_app_data_dump.get(field)
        if value == "other" or (isinstance(value, list) and "other" in value):
            raise HTTPException(
                status.HTTP_422_UNPROCESSABLE_ENTITY,
                "Please enable JavaScript on your browser.",
            )

    resume = raw_application_data.resume
    # Browsers send an empty UploadFile when no file is selected (filename == "").
    if resume is not None and resume.filename:
        try:
            resume_url = await resume_handler.upload_resume(
                TypeAdapter(
                    Union[
                        RawHackerApplicationData,
                        RawMentorApplicationData,
                    ]
                ).validate_python(raw_application_data),
                resume,
            )
        except TypeError as err:
            log.info(
                "An error occurred while submitting an application for %s: %s\n%s",
                user,
                err,
                traceback.format_exc(),
            )
            raise HTTPException(status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
        except ValueError as err:
            log.info(
                "An error occurred while submitting an application for %s: %s\n%s",
                user,
                err,
                traceback.format_exc(),
            )
            raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE)
        except RuntimeError as err:
            log.error("During user %s apply, resume upload: %s", user.uid, err)
            raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        resume_url = None

    application_type = raw_application_data.application_type

    # Note: spreading is assumed to be safe since form data was already validated once
    processed_application_data = TypeAdapter[ProcessedApplicationDataUnion](
        ProcessedApplicationDataUnion
    ).validate_python(
        {
            **raw_app_data_dump,
            "resume_url": resume_url,
            "email": user.email,
            "submission_time": now,
        }
    )

    applicant = Applicant(
        uid=user.uid,
        first_name=raw_application_data.first_name,
        last_name=raw_application_data.last_name,
        roles=(Role.APPLICANT, Role(application_type)),
        application_data=processed_application_data,
        status=Status.PENDING_REVIEW,
    )

    # add applicant to database
    try:
        await mongodb_handler.update_one(
            Collection.USERS,
            {"_id": user.uid},
            applicant.model_dump(),
            upsert=True,
        )
    except RuntimeError:
        log.error("Could not insert applicant %s to MongoDB.", user.uid)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        await email_handler.send_application_confirmation_email(
            user.email, applicant, application_type
        )
    except RuntimeError:
        log.error("Could not send confirmation email with SendGrid to %s.", user.uid)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    # TODO: handle inconsistent results if one service fails

    log.info("%s submitted an application", user.uid)
    return (
        "Thank you for submitting an application to VenusHacks 2026! Please "
        + "visit https://venushacks.com/portal to see your application status."
    )


@router.post("/rsvp")
async def rsvp(
    user: Annotated[User, Depends(require_user_identity)],
    body: RSVPRequest = RSVPRequest(),
) -> None:
    """Change user status for RSVP"""
    user_record = await mongodb_handler.retrieve_one(
        Collection.USERS, {"_id": user.uid}, ["status"]
    )

    if not user_record or "status" not in user_record:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "User must have a status.")

    new_status: Status
    if user_record["status"] == Status.WAIVER_SIGNED:
        new_status = Status.CONFIRMED
    elif user_record["status"] == Status.CONFIRMED:
        new_status = Status.WAIVER_SIGNED
    elif user_record["status"] == Status.ATTENDING:
        new_status = Status.VOID
    else:
        log.warning(f"User {user.uid} has not signed waiver. Status has not changed.")
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            "Waiver must be signed before being able to RSVP.",
        )

    update: dict[str, object] = {"status": new_status}

    if body.demographic_info:
        update["demographic_info"] = body.demographic_info.model_dump()

    await mongodb_handler.update_one(Collection.USERS, {"_id": user.uid}, update)

    old_status = user_record["status"]
    log.info(f"User {user.uid} changed status from {old_status} to {new_status}.")


def _parsed_form(form: FormData) -> dict[str, Any]:
    """Manually parse form data.
    This function combines repeated keys into lists

    Normally, FastAPI will automatically parse the same key into a list
    ex. ...skills=Java&skills=C&skills=C++ will be parsed as ["Java", "C", "C++"]

    This function is needed for the mentor application form because
    discriminated unions don't work with FastAPI's Annotated Form()
    """

    # Fields that should always be lists, even with single values
    MULTI_SELECT_FIELDS = {
        "experienced_technologies",
        "skills",
        "areas_of_development",
        "friday_availability",
        "saturday_availability",
        "sunday_availability",
    }

    data: dict[str, Any] = {}
    for k, v in form.multi_items():
        if k in data:
            if isinstance(data[k], list):
                data[k].append(v)
            else:
                data[k] = [data[k], v]
        else:
            data[k] = v

    OTHER_PREFIX = "_other_"
    for k in list(data.keys()):
        if k.startswith(OTHER_PREFIX):
            actual_field = k[len(OTHER_PREFIX) :]
            if actual_field in data and data[actual_field] == "other":
                data[actual_field] = data[k]
            del data[k]

    # Ensure multi-select fields are always lists
    for field in MULTI_SELECT_FIELDS:
        if field in data and not isinstance(data[field], list):
            data[field] = [data[field]]

    return data


def _add_auto_scores_if_any(
    processed_application_data: ProcessedApplicationDataUnion,
) -> None:
    return
    # if not isinstance(
    #     processed_application_data, ProcessedHackerApplicationData
    # ):
    #     return

    # # Only hackathon_experience is auto-scored for now
    # processed_application_data.global_field_scores = {
    #     "hackathon_experience": HACKATHON_EXPERIENCE_SCORE_MAP[
    #         processed_application_data.hackathon_experience
    #     ]
    # }
