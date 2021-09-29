import React from 'react';
import { Link } from 'react-router-dom';
import { definirPropiedadesLink } from '../../../generalHelpers';
import { Loading } from '../../Loading/Loading';

export const SubMenuPrincipal = ({ menu, k, first=false }) => {

    if (!menu) return <Loading/>;

    const {
        colorTitulo, target, dropDown, href, dataBsTarget, descripcion,
        titulo, clasesIcono, redireccionar, recurso, dataBsToggle
    } = definirPropiedadesLink(menu, k, first);


    return (
        <>
            <Link className={ `nav-link ${dropDown }` } to={{ pathname: `${href}` }} img-redireccion={redireccionar || '#'} data-bs-target={dataBsTarget} img-url={recurso} data-bs-toggle={ dataBsToggle }  aria-controls={ href } target={ target } title={ descripcion }>
                <div className="d-flex align-items-center">
                    { (first) ? <span className="nav-link-icon" style={{textAlign: 'left'}}><i className={clasesIcono}></i></span> : <></> }
                    <span className="nav-link-text ps-1" style={{ color: colorTitulo }} >{titulo}</span>
                </div>
            </Link>
            <ul className="nav collapse" id={ k }>
                <li className="nav-item">{
                    menu.subMenus.map((subMenu, iteracion) => {
                        
                        const key = `${k}_${iteracion+1}`;
                        
                        return <SubMenuPrincipal menu={ subMenu } k={ key } key={ key } first={ false } />
                    })}
                </li>
            </ul>
        </>
    );
}
