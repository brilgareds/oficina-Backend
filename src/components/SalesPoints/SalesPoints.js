import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getSalesPoints } from '../../repositories/generalInfo';
import { ColourStyles } from '../Inputs/Multiple/ColourStyles';

export const SalesPoints = ({filter, form, setForm, value, multiple=true, disabled=false}) => {

    const [salesPoints, setSalesPoints] = useState([]);
    const [salesPoint, setSalesPoint] = useState([]);

    const handleSalesPointUpdate = (e) => {
        setSalesPoint(e || []);
        setForm(e || []);
    };

    useEffect(() => {

        if (filter) {
            handleSalesPointUpdate();
            getSalesPoints(filter).then(salesPoints => {
                if (salesPoints) {
                    setSalesPoints(salesPoints);

                    if (form?.salesPoints) {
                        const salesPoint = salesPoints.filter(currentValue => (currentValue.value === form?.salesPoints))?.[0] || '';
                        setSalesPoint(salesPoint);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    useEffect(() => {
        setSalesPoint(value || []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);


    return (
        <div>
            <label>Punto de venta</label>
            <Select isMulti={multiple} closeMenuOnSelect={!multiple} isDisabled={disabled} styles={ColourStyles} onChange={handleSalesPointUpdate} value={ salesPoint } options={salesPoints} />
            <input
                tabIndex={-1}
                autoComplete="off"
                style={{
                    opacity: 0,
                    width: "20%",
                    height: 0,
                    position: "absolute"
                }}
                onChange={() => { }}
                value={salesPoint}
            // required='required'
            />
        </div>
    )
}