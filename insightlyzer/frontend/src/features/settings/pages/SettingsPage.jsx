// src/features/settings/pages/SettingsPage.jsx
import React, { useState, useEffect } from "react";
import { apiService } from "../../../services/api";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    tema: "light",
    idioma: "es",
    notificaciones_email: true,
    notificaciones_push: false,
    notificaciones_sms: false
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Cargar configuraciones del usuario
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const settingsData = await apiService.request('/users/me/settings', { method: 'GET' });
        setSettings(settingsData);
      } catch (error) {
        console.error("Error loading settings:", error);
        setMessage("Error al cargar las configuraciones");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      setSaving(true);
      await apiService.request('/users/me/settings', {
        method: 'PUT',
        body: JSON.stringify(settings)
      });
      setMessage("Configuraciones guardadas correctamente");
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage("Error al guardar las configuraciones");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        marginLeft: "225px",
        padding: "32px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Cargando configuraciones...
      </div>
    );
  }

  return (
    <div
      style={{
        marginLeft: "225px",
        padding: "32px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        maxHeight: "985px",
        overflowY: "auto",
        fontFamily: '"Noto Sans", sans-serif',
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
        
        {message && (
          <div style={{
            padding: "10px",
            backgroundColor: message.includes("Error") ? "#fee2e2" : "#d1fae5",
            color: message.includes("Error") ? "#dc2626" : "#065f46",
            borderRadius: "6px",
            marginBottom: "12px",
            fontSize: "14px"
          }}>
            {message}
          </div>
        )}
        
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
          marginBottom: "20px",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ 
          fontSize: "16px", 
          marginBottom: "16px", 
          color: "#2d3748",
          fontFamily: '"Noto Sans", sans-serif' 
        }}>
          Preferencias
        </h2>
        
        <div style={{ marginBottom: "16px" }}>
          <label style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            color: "#475569",
            fontSize: "14px",
            fontFamily: '"Noto Sans", sans-serif'
          }}>
            <input 
              type="checkbox" 
              name="tema"
              value="dark"
              checked={settings.tema === "dark"}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                tema: e.target.checked ? "dark" : "light"
              }))}
              style={{ 
                accentColor: "#4FC3A1",
                width: "16px",
                height: "16px"
              }} 
            />
            Modo oscuro
          </label>
        </div>
        
        <div style={{ marginBottom: "16px" }}>
          <label style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            color: "#475569",
            fontSize: "14px",
            fontFamily: '"Noto Sans", sans-serif'
          }}>
            <input 
              type="checkbox" 
              name="tema"
              value="light"
              checked={settings.tema === "light"}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                tema: e.target.checked ? "light" : "dark"
              }))}
              style={{ 
                accentColor: "#4FC3A1",
                width: "16px",
                height: "16px"
              }} 
            />
            Modo claro
          </label>
        </div>
        
        <div>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            color: "#475569",
            fontSize: "14px",
            fontFamily: '"Noto Sans", sans-serif'
          }}>
            Idioma
          </label>
          <select
            name="idioma"
            value={settings.idioma}
            onChange={handleInputChange}
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #cbd5e0",
              fontSize: "14px",
              fontFamily: '"Noto Sans", sans-serif',
            }}
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
      </section>

      {/* Notificaciones */}
      <section
        style={{
          marginBottom: "20px",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ 
          fontSize: "16px", 
          marginBottom: "16px", 
          color: "#2d3748",
          fontFamily: '"Noto Sans", sans-serif' 
        }}>
          Notificaciones
        </h2>
        
        <div style={{ marginBottom: "12px" }}>
          <label style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            color: "#475569",
            fontSize: "14px",
            fontFamily: '"Noto Sans", sans-serif'
          }}>
            <input 
              type="checkbox" 
              name="notificaciones_email"
              checked={settings.notificaciones_email}
              onChange={handleInputChange}
              style={{ 
                accentColor: "#4FC3A1",
                width: "16px",
                height: "16px"
              }} 
            />
            Notificaciones por correo
          </label>
        </div>
        
        <div style={{ marginBottom: "12px" }}>
          <label style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            color: "#475569",
            fontSize: "14px",
            fontFamily: '"Noto Sans", sans-serif'
          }}>
            <input 
              type="checkbox" 
              name="notificaciones_push"
              checked={settings.notificaciones_push}
              onChange={handleInputChange}
              style={{ 
                accentColor: "#4FC3A1",
                width: "16px",
                height: "16px"
              }} 
            />
            Notificaciones en la aplicación
          </label>
        </div>
        
        <div style={{ marginBottom: "12px" }}>
          <label style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            color: "#475569",
            fontSize: "14px",
            fontFamily: '"Noto Sans", sans-serif'
          }}>
            <input 
              type="checkbox" 
              name="notificaciones_sms"
              checked={settings.notificaciones_sms}
              onChange={handleInputChange}
              style={{ 
                accentColor: "#4FC3A1",
                width: "16px",
                height: "16px"
              }} 
            />
            Notificaciones por SMS
          </label>
        </div>
      </section>

      {/* Seguridad */}
      <section
        style={{
          marginBottom: "20px",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ 
          fontSize: "16px", 
          marginBottom: "16px", 
          color: "#2d3748",
          fontFamily: '"Noto Sans", sans-serif' 
        }}>
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
              fontSize: "14px",
              fontFamily: '"Noto Sans", sans-serif'
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
              fontSize: "14px",
              fontFamily: '"Noto Sans", sans-serif'
            }}
          >
            Cerrar sesión en todos los dispositivos
          </button>
        </div>
      </section>

      {/* Botón guardar */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: saving ? "#9ca3af" : "#4FC3A1",
            border: "none",
            color: "white",
            fontWeight: "bold",
            cursor: saving ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontFamily: '"Noto Sans", sans-serif',
          }}
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}