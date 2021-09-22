import React from 'react';
import { Cities } from '../../Cities/Cities';
import { Reason } from '../../Reason/Reason';
import { SalesPoints } from '../../SalesPoints/SalesPoints';

export const PersonalCampo = ({ form, setForm, userHasCheckIn }) => {

    const handleCityChange = (newData) => {
        setForm(old_data => ({ ...old_data, city: newData }));
    };

    const handleSalesPointChange = (newData) => {
        setForm(old_data => ({ ...old_data, salesPoints: newData }));
    };

    const handleReasonChange = (newData) => {
        setForm(old_data => ({ ...old_data, reason: newData }));
    };

    return (
        <div className='row mb-4'>
            <div className='input-group'>
                <div className='offset-md-0 col-12 col-md-4 mb-3' style={{paddingRight: '1rem', marginBottom: '1rem'}}>
                    <Cities form={form} setForm={handleCityChange} disabled={userHasCheckIn} />
                </div>
                <div className='offset-md-0 col-12 col-md-4 mb-3' style={{paddingRight: '1rem', marginBottom: '1rem'}}>
                    <SalesPoints form={form} multiple={false} disabled={userHasCheckIn} filter={(form?.city)} setForm={handleSalesPointChange} />
                </div>

                <div className='col-12 col-md-4' style={{ marginBottom: '1rem', paddingRight: '1rem'}}>
                    <Reason form={form} setForm={handleReasonChange} disabled={userHasCheckIn} />
                </div>
            </div>
        </div>
    )
}
