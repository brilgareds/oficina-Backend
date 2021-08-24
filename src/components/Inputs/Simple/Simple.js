import React from 'react';

export const Simple = ({ prop, items, currentArray, agregarPregunta, setFormEncuestaRiesgoCovid }) => {

    const updateResponse = (e, currentArray, preguntaSiguiente, id) => {

        console.log('\n\nProp: ', prop)
        const finishId = id.substring(id.length-3).toLowerCase();
        const hasWordYes = (finishId === '_si');

        setFormEncuestaRiesgoCovid(old_value => ({ ...old_value, [prop]: hasWordYes }))

        console.log('FinishId is: ', finishId);

        /*

            setFormEncuestaRiesgoCovid(form => ({
                ...form,
                [id]: preguntasRiesgoCovid[id]
            }));

        */

        agregarPregunta(currentArray, preguntaSiguiente, id);
    };
    

    return <>
        {
            items.map(respuesta => {

                const { detalle, preguntaSiguiente } = respuesta;
                const id = `${prop}_${ detalle.toLowerCase() }`;

                return (
                    <div className="form-check" key={ id } >
                        <input className="form-check-input" type="radio" defaultChecked="" name={ prop } id={ id } onClick={ (e)=> updateResponse(e, currentArray, preguntaSiguiente, id) } />
                        <label className="form-check-label" htmlFor={ id }>
                            { detalle }
                        </label>
                    </div>
                );
            })
        }
    </>
};