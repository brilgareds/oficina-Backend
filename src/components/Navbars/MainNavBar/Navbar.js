import React from 'react';
import { routes } from '../../../environments/environments';
import { MenuPrincipal } from '../../Menus/MenuPrincipal/MenuPrincipal';
import { Link } from 'react-router-dom';
import { useLogin } from '../../../pages/Login/hooks/useLogin.js';

export const Navbar = ({ menu }) => {

    return (
        <nav className="navbar navbar-light navbar-vertical navbar-expand-xl navbarMobile" style={{ marginLeft: '0rem', marginRight: '0rem' }}>

            <div className="d-flex align-items-center" style={{ paddingLeft: "5%" }}>
                <div className="toggle-icon-wrapper">
                    <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left"><span className="navbar-toggle-icon"><span className="toggle-line"></span></span></button>
                </div>
                <Link to={{ pathname: routes.home.url }}>

                    <div className="navbar-brand">
                        <div className="d-flex align-items-center py-3">
                            <img className="me-2" src="/assets/img/logo-vum-login.svg" alt="" width="80" />
                        </div>
                    </div>
                </Link>
            </div>

            <div className="sombraNavbarInhabilitada collapse navbar-collapse" id="navbarVerticalCollapse">
                <div className="navbar-vertical-content scrollbar navbarPadding mb-2">
                    <MenuPrincipal k={'menu_1'} key={'menu_1'} menu={menu} />
                </div>
                <div className="divCerrarSesion text-center">
                    <div className="row">
                        <div className="col-md-12">
                            <img className="iconoCerrarSesion" src="/assets/img/icono-cerrar-sesion.svg" alt="icono-cerrar-sesion" />
                        </div>
                        <div className="col-md-12">
                            <span onClick={useLogin.logOut} className="spanCerrarSesion nav-link-text">Cerrar sesion</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
