import React from 'react';
import { getFullNameUser } from '../../../generalHelpers';

export const MenuSecundarioHeader = () => {

    return (
        <span className="dropdown-item fw-bold tituloUsuarioCard">¡Hola {getFullNameUser()}!</span>
    )
}
