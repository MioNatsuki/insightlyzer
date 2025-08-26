from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import schemas, models, database, auth
from .auth import get_current_user
import shutil
import os
from datetime import datetime

router = APIRouter(prefix="/users", tags=["Users"])

# Configuración para upload de imágenes
UPLOAD_DIR = "uploads/profile_photos"
os.makedirs(UPLOAD_DIR, exist_ok=True)

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

# Obtener perfil del usuario actual (protegido)
@router.get("/me/perfil", response_model=schemas.UsuarioPerfilOut)
def get_my_perfil(
    current_user: models.Usuario = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    perfil = db.query(models.UsuarioPerfil).filter(
        models.UsuarioPerfil.usuario_id == current_user.id
    ).first()
    
    if not perfil:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Perfil no encontrado"
        )
    
    return perfil

# Actualizar perfil del usuario actual (protegido)
@router.put("/me/perfil", response_model=schemas.UsuarioPerfilOut)
def update_my_perfil(
    perfil_data: schemas.UsuarioPerfilUpdate,
    current_user: models.Usuario = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    perfil = db.query(models.UsuarioPerfil).filter(
        models.UsuarioPerfil.usuario_id == current_user.id
    ).first()
    
    if not perfil:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Perfil no encontrado"
        )
    
    # Actualizar campos
    for field, value in perfil_data.dict(exclude_unset=True).items():
        setattr(perfil, field, value)
    
    perfil.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(perfil)
    
    return perfil

# Obtener settings del usuario actual (protegido)
@router.get("/me/settings", response_model=schemas.UsuarioSettingsOut)
def get_my_settings(
    current_user: models.Usuario = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    settings = db.query(models.UsuarioSettings).filter(
        models.UsuarioSettings.usuario_id == current_user.id
    ).first()
    
    if not settings:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Settings no encontrados"
        )
    
    return settings

# Actualizar settings del usuario actual (protegido)
@router.put("/me/settings", response_model=schemas.UsuarioSettingsOut)
def update_my_settings(
    settings_data: schemas.UsuarioSettingsUpdate,
    current_user: models.Usuario = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    settings = db.query(models.UsuarioSettings).filter(
        models.UsuarioSettings.usuario_id == current_user.id
    ).first()
    
    if not settings:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Settings no encontrados"
        )
    
    # Actualizar campos
    for field, value in settings_data.dict(exclude_unset=True).items():
        setattr(settings, field, value)
    
    settings.actualizado_en = datetime.utcnow()
    
    db.commit()
    db.refresh(settings)
    
    return settings

# Actualizar foto de perfil (protegido)
@router.put("/me/foto", response_model=schemas.UsuarioPerfilOut)
async def update_my_foto(
    foto: UploadFile = File(...),
    current_user: models.Usuario = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    # Validar que sea una imagen
    if not foto.content_type.startswith('image/'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El archivo debe ser una imagen"
        )
    
    perfil = db.query(models.UsuarioPerfil).filter(
        models.UsuarioPerfil.usuario_id == current_user.id
    ).first()
    
    if not perfil:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Perfil no encontrado"
        )
    
    # Generar nombre único para el archivo
    file_extension = os.path.splitext(foto.filename)[1]
    filename = f"user_{current_user.id}_{datetime.utcnow().timestamp()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    # Guardar archivo
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(foto.file, buffer)
    
    # Actualizar URL de la foto en la base de datos
    perfil.foto_url = f"/{UPLOAD_DIR}/{filename}"
    perfil.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(perfil)
    
    return perfil

# Eliminar usuario actual (protegido)
@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_my_account(
    current_user: models.Usuario = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    # Buscar y eliminar el usuario (las relaciones se eliminarán en cascada)
    db_user = db.query(models.Usuario).filter(models.Usuario.id == current_user.id).first()
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    
    db.delete(db_user)
    db.commit()
    
    return {"detail": "Usuario eliminado correctamente"}

# Obtener perfil de usuario por ID (protegido)
@router.get("/{user_id}/perfil", response_model=schemas.UsuarioPerfilOut)
def get_user_perfil(
    user_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.Usuario = Depends(get_current_user)
):
    perfil = db.query(models.UsuarioPerfil).filter(
        models.UsuarioPerfil.usuario_id == user_id
    ).first()
    
    if not perfil:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Perfil no encontrado"
        )
    
    return perfil

# Obtener settings de usuario por ID (protegido)
@router.get("/{user_id}/settings", response_model=schemas.UsuarioSettingsOut)
def get_user_settings(
    user_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.Usuario = Depends(get_current_user)
):
    settings = db.query(models.UsuarioSettings).filter(
        models.UsuarioSettings.usuario_id == user_id
    ).first()
    
    if not settings:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Settings no encontrados"
        )
    
    return settings