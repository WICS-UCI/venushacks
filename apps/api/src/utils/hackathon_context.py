from enum import Enum
from contextvars import ContextVar


class HackathonName(str, Enum):
    VENUSHACKS = "venushacks"
    IRVINEHACKS = "irvinehacks"


ALLOWED_HACKATHONS = {HackathonName.VENUSHACKS, HackathonName.IRVINEHACKS}

hackathon_name_ctx: ContextVar[HackathonName] = ContextVar(
    "hackathon_name", default=HackathonName.VENUSHACKS
)
