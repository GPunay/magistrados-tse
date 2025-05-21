import React, { useState, useEffect } from 'react';
import SubMenuUsuarios from './SubMenuUsuarios';
import '../css/reporteUsuario.css';

function ReporteUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Usamos el nuevo endpoint que ya incluye toda la información
        fetch('http://localhost:5000/api/reportes/usuarios')
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar usuarios');
                return response.json();
            })
            .then(data => {
                setUsuarios(data);
                setCargando(false);
            })
        .catch(error => {
            console.error('Error:', error);
            setError('Ocurrió un error al cargar los datos');
            setCargando(false);
        });
    }, []);

    const exportarCSV = () => {
        // Preparar encabezados del CSV
        const encabezados = [
            'ID',
            'Primer Nombre',
            'Segundo Nombre',
            'Primer Apellido',
            'Segundo Apellido',
            'Correo',
            'Teléfono',
            'Contraseña (hash)',
            'Cargo',
            'Departamento'
        ];
        
        // Preparar filas de datos
        const filas = usuarios.map(usuario => [
            usuario.idUsuario,
            usuario.primer_nombre,
            usuario.segundo_nombre || '',
            usuario.primer_apellido,
            usuario.segundo_apellido || '',
            usuario.correo,
            usuario.telefono || '',
            usuario.pass || '',
            usuario.cargo_nombre || '',
            usuario.departamento_nombre || ''
        ]);
        
        // Combinar encabezados y filas
        const datosCSV = [
            encabezados,
            ...filas
        ];
        
        // Convertir a formato CSV
        const contenidoCSV = datosCSV
            .map(fila => fila.map(valor => `"${String(valor).replace(/"/g, '""')}"`).join(','))
            .join('\n');
        
        // Crear blob y descargar
        const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.setAttribute('href', url);
        enlace.setAttribute('download', `reporte_usuarios_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`);
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
    };

    return (
        <>
            <SubMenuUsuarios />
            <div className="main-content-with-submenu">
                <div className="header">
                    <h1 className="header-title">Tribunal Supremo Electoral</h1>
                </div>
                <div className='reporteUsuarioContenedor'>
                    <h1 className="reporteUsuarioTitulo">Reporte de Usuarios</h1>
                    
                    {error && <div className="mensaje error">{error}</div>}
                    
                    {cargando ? (
                        <div className="cargando">Cargando datos de usuarios...</div>
                    ) : (
                        <>
                            <div className="controles-reporte">
                                <button 
                                    className="boton-exportar" 
                                    onClick={exportarCSV}
                                >
                                    Exportar a CSV
                                </button>
                            </div>
                            
                            <div className="tabla-reporte-container">
                                <table className="tabla-reporte-usuarios">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                            <th>Correo</th>
                                            <th>Teléfono</th>
                                            <th>Contraseña (hash)</th>
                                            <th>Cargo</th>
                                            <th>Departamento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map(usuario => (
                                            <tr key={usuario.idUsuario}>
                                                <td>{usuario.idUsuario}</td>
                                                <td>{`${usuario.primer_nombre} ${usuario.segundo_nombre || ''}`}</td>
                                                <td>{`${usuario.primer_apellido} ${usuario.segundo_apellido || ''}`}</td>
                                                <td>{usuario.correo}</td>
                                                <td>{usuario.telefono || '-'}</td>
                                                <td className="hash-password">{usuario.pass || '-'}</td>
                                                <td>{usuario.cargo_nombre || '-'}</td>
                                                <td>{usuario.departamento_nombre || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default ReporteUsuario;