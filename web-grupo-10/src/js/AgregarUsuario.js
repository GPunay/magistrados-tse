import React, { useState, useEffect } from 'react';
import SubMenuUsuarios from './SubMenuUsuarios';
import '../css/agregarUsuario.css';
import { FaSave, FaUndo } from 'react-icons/fa';

function AgregarUsuario() {
    const [formData, setFormData] = useState({
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        correo: '',
        telefono: '',
        pass: '',
        confirmPass: '',
        id_cargo: '',
        id_departamento: ''
    });

    const [cargos, setCargos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                // Obtener cargos
                const cargosResponse = await fetch('http://localhost:5000/api/cargos');
                const cargosData = await cargosResponse.json();
                setCargos(cargosData);

                // Obtener departamentos
                const deptosResponse = await fetch('http://localhost:5000/api/departamentos');
                const deptosData = await deptosResponse.json();
                setDepartamentos(deptosData);
            } catch (err) {
                console.error('Error al cargar opciones:', err);
                setError('Error al cargar opciones del formulario');
            }
        };

        fetchOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (formData.pass !== formData.confirmPass) {
            setError('Las contraseñas no coinciden');
            return false;
        }
        if (!formData.primer_nombre || !formData.primer_apellido || !formData.correo || !formData.pass) {
            setError('Los campos marcados con * son obligatorios');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        try {
            const response = await fetch('http://localhost:5000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    primer_nombre: formData.primer_nombre,
                    segundo_nombre: formData.segundo_nombre,
                    primer_apellido: formData.primer_apellido,
                    segundo_apellido: formData.segundo_apellido,
                    correo: formData.correo,
                    telefono: formData.telefono,
                    pass: formData.pass,
                    id_cargo: parseInt(formData.id_cargo),
                    id_departamento: parseInt(formData.id_departamento)
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Usuario agregado correctamente');
                setFormData({
                    primer_nombre: '',
                    segundo_nombre: '',
                    primer_apellido: '',
                    segundo_apellido: '',
                    correo: '',
                    telefono: '',
                    pass: '',
                    confirmPass: '',
                    id_cargo: '',
                    id_departamento: ''
                });
            } else {
                setError(data.message || 'Error al agregar usuario');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Error al conectar con el servidor');
        }
    };

    const handleReset = () => {
        setFormData({
            primer_nombre: '',
            segundo_nombre: '',
            primer_apellido: '',
            segundo_apellido: '',
            correo: '',
            telefono: '',
            pass: '',
            confirmPass: '',
            id_cargo: '',
            id_departamento: ''
        });
        setError('');
        setSuccess('');
    };

    return (
        <>
            <SubMenuUsuarios />
            <div className="main-content-with-submenu">
                <div className="header">
                    <h1 className="header-title">Tribunal Supremo Electoral</h1>
                    <h2 className="header-subtitle">Guatemala, C. A.</h2>
                </div>
                <div className='agregarUsuarioContenedor'>
                    <h1 className="agregarUsuarioTitulo">Formulario para Agregar Usuario</h1>
                    
                    <form onSubmit={handleSubmit} className="usuario-form">
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="primer_nombre">Primer Nombre *</label>
                                <input
                                    type="text"
                                    id="primer_nombre"
                                    name="primer_nombre"
                                    value={formData.primer_nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="segundo_nombre">Segundo Nombre</label>
                                <input
                                    type="text"
                                    id="segundo_nombre"
                                    name="segundo_nombre"
                                    value={formData.segundo_nombre}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="primer_apellido">Primer Apellido *</label>
                                <input
                                    type="text"
                                    id="primer_apellido"
                                    name="primer_apellido"
                                    value={formData.primer_apellido}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="segundo_apellido">Segundo Apellido</label>
                                <input
                                    type="text"
                                    id="segundo_apellido"
                                    name="segundo_apellido"
                                    value={formData.segundo_apellido}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="correo">Correo Electrónico *</label>
                                <input
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono</label>
                                <input
                                    type="tel"
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    maxLength="10"
                                    pattern="[0-9]{8,10}"
                                />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="pass">Contraseña *</label>
                                <input
                                    type="password"
                                    id="pass"
                                    name="pass"
                                    value={formData.pass}
                                    onChange={handleChange}
                                    required
                                    minLength="4"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="confirmPass">Confirmar Contraseña *</label>
                                <input
                                    type="password"
                                    id="confirmPass"
                                    name="confirmPass"
                                    value={formData.confirmPass}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="id_cargo">Cargo *</label>
                                <select
                                    id="id_cargo"
                                    name="id_cargo"
                                    value={formData.id_cargo}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione un cargo</option>
                                    {cargos.map(cargo => (
                                        <option key={cargo.id_cargo} value={cargo.id_cargo}>
                                            {cargo.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="id_departamento">Departamento *</label>
                                <select
                                    id="id_departamento"
                                    name="id_departamento"
                                    value={formData.id_departamento}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione un departamento</option>
                                    {departamentos.map(depto => (
                                        <option key={depto.id_departamento} value={depto.id_departamento}>
                                            {depto.departamento}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="form-actions">
                            <button type="submit" className="btn-submit">
                                <FaSave /> Guardar Usuario
                            </button>
                            <button type="button" className="btn-reset" onClick={handleReset}>
                                <FaUndo /> Limpiar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AgregarUsuario;