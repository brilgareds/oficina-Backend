import React from 'react';
import { useOpenField } from '../useOpenField';

export const Text = (props) => {

    const { inputValue, handleChange } = useOpenField(props);

    if (!props.item) return <></>;

    return (
        <div className='col-12 col-md-5'>
            <input type='text' className='form-control' value={inputValue} onChange={handleChange} required />
        </div>
    )
}
