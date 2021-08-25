import React from 'react';
import { useLogin } from '../../../pages/Login/hooks/useLogin.js';

export const MenuSecundarioFooter = () => {

    const { logOut } = useLogin({ identification: '' });

    return (
        <div onClick={logOut} className="dropdown-item">Cerrar sesion</div>
    )
}
