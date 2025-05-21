import React from 'react'

function ComponenteFooter() {
    return (
        <div className="footer">
            <footer className="App-footer">
                <div className="fila_logos">
                    <a className="EnlaceLogos" href="https://cc.gob.gt/" alt="Corte Suprema de Constitucionalidad"><img className="fila_logo" src="/img/ccc-logo.png" alt="Logo de la Corte Suprema de Constitucionalidad" /></a>
                    <a className="EnlaceLogos" href="https://www.congreso.gob.gt/" alt="Congreso de la República"><img className="fila_logo" src="/img/congreso_logo.png" alt="Logo del Congreso de la República" /></a>
                    <a className="EnlaceLogos" href="https://www.mp.gob.gt/" alt="Ministerio Público"><img className="fila_logo" src="/img/mp_logo.png" alt="Logo del Ministerio Público" /></a>
                    <a className="EnlaceLogos" href="https://www.pdh.org.gt/" alt="Procurador de los Derechos Humanos"><img className="fila_logo" src="/img/pdh-logo.png" alt="Logo Procurador de los Derechos Humanos" /></a>
                </div>
                <p className='footer-text'>Tribunal Supremo Electoral, 6a. Avenida 0-32 Z.2, Centro Histórico, Ciudad de Guatemala</p>
            </footer>
        </div>
    );
}

export default ComponenteFooter;