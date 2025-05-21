import Carousel from 'react-bootstrap/Carousel';

function Carrusel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="carrusel" src="/img/planificaciones-elecciones.png" alt="Planificación de elecciones" />
        <Carousel.Caption className="carousel-caption">
          <div className="texto-en-cuadro">
            <p>TSE presenta su planificación para las Elecciones Generales de 2027 ante la Comisión de Asuntos Electorales del Congreso de la República</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="carrusel" src="/img/tribunal-supremo-electoral.png" alt="Tribunal Supremo Electoral" />
        <Carousel.Caption className="carousel-caption">
          <div className="texto-en-cuadro">
            <p>Hacia las Elecciones de 2027: Mesas de Trabajo entre el Tribunal Supremo Electoral y partidos políticos</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="carrusel" src="/img/tse-proceso-electoral.png" alt="TSE Proceso Electoral" />
        <Carousel.Caption className="carousel-caption">
          <div className="texto-en-cuadro">
            <p>TSE inicia mesas de trabajo con partidos políticos para la preparación del proceso electoral 2027</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;