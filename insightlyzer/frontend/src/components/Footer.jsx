// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  // Estilos para el footer
  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    left: '225px', // Para que no se superponga con el sidebar
    right: 0,
    height: '30px', // Un poco más alto para mejor visualización
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    fontFamily: '"Noto Sans", sans-serif',
    fontSize: '18px',
    fontWeight: '400', // Regular
    color: '#4a5568',
    zIndex: 10
  };

  // Estilo para los enlaces
  const linkStyle = {
    color: '#4a5568',
    textDecoration: 'none',
    margin: '0 8px',
    transition: 'color 0.2s ease'
  };

  return (
    <footer style={footerStyle}>
      <Link 
        to="/privacy-policy" 
        style={linkStyle}
        onMouseOver={(e) => e.target.style.color = '#3182ce'}
        onMouseOut={(e) => e.target.style.color = '#4a5568'}
      >
        Política de Privacidad
      </Link>
      <span>|</span>
      <Link 
        to="/terms-conditions" 
        style={linkStyle}
        onMouseOver={(e) => e.target.style.color = '#3182ce'}
        onMouseOut={(e) => e.target.style.color = '#4a5568'}
      >
        Términos y Condiciones
      </Link>
    </footer>
  );
}