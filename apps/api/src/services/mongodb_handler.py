import asyncio
import os
from enum import Enum
from logging import getLogger
from typing import Any, Mapping, Optional, Sequence, Union

from bson import CodecOptions
from motor.core import AgnosticClient, AgnosticDatabase
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, Field
from pymongo import UpdateMany, UpdateOne

log = getLogger(__name__)

STAGING_ENV = os.getenv("DEPLOYMENT") == "STAGING"

MONGODB_URI = os.getenv("MONGODB_URI")

# Mypy thinks AgnosticClient is a generic type, but providing type parameters to it
# raises a TypeError.
MONGODB_CLIENT: AgnosticClient = AsyncIOMotorClient(MONGODB_URI)  # type: ignore

# Resolve Vercel runtime issue
MONGODB_CLIENT.get_io_loop = asyncio.get_event_loop  # type: ignore

DB_NAME = "venushacks" if STAGING_ENV else "venushacks-prod"


class BaseRecord(BaseModel):
    """Represents any object in the users collection."""

    model_config = ConfigDict(populate_by_name=True)

    uid: str = Field(alias="_id")

    def model_dump(self, *args: Any, **kwargs: Any) -> dict[str, Any]:
        if "by_alias" in kwargs:
            return BaseModel.model_dump(self, *args, **kwargs)
        return BaseModel.model_dump(self, by_alias=True, *args, **kwargs)


class Collection(str, Enum):
    USERS = "users"
    TESTING = "testing"
    SETTINGS = "settings"
    EVENTS = "events"
    EMAILS = "emails"
    CODES = "codes"
    MAILING_LIST = "mailing_list"


def get_database() -> AgnosticDatabase[Any]:
    database_name = DB_NAME

    log.info(f"Using database: {database_name}")

    return MONGODB_CLIENT[database_name].with_options(
        codec_options=CodecOptions(tz_aware=True)
    )


async def insert(
    collection: Collection, data: Mapping[str, object]
) -> Union[str, bool]:
    """Insert a document into the specified collection of the database"""
    DB = get_database()
    COLLECTION = DB[collection.value]
    result = await COLLECTION.insert_one(data)
    if not result.acknowledged:
        log.error("MongoDB document insertion was not acknowledged")
        raise RuntimeError("Could not insert document into MongoDB collection")
    new_document_id: str = result.inserted_id
    return new_document_id


async def retrieve_one(
    collection: Collection, query: Mapping[str, object], fields: list[str] = []
) -> Optional[dict[str, Any]]:
    """Search for and retrieve the specified fields of all documents (if any exist)
    that satisfy the provided query."""
    DB = get_database()
    COLLECTION = DB[collection.value]

    result: Optional[dict[str, object]] = await COLLECTION.find_one(query, fields)
    return result


async def retrieve(
    collection: Collection,
    query: Mapping[str, object],
    fields: list[str] = [],
    sort: Optional[list[tuple[str, int]]] = None,
) -> list[dict[str, object]]:
    """Search for and retrieve the specified fields of a document (if any exist)
    that satisfy the provided query."""
    DB = get_database()
    COLLECTION = DB[collection.value]

    result = COLLECTION.find(query, fields)
    if sort:
        result = result.sort(sort)

    output: list[dict[str, object]] = await result.to_list(length=None)
    return output


async def update_one(
    collection: Collection,
    query: Mapping[str, object],
    new_data: Mapping[str, object],
    *,
    upsert: bool = False,
) -> bool:
    """Search for and set a document's fields using the provided query and data."""
    return await raw_update_one(collection, query, {"$set": new_data}, upsert=upsert)


async def raw_update_one(
    collection: Collection,
    query: Mapping[str, object],
    update: Mapping[str, object],
    *,
    upsert: bool = False,
) -> bool:
    """Search for and update a document using the provided query and raw update."""
    DB = get_database()
    COLLECTION = DB[collection.value]
    result = await COLLECTION.update_one(query, update, upsert=upsert)
    if not result.acknowledged:
        log.error("MongoDB document update was not acknowledged")
        raise RuntimeError("Could not update documents in MongoDB collection")

    return result.modified_count > 0


async def update(
    collection: Collection, query: Mapping[str, object], new_data: Mapping[str, object]
) -> bool:
    """Search for and update documents (if they exist) using the provided query data."""
    DB = get_database()
    COLLECTION = DB[collection.value]
    result = await COLLECTION.update_many(query, {"$set": new_data})
    if not result.acknowledged:
        log.error("MongoDB document update was not acknowledged")
        raise RuntimeError("Could not update documents in MongoDB collection")

    return result.modified_count > 0


async def bulk_update(
    collection: Collection,
    operations: Sequence[Union[UpdateOne, UpdateMany]],
) -> bool:
    """
    Perform multiple updates in bulk on a collection.

    operations should be a list of pymongo UpdateOne or UpdateMany objects.
    Returns True if at least one document was modified.
    """
    if not operations:
        log.warning("No operations provided to bulk_update")
        return False

    DB = get_database()
    COLLECTION = DB[collection.value]

    result = await COLLECTION.bulk_write(operations)

    if not result.acknowledged:
        log.error("MongoDB bulk write was not acknowledged")
        raise RuntimeError("Could not perform bulk write in MongoDB collection")

    log.info(f"Bulk write completed: {result.modified_count} documents modified")
    return result.modified_count > 0
