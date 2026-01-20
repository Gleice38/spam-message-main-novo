from sqlalchemy.orm import Session
from app.models.contact import Contact
from app.schemas.contact import ContactCreate
from app.models.institution import Campus, AcademicArea
from typing import Dict, Any, List

class ContactRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, contact: ContactCreate) -> Contact:
        db_contact = Contact(
            name=contact.name,
            phone=contact.phone,
            email=contact.email,
            role=contact.role,
            campus_id=contact.campus_id,
            academic_area_id=contact.academic_area_id
        )
        # Salva campos extras se existirem
        if hasattr(contact, "state") and contact.state:
            setattr(db_contact, "state", contact.state)
        if hasattr(contact, "city") and contact.city:
            setattr(db_contact, "city", contact.city)
        if hasattr(contact, "course") and contact.course:
            setattr(db_contact, "course", contact.course)
        self.db.add(db_contact)
        self.db.commit()
        self.db.refresh(db_contact)
        return db_contact

    def get_by_id(self, contact_id: int) -> Contact | None:
        return self.db.query(Contact).filter(Contact.id == contact_id).first()

    def get_by_phone(self, phone: str) -> Contact | None:
        return self.db.query(Contact).filter(Contact.phone == phone).first()

    def list_all(self, skip: int = 0, limit: int = 100):
        return self.db.query(Contact).offset(skip).limit(limit).all()

    def update(self, contact_id: int, contact: ContactCreate) -> Contact:
        db_contact = self.get_by_id(contact_id)
        if db_contact:
            db_contact.name = contact.name
            db_contact.phone = contact.phone
            db_contact.email = contact.email
            db_contact.role = contact.role
            db_contact.campus_id = contact.campus_id
            db_contact.academic_area_id = contact.academic_area_id
            # Atualiza campos extras se existirem
            if hasattr(contact, "state") and contact.state:
                db_contact.state = contact.state
            if hasattr(contact, "city") and contact.city:
                db_contact.city = contact.city
            if hasattr(contact, "course") and contact.course:
                db_contact.course = contact.course
            self.db.commit()
            self.db.refresh(db_contact)
        return db_contact

    def delete(self, contact_id: int) -> bool:
        db_contact = self.get_by_id(contact_id)
        if db_contact:
            self.db.delete(db_contact)
            self.db.commit()
            return True
        return False

    def get_by_filters(self, filters: Dict[str, Any]) -> List[Contact]:
        query = self.db.query(Contact)

        if filters.get("role"):
            query = query.filter(Contact.role == filters["role"])

        # Permitir múltiplos estados (regiões)
        states = filters.get("states") or filters.get("state")
        if states or filters.get("city"):
            query = query.join(Contact.campus)
            if states:
                if isinstance(states, list):
                    query = query.filter(Campus.state.in_(states))
                else:
                    query = query.filter(Campus.state == states)
            if filters.get("city"):
                query = query.filter(Campus.city == filters["city"])

        # Permitir múltiplas áreas acadêmicas
        academic_area_ids = filters.get("academic_area_ids") or filters.get("academic_area_id")
        if academic_area_ids:
            if isinstance(academic_area_ids, list):
                query = query.filter(Contact.academic_area_id.in_(academic_area_ids))
            else:
                query = query.filter(Contact.academic_area_id == academic_area_ids)

        return query.all()
