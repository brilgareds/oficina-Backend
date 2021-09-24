import { useEffect, useState } from 'react';
import Select, { createFilter } from 'react-select';
import { getSalesPoints } from '../../repositories/generalInfo';
import { ColourStyles } from '../Inputs/Multiple/ColourStyles';
import { Component } from "react";
import { FixedSizeList as List } from "react-window";


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

    const handleSalesPointUpdate = (e) => {
        setSalesPoint(e || []);
        setForm(e || []);
    };

    useEffect(() => {

        if (filter) {
            handleSalesPointUpdate();
            getSalesPoints(filter).then(setSalesPoints);
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

                placeholder={'Seleccione...'} isMulti
                closeMenuOnSelect={false}
                styles={ColourStyles}
                onChange={handleSalesPointUpdate}
                value={salesPoint}
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
