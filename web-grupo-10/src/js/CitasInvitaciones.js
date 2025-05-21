import React, { useState, useEffect } from 'react';
import '../css/citasInvitaciones.css';

function CitasInvitaciones() {
    const [citasInvitaciones, setCitasInvitaciones] = useState([]);
    const [filtrosDisponibles, setFiltrosDisponibles] = useState({
        municipios: [],
        departamentos: [],
        motivos: [],
        empleados: []
    });
    const [filtrosAplicados, setFiltrosAplicados] = useState({
        nombreCorporacion: '',
        municipio: '',
        departamento: '',
        motivo: '',
        empleado: '',
        fechaInicio: '',
        fechaFin: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/reportes/citas-invitaciones');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setCitasInvitaciones(data.citasInvitaciones);
                setFiltrosDisponibles(data.filtros);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFiltrosAplicados(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const aplicarFiltros = () => {
        return citasInvitaciones.filter(item => {
            const cumpleNombre = filtrosAplicados.nombreCorporacion === '' || 
                              item.nombreCorporacion.toLowerCase().includes(filtrosAplicados.nombreCorporacion.toLowerCase());
            const cumpleMunicipio = filtrosAplicados.municipio === '' || item.Municipio === filtrosAplicados.municipio;
            const cumpleDepto = filtrosAplicados.departamento === '' || item.Departamento === filtrosAplicados.departamento;
            const cumpleMotivo = filtrosAplicados.motivo === '' || item.motivoSolicitud === filtrosAplicados.motivo;
            const cumpleEmpleado = filtrosAplicados.empleado === '' || item.empleadoResponsable === filtrosAplicados.empleado;
            const cumpleFechaInicio = filtrosAplicados.fechaInicio === '' || 
                                   new Date(item.fechaSolicitud) >= new Date(filtrosAplicados.fechaInicio);
            const cumpleFechaFin = filtrosAplicados.fechaFin === '' || 
                                new Date(item.fechaSolicitud) <= new Date(filtrosAplicados.fechaFin + 'T23:59:59');
            
            return cumpleNombre && cumpleMunicipio && cumpleDepto && cumpleMotivo && cumpleEmpleado && cumpleFechaInicio && cumpleFechaFin;
        });
    };

    const limpiarFiltros = () => {
        setFiltrosAplicados({
            nombreCorporacion: '',
            municipio: '',
            departamento: '',
            motivo: '',
            empleado: '',
            fechaInicio: '',
            fechaFin: ''
        });
    };

    const citasFiltradas = aplicarFiltros();

    const formatFecha = (fecha) => {
        if (!fecha) return 'N/A';
        return new Date(fecha).toLocaleDateString('es-ES');
    };

    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="main-content-with-menu">
            <div className="sistemaTSE">
                <div className="header">
                    <h1 className="header-title">Tribunal Supremo Electoral</h1>
                </div>
                <div className="citasInvitacionesContenedor">
                    <h1 className="citasInvitacionesTitulo">Reporte de Citas e Invitaciones</h1>
                    
                    {/* Filtros */}
                    <div className="filtros-container">
                        <h2>Filtros</h2>
                        <div className="filtros-grid">
                            <div className="filtro-item">
                                <label>Nombre Corporación:</label>
                                <input 
                                    type="text" 
                                    name="nombreCorporacion" 
                                    value={filtrosAplicados.nombreCorporacion}
                                    onChange={handleFilterChange}
                                    placeholder="Buscar por nombre"
                                />
                            </div>
                            
                            <div className="filtro-item">
                                <label>Municipio:</label>
                                <select 
                                    name="municipio" 
                                    value={filtrosAplicados.municipio}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todos los municipios</option>
                                    {filtrosDisponibles.municipios.map((municipio, index) => (
                                        <option key={index} value={municipio}>{municipio}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="filtro-item">
                                <label>Departamento:</label>
                                <select 
                                    name="departamento" 
                                    value={filtrosAplicados.departamento}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todos los departamentos</option>
                                    {filtrosDisponibles.departamentos.map((depto, index) => (
                                        <option key={index} value={depto}>{depto}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="filtro-item">
                                <label>Motivo:</label>
                                <select 
                                    name="motivo" 
                                    value={filtrosAplicados.motivo}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todos los motivos</option>
                                    {filtrosDisponibles.motivos.map((motivo, index) => (
                                        <option key={index} value={motivo}>{motivo}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="filtro-item">
                                <label>Empleado Responsable:</label>
                                <select 
                                    name="empleado" 
                                    value={filtrosAplicados.empleado}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todos los empleados</option>
                                    {filtrosDisponibles.empleados.map((empleado, index) => (
                                        <option key={index} value={empleado}>{empleado}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="filtro-item">
                                <label>Fecha desde:</label>
                                <input 
                                    type="date" 
                                    name="fechaInicio" 
                                    value={filtrosAplicados.fechaInicio}
                                    onChange={handleFilterChange}
                                />
                            </div>
                            
                            <div className="filtro-item">
                                <label>Fecha hasta:</label>
                                <input 
                                    type="date" 
                                    name="fechaFin" 
                                    value={filtrosAplicados.fechaFin}
                                    onChange={handleFilterChange}
                                />
                            </div>
                        </div>
                        
                        <div className="filtros-botones">
                            <button onClick={limpiarFiltros}>Limpiar Filtros</button>
                            <span className="resultados-count">
                                Mostrando {citasFiltradas.length} de {citasInvitaciones.length} registros
                            </span>
                        </div>
                    </div>
                    
                    {/* Tabla de resultados */}
                    <div className="tabla-container">
                        <table className="tabla-citas">
                            <thead>
                                <tr>
                                    <th>Corporación</th>
                                    <th>Municipio</th>
                                    <th>Departamento</th>
                                    <th>Fecha Solicitud</th>
                                    <th>Motivo</th>
                                    <th>Fecha Creación Proyecto</th>
                                    <th>Fecha Resolución</th>
                                    <th>Empleado Responsable</th>
                                </tr>
                            </thead>
                            <tbody>
                                {citasFiltradas.length > 0 ? (
                                    citasFiltradas.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nombreCorporacion}</td>
                                            <td>{item.Municipio}</td>
                                            <td>{item.Departamento}</td>
                                            <td>{formatFecha(item.fechaSolicitud)}</td>
                                            <td>{item.motivoSolicitud}</td>
                                            <td>{formatFecha(item.fechaCreacionProyecto)}</td>
                                            <td>{formatFecha(item.fechaResolucion)}</td>
                                            <td>{item.empleadoResponsable}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="no-results">
                                            No se encontraron resultados con los filtros aplicados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CitasInvitaciones;