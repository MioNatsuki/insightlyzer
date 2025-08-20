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
    <div className="relative" style={{ width: '500px', height: '60px', marginBottom: '10px' }}>
      <input
        id={name}
        name={name}
        type={showPasswordToggle && type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="rounded-lg outline-none border-0 absolute inset-0"
        style={{ 
          backgroundColor: '#F6EDED',
          color: '#9E9595',
          fontSize: '25px',
          fontFamily: 'Noto Sans, sans-serif',
          fontWeight: '400',
          width: '100%',
          height: '100%',
          paddingLeft: (type === "email" || type === "password") ? '50px' : '20px',
          paddingRight: (showPasswordToggle && type === "password") ? '50px' : '20px',
          boxSizing: 'border-box' // Esto asegura que el padding no afecte el tamaño total
        }}
      />
      
      {/* Icono de usuario para email - DENTRO del input #email, al inicio */}
      {type === "email" && (
        <div 
          className="absolute pointer-events-none"
          style={{ 
            left: '15px',
            top: '50%',
            transform: 'translateY(-170%)',
            width: '25px', 
            height: '25px',
            color: '#9E9595',
            paddingLeft: '13px',
            zIndex: 1
          }}
        >
          <svg 
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
        </div>
      )}
      
      {/* Icono de candado para password - DENTRO del input #password, al inicio */}
      {type === "password" && (
        <div 
          className="absolute pointer-events-none"
          style={{ 
            left: '15px',
            top: '50%',
            transform: 'translateY(-170%)',
            width: '25px', 
            height: '25px',
            color: '#9E9595',
            paddingLeft: '13px',
            zIndex: 1
          }}
        >
          <svg 
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
        </div>
      )}
      
      {/* Botón ojo para mostrar/ocultar contraseña - DENTRO del input #password, al final */}
      {showPasswordToggle && type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute focus:outline-none hover:opacity-75 transition-opacity"
          style={{ 
            right: '15px',
            top: '50%',
            transform: 'translateY(-230%) translateX(1500%)',
            color: '#9E9595',
            background: 'none',
            border: 'none',
            padding: '0',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2 // Mayor z-index para asegurar que esté por encima
          }}
        >
          {showPassword ? (
            // Ojo tachado (ocultar contraseña)
            <svg 
              style={{ 
                width: '25px', 
                height: '25px'
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
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
              />
            </svg>
          ) : (
            // Ojo normal (mostrar contraseña)
            <svg 
              style={{ 
                width: '25px', 
                height: '25px'
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default Input;