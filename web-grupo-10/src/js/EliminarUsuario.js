import React, { useState, useEffect } from 'react';
import SubMenuUsuarios from './SubMenuUsuarios';
import '../css/eliminarUsuario.css';

function EliminarUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargos, setCargos] = useState({});
    const [departamentos, setDepartamentos] = useState({});
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

    useEffect(() => {
        // Cargar los usuarios
        fetch('http://localhost:5000/api/usuarios')
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => console.error('Error al cargar usuarios:', error));

        // Cargar los cargos
        fetch('http://localhost:5000/api/cargos')
            .then(response => response.json())
            .then(data => {
                const mapaCargos = {};
                data.forEach(cargo => {
                    mapaCargos[cargo.id_cargo] = cargo.nombre;
                });
                setCargos(mapaCargos);
            })
            .catch(error => console.error('Error al cargar cargos:', error));

        // Cargar los departamentos
        fetch('http://localhost:5000/api/departamentos')
            .then(response => response.json())
            .then(data => {
                const mapaDepartamentos = {};
                data.forEach(depto => {
                    mapaDepartamentos[depto.id_departamento] = depto.departamento;
                });
                setDepartamentos(mapaDepartamentos);
            })
            .catch(error => console.error('Error al cargar departamentos:', error));
    }, []);

    const handleSeleccionarUsuario = (usuario) => {
        setUsuarioSeleccionado(usuario === usuarioSeleccionado ? null : usuario);
    };

    const handleConfirmarEliminar = () => {
        if (!usuarioSeleccionado) return;
        setMostrarConfirmacion(true);
    };

    const handleEliminarUsuario = () => {
        fetch(`http://localhost:5000/api/usuarios/${usuarioSeleccionado.idUsuario}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar usuario');
                }
                return response.json();
            })
            .then(data => {
                // Actualizar la lista de usuarios
                setUsuarios(usuarios.filter(usuario => usuario.idUsuario !== usuarioSeleccionado.idUsuario));
                setUsuarioSeleccionado(null);
                setMostrarConfirmacion(false);
                setMensaje({ texto: 'Usuario eliminado exitosamente', tipo: 'exito' });
                
                // Eliminar el mensaje después de 3 segundos
                setTimeout(() => {
                    setMensaje({ texto: '', tipo: '' });
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                setMensaje({ texto: 'Error al eliminar usuario', tipo: 'error' });
                setMostrarConfirmacion(false);
            });
    };

    const handleCancelarEliminar = () => {
        setMostrarConfirmacion(false);
    };

    return (
        <>
            <SubMenuUsuarios />
            <div className="main-content-with-submenu">
                <div className="header">
                    <h1 className="header-title">Tribunal Supremo Electoral</h1>
                </div>
                <div className='eliminarUsuarioContenedor'>
                    <h1 className="eliminarUsuarioTitulo">Eliminar Usuario</h1>
                    
                    {mensaje.texto && (
                        <div className={`mensaje ${mensaje.tipo}`}>
                            {mensaje.texto}
                        </div>
                    )}
                    
                    <div className="tabla-container">
                        <table className="tabla-usuarios">
                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Correo</th>
                                    <th>Teléfono</th>
                                    <th>Cargo</th>
                                    <th>Departamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr 
                                        key={usuario.idUsuario}
                                        className={usuarioSeleccionado === usuario ? 'seleccionado' : ''}
                                        onClick={() => handleSeleccionarUsuario(usuario)}
                                    >
                                        <td>{`${usuario.primer_nombre} ${usuario.segundo_nombre || ''}`}</td>
                                        <td>{`${usuario.primer_apellido} ${usuario.segundo_apellido || ''}`}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.telefono || '-'}</td>
                                        <td>{cargos[usuario.id_cargo] || '-'}</td>
                                        <td>{departamentos[usuario.id_departamento] || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="contenedor-acciones">
                        <button 
                            className="boton-eliminar"
                            onClick={handleConfirmarEliminar}
                            disabled={!usuarioSeleccionado}
                        >
                            Eliminar Usuario
                        </button>
                    </div>
                    
                    {mostrarConfirmacion && (
                        <div className="modal-confirmacion">
                            <div className="modal-contenido">
                                <h2>Confirmar Eliminación</h2>
                                <p>¿Está seguro que desea eliminar al usuario?</p>
                                <p><strong>Nombre:</strong> {`${usuarioSeleccionado.primer_nombre} ${usuarioSeleccionado.primer_apellido}`}</p>
                                <p><strong>Correo:</strong> {usuarioSeleccionado.correo}</p>
                                
                                <div className="botones-confirmacion">
                                    <button className="boton-cancelar" onClick={handleCancelarEliminar}>Cancelar</button>
                                    <button className="boton-confirmar" onClick={handleEliminarUsuario}>Confirmar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default EliminarUsuario;