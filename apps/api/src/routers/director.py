import asyncio

from datetime import datetime
from logging import getLogger
from typing import Annotated, Any, Literal, Optional, Sequence, Union

from fastapi import APIRouter, Body, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, TypeAdapter, ValidationError, Field

from admin import applicant_review_processor
from auth.authorization import require_role
from auth.user_identity import User, uci_email, utc_now
from models.ApplicationData import Decision
from models.user_record import Role, Status
from services import mongodb_handler, sendgrid_handler
from services.mongodb_handler import BaseRecord, Collection
from services.sendgrid_handler import (
    ApplicationUpdatePersonalization,
    PersonalizationData,
    Template,
)
from routers.admin import retrieve_thresholds
from utils import email_handler
from utils.email_handler import VH_SENDER, VH_REPLY_TO, recover_email_from_uid
from utils.batched import batched

log = getLogger(__name__)

router = APIRouter()

require_director = require_role({Role.DIRECTOR})


RSVP_REMINDER_EMAIL_TEMPLATES: dict[
    Role,
    Literal[
        Template.HACKER_RSVP_REMINDER,
        Template.MENTOR_RSVP_REMINDER,
        Template.VOLUNTEER_RSVP_REMINDER,
    ],
] = {
    Role.HACKER: Template.HACKER_RSVP_REMINDER,
    Role.MENTOR: Template.MENTOR_RSVP_REMINDER,
    Role.VOLUNTEER: Template.VOLUNTEER_RSVP_REMINDER,
}


class ApplyReminderSenders(BaseModel):
    _id: str
    senders: list[tuple[datetime, str, int]]


class ApplyReminderRecipients(BaseModel):
    _id: str
    recipients: list[str]


class OrganizerSummary(BaseRecord):
    first_name: str
    last_name: str
    roles: list[Role]


class RawOrganizerData(BaseModel):
    email: str
    first_name: str
    last_name: str
    roles: list[Role]


class HackerDecisionRequest(BaseModel):
    accept_count: int = Field(ge=0)
    waitlist_count: int = Field(ge=0)


def uci_scoped_uid(email: EmailStr) -> str:
    """Provide a scoped unique identifier based on the UCI email"""
    local, domain = email.split("@")
    reversed_domains = ".".join(reversed(domain.split(".")))
    cleaned_local = local.replace(".", "..")
    return f"{reversed_domains}.{cleaned_local}"


def roles_includes_organizer(roles: list[Role]) -> bool:
    return Role.ORGANIZER in roles


def roles_includes_applicant(roles: list[Role]) -> bool:
    return Role.APPLICANT in roles


async def _get_apply_reminder_email_recipients() -> Optional[dict[str, Any]]:
    try:
        apply_reminder_recipients = await mongodb_handler.retrieve_one(
            Collection.EMAILS, {"_id": "apply_reminder"}, ["recipients"]
        )
    except RuntimeError:
        log.error("Could not get apply reminder email recipients")
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    return apply_reminder_recipients


@router.get("/organizers")
async def organizers(
    user: Annotated[User, Depends(require_director)]
) -> list[OrganizerSummary]:
    """Get records of all organizers"""
    log.info("%s requested organizer", user)

    records: list[dict[str, object]] = await mongodb_handler.retrieve(
        Collection.USERS, {"roles": Role.ORGANIZER}
    )

    try:
        return TypeAdapter(list[OrganizerSummary]).validate_python(records)
    except ValidationError:
        raise RuntimeError("Could not parse applicant data.")


@router.post("/organizers", status_code=status.HTTP_201_CREATED)
async def add_organizer(
    user: Annotated[User, Depends(require_director)],
    email: EmailStr = Body(),
    first_name: str = Body(),
    last_name: str = Body(),
    roles: list[Role] = Body(),
) -> None:
    """Adds an organizer record"""
    log.info("%s adding organizer", user)

    if not uci_email(email):
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "User doesn't have a UCI email."
        )

    if not roles_includes_organizer(roles):
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "User doesn't have organizer role."
        )

    if roles_includes_applicant(roles):
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "User has submitted an application."
        )

    uid = uci_scoped_uid(email)
    await mongodb_handler.update_one(
        Collection.USERS,
        {"_id": uid},
        {
            "_id": uid,
            "first_name": first_name,
            "last_name": last_name,
            "roles": roles,
        },
        upsert=True,
    )


