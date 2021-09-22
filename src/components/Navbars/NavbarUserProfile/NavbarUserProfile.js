import React from 'react';
import { getFullNameUser } from '../../../generalHelpers';
import { MenuSecundario } from '../../Menus/MenuSecundario/MenuSecundario';

export const NavbarUserProfile = ({ menu }) => {

    return (
        <ul className="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
            <li className="nav-item tituloUsuarioCard nombreUsuarioDesktop">¡Hola {getFullNameUser()}!</li>
            <li className="nav-item dropdown">
                <a className="nav-link pe-0" id="navbarDropdownUser" href="./#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <div className="avatar avatar-xl avatarIcon">
                        <i className="fas fa-user rounded-circle iconUser"></i>
                    </div>
                </a>
                <MenuSecundario menu={menu} key={'menu_2'} k={'menu_2'} />
            </li>

        </ul>
    )
}
