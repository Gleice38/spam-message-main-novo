#!/usr/bin/env python3
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash
from app.core.config import settings

def create_user():
    db = SessionLocal()
    try:
        # Verificar se usuário já existe
        existing = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if existing:
            print(f"Usuário {settings.ADMIN_EMAIL} já existe")
            return

        # Criar novo usuário
        user = User(
            email=settings.ADMIN_EMAIL,
            hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
            is_active=True
        )
        db.add(user)
        db.commit()
        print(f"Usuário {settings.ADMIN_EMAIL} criado com sucesso!")
    except Exception as e:
        print(f"Erro: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_user()
