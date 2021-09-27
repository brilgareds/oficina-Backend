import React from 'react';
import { useLogin } from '../../../pages/Login/hooks/useLogin.js';

export const MenuSecundarioFooter = () => {

    const { logOut } = useLogin({ identification: '' });

    return (
        <div style={{ cursor: 'pointer' }} onClick={logOut} className="dropdown-item">Cerrar sesión</div>
    )
}