@router.get("/apply-reminder", dependencies=[Depends(require_director)])
async def get_apply_reminder_senders() -> list[tuple[datetime, str, int]]:
    """Get data about every sender that sent out apply reminder emails"""
    records = await mongodb_handler.retrieve_one(
        Collection.EMAILS, {"_id": "apply_reminder"}, ["senders"]
    )

    if not records:
        log.error("Could not retrieve apply reminder email senders")
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    senders = ApplyReminderSenders.model_validate(records)

    try:
        return TypeAdapter(list[tuple[datetime, str, int]]).validate_python(
            senders.senders
        )
    except ValidationError:
        raise RuntimeError("Could not parse apply reminder email sender data")


@router.post("/apply-reminder")
async def apply_reminder(user: Annotated[User, Depends(require_director)]) -> None:
    """Send email to users who haven't submitted an app"""
    not_yet_applied: list[dict[str, Any]] = await mongodb_handler.retrieve(
        Collection.USERS,
        {"last_login": {"$exists": True}, "roles": {"$exists": False}},
        ["_id"],
    )

    apply_reminder_recipients: Optional[dict[str, Any]] = (
        await _get_apply_reminder_email_recipients()
    )

    if not apply_reminder_recipients:
        log.error("Could not retrieve apply reminder email recipients")
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    validated_recipients = ApplyReminderRecipients.model_validate(
        apply_reminder_recipients
    )

    recipients = set(validated_recipients.recipients)

    personalizations = []
    new_recipients = []
    for record in not_yet_applied:
        if record["_id"] not in recipients:
            new_recipients.append(record["_id"])
            personalizations.append(
                PersonalizationData(
                    email=recover_email_from_uid(record["_id"]),
                )
            )

    log.info(f"{user} sending apply reminder emails to {len(new_recipients)} users")

    try:
        await mongodb_handler.raw_update_one(
            Collection.EMAILS,
            {"_id": "apply_reminder"},
            {
                "$push": {
                    "senders": (utc_now(), user.uid, len(new_recipients)),
                    "recipients": {"$each": new_recipients},
                },
            },
            upsert=True,
        )
    except RuntimeError:
        log.error("Error when attempting to update list of senders and recipients")
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    if len(new_recipients) > 0:
        await sendgrid_handler.send_email(
            Template.APPLY_REMINDER,
            VH_SENDER,
            personalizations,
            True,
            reply_to=VH_REPLY_TO,
        )


async def _rsvp_reminder(
    application_type: Literal[Role.HACKER, Role.MENTOR, Role.VOLUNTEER]
) -> None:
    """Send email to applicants based on application_type who have a status of ACCEPTED
    or WAIVER_SIGNED reminding them to RSVP."""
    # TODO: Consider using Pydantic model validation instead of type annotations
    not_yet_rsvpd: list[dict[str, Any]] = await mongodb_handler.retrieve(
        Collection.USERS,
        {
            "roles": Role(application_type),
            "status": {"$in": [Decision.ACCEPTED, Status.WAIVER_SIGNED]},
        },
        ["_id", "first_name"],
    )

    personalizations = []
    for record in not_yet_rsvpd:
        personalizations.append(
            ApplicationUpdatePersonalization(
                email=recover_email_from_uid(record["_id"]),
                first_name=record["first_name"],
            )
        )

    log.info(
        (
            f"Sending RSVP reminder emails to {len(not_yet_rsvpd)} "
            f"{application_type} applicants"
        )
    )

    if len(not_yet_rsvpd) > 0:
        await sendgrid_handler.send_email(
            RSVP_REMINDER_EMAIL_TEMPLATES[application_type],
            VH_SENDER,
            personalizations,
            True,
            reply_to=VH_REPLY_TO,
        )


@router.post("/rsvp-reminder", dependencies=[Depends(require_director)])
async def rsvp_reminder() -> None:
    """Send email to applicants who have a status of ACCEPTED or WAIVER_SIGNED
    reminding them to RSVP."""
    await _rsvp_reminder(Role.HACKER)
    await _rsvp_reminder(Role.MENTOR)
    await _rsvp_reminder(Role.VOLUNTEER)


