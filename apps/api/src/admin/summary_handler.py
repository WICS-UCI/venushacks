from collections import Counter, defaultdict
from datetime import date, datetime
from typing import Iterable
from zoneinfo import ZoneInfo

from pydantic import BaseModel, TypeAdapter, ValidationError

from models.user_record import ApplicantStatus, Role
from services import mongodb_handler
from services.mongodb_handler import Collection

LOCAL_TIMEZONE = ZoneInfo("America/Los_Angeles")


class ApplicantSummaryRecord(BaseModel):
    status: ApplicantStatus


async def applicant_summary() -> Counter[ApplicantStatus]:
    """Get summary of applicants by status."""
    records = await mongodb_handler.retrieve(
        Collection.USERS,
        {"roles": Role.APPLICANT},
        ["status"],
    )
    applicants = TypeAdapter(list[ApplicantSummaryRecord]).validate_python(records)

    return Counter(applicant.status for applicant in applicants)


class ApplicationSubmissionTime(BaseModel):
    submission_time: datetime


class ApplicationSchoolAndTime(ApplicationSubmissionTime):
    school: str


class ApplicantSchoolStats(BaseModel):
    application_data: ApplicationSchoolAndTime


async def applications_by_school() -> dict[str, dict[date, int]]:
    """Get daily number of applications by school."""
    records = await mongodb_handler.retrieve(
        Collection.USERS,
        {"roles": [Role.APPLICANT, Role.HACKER]},
        ["application_data.school", "application_data.submission_time"],
    )

    try:
        applicant_stats_adapter = TypeAdapter(list[ApplicantSchoolStats])
        applicants = applicant_stats_adapter.validate_python(records)
    except ValidationError:
        raise RuntimeError("Could not parse applicant data by school.")

    grouped_applications: dict[str, dict[date, int]] = defaultdict(
        lambda: defaultdict(int)
    )

    for applicant in applicants:
        school = applicant.application_data.school
        day = applicant.application_data.submission_time.astimezone(
            LOCAL_TIMEZONE
        ).date()
        grouped_applications[school][day] += 1

    return grouped_applications


class ApplicantRoleStats(BaseModel):
    roles: tuple[Role, ...]
    application_data: ApplicationSubmissionTime


async def applications_by_role() -> dict[str, dict[date, int]]:
    """Get daily number of applications by role."""
    records: list[dict[str, object]] = await mongodb_handler.retrieve(
        Collection.USERS,
        {"roles": Role.APPLICANT},
        ["roles", "application_data.submission_time"],
    )

    try:
        applicant_stats_adapter = TypeAdapter(list[ApplicantRoleStats])
        applicants = applicant_stats_adapter.validate_python(records)
    except ValidationError:
        raise RuntimeError("Could not parse applicant data by role.")

    return {
        role.value: _count_applications_by_day(
            applicant.application_data
            for applicant in applicants
            if role in applicant.roles
        )
        for role in [Role.HACKER, Role.MENTOR, Role.VOLUNTEER]
    }


def _count_applications_by_day(
    application_data: Iterable[ApplicationSubmissionTime],
) -> dict[date, int]:
    """Group the applications by the date of submission."""
    daily_applications = defaultdict[date, int](int)

    for data in application_data:
        day = data.submission_time.astimezone(LOCAL_TIMEZONE).date()
        daily_applications[day] += 1

    return daily_applications
