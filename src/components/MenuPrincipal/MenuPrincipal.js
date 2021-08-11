import React from 'react';
import { CategoriaMenuPrincipal } from '../CategoriaMenuPrincipal/CategoriaMenuPrincipal';

export const MenuPrincipal = ({ menu, k }) => (

    (menu && menu.subMenus) ?

        <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav" style={{ padding: '13px', paddingTop: '0px' }}>
            {
                menu.subMenus.map((categoria, b) => {
                    const key = `${k}_${b+1}`;

                    return <CategoriaMenuPrincipal k={ key } key={ key } categoria={ categoria } />
                })
            }
        </ul>
        :
        <></>
);