import React from 'react';
import { changeMinutes, makeWarningAlert } from '../../generalHelpers';

export const CartaPuntoVentaFueraHorario = ({ form, setForm }) => {

    const timeValidator = ({ e, oldValue, typeCheck}) => {
        let newValue     = { ...oldValue, [typeCheck]: e.target.value };
        let checkInTime  = newValue?.checkInTime;
        let checkOutTime = newValue?.checkOutTime;
        let isNotValid = (checkInTime && checkOutTime && (checkInTime >= checkOutTime));

        if (isNotValid) {
            const errors = [{description: 'Hora entrada debe ser menor a la hora de salida!'}];
            makeWarningAlert({errors});
        }
        
        return (isNotValid) ? oldValue : newValue;
    };

    const handleCheckInChanged = (e) => {
        setForm(oldValue => timeValidator({ e, oldValue, typeCheck: 'checkInTime' }));
    };

    const handleCheckOutChanged = (e) => {
        setForm(oldValue => timeValidator({ e, oldValue, typeCheck: 'checkOutTime' }));
    };

    const maxCheckIn = changeMinutes({
        operator: '-',
        time: form?.checkOutTime,
        minutesToChange: 1
    });

    const minCheckOut = changeMinutes({
        operator: '+',
        time: form?.checkInTime,
        minutesToChange: 1
    });

    return (
        <div className='input-group containerTimeFilter'>
            <div>
                <label>Hora entrada</label>
                <input type='time' max={maxCheckIn} onChange={handleCheckInChanged} value={ form.checkInTime || '' } className='form-control' required />
            </div>
            
            <div>
                <label>Hora salida</label>
                <input type='time' min={minCheckOut} onChange={handleCheckOutChanged} value={ form.checkOutTime || '' } className='form-control' required />
            </div>
        </div>
    )
}