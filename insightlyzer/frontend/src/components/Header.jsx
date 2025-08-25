// Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Bell, User } from 'lucide-react';
import Logo from '../assets/Logo.png'; // Asegúrate de que la ruta sea correcta

const Header = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // Estado para el menú de perfil
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nuevo comentario en tu post", link: "#" },
    { id: 2, text: "Tu reporte está listo para descargar", link: "#" },
    { id: 3, text: "Actualización disponible", link: "#" },
  ]);

  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  // Cerrar dropdown de perfil cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const profileDropdownStyle = {
    position: 'absolute',
    top: '60px',
    right: '0px',
    width: '180px',
    backgroundColor: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 100,
    overflow: 'hidden',
  };

  const profileMenuItemStyle = {
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    backgroundColor: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: '"Noto Sans", sans-serif',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.2s ease',
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

  const handleProfileClick = () => {
    setProfileOpen(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    setProfileOpen(false);
    // Limpiar datos de sesión si los tienes
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/');
  };

  const handleProfileMenuHover = (e, isEnter, isLogout = false) => {
    if (isEnter) {
      e.target.style.backgroundColor = isLogout ? '#fef2f2' : '#f8fafc';
    } else {
      e.target.style.backgroundColor = 'transparent';
    }
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
        {/* Notificaciones */}
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

        {/* Perfil con dropdown */}
        <div style={{ position: 'relative' }} ref={profileDropdownRef}>
          <button
            style={iconButtonStyle}
            onMouseOver={handleHover}
            onMouseOut={handleMouseOut}
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label="Perfil de usuario"
          >
            <User size={24} color="#4A5568" />
          </button>

          {/* Dropdown de perfil */}
          {profileOpen && (
            <div style={profileDropdownStyle}>
              {/* Flecha del tooltip */}
              <div
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '22px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderBottom: 'none',
                  borderRight: 'none',
                  transform: 'rotate(45deg)',
                }}
              />

              <div style={{ padding: '8px 0' }}>
                {/* Ir a mi perfil */}
                <button
                  onClick={handleProfileClick}
                  style={{
                    ...profileMenuItemStyle,
                    color: '#2d3748',
                  }}
                  onMouseEnter={(e) => handleProfileMenuHover(e, true, false)}
                  onMouseLeave={(e) => handleProfileMenuHover(e, false, false)}
                >
                  {/* Icono de usuario */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#4FC3A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#4FC3A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Ir a mi perfil
                </button>

                {/* Línea divisoria */}
                <div
                  style={{
                    height: '1px',
                    backgroundColor: '#e2e8f0',
                    margin: '4px 0',
                  }}
                />

                {/* Cerrar sesión */}
                <button
                  onClick={handleLogout}
                  style={{
                    ...profileMenuItemStyle,
                    color: '#dc2626',
                  }}
                  onMouseEnter={(e) => handleProfileMenuHover(e, true, true)}
                  onMouseLeave={(e) => handleProfileMenuHover(e, false, true)}
                >
                  {/* Icono de logout */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17L21 12L16 7" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;