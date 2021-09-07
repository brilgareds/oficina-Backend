import React from 'react';

export const Simple = ({ prop, items, currentArray, agregarPregunta, formEncuesta, setFormEncuesta, tabIndex }) => {

    const updateResponse = ({prop, currentArray, PREGUNTA_SIGUIENTE_ID, respuesta}) => {

        setFormEncuesta(old_value => {
            old_value[tabIndex][prop] = { COD_ER: respuesta.COD_ER, value: null };

            return old_value;
        });

        agregarPregunta({ obj: currentArray, prop: PREGUNTA_SIGUIENTE_ID, tabIndex });
    };

    return <>
        {
            items.map(respuesta => {

                const { RESPUESTA, PREGUNTA_SIGUIENTE_ID, COD_ER } = respuesta;
                const id = `${prop}_${COD_ER}`;

                return (
                    <div className="form-check" key={ id } >
                        <input className="form-check-input" type="radio" defaultChecked={formEncuesta[tabIndex][prop]?.COD_ER === COD_ER} name={ prop } id={ id } onClick={ (e)=> updateResponse({prop, currentArray, PREGUNTA_SIGUIENTE_ID, respuesta}) } required />
                        <label className="form-check-label" htmlFor={ id }>
                            { RESPUESTA }
                        </label>
                    </div>
                );
            })
        }
    </>
};