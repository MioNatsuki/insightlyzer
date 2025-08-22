// src/features/settings/pages/SettingsPage.jsx
import React from "react";

export default function SettingsPage() {
  return (
    <div
      style={{
        marginLeft: "225px",
        padding: "32px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Título */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: "20px",
            fontWeight: "400",
            color: "#2d3748",
            marginBottom: "12px",
          }}
        >
          Configuración
        </h1>
        <div
          style={{
            height: "1px",
            backgroundColor: "#4FC3A1",
            width: "100%",
          }}
        />
      </div>

      {/* Preferencias */}
      <section
        style={{
          marginBottom: "32px",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ fontSize: "16px", marginBottom: "16px", color: "#2d3748" }}>
          Preferencias
        </h2>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input type="checkbox" /> Modo oscuro
          </label>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input type="checkbox" /> Modo claro
          </label>
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Idioma
          </label>
          <select
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #cbd5e0",
            }}
          >
            <option>Español</option>
            <option>Inglés</option>
          </select>
        </div>
      </section>

      {/* Notificaciones */}
      <section
        style={{
          marginBottom: "32px",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ fontSize: "16px", marginBottom: "16px", color: "#2d3748" }}>
          Notificaciones
        </h2>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input type="checkbox" /> Notificaciones por correo
          </label>
        </div>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input type="checkbox" /> Notificaciones en la aplicación
          </label>
        </div>
      </section>

      {/* Seguridad */}
      <section
        style={{
          marginBottom: "32px",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ fontSize: "16px", marginBottom: "16px", color: "#2d3748" }}>
          Seguridad
        </h2>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: "#4FC3A1",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            Cambiar contraseña
          </button>
          <button
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: "#e53e3e",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            Cerrar sesión en todos los dispositivos
          </button>
        </div>
      </section>

      {/* Botón guardar */}
      <div style={{ textAlign: "center" }}>
        <button
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: "#4FC3A1",
            border: "none",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
