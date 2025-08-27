from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON, Float, Text
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

class Analisis(Base):
    __tablename__ = "analisis"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    
    # Información de la URL y configuración
    url = Column(String(500), nullable=False)
    tipo_analisis = Column(String(20), nullable=False)  # 'individual' o 'comparativo'
    tamano_muestra = Column(String(20), nullable=False)  # 'pequena' o 'mediana'
    
    # Opciones de análisis (solo para individual)
    analizar_interaccion = Column(Boolean, default=False)
    analizar_sentimiento = Column(Boolean, default=False)
    analizar_paleta_colores = Column(Boolean, default=False)
    analizar_demograficos = Column(Boolean, default=False)
    
    # Estado del análisis
    estado = Column(String(20), default='pendiente')  # 'pendiente', 'procesando', 'completado', 'error'
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_completado = Column(DateTime(timezone=True))
    
    # Resultados generales (metadata)
    total_paginas_analizadas = Column(Integer, default=0)
    total_articulos_analizados = Column(Integer, default=0)
    resultado_general = Column(JSON)  # Resumen general del análisis
    
    # Relaciones
    usuario = relationship("Usuario")
    resultados_interaccion = relationship("ResultadoInteraccion", back_populates="analisis", cascade="all, delete-orphan")
    resultados_sentimiento = relationship("ResultadoSentimiento", back_populates="analisis", cascade="all, delete-orphan")
    resultados_colores = relationship("ResultadoColores", back_populates="analisis", cascade="all, delete-orphan")
    resultados_demograficos = relationship("ResultadoDemograficos", back_populates="analisis", cascade="all, delete-orphan")
    resultados_comparativos = relationship("ResultadoComparativo", back_populates="analisis", cascade="all, delete-orphan")
    reportes = relationship("Reporte", back_populates="analisis", cascade="all, delete-orphan")

class ResultadoInteraccion(Base):
    __tablename__ = "resultados_interaccion"
    
    id = Column(Integer, primary_key=True)
    analisis_id = Column(Integer, ForeignKey('analisis.id'), nullable=False)
    
    # Métricas de interacción
    total_comentarios = Column(Integer, default=0)
    total_resenas = Column(Integer, default=0)
    total_shares = Column(Integer, default=0)
    promedio_engagement = Column(Float, default=0.0)
    
    # Desglose por artículo/página
    desglose_articulos = Column(JSON)  # [{articulo_id: 1, comentarios: 50, resenas: 30, shares: 20}, ...]
    
    # Timestamp
    creado_en = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relación
    analisis = relationship("Analisis", back_populates="resultados_interaccion")

class ResultadoSentimiento(Base):
    __tablename__ = "resultados_sentimiento"
    
    id = Column(Integer, primary_key=True)
    analisis_id = Column(Integer, ForeignKey('analisis.id'), nullable=False)
    
    # Distribución de sentimientos
    positivo = Column(Integer, default=0)
    negativo = Column(Integer, default=0)
    neutro = Column(Integer, default=0)
    indiferente = Column(Integer, default=0)
    groserias = Column(Integer, default=0)
    baneable = Column(Integer, default=0)
    total_comentarios_analizados = Column(Integer, default=0)
    
    # Análisis detallado
    detalle_sentimientos = Column(JSON)  # [{comentario: "texto", sentimiento: "positivo", score: 0.95}, ...]
    palabras_clave_positivas = Column(JSON)  # [{palabra: "excelente", frecuencia: 25}, ...]
    palabras_clave_negativas = Column(JSON)  # [{palabra: "pésimo", frecuencia: 15}, ...]
    
    # Timestamp
    creado_en = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relación
    analisis = relationship("Analisis", back_populates="resultados_sentimiento")

