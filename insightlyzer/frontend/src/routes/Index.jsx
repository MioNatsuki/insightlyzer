import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import SuccessfulPage from "../features/auth/pages/SuccessfulPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/successful" element={<SuccessfulPage />} />
        {/* Aquí luego agregamos dashboard, análisis, historial, etc. */}
      </Routes>
    </Router>
  );
}