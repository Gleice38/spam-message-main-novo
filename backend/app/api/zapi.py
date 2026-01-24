import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.config import settings

ZAPI_CLIENT_TOKEN = settings.ZAPI_CLIENT_TOKEN
ZAPI_INSTANCE_TOKEN = settings.ZAPI_INSTANCE_TOKEN
ZAPI_INSTANCE_ID = settings.ZAPI_INSTANCE_ID

router = APIRouter()

class WhatsAppMessage(BaseModel):
    phone: str
    message: str

@router.post("/send-whatsapp", tags=["ZAPI"])
def send_whatsapp(msg: WhatsAppMessage):
    url = f"https://api.z-api.io/instances/{ZAPI_INSTANCE_ID}/token/{ZAPI_INSTANCE_TOKEN}/send-text"
    headers = {
        "Client-Token": ZAPI_CLIENT_TOKEN,
        "Content-Type": "application/json"
    }
    payload = {
        "phone": msg.phone,
        "message": msg.message
    }
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))
