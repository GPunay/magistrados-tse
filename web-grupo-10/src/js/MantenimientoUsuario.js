import React from 'react';
import { Link } from 'react-router-dom';
import '../css/mantenimientoUsuario.css';
import { IoPersonAdd } from "react-icons/io5";
import { FaUserEdit, FaUserMinus, FaUsers  } from "react-icons/fa";

function MantenimientoUsuario() {
    return (
        <div className="main-content-with-menu">
            <div className="sistemaTSE">
                <div className="header">
                    <h1 className="header-title">Tribunal Supremo Electoral</h1>
                </div>
                <div className="mantenimientoUsuarioContenedor">
                    <img className="logoMantenimientoTSE" src="../../img/tse.png" alt="Tribunal Supremo Electoral" />
                    <div className="menuModuloMantenimientoUsuarios">
                        <h1 className="mantenimientoTitulo">Mantenimiento de Usuarios</h1>
                        <div className="gridMenuModuloMantenimiento">
                                <Link to="/agregarUsuario" className="elementoGridMantenimiento">
                                    <IoPersonAdd className="menuIconMantenimiento" />
                                    <span>Agregar Usuario</span>
                                </Link>
                                <Link to="/actualizarUsuario" className="elementoGridMantenimiento">
                                    <FaUserEdit className="menuIconMantenimiento" />
                                    <span>Actualizar Usuario</span>
                                </Link>
                                <Link to="/eliminarUsuario" className="elementoGridMantenimiento">
                                    <FaUserMinus className="menuIconMantenimiento" />
                                    <span>Eliminar Usuario</span>
                                </Link>
                                <Link to="/reporteUsuario" className="elementoGridMantenimiento">
                                    <FaUsers className="menuIconMantenimiento" />
                                    <span>Reportes Usuarios</span>
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MantenimientoUsuario;