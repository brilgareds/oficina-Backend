import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getSalesPoints } from '../../repositories/generalInfo';
import { ColourStyles } from '../Inputs/Multiple/ColourStyles';

export const SalesPoints = ({filter, setForm, value}) => {

    const [salesPoints, setSalesPoints] = useState([]);
    const [salesPoint,  setSalesPoint]  = useState([]);

    const handleSalesPointUpdate = (e) => {
        setForm(e || []);
    };

    useEffect(()=> {

        if (filter) {
            handleSalesPointUpdate();
            getSalesPoints(filter).then(setSalesPoints);
        }
    }, [filter]);

    useEffect(() => {
        setSalesPoint(value || []);
    }, [value]);


    return (
        <div>
            <label>Punto de venta</label>
            <Select isMulti styles={ColourStyles} onChange={handleSalesPointUpdate} value={ salesPoint } options={salesPoints} />
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
                value={salesPoint}
                required='required'
            />
        </div>
    )
}