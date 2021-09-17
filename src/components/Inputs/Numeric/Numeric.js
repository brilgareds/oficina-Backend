import React from 'react';
import { useOpenField } from '../useOpenField';

export const Numeric = (props) => {

    const { inputValue, handleNumericChange } = useOpenField({ ...props });

    if (!props.item) return <></>;

    // const defaultValue = (formEncuesta[prop].value ?? '');

    return (
        <div className='col-12 col-md-5'>
            <input type='text' pattern="^\d*[,.]?\d+$" className='form-control fontFamilyToNumber' value={inputValue} onChange={handleNumericChange} required />
        </div>
    )
}