// ComponenteBase.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ComponenteFooter from './js/ComponenteFooter';
import ComponenteHeader from './js/ComponenteHeader';
import Inicio from './js/Inicio';
import Mision from './js/Mision';
import Vision from './js/Vision';
import Organizacion from './js/Organizacion';
import Consulta from './js/Consulta';
import Contacto from './js/Contacto';
import Login from './js/Login';
import SistemaTSE from './js/sistemaTSE';
import Corporacion from './js/Corporacion';
import CitasInvitaciones from './js/CitasInvitaciones';
import Agenda from './js/Agenda';
import MantenimientoUsuario from './js/MantenimientoUsuario';
import MenuTSE from './js/MenuTSE';
import AgregarUsuario from './js/AgregarUsuario';
import ActualizarUsuario from './js/ActualizarUsuario';
import EliminarUsuario from './js/EliminarUsuario';
import ReporteUsuario from './js/ReporteUsuario';
import SubMenuUsuarios from './js/SubMenuUsuarios';

// Wrapper funcional para usar hooks dentro de clase
function ComponenteBaseWrapper() {
    const location = useLocation();
    
    // Definir rutas que no deben incluir el Header ni el Footer
    const rutasExcluidas = ['/login', '/sistemaTSE', '/corporacion', '/citasInvitaciones', '/agenda', '/mantenimientoUsuario', '/subMenuUsuarios', '/agregarUsuario', '/actualizarUsuario', '/eliminarUsuario', '/reporteUsuario'];
    // Definir rutas que no deben incluir el menú TSE
    const rutasExcluidasMenuTSE = ['/inicio', '/mision', '/vision', '/organizacion', '/consultas', '/contacto', '/login']

    const excluirHeaderFooter = rutasExcluidas.includes(location.pathname)
    const excluirMenuTSE = rutasExcluidasMenuTSE.includes(location.pathname);

    return (
        <>
            {!excluirMenuTSE && <MenuTSE />}
            {!excluirHeaderFooter && <ComponenteHeader />}
            <Routes>
                <Route path="/" element={<Navigate to="/inicio" replace />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/mision" element={<Mision />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/organizacion" element={<Organizacion />} />
                <Route path="/consultas" element={<Consulta />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sistemaTSE" element={<SistemaTSE />} />
                <Route path="/corporacion" element={<Corporacion />} />
                <Route path="/citasInvitaciones" element={<CitasInvitaciones />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/mantenimientoUsuario" element={<MantenimientoUsuario />} />
                <Route path="/agregarUsuario" element={<AgregarUsuario />} />
                <Route path="/actualizarUsuario" element={<ActualizarUsuario />} />
                <Route path="/eliminarUsuario" element={<EliminarUsuario />} />
                <Route path="/reporteUsuario" element={<ReporteUsuario />} />
                <Route path="/subMenuUsuarios" element={<SubMenuUsuarios />} />
            </Routes>
            {!excluirHeaderFooter && <ComponenteFooter />}
        </>
    );
}

// Envolver en Router
export class ComponenteBase extends Component {
    render() {
        return (
            <Router>
                <ComponenteBaseWrapper />
            </Router>
        );
    }
}

export default ComponenteBase;
