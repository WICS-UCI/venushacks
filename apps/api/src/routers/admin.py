from datetime import date, datetime
from logging import getLogger
from typing import Annotated, Any, Literal, Mapping, Optional

from fastapi import APIRouter, Body, Depends, HTTPException, status
from pydantic import BaseModel, TypeAdapter, ValidationError
from typing_extensions import assert_never
from pymongo import DESCENDING

from admin import applicant_review_processor, participant_manager, summary_handler
from admin.participant_manager import Participant
from admin.score_normalizing_handler import (
    add_normalized_scores_to_all_hacker_applicants,
)
from auth.authorization import require_role
from auth.user_identity import User, utc_now
from models.ApplicationData import Decision, Review
from models.user_record import Applicant, ApplicantStatus, Role
from services import mongodb_handler
from services.mongodb_handler import BaseRecord, Collection
from utils import email_handler


log = getLogger(__name__)

router = APIRouter()

require_manager = require_role(
    {
        Role.DIRECTOR,
        Role.HACKER_REVIEWER,
        Role.MENTOR_REVIEWER,
        Role.VOLUNTEER_REVIEWER,
        Role.CHECKIN_LEAD,
    }
)
require_reviewer = require_role(
    {
        Role.DIRECTOR,
        Role.LEAD,
        Role.HACKER_REVIEWER,
        Role.MENTOR_REVIEWER,
        Role.VOLUNTEER_REVIEWER,
    }
)
require_lead = require_role({Role.LEAD})
require_hacker_reviewer = require_role({Role.DIRECTOR, Role.HACKER_REVIEWER})
require_mentor_reviewer = require_role({Role.DIRECTOR, Role.MENTOR_REVIEWER})
require_volunteer_reviewer = require_role({Role.DIRECTOR, Role.VOLUNTEER_REVIEWER})
require_checkin_lead = require_role({Role.DIRECTOR, Role.CHECKIN_LEAD})
require_organizer = require_role({Role.ORGANIZER})


class ApplicationDataSummary(BaseModel):
    school: Optional[str] = None
    submission_time: datetime


class ApplicantSummary(BaseRecord):
    first_name: str
    last_name: str
    status: str
    decision: Optional[Decision] = None
    application_data: ApplicationDataSummary


class HackerApplicantSummary(BaseRecord):
    first_name: str
    last_name: str
    status: str
    decision: Optional[Decision] = None
    reviewers: list[str] = []
    resume_reviewed: bool = False
    avg_score: float
    application_data: ApplicationDataSummary


class ReviewRequest(BaseModel):
    applicant: str
    score: float


class VenusHacksHackerDetailedScores(BaseModel):
    frq_project: float
    frq_diversity: float
    frq_picnic: float
    experience: float


class DetailedReviewRequest(BaseModel):
    applicant: str
    scores: VenusHacksHackerDetailedScores
    notes: Optional[str] = None
    is_experienced: bool = False


async def mentor_volunteer_applicants(
    application_type: Literal["Mentor", "Volunteer"],
) -> list[ApplicantSummary]:
    """Get records of all mentor and volunteer applicants."""
    records: list[dict[str, object]] = await mongodb_handler.retrieve(
        Collection.USERS,
        {"roles": [Role.APPLICANT, Role(application_type)]},
        [
            "_id",
            "status",
            "first_name",
            "last_name",
            "application_data",
        ],
    )

    for record in records:
        applicant_review_processor.include_review_decision(record)

    try:
        return TypeAdapter(list[ApplicantSummary]).validate_python(records)
    except ValidationError:
        raise RuntimeError("Could not parse applicant data.")


@router.get("/applicants/mentors")
async def mentor_applicants(
    user: Annotated[User, Depends(require_mentor_reviewer)],
) -> list[ApplicantSummary]:
    """Get records of all mentor applicants."""
    log.info("%s requested mentor applicants", user)

    return await mentor_volunteer_applicants("Mentor")


@router.get("/applicants/volunteers")
async def volunteer_applicants(
    user: Annotated[User, Depends(require_volunteer_reviewer)],
) -> list[ApplicantSummary]:
    """Get records of all volunteer applicants."""
    log.info("%s requested volunteer applicants", user)

    return await mentor_volunteer_applicants("Volunteer")


