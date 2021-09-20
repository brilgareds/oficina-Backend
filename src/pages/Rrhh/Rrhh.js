import React, { useEffect } from 'react';
import './rrhh.css';
import { Link } from 'react-router-dom';
import { routes } from '../../environments/environments.ts';
import { getFullNameUser } from '../../generalHelpers';

export const Rrhh = () => {

    useEffect(() => {
        document.getElementById('root').className = 'rrhh';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])


    return (

        <>
            <div className="col-md-12 cabeceraRRhh paddingRRHH">
                <h3 className="tituloBienvenidoRrhh">
                    Bienvenido a
                    <img className="logoVumBienvenido" src="/assets/img/icono-vum-office-home.png" alt="icono-vum-office-home" />
                </h3>
            </div>

            <div className="col-md-12 paddingRRHH divTitulosRRHH">
                <h3 className="tituloModulo">RRHH</h3>
                <span className="spanNameUserRRHH">{getFullNameUser()}</span>
                <p className="copyPage mt-4">Aquí encontrarás acompañamiento en lo que necesites para tu bienestar integral como ser humano.</p>
            </div>

            <div className="col-md-12 paddingRRHH text-left mb-3">
                <Link to={{ pathname: routes.rrhh.subPages.formRrhh.url, params: { typeForm: "estamosParaTi" } }}>
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        {/* <img className="imgbtnRrhh" src="/assets/img/rrhh/icono-estamos-para-ti.svg" alt="icono-estamos-para-ti" /> */}
                        <i className="bi bi-bookmark-heart"></i> &nbsp;&nbsp;
                        Estamos para ti
                    </button>
                </Link>
                <Link to={{ pathname: routes.rrhh.subPages.formRrhh.url, params: { typeForm: "talkToUs" } }}>
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        {/* <img className="imgbtnRrhh" src="/assets/img/rrhh/icono-talk-to-you.svg" alt="icono-estamos-para-ti" /> */}
                        <i className="bi bi-chat-left-text"></i> &nbsp;&nbsp;
                        Talk to us
                    </button> <br />
                </Link>
                <Link to={{ pathname: routes.rrhh.subPages.formRrhh.url, params: { typeForm: "SolicitudesRRHH" } }}>
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        {/* <img className="imgbtnRrhh" src="/assets/img/rrhh/icono-solitidues-RRHH.svg" alt="icono-estamos-para-ti" /> */}
                        <i className="bi bi-file-text"></i> &nbsp;&nbsp;
                        Solicitudes de RRHH
                    </button>
                </Link>
            </div>

            
        </>

    )
}
