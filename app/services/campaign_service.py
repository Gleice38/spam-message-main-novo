from sqlalchemy.orm import Session
from app.schemas.campaign import CampaignCreate

class CampaignService:
    def __init__(self, db: Session):
        self.db = db

    def create_and_launch(self, data: CampaignCreate):
        # Mock implementation
        return {
            "id": 1,
            "name": data.name,
            "message_body": data.message_body,
            "status": "PENDING",
            "scheduled_at": data.scheduled_at,
            "filters_snapshot": data.filters_snapshot
        }

    def list_messages(self, campaign_id: int):
        # Mock implementation
        return []
