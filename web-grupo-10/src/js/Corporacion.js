import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import '../css/corporacion.css';

function Corporacion() {
  const [datos, setDatos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [filtrosAsignaciones, setFiltrosAsignaciones] = useState({
    empleado: '',
    motivo: '',
    fechaInicio: '',
    fechaFin: ''
  });
  const [filtrosDisponibles, setFiltrosDisponibles] = useState({
    empleados: [],
    motivos: []
  });
  const [loading, setLoading] = useState({
    grafico: true,
    asignaciones: true
  });
  const [filtroDepartamento, setFiltroDepartamento] = useState('Todos');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  useEffect(() => {
    // Cargar datos para el gráfico
    axios.get('http://localhost:5000/api/reportes/solicitudes')
      .then(response => {
        setDatos(response.data.solicitudes);
        setDepartamentos(response.data.departamentos);
        setEstados(response.data.estados);
        setLoading(prev => ({...prev, grafico: false}));
      })
      .catch(error => {
        console.error('Error al cargar datos:', error);
        setLoading(prev => ({...prev, grafico: false}));
      });

    // Cargar datos para la tabla de asignaciones
    axios.get('http://localhost:5000/api/reportes/asignaciones-pleno')
      .then(response => {
        setAsignaciones(response.data.asignaciones);
        setFiltrosDisponibles(response.data.filtros);
        setLoading(prev => ({...prev, asignaciones: false}));
      })
      .catch(error => {
        console.error('Error al cargar asignaciones:', error);
        setLoading(prev => ({...prev, asignaciones: false}));
      });
  }, []);

  const filtrarDatos = () => {
    return datos.filter(item => {
      const filtroDepOk = filtroDepartamento === 'Todos' || item.NombreDep === filtroDepartamento;
      const filtroEstadoOk = filtroEstado === 'Todos' || item.estado === filtroEstado;
      return filtroDepOk && filtroEstadoOk;
    });
  };

  const filtrarAsignaciones = () => {
    return asignaciones.filter(item => {
      const cumpleEmpleado = filtrosAsignaciones.empleado === '' || 
                           item.empleadoAsignado === filtrosAsignaciones.empleado;
      const cumpleMotivo = filtrosAsignaciones.motivo === '' || 
                          item.motivoSolicitud === filtrosAsignaciones.motivo;
      const cumpleFechaInicio = filtrosAsignaciones.fechaInicio === '' || 
                               new Date(item.fechaSesionPleno) >= new Date(filtrosAsignaciones.fechaInicio);
      const cumpleFechaFin = filtrosAsignaciones.fechaFin === '' || 
                            new Date(item.fechaSesionPleno) <= new Date(filtrosAsignaciones.fechaFin + 'T23:59:59');
      
      return cumpleEmpleado && cumpleMotivo && cumpleFechaInicio && cumpleFechaFin;
    });
  };

  const prepararDatosGrafico = () => {
    const dataMap = {};

    filtrarDatos().forEach(({ NombreDep, estado, total }) => {
      if (!dataMap[NombreDep]) dataMap[NombreDep] = { NombreDep };
      dataMap[NombreDep][estado] = total;
    });

    return Object.values(dataMap);
  };

  const formatFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltrosAsignaciones(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const limpiarFiltrosAsignaciones = () => {
    setFiltrosAsignaciones({
      empleado: '',
      motivo: '',
      fechaInicio: '',
      fechaFin: ''
    });
  };

  const asignacionesFiltradas = filtrarAsignaciones();

  return (
    <div className="main-content-with-menu">
      <div className="sistemaTSE">
        <div className="header">
          <h1 className="header-title">Tribunal Supremo Electoral</h1>
        </div>

        <div className="corporacion-contenedor">
          <h1 className="corporacion-titulo">Reporte de Solicitudes por Corporación Municipal</h1>

          {/* Filtros para el gráfico */}
          <div className="corporacion-filtros">
            <div className="corporacion-filtro-item">
              <label>Departamento:</label>
              <select
                onChange={e => setFiltroDepartamento(e.target.value)}
                value={filtroDepartamento}
              >
                <option value="Todos">Todos</option>
                {departamentos.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>

            <div className="corporacion-filtro-item">
              <label>Estado:</label>
              <select
                onChange={e => setFiltroEstado(e.target.value)}
                value={filtroEstado}
              >
                <option value="Todos">Todos</option>
                {estados.map(est => (
                  <option key={est} value={est}>{est}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gráfico */}
          {loading.grafico ? (
            <div className="corporacion-loading">Cargando gráfico...</div>
          ) : (
            <div className="corporacion-grafico">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={prepararDatosGrafico()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="NombreDep" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {estados.map((estado, idx) => (
                    <Bar
                      key={estado}
                      dataKey={estado}
                      stackId="a"
                      fill={["#007bff", "#28a745", "#ffc107", "#dc3545"][idx % 4]}
                      name={estado}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Sección de asignaciones */}
          <div className="corporacion-asignaciones">
            <h2 className="corporacion-subtitulo">Asignaciones de Solicitudes por Pleno</h2>
            
            {/* Filtros para asignaciones */}
            <div className="corporacion-filtros">
              <div className="corporacion-filtro-item">
                <label>Empleado:</label>
                <select
                  name="empleado"
                  value={filtrosAsignaciones.empleado}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  {filtrosDisponibles.empleados.map((emp, idx) => (
                    <option key={idx} value={emp}>{emp}</option>
                  ))}
                </select>
              </div>

              <div className="corporacion-filtro-item">
                <label>Motivo:</label>
                <select
                  name="motivo"
                  value={filtrosAsignaciones.motivo}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  {filtrosDisponibles.motivos.map((mot, idx) => (
                    <option key={idx} value={mot}>{mot}</option>
                  ))}
                </select>
              </div>

              <div className="corporacion-filtro-item">
                <label>Fecha desde:</label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={filtrosAsignaciones.fechaInicio}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="corporacion-filtro-item">
                <label>Fecha hasta:</label>
                <input
                  type="date"
                  name="fechaFin"
                  value={filtrosAsignaciones.fechaFin}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="corporacion-filtro-boton">
                <button onClick={limpiarFiltrosAsignaciones}>Limpiar Filtros</button>
                <span className="corporacion-resultados">
                  Mostrando {asignacionesFiltradas.length} de {asignaciones.length} registros
                </span>
              </div>
            </div>

            {/* Tabla de asignaciones */}
            {loading.asignaciones ? (
              <div className="corporacion-loading">Cargando asignaciones...</div>
            ) : (
              <div className="corporacion-tabla-container">
                <table className="corporacion-tabla">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Empleado</th>
                      <th>Correo</th>
                      <th>Teléfono</th>
                      <th>Motivo</th>
                      <th>Fecha Asignación</th>
                      <th>Fecha Sesión</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asignacionesFiltradas.length > 0 ? (
                      asignacionesFiltradas.map((item, index) => (
                        <tr key={index}>
                          <td>{item.idAsignacion}</td>
                          <td>{item.empleadoAsignado}</td>
                          <td>{item.Correo}</td>
                          <td>{item.telefono}</td>
                          <td>{item.motivoSolicitud}</td>
                          <td>{formatFecha(item.fechaAsignacion)}</td>
                          <td>{formatFecha(item.fechaSesionPleno)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="corporacion-no-results">
                          No se encontraron asignaciones con los filtros aplicados
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Corporacion;