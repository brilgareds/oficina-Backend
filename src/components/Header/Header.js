import React from 'react'
import { NavbarUserProfile } from '../NavbarUserProfile/NavbarUserProfile'

export const Header = ({ menu }) => {
    return (
        
        <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand headerMobile mb-2">
            <button className="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span className="navbar-toggle-icon"><span className="toggle-line"></span></span></button>
            <a className="navbar-brand me-1 me-sm-3" href="./#">
                <div className="d-flex align-items-center"><img className="me-2" src="./assets/img/logo-vum-login.svg" alt="" width="90" />
                </div>
            </a>

            <NavbarUserProfile menu={ menu }/>
        </nav>
    )
}
