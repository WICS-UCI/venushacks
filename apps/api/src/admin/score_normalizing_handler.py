from collections import defaultdict
from statistics import mean, pstdev
from typing import Any

from pymongo import UpdateOne

from models.user_record import Role
from services import mongodb_handler
from services.mongodb_handler import Collection
from admin import applicant_review_processor

GLOBAL_FIELDS = {"resume", "hackathon_experience"}


async def add_normalized_scores_to_all_hacker_applicants() -> None:
    """Calculates normalized scores and adds them to all hacker apps"""
    all_apps = await get_all_hacker_apps()
    reviewer_stats = get_reviewer_stats(all_apps)

    normalized_scores = get_normalized_scores_for_hacker_applicants(
        all_apps, reviewer_stats
    )
    await update_hacker_applicants_in_collection(normalized_scores)


async def get_all_hacker_apps() -> list[dict[str, object]]:
    return await mongodb_handler.retrieve(
        Collection.USERS,
        {
            "roles": Role.HACKER,
            "application_data.reviews": {"$exists": True, "$not": {"$size": 0}},
        },
        [
            "_id",
            "status",
            "application_data.review_breakdown",
            "application_data.normalized_scores",
        ],
    )


def get_reviewer_stats(all_apps: list[dict[str, Any]]) -> dict[str, dict[str, float]]:
    reviewer_totals: dict[str, list[float]] = defaultdict(list)

    for app in all_apps:
        breakdown = app.get("application_data", {}).get("review_breakdown", {})
        for reviewer, scores_dict in breakdown.items():
            total_score = sum(applicant_review_processor._flatten_values(scores_dict))
            reviewer_totals[reviewer].append(total_score)

    return {
        reviewer: {
            "mean": mean(scores),
            "std": pstdev(scores) or 1.0,
        }
        for reviewer, scores in reviewer_totals.items()
    }


def get_normalized_scores_for_hacker_applicants(
    all_apps: list[dict[str, Any]], reviewer_stats: dict[str, dict[str, float]]
) -> dict[str, dict[str, float]]:
    result: dict[str, dict[str, float]] = {}

    for app in all_apps:
        app_id = app["_id"]
        breakdown = app.get("application_data", {}).get("review_breakdown", {})
        if not breakdown:
            continue

        reviewer, scores_dict = next(iter(breakdown.items()))
        total_score = sum(applicant_review_processor._flatten_values(scores_dict))
        stats = reviewer_stats.get(reviewer, {"mean": 0, "std": 1})
        normalized = (total_score - stats["mean"]) / stats["std"]

        result[app_id] = {reviewer: normalized}

    return result


async def update_hacker_applicants_in_collection(
    normalized_scores: dict[str, dict[str, float]]
) -> None:
    operations = [
        UpdateOne(
            {"_id": app_id}, {"$set": {"application_data.normalized_scores": scores}}
        )
        for app_id, scores in normalized_scores.items()
    ]

    await mongodb_handler.bulk_update(Collection.USERS, operations)
