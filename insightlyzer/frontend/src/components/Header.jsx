// Header.jsx
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Bell, User } from 'lucide-react';
import Logo from '../assets/Logo.png'; // Asegúrate de que la ruta sea correcta

const Header = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nuevo comentario en tu post", link: "#" },
    { id: 2, text: "Tu reporte está listo para descargar", link: "#" },
    { id: 3, text: "Actualización disponible", link: "#" },
  ]);

  const headerStyle = {
    width: '1920px',
    height: '102px',
    backgroundColor: '#F6F6F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 26px',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'relative'
  };

  const logoContainerStyle = {
    position: 'relative',
    padding: '24px 0'
  };

  const iconContainerStyle = {
    display: 'flex',
    gap: '16px',
    position: 'relative'
  };

  const iconButtonStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    border: '1px solid #E2E8F0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    position: 'relative'
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '60px',
    right: '60px',
    width: '250px',
    backgroundColor: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    zIndex: 100,
    padding: '10px',
  };

  const notificationItemStyle = {
    fontSize: '14px',
    color: '#2D3748',
    margin: '6px 0',
    textDecoration: 'none',
    display: 'block'
  };

  const markAllStyle = {
    marginTop: '10px',
    width: '100%',
    padding: '6px',
    fontSize: '14px',
    border: '1px solid #CBD5E0',
    borderRadius: '6px',
    backgroundColor: '#EDF2F7',
    cursor: 'pointer'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: '#E53E3E',
    color: 'white',
    fontSize: '12px',
    borderRadius: '50%',
    padding: '2px 6px',
  };

  const handleHover = (e) => {
    e.target.style.backgroundColor = '#F7FAFC';
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = 'white';
  };

  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  return (
    <header style={headerStyle}>
      {/* Logo */}
      <div style={logoContainerStyle}>
        <img 
          src={Logo} 
          alt="Logo" 
          style={{
            position: 'absolute',
            top: '-45px',
            left: '-40px',
            height: '140px', 
            zIndex: 10
          }}
        />
      </div>

      {/* Iconos */}
      <div style={iconContainerStyle}>
        <div style={{ position: 'relative' }}>
          <button
            style={iconButtonStyle}
            onMouseOver={handleHover}
            onMouseOut={handleMouseOut}
            onClick={() => setOpen(!open)}
            aria-label="Notificaciones"
          >
            <Bell size={24} color="#4A5568" />
            {notifications.length > 0 && (
              <span style={badgeStyle}>{notifications.length}</span>
            )}
          </button>

          {/* Dropdown de notificaciones */}
          {open && (
            <div style={dropdownStyle}>
              {notifications.length > 0 ? (
                <>
                  {notifications.map((n) => (
                    <a key={n.id} href={n.link} style={notificationItemStyle}>
                      {n.text}
                    </a>
                  ))}
                  <button style={markAllStyle} onClick={handleMarkAllRead}>
                    Marcar todas como leídas
                  </button>
                </>
              ) : (
                <p style={{ fontSize: '14px', color: '#718096' }}>
                  No tienes notificaciones
                </p>
              )}
            </div>
          )}
        </div>

        <Link 
          to="/profile" 
          style={iconButtonStyle} 
          onMouseOver={handleHover} 
          onMouseOut={handleMouseOut} 
          aria-label="Perfil de usuario"
        >
          <User size={24} color="#4A5568" />
        </Link>
      </div>
    </header>
  );
};

export default Header;