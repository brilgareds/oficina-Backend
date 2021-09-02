import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { files } from '../../environments/environments';
import './bienestar.css';

export const Bienestar = () => {

    useEffect(() => {
        document.getElementById('root').className = 'bienestar';
    }, []);


    return (
        <>
            <div className="col-md-12 cabeceraRRhh paddingRRHH">
                <h3 className="tituloBienvenidoRrhh">
                    Bienvenido a 
                    <img className="logoVumBienvenido" src="/assets/img/icono-vum-office-home.svg" alt="icono-vum-office-home" />
                </h3>
            </div>

            <div className="col-md-12 paddingRRHH divTitulosRRHH">
                <h3 className="tituloModulo">Bienestar</h3>
                <span className="spanNameUserRRHH">Gabriel Enrique Angarita Rengifo</span>
                <p className="copyPage mt-4">
                    Como nuestro trabajador entendemos que tienes objetivos que alcanzar,<br/>
                    aquí te damos las herramientas para que los consigas.
                </p>
            </div>

            <div className="col-md-12 paddingRRHH text-left mb-3">
                <Link to={{ pathname: files.novedadesEmpresariales.url }} target="_blank" >
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <i className="fas fa-user-tie imgbtnRrhh" alt="icono-novedades-empresariales"></i>
                        Novedades empresariales
                    </button>
                </Link>
                <Link to={{ pathname: '' }} data-bs-toggle="modal" data-bs-target='#modalImagenRedireccion' img-url='img/otros_beneficios.jpg' img-redireccion="https://www.losolivos.co/">
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <i className="fas fa-handshake imgbtnRrhh" alt="icono-aliados"></i>
                        Aliados
                    </button> <br />
                </Link>
                <Link to={{ pathname: 'mi_billetera' }}>
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <i className="fas fa-wallet imgbtnRrhh" alt="icono-mi-billetera" />
                        Mi billetera
                    </button>
                </Link>
                <Link to={{ pathname: 'https://listos.cmymasesores.com.co/course/29/about' }} target="_blank">
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <i className="fas fa-comments imgbtnRrhh" alt="icono-onboarding" />
                        Onboarding
                    </button>
                </Link>
            </div>
        </>

    )
}
