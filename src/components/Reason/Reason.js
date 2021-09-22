import React, { useState } from 'react';

export const Reason = ({form, setForm, disabled=false}) => {

    const [reason, setReason] = useState(form?.reason || '');

    const handleReasonUpdate = (e) => {
        setReason(e.target.value);
        if (typeof setForm === 'function') setForm(e.target.value);
    };

    return (
        <>
            <label>Razón de Permanencia</label>
            <textarea type='text' className='form-control' disabled={disabled} style={{height: '1rem'}} value={reason} onChange={handleReasonUpdate} />
        </>
    )
}
