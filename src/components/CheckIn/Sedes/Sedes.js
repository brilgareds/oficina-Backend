import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { specificDecimals } from '../../../generalHelpers';
import { getAllBranches } from '../../../repositories/generalInfo';
import { ColourStyles   } from '../../Inputs/Multiple/ColourStyles';

export const Sedes = ({ setForm }) => {

    const [branch, setBranch] = useState('');
    const [branches, setBranches] = useState([])
    const [reason, setReason] = useState('');
    const [temperature, setTemperature] = useState('');

    useEffect(() => {
        getAllBranches().then(setBranches);
    }, []);

    const handleReasonUpdate = (e) => {
        setReason(e.target.value);
        setForm(old_value => ({
            ...old_value,
            reason: e.target.value
        }));
    };

    const handleSedeUpdate = (e) => {
        setBranch(e);
        setForm(old_value => ({
            ...old_value,
            branch: e.value
        }));
    };

    const handleTemperatureUpdate = (e) => {
        const value = specificDecimals(e.target.value, 1);
        setTemperature(value);
        setForm(old_value => ({
            ...old_value,
            temperature: value
        }));
    };

    return (
        <div className='row mb-4'>
            <div className='input-group'>
                <div className='offset-md-0 col-12 col-md-4 mb-3' style={{paddingRight: '1rem', marginBottom: '1rem'}}>
                    <label>Sedes</label>
                    <Select styles={ColourStyles} onChange={handleSedeUpdate} value={ branch } options={branches} />
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
                        value={branch}
                        required='required'
                    />
                </div>

                <div className='col-12 col-md-4' style={{paddingRight: '1rem', marginBottom: '1rem'}}>
                    <label>Températura en °C</label>
                    <input type='text' pattern="^\d*[,.]?\d+$" value={temperature} onChange={handleTemperatureUpdate} className='form-control' required />
                </div>
                <div className='col-12 col-md-4' style={{ marginBottom: '1rem', paddingRight: '1rem'}}>
                    <label>Razón de Permanencia</label>
                    <textarea type='text' className='form-control' style={{height: '1rem'}} value={reason} onChange={handleReasonUpdate} />
                </div>
            </div>
        </div>
    )
}