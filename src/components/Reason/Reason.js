import React, { useState } from 'react'

export const Reason = ({setForm}) => {

    const [reason, setReason] = useState('');

    const handleReasonUpdate = (e) => {
        setReason(e.value);
        if (typeof setForm === 'function') setForm(e.value);
    };

    return (
        <>
            <label>Razón de Permanencia</label>
            <textarea type='text' className='form-control' style={{height: '1rem'}} value={reason} onChange={handleReasonUpdate} />
        </>
    )
}
