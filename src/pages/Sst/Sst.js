import React from 'react';
import Footer from '../../components/shared/footer/Footer';
import Header from '../../components/shared/header/Header';
import './sst.css';

export const Sst = () => {

    return (
        <main className="main sst" id="top">
            <div className="paddingContainer" data-layout="container">

                <nav className="navbar navbar-light navbar-vertical navbar-expand-xl navbarMobile">

                    <div className="d-flex align-items-center" style={{ paddingLeft: "5%" }}>
                        <div className="toggle-icon-wrapper">
                            <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Menú"><span className="navbar-toggle-icon"><span className="toggle-line"></span></span></button>
                        </div>
                        <a className="navbar-brand" href="index.html">
                            <div className="d-flex align-items-center py-3">
                                <img className="me-2" src="./../assets/img/logo-vum-login.svg" alt="" width="80" />
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
                                    <img className="iconoCerrarSesion" src="./../assets/img/icono-cerrar-sesion.svg" alt="icono-cerrar-sesion" />
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
                    <h1>SST</h1>
                    <Footer />
                </div>
            </div>
        </main>
    )
}
