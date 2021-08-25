import React, { useState } from 'react';
import Select from 'react-select';

export const Multiple = ({ prop, items, setFormEncuestaRiesgoCovid }) => {

    const [valueSelect, setValueSelect] = useState('');

    const options = items.map((respuesta, j) => {

        return {
            label: respuesta.detalle,
            value: `${prop}_${ j+1 }`,
            single: respuesta.single
        }
    });

    const updateSelect = (a) => {
        
        const singleValue = a[a.length-1]?.single ?? false;
        const newValue = (singleValue) ? [a[a.length-1]] : a.filter(option => !option.single);

        setValueSelect(newValue);
        setFormEncuestaRiesgoCovid(form => ({
            ...form,
            [prop]: newValue
        }));
    }

    return <>
        <Select isMulti value={ valueSelect } onChange={ updateSelect } options={options} placeholder={'Selección múltiple'} />
    </>
}
