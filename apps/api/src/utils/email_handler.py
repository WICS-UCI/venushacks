from typing import Any, Iterable, Literal, Protocol
from datetime import datetime

from pydantic import EmailStr

from models.ApplicationData import Decision
from models.user_record import Role, Status
from services import mongodb_handler, sendgrid_handler
from services.sendgrid_handler import (
    ApplicationUpdatePersonalization,
    ApplicationUpdateTemplates,
    LogisticsTemplates,
    Template,
)

VH_SENDER = ("info@venushacks.com", "VenusHacks 2026 Applications")
VH_REPLY_TO = ("venushacks.uci@gmail.com", "VenusHacks")

DECISION_TEMPLATES: dict[Role, dict[Decision, ApplicationUpdateTemplates]] = {
    Role.HACKER: {
        Decision.ACCEPTED: Template.HACKER_ACCEPTED_EMAIL,
        Decision.REJECTED: Template.HACKER_REJECTED_EMAIL,
        Decision.WAITLISTED: Template.HACKER_WAITLISTED_EMAIL,
    },
    Role.MENTOR: {
        Decision.ACCEPTED: Template.MENTOR_ACCEPTED_EMAIL,
        Decision.REJECTED: Template.MENTOR_REJECTED_EMAIL,
    },
    Role.VOLUNTEER: {
        Decision.ACCEPTED: Template.VOLUNTEER_ACCEPTED_EMAIL,
        Decision.REJECTED: Template.VOLUNTEER_REJECTED_EMAIL,
    },
}


LOGISTICS_TEMPLATES: dict[Role, LogisticsTemplates] = {
    Role.HACKER: Template.HACKER_LOGISTICS_EMAIL,
    Role.MENTOR: Template.MENTOR_LOGISTICS_EMAIL,
    Role.VOLUNTEER: Template.VOLUNTEER_LOGISTICS_EMAIL,
}


class ContactInfo(Protocol):
    first_name: str
    last_name: str


async def send_application_confirmation_email(
    email: EmailStr, user: ContactInfo, application_type: str
) -> None:
    """Send a confirmation email after a user submits an application.
    Will propagate exceptions from SendGrid."""
    await sendgrid_handler.send_email(
        Template.CONFIRMATION_EMAIL,
        VH_SENDER,
        {
            "email": email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "application_type": application_type,
        },
        reply_to=VH_REPLY_TO,
    )


async def send_guest_login_email(email: EmailStr, passphrase: str) -> None:
    """Email login passphrase to guest."""
    await sendgrid_handler.send_email(
        Template.GUEST_TOKEN,
        VH_SENDER,
        {
            "email": email,
            "passphrase": passphrase,
        },
        reply_to=VH_REPLY_TO,
    )


async def send_decision_email(
    applicant_batch: Iterable[tuple[str, EmailStr]],
    decision: Decision,
    application_type: Literal[Role.HACKER, Role.MENTOR, Role.VOLUNTEER],
) -> None:
    """Send a specific decision email to a group of applicants."""
    personalizations = [
        ApplicationUpdatePersonalization(email=email, first_name=first_name)
        for first_name, email in applicant_batch
    ]

    template = DECISION_TEMPLATES[application_type][decision]
    await sendgrid_handler.send_email(
        template,
        VH_SENDER,
        personalizations,
        True,
        reply_to=VH_REPLY_TO
    )


async def send_waitlist_release_email(first_name: str, email: EmailStr) -> None:
    """Send the waitlist release email to an applicant."""
    personalization = ApplicationUpdatePersonalization(
        email=email, first_name=first_name
    )

    await sendgrid_handler.send_email(
        Template.WAITLIST_RELEASE_EMAIL,
        VH_SENDER,
        personalization,
        send_to_multiple=False,
        reply_to=VH_REPLY_TO,
    )


async def send_logistics_email(
    application_type: Literal[Role.HACKER, Role.MENTOR, Role.VOLUNTEER]
) -> None:
    """Send logistics emails to a particular group of attendees."""
    records: list[dict[str, Any]] = await mongodb_handler.retrieve(
        mongodb_handler.Collection.USERS,
        {"roles": Role(application_type), "status": Status.ATTENDING},
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

    template = LOGISTICS_TEMPLATES[application_type]
    if len(records) > 0:
        await sendgrid_handler.send_email(
            template, VH_SENDER,
            personalizations,
            True,
            reply_to=VH_REPLY_TO,
        )


def recover_email_from_uid(uid: str) -> str:
    """For NativeUsers, the email should still delivery properly."""
    uid = uid.replace("..", "\n")
    *reversed_domain, local = uid.split(".")
    local = local.replace("\n", ".")
    domain = ".".join(reversed(reversed_domain))
    return f"{local}@{domain}"


async def send_waiver_confirmation_email(
    email: EmailStr,
    first_name: str,
    last_name: str,
    full_signature: str,
    timestamp: datetime,
    waiver_text: str,
) -> None:
    """Send a waiver signature confirmation email to the user."""
    await sendgrid_handler.send_email(
        Template.WAIVER_SIGNATURE_CONFIRMATION_EMAIL,
        VH_SENDER,
        sendgrid_handler.WaiverConfirmationPersonalization(
            email=email,
            first_name=first_name,
            last_name=last_name,
            full_signature=full_signature,
            timestamp=timestamp.strftime("%B %-d, %Y at %-I:%M %p UTC"),
            waiver_text=waiver_text,
        ),
        reply_to=VH_REPLY_TO,
    )
