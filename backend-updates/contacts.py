from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact_service import ContactService

router = APIRouter()

@router.post(
    "/",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar novo contato",
    description="Cria um novo contato acadêmico no banco de dados com validação de dados.",
    response_description="Contato criado com sucesso",
    responses={
        201: {
            "description": "Contato criado com sucesso",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "name": "Maria Silva Santos",
                        "phone": "5581987654321",
                        "email": "maria.silva@universidade.edu.br",
                        "role": "STUDENT",
                        "state": "PE",
                        "city": "Recife",
                        "campus": "Campus Recife",
                        "course": "Ciência da Computação",
                        "create_at": "2026-01-14T10:30:00"
                    }
                }
            }
        },
        400: {
            "description": "Dados inválidos",
            "content": {
                "application/json": {
                    "example": {
                        "detail": "Telefone deve conter apenas números"
                    }
                }
            }
        },
        401: {
            "description": "Não autenticado",
            "content": {
                "application/json": {
                    "example": {
                        "detail": "Token inválido ou expirado"
                    }
                }
            }
        }
    }
)
def create_contact(data: ContactCreate, db: Session = Depends(get_db)):
    """
    ## Criar Novo Contato Acadêmico

    Cria um novo contato no sistema com os seguintes campos:

    - **name**: Nome completo do contato (obrigatório)
    - **phone**: Telefone no formato internacional sem espaços ou caracteres especiais (obrigatório)
    - **email**: Email válido (opcional)
    - **role**: Tipo de perfil: STUDENT, PROFESSOR, COORDINATOR, VISITOR (default: STUDENT)
    - **state**: Sigla do estado (UF)
    - **city**: Nome da cidade
    - **campus**: Nome do campus
    - **course**: Nome do curso

    ### Exemplo de Request Body:
    ```json
    {
      "name": "Maria Silva Santos",
      "phone": "5581987654321",
      "email": "maria.silva@universidade.edu.br",
      "role": "STUDENT",
      "state": "PE",
      "city": "Recife",
      "campus": "Campus Recife",
      "course": "Ciência da Computação"
    }
    ```

    ### Validações:
    - O telefone deve estar no formato internacional (ex: 5581987654321)
    - O email deve ser válido
    - O nome deve ter pelo menos 3 caracteres
    """
    service = ContactService(db)
    return service.create_contact(data)

@router.get(
    "/",
    response_model=List[ContactResponse],
    summary="Listar todos os contatos",
    description="Retorna lista completa de contatos cadastrados no sistema.",
    response_description="Lista de contatos",
    responses={
        200: {
            "description": "Lista de contatos retornada com sucesso",
            "content": {
                "application/json": {
                    "example": [
                        {
                            "id": 1,
                            "name": "Maria Silva Santos",
                            "phone": "5581987654321",
                            "email": "maria.silva@universidade.edu.br",
                            "role": "STUDENT",
                            "state": "PE",
                            "city": "Recife",
                            "campus": "Campus Recife",
                            "course": "Ciência da Computação",
                            "create_at": "2026-01-14T10:30:00"
                        },
                        {
                            "id": 2,
                            "name": "João Pedro Oliveira",
                            "phone": "5511987654321",
                            "email": "joao.pedro@universidade.edu.br",
                            "role": "PROFESSOR",
                            "state": "SP",
                            "city": "São Paulo",
                            "campus": "Campus São Paulo",
                            "course": "Engenharia de Software",
                            "create_at": "2026-01-14T11:00:00"
                        }
                    ]
                }
            }
        },
        401: {
            "description": "Não autenticado"
        }
    }
)
def list_contacts(db: Session = Depends(get_db)):
    """
    ## Listar Todos os Contatos

    Retorna a lista completa de contatos cadastrados no sistema.

    ### Funcionalidades:
    - Ordenação por data de criação (mais recentes primeiro)
    - Inclui todos os campos do contato
    - Suporta filtros futuros via query parameters

    ### Próximas versões incluirão:
    - Paginação (limit/offset)
    - Filtros por estado, cidade, campus, curso
    - Busca por nome ou telefone
    - Ordenação customizada
    """
    service = ContactService(db)
    return service.list_contacts()

