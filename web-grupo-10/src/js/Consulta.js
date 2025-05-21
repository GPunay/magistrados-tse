import React from 'react';
import '../css/consulta.css';
import { LuMessageCircleQuestion } from "react-icons/lu";

function Consulta() {
    return (
        <div className='mainConsulta'>
            <div className="consulta">
                <h1 className="consultaTitulo">Consultas Frecuentes</h1>
                <div className="iconConsulta">
                    <LuMessageCircleQuestion className='iconoConsulta'/>
                </div>
            </div>

            <div className='cuadroConsulta'>
                <p className="consultaParrafos">
                    1. ¿Cuándo se realizan las próximas elecciones generales en Guatemala?
                </p>
                <p className="consultaParrafos">
                    Las elecciones generales se celebran cada 4 años. Las fechas específicas son definidas
                    por el TSE y se publican oficialmente con anticipación en el sitio web y 
                    medios oficiales.
                </p>
                <p className="consultaParrafos">
                    2. ¿Cómo sé si estoy empadronado para votar?
                </p>
                <p className="consultaParrafos">
                    Puedes obtener tu estado de empadronamiento ingresando tu número de DPI en la sección 
                    "Consulta de Empadronamiento" en nuestro siti web <a className="consultaLink" href="https://tse.org.gt/" alt="Tribunal Supremo Electoral">wwww.tse.org.gt</a> o visitando nuestras
                    oficinas.
                </p>
                <p className="consultaParrafos">
                    3. ¿Dónde puedo consultar mi centro de votación?
                </p>
                <p className="consultaParrafos">
                    Puedes verificar tu centro de votación en la línea ingresando tu número de DPI en el sistema 
                    de consulta del TSE, disponible en el sitio web semanas antes de las elecciones.
                </p>
                <p className="consultaParrafos">
                    4. ¿Qué documentos necesito para votar?
                </p>
                <p className="consultaParrafos">
                    Solo necesitas presentar tu Documento Personal de Identificación (DPI) vigente en tu centro 
                    de votación asignado.
                </p>
                <p className="consultaParrafos">
                    5. ¿Puedo votar si cambié de domicilio recientemente?
                </p>
                <p className="consultaParrafos">
                    Si, pero debes actualizar los datos en el padrón electoral antes del cierre de empadronamiento. 
                    De lo contrario, votarás en el centro de votación registrado previamente.
                </p>
            </div>
        </div>
    );
}

export default Consulta;