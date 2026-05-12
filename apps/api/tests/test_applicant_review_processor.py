from datetime import datetime

from typing import Any

from admin import applicant_review_processor


def test_no_decision_from_no_reviews() -> None:
    """Test that a decision is None for an applicant with no reviews."""
    record = {
        "_id": "edu.uci.pham",
        "status": "PENDING_REVIEW",
        "application_data": {
            "reviews": [],
        },
    }

    applicant_review_processor.include_review_decision(record)
    assert record["decision"] is None


def test_can_include_decision_from_reviews() -> None:
    """Test that a decision can be provided for an applicant with reviews."""
    record = {
        "_id": "edu.uci.sydnee",
        "status": "REVIEWED",
        "application_data": {
            "reviews": [[datetime(2023, 1, 19), "edu.uci.alicia", 100]],
        },
    }

    applicant_review_processor.include_review_decision(record)
    assert record["decision"] == "ACCEPTED"


def test_can_include_reviewers_from_reviews() -> None:
    """Test that the number of reviewers are added to an applicant with reviews."""
    record: dict[str, Any] = {
        "_id": "edu.uci.sydnee",
        "status": "REVIEWED",
        "application_data": {
            "reviews": [
                [datetime(2023, 1, 19), "edu.uci.alicia", 100],
                [datetime(2023, 1, 19), "edu.uci.alicia2", 200],
            ]
        },
    }

    expected_reviewers = ["edu.uci.alicia", "edu.uci.alicia2"]

    applicant_review_processor._include_reviewers(record)
    assert record["reviewers"] == expected_reviewers


def test_can_include_avg_score_from_reviews() -> None:
    """Test that the last score from one reviewer is used as avg_score."""
    record: dict[str, Any] = {
        "_id": "edu.uci.sydnee",
        "status": "REVIEWED",
        "application_data": {
            "reviews": [
                [datetime(2023, 1, 19), "edu.uci.alicia", 10],
                [datetime(2023, 1, 19), "edu.uci.alicia2", 0],
                [datetime(2023, 1, 19), "edu.uci.alicia", 100],
                [datetime(2023, 1, 19), "edu.uci.alicia2", 200],
            ]
        },
    }

    applicant_review_processor._include_avg_score(record)
    assert record["avg_score"] in {100, 200}


def test_avg_score_with_global_field_scores_overqualified() -> None:
    """Test OVERQUALIFIED returned when global_field_scores has negative values."""
    record: dict[str, Any] = {
        "_id": "edu.uci.sydnee",
        "status": "REVIEWED",
        "application_data": {
            "reviews": [
                [datetime(2023, 1, 19), "edu.uci.alicia", 10],
                [datetime(2023, 1, 19), "edu.uci.alicia2", 0],
            ],
            "global_field_scores": {
                "resume": -1000,  # Overqualified (auto-reject)
                "hackathon_experience": 5,
            },
        },
    }

    applicant_review_processor._include_avg_score(record)
    assert record["avg_score"] == applicant_review_processor.OVERQUALIFIED


def test_avg_score_with_global_field_scores_positive() -> None:
    """Test normal logic used when global_field_scores has no negative values."""
    record: dict[str, Any] = {
        "_id": "edu.uci.sydnee",
        "status": "REVIEWED",
        "application_data": {
            "reviews": [
                [datetime(2023, 1, 19), "edu.uci.alicia", 10],
                [datetime(2023, 1, 19), "edu.uci.alicia2", 0],
            ],
            "global_field_scores": {
                "resume": 15,
                "hackathon_experience": 5,
            },
        },
    }

    applicant_review_processor._include_avg_score(record)
    assert record["avg_score"] in {10, 0}


def test_avg_score_without_global_field_scores() -> None:
    """Test that avg_score works normally when global_field_scores is missing."""
    record: dict[str, Any] = {
        "_id": "edu.uci.sydnee",
        "status": "REVIEWED",
        "application_data": {
            "reviews": [
                [datetime(2023, 1, 19), "edu.uci.alicia", 10],
                [datetime(2023, 1, 19), "edu.uci.alicia2", 0],
            ],
        },
    }

    applicant_review_processor._include_avg_score(record)
    assert record["avg_score"] in {10, 0}


def test_avg_score_with_empty_global_field_scores() -> None:
    """Test that avg_score works normally when global_field_scores is empty."""
    record: dict[str, Any] = {
        "_id": "edu.uci.sydnee",
        "status": "REVIEWED",
        "application_data": {
            "reviews": [
                [datetime(2023, 1, 19), "edu.uci.alicia", 10],
                [datetime(2023, 1, 19), "edu.uci.alicia2", 0],
            ],
            "global_field_scores": {},
        },
    }

    applicant_review_processor._include_avg_score(record)
    assert record["avg_score"] in {10, 0}


def test_decision_based_on_threshold_with_overqualified() -> None:
    """Test that decision is REJECTED when avg_score is OVERQUALIFIED."""
    record: dict[str, Any] = {
        "_id": "edu.uci.sydnee",
        "status": "REVIEWED",
        "application_data": {
            "reviews": [
                [datetime(2023, 1, 19), "edu.uci.alicia", 10],
                [datetime(2023, 1, 19), "edu.uci.alicia2", 0],
            ],
            "global_field_scores": {
                "resume": -1000,  # Overqualified (auto-reject)
                "hackathon_experience": 5,
            },
        },
    }

    applicant_review_processor._include_decision_based_on_threshold(
        record, accept=8.0, waitlist=5.0
    )
    assert record["decision"] == "REJECTED"  # OVERQUALIFIED (-3) < waitlist (5.0)


def test_avg_score_not_fully_reviewed() -> None:
    """Test that avg_score returns NOT_FULLY_REVIEWED when there are no reviewers."""
    record: dict[str, Any] = {
        "_id": "edu.uci.sydnee",
        "status": "REVIEWED",
        "application_data": {
            "reviews": [],
        },
    }

    applicant_review_processor._include_avg_score(record)
    assert record["avg_score"] == applicant_review_processor.NOT_FULLY_REVIEWED
