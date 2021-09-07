import { useState, useEffect } from 'react';

export const usePreguntas = ({ existeProximoTab, setFormEncuesta, formEncuesta, encuesta, tabIndex, nextTab, init={}, currentQuestions, setCurrentQuestions }) => {

    const { questions=[], primeraPregunta='' } = encuesta;
    
    const [preguntas, setPreguntas] = useState(init);

    const handleSubmit = (e) => {
        e.preventDefault();

        nextTab();
    };

    const setFormWithCurrentQuestions = ({obj, prop, tabIndex}) => {

        setFormEncuesta(old_value => {

            let newValue = {};
    
            for (const key in obj) {
                const valor = old_value[tabIndex][key];

                if (valor) newValue[key] = valor;
            }
            old_value[tabIndex] = newValue;

            return old_value;
        });
        
        // notCheckedNextQuestions({obj, prop});

        return obj;
    };

    const focusInNextQuestions = (obj, prop) => {
        if (prop) {
            // if (Object.keys(obj).length) setTimeout(() => window.location.href = `#${prop}`, 200);
        }
    };

    /*
    const notCheckedNextQuestions = ({prop, obj}) => {

        if (Object.keys(obj).length > 1) {
            for (const input of document.getElementsByName(prop)) {
                input.checked = '';
            }
        }
    };
    */

    const getNextQuestion = prop => questions[prop];
    

    const agregarPregunta = ({ obj={}, prop, tabIndex }) => {        

        const newQuestions = setFormWithCurrentQuestions({obj, prop, tabIndex});

        setPreguntas(() => newQuestions);

        if (prop) {
            obj[prop] = getNextQuestion(prop);
            focusInNextQuestions(obj, prop);
        }

        setCurrentQuestions(old_value => {
            return {
                ...old_value, [tabIndex]: obj 
            }
        });
    };

    useEffect(() => {

        if (Object.keys(questions).length && questions[primeraPregunta]) {
            agregarPregunta({ prop: primeraPregunta, tabIndex, obj: init });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions]);

    const obj = { agregarPregunta, preguntas, handleSubmit, currentQuestions, setCurrentQuestions };

    return obj;
}