@router.post("/confirm-attendance", dependencies=[Depends(require_director)])
async def confirm_attendance() -> None:
    """Update applicant status to void or attending based on their current status."""
    # TODO: consider using Pydantic model, maybe BareApplicant
    records = await mongodb_handler.retrieve(
        Collection.USERS, {"roles": Role.APPLICANT}, ["_id", "status"]
    )

    statuses = {
        Status.CONFIRMED: Status.ATTENDING,
        Decision.ACCEPTED: Status.VOID,
        Status.WAIVER_SIGNED: Status.VOID,
    }

    for status_from, status_to in statuses.items():
        curr_records = [record for record in records if record["status"] == status_from]

        for record in curr_records:
            record["status"] = status_to

        log.info(
            f"Changing status of {len(curr_records)} from {status_from} to {status_to}"
        )

        await asyncio.gather(
            *(
                _process_status(batch, status_to)
                for batch in batched(
                    [str(record["_id"]) for record in curr_records], 100
                )
            )
        )


@router.post("/set-thresholds")
async def set_hacker_score_thresholds(
    user: Annotated[User, Depends(require_director)],
    accept: float = Body(),
    waitlist: float = Body(),
) -> None:
    """
    Sets accepted and waitlisted score thresholds.
    Any score under waitlisted is considered rejected.
    """

    thresholds: Optional[dict[str, float]] = await retrieve_thresholds()

    if accept != -1 and thresholds is not None:
        thresholds["accept"] = accept
    if waitlist != -1 and thresholds is not None:
        thresholds["waitlist"] = waitlist

    if (
        accept < -1
        or accept > 100
        or waitlist < -1
        or waitlist > 100
        or (accept != -1 and waitlist != -1 and waitlist > accept)
        or (thresholds and thresholds["waitlist"] > thresholds["accept"])
    ):
        log.error("Invalid threshold score submitted.")
        raise HTTPException(status.HTTP_400_BAD_REQUEST)

    log.info("%s changed thresholds: Accept-%f | Waitlist-%f", user, accept, waitlist)

    # negative numbers should not be received, but -1 in this case
    # means there is no update to the respective threshold
    update_query = {}
    if accept != -1:
        update_query["accept"] = accept
    if waitlist != -1:
        update_query["waitlist"] = waitlist

    try:
        await mongodb_handler.raw_update_one(
            Collection.SETTINGS,
            {"_id": "hacker_score_thresholds"},
            {"$set": update_query},
            upsert=True,
        )
    except RuntimeError:
        log.error(
            "%s could not change thresholds: Accept-%f | Waitlist-%f",
            user,
            accept,
            waitlist,
        )
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.post("/release/mentor-volunteer", dependencies=[Depends(require_director)])
async def release_mentor_volunteer_decisions() -> None:
    """Update applicant status based on decision and send decision emails."""
    mentor_records = await mongodb_handler.retrieve(
        Collection.USERS,
        {"status": Status.REVIEWED, "roles": {"$in": [Role.MENTOR]}},
        ["_id", "application_data.reviews", "first_name"],
    )

    for record in mentor_records:
        applicant_review_processor.include_review_decision(record)

    volunteer_records = await mongodb_handler.retrieve(
        Collection.USERS,
        {"status": Status.REVIEWED, "roles": {"$in": [Role.VOLUNTEER]}},
        ["_id", "application_data.reviews", "first_name"],
    )

    for record in volunteer_records:
        applicant_review_processor.include_review_decision(record)

    await _process_records_in_batches(mentor_records, Role.MENTOR)
    await _process_records_in_batches(volunteer_records, Role.VOLUNTEER)


@router.post("/release/hackers", dependencies=[Depends(require_director)])
async def release_hacker_decisions(body: HackerDecisionRequest) -> None:
    """Update hacker applicant status based on decision and send decision emails."""
    records: list[dict[str, Any]] = await mongodb_handler.retrieve(
        Collection.USERS,
        {"roles": {"$in": [Role.HACKER]}},
        ["_id", "application_data.review_breakdown", "first_name"],
    )

    for record in records:
        if not record.get("application_data", {}).get("review_breakdown"):
            log.error("Record %s is missing review_breakdown", record["_id"])
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST,
                detail=f"Applicant {record['_id']} has not been reviewed yet.",
            )

    def get_raw_score(record: dict[str, Any]) -> float:
        breakdown = record.get("application_data", {}).get("review_breakdown", {})
        if not breakdown:
            return 0.0
        scores_dict = next(iter(breakdown.values()))
        return sum(applicant_review_processor._flatten_values(scores_dict))

    records.sort(key=get_raw_score, reverse=True)

    for i, record in enumerate(records):
        if i < body.accept_count:
            record["decision"] = Decision.ACCEPTED
        elif i < body.accept_count + body.waitlist_count:
            record["decision"] = Decision.WAITLISTED
        else:
            record["decision"] = Decision.REJECTED

    await _process_records_in_batches(records, Role.HACKER)