@router.get("/applicants/hackers")
async def hacker_applicants(
    user: Annotated[User, Depends(require_hacker_reviewer)],
) -> list[HackerApplicantSummary]:
    """Get records of all hacker applicants."""
    log.info("%s requested hacker applicants", user)

    records: list[dict[str, object]] = await mongodb_handler.retrieve(
        Collection.USERS,
        {"roles": Role.HACKER},
        [
            "_id",
            "status",
            "first_name",
            "last_name",
            "application_data",
        ],
        sort=[("application_data.submission_time", DESCENDING)],
    )
    thresholds: Optional[dict[str, float]] = await retrieve_thresholds()

    if not thresholds:
        log.error("Could not retrieve thresholds")
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    for record in records:
        # TODO: If we change back to old avg score for summary, change this function
        # applicant_review_processor.include_hacker_app_fields
        applicant_review_processor.include_hacker_app_fields_with_global_and_breakdown(
            record, thresholds["accept"], thresholds["waitlist"]
        )

    try:
        return TypeAdapter(list[HackerApplicantSummary]).validate_python(records)
    except ValidationError:
        raise RuntimeError("Could not parse applicant data.")


async def applicant(
    uid: str, application_type: Literal["Hacker", "Mentor", "Volunteer"]
) -> Applicant:
    """Get record of an applicant by uid."""
    record: Optional[dict[str, object]] = await mongodb_handler.retrieve_one(
        Collection.USERS,
        {"_id": uid, "roles": [Role.APPLICANT, Role(application_type)]},
    )

    if not record:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    try:
        return Applicant.model_validate(record)
    except ValidationError:
        raise RuntimeError("Could not parse applicant data.")


@router.get("/applicant/hacker/{uid}", dependencies=[Depends(require_hacker_reviewer)])
async def hacker_applicant(
    uid: str,
) -> Applicant:
    """Get record of a hacker applicant by uid."""
    return await applicant(uid, "Hacker")


@router.get("/applicant/mentor/{uid}", dependencies=[Depends(require_mentor_reviewer)])
async def mentor_applicant(
    uid: str,
) -> Applicant:
    """Get record of a mentor applicant by uid."""
    return await applicant(uid, "Mentor")


@router.get(
    "/applicant/volunteer/{uid}", dependencies=[Depends(require_volunteer_reviewer)]
)
async def volunteer_applicant(
    uid: str,
) -> Applicant:
    """Get record of a volunteer applicant by uid."""
    return await applicant(uid, "Volunteer")


@router.get("/summary/applicants", dependencies=[Depends(require_manager)])
async def applicant_summary() -> dict[ApplicantStatus, int]:
    """Provide summary of statuses of applicants."""
    return await summary_handler.applicant_summary()


@router.get(
    "/summary/applications",
    response_model=dict[str, object],
    dependencies=[Depends(require_manager)],
)
async def applications(
    group_by: Literal["school", "role"],
) -> dict[str, dict[date, int]]:
    if group_by == "school":
        return await summary_handler.applications_by_school()
    elif group_by == "role":
        return await summary_handler.applications_by_role()
    assert_never(group_by)


