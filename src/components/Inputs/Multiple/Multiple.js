import React, { useState } from 'react';
import Select from 'react-select';
import { ColourStyles } from './ColourStyles';

export const Multiple = ({ prop, items, setFormEncuestaRiesgoCovid, formEncuestaRiesgoCovid }) => {

    const [valueSelect, setValueSelect] = useState(formEncuestaRiesgoCovid[prop] ?? []);

    const options = items.map(({cod, detalle, single}) => ({
        value: cod,
        label: detalle,
        single: single,
        color: '#1780E8'
    }));

    const updateSelect = (a) => {
        
        const singleValue = a[a.length-1]?.single ?? false;
        const newValues = (singleValue) ? [a[a.length-1]] : a.filter(option => !option.single);

        setValueSelect(newValues);
        setFormEncuestaRiesgoCovid(old_value => {
            old_value[prop] = newValues.map(newValue => ({ ...newValue, cod: newValue.value }));

            console.log('\nNewForm is: ', old_value)

            return old_value;
        });
    }

      

    
    return <>
        <Select isMulti styles={ColourStyles} closeMenuOnSelect={false} blurInputOnSelect={false} onChange={ updateSelect } value={ valueSelect } options={options} placeholder={'Selección múltiple'} />
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
            value={valueSelect}
            required='required'
        />
    </>
}
