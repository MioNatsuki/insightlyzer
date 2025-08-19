// src/features/auth/pages/LoginPage.jsx
import { Link } from "react-router-dom"; 
import React, { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Logo from "../../../assets/Logo.png";

export default function LoginPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrar con backend (API login)
    console.log("Login:", formData);
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
        
        {/* Línea separadora vertical - 10px de separación, altura 540px */}
        <div 
          style={{
            width: '1px',
            height: '540px',
            backgroundColor: '#D1D5DB', // color gris similar a bg-gray-300
            marginLeft: '10px'
          }}
        ></div>

        {/* Formulario - 10px de separación de la línea */}
        <div style={{ marginLeft: '50px' }}>
          {/* Título */}
          <h1 
            style={{ 
              fontSize: '32px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              color: '#000000',
              margin: 0,
              padding: 0,
              marginBottom: '76px'
            }}
          >
            Ingresa a tu cuenta
          </h1>

          {/* Formulario */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Campo de email */}
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Correo Electrónico"
            />

            {/* Campo de contraseña */}
            <div style={{ marginTop: '20px' }}>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Contraseña"
                showPasswordToggle={true}
              />
            </div>

            {/* Botón */}
            <div style={{ marginTop: '34px' }}>
              <Button type="submit">
                Entrar
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
              marginTop: '30px'
            }}
          >
            <span>¿No tienes cuenta?, </span>
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

      {/* 
      // Código comentado anterior - ya descomentado arriba
      */}
      
    </div>
  );
}