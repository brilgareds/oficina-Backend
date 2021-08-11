import React from 'react'
import { SubMenuSecundario } from '../SubMenuSecundario/SubMenuSecundario'

export const MenuSecundarioBody = ({ menu, k }) => {
    return (
        <div id="menu_secundario">{
            menu.subMenus.map((subMenu, i) => <SubMenuSecundario key={ `${k}_${i+1}` } k={ `${k}_${i+1}` } subMenu={ subMenu } />)}
        </div>
    )
}
