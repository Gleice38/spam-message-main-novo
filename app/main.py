from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine
from app.db.base import Base
from app.api import campaigns, contacts, dashboard, webhooks, auth
from app.api.deps import get_current_user


Base.metadata.create_all(bind=engine)

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

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3002",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://89.117.33.220:3002",
    "http://89.117.33.220",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas PÚBLICAS
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(webhooks.router, prefix="/api/v1/webhooks", tags=["Webhooks"])

# Rotas PROTEGIDAS
app.include_router(contacts.router, prefix="/api/v1/contacts", tags=["Contacts"], dependencies=[Depends(get_current_user)])
app.include_router(campaigns.router, prefix="/api/v1/campaigns", tags=["Campaigns"], dependencies=[Depends(get_current_user)])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["Dashboard"], dependencies=[Depends(get_current_user)])

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
