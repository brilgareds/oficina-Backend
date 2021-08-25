import React from 'react';
import './ayuda.css';
import { Link } from 'react-router-dom';
import { routes } from '../../environments/environments.ts';
import { getFullNameUser } from '../../generalHelpers';

export const Ayuda = () => {
    return (

        <>
            <div className="col-md-12 cabeceraAyuda paddingAyuda">
                <h3 className="tituloBienvenidoRrhh">
                    Bienvenido a
                    <img className="logoVumBienvenido" src="./assets/img/icono-vum-office-home.svg" alt="icono-vum-office-home" />
                </h3>
            </div>

            <div className="col-md-12 paddingAyuda divTitulosAyuda">
                <h3 className="tituloModulo">AYUDA</h3>
                <span className="spanNameUserAyuda">{getFullNameUser()}</span>
                <p className="copyPage mt-4">¿Como podemos ayudarte?</p>
            </div>

            <div className="col-md-12 paddingAyuda text-left mb-3">
                <Link to={{ pathname: routes.ayuda.subPages.formAyuda.url, params: { typeForm: "felicitaciones" } }}>
                    <button className=" btns-ayuda zoomBtn mb-3" type="button">
                        <i class="far fa-thumbs-up imgbtnRrhh"></i>
                        ¡Felicitaciones!
                    </button>
                </Link>
                <Link to={{ pathname: routes.ayuda.subPages.formAyuda.url, params: { typeForm: "solicitud" } }}>
                    <button className=" btns-ayuda zoomBtn mb-4" type="button">
                        <i class="fas fa-envelope imgbtnRrhh"></i>
                        Solicitud
                    </button> <br />
                </Link>
                <Link to={{ pathname: routes.ayuda.subPages.formAyuda.url, params: { typeForm: "queja" } }}>
                    <button className=" btns-ayuda zoomBtn mb-3" type="button">
                        <i class="fas fa-exclamation imgbtnRrhh"></i>
                        Queja
                    </button>
                </Link>
            </div>

            
        </>

    )
}
