import { useState, useEffect } from 'react';
import { specificDecimals } from '../../generalHelpers';

export const useOpenField = ({ formEncuesta, currentArray, agregarPregunta, setFormEncuesta, maxDecimals, prop, item, tabIndex, init='' }) => {

    const [inputValue, setInputValue] = useState(formEncuesta[tabIndex][prop]?.value ?? init);

    const actualizarFormulario = (newValue) => {

        setFormEncuesta(old_value => {
            old_value[tabIndex][prop] = { codeER: item.codeER, value: newValue };

            return old_value;
        });

        agregarPregunta({ obj: currentArray, prop: item.PREGUNTA_SIGUIENTE_ID, tabIndex })
    };
    
    const handleChange = (e) => {
        const newValue = e.target.value;

        setInputValue(newValue);
        actualizarFormulario(newValue);
    };

    const handleNumericChange = (e) => {        
        const value = specificDecimals(e.target.value, maxDecimals);

        setInputValue(value);
        actualizarFormulario(value);
    };
    
    useEffect(() => {
        if (inputValue) {
            actualizarFormulario(inputValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return {
        handleChange,
        handleNumericChange,
        inputValue
    }
}
