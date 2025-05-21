import React, { useState, useEffect } from 'react';
import SubMenuUsuarios from './SubMenuUsuarios';
import '../css/actualizarUsuario.css';
import { FaSearch, FaSave, FaUndo, FaEye, FaEyeSlash } from 'react-icons/fa';

function ActualizarUsuario() {
    // Estados para el formulario
    const [searchEmail, setSearchEmail] = useState('');
    const [formData, setFormData] = useState({
        idUsuario: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        correo: '',
        telefono: '',
        id_cargo: '',
        id_departamento: '',
        pass: '',
        confirmarPass: ''
    });
    
    const [cargos, setCargos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUserFound, setIsUserFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [cambiarPassword, setCambiarPassword] = useState(false);
    const [notFoundEmail, setNotFoundEmail] = useState('');

    // Cargar opciones de combobox
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

    // Buscar usuario por correo
    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);
        setCambiarPassword(false);
        setNotFoundEmail('');

        try {
            const response = await fetch(`http://localhost:5000/api/usuarios/buscar?correo=${searchEmail}`);
            const data = await response.json();

            if (response.ok && data.idUsuario) {
                setFormData({
                    idUsuario: data.idUsuario,
                    primer_nombre: data.primer_nombre || '',
                    segundo_nombre: data.segundo_nombre || '',
                    primer_apellido: data.primer_apellido || '',
                    segundo_apellido: data.segundo_apellido || '',
                    correo: data.correo || '',
                    telefono: data.telefono || '',
                    id_cargo: data.id_cargo || '',
                    id_departamento: data.id_departamento || '',
                    pass: '',
                    confirmarPass: ''
                });
                setIsUserFound(true);
                setSuccess('Usuario encontrado. Puede modificar los datos.');
            } else {
                // Guardar el correo que no se encontró para mostrarlo en el mensaje
                setNotFoundEmail(searchEmail);
                setError(`No se encontró ningún usuario con el correo: ${searchEmail}`);
                setIsUserFound(false);
                resetForm();
            }
        } catch (err) {
            console.error('Error al buscar usuario:', err);
            setError('Error al conectar con el servidor. Intente nuevamente más tarde.');
            setIsUserFound(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Validar formulario
    const validateForm = () => {
        if (!formData.primer_nombre || !formData.primer_apellido || !formData.correo) {
            setError('Los campos marcados con * son obligatorios');
            return false;
        }

        if (cambiarPassword) {
            if (!formData.pass) {
                setError('Debe ingresar la nueva contraseña');
                return false;
            }
            
            if (formData.pass !== formData.confirmarPass) {
                setError('Las contraseñas no coinciden');
                return false;
            }
            
            if (formData.pass.length < 4) {
                setError('La contraseña debe tener al menos 4 caracteres');
                return false;
            }
        }
        
        return true;
    };

    // Actualizar usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        try {
            const userData = {
                primer_nombre: formData.primer_nombre,
                segundo_nombre: formData.segundo_nombre,
                primer_apellido: formData.primer_apellido,
                segundo_apellido: formData.segundo_apellido,
                correo: formData.correo,
                telefono: formData.telefono,
                id_cargo: parseInt(formData.id_cargo),
                id_departamento: parseInt(formData.id_departamento)
            };
            
            // Incluir contraseña solo si se seleccionó la opción de cambiarla
            if (cambiarPassword) {
                userData.pass = formData.pass;
            }

            const response = await fetch(`http://localhost:5000/api/usuarios/${formData.idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Usuario actualizado correctamente');
                if (cambiarPassword) {
                    setFormData(prev => ({
                        ...prev,
                        pass: '',
                        confirmarPass: ''
                    }));
                    setCambiarPassword(false);
                }
            } else {
                setError(data.message || 'Error al actualizar usuario');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Error al conectar con el servidor');
        }
    };

    // Limpiar formulario
    const resetForm = () => {
        setFormData({
            idUsuario: '',
            primer_nombre: '',
            segundo_nombre: '',
            primer_apellido: '',
            segundo_apellido: '',
            correo: '',
            telefono: '',
            id_cargo: '',
            id_departamento: '',
            pass: '',
            confirmarPass: ''
        });
        setSearchEmail('');
        setCambiarPassword(false);
    };

    // Alternar visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Alternar visibilidad de la confirmación de contraseña
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Manejar el cambio en la opción de cambiar contraseña
    const handleChangePasswordOption = (e) => {
        setCambiarPassword(e.target.checked);
        if (!e.target.checked) {
            setFormData(prev => ({
                ...prev,
                pass: '',
                confirmarPass: ''
            }));
        }
    };

    return (
        <>
            <SubMenuUsuarios />
            <div className="main-content-with-submenu">
                <div className="header">
                    <h1 className="header-title">Tribunal Supremo Electoral</h1>
                    <h2 className="header-subtitle">Guatemala, C. A.</h2>
                </div>
                <div className='actualizarUsuarioContenedor'>
                    <h1 className="actualizarUsuarioTitulo">Actualizar Usuario</h1>
                    
                    {/* Formulario de búsqueda */}
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-group">
                            <input
                                type="email"
                                placeholder="Ingrese el correo del usuario a buscar"
                                value={searchEmail}
                                onChange={(e) => setSearchEmail(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={isLoading}>
                                <FaSearch /> {isLoading ? 'Buscando...' : 'Buscar'}
                            </button>
                        </div>
                    </form>

                    {/* Mensaje de error cuando no se encuentra el usuario */}
                    {notFoundEmail && (
                        <div className="error-message user-not-found">
                            <p>El usuario con correo <strong>{notFoundEmail}</strong> no se encuentra registrado en la base de datos.</p>
                            <p>Verifique el correo electrónico o contacte al administrador del sistema.</p>
                        </div>
                    )}

                    {/* Otros mensajes de error/éxito generales */}
                    {error && !notFoundEmail && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    {/* Formulario de actualización */}
                    {isUserFound && (
                        <form onSubmit={handleSubmit} className="usuario-form">
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
                            
                            {/* Sección de cambio de contraseña */}
                            <div className="form-row">
                                <div className="form-group password-option">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={cambiarPassword}
                                            onChange={handleChangePasswordOption}
                                        />
                                        Cambiar contraseña
                                    </label>
                                </div>
                            </div>
                            
                            {cambiarPassword && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="pass">Nueva Contraseña *</label>
                                            <div className="password-input-container">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="pass"
                                                    name="pass"
                                                    value={formData.pass}
                                                    onChange={handleChange}
                                                    required={cambiarPassword}
                                                />
                                                <button 
                                                    type="button" 
                                                    className="password-toggle-btn"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="confirmarPass">Confirmar Contraseña *</label>
                                            <div className="password-input-container">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    id="confirmarPass"
                                                    name="confirmarPass"
                                                    value={formData.confirmarPass}
                                                    onChange={handleChange}
                                                    required={cambiarPassword}
                                                />
                                                <button 
                                                    type="button" 
                                                    className="password-toggle-btn"
                                                    onClick={toggleConfirmPasswordVisibility}
                                                >
                                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group password-info">
                                            <p>La contraseña debe tener al menos 4 caracteres.</p>
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            <div className="form-actions">
                                <button type="submit" className="btn-submit">
                                    <FaSave /> Actualizar Usuario
                                </button>
                                <button type="button" className="btn-reset" onClick={resetForm}>
                                    <FaUndo /> Limpiar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

export default ActualizarUsuario;