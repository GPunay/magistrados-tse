import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaUserCog, FaCalendarAlt } from "react-icons/fa";
import { MdInsertInvitation } from "react-icons/md";
import '../css/sistemaTSE.css';

function sistemaTSE() {
    return (
        <div className="main-content-with-menu">
            <div className="sistemaTSE">
                <div className="header">
                    <h1 className="header-title">Tribunal Supremo Electoral</h1>
                </div>
                
                <div className="content-container">
                    <div className="logo-container">
                        <img src="../../img/tse.png" alt="Logo TSE" className="logoSistemaTSE" />
                    </div>
                    
                    <div className="modules-container">
                        <h2 className="system-title">Sistema del Departamento de Magistrados</h2>
                        <div className="modules-grid">
                            <Link to="/corporacion" className="module">
                                <FaBuilding className="module-icon" />
                                <span>Municipalidad</span>
                            </Link>
                            <Link to="/citasInvitaciones" className="module">
                                <MdInsertInvitation className="module-icon" />
                                <span>Citas e Invitaciones</span>
                            </Link>
                            <Link to="/agenda" className="module">
                                <FaCalendarAlt className="module-icon" />
                                <span>Agendas</span>
                            </Link>
                            <Link to="/mantenimientoUsuario" className="module">
                                <FaUserCog className="module-icon" />
                                <span>Mantenimiento</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default sistemaTSE;