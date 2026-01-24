from sqlalchemy.orm import Session
from app.models.campaign import Campaign

class CampaignRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data):
        campaign = Campaign(**data)
        self.db.add(campaign)
        self.db.commit()
        self.db.refresh(campaign)
        return campaign

    def get_by_id(self, campaign_id: int):
        return self.db.query(Campaign).filter(Campaign.id == campaign_id).first()

    def list_all(self, limit=100):
        return self.db.query(Campaign).order_by(Campaign.created_at.desc()).limit(limit).all()
