from sqlalchemy.orm import Session
from app.repositories.contact_repository import ContactRepository
from app.schemas.contact import ContactCreate
from fastapi import HTTPException

class ContactService:
    def __init__(self, db: Session):
        self.repo = ContactRepository(db)


    def create_contact(self, data: ContactCreate):
        if self.repo.get_by_phone(data.phone):
            raise HTTPException(status_code=400, detail="Telefone já cadastrado")
        contato = self.repo.create(data)
        return self._to_response(contato)

    def list_contacts(self):
        contatos = self.repo.list_all()
        return [self._to_response(c) for c in contatos]
    def _to_response(self, contato):
        # Serializa o contato para o schema de resposta, convertendo o campus para string
        campus_nome = None
        if hasattr(contato, "campus") and contato.campus:
            campus_nome = contato.campus.name
        # Garante que todos os campos extras estejam presentes na resposta
        return {
            "id": contato.id,
            "name": contato.name,
            "phone": contato.phone,
            "email": contato.email,
            "role": contato.role,
            "campus_id": contato.campus_id,
            "academic_area_id": contato.academic_area_id,
            "state": getattr(contato, "state", None) if hasattr(contato, "state") else None,
            "city": getattr(contato, "city", None) if hasattr(contato, "city") else None,
            "campus": campus_nome,
            "course": getattr(contato, "course", None) if hasattr(contato, "course") else None,
            "create_at": contato.create_at,
        }

    def update_contact(self, contact_id: int, data: ContactCreate):
        # Verifica se o contato existe
        contact = self.repo.get_by_id(contact_id)
        if not contact:
            raise HTTPException(status_code=404, detail="Contato não encontrado")

        # Verifica se o telefone já está sendo usado por outro contato
        existing = self.repo.get_by_phone(data.phone)
        if existing and existing.id != contact_id:
            raise HTTPException(status_code=400, detail="Telefone já cadastrado para outro contato")

        contato_atualizado = self.repo.update(contact_id, data)
        return self._to_response(contato_atualizado)

    def delete_contact(self, contact_id: int):
        contact = self.repo.get_by_id(contact_id)
        if not contact:
            raise HTTPException(status_code=404, detail="Contato não encontrado")

        return self.repo.delete(contact_id)
