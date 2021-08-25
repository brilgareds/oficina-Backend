import { useState, useEffect } from 'react';

export const usePreguntas = ({ preguntasRiesgoCovid, setFormEncuestaRiesgoCovid, init={} }) => {
    
    const [preguntas, setPreguntas] = useState(init);

    const agregarPregunta = (obj={}, prop) => {

        if (prop) {

            setPreguntas(() => {
    
                for (let input of document.getElementsByName(prop)) {
                    input.checked = '';
                }

                if (Object.keys(obj).length) {
                    setTimeout(() => window.location.href = `#${prop}`, 500);
                }
    
                obj[prop] = preguntasRiesgoCovid[prop];

                return obj;
            });
        }
    };

    useEffect(() => {

        if (preguntasRiesgoCovid && Object.keys(preguntasRiesgoCovid).length) {
            agregarPregunta({}, 'pre_1');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preguntasRiesgoCovid]);

    const obj = { preguntas, agregarPregunta };

    return obj;
}

