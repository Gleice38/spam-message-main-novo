from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.session import Base

class Campus(Base):
    __tablename__ = "campuses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    city = Column(String, index=True)
    state = Column(String, index=True)

    contacts = relationship("Contact", back_populates="campus")

class AcademicArea(Base):
    __tablename__ = "academic_areas"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    contacts = relationship("Contact", back_populates="academic_area")
