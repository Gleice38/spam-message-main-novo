
from sqlalchemy.orm import Session

from app.schemas.campaign import CampaignCreate
from app.core.config import settings
from app.repositories.contact_repository import ContactRepository
import requests


class CampaignService:
    def list_all(self):
        from app.repositories.campaign_repository import CampaignRepository
        campaign_repo = CampaignRepository(self.db)
        campaigns = campaign_repo.list_all()
        return [self._to_response(c) for c in campaigns]

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

    def html_to_plain_text(self, html):
        import re
        # WhatsApp formatting: *bold*, _italic_, ~strikethrough~, ``monospace``
        text = html
        # Negrito: <b>, <strong>
        text = re.sub(r'<(b|strong)>(.*?)</\1>', r'*\2*', text, flags=re.IGNORECASE)
        # Itálico: <i>, <em>
        text = re.sub(r'<(i|em)>(.*?)</\1>', r'_\2_', text, flags=re.IGNORECASE)
        # Sublinhado: <u> (remover, WhatsApp não suporta)
        text = re.sub(r'<u>(.*?)</u>', r'\1', text, flags=re.IGNORECASE)
        # Tachado: <s>, <strike>
        text = re.sub(r'<(s|strike)>(.*?)</\1>', r'~\2~', text, flags=re.IGNORECASE)
        # Monospace: <code>, <pre>
        text = re.sub(r'<(code|pre)>(.*?)</\1>', r'```\2```', text, flags=re.IGNORECASE)
        # Listas ordenadas <ol><li>...</li></ol>
        def ol_replacer(match):
            items = re.findall(r'<li>(.*?)</li>', match.group(0), flags=re.IGNORECASE)
            return '\n'.join([f"{i+1}. {item.strip()}" for i, item in enumerate(items)])
        text = re.sub(r'<ol[^>]*>.*?</ol>', ol_replacer, text, flags=re.DOTALL|re.IGNORECASE)
        # Listas não ordenadas <ul><li>...</li></ul>
        def ul_replacer(match):
            items = re.findall(r'<li>(.*?)</li>', match.group(0), flags=re.IGNORECASE)
            return '\n'.join([f"- {item.strip()}" for item in items])
        text = re.sub(r'<ul[^>]*>.*?</ul>', ul_replacer, text, flags=re.DOTALL|re.IGNORECASE)
        # Quebra de linha: <br>, <div>, <p>
        text = re.sub(r'<br\s*/?>', '\n', text)
        text = re.sub(r'</div>|</p>', '\n', text, flags=re.IGNORECASE)
        text = re.sub(r'<div[^>]*>|<p[^>]*>', '', text, flags=re.IGNORECASE)
        # Links: <a href="url">texto</a> => texto (url)
        text = re.sub(r'<a [^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', r'\2 (\1)', text)
        # Remove demais tags
        text = re.sub(r'<[^>]+>', '', text)
        # Entidades HTML
        text = re.sub(r'&nbsp;', ' ', text)
        text = re.sub(r'&amp;', '&', text)
        text = re.sub(r'&lt;', '<', text)
        text = re.sub(r'&gt;', '>', text)
        return text.strip()

    def create_and_launch(self, data: CampaignCreate):
        from app.repositories.campaign_repository import CampaignRepository
        from datetime import datetime, timezone
        import mimetypes
        import logging
        from fastapi import HTTPException
        campaign_repo = CampaignRepository(self.db)
        contact_repo = ContactRepository(self.db)
        now = datetime.now(timezone.utc)
        logging.info(f"[AGENDAMENTO] now: {now} | scheduled_at: {data.scheduled_at}")
        # Validação: scheduled_at não pode ser passado
        if data.scheduled_at and data.scheduled_at < now:
            logging.warning(f"[AGENDAMENTO] scheduled_at ({data.scheduled_at}) está no passado. Rejeitando campanha.")
            raise HTTPException(status_code=400, detail="A data de agendamento deve ser futura.")
        # Decide status inicial
        status = "SCHEDULED" if data.scheduled_at and data.scheduled_at > now else "PENDING"
        logging.info(f"[AGENDAMENTO] Status definido: {status}")
        # Salva campanha no banco
        campaign_data = {
            "name": data.name,
            "message_body": data.message_body,
            "scheduled_at": data.scheduled_at,
            "status": status,
            "filters_snapshot": data.filters_snapshot
        }
        campaign = campaign_repo.create(campaign_data)
        # Se for agendada, não envia agora
        if status == "SCHEDULED":
            logging.info(f"[AGENDAMENTO] Campanha agendada, não será enviada agora. ID: {campaign.id}")
            return self._to_response(campaign)
        # Se for envio imediato, processa
        filters = data.filters_snapshot or {}
        from app.constants.data import REGIONS, ACADEMIC_AREAS
        if "regions" in filters:
            selected_states = []
            for region in filters["regions"]:
                for reg in REGIONS:
                    if reg["name"] == region or reg["id"] == region:
                        selected_states.extend(reg["states"])
            filters["states"] = selected_states
        if "academic_areas" in filters:
            selected_ids = []
            for area in filters["academic_areas"]:
                for a in ACADEMIC_AREAS:
                    if a["name"] == area or a["id"] == area:
                        selected_ids.append(a["id"])
            filters["academic_area_ids"] = selected_ids
        contacts = contact_repo.get_by_filters(filters)
        zapi_results = []
        for contact in contacts:
            plain_message = self.html_to_plain_text(data.message_body)
            caption = f"{data.name}\n\n{plain_message}"
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
        return self._to_response(campaign)

    def process_scheduled_campaigns(self):
        from app.models.campaign import Campaign
        from datetime import datetime, timezone
        now = datetime.now(timezone.utc)
        # Busca campanhas agendadas que já passaram do horário
        campaigns = self.db.query(Campaign).filter(
            Campaign.status == "SCHEDULED",
            Campaign.scheduled_at != None,
            Campaign.scheduled_at <= now
        ).all()
        from app.repositories.campaign_repository import CampaignRepository
        campaign_repo = CampaignRepository(self.db)
        for campaign in campaigns:
            # Atualiza status para PENDING antes de enviar
            campaign.status = "PENDING"
            self.db.commit()
            # Reutiliza a lógica de envio imediato, mas ignora validação de scheduled_at < now
            data = CampaignCreate(
                name=campaign.name,
                message_body=campaign.message_body,
                scheduled_at=None,  # Força envio imediato
                filters_snapshot=campaign.filters_snapshot
            )
            self.create_and_launch(data)
            # Atualiza status para SENT após envio (ou RUNNING/COMPLETED conforme sua lógica)
            campaign.status = "SENT"
            self.db.commit()

    def list_messages(self, campaign_id: int):
        # Mock implementation
        return []
