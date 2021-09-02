import React from 'react';
import { CategoriaMenuPrincipal } from '../CategoriaMenuPrincipal/CategoriaMenuPrincipal';
import { Loading } from '../../Loading/Loading';

export const MenuPrincipal = ({ menu, k }) => {

    if (!menu || !menu.subMenus) return <Loading/>;

    return (
        <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav" style={{ minHeight: '100%', padding: '0 0 13px 0', paddingTop: '0px' }}>{
            menu.subMenus.map((categoria, b) => (
                <CategoriaMenuPrincipal k={ k+'_'+(b+1) } key={ k+'_'+(b+1) } categoria={ categoria } />
            ))}
        </ul>
    );
};