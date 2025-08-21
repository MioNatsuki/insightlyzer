// src/features/dashboard/pages/DashboardPage.jsx
import React from 'react';
import KpiCard from "../../../components/KpiCard";
import QualityChart from "../../../components/QualityChart";

export default function DashboardPage() {
  return (
    <div style={{
      marginLeft: '225px',
      padding: '32px',
      backgroundColor: '#f8fafc',
      height: '100%', // Ocupa el 100% del espacio disponible
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Título y separador */}
      <div style={{ marginBottom: '32px', flexShrink: 0 }}>
        <h1 style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '20px',
            fontWeight: '400',
            color: '#2d3748',
            marginBottom: '12px',
            marginTop: '-13px', // Valor negativo para reducir espacio
            paddingTop: '0'
        }}>
          Panel de Insightlyzer
        </h1>
        <div style={{
          height: '1px',
          backgroundColor: '#4FC3A1',
          width: '100%'
        }} />
      </div>

      {/* Contenedor principal del contenido */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '32px',
        overflow: 'hidden',
        minHeight: 0 // Crucial para que flex funcione correctamente
      }}>
        {/* KPIs - Sección superior */}
        <div style={{
            display: 'flex',
            gap: '32px',
            marginBottom: '76px',
            flexWrap: 'wrap',
            justifyContent: 'center', // ← ESTA LÍNEA CENTRA LOS ELEMENTOS
            padding: '0',
            margin: '0'
            }}>
            <div style={{ padding: '0', margin: '0' }}>
                <KpiCard title="Total de análisis realizados" value="47" />
            </div>
            <div style={{ padding: '0', margin: '0' }}>
                <KpiCard title="Análisis del último mes" value="6" />
            </div>
        </div>

        {/* Gráfica de calidad - Sección inferior */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flex: 1,
          minHeight: 0
        }}>
          <div style={{ 
            width: '100%', 
            maxWidth: '800px',
            height: '100%'
          }}>
            <QualityChart />
          </div>
        </div>
      </div>
    </div>
  );
}