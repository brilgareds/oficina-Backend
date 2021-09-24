import { useEffect, useState } from 'react';
import Select, { createFilter } from 'react-select';
import { getCitiesForASpecificPerson } from '../../repositories/generalInfo';
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

export const Cities = ({ form, setForm, disabled = false }) => {

    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');

    const handleCityUpdate = (e) => {
        setCity(e);
        if (typeof setForm === 'function') setForm(e.value);
    };

    useEffect(() => {
        getCitiesForASpecificPerson().then(cities => {
            if (cities) {

                setCities(cities);

                if (form?.city) {
                    const city = cities.filter(currentValue => (currentValue.value === form?.city))?.[0] || '';
                    setCity(city);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCities]);


    return (
        <div style={{ zIndex: 11 }}>
            <label>Ciudad</label>
            <Select

                components={{ MenuList }}
                captureMenuScroll={false}
                filterOption={createFilter({ ignoreAccents: false })}

                placeholder={'Seleccione...'}
                styles={ColourStyles}
                onChange={handleCityUpdate}
                isDisabled={disabled}
                value={city}
                options={cities}
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
                value={city}
                required='required'
            />
        </div>
    )
}
