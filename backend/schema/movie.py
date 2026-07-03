import uuid
from pydantic import BaseModel
from datetime import datetime

class baseMovie(BaseModel):
    title: str

    class Config:
        from_attributes = True
        orm_mode = True

class MovieInput(baseMovie):
    pass

class ResponseMovie(baseMovie):
    id: uuid.UUID
    watched: bool
    created_at: datetime



