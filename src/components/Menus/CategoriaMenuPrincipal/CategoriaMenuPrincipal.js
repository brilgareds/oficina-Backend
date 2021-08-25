import React from 'react';
import { Loading } from '../../Loading/Loading';
import { SubMenuPrincipal } from '../SubMenuPrincipal/SubMenuPrincipal';

export const CategoriaMenuPrincipal = ({ categoria, k }) => {

    if (!categoria) return <Loading/>;

    return (
        <li className="nav-item">
            <div className="row navbar-vertical-label-wrapper mt-3 mb-2">
                <div className="col-auto navbar-vertical-label">
                    { categoria.titulo }
                </div> 
                <div className="col ps-0">
                    <hr className="mb-0 navbar-vertical-divider"/>
                </div>
            </div>
            {
                categoria.subMenus.map((subMenu, c) => {
                    const key2 = `${k}_${c+1}`;

                    return <SubMenuPrincipal menu={ subMenu } k={ key2 } key={ key2 } first={ true } />
                })
            }
        </li>
    );
};