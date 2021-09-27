import { useEffect, useState } from 'react';
import './cartaPresentacion.css'

export const useCartaPresentacion = () => {

    const [cities, setCities] = useState([]);

    useEffect(() => {
        document.getElementById('root').className = 'carta-presentacion';
    });

    const [formPresentationCard, setFormPresentationCard] = useState({ typeCard: 'cartaPuntoVenta' });

    return {
        cities,
        setCities,
        formPresentationCard,
        setFormPresentationCard
    }
};