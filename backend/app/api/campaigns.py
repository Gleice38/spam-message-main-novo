from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.campaign import CampaignCreate, CampaignResponse, MessageResponse
from app.services.campaign_service import CampaignService
from app.api.deps import get_current_user

router = APIRouter()

@router.get(
    "/",
    response_model=List[CampaignResponse],
    summary="Listar campanhas",
    description="Retorna todas as campanhas, incluindo agendadas.",
    response_description="Lista de campanhas"
)
def list_campaigns(db: Session = Depends(get_db), user=Depends(get_current_user)):
    service = CampaignService(db)
    return service.list_all()

@router.post(
    "/send",
    response_model=CampaignResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar e enviar campanha",
    description="Cria uma nova campanha e inicia o processo de envio em background via Celery.",
    response_description="Campanha criada e processo de envio iniciado",
    responses={
        201: {
            "description": "Campanha criada com sucesso e envio iniciado",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "name": "Divulgação Mestrado 2026",
                        "message_body": "Olá! Estamos com inscrições abertas para o Mestrado em Ciência da Computação. Inscreva-se até 28/02/2026!",
                        "status": "PENDING",
                        "scheduled_at": None,
                        "filters_snapshot": {
                            "state": "PE",
                            "role": "STUDENT"
                        }
                    }
                }
            }
        },
        400: {
            "description": "Dados inválidos",
            "content": {
                "application/json": {
                    "example": {
                        "detail": "O corpo da mensagem não pode estar vazio"
                    }
                }
            }
        },
        401: {
            "description": "Não autenticado"
        }
    }
)
def create_and_send_campaign(
    data: CampaignCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    """
    ## Criar e Enviar Campanha

    Cria uma nova campanha e inicia o envio de mensagens em background.

    ### Campos do Request Body:
    - **name**: Nome descritivo da campanha (obrigatório)
    - **message_body**: Corpo da mensagem que será enviada (obrigatório, máx 4096 caracteres)
    - **scheduled_at**: Data/hora para agendamento (opcional, ISO 8601 format)
    - **filters_snapshot**: Objeto JSON com filtros de segmentação (opcional)

    ### Exemplo de Request Body:
    ```json
    {
      "name": "Divulgação Mestrado 2026",
      "message_body": "Olá! Estamos com inscrições abertas para o Mestrado em Ciência da Computação. Inscreva-se até 28/02/2026!",
      "scheduled_at": None,
      "filters_snapshot": {
        "state": "PE",
        "city": "Recife",
        "role": "STUDENT",
        "course": "Ciência da Computação"
      }
    }
    ```

    ### Comportamento:
    1. Campanha é criada no banco com status `PENDING`
    2. Task Celery é disparada para processar envios
    3. Cada contato matching recebe uma mensagem via Z-API
    4. Status é atualizado para `RUNNING` → `COMPLETED` ou `FAILED`

    ### Filtros Disponíveis:
    - `state`: Filtrar por estado (UF)
    - `city`: Filtrar por cidade
    - `campus`: Filtrar por campus
    - `course`: Filtrar por curso
    - `role`: Filtrar por perfil (STUDENT, PROFESSOR, etc)

    ### Agendamento:
    - Se `scheduled_at` for nulo, envio inicia imediatamente
    - Se `scheduled_at` for fornecido, envio aguarda data/hora especificada
    - Formato: `2026-02-15T14:30:00` (ISO 8601)

    ### Limitações:
    - Mensagem máximo de 4096 caracteres
    - Rate limit da Z-API aplica-se (verificar plano)
    - Contatos duplicados são enviados apenas uma vez
    """
    service = CampaignService(db)
    return service.create_and_launch(data)

@router.get(
    "/{campaign_id}/messages",
    response_model=List[MessageResponse],
    summary="Listar mensagens da campanha",
    description="Retorna todas as mensagens enviadas em uma campanha específica com seus status.",
    response_description="Lista de mensagens da campanha",
    responses={
        200: {
            "description": "Lista de mensagens retornada com sucesso",
            "content": {
                "application/json": {
                    "example": [
                        {
                            "id": 1,
                            "contact_id": 42,
                            "status": "SENT",
                            "zapi_message_id": "3EB0B14F4E7C3E6B5A1F"
                        },
                        {
                            "id": 2,
                            "contact_id": 43,
                            "status": "DELIVERED",
                            "zapi_message_id": "3EB0B14F4E7C3E6B5A2G"
                        },
                        {
                            "id": 3,
                            "contact_id": 44,
                            "status": "READ",
                            "zapi_message_id": "3EB0B14F4E7C3E6B5A3H"
                        },
                        {
                            "id": 4,
                            "contact_id": 45,
                            "status": "FAILED",
                            "zapi_message_id": None
                        }
                    ]
                }
            }
        },
        404: {
            "description": "Campanha não encontrada",
            "content": {
                "application/json": {
                    "example": {
                        "detail": "Campanha com ID 999 não encontrada"
                    }
                }
            }
        },
        401: {
            "description": "Não autenticado"
        }
    }
)
def get_campaign_messages(campaign_id: int, db: Session = Depends(get_db)):
    """
    ## Listar Mensagens de uma Campanha

    Retorna todas as mensagens individuais enviadas em uma campanha específica.

    ### Path Parameters:
    - **campaign_id**: ID da campanha

    ### Resposta:
    Lista de objetos com os seguintes campos:
    - **id**: ID único da mensagem
    - **contact_id**: ID do contato destinatário
    - **status**: Status atual da mensagem
    - **zapi_message_id**: ID da mensagem na Z-API (se disponível)

    ### Status Possíveis:
    - `PENDING`: Mensagem na fila para envio
    - `SENDING`: Mensagem sendo enviada
    - `SENT`: Mensagem enviada com sucesso
    - `DELIVERED`: Mensagem entregue ao destinatário
    - `READ`: Mensagem lida pelo destinatário
    - `FAILED`: Falha no envio

    ### Uso:
    Útil para acompanhar o progresso de uma campanha e identificar mensagens com falha.

    ### Próximas versões:
    - Filtro por status
    - Paginação
    - Estatísticas agregadas (total por status)
    - Export para CSV/Excel
    """
    service = CampaignService(db)
    return service.list_messages(campaign_id)
