import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import SuccessIcon from "../../../assets/success-icon.png";

export default function SuccessfulPage() {
  return (
    <>
      {/* Agregar fuente Noto Sans */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap');
        `}
      </style>
      
      <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      <div style={{
        backgroundColor: 'white',
        boxShadow: '4px 4px 4px 4px rgba(233, 78, 119, 0.25)',
        borderRadius: '16px',
        padding: '40px',
        width: '640px',
        height: '840px',
        textAlign: 'center',
        boxSizing: 'border-box',
        paddingTop: '140px',
      }}>
        {/* Contenedor de la imagen */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <img
            src={SuccessIcon}
            alt="Éxito"
            style={{
              width: '200px',
              height: '200px'
            }}
          />
        </div>

        {/* Mensaje principal */}
        <h1 style={{
          fontSize: '30px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '12px'
        }}>
          ¡Un último paso!
        </h1>

        {/* Subtexto */}
        <p style={{
          fontFamily: 'Noto Sans, sans-serif',
          fontWeight: '400',
          fontSize: '25px',
          color: '#6b7280',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Te hemos enviado un enlace a tu correo.<br></br>  
          Ábrelo para activar tu cuenta.
        </p>

        {/* Botón de acción */}
        <Link to="/">
          <Button>Continuar</Button>
        </Link>
      </div>
    </div>
    </>
  );
}