@router.post("/logistics/hackers", dependencies=[Depends(require_director)])
async def hacker_logistics_emails() -> None:
    """Send logistics emails to hackers."""
    await email_handler.send_logistics_email(Role.HACKER)


@router.post("/logistics/mentors", dependencies=[Depends(require_director)])
async def mentor_logistics_emails() -> None:
    """Send logistics email to mentors."""
    await email_handler.send_logistics_email(Role.MENTOR)


@router.post("/logistics/volunteers", dependencies=[Depends(require_director)])
async def volunteer_logistics_emails() -> None:
    """Send logistics email to volunteers."""
    await email_handler.send_logistics_email(Role.VOLUNTEER)


@router.post("/logistics/waitlists", dependencies=[Depends(require_director)])
async def waitlist_logistics_emails() -> None:
    """Send logistics emails to waitlisted hackers."""
    records: list[dict[str, Any]] = await mongodb_handler.retrieve(
        mongodb_handler.Collection.USERS,
        {"roles": Role.HACKER, "status": Decision.WAITLISTED},
        ["_id", "first_name"],
    )

    personalizations = []
    for record in records:
        personalizations.append(
            ApplicationUpdatePersonalization(
                email=recover_email_from_uid(record["_id"]),
                first_name=record["first_name"],
            )
        )

    if len(records) > 0:
        await sendgrid_handler.send_email(
            Template.HACKER_WAITLISTED_LOGISTICS_EMAIL,
            VH_SENDER,
            personalizations,
            True,
            reply_to=VH_REPLY_TO,
        )


@router.post("/waitlist-transfer", dependencies=[Depends(require_director)])
async def waitlist_transfer() -> None:
    """Transfer all accepted hackers that didn't RSVP in time to the waitlist"""
    records: list[dict[str, Any]] = await mongodb_handler.retrieve(
        Collection.USERS,
        {"roles": Role.HACKER, "status": Status.VOID},
        ["_id", "first_name"],
    )

    log.info(
        f"Changing status of {len(records)} from {Status.VOID} to {Decision.WAITLISTED}"
    )

    await asyncio.gather(
        *(
            _process_status(batch, Decision.WAITLISTED)
            for batch in batched([str(record["_id"]) for record in records], 100)
        )
    )

    personalizations = []
    for record in records:
        personalizations.append(
            ApplicationUpdatePersonalization(
                email=recover_email_from_uid(record["_id"]),
                first_name=record["first_name"],
            )
        )

    log.info(f"Sending waitlist transfer emails to {len(records)} hackers")

    if len(records) > 0:
        await sendgrid_handler.send_email(
            Template.WAITLIST_TRANSFER_EMAIL,
            VH_SENDER,
            personalizations,
            True,
            reply_to=VH_REPLY_TO,
        )


async def _process_status(uids: Sequence[str], status: Union[Status, Decision]) -> None:
    ok = await mongodb_handler.update(
        Collection.USERS, {"_id": {"$in": uids}}, {"status": status}
    )
    if not ok:
        raise RuntimeError("gg wp")


async def _process_records_in_batches(
    records: list[dict[str, object]],
    application_type: Literal[Role.HACKER, Role.MENTOR, Role.VOLUNTEER],
) -> None:
    for decision in (Decision.ACCEPTED, Decision.WAITLISTED, Decision.REJECTED):
        group = [record for record in records if record["decision"] == decision]
        if not group:
            continue
        await asyncio.gather(
            *(
                _process_batch(batch, decision, application_type)
                for batch in batched(group, 100)
            )
        )


async def _process_batch(
    batch: tuple[dict[str, Any], ...],
    decision: Decision,
    application_type: Literal[Role.HACKER, Role.MENTOR, Role.VOLUNTEER],
) -> None:
    uids: list[str] = [record["_id"] for record in batch]
    log.info(f"Setting {application_type}s {','.join(uids)} as {decision}")
    ok = await mongodb_handler.update(
        Collection.USERS, {"_id": {"$in": uids}}, {"status": decision}
    )
    if not ok:
        raise RuntimeError("gg wp")

    # Send emails
    log.info(
        f"Sending {application_type} {decision} emails for {len(batch)} applicants"
    )
    await email_handler.send_decision_email(
        map(_extract_personalizations, batch), decision, application_type
    )


def _extract_personalizations(decision_data: dict[str, Any]) -> tuple[str, EmailStr]:
    name = decision_data["first_name"]
    email = recover_email_from_uid(decision_data["_id"])
    return name, email
