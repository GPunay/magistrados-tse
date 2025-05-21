import React from 'react';
import { FaBullseye } from "react-icons/fa6";
import '../css/mision.css';

function Mision() {
    return (
        <div className="MainMision">
            
            <div className="MisionColumna">
            
                <h1 className='MisionTitulo'>Misión</h1>
            
                <div className='IconoMision'>
                    <FaBullseye className="IconMision"/>
                </div>
            
            </div>
            
            <div className="MisionDescripcion">
                <p className="MisionParrafo">
                    "Somos la máxima autoridad en materia electoral, independiente, no supeditada a organismo 
                    alguno del Estado, que promueve el ejercicio de la ciudadanía plena, igualitaria e inclusiva 
                    y la participación de las organizaciones políticas, para garantizar el derecho de elegir y ser 
                    electo, así como facilita el óptimo funcionamiento de los órganos electorales temporales, con 
                    el fin de alcanzar la consolidación de la democracia".
                </p>
            </div>
        </div>
    );
}

export default Mision;