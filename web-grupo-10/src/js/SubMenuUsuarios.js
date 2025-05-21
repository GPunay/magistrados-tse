import React from 'react';
import { Link } from 'react-router-dom';
import { IoPersonAdd } from "react-icons/io5";
import { FaUserEdit, FaUserMinus, FaUsers } from "react-icons/fa";
import '../css/menuUsuario.css';

function SubMenuUsuarios() {
    return (
        <div className="submenu-container">
            <div className="menuUsuarios">
                <div className="gridMenuModuloUsuario">
                    <Link to="/agregarUsuario" className="elementoGridUsuario">
                        <IoPersonAdd className="menuIconUsuario" />
                        <span>Agregar Usuario</span>
                    </Link>
                    <Link to="/actualizarUsuario" className="elementoGridUsuario">
                        <FaUserEdit className="menuIconUsuario" />
                        <span>Actualizar Usuario</span>
                    </Link>
                    <Link to="/eliminarUsuario" className="elementoGridUsuario">
                        <FaUserMinus className="menuIconUsuario" />
                        <span>Eliminar Usuario</span>
                    </Link>
                    <Link to="/reporteUsuario" className="elementoGridUsuario">
                        <FaUsers className="menuIconUsuario" />
                        <span>Reportes Usuarios</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SubMenuUsuarios;