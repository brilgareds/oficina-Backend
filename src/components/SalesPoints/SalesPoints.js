import { useEffect, useState } from 'react';
import Select, { createFilter } from 'react-select';
import { getSalesPoints } from '../../repositories/generalInfo';
import { ColourStyles } from '../Inputs/Multiple/ColourStyles';
import { Component } from "react";
import { FixedSizeList as List } from "react-window";
import { overlay } from '../../generalHelpers';

class MenuList extends Component {
    render() {
        const height = 35;
        const { options, children, maxHeight, getValue } = this.props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * height;
        return (
            (options.length === 0) ?
                <></>
                :
                <List
                    height={maxHeight}
                    itemCount={children.length}
                    itemSize={height}
                    initialScrollOffset={initialOffset}
                >
                    {({ index, style }) => <div title={children[index].props.data.fullLabel} style={style}>{children[index]}</div>}
                </List>
        );
    }
}

export const SalesPoints = ({ filter, form, setForm, value, multiple = true, disabled = false }) => {

    const [salesPoints, setSalesPoints] = useState([]);
    const [salesPoint, setSalesPoint] = useState([]);
    const [cargando, setCargando] = useState(false)

    const handleSalesPointUpdate = (e) => {
        setSalesPoint(e || []);
        setForm(e || []);
    };

    useEffect(() => {

        if (filter) {
            overlay(true);
            setCargando(true);
            handleSalesPointUpdate();
            setSalesPoints([]);
            getSalesPoints(filter).then(salesPoints => {
                if (salesPoints) {
                    overlay(false);
                    setCargando(false)
                    setSalesPoints(salesPoints);

                    if (form?.salesPoints) {
                        const salesPoint = salesPoints.filter(currentValue => (currentValue.value === form?.salesPoints))?.[0] || '';
                        setSalesPoint(salesPoint);
                    }
                }
            }).catch(e => { overlay(false); });
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
            <Select

                components={{ MenuList }}
                captureMenuScroll={false}
                filterOption={createFilter({ ignoreAccents: false })}
                isMulti={multiple}
                closeMenuOnSelect={!multiple}
                isDisabled={cargando}
                styles={ColourStyles}
                onChange={handleSalesPointUpdate}
                value={salesPoint}
                options={salesPoints}
                placeholder={(cargando) ? 'Cargando.....' : 'Seleccione'}
            />
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