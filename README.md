# Mensagens Cooperativa

Plataforma de comunicacao academica para envio de mensagens individuais via WhatsApp.

## Requisitos

- Docker e Docker Compose

## Clonar

```bash
git clone <URL_DO_REPOSITORIO>
cd spam-message-main-novo
```

## Configuracao

Edite o arquivo `.env` na raiz com suas credenciais e URLs.

- DEV (localhost): use `VITE_API_BASE_URL_DEV` e `CORS_ORIGINS_DEV`
- PROD (VPS): use `VITE_API_BASE_URL` e `CORS_ORIGINS`

## Rodar local (DEV - localhost)

```bash
docker compose -f docker-compose.dev.yml up --build
```

Acesso:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

Login inicial (dev):
- email: admin@test.com
- senha: admin123

## Rodar em producao (VPS)

Na VPS, com o repositorio clonado e `.env` ajustado para a VPS:

```bash
docker compose up --build
```

Acesso esperado:
- Frontend: http://SEU_IP_OU_DOMINIO:3000
- Backend: http://SEU_IP_OU_DOMINIO:8000

## Observacoes

- O backend cria o usuario admin automaticamente na inicializacao usando `ADMIN_EMAIL` e `ADMIN_PASSWORD` do `.env`.
- Campuses e areas academicas sao inseridos automaticamente a partir de `backend/insert_campuses.sql`.
