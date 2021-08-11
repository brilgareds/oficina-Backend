import React from 'react'

const NavbarDropdownUser = () => {
    return (
        <li className="nav-item dropdown">
            <a className="nav-link pe-0" id="navbarDropdownUser" href="./#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <div className="avatar avatar-xl avatarIcon">
                    <i className="fas fa-user rounded-circle iconUser"></i>
                </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser" data-bs-popper="none">
                <div className="bg-white dark__bg-1000 rounded-2 py-2">
                    <span className="dropdown-item fw-bold tituloUsuarioCard">¡Hola Gabriel!</span>
                    <div className="dropdown-divider"></div>
                    <div id="menu_secundario">

                    </div>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="pages/authentication/card/logout.html">Cerrar Sesion</a>
                </div>
            </div>
        </li>
    )
}

export default NavbarDropdownUser;