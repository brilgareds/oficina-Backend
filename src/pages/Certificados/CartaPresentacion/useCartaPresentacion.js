import { useState } from 'react';

export const useCartaPresentacion = () => {

    const [cities, setCities] = useState([]);

    const [formPresentationCard, setFormPresentationCard] = useState({ typeCard: 'cartaPuntoVenta' });

    return {
        cities,
        setCities,
        formPresentationCard,
        setFormPresentationCard
    }
};