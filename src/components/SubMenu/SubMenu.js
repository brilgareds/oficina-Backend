import React from 'react';

export const SubMenu = ({ menu, k, first=false }) => {

    const definirPropiedadesSubMenu = (menu, k, first) => {
        const { descripcion, clasesIcono, titulo, redireccionar, recurso, tipoAccion, subMenus } = menu;
        const tieneSubMenus = (subMenus && subMenus.length);

        const response = {
            k,
            colorTitulo: (first) ? '' : '#5e6e82',
            collapse: (tieneSubMenus) ? 'collapse' : '',
            target: (tipoAccion === 'R') ? '_blank' : '',
            href: (tipoAccion === 'R') ? redireccionar : `#${k}`,
            dropDown: (tieneSubMenus) ? 'dropdown-indicator' : '',
            dataBsTarget: (tipoAccion === 'RI') ? '#modalImagenRedireccion' : '',
            dataBsToggle: (tieneSubMenus) ? 'collapse' : ((tipoAccion === 'RI') ? 'modal':''),
            titulo, recurso, tipoAccion, clasesIcono, descripcion, redireccionar, tieneSubMenus
        };

        return response;
    };



    const {
        colorTitulo, target, dropDown, href, dataBsTarget, descripcion,
        titulo, clasesIcono, redireccionar, recurso, dataBsToggle
    } = definirPropiedadesSubMenu(menu, k, first);



    return (menu) ? 
        <>
            <a className={ `nav-link ${dropDown }` } href={ `${href}`} img-redireccion={redireccionar || '#'} data-bs-target={dataBsTarget} img-url={recurso} data-bs-toggle={ dataBsToggle }  aria-controls={ href } target={ target } title={ descripcion }>
                <div className="d-flex align-items-center" style={{ color: "#1780E8" }}>
                    { (first) ? <span className="nav-link-icon"><i className={clasesIcono}></i></span> : <></> }
                    <span className="nav-link-text ps-1" style={{ color: colorTitulo }} >{titulo}</span>
                </div>
            </a>
            <ul className="nav collapse" id={ k }>
                <li className="nav-item">
                    {
                        menu.subMenus.map((subMenu, iteracion) => {
                            
                            const key = `${k}_${iteracion+1}`;
                            
                            return <SubMenu menu={ subMenu } k={ key } key={ key } first={ false } />
                        })
                    }
                </li>
            </ul>
        </>
        :
        <></>
}
