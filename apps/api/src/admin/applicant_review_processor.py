from typing import Any, Optional

from models.ApplicationData import Decision

OVERQUALIFIED = -3
NOT_FULLY_REVIEWED = -1
MAX_SCORE = 30.0

scores_to_decisions: dict[Optional[int], Decision] = {
    100: Decision.ACCEPTED,
    -2: Decision.WAITLISTED,
    0: Decision.REJECTED,
}


# TODO: Make this function only used for old applicant summary
# meaning remove the resume_reviewed
def include_hacker_app_fields(
    applicant_record: dict[str, Any], accept_threshold: float, waitlist_threshold: float
) -> None:
    _include_decision_based_on_threshold(
        applicant_record, accept_threshold, waitlist_threshold
    )
    _include_reviewers(applicant_record)
    _include_avg_score(applicant_record)
    _include_resume_reviewed(applicant_record)


def include_hacker_app_fields_with_global_and_breakdown(
    applicant_record: dict[str, Any], accept_threshold: float, waitlist_threshold: float
) -> None:
    """For applicant summary where global and breakdown scores are used"""
    _include_decision_based_on_threshold_and_score_breakdown(
        applicant_record, accept_threshold, waitlist_threshold
    )
    _include_reviewers(applicant_record)
    _include_avg_score_with_global_and_breakdown(applicant_record)
    _include_resume_reviewed(applicant_record)


def include_review_decision(applicant_record: dict[str, Any]) -> None:
    """Sets the applicant's decision as the last submitted review decision or None."""
    reviews = applicant_record["application_data"]["reviews"]
    score: Optional[int] = reviews[-1][2] if reviews else None
    applicant_record["decision"] = scores_to_decisions.get(score)


def get_unique_reviewers(applicant_record: dict[str, Any]) -> set[str]:
    reviews = applicant_record["application_data"]["reviews"]
    unique_reviewers = {t[1] for t in reviews}
    return unique_reviewers


def _get_last_score(reviewer: str, reviews: list[tuple[str, str, float]]) -> float:
    for review in reversed(reviews):
        if review[1] == reviewer:
            return review[2]
    return NOT_FULLY_REVIEWED


# TODO: Make this function only used for old applicant summary
# meaning remove the global_field_scores usage
def _get_avg_score(
    reviews: list[tuple[str, str, float]], global_field_scores: dict[str, Any]
) -> float:
    # Check global_field_scores first - if any value is less than 0,
    # return OVERQUALIFIED
    if global_field_scores and any(score < 0 for score in global_field_scores.values()):
        return OVERQUALIFIED

    unique_reviewers = {t[1] for t in reviews}
    if len(unique_reviewers) < 2:
        return NOT_FULLY_REVIEWED

    last_score = _get_last_score(unique_reviewers.pop(), reviews)
    last_score2 = _get_last_score(unique_reviewers.pop(), reviews)
    if any([last_score == OVERQUALIFIED, last_score2 == OVERQUALIFIED]):
        return OVERQUALIFIED
    return (last_score + last_score2) / 2


# def _get_avg_score_with_globals_and_breakdown(
#     review_breakdowns: dict[str, dict[str, int]], global_field_scores: dict[str, int]
# ) -> float:
#     # Check global_field_scores first - if any value is less than 0,
#     # return OVERQUALIFIED
#     if global_field_scores
#             and any(score < 0 for score in global_field_scores.values()):
#         return OVERQUALIFIED

#     if len(review_breakdowns) < 2:
#         return NOT_FULLY_REVIEWED

#     # Review breakdowns should be the most recent scores
#     total_score = 2 * sum(global_field_scores.values())
#     for breakdown in review_breakdowns.values():
#         for field, score in breakdown.items():
#             # TODO: Fields from global_field_scores should not be in breakdowns
#             # This check should be removed once breakdown models remove global fields
#             if field in global_field_scores:
#                 continue

#             total_score += score

#     return (total_score / 2) / MAX_SCORE * 100


def _flatten_values(d: dict[str, object]) -> list[float]:
    values: list[float] = []
    for v in d.values():
        if isinstance(v, dict):
            values.extend(_flatten_values(v))
        else:
            values.append(float(v))  # type: ignore[arg-type]
    return values


# For the purposes of VenusHacks 2026, we'll only consider the review that was submitted
# last. For instance, If three reviewers each submitted their own review of a hacker
# application, only the most recent one will be considered in the "average value".
#
# To revert this back to the average of all the reviews, remove the definition for
# _get_avg_score_with_globals_and_breakdown below and uncomment the old definition
# above. Then, update expected_records.avg_score with the corrected average in
# test_admin.py::test_hacker_applicants_returns_correct_applicants()
def _get_avg_score_with_globals_and_breakdown(
    review_breakdowns: dict[str, dict[str, object]], global_field_scores: dict[str, int]
) -> float:
    if global_field_scores and any(score < 0 for score in global_field_scores.values()):
        return OVERQUALIFIED

    if len(review_breakdowns) < 1:
        return NOT_FULLY_REVIEWED

    last_breakdown = list(review_breakdowns.values())[-1]

    total_score: float = sum(global_field_scores.values())
    for field, score in last_breakdown.items():
        if field in global_field_scores:
            continue
        if isinstance(score, dict):
            total_score += sum(_flatten_values(score))
        else:
            total_score += float(score)  # type: ignore[arg-type]

    return total_score / MAX_SCORE * 100


def _include_decision_based_on_threshold(
    applicant_record: dict[str, Any], accept: float, waitlist: float
) -> None:
    avg_score = _get_avg_score(
        applicant_record["application_data"]["reviews"],
        applicant_record["application_data"].get("global_field_scores", {}),
    )
    if avg_score >= accept:
        applicant_record["decision"] = Decision.ACCEPTED
    elif avg_score >= waitlist:
        applicant_record["decision"] = Decision.WAITLISTED
    else:
        applicant_record["decision"] = Decision.REJECTED


def _include_decision_based_on_threshold_and_score_breakdown(
    applicant_record: dict[str, Any], accept: float, waitlist: float
) -> None:
    avg_score = _get_avg_score_with_globals_and_breakdown(
        applicant_record["application_data"].get("review_breakdown", {}),
        applicant_record["application_data"].get("global_field_scores", {}),
    )
    if avg_score >= accept:
        applicant_record["decision"] = Decision.ACCEPTED
    elif avg_score >= waitlist:
        applicant_record["decision"] = Decision.WAITLISTED
    else:
        applicant_record["decision"] = Decision.REJECTED


def _include_reviewers(applicant_record: dict[str, Any]) -> None:
    unique_reviewers = get_unique_reviewers(applicant_record)
    applicant_record["reviewers"] = sorted(list(unique_reviewers))


def _include_avg_score(applicant_record: dict[str, Any]) -> None:
    applicant_record["avg_score"] = _get_avg_score(
        applicant_record["application_data"]["reviews"],
        applicant_record["application_data"].get("global_field_scores", {}),
    )


def _include_avg_score_with_global_and_breakdown(
    applicant_record: dict[str, Any]
) -> None:
    applicant_record["avg_score"] = _get_avg_score_with_globals_and_breakdown(
        applicant_record["application_data"].get("review_breakdown", {}),
        applicant_record["application_data"].get("global_field_scores", {}),
    )


def _include_resume_reviewed(applicant_record: dict[str, Any]) -> None:
    global_field_scores = applicant_record["application_data"].get(
        "global_field_scores", {}
    )
    applicant_record["resume_reviewed"] = "resume" in global_field_scores
