import { Loading } from '../../Loading/Loading';
import { Link } from 'react-router-dom';
import { SubMenuSecundario } from '../SubMenuSecundario/SubMenuSecundario';
import { getRutasPorEmpresa } from '../../../generalHelpers';

export const MenuSecundarioBody = ({ menu, k }) => {

    if (!menu || !menu.subMenus) return <Loading />;

    const { modulos } = getRutasPorEmpresa();
    return (
        <div id="menu_secundario">
            {menu.subMenus.map((subMenu, i) => <SubMenuSecundario key={`${k}_${i + 1}`} k={`${k}_${i + 1}`} subMenu={subMenu} />)}
            <Link className={`dropdown-item`} target='_blank' to={{ pathname: modulos.reglamentoTrabajo }} >
                Reglamento interno
            </Link>
        </div>
    )
}
