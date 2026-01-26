from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.db.session import engine
from app.db.base import Base
from app.api import campaigns, contacts, dashboard, webhooks, auth, zapi, media
from app.api.deps import get_current_user
from sqlalchemy import text
from pathlib import Path
from app.core.security import get_password_hash
from app.models.user import User
from app.db.session import SessionLocal

import logging
from app.core.scheduler import start_scheduler
import sys
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s %(name)s %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
start_scheduler()


Base.metadata.create_all(bind=engine)

def seed_reference_data():
    sql_path = Path(__file__).resolve().parents[1] / "insert_campuses.sql"
    if not sql_path.exists():
        return
    sql = sql_path.read_text(encoding="utf-8")
    statements = [stmt.strip() for stmt in sql.split(";") if stmt.strip()]
    if not statements:
        return
    with engine.begin() as conn:
        for stmt in statements:
            conn.exec_driver_sql(stmt)
def ensure_admin_user():
    db = SessionLocal()
    try:
        if not settings.ADMIN_EMAIL or not settings.ADMIN_PASSWORD:
            return
        existing = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if existing:
            return
        user = User(
            email=settings.ADMIN_EMAIL,
            hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
            is_active=True,
        )
        db.add(user)
        db.commit()
    finally:
        db.close()

ensure_admin_user()
seed_reference_data()

app = FastAPI(
    title="📱 Mensagens Cooperativa API",
    description="""
## Sistema de Gerenciamento de Campanhas de Mensagens WhatsApp

API completa para gerenciamento de contatos acadêmicos e disparo de campanhas de mensagens via WhatsApp.

### 🎯 Principais Funcionalidades

* **Autenticação**: Sistema de login com JWT tokens
* **Contatos**: CRUD completo de contatos acadêmicos
* **Campanhas**: Criação e gerenciamento de campanhas de mensagens
* **Dashboard**: Estatísticas e métricas em tempo real
* **Webhooks**: Recebimento de callbacks da API Z-API

### 🔐 Autenticação

A maioria dos endpoints requer autenticação via Bearer Token. Para obter um token:

1. Faça login no endpoint `/api/v1/auth/login`
2. Copie o `access_token` da resposta
3. Use no header: `Authorization: Bearer {seu_token}`

### 📊 Filtros e Paginação

Os endpoints de listagem suportam filtros dinâmicos via query parameters.

### 🚀 Status dos Envios

As campanhas são processadas em background via Celery + Redis.
Use os endpoints de dashboard para acompanhar o progresso.

### 📞 Integração Z-API

Sistema integrado com Z-API para envio de mensagens WhatsApp.
Configure as credenciais no arquivo `.env`.
    """,
    version="1.0.0",
    terms_of_service="https://mensagenscooperativa.com/termos",
    contact={
        "name": "Suporte Técnico - Mensagens Cooperativa",
        "url": "https://mensagenscooperativa.com/suporte",
        "email": "suporte@mensagenscooperativa.com",
    },
    license_info={
        "name": "Proprietary License",
        "url": "https://mensagenscooperativa.com/licenca",
    },
    openapi_tags=[
        {
            "name": "Auth",
            "description": "🔐 Endpoints de autenticação e gerenciamento de sessão. Use o endpoint de login para obter um Bearer token.",
        },
        {
            "name": "Contacts",
            "description": "👥 Gerenciamento completo de contatos acadêmicos. CRUD completo com suporte a filtros avançados por estado, cidade, campus e curso.",
        },
        {
            "name": "Campaigns",
            "description": "📤 Criação e monitoramento de campanhas de mensagens. As mensagens são enviadas em background via Celery.",
        },
        {
            "name": "Dashboard",
            "description": "📊 Estatísticas e métricas do sistema. Visualize total de contatos, campanhas ativas e mensagens enviadas.",
        },
        {
            "name": "Webhooks",
            "description": "🔗 Endpoints públicos para receber callbacks da Z-API. Processam status de envio das mensagens.",
        },
        {
            "name": "Media",
            "description": "🖼️ Gerenciamento de arquivos de mídia. Faça upload e associe arquivos às campanhas e contatos.",
        },
    ],
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    swagger_ui_parameters={

        "defaultModelsExpandDepth": -1,  # Oculta schemas no final da página
        "displayRequestDuration": True,  # Mostra tempo de resposta
        "filter": True,  # Adiciona campo de busca
        "syntaxHighlight.theme": "monokai",  # Tema de código
        "tryItOutEnabled": True,  # Habilita "Try it out" por padrão
    },
)

origins = [o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()]
allow_all_origins = not origins or "*" in origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if allow_all_origins else origins,
    allow_credentials=False if allow_all_origins else True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas PÚBLICAS
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(webhooks.router, prefix="/api/v1/webhooks", tags=["Webhooks"])
app.include_router(zapi.router, prefix="/api/v1/zapi", tags=["ZAPI"])


# Rotas SEM AUTENTICAÇÃO (auth desativado temporariamente)
app.include_router(contacts.router, prefix="/api/v1/contacts", tags=["Contacts"])
app.include_router(campaigns.router, prefix="/api/v1/campaigns", tags=["Campaigns"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["Dashboard"])
app.include_router(media.router, prefix="/api/v1/media", tags=["Media"])
app.mount("/uploaded_media", StaticFiles(directory="uploaded_media"), name="uploaded_media")

@app.get(
    "/",
    summary="Health Check",
    description="Endpoint de verificação de saúde da API. Retorna status e informações básicas do sistema.",
    tags=["System"],
    responses={
        200: {
            "description": "API está funcionando corretamente",
            "content": {
                "application/json": {
                    "example": {
                        "status": "online",
                        "message": "Mensagens Cooperativa API is running",
                        "version": "1.0.0",
                        "database": "mensagens_db",
                        "docs": "/docs"
                    }
                }
            }
        }
    }
)
def root():
    """
    ## Health Check da API

    Verifica se a API está rodando e retorna informações básicas do sistema.

    **Não requer autenticação**
    """
    return {
        "status": "online",
        "message": "Mensagens Cooperativa API is running",
        "version": "1.0.0",
        "database": settings.POSTGRES_DB,
        "docs": "/docs"
    }
