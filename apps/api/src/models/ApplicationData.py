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
    "pronouns",
    "ethnicity",
    "school",
    "major",
    "experienced_technologies",
    "dietary_restrictions",
    "areas_of_development",
    "how_did_you_hear",
]


NullableHttpUrl = Annotated[Union[None, HttpUrl], BeforeValidator(make_empty_none)]


def _empty_to_none_proficiency(val: Union[str, None]) -> Union[str, None]:
    if val == "" or val is None:
        return None
    return val


# hacker application model
class BaseApplicationData(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, str_max_length=254)

    pronouns: list[str] = []

    ethnicity: str
    is_18_older: bool
    school: str
    education_level: str
    major: str
    is_first_hackathon: bool
    linkedin: NullableHttpUrl = None
    portfolio: NullableHttpUrl = None
    frq_change: str = Field(max_length=2048)
    frq_video_game: str = Field(max_length=2048)


ProficiencyLevel = Literal["no_experience", "beginner", "intermediate", "advanced"]
ProficiencyOptional = Annotated[
    Union[ProficiencyLevel, None],
    BeforeValidator(_empty_to_none_proficiency),
]


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
    extra_questions: Union[str, None] = Field(None, max_length=2048)

    friday_availability: list[Hour] = []
    saturday_availability: list[Hour] = []
    sunday_availability: list[Hour] = []


class BaseVenusHacksHackerApplicationData(BaseModel):
    """VenusHacks participant application: I–IV sections from form."""

    model_config = ConfigDict(str_strip_whitespace=True, str_max_length=1024)

    preferred_name: Annotated[
        Union[str, None], Field(None, max_length=254), BeforeValidator(make_empty_none)
    ] = None
    date_of_birth: str = Field(max_length=32)
    is_18_or_older_by_event_date: bool
    gender_identity: str = Field(max_length=254)
    preferred_pronouns: str = Field(max_length=254)
    shirt_size: str = Field(max_length=32)
    university: str = Field(max_length=254)
    major_minors: str = Field(max_length=512)
    year: str = Field(max_length=64)

    num_hackathons_attended: str = Field(max_length=64)
    attended_venushacks_previously: bool
    share_resume_with_sponsors: bool = False
    dietary_restrictions: list[str] = []
    acknowledge_transportation: bool
    acknowledge_in_person_attendance: bool

    project_passionate_about: str = Field(max_length=1024)
    diversity_inclusivity_experiences: str = Field(max_length=1024)
    excited_to_work_on_10_years: str = Field(max_length=1024)
    three_must_haves_picnic: str = Field(max_length=512)

    how_did_you_hear: str = Field(max_length=254)
    questions_comments_concerns: Annotated[
        Union[str, None],
        Field(None, max_length=2048),
        BeforeValidator(make_empty_none),
    ] = None


class BaseVenusHacksMentorApplicationData(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, str_max_length=1024)

    is_18_older: bool
    pronouns: str
    degree: str
    major: str
    graduation_year: int
    mentoring_experience: str = Field(max_length=2048)
    help_participants_frq: str = Field(max_length=2048)
    new_team_help_frq: str = Field(max_length=2048)
    tech_stack_frq: str = Field(max_length=2048)
    frontend_backend_frq: str = Field(max_length=2048)
    skills: list[str] = []

    github: NullableHttpUrl = None
    portfolio: NullableHttpUrl = None
    linkedin: NullableHttpUrl = None
    comments: Union[str, None] = Field(None, max_length=2048)


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


class RawVenusHacksHackerApplicationData(BaseVenusHacksHackerApplicationData):
    first_name: str
    last_name: str
    resume: Union[UploadFile, None] = None
    application_type: Literal["Hacker"]


class RawVenusHacksMentorApplicationData(BaseVenusHacksMentorApplicationData):
    first_name: str
    last_name: str
    resume: UploadFile
    application_type: Literal["Mentor"]


class ProcessedHackerApplicationData(BaseApplicationData):
    email: EmailStr
    resume_url: Union[HttpUrl, None] = None
    submission_time: datetime
    reviews: list[Review] = []

    @field_serializer("linkedin", "portfolio", "resume_url")
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


