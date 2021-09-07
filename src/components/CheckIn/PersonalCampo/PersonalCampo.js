import React, { useState } from 'react';
import Select from 'react-select';
import { ColourStyles } from '../../Inputs/Multiple/ColourStyles';

export const PersonalCampo = () => {
    const [sede, setSede] = useState(false);

    const handleSedeUpdate = (e) => {
        setSede(e)
    };

    const options = [
        {
            value: 'Cali',
            label: 'Cali',
            color: '#1780E8'
        },
        {
            value: 'Medellin',
            label: 'Medellin',
            color: '#1780E8'
        },
        {
            value: 'Palmira',
            label: 'Palmira',
            color: '#1780E8'
        },
        {
            value: 'Tulua',
            label: 'Tulua',
            color: '#1780E8'
        },
        {
            value: 'Bogota',
            label: 'Bogota',
            color: '#1780E8'
        }
    ];

    return (
        <div className='row mb-4'>
            <div className='input-group'>
                <div className='offset-md-0 col-12 col-md-4 mb-3' style={{paddingRight: '1rem', marginBottom: '1rem'}}>
                    <label>Ciudades</label>
                    <Select styles={ColourStyles} onChange={handleSedeUpdate} value={ sede } options={options} />
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
                        value={sede}
                        required='required'
                    />
                </div>

                <div className='offset-md-0 col-12 col-md-4 mb-3' style={{paddingRight: '1rem', marginBottom: '1rem'}}>
                    <label>Punto de venta</label>
                    <Select styles={ColourStyles} onChange={()=>{}} value={ '' } options={[]} />
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
                        value={sede}
                        required='required'
                    />
                </div>
                <div className='col-12 col-md-4' style={{ marginBottom: '1rem', paddingRight: '1rem'}}>
                    <label>Razón de Permanencia</label>
                    <textarea type='text' className='form-control' style={{height: '1rem'}} />
                </div>
            </div>
            
        </div>
    )
}
