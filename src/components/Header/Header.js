import React from 'react';
import { routes } from '../../environments/environments';
import { NavbarUserProfile } from '../Navbars/NavbarUserProfile/NavbarUserProfile';
import { Link } from 'react-router-dom';

export const Header = ({ menu }) => {

    return (
        <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand headerMobile" style={{ marginLeft: '0rem', marginRight: '0rem' }}>
            <button className="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span className="navbar-toggle-icon"><span className="toggle-line"></span></span></button>
            <Link to={{ pathname: routes.home.url }}>

                <div className="navbar-brand me-1 me-sm-3">
                    <div className="d-flex align-items-center"><img className="me-2" src="/assets/img/logo-vum-login.png" alt="" width="90" />
                    </div>
                </div>
            </Link>

            <NavbarUserProfile menu={menu} />
        </nav>
    )
}
