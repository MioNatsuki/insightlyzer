// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden' 
    }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1,
        minWidth: 0 // Importante para evitar overflow
      }}>
        <Header />
        <main style={{ 
          flex: 1, 
          backgroundColor: '#f8fafc',
          overflow: 'hidden' // Sin scroll aquí
        }}>
          <Outlet /> {/* Aquí se renderiza la página actual */}
        </main>
        <Footer />
      </div>
    </div>
  );
}