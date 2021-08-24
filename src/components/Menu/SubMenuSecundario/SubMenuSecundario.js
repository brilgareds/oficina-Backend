import React from 'react';
import { Link } from 'react-router-dom';
import { definirPropiedadesLink } from '../../../generalHelpers';
import { Loading } from '../../Loading/Loading';

export const SubMenuSecundario = ({ subMenu, k }) => {

    if (!subMenu) return <Loading/>;

    const {
        target, href, dataBsTarget, descripcion,
        titulo, redireccionar, recurso, dataBsToggle
    } = definirPropiedadesLink(subMenu, k);
    
    return (
        <Link className={ `dropdown-item` } to={ `${href}`} img-redireccion={redireccionar || '#'} data-bs-target={dataBsTarget} img-url={recurso} data-bs-toggle={ dataBsToggle }  aria-controls={ href } target={ target } title={ descripcion }>
            {titulo}
        </Link>
    );
};