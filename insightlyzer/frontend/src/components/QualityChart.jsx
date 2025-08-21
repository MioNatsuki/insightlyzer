// src/components/QualityChart.jsx
import React from 'react';

const QualityChart = () => {
  // Datos para la gráfica de calidad
  const qualityData = [
    { label: 'Excelente', value: 20, color: '#FDD09F', percentage: '20%' },
    { label: 'Bueno', value: 15, color: '#9A89FF', percentage: '15%' },
    { label: 'Se puede mejorar', value: 18, color: '#A9F4D0', percentage: '18%' },
    { label: 'Regular', value: 12, color: '#FBE38E', percentage: '12%' },
    { label: 'Malo', value: 8, color: '#D0E8FF', percentage: '8%' },
    { label: 'Muy malo', value: 5, color: '#FEAEAE', percentage: '5%' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }}>
      {/* Contenedor de gráfica*/}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px',
        justifyContent: 'center'
      }}>
        {/* Gráfica de pastel (simulada) */}
        <div style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `conic-gradient(
            #FDD09F 0% 20%, 
            #9A89FF 20% 35%, 
            #A9F4D0 35% 53%, 
            #FBE38E 53% 65%, 
            #D0E8FF 65% 73%, 
            #FEAEAE 73% 78%
          )`,
          flexShrink: 0
        }} />
        
        {/* Leyenda de colores */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px',
          marginLeft: '20px' 
        }}>
          {qualityData.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px' 
            }}>
              <div style={{
                width: '60px',
                height: '25px',
                backgroundColor: item.color,
                borderRadius: '4px',
                opacity: 0.7
              }} />
              <span style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: '14px',
                color: '#4a5568'
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Título DEBAJO de la gráfica */}
      <h2 style={{
        fontFamily: '"Noto Sans", sans-serif',
        fontSize: '20px',
        fontWeight: '400',
        color: '#2d3748',
        marginTop: '20px', // Espacio entre gráfica y título
        textAlign: 'center',
        marginBottom: '0'
      }}>
        Calidad de sitios analizados
      </h2>
    </div>
  );
};

export default QualityChart;