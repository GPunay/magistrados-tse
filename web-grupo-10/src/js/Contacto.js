import React from 'react';
import '../css/contacto.css';
import { RiContactsBook3Fill } from "react-icons/ri";
import { BsSendFill } from "react-icons/bs";
import { FaFacebookSquare, FaYoutube, FaEnvelope, FaInstagram   } from "react-icons/fa";
import {  FaSquareXTwitter, FaPhone  } from "react-icons/fa6";

function Contacto() {
    return (
        <div className="mainContacto">
            <div className="contactoInfo">
                <div className="contacto">
                    <h1 className="contactoTitulo">Contacto</h1>
                    <div className='iconContacto'>
                        <RiContactsBook3Fill className="iconoContacto" />
                    </div>
                </div>
                
                <div className='cuadroContacto'>
                    <form className="formularioContacto">
                        <label className="formularioContactoPrincipal">Contáctenos</label>
                        <br />
                        <label className='labelNombre'>Nombre: </label>
                        <br />
                        <input className="inputNombre" placeholder='Ingrese su nombre completo' size="50"></input>
                        <br />
                        <label className="labelCorreo">Correo: </label>
                        <br />
                        <input className="inputCorreo" placeholder='Ingrese su correo' size="50"></input>
                        <br />
                        <label className="labelMensaje">Mensaje: </label>
                        <br />
                        <textarea className="inputMensaje" placeholder='Ingrese su mensaje' size="50" cols="50" rows="10"></textarea>
                        <br />
                        <button className="botonEnviar">Enviar <BsSendFill className='iconoEnviar'/></button>
                    </form>
                </div>
            </div>

            <div className="infoTSE">
                <div className="redesSociales">
                    <a href="https://www.facebook.com/tseguatemala/?locale=es_LA" alt="Facebook Tribunal Supremo Electoral" className="enlace"><p className="facebookTSE"><FaFacebookSquare className="iconoFacebook" /> TSE Guatemala</p></a><br />
                    <a href="https://www.youtube.com/channel/UCPhs4gOsbpzbNOEa1ml85dg" alt="Youtube Tribunal Supremo Electoral" className="enlace"><p className="youtubeTSE"><FaYoutube className="iconoYoutube" /> TSE Guatemala</p></a><br />
                    <a href="https://www.instagram.com/tse_guatemala/?hl=es" alt="Instagram Tribunal Supremo Electoral" className="enlace"><p className="instagramTSE"><FaInstagram className="iconoInstagram" /> @tseguatemala</p></a><br />
                    <a href="https://x.com/TSEGuatemala?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" alt="Twitter Tribunal Supremo Electoral" className="enlace"><p className="xTSE"><FaSquareXTwitter className="iconoX" /> TSE Guatemala</p></a><br />
                    <p className="telefonoTSE"><FaPhone className="iconoTelefono" />+502 2236-5000</p><br /><br />
                    <p className="correoTSE"><FaEnvelope className="iconoCorreo" />unidaddeinformacion@tse.org.gt</p><br />
                </div>

                <div className="mapaUbicacion">
                    <h2 className="tituloMapa">Ubicación del TSE</h2>
                    <iframe
                        title="Ubicación del TSE Guatemala"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.1314453079567!2d-90.5152888241326!3d14.648478975901087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a20e69841665%3A0x5aa4e080f2a18b81!2sTribunal%20Supremo%20Electoral!5e0!3m2!1ses-419!2sgt!4v1746678132122!5m2!1ses-419!2sgt"
                        width="900"
                        height="450"
                        style={{ border: 0, borderRadius: "10px", marginTop: "2rem" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            
        </div>
    );
}

export default Contacto;