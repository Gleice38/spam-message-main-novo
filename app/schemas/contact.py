from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ContactBase(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    role: Optional[str] = "STUDENT"
    campus_id: Optional[int] = None
    academic_area_id: Optional[int] = None
    
    # Fields from API docs
    state: Optional[str] = None
    city: Optional[str] = None
    campus: Optional[str] = None
    course: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class ContactResponse(ContactBase):
    id: int
    create_at: datetime

    class Config:
        from_attributes = True
