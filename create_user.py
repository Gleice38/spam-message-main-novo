#!/usr/bin/env python3
import sys
sys.path.insert(0, '/home/backend/sistema-mensagem-api')

from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

def create_user():
    db = SessionLocal()
    try:
        # Verificar se usuário já existe
        existing = db.query(User).filter(User.email == "admin@test.com").first()
        if existing:
            print("Usuário admin@test.com já existe")
            return

        # Criar novo usuário
        user = User(
            email="admin@test.com",
            hashed_password=get_password_hash("admin123"),
            is_active=True
        )
        db.add(user)
        db.commit()
        print("Usuário admin@test.com criado com sucesso! Senha: admin123")
    except Exception as e:
        print(f"Erro: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_user()
