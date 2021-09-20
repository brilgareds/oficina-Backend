import React, { useEffect } from 'react';
import './ayuda.css';
import { Link } from 'react-router-dom';
import { routes } from '../../environments/environments.ts';

export const Ayuda = () => {

    useEffect(() => {
        document.getElementById('root').className = 'ayuda';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (

        <>
            <div className="col-md-12 cabeceraAyuda paddingAyuda">
                <h1 className="tituloBienvenidoAyuda">
                    Bienvenido a
                    <img className="logoVumBienvenido" src="./assets/img/icono-vum-office-home.png" alt="icono-vum-office-home" />
                </h1>
            </div>

            <div className="col-md-12 paddingAyuda divTitulosAyuda">
                <h4 className="tituloModuloAyuda">PÁGINA DE AYUDA</h4>
                <p className="copyPageAyuda mt-4">Aquí encontrarás diferentes formularios para diligenciar tus PQRS</p>
            </div>

            <div className="col-md-12 paddingAyuda text-center mb-2">
                <Link to={{ pathname: routes.ayuda.subPages.formAyuda.url, params: { typeForm: "felicitaciones" } }}>
                    <button className=" btns-ayuda zoomBtn mb-3" type="button">
                        <i className="far fa-thumbs-up imgbtnAyuda"></i>
                        ¡Felicitaciones!
                    </button>
                </Link>
                <Link to={{ pathname: routes.ayuda.subPages.formAyuda.url, params: { typeForm: "solicitud" } }}>
                    <button className=" btns-ayuda zoomBtn mb-3" type="button">
                        <i className="fas fa-envelope imgbtnAyuda"></i>
                        Solicitud
                    </button>
                </Link>
                <Link to={{ pathname: routes.ayuda.subPages.formAyuda.url, params: { typeForm: "queja" } }}>
                    <button className=" btns-ayuda zoomBtn mb-3" type="button">
                        <i className="fas fa-exclamation imgbtnAyuda"></i>
                        Queja
                    </button>
                </Link>
            </div>


        </>

    )
}
