import React, { useState, useEffect } from 'react';
import '../css/agenda.css';

function Agenda() {
    const [votaciones, setVotaciones] = useState([]);
    const [filtrosDisponibles, setFiltrosDisponibles] = useState({
        cargos: [],
        departamentos: [],
        votos: [],
        estados: []
    });
    const [filtrosAplicados, setFiltrosAplicados] = useState({
        nombre: '',
        cargo: '',
        departamento: '',
        voto: '',
        estado: '',
        fechaInicio: '',
        fechaFin: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/reportes/votaciones');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setVotaciones(data.votaciones);
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
        return votaciones.filter(item => {
            const cumpleNombre = filtrosAplicados.nombre === '' || 
                            item.NombreCompleto.toLowerCase().includes(filtrosAplicados.nombre.toLowerCase());
            const cumpleCargo = filtrosAplicados.cargo === '' || item.CargoNombre === filtrosAplicados.cargo;
            const cumpleDepto = filtrosAplicados.departamento === '' || item.DepartamentoNombre === filtrosAplicados.departamento;
            const cumpleVoto = filtrosAplicados.voto === '' || item.voto === filtrosAplicados.voto;
            const cumpleEstado = filtrosAplicados.estado === '' || item.estado === filtrosAplicados.estado;
            const cumpleFechaInicio = filtrosAplicados.fechaInicio === '' || 
                                new Date(item.fecha_sesion) >= new Date(filtrosAplicados.fechaInicio);
            const cumpleFechaFin = filtrosAplicados.fechaFin === '' || 
                                new Date(item.fecha_sesion) <= new Date(filtrosAplicados.fechaFin + 'T23:59:59');
            
            return cumpleNombre && cumpleCargo && cumpleDepto && cumpleVoto && cumpleEstado && cumpleFechaInicio && cumpleFechaFin;
        });
    };

    const limpiarFiltros = () => {
        setFiltrosAplicados({
            nombre: '',
            cargo: '',
            departamento: '',
            voto: '',
            estado: '',
            fechaInicio: '',
            fechaFin: ''
        });
    };

    const votacionesFiltradas = aplicarFiltros();

    const getColorPorVoto = (voto) => {
        switch (voto) {
            case 'A favor': return 'green';
            case 'En contra': return 'red';
            case 'Abstención': return 'orange';
            default: return 'gray';
        }
    };

    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="main-content-with-menu">
            <div className="sistemaTSE">
                <div className="header">
                    <h1 className="header-title">Tribunal Supremo Electoral</h1>
                </div>
                <div className="agendaContenedor">
                    <h1 className="agendaTitulo">Reporte de Votaciones del Pleno</h1>
                    
                    {/* Filtros */}
                    <div className="filtros-container">
                        <h2>Filtros</h2>
                        <div className="filtros-grid">
                            <div className="filtro-item">
                                <label>Nombre:</label>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    value={filtrosAplicados.nombre}
                                    onChange={handleFilterChange}
                                    placeholder="Buscar por nombre"
                                />
                            </div>
                            
                            <div className="filtro-item">
                                <label>Cargo:</label>
                                <select 
                                    name="cargo" 
                                    value={filtrosAplicados.cargo}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todos los cargos</option>
                                    {filtrosDisponibles.cargos.map((cargo, index) => (
                                        <option key={index} value={cargo}>{cargo}</option>
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
                                <label>Voto:</label>
                                <select 
                                    name="voto" 
                                    value={filtrosAplicados.voto}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todos los votos</option>
                                    {filtrosDisponibles.votos.map((voto, index) => (
                                        <option key={index} value={voto}>{voto}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="filtro-item">
                                <label>Estado:</label>
                                <select 
                                    name="estado" 
                                    value={filtrosAplicados.estado}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todos los estados</option>
                                    {filtrosDisponibles.estados.map((estado, index) => (
                                        <option key={index} value={estado}>{estado}</option>
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
                                Mostrando {votacionesFiltradas.length} de {votaciones.length} registros
                            </span>
                        </div>
                    </div>
                    
                    {/* Tabla de resultados */}
                    <div className="tabla-container">
                        <table className="tabla-votaciones">
                            <thead>
                                <tr>
                                    <th>Nombre Completo</th>
                                    <th>Cargo</th>
                                    <th>Departamento</th>
                                    <th>Voto</th>
                                    <th>Fecha de Sesión</th>
                                    <th>Estado</th>
                                    <th>Contacto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {votacionesFiltradas.length > 0 ? (
                                    votacionesFiltradas.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.NombreCompleto}</td>
                                            <td>{item.CargoNombre}</td>
                                            <td>{item.DepartamentoNombre}</td>
                                            <td style={{ color: getColorPorVoto(item.voto) }}>
                                                {item.voto || 'No registrado'}
                                            </td>
                                            <td>{new Date(item.fecha_sesion).toLocaleDateString()}</td>
                                            <td>{item.estado || 'No especificado'}</td>
                                            <td>
                                                <div>{item.correo}</div>
                                                <div>{item.telefono}</div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="no-results">
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

export default Agenda;