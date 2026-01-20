
from sqlalchemy.orm import Session

from app.schemas.campaign import CampaignCreate
from app.core.config import settings
from app.repositories.contact_repository import ContactRepository
import requests


class CampaignService:
    def __init__(self, db: Session):
        self.db = db
        # Z-API config for WhatsApp integration
        self.zapi_instance_id = settings.ZAPI_INSTANCE_ID
        self.zapi_instance_token = settings.ZAPI_INSTANCE_TOKEN
        self.zapi_client_token = settings.ZAPI_CLIENT_TOKEN

    def _to_response(self, campaign):
        # Garante que todos os campos esperados estejam presentes na resposta
        return {
            "id": campaign.id,
            "name": campaign.name,
            "message_body": campaign.message_body,
            "scheduled_at": campaign.scheduled_at,
            "filters_snapshot": getattr(campaign, "filters_snapshot", None),
            "status": campaign.status,
        }

    def create_and_launch(self, data: CampaignCreate):
        # Busca contatos pelo filtro
        contact_repo = ContactRepository(self.db)
        filters = data.filters_snapshot or {}

        # Converter regions para states se necessário
        from app.constants.data import REGIONS, ACADEMIC_AREAS
        if "regions" in filters:
            selected_states = []
            for region in filters["regions"]:
                # Aceita tanto nome quanto id
                for reg in REGIONS:
                    if reg["name"] == region or reg["id"] == region:
                        selected_states.extend(reg["states"])
            filters["states"] = selected_states

        # Converter academic_areas para academic_area_ids se necessário
        if "academic_areas" in filters:
            selected_ids = []
            for area in filters["academic_areas"]:
                # Aceita tanto nome quanto id
                for a in ACADEMIC_AREAS:
                    if a["name"] == area or a["id"] == area:
                        selected_ids.append(a["id"])
            filters["academic_area_ids"] = selected_ids

        contacts = contact_repo.get_by_filters(filters)

        import mimetypes
        zapi_results = []
        for contact in contacts:
            caption = f"{data.name}\n{data.message_body}"
            media_url = getattr(data, 'media_url', None)
            zapi_message_id = None
            try:
                headers = {
                    "Client-Token": self.zapi_client_token,
                    "Content-Type": "application/json"
                }
                if media_url:
                    mime, _ = mimetypes.guess_type(media_url)
                    if mime and mime.startswith('image/'):
                        url = f"https://api.z-api.io/instances/{self.zapi_instance_id}/token/{self.zapi_instance_token}/send-image"
                        payload = {
                            "phone": contact.phone,
                            "image": media_url,
                            "caption": caption
                        }
                    elif mime == 'application/pdf':
                        url = f"https://api.z-api.io/instances/{self.zapi_instance_id}/token/{self.zapi_instance_token}/send-document"
                        payload = {
                            "phone": contact.phone,
                            "document": media_url,
                            "filename": media_url.split('/')[-1],
                            "caption": caption
                        }
                    else:
                        url = f"https://api.z-api.io/instances/{self.zapi_instance_id}/token/{self.zapi_instance_token}/send-text"
                        payload = {
                            "phone": contact.phone,
                            "message": caption
                        }
                else:
                    url = f"https://api.z-api.io/instances/{self.zapi_instance_id}/token/{self.zapi_instance_token}/send-text"
                    payload = {
                        "phone": contact.phone,
                        "message": caption
                    }
                print(f"[ZAPI] Enviando para: {url}")
                print(f"[ZAPI] Payload: {payload}")
                resp = requests.post(url, json=payload, headers=headers, timeout=10)
                print(f"[ZAPI] Status: {resp.status_code}")
                print(f"[ZAPI] Resposta: {resp.text}")
                if resp.ok:
                    resp_json = resp.json()
                    zapi_message_id = resp_json.get("messageId")
            except Exception as e:
                print(f"[ZAPI] Erro ao enviar: {e}")
                zapi_message_id = None
            zapi_results.append({
                "contact_id": contact.id,
                "status": "SENT" if zapi_message_id else "FAILED",
                "zapi_message_id": zapi_message_id
            })

        # Retorno padrão (mock id de campanha)
        return {
            "id": 1,
            "name": data.name,
            "message_body": data.message_body,
            "status": "PENDING",
            "scheduled_at": data.scheduled_at,
            "filters_snapshot": data.filters_snapshot,
            "messages": zapi_results
        }

    def list_messages(self, campaign_id: int):
        # Mock implementation
        return []
