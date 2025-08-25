import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Logo from "../../../assets/Logo.png";
import { useAuth } from "../../../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Función para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const temporaryDomains = ['temporary', 'temporal', 'temp', 'tempmail', '10minutemail', 'guerrillamail'];
    
    if (!emailRegex.test(email)) {
      return "El formato del correo electrónico no es válido";
    }
    
    const domain = email.split('@')[1]?.toLowerCase();
    if (temporaryDomains.some(tempDomain => domain?.includes(tempDomain))) {
      return "No se permiten correos temporales";
    }
    
    return null;
  };

  // Función para validar contraseña
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    return null;
  };

  // Función para validar confirmación de contraseña
  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden";
    }
    return null;
  };

  // Validar formulario cada vez que cambien los datos
  useEffect(() => {
    const newErrors = {};
    
    if (formData.email) {
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
    }
    
    if (formData.password) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }
    
    if (formData.confirmPassword) {
      const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
      if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    }
    
    setErrors(newErrors);
    
    const allFieldsFilled = formData.email && formData.password && formData.confirmPassword;
    const noErrors = Object.keys(newErrors).length === 0;
    
    setIsFormValid(allFieldsFilled && noErrors);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isFormValid) {
      const result = await register(formData.email, formData.password);
      
      if (result.success) {
        navigate("/successful");
      }
      // Los errores se manejan automáticamente por el contexto
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f9fafb',
      padding: '16px',
      position: 'relative',
      boxSizing: 'border-box'
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
      
      {/* Contenedor del formulario con sombra personalizada */}
      <div 
        className="rounded-2xl bg-white"
        style={{
          width: '640px',
          height: '840px',
          boxSizing: 'border-box',
          paddingTop: '135px',
          paddingBottom: '20px',
          paddingLeft: '70px',
          paddingRight: '50px',
          boxShadow: '4px 4px 4px 4px rgba(233, 78, 119, 0.25)',
          borderRadius: '18px'
        }}
      >
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Noto+Sans:ital,wght@0,400;0,500;0,600;1,600&display=swap');
            
            .error-message {
              font-family: 'Noto Sans', sans-serif;
              font-size: 14px;
              color: #ef4444;
              margin-top: 4px;
              margin-left: 4px;
            }
          `}
        </style>
        
        {/* Contenedor de títulos centrado */}
        <div 
          className="w-full flex justify-center items-center flex-col"
          style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <h2 style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '33px' }} className="text-gray-800">
            REGÍSTRATE
          </h2>
          <p style={{ fontFamily: 'Noto Sans', fontWeight: '400', fontSize: '25px', marginTop: '14px' }} className="text-gray-600">
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

        {/* Mostrar errores del backend */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '10px',
            borderRadius: '6px',
            marginTop: '15px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'flex-start', marginTop: '14px' }}>
          <div>
            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
              required
              disabled={loading}
              labelStyle={{ fontFamily: 'Noto Sans', fontWeight: '500', fontSize: '28px', color: '#9E9595' }}
              iconPosition="right"
              iconType="filled"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div>
            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
              disabled={loading}
              labelStyle={{ fontFamily: 'Noto Sans', fontWeight: '500', fontSize: '28px', color: '#9E9595' }}
              iconPosition="right"
              iconType="filled"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <div>
            <Input
              label="Confirmar contraseña"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar Contraseña"
              required
              disabled={loading}
              labelStyle={{ fontFamily: 'Noto Sans', fontWeight: '500', fontSize: '28px', color: '#9E9595' }}
              iconPosition="right"
              iconType="filled"
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!isFormValid || loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;