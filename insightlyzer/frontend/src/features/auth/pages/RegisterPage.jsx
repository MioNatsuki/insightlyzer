import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Logo from "../../../assets/Logo.png"; 

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // aquí después haremos el POST al backend
  };

  return (
    <div style={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh', // Para ocupar toda la altura de la pantalla
      backgroundColor: '#f9fafb', // bg-gray-50 equivalente
      padding: '16px', // px-4 equivalente
      position: 'relative' // Para posicionar el logo de forma absoluta
    }}>
      {/* Logo en la esquina superior derecha */}
      <img 
        src={Logo} 
        alt="Logo" 
        style={{
          position: 'absolute',
          top: '-35px',
          left: '-10px',
          height: '140px', 
          zIndex: 10
        }}
      />
      
      {/* Contenedor del formulario*/}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Agregar fuentes de Google Fonts */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Noto+Sans:ital,wght@0,400;0,500;0,600;1,600&display=swap');
          `}
        </style>
        
        <div className="w-full flex justify-center items-center flex-col">
          <h2 style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '33px' }} className="text-gray-800">
            REGÍSTRATE
          </h2>
          <p style={{ fontFamily: 'Noto Sans', fontWeight: '400', fontSize: '25px' }} className="mt-6 text-gray-600">
            ¿Ya eres miembro?{" "}
            <Link 
              to="/" 
              style={{ fontFamily: 'Noto Sans', fontWeight: '600', fontSize: '25px', fontStyle: 'italic' }}
              className="text-blue-600 hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@email.com"
            required
            labelStyle={{ fontFamily: 'Noto Sans', fontWeight: '500', fontSize: '28px', color: '#9E9595' }}
            iconPosition="left"
            iconType="filled"
          />
          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
            labelStyle={{ fontFamily: 'Noto Sans', fontWeight: '500', fontSize: '28px', color: '#9E9595' }}
            iconPosition="left"
            iconType="filled"
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="********"
            required
            labelStyle={{ fontFamily: 'Noto Sans', fontWeight: '500', fontSize: '28px', color: '#9E9595' }}
            iconPosition="left"
            iconType="filled"
          />

          <Button type="submit" className="w-full">
            Registrarme
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;