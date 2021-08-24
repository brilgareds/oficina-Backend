import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../environments/environments';
import './sst.css';

export const Sst = () => {

    return (
        <>
            <div className="col-md-12 cabeceraRRhh paddingRRHH">
                <h3 className="tituloBienvenidoRrhh">
                    Bienvenido a 
                    <img className="logoVumBienvenido" src="./assets/img/icono-vum-office-home.svg" alt="icono-vum-office-home" />
                </h3>
            </div>

            <div className="col-md-12 paddingRRHH divTitulosRRHH">
                <h3 className="tituloModulo">SST</h3>
                <span className="spanNameUserRRHH">Gabriel Enrique Angarita Rengifo</span>
                <p className="copyPage mt-4">
                    La seguridad y salud en el trabajo son de vital importancia para nosotros!<br/>
                    Ingresa y llena los reportes COVID.
                </p>
            </div>

            <div className="col-md-12 paddingRRHH text-left mb-3">
                <Link to={{ pathname: '' }}>
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <span style={{ marginRight: '0.5rem', fontSize: '1.4rem' }}><i className="fas fa-viruses"></i></span>
                        Reportes caso Covid
                    </button>
                </Link>

                <Link to={{ pathname: routes.encuestaRiesgoCovid.url }}>
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <span style={{ marginRight: '0.5rem', fontSize: '1.4rem' }}><i className="fas fa-shield-virus"></i></span>
                        Encuesta riesgo Covid
                    </button>
                    <br/>
                </Link>

                <Link to={{ pathname: '' }}>
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <span style={{ marginRight: '0.5rem', fontSize: '1.4rem' }}><i className="fas fa-head-side-mask"></i></span>
                        Cerco epidemeologico
                    </button>
                </Link>
            </div>
        </>
    )
}
