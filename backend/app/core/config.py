from pydantic_settings import BaseSettings
from typing import Optional
from pathlib import Path



class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Mensagens Cooperativa API"
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_DB: str = "mensagens_db"
    SQLALCHEMY_DATABASE_URI: Optional[str] = None
    # Z-API WhatsApp
    ZAPI_CLIENT_TOKEN: str = ""
    ZAPI_INSTANCE_TOKEN: str = ""
    ZAPI_INSTANCE_ID: str = ""
    CORS_ORIGINS: str = ""

    class Config:
        case_sensitive = True
        env_file = str(Path(__file__).resolve().parents[3] / ".env")
        env_file_encoding = "utf-8"


    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.SQLALCHEMY_DATABASE_URI:
            self.SQLALCHEMY_DATABASE_URI = "sqlite:///./mensagens.db"

settings = Settings()
