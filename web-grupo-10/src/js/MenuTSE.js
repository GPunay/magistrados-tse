import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding } from "react-icons/fa6";
import { MdInsertInvitation } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUserCog } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

import '../css/menuTSE.css';

function MenuTSE (){
    return (
        <div className='menuTSE'>
            <ul className="menuListaTSE">
                <li className="menuItem">
                    <Link to="/sistemaTSE">
                        <img src="../../img/tse.png" alt="Sistema del Departamento de Magistrados" className="logoTSE"/>
                    </Link>
                </li>
                <li className="menuItem">
                    <Link to="/corporacion">
                        <FaBuilding className="menuIcon" />
                        <span>Corporación Municipal</span>
                    </Link>
                </li>
                <li className="menuItem">
                    <Link to="/citasInvitaciones">
                        <MdInsertInvitation className="menuIcon" />
                        <span>Citas e Invitaciones</span>
                    </Link>
                </li>
                <li className="menuItem">
                    <Link to="/agenda">
                        <RiCalendarScheduleFill className="menuIcon" />
                        <span>Agenda</span>
                    </Link>
                </li>
                <li className="menuItem">
                    <Link to="/mantenimientoUsuario">
                        <FaUserCog className="menuIcon" />
                        <span>Mantenimiento Usuario</span>
                    </Link>
                </li>
                <li className="menuItem">
                    <Link to="/login">
                        <IoLogOut className="menuIcon" />
                        <span>Cerrar Sesión</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default MenuTSE;