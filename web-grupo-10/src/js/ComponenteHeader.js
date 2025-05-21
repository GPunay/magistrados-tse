import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faArrowTrendUp, faBullseye, faSitemap, faQuestion, faAddressBook, faCircleUser } from '@fortawesome/free-solid-svg-icons';

const IconWithText = ({ icon, text, to }) => (
    <div style={{ textAlign: 'center', margin: '2%' }} className='link'>
        <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <FontAwesomeIcon icon={icon} size="2x" />
            <p>{text}</p>
        </Link>
    </div>
);

function ComponenteHeader() {
    return (
        <div className="App">
            <nav className="menu">
                <ul className="menu">
                    <Link className='enlaceInicio' to="/"><img className="logo" src="/img/tse.png" alt="Tribunal Supremo Electoral Logo" /></Link>
                    <IconWithText icon={faHouse} text="Inicio" to="/inicio" />
                    <IconWithText icon={faArrowTrendUp} text="Visión" to="/vision" />
                    <IconWithText icon={faBullseye} text="Misión" to="/mision" />
                    <IconWithText icon={faSitemap} text="Organización" to="/organizacion" />
                    <IconWithText icon={faQuestion} text="Consultas" to="/consultas" />
                    <IconWithText icon={faAddressBook} text="Contáctenos" to="/contacto" />
                    <IconWithText icon={faCircleUser} text="Ingresar" to="/login" />
                </ul>
            </nav>
        </div>
    );
}

export default ComponenteHeader;