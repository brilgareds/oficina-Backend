import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getCitiesForASpecificPerson } from '../../repositories/generalInfo';
import { ColourStyles } from '../Inputs/Multiple/ColourStyles';

export const Cities = ({ setForm }) => {

    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');

    const handleCityUpdate = (e) => {
        setCity(e);
        if (typeof setForm === 'function') setForm(e.value);

        // getSalesPoints(e.value.toLowerCase()).then(setSalesPoints);
    };

    useEffect(() => {
        getCitiesForASpecificPerson().then(setCities);
    }, [setCities]);


    return (
        <div>
            <label>Ciudad</label>
            <Select styles={ColourStyles} onChange={handleCityUpdate} value={ city } options={cities} />
            <input
                tabIndex={-1}
                autoComplete="off"
                style={{
                    opacity: 0,
                    width: "20%",
                    height: 0,
                    position: "absolute"
                }}
                onChange={ ()=>{} }
                value={city}
                required='required'
            />
        </div>
    )
}