@router.put(
    "/{contact_id}",
    response_model=ContactResponse,
    summary="Atualizar contato existente",
    description="Atualiza os dados de um contato específico pelo ID.",
    response_description="Contato atualizado com sucesso",
    responses={
        200: {
            "description": "Contato atualizado com sucesso",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "name": "Maria Silva Santos (Atualizado)",
                        "phone": "5581987654321",
                        "email": "maria.nova@universidade.edu.br",
                        "role": "PROFESSOR",
                        "state": "PE",
                        "city": "Recife",
                        "campus": "Campus Recife",
                        "course": "Ciência da Computação",
                        "create_at": "2026-01-14T10:30:00"
                    }
                }
            }
        },
        404: {
            "description": "Contato não encontrado",
            "content": {
                "application/json": {
                    "example": {
                        "detail": "Contato com ID 999 não encontrado"
                    }
                }
            }
        },
        401: {
            "description": "Não autenticado"
        }
    }
)
def update_contact(contact_id: int, data: ContactCreate, db: Session = Depends(get_db)):
    """
    ## Atualizar Contato

    Atualiza todos os campos de um contato existente.

    ### Path Parameters:
    - **contact_id**: ID do contato a ser atualizado

    ### Request Body:
    Mesmos campos do endpoint de criação. Todos os campos serão atualizados.

    ### Exemplo:
    ```json
    {
      "name": "Maria Silva Santos (Atualizado)",
      "phone": "5581987654321",
      "email": "maria.nova@universidade.edu.br",
      "role": "PROFESSOR",
      "state": "PE",
      "city": "Recife",
      "campus": "Campus Recife",
      "course": "Ciência da Computação"
    }
    ```

    ### Notas:
    - Todos os campos são obrigatórios (exceto email)
    - O ID não pode ser alterado
    - A data de criação (create_at) permanece inalterada
    """
    service = ContactService(db)
    return service.update_contact(contact_id, data)

@router.delete(
    "/{contact_id}",
    status_code=status.HTTP_200_OK,
    summary="Deletar contato",
    description="Remove permanentemente um contato do sistema pelo ID.",
    response_description="Contato deletado com sucesso",
    responses={
        200: {
            "description": "Contato deletado com sucesso",
            "content": {
                "application/json": {
                    "example": {
                        "message": "Contato deletado com sucesso"
                    }
                }
            }
        },
        404: {
            "description": "Contato não encontrado",
            "content": {
                "application/json": {
                    "example": {
                        "detail": "Contato com ID 999 não encontrado"
                    }
                }
            }
        },
        409: {
            "description": "Contato possui campanhas associadas",
            "content": {
                "application/json": {
                    "example": {
                        "detail": "Não é possível deletar contato com campanhas ativas"
                    }
                }
            }
        },
        401: {
            "description": "Não autenticado"
        }
    }
)
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    """
    ## Deletar Contato

    Remove permanentemente um contato do banco de dados.

    ### Path Parameters:
    - **contact_id**: ID do contato a ser deletado

    ### ⚠️ ATENÇÃO:
    - Esta operação é **IRREVERSÍVEL**
    - Contatos com campanhas ativas não podem ser deletados
    - Recomenda-se fazer backup antes de deletar contatos em massa

    ### Validações:
    - Verifica se o contato existe
    - Verifica se não há campanhas pendentes associadas
    - Retorna erro 404 se o contato não for encontrado
    - Retorna erro 409 se houver conflito com campanhas
    """
    service = ContactService(db)
    service.delete_contact(contact_id)
    return {"message": "Contato deletado com sucesso"}
