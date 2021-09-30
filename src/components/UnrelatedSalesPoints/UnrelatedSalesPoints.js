import { useEffect, useState } from 'react';
import Select, { createFilter } from 'react-select';
import { getAllSalesPoints } from '../../repositories/generalInfo';
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

export const UnrelatedSalesPoints = ({ filter, setForm, value }) => {

    const [salesPoints, setSalesPoints] = useState([]);
    const [salesPoint, setSalesPoint] = useState('');
    const [cargando, setCargando] = useState(false);

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
            getAllSalesPoints(filter).then(salespoints => {
                if (salespoints) {
                    overlay(false);
                    setCargando(false);
                    setSalesPoints(salespoints);
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
            <label>Punto de venta no relacionado</label>
            <Select
                components={{ MenuList }}
                captureMenuScroll={false}
                filterOption={createFilter({ ignoreAccents: false })}
                placeholder={(cargando) ? 'Cargando.....' : 'Seleccione'} isMulti
                closeMenuOnSelect={false}
                styles={ColourStyles}
                onChange={handleSalesPointUpdate}
                value={salesPoint}
                disabled={!salesPoint?.length}
                options={salesPoints}
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
