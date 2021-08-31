import React, { useState } from 'react';
import { getDocumentId } from '../../../generalHelpers';

export const Numeric = ({ formEncuestaRiesgoCovid, setFormEncuestaRiesgoCovid, prop, item }) => {

    console.log('formEncuestaRiesgoCovid: ', formEncuestaRiesgoCovid);

    const [inputNumber, setInputNumber] = useState(formEncuestaRiesgoCovid[prop]?.value ?? getDocumentId());
    
    const handleChange = (e) => {
        const newValue = e.target.value;

        setInputNumber(newValue);
        
        setFormEncuestaRiesgoCovid(old_value => {
            
            old_value[prop] = { cod: item.cod, value: newValue };
            
            console.log('\nNewForm isss: ', old_value)
            
            return old_value;
        });
    };
    
    if (!item) return <></>;
    // const defaultValue = (formEncuestaRiesgoCovid[prop].value ?? '');

    return (
        <div className='col-12 col-md-5'>
            <input type='number' className='form-control' min='1' value={inputNumber} onChange={handleChange} required />
        </div>
    )
}