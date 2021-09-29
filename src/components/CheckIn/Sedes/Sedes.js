import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { specificDecimals } from '../../../generalHelpers';
import { getAllBranches } from '../../../repositories/generalInfo';
import { ColourStyles   } from '../../Inputs/Multiple/ColourStyles';

export const Sedes = ({ setForm, form, userHasCheckIn, userHasCheckOut }) => {

    const [branch, setBranch] = useState('');
    const [branches, setBranches] = useState([]);
    const [reason, setReason] = useState(form?.reason || '');
    const [temperature, setTemperature] = useState(form?.temperature || '');
    const [temperatureCheckOut, setTemperatureCheckOut] = useState(form?.temperatureCheckOut || '');

    useEffect(() => {
        getAllBranches().then(newBranches => {
            if (newBranches) {

                setBranches(newBranches);

                if (form?.branch) {
                    const branch = newBranches.filter(currentValue => (currentValue.value === form?.branch))?.[0] || '';
                    setBranch(branch);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleTemperatureCheckInUpdate = (e) => {
        if (parseFloat(e.target.value) < 1 || parseFloat(e.target.value) >= 100) return;

        const value = specificDecimals(e.target.value, 1);
        setTemperature(value);
        setForm(old_value => ({
            ...old_value,
            temperature: value
        }));
    };

    const handleTemperatureCheckOutUpdate = (e) => {
        if (parseFloat(e.target.value) < 1 || parseFloat(e.target.value) >= 100) return;

        const value = specificDecimals(e.target.value, 1);
        setTemperatureCheckOut(value);
        setForm(old_value => ({
            ...old_value,
            temperatureCheckOut: value
        }));
    };

    return (
        <div className='row mb-4'>
            <div className='input-group'>
                <div className='offset-md-0 col-12 col-md-4 mb-3' style={{paddingRight: '1rem', marginBottom: '1rem'}}>
                    <label>Sedes</label>
                    <Select styles={ColourStyles} isDisabled={userHasCheckIn} onChange={handleSedeUpdate} value={ branch } options={branches} />
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
                    <input type='text' pattern="^\d*[,.]?\d+$" disabled={userHasCheckIn} value={temperature} onChange={handleTemperatureCheckInUpdate} className='form-control' required />
                </div>
                <div className='col-12 col-md-4' style={{ marginBottom: '1rem', paddingRight: '1rem'}}>
                    <label>Razón de Permanencia</label>
                    <textarea type='text' className='form-control' disabled={userHasCheckIn} style={{height: '1rem'}} value={reason} onChange={handleReasonUpdate} />
                </div>
                {
                    (userHasCheckIn) &&
                        <div className='col-12 col-md-4' style={{ marginBottom: '1rem', paddingRight: '1rem'}}>
                            <label>Températura de salida en °C</label>
                            <input type='text' pattern="^\d*[,.]?\d+$" disabled={userHasCheckOut} value={temperatureCheckOut} onChange={handleTemperatureCheckOutUpdate} className='form-control' required />
                        </div>
                }
                
            </div>
        </div>
    )
}