from datetime import datetime
from enum import Enum
import json
from typing import Annotated, Any, Literal, Union

from fastapi import UploadFile
from pydantic import (
    BaseModel,
    BeforeValidator,
    ConfigDict,
    Discriminator,
    EmailStr,
    Field,
    HttpUrl,
    Tag,
    field_serializer,
    field_validator,
)


class Decision(str, Enum):
    ACCEPTED = "ACCEPTED"
    WAITLISTED = "WAITLISTED"
    REJECTED = "REJECTED"


Review = tuple[datetime, str, float]


def make_empty_none(val: Union[str, None]) -> Union[str, None]:
    """Browser will send empty strings for unspecified form inputs."""
    if val == "":
        return None
    return val


FIELDS_SUPPORTING_OTHER = [
    "school",
    "gender_identity",
    "dietary_restrictions",
    "experienced_technologies",
]


NullableHttpUrl = Annotated[Union[None, HttpUrl], BeforeValidator(make_empty_none)]


# hacker application model
class BaseApplicationData(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, str_max_length=254)

    

    date_of_birth: datetime
    is_18_older: bool
    gender_identity: str
    pronouns: list[str] = []

    shirt_size: str
    school: str
    majors_and_minors: list[str] = []
    year: Literal["Freshman", "Sophomore", "Junior", "Senior", "Graduate", "Other"]

    previous_hackathons: int = Field(ge=0)
    previous_vh: bool = False

    share_resume_with_sponsors: bool = True

    dietary_restrictions: Union[str, None] = Field(None, max_length=2048)

    frq_project: str = Field(max_length=2048)
    frq_diversity: str = Field(max_length=2048)
    frq_excited: str = Field(max_length=2048)
    frq_picnic: str = Field(max_length=2048)

    how_did_you_hear_about_us: str = Field(max_length=64)

    questions_comments_concerns: Union[str, None] = Field(None, max_length=2048)



class BaseMentorApplicationData(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, str_max_length=254)

    experienced_technologies: list[str] = []
    pronouns: list[str] = []

    ethnicity: str
    school: str
    major: str
    education_level: str
    is_18_older: bool
    git_experience: str
    github: NullableHttpUrl = None
    portfolio: NullableHttpUrl = None
    linkedin: NullableHttpUrl = None
    mentor_prev_experience_saq1: Union[str, None] = Field(None, max_length=2048)
    mentor_interest_saq2: str = Field(max_length=2048)
    mentor_team_help_saq3: str = Field(max_length=2048)
    mentor_team_help_saq4: str = Field(max_length=2048)
    resume_share_to_sponsors: bool = False
    other_questions: Union[str, None] = Field(None, max_length=2048)


Hour = Annotated[int, Field(ge=7, lt=24)]


class BaseVolunteerApplicationData(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, str_max_length=1024)

    pronouns: list[str] = []
    ethnicity: str
    is_18_older: bool
    school: str
    education_level: str
    major: str
    frq_volunteer: str = Field(max_length=2048)
    frq_utensil: str = Field(max_length=2048)
    allergies: Union[str, None] = Field(None, max_length=2048)
    extra_questions: Union[str, None] = Field(None, max_length=2048)

    friday_availability: list[Hour] = []
    saturday_availability: list[Hour] = []
    sunday_availability: list[Hour] = []


class RawHackerApplicationData(BaseApplicationData):
    """Expected to be sent by the form on the site."""

    first_name: str
    last_name: str
    resume: Union[UploadFile, None] = None
    application_type: Literal["Hacker"]


class RawMentorApplicationData(BaseMentorApplicationData):
    """Expected to be sent by the form on the site."""

    first_name: str
    last_name: str
    resume: UploadFile
    application_type: Literal["Mentor"]


class RawVolunteerApplicationData(BaseVolunteerApplicationData):
    """Expected to be sent by the volunteer form on the site."""

    first_name: str
    last_name: str
    resume: None = None  # to simplify usage of union
    application_type: Literal["Volunteer"]



class ProcessedHackerApplicationData(BaseApplicationData):
    email: EmailStr
    resume_url: Union[HttpUrl, None] = None
    submission_time: datetime
    reviews: list[Review] = []

    @field_serializer("resume_url")
    def url2str(self, val: Union[HttpUrl, None]) -> Union[str, None]:
        if val is not None:
            return str(val)
        return val


class ProcessedMentorApplicationData(BaseMentorApplicationData):
    email: EmailStr
    resume_url: Union[HttpUrl, None] = None
    submission_time: datetime
    reviews: list[Review] = []

    @field_serializer("linkedin", "github", "portfolio", "resume_url")
    def url2str(self, val: Union[HttpUrl, None]) -> Union[str, None]:
        if val is not None:
            return str(val)
        return val


class ProcessedVolunteerApplication(BaseVolunteerApplicationData):
    # TODO: specify common attributes in mixin
    email: EmailStr
    submission_time: datetime
    reviews: list[Review] = []


# To add more discriminating values, add a string
# that doesn't appear in any other form
def get_discriminator_value(v: Any) -> str:
    if isinstance(v, dict):
        if "frq_project" in v:
            return "hacker"
        if "mentor_prev_experience_saq1" in v:
            return "mentor"
        if "frq_volunteer" in v:
            return "volunteer"

    if "frq_project" in dir(v):
        return "hacker"
    if "mentor_prev_experience_saq1" in dir(v):
        return "mentor"
    if "frq_volunteer" in dir(v):
        return "volunteer"
    return ""


ProcessedApplicationDataUnion = Annotated[
    Union[
        Annotated[ProcessedHackerApplicationData, Tag("hacker")],
        Annotated[ProcessedMentorApplicationData, Tag("mentor")],
        Annotated[ProcessedVolunteerApplication, Tag("volunteer")],
    ],
    Discriminator(get_discriminator_value),
]


def get_raw_hacker_discriminator_value(v: Any) -> str:
    """Discriminator function for raw hacker application data."""
    if isinstance(v, dict) and "frq_project" in v:
        return "hacker"

    # For object instances, check attributes
    if hasattr(v, "frq_project"):
        return "hacker"
    return ""


RawHackerApplicationDataUnion = Annotated[
    Union[
        Annotated[RawHackerApplicationData, Tag("hacker")],
    ],
    Discriminator(get_raw_hacker_discriminator_value),
]


def get_raw_mentor_discriminator_value(v: Any) -> str:
    """Discriminator function for raw mentor application data."""
    if isinstance(v, dict):
        # Check for unique fields to distinguish between the two types
        if "mentor_prev_experience_saq1" in v:
            return "mentor"

    # For object instances, check attributes
    if hasattr(v, "mentor_prev_experience_saq1"):
        return "mentor"

    return ""


RawMentorApplicationDataUnion = Annotated[
    Union[
        Annotated[RawMentorApplicationData, Tag("mentor")],
    ],
    Discriminator(get_raw_mentor_discriminator_value),
]
