import React from 'react';
import { routes } from '../../../environments/environments';
import { Link } from 'react-router-dom';

export const MenuCV = () => {

    return (
        <nav className="navbar navbar-light navbar-vertical navbar-expand-xl navbarMobile" style={{ marginLeft: '0rem', marginRight: '0rem' }}>

            <div className="d-flex align-items-center" style={{ paddingLeft: "5%" }}>
                <div className="toggle-icon-wrapper">
                    <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left"><span className="navbar-toggle-icon"><span className="toggle-line"></span></span></button>
                </div>
                <Link to={{ pathname: routes.home.url }}>

                    <div className="navbar-brand">
                        <div className="d-flex align-items-center py-3">
                            <img className="me-2" src="./assets/img/logo-vum-login.svg" alt="" width="80" />
                        </div>
                    </div>
                </Link>
            </div>

            <div className="sombraNavbarInhabilitada collapse navbar-collapse" id="navbarVerticalCollapse">
                <div className="navbar-vertical-content scrollbar navbarPadding mb-2">
                    <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav" style={{ minHeight: '100%', padding: '0 0 13px 0', paddingTop: '0px' }}>
                        <li>Submenu 1</li>
                        <li>Submenu 2</li>
                        <li>Submenu 3</li>
                        <li>Submenu 4</li>
                        <li>Submenu 5</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
