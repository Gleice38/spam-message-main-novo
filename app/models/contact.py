from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String, unique=True, index=True)
    email = Column(String, index=True)
    role = Column(String, default="STUDENT")
    campus_id = Column(Integer, ForeignKey("campuses.id"), nullable=True)
    academic_area_id = Column(Integer, ForeignKey("academic_areas.id"), nullable=True)
    create_at = Column(DateTime(timezone=True), server_default=func.now())

    campus = relationship("Campus", back_populates="contacts")
    academic_area = relationship("AcademicArea", back_populates="contacts")
