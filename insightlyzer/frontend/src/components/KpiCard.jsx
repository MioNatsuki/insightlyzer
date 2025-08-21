// src/components/KpiCard.jsx
export default function KpiCard({ title, value }) {
  return (
    <div style={{ width: '400px' }}> {/* Contenedor con ancho fijo */}
      {/* Card con valor - TAMAÑO EXACTO 400x250 */}
      <div style={{
        width: '400px', // Ancho exacto
        height: '250px', // Alto exacto
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '4px 4px 4px 4px rgba(247, 124, 162, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box', // ¡IMPORTANTE! Incluye padding en el tamaño total
        overflow: 'hidden' // Previene que el contenido exceda los límites
      }}>
        <span style={{
          fontFamily: '"Poppins", sans-serif',
          fontSize: '78px',
          fontWeight: '700',
          color: '#000000',
          lineHeight: '1' // Elimina espacio extra vertical
        }}>
          {value}
        </span>
      </div>
      
      {/* Título DEBAJO de la card */}
      <p style={{
        fontFamily: '"Noto Sans", sans-serif',
        fontSize: '20px',
        fontWeight: '400',
        color: '#4a5568',
        marginTop: '25px',
        textAlign: 'center',
        margin: '5px 0 0 0', // Solo margen superior de 5px
        padding: '0',
        width: '400px' // Mismo ancho que la card
      }}>
        {title}
      </p>
    </div>
  );
}