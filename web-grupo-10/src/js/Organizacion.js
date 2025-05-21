import React from 'react';
import '../css/organizacion.css';

function Organizacion() {
    return (
        <div className="mainOrganizacion">
            
            <div className="organigramaPresentacion">
                <img className="organigrama" src="/img/organigrama-magistrados.png" alt="Organigrama del Departamento de Magistrados del Tribunal Supremo Electoral"/>
            </div>
            
            <div className="integrantes">
                <h1 className="integrantesTitulos">Estructura Organizacional del Departamento de Magistrados</h1>
                <h2 className="integrantesSubtitulos">Pleno de Magistrados</h2>
                <p className="integrantesParrafos">
                    El TSE es la máxima autoridad en materia electoral en Guatemala y se integra por cinco Magistrados Titulares y cinco Magistrados Suplentes, electos por 
                    el Congreso de la República para un período de seis años. Los Magistrados Titulares conforman el Pleno de Magistrados, que es la máxima autoridad dentro del TSE.
                </p>
                <h2 className="integrantesSubtitulos">Presidencia del TSE</h2>
                <p className="integrantesParrafos">
                    La Presidencia del TSE es desempeñada por los Magistrados Titulares de forma rotativa, comenzando por el de mayor edad y siguiendo en orden descendente. 
                    El Presidente tiene funciones administrativas y de representación legal del Tribunal.
                </p>
                <br />
                <h1 className="integrantesTitulos">Funciones del Pleno de Magistrados</h1>
                <ul>
                    <li>Velar por el cumplimiento de la Constitución y leyes electorales.</li>
                    <li>Convocar y organizar procesos electorales.</li>
                    <li>Declarar resultados y validez de elecciones.</li>
                    <li>Resolver sobre inscripción, sanciones y cancelación de organizaciones políticas.</li>
                    <li>Nombrar y remover miembros de Juntas Electorales.</li>
                    <li>Investigar y resolver asuntos de su competencia.</li>
                    <li>Elaborar y ejecutar su presupuesto anual.</li>
                    <li>Publicar la memoria del proceso electoral y sus resultados.</li>
                    <li>Diseñar y ejecutar programas de formación y capacitación cívico-electoral. </li>
                </ul>
                <br />
                <h1 className="integrantesTitulos">Dependencias Clave y Funciones</h1>
                <h2 className="integrantesSubtitulos">Secretaría General</h2>
                <p className="integrantesParrafos">
                    Brinda apoyo administrativo al Pleno de Magistrados y a la Presidencia. Es el enlace entre el TSE y organizaciones políticas, ciudadanos y entidades nacionales e internacionales. 
                    Elabora resoluciones y acuerdos, asiste a sesiones del Tribunal y es responsable de los sellos de seguridad.
                </p>
                <h2 className="integrantesSubtitulos">Unidad Especializada sobre Medios de Comunicación y Estudios de Opinión</h2>
                <p className="integrantesParrafos">
                    Encargada de coordinar la relación técnica del TSE con medios de comunicación y organizaciones políticas. Supervisa la distribución igualitaria de recursos públicos en medios durante 
                    el tiempo electoral y monitorea el cumplimiento de publicaciones de estudios de opinión
                </p>
                <h2 className="integrantesSubtitulos">Unidad Especializada sobre Medios de Comunicación y Estudios de Opinión</h2>
                <p className="integrantesParrafos">
                    Gestiona la cooperación técnica y financiera nacional e internacional. Mantiene relaciones con organismos electorales regionales y busca recursos que complementen las disponibilidades 
                    del TSE para la ejecución de programas y proyectos.
                </p>
                <h2 className="integrantesSubtitulos">Gerencia Administrativa y Financiera</h2>
                <p className="integrantesParrafos">
                Coordina y supervisa los procesos administrativos y financieros del TSE. Es responsable de la planificación, organización y control de actividades relacionadas con la gestión administrativa 
                y financiera, incluyendo la elaboración y ejecución del presupuesto.
                </p>
                <br />
                <h2 className="integrantesSubtitulos">Magistrados Titulares</h2>
                <ul className="integrantesListas">
                    <li className="integrantesMagistrados"><img className="integranteMagistrado" src="/img/dra-blanca.png" alt="Dra. Blanca Odilia Alfaro Guerra" /> Dra. Blanca Odilia Alfaro Guerra</li>
                    <li className="integrantesMagistrados"><img className="integranteMagistrado" src="/img/dr-ranulfo.png" alt="Dr. Ranulfo Rafael Rojas Cetina" /> Dr. Ranulfo Rafael Rojas Cetina</li>
                    <li className="integrantesMagistrados"><img className='integranteMagistrado' src='/img/dra-irma.jpg' alt='Dra. Irma Elizabeth Palencia Orellana'/> Dra. Irma Elizabeth Palencia Orellana</li>
                    <li className="integrantesMagistrados"><img className="integranteMagistrado" src="/img/msc-gabriel.png" alt="MSc. Gabriel Vladimir Aguilera Bolaños" /> MSc. Gabriel Vladimir Aguilera Bolaños</li>
                    <li className="integrantesMagistrados"><img className="integranteMagistrado" src="/img/msc-mynor.png" alt="MSc. Mynor Custodio Franco Flores" /> MSc. Mynor Custodio Franco Flores</li>
                </ul>
                <br />
                <h2 className="integrantesSubtitulos">Magistrados Suplentes</h2>
                <ul className="integrantesListas">
                    <li className="integrantesMagistrados"><img className="integranteMagistrado" src="/img/lic-marco.png" alt="Lic. Marco Antonio Cornejo Marroquín" /> Lic. Marco Antonio Cornejo Marroquín</li>
                    <li className="integrantesMagistrados"><img className="integranteMagistrado" src="/img/lic-marlon.png" alt="Lic. Marlon Josué Barahona Catalán" /> Lic. Marlon Josué Barahona Catalán</li>
                    <li className="integrantesMagistrados"><img className="alvaro" src="/img/lic-alvaro.png" alt="Lic. Álvaro Ricardo Cordón Paredes" /> Lic. Álvaro Ricardo Cordón Paredes</li>
                    <li className="integrantesMagistrados"><img className="pablo" src="/img/dr-pablo.png " alt="Dr. Pablo Adolfo Leal Oliva"/> Dr. Pablo Adolfo Leal Oliva</li>
                    <li className="integrantesMagistrados"><img className="integranteMagistrado" src="/img/lic-noe.png" alt="Lic. Noé Adalberto Ventura Loyo" /> Lic. Noé Adalberto Ventura Loyo</li>
                </ul>
            </div>
        </div>
    );
}

export default Organizacion;