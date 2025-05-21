import React from 'react';
import { FaArrowTrendUp } from "react-icons/fa6";
import '../css/vision.css';
function Vision() {
    return (
        <div className="mainVision">

            <div className="VisionColumna">

                <h1 className='VisionTitulo'>Visión</h1>

                <div className='iconVision'>
                    <FaArrowTrendUp className="iconoVision"/>
                </div>

            </div>

            <div className="VisionDescripcion">
                <p className="VisionParrafo">
                    "Ser la institución rectora, de rango constitucional, que oriente, fomente e incremente la participación ciudadana en el voto responsable
                    y consciente; que fotalezca la evolución y el desarrollo del sistema democrático, el respeto pleno y grantía de la voluntad popular en
                    los procesos electorales, transparentes e incluyentes, manteniendo la confianza ciudadana en la justicia electoral permanente".
                </p>
            </div>
        </div>
    );
}

export default Vision;