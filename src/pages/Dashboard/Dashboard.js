import React, { useState, useEffect } from 'react';
import { MenuSecundario } from '../../components/MenuSecundario/MenuSecundario';
import { MenuPrincipal } from '../../components/MenuPrincipal/MenuPrincipal';
import './estilos-vum-office.css';
import './dashboard.css';
import Footer from '../../components/shared/footer/Footer';
import { CardsOficina } from '../../components/cards-oficina/CardsOficina';

export const Dashboard = () => {

    const [menu, setMenu] = useState([]);
    let elementModalRedireccion = document.querySelector('#modalImagenRedireccion');
    let elementModalUrlRedireccion = document.querySelector('#modalUrlImagenRedireccion');
    let elementModalImgImagenRedireccion = document.querySelector('#modalImgImagenRedireccion');

    useEffect(() => {

        const getMenu = () => {

            fetch('http://localhost:3001/api/v1/navigator/')
                .then(data => data.json())
                .then(data => { setMenu(data) }, err => { console.log('Error is: ', err); setMenu([]) });

        };

        getMenu();
    }, []);


    const abriendoModalRedireccion = (e) => {

        const button = e.relatedTarget;
        const imgUrl = button.getAttribute('img-url');
        const urlRedireccion = button.getAttribute('img-redireccion');
        const target = (urlRedireccion && urlRedireccion !== '#') ? '_blank' : '_self';

        elementModalImgImagenRedireccion.src = (imgUrl) ? `./assets/${imgUrl}` : '';
        elementModalUrlRedireccion.href = urlRedireccion;
        elementModalUrlRedireccion.target = target;
        elementModalUrlRedireccion.addEventListener('click', test);
    };


    elementModalRedireccion.addEventListener('show.bs.modal', abriendoModalRedireccion);



    return (
        <main className="main dashboard" id="top">
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
                            <MenuPrincipal menu={menu[0]} k={'menu_1'} key={'menu_1'} />
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

                    <nav id="header" className="navbar navbar-light navbar-glass navbar-top navbar-expand headerMobile mb-2">
                        <button className="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span className="navbar-toggle-icon"><span className="toggle-line"></span></span></button>
                        <a className="navbar-brand me-1 me-sm-3" href="./#">
                            <div className="d-flex align-items-center">
                                <img className="me-2" src="./assets/img/logo-vum-login.svg" alt="" width="90" />
                            </div>
                        </a>
                        <ul className="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
                            <li className="nav-item dropdown">
                                <a className="nav-link pe-0" id="navbarDropdownUser" href="./#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <div className="avatar avatar-xl avatarIcon">
                                        <i className="fas fa-user rounded-circle iconUser"></i>
                                    </div>
                                </a>
                                <MenuSecundario menu={menu[1]} key={'menu_2'} k={'menu_2'} />
                            </li>
                        </ul>
                    </nav>

                    <div className="row p-4" id="root">

                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane preview-tab-pane active" role="tabpanel" aria-labelledby="tab-dom-533ab411-31a3-4e27-87a1-2e6e0f25835c" id="dom-533ab411-31a3-4e27-87a1-2e6e0f25835c">
                                    <div className="row light">

                                        <div className="col-md-12 text-center mb-4">
                                            <img className="imgVumHeader" src="./assets/img/icono-vum-office-home.svg" alt="icono-vum-office-home" />
                                        </div>

                                        <div className="col-md-12 text-center mb-5">
                                            <h3 className="tituloComoTePodemosAyudar">¿Como te podemos ayudar?</h3>
                                            <span className="spanNombreUsuario">Jose Carlos Avila Perea</span>
                                        </div>

                                        <CardsOficina />

                                        <div className="col-md-12 text-center">
                                            <button className="btn btnVumOffice d-block w-100 mt-3 fontBtnVumOffice" type="submit" name="submit">
                                                <img className="imgControlIngresoYSalida" src="./assets/img/icono-control-ingreso-salida.svg" alt="icono-control-ingreso-salida" />
                                                Control de ingreso y salida
                                            </button>
                                            <button className="btn btnVumOffice d-block w-100 mt-3 fontBtnVumOffice" type="submit" name="submit">
                                                Califícanos y comunícate
                                            </button>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        </main>
    )
}
