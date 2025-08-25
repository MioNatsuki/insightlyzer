from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models, database
from .auth import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

# Listar todos los usuarios (protegido)
@router.get("/", response_model=List[schemas.UsuarioOut])
def get_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(database.get_db),
    current_user: models.Usuario = Depends(get_current_user)
):
    users = db.query(models.Usuario).offset(skip).limit(limit).all()
    return users

# Obtener usuario por ID (protegido)
@router.get("/{user_id}", response_model=schemas.UsuarioOut)
def get_user(
    user_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.Usuario = Depends(get_current_user)
):
    user = db.query(models.Usuario).filter(models.Usuario.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    return user