@router.post("/review")
async def submit_review(
    applicant_review: ReviewRequest,
    reviewer: User = Depends(require_reviewer),
) -> None:
    """Submit a review decision from the reviewer for the given hacker applicant."""

    if applicant_review.score < -2 or applicant_review.score > 100:
        log.error("Invalid review score submitted.")
        raise HTTPException(status.HTTP_400_BAD_REQUEST)

    review: Review = (utc_now(), reviewer.uid, applicant_review.score)
    app = applicant_review.applicant

    applicant_record = await mongodb_handler.retrieve_one(
        Collection.USERS,
        {"_id": applicant_review.applicant},
        ["_id", "application_data.reviews", "roles"],
    )
    if not applicant_record:
        log.error("Could not retrieve applicant after submitting review")
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    if Role.HACKER in applicant_record["roles"]:
        if applicant_review.score < 0 or applicant_review.score > 10:
            log.error("Invalid review score submitted.")
            raise HTTPException(status.HTTP_400_BAD_REQUEST)

        unique_reviewers = applicant_review_processor.get_unique_reviewers(
            applicant_record
        )

        # Only add a review if there are either less than 2 reviewers
        # or reviewer is one of the reviewers
        if len(unique_reviewers) >= 2 and reviewer.uid not in unique_reviewers:
            log.error(
                "%s tried to submit a review, but %s already has two reviewers",
                reviewer,
                app,
            )
            raise HTTPException(status.HTTP_403_FORBIDDEN)

        update_query: dict[str, object] = {
            "$push": {"application_data.reviews": review}
        }
        # Because reviewing a hacker requires 2 reviewers, only set the
        # applicant's status to REVIEWED if there are at least 2 reviewers
        if len(unique_reviewers | {reviewer.uid}) >= 2:
            update_query.update({"$set": {"status": "REVIEWED"}})

        await _try_update_applicant_with_query(
            applicant_review.applicant,
            update_query=update_query,
            err_msg=f"{reviewer} could not submit review for {app}",
        )

    else:
        await _try_update_applicant_with_query(
            applicant_review.applicant,
            update_query={
                "$push": {"application_data.reviews": review},
                "$set": {"status": "REVIEWED"},
            },
            err_msg=f"{reviewer} could not submit review for {app}",
        )

    log.info("%s reviewed hacker %s", reviewer, applicant_review.applicant)


@router.post("/detailed-review")
async def submit_detailed_review(
    applicant_review: DetailedReviewRequest,
    reviewer: User = Depends(require_reviewer),
) -> None:
    """Submit a review decision from the reviewer for the given hacker applicant."""
    await _handle_venushacks_detailed_scores_review(
        applicant_review.applicant,
        applicant_review.scores,
        reviewer,
        applicant_review.notes,
        applicant_review.is_experienced,
    )


@router.get("/get-thresholds")
async def get_hacker_score_thresholds(
    user: Annotated[User, Depends(require_manager)],
) -> Optional[dict[str, Any]]:
    """
    Gets accepted and waitlisted thresholds
    """
    log.info("%s requested thresholds", user)

    try:
        record = await mongodb_handler.retrieve_one(
            Collection.SETTINGS,
            {"_id": "hacker_score_thresholds"},
        )
    except RuntimeError:
        log.error("%s could not retrieve thresholds", user)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)
    return record


@router.post("/waitlist-release/{uid}")
async def waitlist_release(
    uid: str,
    associate: Annotated[User, Depends(require_checkin_lead)],
) -> None:
    """Release an applicant from the waitlist and send email."""
    record = await mongodb_handler.retrieve_one(
        Collection.USERS,
        {"_id": uid, "roles": Role.APPLICANT, "status": Decision.WAITLISTED},
        ["status", "first_name"],
    )
    if not record:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    ok = await mongodb_handler.update_one(
        Collection.USERS, {"_id": uid}, {"status": Decision.ACCEPTED}
    )
    if not ok:
        raise RuntimeError("gg wp")

    log.info("%s accepted %s off the waitlist. Sending email.", associate, uid)
    await email_handler.send_waitlist_release_email(
        record["first_name"], email_handler.recover_email_from_uid(uid)
    )


@router.get("/participants", dependencies=[Depends(require_organizer)])
async def participants() -> list[Participant]:
    """Get list of participants."""
    return await participant_manager.get_participants()


@router.post("/checkin/{uid}")
async def check_in_participant(
    uid: str,
    associate: Annotated[User, Depends(require_organizer)],
) -> None:
    """Check in participant"""
    try:
        await participant_manager.check_in_participant(uid, associate)
    except ValueError:
        raise HTTPException(status.HTTP_404_NOT_FOUND)
    except RuntimeError as err:
        log.exception("During participant check-in: %s", err)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.post(
    "/update-attendance/{uid}",
)
async def update_attendance(
    uid: str,
    director: Annotated[
        User, Depends(require_role({Role.DIRECTOR, Role.CHECKIN_LEAD}))
    ],
) -> None:
    """Update status to Role.ATTENDING for outside participants."""
    try:
        await participant_manager.confirm_attendance_outside_participants(uid, director)
    except ValueError:
        raise HTTPException(status.HTTP_404_NOT_FOUND)
    except RuntimeError as err:
        log.exception("While updating participant attendance: %s", err)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get("/events", dependencies=[Depends(require_organizer)])
