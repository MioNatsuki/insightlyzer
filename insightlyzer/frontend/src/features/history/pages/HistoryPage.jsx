// src/features/history/pages/HistoryPage.jsx
import React, { useState } from "react";

export default function HistoryPage() {
  // Estados para filtros y búsqueda
  const [filters, setFilters] = useState({
    tipo: null,
    fecha: null,
    busqueda: { tipo: "", valor: "" }
  });
  const [showSearch, setShowSearch] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Estado para ordenamiento
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'default'
  });

  // Datos de ejemplo para la tabla
  const data = [
    { id: 1, fecha: "2025-08-01", nombre: "Análisis Producto A", tipo: "Del sitio", url: "https://example.com", muestra: "Pequeña", resultado: "Positivo (72%)", estado: "Completado", favorito: false },
    { id: 2, fecha: "2025-07-28", nombre: "Análisis Competidores B", tipo: "Comparativo", url: "https://example.org", muestra: "Mediana", resultado: "Competidor líder", estado: "En proceso", favorito: true },
    { id: 3, fecha: "2025-07-20", nombre: "Comparativo Q2", tipo: "Comparativo", url: "https://example.net", muestra: "Mediana", resultado: "Mejorado 15%", estado: "Completado", favorito: false },
    { id: 4, fecha: "2025-07-10", nombre: "Estudio Cliente X", tipo: "Del sitio", url: "https://example.co", muestra: "Pequeña", resultado: "Neutro (45%)", estado: "Fallido", favorito: false },
    { id: 5, fecha: "2025-07-05", nombre: "Análisis Ecommerce", tipo: "Del sitio", url: "https://shop.example.com", muestra: "Mediana", resultado: "Alto engagement", estado: "Completado", favorito: true },
    { id: 6, fecha: "2025-06-28", nombre: "Benchmark Sector", tipo: "Comparativo", url: "https://business.example.com", muestra: "Mediana", resultado: "Top 3 mercado", estado: "Completado", favorito: false },
  ];

  // Función para verificar si hay filtros activos
  const hasActiveFilters = () => {
    return filters.tipo || filters.fecha || filters.busqueda.valor;
  };

  // Función de ordenamiento
  const handleSort = (key) => {
    let direction = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = 'default';
      } else {
        direction = 'asc';
      }
    }
    
    setSortConfig({ key, direction });
  };

  // Filtrar y ordenar datos
  const getProcessedData = () => {
    // Primero filtrar
    let processedData = data.filter(item => {
      if (filters.tipo && item.tipo !== filters.tipo) return false;
      if (filters.fecha && item.fecha !== filters.fecha) return false;
      if (filters.busqueda.tipo && filters.busqueda.valor) {
        const valorBusqueda = filters.busqueda.valor.toLowerCase();
        switch(filters.busqueda.tipo) {
          case "Tipo de análisis":
            if (!item.tipo.toLowerCase().includes(valorBusqueda)) return false;
            break;
          case "URL analizado":
            if (!item.url.toLowerCase().includes(valorBusqueda)) return false;
            break;
          case "Tamaño de la muestra":
            if (!item.muestra.toLowerCase().includes(valorBusqueda)) return false;
            break;
          case "Resultado principal":
            if (!item.resultado.toLowerCase().includes(valorBusqueda)) return false;
            break;
        }
      }
      return true;
    });

    // Luego ordenar
    if (sortConfig.direction !== 'default' && sortConfig.key) {
      processedData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return processedData;
  };

  const filteredData = getProcessedData();

  // Función para limpiar filtros
  const clearFilters = () => {
    setFilters({ tipo: null, fecha: null, busqueda: { tipo: "", valor: "" } });
    setSelectedDate("");
    setShowSearch(false);
    setShowDateFilter(false);
    setSelectedRows([]);
    setSortConfig({ key: null, direction: 'default' });
  };

  // Función para aplicar filtro de fecha
  const applyDateFilter = () => {
    setFilters({...filters, fecha: selectedDate});
    setShowDateFilter(false);
  };

  // Función para descargar CSV
  const downloadCSV = () => {
    const dataToDownload = selectedRows.length > 0 
      ? data.filter(item => selectedRows.includes(item.id))
      : filteredData;
    alert(`Descargando ${dataToDownload.length} registros en CSV`);
  };

  // Función para enviar por correo
  const sendEmail = () => {
    const dataToSend = selectedRows.length > 0 
      ? data.filter(item => selectedRows.includes(item.id))
      : filteredData;
    alert(`Enviando ${dataToSend.length} registros por correo (Coming soon)`);
  };

  // Función para eliminar análisis
  const deleteAnalysis = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este análisis?")) {
      alert(`Análisis ${id} eliminado (esto es una simulación)`);
    }
  };

  // Función para toggle favorito
  const toggleFavorite = (id) => {
    alert(`Análisis ${id} marcado como favorito (esto es una simulación)`);
  };

  // Alternar selección de fila
  const toggleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  // Componente para el botón de ordenamiento
  const SortButton = ({ columnKey, children }) => {
    const isActive = sortConfig.key === columnKey;
    const direction = isActive ? sortConfig.direction : 'default';
    
    return (
      <button
        onClick={() => handleSort(columnKey)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          backgroundColor: isActive ? "#F77CA2" : "transparent",
          color: isActive ? "white" : "#475569",
          border: "none",
          cursor: "pointer",
          padding: "6px 10px",
          borderRadius: "4px",
          fontWeight: "700",
          fontSize: "12px",
          textTransform: "uppercase",
          transition: "all 0.2s ease"
        }}
        title={`Ordenar por ${children}`}
      >
        {children}
        <span style={{ display: "inline-flex", flexDirection: "column" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" style={{ marginBottom: "-2px" }}>
            <path 
              d="M7 14L12 9L17 14H7Z" 
              fill={isActive && direction === 'asc' ? "white" : (isActive ? "#ffb3c9" : "#CBD5E0")}
            />
          </svg>
          <svg width="10" height="10" viewBox="0 0 24 24">
            <path 
              d="M7 10L12 15L17 10H7Z" 
              fill={isActive && direction === 'desc' ? "white" : (isActive ? "#ffb3c9" : "#CBD5E0")}
            />
          </svg>
        </span>
      </button>
    );
  };

  return (
    <div
      style={{
        marginLeft: "225px",
        padding: "32px",
        backgroundColor: "#f8fafc",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Título y separador */}
      <div style={{ marginBottom: "32px", flexShrink: 0 }}>
        <h1
          style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: "20px",
            fontWeight: "400",
            color: "#2d3748",
            marginBottom: "12px",
            marginTop: "-13px",
          }}
        >
          Historial de análisis
        </h1>
        <div
          style={{
            height: "1px",
            backgroundColor: "#4FC3A1",
            width: "100%",
          }}
        />
      </div>

      {/* Botones de filtros */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", gap: "8px" }}>
        {/* Limpiar Filtros - Icono de escobita */}
        <button
          onClick={clearFilters}
          disabled={!hasActiveFilters()}
          title="Limpiar todos los filtros"
          style={{
            backgroundColor: hasActiveFilters() ? "#F6EDED" : "transparent",
            border: "none",
            cursor: hasActiveFilters() ? "pointer" : "not-allowed",
            padding: "7px",
            borderRadius: "4px",
            color: hasActiveFilters() ? "#F77CA2" : "#CBD5E0",
            opacity: hasActiveFilters() ? 1 : 0.5,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.36 2.72L20.78 4.14L15.06 9.85C16.13 11.39 16.28 13.24 15.38 14.44L9.06 8.12C10.26 7.22 12.11 7.37 13.65 8.44L19.36 2.72ZM5.93 17.57C3.92 15.56 2.69 13.16 2.35 10.92L7.23 8.83L14.67 16.27L12.58 21.15C10.34 20.81 7.94 19.58 5.93 17.57Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Análisis del sitio - Icono de gráfica de líneas */}
        <button
          onClick={() => setFilters({...filters, tipo: filters.tipo === "Del sitio" ? null : "Del sitio"})}
          title="Mostrar sólo análisis de sitio"
          disabled={filters.tipo === "Comparativo"}
          style={{
            backgroundColor: filters.tipo === "Del sitio" ? "#F77CA2" : "transparent",
            border: "none",
            cursor: filters.tipo === "Comparativo" ? "not-allowed" : "pointer",
            padding: "7px",
            borderRadius: "4px",
            color: filters.tipo === "Del sitio" ? "white" : "#F77CA2",
            opacity: filters.tipo === "Comparativo" ? 0.5 : 1,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 18.49L9 12.99L13 16.99L22 6.92L20.59 5.51L13 13.1L9 9.1L2.09 17.01L3.5 18.49Z" fill="currentColor"/>
            <path d="M2 2V22H22V20H4V2H2Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Análisis comparativo */}
        <button
          onClick={() => setFilters({...filters, tipo: filters.tipo === "Comparativo" ? null : "Comparativo"})}
          title="Mostrar sólo análisis comparativos"
          disabled={filters.tipo === "Del sitio"}
          style={{
            backgroundColor: filters.tipo === "Comparativo" ? "#F77CA2" : "transparent",
            border: "none",
            cursor: filters.tipo === "Del sitio" ? "not-allowed" : "pointer",
            padding: "7px",
            borderRadius: "4px",
            color: filters.tipo === "Comparativo" ? "white" : "#F77CA2",
            opacity: filters.tipo === "Del sitio" ? 0.5 : 1,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12L18 8V11H14V13H18V16L22 12ZM2 12L6 16V13H10V11H6V8L2 12Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Búsqueda */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          title="Buscar análisis"
          style={{
            backgroundColor: showSearch ? "#F77CA2" : "transparent",
            border: "none",
            cursor: "pointer",
            padding: "7px",
            borderRadius: "4px",
            color: showSearch ? "white" : "#F77CA2",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Filtrar por fecha */}
        <button
          onClick={() => setShowDateFilter(!showDateFilter)}
          title="Filtrar por fecha"
          style={{
            backgroundColor: showDateFilter ? "#F77CA2" : "transparent",
            border: "none",
            cursor: "pointer",
            padding: "7px",
            borderRadius: "4px",
            color: showDateFilter ? "white" : "#F77CA2",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Descargar */}
        <button
          onClick={downloadCSV}
          title="Descargar resultados"
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "7px",
            borderRadius: "4px",
            color: "#F77CA2",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Enviar */}
        <button
          onClick={sendEmail}
          title="Enviar por correo"
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "7px",
            borderRadius: "4px",
            color: "#F77CA2",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* Componente de búsqueda */}
      {showSearch && (
        <div style={{
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center"
        }}>
          <select
            value={filters.busqueda.tipo}
            onChange={(e) => setFilters({...filters, busqueda: {...filters.busqueda, tipo: e.target.value}})}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #CBD5E0",
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: "12px"
            }}
          >
            <option value="">Seleccionar campo</option>
            <option value="Tipo de análisis">Tipo de análisis</option>
            <option value="URL analizado">URL analizado</option>
            <option value="Tamaño de la muestra">Tamaño de la muestra</option>
            <option value="Resultado principal">Resultado principal</option>
          </select>
          
          <input
            type="text"
            placeholder="Buscar..."
            value={filters.busqueda.valor}
            onChange={(e) => setFilters({...filters, busqueda: {...filters.busqueda, valor: e.target.value}})}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #CBD5E0",
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: "12px",
              flex: 1
            }}
          />
          
          <button
            onClick={() => setShowSearch(false)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#64748B"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      )}

      {/* Componente de filtro por fecha (flotante) */}
      {showDateFilter && (
        <div style={{
          position: "absolute",
          right: "40px",
          top: "140px",
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "250px"
        }}>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", fontFamily: '"Noto Sans", sans-serif' }}>Seleccionar fecha</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #CBD5E0",
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: "12px"
            }}
          />
          
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <button
              onClick={() => setShowDateFilter(false)}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #CBD5E0",
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: "12px"
              }}
            >
              Cancelar
            </button>
            <button
              onClick={applyDateFilter}
              style={{
                backgroundColor: "#4FC3A1",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: "12px"
              }}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Tabla de historial */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxHeight: "670px",
          overflow: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: '"Noto Sans", sans-serif',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#F6EDED",
                fontSize: "12px",
                color: "#475569",
                fontWeight: "700",
              }}
            >
              <th style={{ padding: "12px 16px", textTransform: "uppercase" }}>
                <SortButton columnKey="fecha">Fecha de análisis</SortButton>
              </th>
              <th style={{ padding: "12px 16px", textTransform: "uppercase" }}>
                <SortButton columnKey="tipo">Tipo de análisis</SortButton>
              </th>
              <th style={{ padding: "12px 16px", textTransform: "uppercase" }}>
                <SortButton columnKey="url">URL analizado</SortButton>
              </th>
              <th style={{ padding: "12px 16px", textTransform: "uppercase" }}>
                <SortButton columnKey="muestra">Tamaño de la muestra</SortButton>
              </th>
              <th style={{ padding: "12px 16px", textTransform: "uppercase" }}>
                <SortButton columnKey="resultado">Resultado principal</SortButton>
              </th>
              <th style={{ padding: "12px 16px", textTransform: "uppercase" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                <td style={{ padding: "12px 16px", textAlign: "left", verticalAlign: "middle" }}>{item.fecha}</td>
                <td style={{ padding: "12px 16px", textAlign: "left", verticalAlign: "middle" }}>{item.tipo}</td>
                <td style={{ padding: "12px 16px", textAlign: "left", verticalAlign: "middle" }}>{item.url}</td>
                <td style={{ padding: "12px 16px", textAlign: "left", verticalAlign: "middle" }}>{item.muestra}</td>
                <td style={{ padding: "12px 16px", textAlign: "left", verticalAlign: "middle" }}>{item.resultado}</td>
                <td style={{ padding: "12px 16px", textAlign: "center", verticalAlign: "middle" }}>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    {/* Checkbox para selección */}
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleRowSelection(item.id)}
                      style={{ accentColor: "#F77CA2" }}
                      title="Seleccionar para descargar/enviar"
                    />

                    {/* Botón Ver */}
                    <button
                      title="Ver análisis"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#4FC3A1",
                        padding: "4px"
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
                      </svg>
                    </button>

                    {/* Botón Descargar PDF */}
                    <button
                      title="Descargar PDF"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#F77CA2",
                        padding: "4px"
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="currentColor"/>
                      </svg>
                    </button>

                    {/* Botón Eliminar */}
                    <button
                      onClick={() => deleteAnalysis(item.id)}
                      title="Eliminar análisis"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#DC2626",
                        padding: "4px"
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
                      </svg>
                    </button>

                    {/* Botón Favorito */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      title={item.favorito ? "Quitar de favoritos" : "Marcar como favorito"}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: item.favorito ? "#F59E0B" : "#CBD5E0",
                        padding: "4px"
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer tabla */}
      <div
        style={{
          padding: "12px 16px",
          textAlign: "right",
          fontSize: "12px",
          color: "#64748b",
          fontFamily: '"Noto Sans", sans-serif',
        }}
      >
        Mostrando {filteredData.length} de {data.length} análisis
      </div>
    </div>
  );
}