import React from 'react';
import { MenuSecundarioHeader } from '../MenuSecundarioHeader/MenuSecundarioHeader';
import { MenuSecundarioFooter } from '../MenuSecundarioFooter/MenuSecundarioFooter';
import { MenuSecundarioBody } from '../MenuSecundarioBody/MenuSecundarioBody';

export const MenuSecundario = ({ menu, k }) => {

    return (
        <div className="dropdown-menu dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser" data-bs-popper="none">
            <div className="bg-white dark__bg-1000 rounded-2 py-2">
                <MenuSecundarioHeader />
                <div className="dropdown-divider"></div>
                <MenuSecundarioBody menu={ menu } k={ k } />
                <div className="dropdown-divider"></div>
                <MenuSecundarioFooter />
            </div>
        </div>
    );
};