from apscheduler.schedulers.background import BackgroundScheduler
from app.db.session import SessionLocal
from app.services.campaign_service import CampaignService
import logging

def process_scheduled_campaigns_job():
    db = SessionLocal()
    try:
        service = CampaignService(db)
        service.process_scheduled_campaigns()
        logging.info("Campanhas agendadas processadas.")
    except Exception as e:
        logging.error(f"Erro ao processar campanhas agendadas: {e}")
    finally:
        db.close()

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(process_scheduled_campaigns_job, 'interval', minutes=1)
    scheduler.start()
    logging.info("APScheduler iniciado para campanhas agendadas.")
