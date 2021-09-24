import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getCitiesForASpecificPerson } from '../../repositories/generalInfo';
import { ColourStyles } from '../Inputs/Multiple/ColourStyles';

export const Cities = ({ form, setForm, disabled=false }) => {

    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');

    const handleCityUpdate = (e) => {
        setCity(e);
        if (typeof setForm === 'function') setForm(e.value);
    };

    useEffect(() => {
        getCitiesForASpecificPerson().then(cities => {
            if (cities) {

                setCities(cities);

                if (form?.city) {
                    const city = cities.filter(currentValue => (currentValue.value === form?.city))?.[0] || '';
                    setCity(city);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div style={{ zIndex:11 }}>
            <label>Ciudad</label>
            <Select styles={ ColourStyles } onChange={handleCityUpdate} isDisabled={disabled} value={ city } options={cities} />
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
