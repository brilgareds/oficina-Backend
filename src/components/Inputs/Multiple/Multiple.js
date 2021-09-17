import React, { useState } from 'react';
import Select from 'react-select';
import { ColourStyles } from './ColourStyles';

export const Multiple = ({ prop, items, currentArray, agregarPregunta, setFormEncuesta, formEncuesta, tabIndex }) => {

    const [valueSelect, setValueSelect] = useState(formEncuesta[tabIndex][prop] ?? []);
    
    const options = items.map(({codeER, RESPUESTA, PREGUNTA_SIGUIENTE_ID, single}) => ({
        value: codeER,
        label: RESPUESTA,
        single: single,
        PREGUNTA_SIGUIENTE_ID: PREGUNTA_SIGUIENTE_ID,
        color: '#1780E8'
    }));

    const handleUpdate = ({e, prop, currentArray}) => {

        const preguntaSiguiente = currentArray[prop]?.responses[0]?.PREGUNTA_SIGUIENTE_ID || '';
        const singleValue = e[e.length-1]?.single ?? false;
        const newValues = (singleValue) ? [e[e.length-1]] : e.filter(option => !option.single);

        setValueSelect(newValues);
        setFormEncuesta(old_value => {
            old_value[tabIndex][prop] = newValues.map(newValue => ({ ...newValue, cod: newValue.value }));

            return old_value;
        });

        agregarPregunta({ obj: currentArray, prop: preguntaSiguiente, tabIndex });
    };


    return <>
        <Select isMulti styles={ColourStyles} closeMenuOnSelect={false} blurInputOnSelect={false} onChange={ (e)=>handleUpdate({e, prop, currentArray}) } value={ valueSelect } options={options} placeholder={'Selección múltiple'} />
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
