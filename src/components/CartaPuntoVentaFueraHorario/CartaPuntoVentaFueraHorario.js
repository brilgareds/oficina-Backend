import React, { useEffect, useState } from 'react';

export const CartaPuntoVentaFueraHorario = ({ form, setForm }) => {

    const handleCheckInChanged = (e) => {
        setForm(old_value => ({ ...old_value, checkInTime: e.target.value }));
    };

    const handleCheckOutChanged = (e) => {
        setForm(old_value => ({ ...old_value, checkOutTime: e.target.value }));
    };

    return (
        <div className='input-group containerTimeFilter'>
            <div>
                <label>Hora entrada</label>
                <input type='time' onChange={handleCheckInChanged} value={ form.checkInTime || '' } className='form-control' />
            </div>
            
            <div>
                <label>Hora Salida</label>
                <input type='time' onChange={handleCheckOutChanged} value={ form.checkOutTime || '' }className='form-control' />
            </div>
        </div>
    )
}