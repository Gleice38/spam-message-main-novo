from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class CampaignCreate(BaseModel):
    name: str
    message_body: str
    scheduled_at: Optional[datetime] = None
    filters_snapshot: Optional[Dict[str, Any]] = None

class CampaignResponse(CampaignCreate):
    id: int
    status: str

    class Config:
        from_attributes = True

class MessageResponse(BaseModel):
    id: int
    contact_id: int
    status: str
    zapi_message_id: Optional[str] = None

    class Config:
        from_attributes = True
