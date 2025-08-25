// src/features/auth/pages/LoginPage.jsx (Actualizado)
import { Link, useNavigate } from "react-router-dom"; 
import React, { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Logo from "../../../assets/Logo.png";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate("/dashboard"); // Cambia por tu ruta de dashboard
    }
    // Los errores se manejan automáticamente por el contexto
  };

  return (
    <div 
      className="bg-white"
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      
      {/* Logo + Línea separadora + Formulario */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Logo */}
        <img 
          src={Logo} 
          alt="Insightlyzer" 
          className="w-[454px] h-[303px] object-contain" 
        />
        
        {/* Línea separadora vertical */}
        <div 
          style={{
            width: '1px',
            height: '540px',
            backgroundColor: '#D1D5DB',
            marginLeft: '10px'
          }}
        ></div>

        {/* Formulario */}
        <div style={{ marginLeft: '40px' }}>
          {/* Título */}
          <h1 
            style={{ 
              fontSize: '32px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              color: '#000000',
              margin: 0,
              padding: 0,
              marginBottom: '30px'
            }}
          >
            Ingresa a tu cuenta
          </h1>

          {/* Mostrar errores */}
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Correo Electrónico"
              disabled={loading}
            />

            <div style={{ marginTop: '15px' }}>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Contraseña"
                showPasswordToggle={true}
                disabled={loading}
              />
            </div>

            <div style={{ marginTop: '15px' }}>
              <Button type="submit" disabled={loading}>
                {loading ? 'Ingresando...' : 'Entrar'}
              </Button>
            </div>
          </form>

          {/* Link Registro */}
          <p 
            style={{ 
              fontSize: '24px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '400',
              color: '#000000',
              margin: 0,
              padding: 0,
              marginTop: '20px'
            }}
          >
            <span>¿No tienes una cuenta? </span>
            <Link 
              to="/register" 
              className="hover:underline"
              style={{ 
                color: '#F77CA2',
                textDecoration: 'none',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '400'
              }}
            >
              Regístrate
            </Link>
            <span>.</span>
          </p>
        </div>
      </div>      
    </div>
  );
}