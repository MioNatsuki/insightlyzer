// src/components/Modal.jsx
import React from "react";

export default function Modal({ title, children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "1000px",
          height: "500px",
          borderRadius: "12px",
          padding: "24px",
          overflowY: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            color: "#4A5568",
          }}
        >
          ✕
        </button>

        <h2
          style={{
            fontSize: "18px",
            marginBottom: "16px",
            color: "#2d3748",
          }}
        >
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </div>
  );
}