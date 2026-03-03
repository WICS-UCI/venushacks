from enum import Enum
from contextvars import ContextVar


class HackathonName(str, Enum):
    VENUSHACK = "venushack"
    ZOTHACKS = "zothacks"


ALLOWED_HACKATHONS = {HackathonName.VENUSHACK, HackathonName.ZOTHACKS}

hackathon_name_ctx: ContextVar[HackathonName] = ContextVar(
    "hackathon_name", default=HackathonName.VENUSHACK
)
