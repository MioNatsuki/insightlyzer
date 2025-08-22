// src/features/history/pages/ProfilePage.jsx
import React from "react";

export default function ProfilePage() {
  // Variables para controlar el tamaño de los contenedores
  const containerHeight = "632px";
  const leftContainerWidth = "660px";
  const rightContainerWidth = "1880px";

  return (
    <div
      style={{
        marginLeft: "225px",
        padding: "32px",
        backgroundColor: "#f8fafc",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: '"Noto Sans", sans-serif',
      }}
    >
      {/* Título y separador */}
      <div style={{ marginBottom: "32px", flexShrink: 0 }}>
        <h1
          style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: "20px",
            fontWeight: "400",
            color: "#2d3748",
            marginBottom: "12px",
            marginTop: "-13px",
          }}
        >
          Perfil de usuario
        </h1>
        <div
          style={{
            height: "1px",
            backgroundColor: "#4FC3A1",
            width: "100%",
          }}
        />
      </div>

      {/* Contenedor principal */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          flex: 1,
          maxHeight: "calc(100vh - 180px)",
          overflow: "auto",
        }}
      >
        {/* Columna izquierda - avatar y datos básicos */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            padding: "20px",
            width: leftContainerWidth,
            height: containerHeight,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          {/* Sección superior - Avatar y datos principales */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Avatar con botón de edición */}
            <div style={{ position: "relative", marginBottom: "12px" }}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundImage: "url(https://randomuser.me/api/portraits/women/32.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <button
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  backgroundColor: "#4FC3A1",
                  border: "none",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
                title="Editar foto de perfil"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="white"/>
                </svg>
              </button>
            </div>
            
            <h2
              style={{
                fontSize: "20px",
                color: "#2d3748",
                marginBottom: "6px",
                fontFamily: '"Noto Sans", sans-serif',
                textAlign: "center",
                margin: "0 0 6px 0",
              }}
            >
              Maria de los Milagros
            </h2>
            <p style={{ 
              fontSize: "14px", 
              color: "#64748b", 
              marginBottom: "16px",
              fontFamily: '"Noto Sans", sans-serif',
              margin: "0 0 16px 0",
            }}>
              maria@example.com
            </p>
            <span
              style={{
                backgroundColor: "#4FC3A1",
                color: "white",
                fontSize: "12px",
                padding: "4px 12px",
                borderRadius: "9999px",
                fontFamily: '"Noto Sans", sans-serif',
              }}
            >
              Administrador
            </span>
          </div>

          {/* Información adicional */}
          <div style={{ width: "100%", padding: "0 10px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{ fontSize: "16px", color: "#2d3748", marginBottom: "12px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", margin: "0 0 12px 0" }}>
              Información adicional
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <span style={{ fontWeight: "bold", color: "#475569", fontSize: "14px" }}>Miembro desde:</span>
                <span style={{ marginLeft: "8px", color: "#64748b", fontSize: "14px" }}>Enero 2023</span>
              </div>
              <div>
                <span style={{ fontWeight: "bold", color: "#475569", fontSize: "14px" }}>Último acceso:</span>
                <span style={{ marginLeft: "8px", color: "#64748b", fontSize: "14px" }}>Hace 2 horas</span>
              </div>
              <div>
                <span style={{ fontWeight: "bold", color: "#475569", fontSize: "14px" }}>Análisis realizados:</span>
                <span style={{ marginLeft: "8px", color: "#64748b", fontSize: "14px" }}>47</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - configuración */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            padding: "20px",
            width: rightContainerWidth,
            height: containerHeight,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              color: "#2d3748",
              marginBottom: "20px",
              fontFamily: '"Noto Sans", sans-serif',
              paddingLeft: "4px",
            }}
          >
            Configuración de la cuenta
          </h3>

          {/* Formulario de ejemplo */}
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <form style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      marginBottom: "6px",
                      color: "#475569",
                      fontFamily: '"Noto Sans", sans-serif',
                    }}
                  >
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    defaultValue="Maria de los Milagros"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontFamily: '"Noto Sans", sans-serif',
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      marginBottom: "6px",
                      color: "#475569",
                      fontFamily: '"Noto Sans", sans-serif',
                    }}
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    defaultValue="maria@example.com"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontFamily: '"Noto Sans", sans-serif',
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      marginBottom: "6px",
                      color: "#475569",
                      fontFamily: '"Noto Sans", sans-serif',
                    }}
                  >
                    Cambiar contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontFamily: '"Noto Sans", sans-serif',
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      marginBottom: "6px",
                      color: "#475569",
                      fontFamily: '"Noto Sans", sans-serif',
                    }}
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontFamily: '"Noto Sans", sans-serif',
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "16px", color: "#2d3748", marginBottom: "12px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", margin: "0 0 12px 0" }}>
                  Preferencias de notificación
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: "#4FC3A1" }} />
                    <span>Notificaciones por correo electrónico</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: "#4FC3A1" }} />
                    <span>Recordatorios de análisis programados</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                    <input type="checkbox" style={{ accentColor: "#4FC3A1" }} />
                    <span>Notificaciones de nuevos features</span>
                  </label>
                </div>

                <div style={{ marginTop: "auto", paddingTop: "20px" }}>
                  <button
                    type="button"
                    style={{
                      backgroundColor: "#4FC3A1",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      cursor: "pointer",
                      fontFamily: '"Noto Sans", sans-serif',
                    }}
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}