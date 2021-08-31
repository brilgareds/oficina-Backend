import React from 'react';

export const Simple = ({ prop, items, currentArray, agregarPregunta, formEncuestaRiesgoCovid, setFormEncuestaRiesgoCovid, tabIndex }) => {

    const updateResponse = (prop, currentArray, preguntaSiguiente, respuesta) => {

        setFormEncuestaRiesgoCovid(old_value => {

            old_value[prop] = { cod: respuesta.cod, value: null };

            console.log('\nNewForm isss: ', old_value)

            return old_value;
        });

        agregarPregunta({ obj: currentArray, prop: preguntaSiguiente, tabIndex });
    };
    

    return <>
        {
            items.map(respuesta => {

                const { detalle, preguntaSiguiente, cod } = respuesta;
                const id = `${prop}_${cod}`;
                const defaultValue = formEncuestaRiesgoCovid[prop]?.cod === cod;
                console.log('tset: ', formEncuestaRiesgoCovid)

                return (
                    <div className="form-check" key={ id } >
                        <input className="form-check-input" type="radio" defaultChecked={defaultValue} name={ prop } id={ id } onClick={ (e)=> updateResponse(prop, currentArray, preguntaSiguiente, respuesta) } required/>
                        <label className="form-check-label" htmlFor={ id }>
                            { detalle }
                        </label>
                    </div>
                );
            })
        }
    </>
};