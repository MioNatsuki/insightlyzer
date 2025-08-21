// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { Home, BarChart2, Clock, Settings } from "lucide-react";

export default function Sidebar() {
  // Estilos para el sidebar - altura flexible
  const sidebarStyle = {
    width: '225px',
    height: 'calc(100vh - 102px)', // Altura flexible que se adapta a la pantalla
    backgroundColor: '#4FC3A1',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'fixed',
    left: 0,
    top: '102px', // Para que quede debajo del header
    zIndex: 5,
    overflowY: 'auto' // Por si el contenido es más largo que la pantalla
  };

  // Estilo para los enlaces de navegación
  const navItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '1px 1px',
    borderRadius: '4px',
    marginBottom: '4px',
    textDecoration: 'none',
    color: '#FFFFFF',
    fontFamily: '"Noto Sans", sans-serif',
    fontSize: '20px',
    fontWeight: '400', // Regular
    transition: 'background-color 0.2s ease'
  };

  // Estilo para el icono
  const iconStyle = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '3px' // Separación entre icono y texto
  };

  return (
    <aside style={sidebarStyle}>
      <div style={{ padding: '10px' }}>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          <NavLink 
            to="/dashboard" 
            style={navItemStyle}
            className={({ isActive }) => 
              isActive ? { backgroundColor: '#3DA58A' } : {}
            }
            onMouseOver={(e) => e.target.style.backgroundColor = '#3DA58A'}
            onMouseOut={(e) => e.target.style.backgroundColor = ''}
          >
            <div style={iconStyle}>
              <Home size={28} color="#FFFFFF" />
            </div>
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/new-analysis" 
            style={navItemStyle}
            className={({ isActive }) => 
              isActive ? { backgroundColor: '#3DA58A' } : {}
            }
            onMouseOver={(e) => e.target.style.backgroundColor = '#3DA58A'}
            onMouseOut={(e) => e.target.style.backgroundColor = ''}
          >
            <div style={iconStyle}>
              <BarChart2 size={28} color="#FFFFFF" />
            </div>
            Nuevo análisis
          </NavLink>
          
          <NavLink 
            to="/history" 
            style={navItemStyle}
            className={({ isActive }) => 
              isActive ? { backgroundColor: '#3DA58A' } : {}
            }
            onMouseOver={(e) => e.target.style.backgroundColor = '#3DA58A'}
            onMouseOut={(e) => e.target.style.backgroundColor = ''}
          >
            <div style={iconStyle}>
              <Clock size={28} color="#FFFFFF" />
            </div>
            Historial
          </NavLink>
        </nav>
      </div>
      
      <div style={{ padding: '10px' }}>
        <NavLink 
          to="/settings" 
          style={navItemStyle}
          className={({ isActive }) => 
            isActive ? { backgroundColor: '#3DA58A' } : {}
          }
          onMouseOver={(e) => e.target.style.backgroundColor = '#3DA58A'}
          onMouseOut={(e) => e.target.style.backgroundColor = ''}
        >
          <div style={iconStyle}>
            <Settings size={28} color="#FFFFFF" />
          </div>
          Configuración
        </NavLink>
      </div>
    </aside>
  );
}