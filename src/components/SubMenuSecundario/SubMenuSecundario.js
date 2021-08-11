import React from 'react';

export const SubMenuSecundario = ({ subMenu, k }) => {


    const definirPropiedadesSubMenu = (subMenu, k) => {

        const { descripcion, titulo, redireccionar, recurso, tipoAccion, subMenus } = subMenu;
        const tieneSubMenus = (subMenus && subMenus.length);

        const response = {
            k,
            collapse: (tieneSubMenus) ? 'collapse' : '',
            target: (tipoAccion === 'R') ? '_blank' : '',
            href: (tipoAccion === 'R') ? redireccionar : `#${k}`,
            dataBsTarget: (tipoAccion === 'RI') ? '#modalImagenRedireccion' : '',
            dataBsToggle: (tieneSubMenus) ? 'collapse' : ((tipoAccion === 'RI') ? 'modal':''),
            titulo, recurso, tipoAccion, descripcion, redireccionar, tieneSubMenus
        };

        return response;
    };



    const {
        target, href, dataBsTarget, descripcion,
        titulo, redireccionar, recurso, dataBsToggle
    } = definirPropiedadesSubMenu(subMenu, k);




    
    return (subMenu) ?
        <a className={ `dropdown-item` } href={ `${href}`} img-redireccion={redireccionar || '#'} data-bs-target={dataBsTarget} img-url={recurso} data-bs-toggle={ dataBsToggle }  aria-controls={ href } target={ target } title={ descripcion }>
            {titulo}
        </a>
        :
        <></>
};