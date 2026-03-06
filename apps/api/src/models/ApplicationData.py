from datetime import datetime
from enum import Enum
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
    "majors_and_minors",
    "areas_of_development",
]


NullableHttpUrl = Annotated[Union[None, HttpUrl], BeforeValidator(make_empty_none)]


def _empty_to_none_proficiency(val: Union[str, None]) -> Union[str, None]:
    if val == "" or val is None:
        return None
    return val


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


ProficiencyLevel = Literal["no_experience", "beginner", "intermediate", "advanced"]
ProficiencyOptional = Annotated[
    Union[ProficiencyLevel, None],
    BeforeValidator(_empty_to_none_proficiency),
]


# mentor application model
class BaseMentorApplicationData(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, str_max_length=254)

    year: str
    major: str
    affiliation: str
    linkedin: NullableHttpUrl = None
    github: NullableHttpUrl = None
    website: NullableHttpUrl = None
    t_shirt_size: str
    availability: str = Field(max_length=2048)

    proficiency_figma: ProficiencyOptional = None
    proficiency_java: ProficiencyOptional = None
    proficiency_cpp: ProficiencyOptional = None
    proficiency_c: ProficiencyOptional = None
    proficiency_python: ProficiencyOptional = None
    proficiency_nodejs: ProficiencyOptional = None
    proficiency_mongodb: ProficiencyOptional = None
    proficiency_html_css: ProficiencyOptional = None
    proficiency_javascript: ProficiencyOptional = None
    proficiency_flask: ProficiencyOptional = None
    proficiency_django: ProficiencyOptional = None
    proficiency_rest_apis: ProficiencyOptional = None
    proficiency_firebase: ProficiencyOptional = None
    proficiency_sql: ProficiencyOptional = None
    proficiency_sass: ProficiencyOptional = None
    proficiency_expressjs: ProficiencyOptional = None
    proficiency_nosql: ProficiencyOptional = None

    other_skills_technologies: Union[str, None] = Field(None, max_length=2048)
    areas_of_development: list[str] = []

    why_mentor_frq: str = Field(max_length=2048)
    contribute_inclusive_frq: str = Field(max_length=2048)
    available_entire_duration: bool
    availability_specify: Union[str, None] = Field(None, max_length=2048)
    questions_comments_concerns: Union[str, None] = Field(None, max_length=2048)


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
    other_questions: Union[str, None] = Field(None, max_length=2048)

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

    @field_serializer("linkedin", "github", "website", "resume_url")
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
        if "why_mentor_frq" in v:
            return "mentor"
        if "frq_volunteer" in v:
            return "volunteer"

    if "frq_project" in dir(v):
        return "hacker"
    if "why_mentor_frq" in dir(v):
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
    Union[Annotated[RawHackerApplicationData, Tag("hacker")],],
    Discriminator(get_raw_hacker_discriminator_value),
]


def get_raw_mentor_discriminator_value(v: Any) -> str:
    """Discriminator function for raw mentor application data."""
    if isinstance(v, dict):
        # Check for unique fields to distinguish between the two types
        if "why_mentor_frq" in v:
            return "mentor"

    # For object instances, check attributes
    if hasattr(v, "why_mentor_frq"):
        return "mentor"

    return ""


RawMentorApplicationDataUnion = Annotated[
    Union[Annotated[RawMentorApplicationData, Tag("mentor")],],
    Discriminator(get_raw_mentor_discriminator_value),
]
