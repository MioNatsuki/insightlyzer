// src/components/Footer.jsx
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Modal from "./Modal";
import PrivacyPolicy from "../features/legal/PrivacyPolicy";
import TermsAndConditions from "../features/legal/TermsAndConditions";

export default function Footer() {
  // Estilos para el footer
  const [openModal, setOpenModal] = useState(null);
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
      <button
          onClick={() => setOpenModal("privacy")}
          style={{
            background: "none",
            border: "none",
            color: "#4FC3A1",
            cursor: "pointer",
            marginRight: "16px",
            textDecoration: "underline",
          }}
        >
          Política de Privacidad
        </button>
        <button
          onClick={() => setOpenModal("terms")}
          style={{
            background: "none",
            border: "none",
            color: "#4FC3A1",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Términos y Condiciones
        </button>
        {/* Modal dinámico */}
        <Modal
          title={
            openModal === "privacy"
              ? "Política de Privacidad"
              : "Términos y Condiciones"
          }
          isOpen={openModal !== null}
          onClose={() => setOpenModal(null)}
        >
          {openModal === "privacy" ? <PrivacyPolicy /> : <TermsAndConditions />}
        </Modal>
    </footer>
  );
}