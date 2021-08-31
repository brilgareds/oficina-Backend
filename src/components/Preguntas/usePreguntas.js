import { useState, useEffect } from 'react';

export const usePreguntas = ({ encuesta, tabIndex, nextTab, init={}, currentQuestions, setCurrentQuestions }) => {

    const { preguntas: allQuestions=[], primeraPregunta='' } = encuesta;
    
    const [preguntas, setPreguntas] = useState(init);

    const esRespuestaUnica = respuesta => {
        respuesta.single = (respuesta?.detalle?.toLowerCase() === 'ninguna de las anteriores') ?? false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        nextTab();
    }

    const agregarPregunta = ({ obj={}, prop, tabIndex }) => {

        console.log('test');

        if (prop) {

            setPreguntas(() => {

                if (Object.keys(obj).length) setTimeout(() => window.location.href = `#${prop}`, 200)
                else {
                    for (const input of document.getElementsByName(prop)) {
                        input.checked = '';
                    }
                }

                obj[prop] = allQuestions[prop];

                setCurrentQuestions(old_value => ({ ...old_value, [tabIndex]: obj }));

                return obj;
            });
        }
    };

    useEffect(() => {

        if (Object.keys(allQuestions).length && allQuestions[primeraPregunta]) {
            agregarPregunta({ prop: primeraPregunta, tabIndex, obj: init });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allQuestions]);

    const obj = { agregarPregunta, preguntas, esRespuestaUnica, handleSubmit, currentQuestions, setCurrentQuestions };

    return obj;
}

