// src/features/history/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { apiService } from "../../../services/api";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    email_notificaciones: "",
    bio: "",
    foto_url: "",
    miembro_desde: "",
    ultimo_acceso: "",
    analisis_realizados: 0
  });
  
  const [settingsData, setSettingsData] = useState({
    notificaciones_email: true,
    notificaciones_push: false,
    notificaciones_sms: false
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Cargar datos del perfil
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const [profileResponse, settingsResponse] = await Promise.all([
          apiService.request('/users/me/perfil', { method: 'GET' }),
          apiService.request('/users/me/settings', { method: 'GET' })
        ]);
        
        setProfileData(profileResponse);
        setSettingsData(settingsResponse);
      } catch (error) {
        console.error("Error loading profile data:", error);
        setMessage("Error al cargar los datos del perfil");
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  // Manejar cambio de inputs
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (e) => {
    const { name, checked } = e.target;
    setSettingsData(prev => ({ ...prev, [name]: checked }));
  };

  // Manejar cambio de imagen
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("foto", file);
      
      try {
        const response = await fetch(`${apiService.baseURL}/users/me/foto`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Error al actualizar la foto');
        }
        
        const data = await response.json();
        setProfileData(prev => ({ ...prev, foto_url: data.foto_url }));
        setMessage("Foto actualizada correctamente");
      } catch (error) {
        console.error("Error updating photo:", error);
        setMessage("Error al actualizar la foto");
      }
    }
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      setSaving(true);
      await Promise.all([
        apiService.request('/users/me/perfil', {
          method: 'PUT',
          body: JSON.stringify(profileData)
        }),
        apiService.request('/users/me/settings', {
          method: 'PUT',
          body: JSON.stringify(settingsData)
        })
      ]);
      setMessage("Cambios guardados correctamente");
    } catch (error) {
      console.error("Error saving changes:", error);
      setMessage("Error al guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  // Eliminar perfil
  const handleDeleteProfile = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar tu perfil? Esta acción no se puede deshacer.")) {
      try {
        await apiService.request('/users/me', { method: 'DELETE' });
        setMessage("Perfil eliminado correctamente");
        // Redirigir al login o home
        window.location.href = "/login";
      } catch (error) {
        console.error("Error deleting profile:", error);
        setMessage("Error al eliminar el perfil");
      }
    }
  };

  if (loading) {
    return <div style={{ marginLeft: "225px", padding: "32px" }}>Cargando...</div>;
  }

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
                  backgroundImage: `url(${profileData.foto_url || "https://randomuser.me/api/portraits/women/32.jpg"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <label
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
                title="Cambiar foto de perfil"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="white"/>
                </svg>
              </label>
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
              {`${profileData.nombre} ${profileData.apellido_paterno} ${profileData.apellido_materno}`.trim() || "Usuario"}
            </h2>
            <p style={{ 
              fontSize: "14px", 
              color: "#64748b", 
              marginBottom: "16px",
              fontFamily: '"Noto Sans", sans-serif',
              margin: "0 0 16px 0",
            }}>
              {user?.email}
            </p>
          </div>

          {/* Biografía */}
          <div style={{ width: "100%", marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "6px",
                color: "#475569",
                fontFamily: '"Noto Sans", sans-serif',
              }}
            >
              Biografía
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleProfileChange}
              placeholder="Escribe algo sobre ti..."
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: '"Noto Sans", sans-serif',
                boxSizing: "border-box",
                minHeight: "80px",
                resize: "vertical",
              }}
            />
          </div>

          {/* Información adicional */}
          <div style={{ width: "100%", padding: "0 10px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{ fontSize: "16px", color: "#2d3748", marginBottom: "12px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", margin: "0 0 12px 0" }}>
              Información adicional
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <span style={{ fontWeight: "bold", color: "#475569", fontSize: "14px" }}>Miembro desde:</span>
                <span style={{ marginLeft: "8px", color: "#64748b", fontSize: "14px" }}>
                  {new Date(profileData.miembro_desde).toLocaleDateString('es-ES')}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: "bold", color: "#475569", fontSize: "14px" }}>Último acceso:</span>
                <span style={{ marginLeft: "8px", color: "#64748b", fontSize: "14px" }}>
                  {profileData.ultimo_acceso ? new Date(profileData.ultimo_acceso).toLocaleString('es-ES') : 'Nunca'}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: "bold", color: "#475569", fontSize: "14px" }}>Análisis realizados:</span>
                <span style={{ marginLeft: "8px", color: "#64748b", fontSize: "14px" }}>
                  {profileData.analisis_realizados}
                </span>
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

          {/* Formulario */}
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
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
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={profileData.nombre}
                    onChange={handleProfileChange}
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
                    name="email_notificaciones"
                    value={profileData.email_notificaciones}
                    onChange={handleProfileChange}
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
                    Apellido Paterno
                  </label>
                  <input
                    type="text"
                    name="apellido_paterno"
                    value={profileData.apellido_paterno}
                    onChange={handleProfileChange}
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
                    Apellido Materno
                  </label>
                  <input
                    type="text"
                    name="apellido_materno"
                    value={profileData.apellido_materno}
                    onChange={handleProfileChange}
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
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={profileData.telefono}
                    onChange={handleProfileChange}
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
                <div style={{ flex: 1 }}></div>
              </div>

              <div style={{ marginTop: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "16px", color: "#2d3748", marginBottom: "12px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px", margin: "0 0 12px 0" }}>
                  Preferencias de notificación
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                    <input 
                      type="checkbox" 
                      name="notificaciones_email"
                      checked={settingsData.notificaciones_email}
                      onChange={handleSettingsChange}
                      style={{ accentColor: "#4FC3A1" }} 
                    />
                    <span>Email</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                    <input 
                      type="checkbox" 
                      name="notificaciones_push"
                      checked={settingsData.notificaciones_push}
                      onChange={handleSettingsChange}
                      style={{ accentColor: "#4FC3A1" }} 
                    />
                    <span>Push</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                    <input 
                      type="checkbox" 
                      name="notificaciones_sms"
                      checked={settingsData.notificaciones_sms}
                      onChange={handleSettingsChange}
                      style={{ accentColor: "#4FC3A1" }} 
                    />
                    <span>SMS</span>
                  </label>
                </div>

                <div style={{ marginTop: "auto", paddingTop: "20px", display: "flex", justifyContent: "space-between" }}>
                  <button
                    type="button"
                    onClick={handleDeleteProfile}
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      cursor: "pointer",
                      fontFamily: '"Noto Sans", sans-serif',
                    }}
                  >
                    Eliminar Perfil
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      backgroundColor: "#4FC3A1",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      cursor: saving ? "not-allowed" : "pointer",
                      fontFamily: '"Noto Sans", sans-serif',
                      opacity: saving ? 0.7 : 1,
                    }}
                  >
                    {saving ? "Guardando..." : "Guardar cambios"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}