import React from 'react';
import { CategoriaMenuPrincipal } from '../../CategoriaMenuPrincipal/CategoriaMenuPrincipal';

export const MenuPrincipal = ({ menu, k }) => {

    return (menu && menu.subMenus) ?

        <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav" style={{ padding: '13px', paddingTop: '0px' }}>{
            menu.subMenus.map((categoria, b) => (
                <CategoriaMenuPrincipal k={ k+'_'+(b+1) } key={ k+'_'+(b+1) } categoria={ categoria } />
            ))}
        </ul>
        :
        <></>
};