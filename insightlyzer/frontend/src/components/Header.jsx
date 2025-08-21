// Header.jsx
import React from 'react';
import { Bell, User } from 'lucide-react';
import Logo from '../assets/Logo.png'; // Asegúrate de que la ruta sea correcta

const Header = () => {
  // Estilos en línea para cumplir con las especificaciones exactas
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
    position: 'relative' // Necesario para el posicionamiento absoluto del logo
  };

  const logoContainerStyle = {
    position: 'relative', // Contenedor para posicionar el logo
    padding: '24px 0' // Ajuste para compensar la posición del logo
  };

  const iconContainerStyle = {
    display: 'flex',
    gap: '16px'
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  };

  // Función para manejar el hover
  const handleHover = (e) => {
    e.target.style.backgroundColor = '#F7FAFC';
  };

  // Función para manejar cuando el mouse sale
  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = 'white';
  };

  return (
    <header style={headerStyle}>
      {/* Logo a la izquierda con el posicionamiento específico */}
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

      {/* Iconos a la derecha */}
      <div style={iconContainerStyle}>
        <button 
          style={iconButtonStyle}
          onMouseOver={handleHover}
          onMouseOut={handleMouseOut}
          aria-label="Notificaciones"
        >
          <Bell size={24} color="#4A5568" />
        </button>
        <button 
          style={iconButtonStyle}
          onMouseOver={handleHover}
          onMouseOut={handleMouseOut}
          aria-label="Perfil de usuario"
        >
          <User size={24} color="#4A5568" />
        </button>
      </div>
    </header>
  );
};

export default Header;