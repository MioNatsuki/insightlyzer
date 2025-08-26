from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from typing import Optional, Dict, Any

class UsuarioCreate(BaseModel):
    email: EmailStr
    password: str

class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str

class UsuarioOut(BaseModel):
    id: int
    email: EmailStr
    is_active: bool
    created_at: datetime
    
    # Configuración para Pydantic v2
    model_config = ConfigDict(from_attributes=True)

class UsuarioPerfilOut(BaseModel):
    id: int
    usuario_id: int
    nombre: str
    apellido_paterno: str
    apellido_materno: Optional[str] = ""
    telefono: Optional[str] = ""
    email_notificaciones: Optional[str] = ""
    preferencias_notificacion: Optional[Dict[str, Any]] = None
    miembro_desde: Optional[datetime] = None
    ultimo_acceso: Optional[datetime] = None
    analisis_realizados: Optional[int] = 0
    foto_url: Optional[str] = ""
    bio: Optional[str] = ""
    perfil_activo: Optional[bool] = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)

# En schemas.py, actualiza UsuarioSettingsOut
class UsuarioSettingsOut(BaseModel):
    id: int
    usuario_id: int
    idioma: Optional[str] = "es"
    tema: Optional[str] = "light"
    notificaciones_email: Optional[bool] = True
    notificaciones_push: Optional[bool] = True
    notificaciones_sms: Optional[bool] = False  # Nuevo campo
    actualizado_en: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UsuarioPerfilUpdate(BaseModel):
    nombre: Optional[str] = None
    apellido_paterno: Optional[str] = None
    apellido_materno: Optional[str] = None
    telefono: Optional[str] = None
    email_notificaciones: Optional[str] = None
    bio: Optional[str] = None
    preferencias_notificacion: Optional[Dict[str, Any]] = None
    
    model_config = ConfigDict(from_attributes=True)

class UsuarioSettingsUpdate(BaseModel):
    idioma: Optional[str] = None
    tema: Optional[str] = None
    notificaciones_email: Optional[bool] = None
    notificaciones_push: Optional[bool] = None
    notificaciones_sms: Optional[bool] = None
    
    model_config = ConfigDict(from_attributes=True)