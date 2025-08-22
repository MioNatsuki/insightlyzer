// src/features/dashboard/pages/DashboardPage.jsx
import React from 'react';
import KpiCard from "../../../components/KpiCard";
import QualityChart from "../../../components/QualityChart";

export default function DashboardPage() {
  // 🔹 Cambia este valor entre 1 y 0 para probar
  const isEmpty = 0;

  return (
    <div style={{
      marginLeft: '225px',
      padding: '32px',
      backgroundColor: '#f8fafc',
      height: '100%',
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
            marginTop: '-13px',
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

      {/* Contenido condicional */}
      {isEmpty === 1 ? (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '18px',
            color: '#2d3748',
            maxWidth: '500px'
          }}>
            Aún no has hecho ningún análisis. Haz uno y regresa 😊
          </p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '32px',
          overflow: 'hidden',
          minHeight: 0
        }}>
          {/* KPIs */}
          <div style={{
              display: 'flex',
              gap: '32px',
              marginBottom: '75px',
              marginTop: '18px', // ✅ Aquí agregamos los 25px extra
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '0',
              margin: '25px 0 75px 0' // ✅ O usar margin shorthand si prefieres
            }}>
            <div style={{ padding: '0', margin: '0' }}>
              <KpiCard title="Total de análisis realizados" value="47" />
            </div>
            <div style={{ padding: '0', margin: '0' }}>
              <KpiCard title="Análisis del último mes" value="6" />
            </div>
          </div>

          {/* Gráfica */}
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
      )}
    </div>
  );
}