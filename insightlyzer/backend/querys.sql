-- ============================================
-- TABLA: Usuarios
-- ============================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_updated_at
BEFORE UPDATE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();


-- ============================================
-- TABLA: Perfil del usuario (COMPLETA)
-- ============================================
DROP TABLE IF EXISTS usuario_perfil CASCADE;
CREATE TABLE usuario_perfil (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,

    -- Información personal
    nombre VARCHAR(150) NOT NULL,
    apellido_paterno VARCHAR(150) NOT NULL,
    apellido_materno VARCHAR(150),
    telefono VARCHAR(20),
    email_notificaciones VARCHAR(255),

    -- Configuraciones y preferencias
    preferencias_notificacion JSONB DEFAULT '{"email": true, "push": false, "sms": false}'::jsonb,

    -- Información de actividad
    miembro_desde TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ultimo_acceso TIMESTAMP WITH TIME ZONE,
    analisis_realizados INTEGER DEFAULT 0,

    -- Contenido del perfil
    foto_url TEXT,
    bio TEXT,

    -- Control del perfil
    perfil_activo BOOLEAN DEFAULT true,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- ============================================
-- ÍNDICES
-- ============================================
CREATE INDEX idx_usuario_perfil_usuario_id ON usuario_perfil(usuario_id);
CREATE INDEX idx_usuario_perfil_ultimo_acceso ON usuario_perfil(ultimo_acceso);
CREATE INDEX idx_usuario_perfil_activo ON usuario_perfil(perfil_activo);
-- ============================================
-- TRIGGER PARA UPDATED_AT
-- ============================================
CREATE TRIGGER trigger_set_updated_at_perfil
BEFORE UPDATE ON usuario_perfil
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
-- ============================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- ============================================
COMMENT ON TABLE usuario_perfil IS 'Perfil detallado del usuario con información personal y preferencias';
COMMENT ON COLUMN usuario_perfil.preferencias_notificacion IS 'JSON con preferencias: {"email": boolean, "push": boolean, "sms": boolean}';
COMMENT ON COLUMN usuario_perfil.analisis_realizados IS 'Contador de análisis totales realizados por el usuario';
COMMENT ON COLUMN usuario_perfil.perfil_activo IS 'Indica si el perfil está activo (para soft delete)';
COMMENT ON COLUMN usuario_perfil.email_notificaciones IS 'Email específico para recibir notificaciones (puede diferir del email de login)';
COMMENT ON COLUMN usuario_perfil.miembro_desde IS 'Fecha de registro del usuario en la plataforma';
COMMENT ON COLUMN usuario_perfil.ultimo_acceso IS 'Última vez que el usuario accedió al sistema';
-- ============================================
-- CONSTRAINT ADICIONAL (OPCIONAL)
-- ============================================
ALTER TABLE usuario_perfil ADD CONSTRAINT unique_usuario_perfil UNIQUE(usuario_id);


-- ============================================
-- TABLA: Configuración de usuario
-- ============================================
CREATE TABLE usuario_settings (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    idioma VARCHAR(10) DEFAULT 'es',
    tema VARCHAR(20) DEFAULT 'light', -- light/dark
    notificaciones_email BOOLEAN DEFAULT TRUE,
    notificaciones_push BOOLEAN DEFAULT TRUE,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- ============================================
-- TABLA: Notificaciones
-- ============================================
CREATE TABLE usuario_notificaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    creada_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- ============================================
-- MÓDULO DE ANÁLISIS
-- ============================================

-- Tabla principal de análisis
CREATE TABLE analisis (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(20) DEFAULT 'pendiente', -- pendiente, procesado, error
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resultados KPI
CREATE TABLE resultados_kpi (
    id SERIAL PRIMARY KEY,
    analisis_id INT NOT NULL REFERENCES analisis(id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,         -- ej: “Total de análisis”, “Promedio calidad”
    valor_num FLOAT NOT NULL,
    unidad VARCHAR(20)                    -- ej: “%”, “número”
);

-- Resultados por categoría
CREATE TABLE resultados_categoria (
    id SERIAL PRIMARY KEY,
    analisis_id INT NOT NULL REFERENCES analisis(id) ON DELETE CASCADE,
    categoria VARCHAR(100) NOT NULL,      -- ej: “Positivo”, “Negativo”, “Neutro”
    cantidad INT NOT NULL,
    porcentaje FLOAT NOT NULL
);

-- Resultados de calidad
CREATE TABLE resultados_calidad (
    id SERIAL PRIMARY KEY,
    analisis_id INT NOT NULL REFERENCES analisis(id) ON DELETE CASCADE,
    metrica VARCHAR(100) NOT NULL,        -- ej: “Claridad”, “Precisión”
    puntuacion FLOAT NOT NULL             -- ej: 0–100
);

-- Reportes generados
CREATE TABLE reportes (
    id SERIAL PRIMARY KEY,
    analisis_id INT NOT NULL REFERENCES analisis(id) ON DELETE CASCADE,
    tipo VARCHAR(20) NOT NULL,            -- PDF, Excel
    url_reporte TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gráficas
CREATE TABLE graficas (
    id SERIAL PRIMARY KEY,
    analisis_id INT NOT NULL REFERENCES analisis(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL,            -- barras, pie, linea
    titulo VARCHAR(255),
    descripcion TEXT
);

-- Datos de gráficas (detalle)
CREATE TABLE graficas_datos (
    id SERIAL PRIMARY KEY,
    grafica_id INT NOT NULL REFERENCES graficas(id) ON DELETE CASCADE,
    etiqueta VARCHAR(100) NOT NULL,       -- ej: “Enero”, “Positivo”
    valor FLOAT NOT NULL
);
