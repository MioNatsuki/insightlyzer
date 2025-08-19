// src/components/Input.jsx
import { useState } from "react";

const Input = ({ 
  type = "text", 
  name, 
  value, 
  onChange, 
  required,
  placeholder,
  showPasswordToggle = false 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative" style={{ width: '686px', height: '69px', marginBottom: '10px' }}>
      <input
        id={name}
        name={name}
        type={showPasswordToggle && type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full h-full rounded-lg outline-none border-0"
        style={{ 
          backgroundColor: '#F6EDED',
          color: '#9E9595',
          fontSize: '25px',
          fontFamily: 'Noto Sans, sans-serif',
          fontWeight: '400',
          paddingLeft: '60px', // Espacio para el icono izquierdo
          paddingRight: showPasswordToggle && type === "password" ? '60px' : '20px' // Espacio para icono derecho si hay toggle
        }}
      />
      
      {/* Icono de usuario para email - Posicionado absolutamente */}
      {type === "email" && (
        <svg 
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          style={{ 
            width: '24px', 
            height: '24px',
            color: '#9E9595'
          }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )}
      
      {/* Icono de candado para password - Posicionado absolutamente */}
      {type === "password" && (
        <svg 
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          style={{ 
            width: '24px', 
            height: '24px',
            color: '#9E9595'
          }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      )}
      
      
      {/* Botón ojo para mostrar/ocultar contraseña - Posicionado absolutamente */}
      {showPasswordToggle && type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
          style={{ 
            color: '#9E9595',
            background: 'none',
            border: 'none',
            padding: 0
          }}
        >
          {showPassword ? (
            // Ojo tachado (ocultar)
            <svg 
              style={{ 
                width: '24px', 
                height: '24px'
              }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            // Ojo normal (mostrar)
            <svg 
              style={{ 
                width: '24px', 
                height: '24px'
              }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default Input;