import React from 'react';
import { routes } from '../../../environments/environments';
import { MenuPrincipal } from '../../Menus/MenuPrincipal/MenuPrincipal';
import { Link } from 'react-router-dom';
import { useLogin } from '../../../pages/Login/hooks/useLogin.js';
import { ToggleIcon } from '../../toggleIcon/ToggleIcon';

export const Navbar = ({ menu }) => {

    const { logOut } = useLogin({ identification: '' });


    return (
        <nav className="navbar navbar-light navbar-vertical navbar-expand-xl navbarMobile" style={{ marginLeft: '0rem', marginRight: '0rem' }}>

            <div className="d-flex align-items-center" style={{ paddingLeft: "5%" }}>
                <div className="toggle-icon-wrapper">
                    <ToggleIcon />
                </div>
                <Link to={{ pathname: routes.home.url }}>

                    <div className="navbar-brand">
                        <div className="d-flex align-items-center py-3">
                            <img className="me-2" src="/assets/img/logo-vum-login.png" alt="" width="80" />
                        </div>
                    </div>
                </Link>
            </div>


            <div className="sombraNavbarInhabilitada collapse navbar-collapse" id="navbarVerticalCollapse">
                <div className="navbar-vertical-content scrollbar navbarPadding mb-2">
                    <MenuPrincipal k={'menu_1'} key={'menu_1'} menu={menu} />
                </div>
                <div className="divCerrarSesion text-center" onClick={logOut}>
                    <div className="row">
                        <div className="col-md-12">
                            <i style={{ color: "#0F4F80", fontSize: "30px" }} className="fas fa-power-off"></i>
                            {/* <img className="iconoCerrarSesion" src="/assets/img/icono-cerrar-sesion.svg" alt="icono-cerrar-sesion" /> */}
                        </div>
                        <div className="col-md-12">
                            <span className="spanCerrarSesion nav-link-text">Cerrar sesion</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
