import React, { useEffect } from 'react';
import './rrhh.css';
import { Link } from 'react-router-dom';
import { routes } from '../../environments/environments.ts';

export const Rrhh = () => {

    useEffect(() => {
        document.getElementById('root').className = 'rrhh';
    }, [])


    return (

        <>
            <div className="col-md-12 cabeceraRRhh paddingRRHH">
                <h3 className="tituloBienvenidoRrhh">
                    Bienvenido a
                    <img className="logoVumBienvenido" src="./assets/img/icono-vum-office-home.svg" alt="icono-vum-office-home" />
                </h3>
            </div>

            <div className="col-md-12 paddingRRHH divTitulosRRHH">
                <h3 className="tituloModulo">RRHH</h3>
                <span className="spanNameUserRRHH">Jose Carlos Avila Perea</span>
                <p className="copyPage mt-4">Aquí encontraras acompañamiento en lo que necesites para tu bienestar integral como ser humano.</p>
            </div>

            <div className="col-md-12 paddingRRHH text-left mb-3">
                <Link to={{ pathname: routes.rrhh.subPages.formRrhh.url, params: { typeForm: "estamosParaTi" } }}>
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <img className="imgbtnRrhh" src="./assets/img/rrhh/icono-estamos-para-ti.svg" alt="icono-estamos-para-ti" />
                        Estamos para ti
                    </button>
                </Link>
                <Link to={{ pathname: routes.rrhh.subPages.formRrhh.url, params: { typeForm: "talkToUs" } }}>
                    <button className=" btns-rrhh zoomBtn mb-4" type="button">
                        <img className="imgbtnRrhh" src="./assets/img/rrhh/icono-talk-to-you.svg" alt="icono-estamos-para-ti" />
                        Talk to us
                    </button> <br />
                </Link>
                <Link to={{ pathname: routes.rrhh.subPages.formRrhh.url, params: { typeForm: "SolicitudesRRHH" } }}>
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <img className="imgbtnRrhh" src="./assets/img/rrhh/icono-solitidues-RRHH.svg" alt="icono-estamos-para-ti" />
                        Solicitudes de RRHH
                    </button>
                </Link>
            </div>

            
        </>

    )
}