class ProcessedVenusHacksHackerApplicationData(BaseVenusHacksHackerApplicationData):
    email: EmailStr
    resume_url: Union[HttpUrl, None] = None
    submission_time: datetime
    reviews: list[Review] = []

    @field_serializer("resume_url")
    def url2str(self, val: Union[HttpUrl, None]) -> Union[str, None]:
        if val is not None:
            return str(val)
        return val




class ProcessedVenusHacksMentorApplication(BaseVenusHacksMentorApplicationData):
    email: EmailStr
    resume_url: Union[HttpUrl, None] = None
    submission_time: datetime
    reviews: list[Review] = []

    @field_serializer("linkedin", "github", "portfolio", "resume_url")
    def url2str(self, val: Union[HttpUrl, None]) -> Union[str, None]:
        if val is not None:
            return str(val)
        return val


# To add more discriminating values, add a string
# that doesn't appear in any other form
def get_discriminator_value(v: Any) -> str:
    if isinstance(v, dict):
        if "project_passionate_about" in v:
            return "venushack_hacker"
        if "frq_video_game" in v:
            return "hacker"
        if "why_mentor_frq" in v:
            return "mentor"
        if "frq_volunteer" in v:
            return "volunteer"
        if "elevator_pitch_saq" in v:
            return "zothacks_hacker"
        if "help_participants_frq" in v:
            return "venushack_mentor"

    if "project_passionate_about" in dir(v):
        return "venushack_hacker"
    if "frq_video_game" in dir(v):
        return "hacker"
    if "why_mentor_frq" in dir(v):
        return "mentor"
    if "frq_volunteer" in dir(v):
        return "volunteer"
    if "elevator_pitch_saq" in dir(v):
        return "zothacks_hacker"
    if "help_participants_frq" in dir(v):
        return "venushack_mentor"
    return ""


ProcessedApplicationDataUnion = Annotated[
    Union[
        Annotated[ProcessedVenusHacksHackerApplicationData, Tag("venushack_hacker")],
        Annotated[ProcessedHackerApplicationData, Tag("hacker")],
        Annotated[ProcessedMentorApplicationData, Tag("mentor")],
        Annotated[ProcessedVolunteerApplication, Tag("volunteer")],
        Annotated[ProcessedVenusHacksMentorApplication, Tag("venushack_mentor")],
    ],
    Discriminator(get_discriminator_value),
]


def get_raw_hacker_discriminator_value(v: Any) -> str:
    """Discriminator function for raw hacker application data."""
    if isinstance(v, dict):
        if "project_passionate_about" in v:
            return "venushack_hacker"
        if "frq_video_game" in v:
            return "hacker"
        if "elevator_pitch_saq" in v:
            return "zothacks_hacker"
    if hasattr(v, "project_passionate_about"):
        return "venushack_hacker"
    if hasattr(v, "frq_video_game"):
        return "hacker"
    if hasattr(v, "elevator_pitch_saq"):
        return "zothacks_hacker"
    return ""


RawHackerApplicationDataUnion = Annotated[
    Union[
        Annotated[RawVenusHacksHackerApplicationData, Tag("venushack_hacker")],
        Annotated[RawHackerApplicationData, Tag("hacker")],
    ],
    Discriminator(get_raw_hacker_discriminator_value),
]


def get_raw_mentor_discriminator_value(v: Any) -> str:
    """Discriminator function for raw mentor application data."""
    if isinstance(v, dict):
        # Check for unique fields to distinguish between the two types
        if "why_mentor_frq" in v:
            return "mentor"
        if "help_participants_frq" in v:
            return "venushack_mentor"
    # For object instances, check attributes
    if hasattr(v, "why_mentor_frq"):
        return "mentor"
    if hasattr(v, "help_participants_frq"):
        return "venushack_mentor"

    return ""


RawMentorApplicationDataUnion = Annotated[
    Union[
        Annotated[RawMentorApplicationData, Tag("mentor")],
        Annotated[RawVenusHacksMentorApplicationData, Tag("venushack_mentor")],
    ],
    Discriminator(get_raw_mentor_discriminator_value),
]
