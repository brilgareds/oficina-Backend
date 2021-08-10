import React from 'react'
import Header from '../../components/shared/header/Header';
import Footer from '../../components/shared/footer/Footer';
import './rrhh.css';
import { environment } from '../../environments/environments.ts';

export const Rrhh = () => {
    
    return (
        <main className="main rrhh" id="top">
            <div className="paddingContainer" data-layout="container">

                <nav className="navbar navbar-light navbar-vertical navbar-expand-xl navbarMobile">

                    <div className="d-flex align-items-center" style={{ paddingLeft: "5%" }}>
                        <div className="toggle-icon-wrapper">
                            <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Menú"><span className="navbar-toggle-icon"><span className="toggle-line"></span></span></button>
                        </div>
                        <a className="navbar-brand" href="index.html">
                            <div className="d-flex align-items-center py-3">
                                <img className="me-2" src="./assets/img/logo-vum-login.svg" alt="" width="80" />
                            </div>
                        </a>
                    </div>

                    <div className="sombraNavbarInhabilitada collapse navbar-collapse" id="navbarVerticalCollapse">
                        <div className="navbar-vertical-content scrollbar navbarPadding mb-2">

                            <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav" style={{ padding: "13px", paddingTop: "0px" }}>
                            </ul>

                        </div>
                        <div className="divCerrarSesion text-center">
                            <div className="row">
                                <div className="col-md-12">
                                    <img className="iconoCerrarSesion" src="./assets/img/icono-cerrar-sesion.svg" alt="icono-cerrar-sesion" />
                                </div>
                                <div className="col-md-12">
                                    <span className="spanCerrarSesion nav-link-text">Cerrar Sesion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="content">

                    <Header />

                    <div className="row p-2" id="root">


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
                            <button className=" btns-rrhh zoomBtn mb-3" type="submit" name="submit">
                                <img className="imgbtnRrhh" src="./assets/img/rrhh/icono-estamos-para-ti.svg" alt="icono-estamos-para-ti" />
                                Estamos para ti
                            </button>
                            <button className=" btns-rrhh zoomBtn mb-4" type="submit" name="submit">
                                <img className="imgbtnRrhh" src="./assets/img/rrhh/icono-talk-to-you.svg" alt="icono-estamos-para-ti" />
                                Talk to us
                            </button> <br/>
                            <button className=" btns-rrhh zoomBtn mb-3" type="submit" name="submit">
                                <img className="imgbtnRrhh" src="./assets/img/rrhh/icono-solitidues-RRHH.svg" alt="icono-estamos-para-ti" />
                                Solicitudes de RRHH
                            </button>
                        </div>

                        <div className="col-md-12 paddingRRHH text-left mb-3">
                        </div>


                    </div>

                    <Footer />
                </div>
            </div>
        </main>
    )
}