class ResultadoColores(Base):
    __tablename__ = "resultados_colores"
    
    id = Column(Integer, primary_key=True)
    analisis_id = Column(Integer, ForeignKey('analisis.id'), nullable=False)
    
    # Paleta de colores
    colores_primarios = Column(JSON)  # [{color: "#FF5733", porcentaje: 35.5}, ...]
    colores_secundarios = Column(JSON)  # [{color: "#33FF57", porcentaje: 20.2}, ...]
    colores_acento = Column(JSON)  # [{color: "#3357FF", porcentaje: 10.1}, ...]
    
    # Análisis de impacto visual
    armonia_color = Column(String(50))  # 'complementaria', 'análoga', 'triádica', etc.
    contraste_promedio = Column(Float, default=0.0)
    accesibilidad_color = Column(String(20))  # 'buena', 'regular', 'mala'
    
    # Interpretación
    interpretacion_paleta = Column(Text)
    emociones_asociadas = Column(JSON)  # ["confianza", "energía", "calma", ...]
    
    # Timestamp
    creado_en = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relación
    analisis = relationship("Analisis", back_populates="resultados_colores")

class ResultadoDemograficos(Base):
    __tablename__ = "resultados_demograficos"
    
    id = Column(Integer, primary_key=True)
    analisis_id = Column(Integer, ForeignKey('analisis.id'), nullable=False)
    
    # Distribución demográfica
    distribucion_genero = Column(JSON)  # [{genero: "masculino", porcentaje: 55.5}, ...]
    distribucion_edad = Column(JSON)  # [{rango: "18-24", porcentaje: 25.3}, ...]
    distribucion_ubicacion = Column(JSON)  # [{pais: "México", porcentaje: 45.2}, ...]
    distribucion_dispositivos = Column(JSON)  # [{dispositivo: "mobile", porcentaje: 65.7}, ...]
    
    # Métricas adicionales
    total_usuarios_analizados = Column(Integer, default=0)
    tasa_crecimiento = Column(Float, default=0.0)
    
    # Timestamp
    creado_en = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relación
    analisis = relationship("Analisis", back_populates="resultados_demograficos")

class ResultadoComparativo(Base):
    __tablename__ = "resultados_comparativos"
    
    id = Column(Integer, primary_key=True)
    analisis_id = Column(Integer, ForeignKey('analisis.id'), nullable=False)
    
    # Información de competidores
    competidores = Column(JSON)  # [{nombre: "Competidor1", url: "https://...", tipo: "directo"}, ...]
    
    # Métricas comparativas
    metricas = Column(JSON)  # [{metrica: "beneficios", sitio_actual: 8.5, competidor1: 7.2, competidor2: 6.8}, ...]
    
    # Scores y rankings
    scores_finales = Column(JSON)  # [{sitio: "Actual", score_total: 85.5}, ...]
    ranking_final = Column(JSON)  # [{posicion: 1, sitio: "Actual", puntuacion: 85.5}, ...]
    
    # Análisis interpretativo
    interpretacion = Column(Text)
    recomendaciones = Column(JSON)  # ["Mejorar en beneficios", "Optimizar precios", ...]
    
    # Timestamp
    creado_en = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relación
    analisis = relationship("Analisis", back_populates="resultados_comparativos")

class Reporte(Base):
    __tablename__ = "reportes"
    
    id = Column(Integer, primary_key=True)
    analisis_id = Column(Integer, ForeignKey('analisis.id'), nullable=False)
    
    # Información del reporte
    tipo_reporte = Column(String(20), nullable=False)  # 'pdf', 'powerbi', 'csv'
    formato = Column(String(50), nullable=False)  # 'PDF', 'PBIX', 'CSV'
    ruta_archivo = Column(String(500), nullable=False)
    tamano_archivo = Column(Integer, default=0)
    
    # Metadata
    fecha_generacion = Column(DateTime(timezone=True), server_default=func.now())
    estado = Column(String(20), default='completado')  # 'generando', 'completado', 'error'
    
    # Relación
    analisis = relationship("Analisis", back_populates="reportes")