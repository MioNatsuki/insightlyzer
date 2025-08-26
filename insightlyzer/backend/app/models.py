from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relaciones
    perfil = relationship("UsuarioPerfil", back_populates="usuario", uselist=False, cascade="all, delete-orphan")
    settings = relationship("UsuarioSettings", back_populates="usuario", uselist=False, cascade="all, delete-orphan")

class UsuarioPerfil(Base):
    __tablename__ = "usuario_perfil"

    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'), unique=True, nullable=False)
    
    # Información personal
    nombre = Column(String(150), default="")
    apellido_paterno = Column(String(150), default="")
    apellido_materno = Column(String(150), default="")
    telefono = Column(String(20), default="")
    email_notificaciones = Column(String(255), default="")
    
    # Configuraciones y preferencias
    preferencias_notificacion = Column(String, default='{"email": true, "push": false, "sms": false}')
    
    # Información de actividad
    miembro_desde = Column(DateTime(timezone=True), server_default=func.now())
    ultimo_acceso = Column(DateTime(timezone=True), nullable=True)
    analisis_realizados = Column(Integer, default=0)
    
    # Contenido del perfil
    foto_url = Column(String, default="")
    bio = Column(String, default="")
    
    # Control del perfil
    perfil_activo = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relación
    usuario = relationship("Usuario", back_populates="perfil")

class UsuarioSettings(Base):
    __tablename__ = "usuario_settings"

    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'), unique=True, nullable=False)
    idioma = Column(String(10), default='es')
    tema = Column(String(20), default='light')
    notificaciones_email = Column(Boolean, default=True)
    notificaciones_push = Column(Boolean, default=True)
    notificaciones_sms = Column(Boolean, default=False)  # Nuevo campo
    actualizado_en = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relación
    usuario = relationship("Usuario", back_populates="settings")