async def events() -> list[dict[str, object]]:
    """Get list of events"""
    return await mongodb_handler.retrieve(Collection.EVENTS, {})


@router.post("/event-checkin/{event}")
async def subevent_checkin(
    event: str,
    uid: Annotated[str, Body()],
    organizer: Annotated[User, Depends(require_organizer)],
) -> None:
    await participant_manager.subevent_checkin(event, uid, organizer)


@router.get(
    "/normalize-detailed-scores",
    dependencies=[Depends(require_role({Role.DIRECTOR, Role.LEAD}))],
)
async def normalize_detailed_scores_for_all_hacker_apps() -> None:
    try:
        await add_normalized_scores_to_all_hacker_applicants()
    except RuntimeError:
        log.error("Could not update/add normalized scores to hacker applicants")
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


async def retrieve_thresholds() -> Optional[dict[str, Any]]:
    return await mongodb_handler.retrieve_one(
        Collection.SETTINGS, {"_id": "hacker_score_thresholds"}, ["accept", "waitlist"]
    )


async def _try_update_applicant_with_query(
    applicant: str,
    *,
    update_query: Mapping[str, object],
    err_msg: str = "",
) -> None:
    try:
        await mongodb_handler.raw_update_one(
            Collection.USERS,
            {"_id": applicant},
            update_query,
        )
    except RuntimeError:
        log.error(err_msg)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


async def _handle_venushacks_detailed_scores_review(
    applicant: str,
    scores: VenusHacksHackerDetailedScores,
    reviewer: User,
    notes: Optional[str] = None,
    is_experienced: bool = False,
) -> None:
    """Handle detailed scores review submission for VenusHacks."""
    score_breakdown = scores.model_dump(exclude_none=True)

    MAX_SCORE = 30.0  # 10 + 15 + 3 + 2

    total_score = sum(score_breakdown.values())
    total_score = (total_score / MAX_SCORE) * 100.0
    total_score = max(total_score, -3.0)

    if total_score < -1000.0 or total_score > 100.0:
        log.error("Invalid calculated review score: %f", total_score)
        raise HTTPException(status.HTTP_400_BAD_REQUEST)

    review: Review = (utc_now(), reviewer.uid, total_score, notes, is_experienced)

    applicant_record = await mongodb_handler.retrieve_one(
        Collection.USERS,
        {"_id": applicant},
        ["_id", "application_data.reviews", "roles"],
    )
    if not applicant_record:
        log.error("Could not retrieve applicant after submitting review")
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    unique_reviewers = applicant_review_processor.get_unique_reviewers(applicant_record)

    if len(unique_reviewers) >= 2 and reviewer.uid not in unique_reviewers:
        log.error(
            "%s tried to submit a review, but %s already has two reviewers",
            reviewer,
            applicant,
        )
        raise HTTPException(status.HTTP_403_FORBIDDEN)

    update_query: dict[str, object] = {"$push": {"application_data.reviews": review}}
    if len(unique_reviewers | {reviewer.uid}) >= 2:
        update_query.update({"$set": {"status": "REVIEWED"}})

    await _try_update_applicant_with_query(
        applicant,
        update_query={"$push": {"application_data.reviews": review}},
        err_msg=f"{reviewer} could not submit review for {applicant}",
    )

    uid_no_domain = reviewer.uid.split(".")[-1]
    await _try_update_applicant_with_query(
        applicant,
        update_query={
            "$set": {
                f"application_data.review_breakdown.{uid_no_domain}": score_breakdown,
            }
        },
        err_msg=f"{reviewer} could not submit review for {applicant}",
    )
    
    log.info("%s reviewed hacker %s", reviewer, applicant)