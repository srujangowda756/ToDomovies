from sqlalchemy import Column, String, Boolean, DateTime
from database import Base
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Movie(Base):
    __tablename__ = "movies"
    
    id = Column(UUID, primary_key=True, index=True,default=uuid.uuid4)
    title = Column(String, index=True)
    watched = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now)
