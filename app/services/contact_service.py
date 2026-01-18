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
        return self.repo.create(data)

    def list_contacts(self):
        return self.repo.list_all()

    def update_contact(self, contact_id: int, data: ContactCreate):
        # Verifica se o contato existe
        contact = self.repo.get_by_id(contact_id)
        if not contact:
            raise HTTPException(status_code=404, detail="Contato não encontrado")

        # Verifica se o telefone já está sendo usado por outro contato
        existing = self.repo.get_by_phone(data.phone)
        if existing and existing.id != contact_id:
            raise HTTPException(status_code=400, detail="Telefone já cadastrado para outro contato")

        return self.repo.update(contact_id, data)

    def delete_contact(self, contact_id: int):
        contact = self.repo.get_by_id(contact_id)
        if not contact:
            raise HTTPException(status_code=404, detail="Contato não encontrado")

        return self.repo.delete(contact_id)
