import React from 'react'
import { Loading } from '../../Loading/Loading';
import { SubMenuSecundario } from '../SubMenuSecundario/SubMenuSecundario';

export const MenuSecundarioBody = ({ menu, k }) => {

    if (!menu || !menu.subMenus) return <Loading/>;

    return (
        <div id="menu_secundario">{
            menu.subMenus.map((subMenu, i) => <SubMenuSecundario key={ `${k}_${i+1}` } k={ `${k}_${i+1}` } subMenu={ subMenu } />)}
        </div>
    )
}
