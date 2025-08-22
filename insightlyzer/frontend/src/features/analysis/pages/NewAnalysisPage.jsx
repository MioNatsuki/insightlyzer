// src/features/analysis/pages/NewAnalysisPage.jsx
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function NewAnalysisPage() {
  const [analysisType, setAnalysisType] = useState("sitio");
  const [sampleSize, setSampleSize] = useState("pequena");
  const [selectedVariables, setSelectedVariables] = useState([]);

  const handleVariableToggle = (variable) => {
    if (selectedVariables.includes(variable)) {
      setSelectedVariables(selectedVariables.filter(v => v !== variable));
    } else {
      setSelectedVariables([...selectedVariables, variable]);
    }
  };

  return (
    <div
      style={{
        marginLeft: "225px",
        padding: "20px",
        backgroundColor: "#f8fafc",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Título y separador */}
      <div style={{ marginBottom: "20px", flexShrink: 0 }}>
        <h1
          style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: "20px",
            fontWeight: "400",
            color: "#2d3748",
            margin: "0 0 8px 0",
          }}
        >
          Nuevo análisis
        </h1>
        <div
          style={{
            height: "1px",
            backgroundColor: "#4FC3A1",
            width: "100%",
          }}
        />
      </div>

      {/* Contenedor principal */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          overflow: "hidden",
          alignItems: "start",
        }}
      >
        {/* Columna izquierda - Formulario */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          {/* Título principal */}
          <h2
            style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: "25px",
              fontWeight: "400",
              color: "#2d3748",
              margin: "0",
            }}
          >
            Datos del sitio y tipo de reporte
          </h2>

          {/* Campo de texto para URL */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#2d3748",
                }}
              >
                URL del sitio
              </span>
            </div>
            <input
              type="text"
              placeholder="Escríbe aquí"
              style={{
                width: "100%",
                maxWidth: "582px",
                height: "48px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e0",
                fontSize: "14px",
                fontFamily: '"Noto Sans", sans-serif',
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Tipo de análisis */}
          <div>
            <h3
              style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: "12px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "8px",
              }}
            >
              Tipo de análisis
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="analysisType"
                  checked={analysisType === "sitio"}
                  onChange={() => setAnalysisType("sitio")}
                  style={{
                    width: "20px",
                    height: "20px",
                    accentColor: "#F77CA2",
                    cursor: "pointer",
                  }}
                />
                <span
                  style={{
                    fontFamily: '"Noto Sans", sans-serif',
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#2d3748",
                  }}
                >
                  Del sitio (estadísticas)
                </span>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="analysisType"
                  checked={analysisType === "comparativo"}
                  onChange={() => setAnalysisType("comparativo")}
                  style={{
                    width: "20px",
                    height: "20px",
                    accentColor: "#F77CA2",
                    cursor: "pointer",
                  }}
                />
                <span
                  style={{
                    fontFamily: '"Noto Sans", sans-serif',
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#2d3748",
                  }}
                >
                  Comparativo (con competidores)
                </span>
              </label>
            </div>
          </div>

          {/* Tamaño de la muestra */}
          <div>
            <h3
              style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: "12px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "8px",
              }}
            >
              Tamaño de la muestra
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="sampleSize"
                  checked={sampleSize === "pequena"}
                  onChange={() => setSampleSize("pequena")}
                  style={{ width: "20px", height: "20px", accentColor: "#F77CA2", cursor: "pointer" }}
                />
                <span style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: "14px", fontWeight: "400", color: "#2d3748" }}>
                  Pequeña (menos de 500 páginas / 1-3 Competidores)
                </span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="sampleSize"
                  checked={sampleSize === "mediana"}
                  onChange={() => setSampleSize("mediana")}
                  style={{ width: "20px", height: "20px", accentColor: "#F77CA2", cursor: "pointer" }}
                />
                <span style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: "14px", fontWeight: "400", color: "#2d3748" }}>
                  Mediano (501-1000 páginas / 4-5 Competidores)
                </span>
              </label>
            </div>
          </div>

          {/* Selección de variables */}
          <div>
            <h3
              style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: "12px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "8px",
              }}
            >
              Selección de variables para el análisis
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                "Interacción del usuario",
                "Análisis del sentimiento en comentarios",
                "Paleta de colores del sitio y su impacto visual",
                "Datos demográficos"
              ].map((variable, index) => (
                <label
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: analysisType === "sitio" ? "pointer" : "not-allowed",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedVariables.includes(variable)}
                    onChange={() => handleVariableToggle(variable)}
                    disabled={analysisType !== "sitio"}
                    style={{
                      width: "20px",
                      height: "20px",
                      accentColor: "#F77CA2",
                      cursor: analysisType === "sitio" ? "pointer" : "not-allowed",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: '"Noto Sans", sans-serif',
                      fontSize: "14px",
                      fontWeight: "400",
                      color: analysisType === "sitio" ? "#2d3748" : "#cbd5e0",
                    }}
                  >
                    {variable}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Formato del informe */}
          <div>
            <h3
              style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: "12px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "8px",
              }}
            >
              Formato del informe
            </h3>
            <select
              style={{
                width: "100%",
                maxWidth: "582px",
                height: "48px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #F77CA2",
                fontSize: "14px",
                fontFamily: '"Noto Sans", sans-serif',
                backgroundColor: "white",
                outline: "none",
                boxSizing: "border-box",
              }}
            >
              <option>PDF (descarga directa)</option>
              <option>Power BI (enlace sólo lectura)</option>
              <option>CSV (para exportar datos crudos)</option>
            </select>
          </div>

          {/* Botón de generar análisis */}
          <div style={{ 
            display: "flex", 
            justifyContent: "flex-start", 
            marginTop: "16px",
            width: "100%",
            maxWidth: "582px"
          }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px 0",
                marginLeft: "0"
              }}
            >
              {/* Icono de generación - usando un SVG simple como placeholder */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="#F77CA2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: "22px",
                  fontWeight: "400",
                  color: "#2d3748",
                }}
              >
                Generar análisis
              </span>
            </button>
          </div>
        </div>

        {/* Columna derecha - Vista previa */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          overflowY: "auto",
          paddingRight: "8px",
          justifyContent: "flex-start",
          paddingBottom: "60px",
        }}>
          {analysisType === "sitio" ? (
            /* Vista para "Del sitio" (tu código actual) */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "20px", height: "100%" }}>
              {/* Parte 1 - Gráfica de sentimiento (sólo si está seleccionada) */}
                  {selectedVariables.includes("Análisis del sentimiento en comentarios") && (
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {/* Contenedor de gráfica y leyenda lado a lado */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                      }}>
                        {/* Gráfica de pastel */}
                        <div style={{ width: "234px", height: "234px" }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "Positivo", value: 3200 },
                                  { name: "Neutral", value: 1800 },
                                  { name: "Negativo", value: 1000 }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                dataKey="value"
                              >
                                <Cell key="cell-0" fill="#B0F5C1" />
                                <Cell key="cell-1" fill="#F0E68C" />
                                <Cell key="cell-2" fill="#EF7771" />
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        
                        {/* Leyenda de colores a la derecha */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <div style={{ width: "52px", height: "32px", backgroundColor: "#B0F5C1", borderRadius: "4px" }}></div>
                            <span style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: "12px", fontWeight: "400" }}>Positivos</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <div style={{ width: "52px", height: "32px", backgroundColor: "#F0E68C", borderRadius: "4px" }}></div>
                            <span style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: "12px", fontWeight: "400" }}>Neutro</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <div style={{ width: "52px", height: "32px", backgroundColor: "#EF7771", borderRadius: "4px" }}></div>
                            <span style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: "12px", fontWeight: "400" }}>Negativos</span>
                          </div>
                        </div>
                      </div>

                      {/* Título debajo de la gráfica */}
                      <h3 style={{
                        fontFamily: '"Noto Sans", sans-serif',
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#2d3748",
                        marginTop: "10px",
                        textAlign: "center"
                      }}>
                        Análisis del sentimiento en comentarios
                      </h3>
                    </div>
                  )}

                    {/* Parte 2 - Gráfica de interacción (sólo si está seleccionada) */}
                    {selectedVariables.includes("Interacción del usuario") && (
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <p style={{
                          fontFamily: '"Noto Sans", sans-serif',
                          fontSize: "20px",
                          fontWeight: "400",
                          color: "#2d3748",
                          margin: "0 0 15px 0",
                          textAlign: "left"
                        }}>
                          En total hubo <strong>450 comentarios analizados, 320 reseñas y 250 shares</strong>
                        </p>
                        
                        {/* Gráfica de barras con valores */}
                        <div style={{ width: "170px", height: "190px", backgroundColor: "#f8fafc", borderRadius: "8px", padding: "10px", position: "relative" }}>
                          {/* Líneas de referencia */}
                          <div style={{ position: "absolute", top: "10%", left: 0, right: 0, height: "1px", backgroundColor: "#e2e8f0" }}></div>
                          <div style={{ position: "absolute", top: "30%", left: 0, right: 0, height: "1px", backgroundColor: "#e2e8f0" }}></div>
                          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", backgroundColor: "#e2e8f0" }}></div>
                          <div style={{ position: "absolute", top: "70%", left: 0, right: 0, height: "1px", backgroundColor: "#e2e8f0" }}></div>
                          <div style={{ position: "absolute", top: "90%", left: 0, right: 0, height: "1px", backgroundColor: "#e2e8f0" }}></div>
                          
                          {/* Valores del eje Y */}
                          <div style={{ position: "absolute", left: "5px", top: "5%", fontSize: "8px", color: "#718096" }}>7k</div>
                          <div style={{ position: "absolute", left: "5px", top: "45%", fontSize: "8px", color: "#718096" }}>4k</div>
                          <div style={{ position: "absolute", left: "5px", top: "85%", fontSize: "8px", color: "#718096" }}>1k</div>
                          
                          {/* Barras */}
                          <div style={{ display: "flex", height: "100%", alignItems: "flex-end", gap: "15px", justifyContent: "center", paddingLeft: "15px" }}>
                            <div style={{ width: "30px", height: "65%", backgroundColor: "#B0F5C1", borderRadius: "4px", position: "relative" }}>
                              <div style={{ position: "absolute", top: "-20px", left: "0", right: "0", textAlign: "center", fontSize: "10px" }}>4.5k</div>
                            </div>
                            <div style={{ width: "30px", height: "45%", backgroundColor: "#F0E68C", borderRadius: "4px", position: "relative" }}>
                              <div style={{ position: "absolute", top: "-20px", left: "0", right: "0", textAlign: "center", fontSize: "10px" }}>3.2k</div>
                            </div>
                            <div style={{ width: "30px", height: "30%", backgroundColor: "#EF7771", borderRadius: "4px", position: "relative" }}>
                              <div style={{ position: "absolute", top: "-20px", left: "0", right: "0", textAlign: "center", fontSize: "10px" }}>2.5k</div>
                            </div>
                          </div>
                        </div>
                        
                        <h3 style={{
                          fontFamily: '"Noto Sans", sans-serif',
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#2d3748",
                          marginTop: "10px",
                          textAlign: "center"
                        }}>
                          Interacción del usuario
                        </h3>
                        
                        {/* Leyenda de colores */}
                        <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "5px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <div style={{ width: "12px", height: "12px", backgroundColor: "#B0F5C1", borderRadius: "50%" }}></div>
                            <span style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: "12px", fontWeight: "400" }}>Reseñas de los productos</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <div style={{ width: "12px", height: "12px", backgroundColor: "#F0E68C", borderRadius: "50%" }}></div>
                            <span style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: "12px", fontWeight: "400" }}>Comentarios</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <div style={{ width: "12px", height: "12px", backgroundColor: "#EF7771", borderRadius: "50%" }}></div>
                            <span style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: "12px", fontWeight: "400" }}>Shares</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Parte 3 - Paleta de colores (sólo si está seleccionada) */}
                    {selectedVariables.includes("Paleta de colores del sitio y su impacto visual") && (
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {/* Paleta de colores */}
                        <div style={{ display: "flex", width: "300px", height: "87px", borderRadius: "8px", overflow: "hidden" }}>
                          <div style={{ flex: 1, backgroundColor: "#7CE295" }}></div>
                          <div style={{ flex: 1, backgroundColor: "#3979D9" }}></div>
                          <div style={{ flex: 1, backgroundColor: "#1F0A2D" }}></div>
                          <div style={{ flex: 1, backgroundColor: "#2A5033" }}></div>
                          <div style={{ flex: 1, backgroundColor: "#0C982E" }}></div>
                        </div>
                        
                        <p style={{
                          fontFamily: '"Noto Sans", sans-serif',
                          fontSize: "20px",
                          fontWeight: "400",
                          color: "#2d3748",
                          marginTop: "20px",
                          textAlign: "left"
                        }}>
                          La paleta usa <strong>tonos oscuros</strong> predominantes (<strong>verde y azul</strong>), lo que transmite <strong>energía</strong>, pero puede generar <strong>fatiga visual</strong> en exceso.
                        </p>
                      </div>
                    )}

                    {/* Parte 4 - Datos demográficos (sólo si está seleccionada) */}
                    {selectedVariables.includes("Datos demográficos") && (
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" stroke="#4FC3A1" strokeWidth="2"/>
                            <path d="M17 18C17 15.2386 14.7614 13 12 13C9.23858 13 7 15.2386 7 18" stroke="#4FC3A1" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4FC3A1" strokeWidth="2"/>
                          </svg>
                          <p style={{
                            fontFamily: '"Noto Sans", sans-serif',
                            fontSize: "20px",
                            fontWeight: "400",
                            color: "#2d3748",
                            margin: "0",
                            textAlign: "left"
                          }}>
                            <strong>60%</strong> de usuarios son <strong>mujeres</strong>, la mayoría entre <strong>25-34</strong> años, principalmente en <strong>México y España</strong>. Su principal fuente de acceso es un <strong>dispositivo móvil</strong>. El idioma principal entre los usuarios es el <strong>español</strong>.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Mensaje cuando no hay elementos seleccionados */}
                    {selectedVariables.length === 0 && analysisType === "sitio" && (
                      <div style={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        fontFamily: '"Noto Sans", sans-serif',
                        fontSize: "16px",
                        color: "#cbd5e0",
                        textAlign: "center"
                      }}>
                        Selecciona variables de análisis para ver la previsualización
                      </div>
                    )}
            </div>
          ) : (
            /* Vista para "Comparativo" */
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Tabla comparativa */}
              <div style={{ 
                width: "100%", 
                maxWidth: "662px", 
                maxHeight: "600px", 
                overflow: "auto",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                backgroundColor: "white"
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: '"Noto Sans", sans-serif', fontSize: "12px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc" }}>
                      <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0", fontWeight: "600" }}>Metrica</th>
                      {[...Array(sampleSize === "pequena" ? 4 : 7)].map((_, index) => (
                        <th key={index} style={{ padding: "12px", textAlign: "center", borderBottom: "1px solid #e2e8f0", fontWeight: "600" }}>
                          {index === 0 ? "Tu Sitio" : `Competidor ${index}`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {["Beneficios", "Usuarios", "Precio", "Popularidad", "Valoración"].map((metric, rowIndex) => (
                      <tr key={rowIndex} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td style={{ padding: "12px", fontWeight: "600", backgroundColor: "#f8fafc" }}>{metric}</td>
                        {[...Array(sampleSize === "pequena" ? 4 : 7)].map((_, colIndex) => {
                          // Lógica para determinar el mejor/peor valor
                          let bgColor = "transparent";
                          let isBest = colIndex === 2; // Ejemplo: el competidor 2 es el mejor
                          let isWorst = colIndex === 1; // Ejemplo: el competidor 1 es el peor
                          
                          if (isBest) bgColor = "#B0F5C1";
                          else if (isWorst) bgColor = "#EF7771";
                          else if (!isBest && !isWorst && colIndex > 0) bgColor = "#F0E68C";
                          
                          return (
                            <td key={colIndex} style={{ 
                              padding: "12px", 
                              textAlign: "center",
                              backgroundColor: bgColor
                            }}>
                              {Math.floor(Math.random() * 100)}/100
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Leyenda de colores */}
              <div style={{ display: "flex", gap: "15px", marginTop: "20px", justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "15px", height: "15px", backgroundColor: "#B0F5C1", borderRadius: "2px" }}></div>
                  <span style={{ fontSize: "12px" }}>Mejor Puntuada</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "15px", height: "15px", backgroundColor: "#F0E68C", borderRadius: "2px" }}></div>
                  <span style={{ fontSize: "12px" }}>Buen Balance</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "15px", height: "15px", backgroundColor: "#EF7771", borderRadius: "2px" }}></div>
                  <span style={{ fontSize: "12px" }}>Peor Puntuada</span>
                </div>
              </div>

              {/* Análisis textual */}
              <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", maxWidth: "662px" }}>
                <p style={{ margin: 0, fontFamily: '"Noto Sans", sans-serif', fontSize: "14px", lineHeight: "1.5" }}>
                  Tu empresa muestra <strong>mayor beneficios</strong> que las competidoras. Se podría <strong>invertir más en
                  marketing</strong> para que más personas la utilicen ya que su índice de usuarios no cumple
                  ningún criterio de relevancia. El precio está en un criterio <strong>poco relavante</strong> pero no está mal.
                  Su popularidad en cuestiones de que se está hablando es buena. 
                  Los usuarios que la usan, <strong>valoran tu esfuerzo</strong> comparada con tus competidoras.
                </p>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
  );
}