import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sesion.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

function Login() {
    const [correo, setCorreo] = useState('');
    const [pass, setPass] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, pass })
            });

            const data = await response.json();
            if (data.success) {
                setMensaje(`Bienvenido, ${data.user.nombre} ${data.user.apellido}`);
                setTimeout(() => {
                    navigate('/sistemaTSE');
                }, 2000);
            } else {
                setMensaje('Correo o contraseña incorrectos');
                setTimeout(() => {
                    setMensaje(''); // Borra el mensaje después de 1 segundo
                }, 1500);
            }
        } catch (error) {
            console.error('Error en el login:', error);
            setMensaje('Error en el servidor');
            setTimeout(() => {
                setMensaje(''); // Borra el mensaje de error después de 1 segundo
            }, 1500);
        }
    };

    return (
        <div className="mainSesion">
            <div className="sesion">
                <div className="formularioSesion">
                    <Link className="enlaceInicio" to="/inicio">
                        <img src="/img/tse.png" alt="Logo del Tribunal Supremo Electoral" className="logoSesion"/>
                    </Link>
                    <form className='formSesion' onSubmit={handleLogin}>
                        <label className="labelSesion">Usuario</label>
                        <div className="inputSesion">
                            <FaUser className='iconoUsuario' />
                            <input 
                                type="email" 
                                placeholder="Ingrese su usuario"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                                size="40"
                            />
                        </div>
                        <label className="labelSesion">Contraseña</label>
                        <div className="inputSesion">
                            <RiLockPasswordFill className='iconoPassword' />
                            <input 
                                type="password" 
                                placeholder="Ingrese su contraseña"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                required
                                size="40"
                            />
                        </div>
                        <button type="submit" className='botonSesion'>Ingresar</button>
                        {mensaje && <p className="mensajeSesion">{mensaje}</p>}
                    </form>
                </div>
                <div className="imagenSesion">
                    <img src="/img/tse-edificio.jpg" alt="Edificio del Tribunal Supremo Electoral" className="imagenSesion"/>
                </div>
            </div>
        </div>
    );
}

export default Login;