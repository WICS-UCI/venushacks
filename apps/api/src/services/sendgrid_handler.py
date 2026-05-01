# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from enum import Enum
from logging import getLogger
from typing import Iterable, Literal, Tuple, TypedDict, Union, overload

import aiosendgrid
from httpx import HTTPStatusError
from sendgrid.helpers.mail import Mail, Personalization, Email, ReplyTo
from typing_extensions import TypeAlias

log = getLogger(__name__)

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")


class Template(str, Enum):
    CONFIRMATION_EMAIL = "d-927a7d6d706b448b94e81da9a16bee2a"

    GUEST_TOKEN = "d-4bc24f16c94d47ff88548e59da89981c"  # for venushacks 2026
    HACKER_ACCEPTED_EMAIL = ""
    HACKER_WAITLISTED_EMAIL = ""
    HACKER_REJECTED_EMAIL = ""
    MENTOR_ACCEPTED_EMAIL = ""
    MENTOR_REJECTED_EMAIL = ""
    VOLUNTEER_ACCEPTED_EMAIL = ""
    VOLUNTEER_REJECTED_EMAIL = ""
    APPLY_REMINDER = ""
    HACKER_RSVP_REMINDER = ""
    MENTOR_RSVP_REMINDER = ""
    VOLUNTEER_RSVP_REMINDER = ""
    WAITLIST_RELEASE_EMAIL = ""
    HACKER_LOGISTICS_EMAIL = ""
    MENTOR_LOGISTICS_EMAIL = ""
    VOLUNTEER_LOGISTICS_EMAIL = ""
    HACKER_WAITLISTED_LOGISTICS_EMAIL = ""
    WAITLIST_TRANSFER_EMAIL = ""


class PersonalizationData(TypedDict):
    email: str


class ConfirmationPersonalization(PersonalizationData):
    first_name: str
    last_name: str
    application_type: str


class GuestTokenPersonalization(PersonalizationData):
    passphrase: str


class ApplicationUpdatePersonalization(PersonalizationData):
    first_name: str


ApplicationUpdateTemplates: TypeAlias = Literal[
    Template.HACKER_ACCEPTED_EMAIL,
    Template.HACKER_WAITLISTED_EMAIL,
    Template.HACKER_REJECTED_EMAIL,
    Template.MENTOR_ACCEPTED_EMAIL,
    Template.MENTOR_REJECTED_EMAIL,
    Template.VOLUNTEER_ACCEPTED_EMAIL,
    Template.VOLUNTEER_REJECTED_EMAIL,
    Template.HACKER_RSVP_REMINDER,
    Template.MENTOR_RSVP_REMINDER,
    Template.VOLUNTEER_RSVP_REMINDER,
    Template.WAITLIST_RELEASE_EMAIL,
    Template.WAITLIST_TRANSFER_EMAIL,
]

LogisticsTemplates: TypeAlias = Literal[
    Template.HACKER_LOGISTICS_EMAIL,
    Template.MENTOR_LOGISTICS_EMAIL,
    Template.VOLUNTEER_LOGISTICS_EMAIL,
    Template.HACKER_WAITLISTED_LOGISTICS_EMAIL,
]


@overload
async def send_email(
    template_id: Literal[Template.CONFIRMATION_EMAIL],
    sender_email: Tuple[str, str],
    receiver_data: ConfirmationPersonalization,
    send_to_multiple: Literal[False] = False,
    reply_to: Union[Tuple[str, str], None] = None,
) -> None: ...


@overload
async def send_email(
    template_id: Literal[Template.GUEST_TOKEN],
    sender_email: Tuple[str, str],
    receiver_data: GuestTokenPersonalization,
    send_to_multiple: Literal[False] = False,
    reply_to: Union[Tuple[str, str], None] = None,
) -> None: ...


@overload
async def send_email(
    template_id: Literal[Template.CONFIRMATION_EMAIL],
    sender_email: Tuple[str, str],
    receiver_data: Iterable[ConfirmationPersonalization],
    send_to_multiple: Literal[True],
    reply_to: Union[Tuple[str, str], None] = None,
) -> None: ...


@overload
async def send_email(
    template_id: ApplicationUpdateTemplates,
    sender_email: Tuple[str, str],
    receiver_data: Iterable[ApplicationUpdatePersonalization],
    send_to_multiple: Literal[True],
    reply_to: Union[Tuple[str, str], None] = None,
) -> None: ...


@overload
async def send_email(
    template_id: ApplicationUpdateTemplates,
    sender_email: Tuple[str, str],
    receiver_data: ApplicationUpdatePersonalization,
    send_to_multiple: Literal[False],
    reply_to: Union[Tuple[str, str], None] = None,
) -> None: ...


@overload
async def send_email(
    template_id: Literal[Template.APPLY_REMINDER],
    sender_email: Tuple[str, str],
    receiver_data: PersonalizationData,
    send_to_multiple: Literal[False],
    reply_to: Union[Tuple[str, str], None] = None,
) -> None: ...


@overload
async def send_email(
    template_id: Literal[Template.APPLY_REMINDER],
    sender_email: Tuple[str, str],
    receiver_data: Iterable[PersonalizationData],
    send_to_multiple: Literal[True],
    reply_to: Union[Tuple[str, str], None] = None,
) -> None: ...


@overload
async def send_email(
    template_id: LogisticsTemplates,
    sender_email: Tuple[str, str],
    receiver_data: ApplicationUpdatePersonalization,
    send_to_multiple: Literal[False],
    reply_to: Union[Tuple[str, str], None] = None,
) -> None: ...


@overload
async def send_email(
    template_id: LogisticsTemplates,
    sender_email: Tuple[str, str],
    receiver_data: Iterable[ApplicationUpdatePersonalization],
    send_to_multiple: Literal[True],
    reply_to: Union[Tuple[str, str], None] = None,
) -> None: ...


async def send_email(
    template_id: Template,
    sender_email: Tuple[str, str],
    receiver_data: Union[PersonalizationData, Iterable[PersonalizationData]],
    send_to_multiple: bool = False,
    reply_to: Union[Tuple[str, str], None] = None,
) -> None:
    """
    Send a personalized templated email to one or multiple receivers via SendGrid
    """
    try:
        email_message = Mail()

        if send_to_multiple:
            if isinstance(receiver_data, dict):
                raise TypeError(
                    f"Expected {list} for receiver_data but got {type(receiver_data)}"
                )
            for r in receiver_data:
                p = Personalization()
                p.add_to(Email(email=r["email"], dynamic_template_data=r))
                email_message.add_personalization(p)
        else:
            if not isinstance(receiver_data, dict):
                raise TypeError(
                    f"Expected {dict} for receiver_data but got {type(receiver_data)}"
                )
            p = Personalization()
            p.add_to(
                Email(
                    email=receiver_data["email"],
                    dynamic_template_data=receiver_data,
                )
            )
            email_message.add_personalization(p)

        if reply_to is not None:
            email_message.reply_to = ReplyTo(email=reply_to[0], name=reply_to[1])

        email_message.from_email = sender_email
        email_message.template_id = template_id

        async with aiosendgrid.AsyncSendGridClient(api_key=SENDGRID_API_KEY) as client:
            response = await client.send_mail_v3(body=email_message.get())
            log.debug(response.status_code)
            log.debug(response.headers)
    except HTTPStatusError as e:
        log.exception("During SendGrid processing: %s", e)
        raise RuntimeError("Could not send email with SendGrid")
