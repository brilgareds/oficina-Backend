import { useState, useEffect } from 'react';
import { getSurveys, saveSurveys } from '../../repositories/Encuestas/Encuentas';
import { makeModal } from '../../generalHelpers';

export const useEncuestas = ({ tipoEncuesta = '' }) => {

    const [tabIndex, setTabIndex] = useState(0);
    const [encuestas, setEncuestas] = useState([]);
    const [formEncuesta, setFormEncuesta] = useState([]);
    const [currentQuestions, setCurrentQuestions] = useState({});
    const [formularioEnviado, setFormularioEnviado] = useState(false);
    const [dataReport, setDataReport] = useState({});

    useEffect(() => {

        document.getElementById('root').className = 'encuesta';

        getSurveys({ tipoEncuesta }).then(setEncuestas);
    }, [tipoEncuesta]);

    const generarReporte = (({ response }) => {
        setDataReport(response);
        setFormularioEnviado(true);
    });

    const formatRespuestas = (formEncuesta) => {
        let respuestas = [];

        const filtro = formEncuesta.reduce((acc, el) => ({ ...acc, ...el }), {})

        for (let prop in filtro) {
            let obj = filtro[prop];
            const esArray = Array.isArray(obj);

            if (!esArray) respuestas.push(filtro[prop])
            else {
                respuestas = [...respuestas, ...obj.map(({ value }) => ({ codeER: value, value: null }))];
            }
        }

        return respuestas
    };


    const respuestasConfirmadas = (evt, value) => {

        const params = { answers: formatRespuestas(formEncuesta) };
        const data = { params, tipoEncuesta };
        let response = {};

        saveSurveys(data)
            .then(async data => {
                // if (!data || !Object.keys(data).length) throw new Error(data);

                response = data;

                const options = {
                    title: 'Respuestas guardadas correctamente!',
                    text: '¡Gracias por responder la encuesta!',
                    icon: 'success',
                    showCancelButton: true,
                    cancelButtonText: "Cerrar",
                    showConfirmButton: false,
                };

                return makeModal(options);
            })
            .then(() => generarReporte({ response, tipoEncuesta }))
            .catch(e => {
                console.log('Error: ', e);

                const options = {
                    title: '',
                    html: 'Error al guardar las respuestas<br>Intente nuevamente!',
                    icon: 'error'
                };

                return makeModal(options);
            });
    };

    const respuestasDenegadas = () => { };

    const nextTab = () => {

        if (existeProximoTab) {

            setTabIndex(currentIndex => {
                const newIndex = currentIndex + 1;
                const existeTab = encuestas[newIndex];

                if (existeTab) currentIndex = newIndex;

                return currentIndex;
            });
        } else {
            const options = {
                text: '¿Confirmar envío?',
                title: 'Encuesta finalizada',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Enviar',
                successAnswerFunction: respuestasConfirmadas,
                cancelAnswerFunction: respuestasDenegadas
            };

            makeModal(options);
        }
    };

    const existeProximoTab = (encuestas && encuestas[tabIndex + 1]);

    return {
        encuestas,
        tabIndex,
        setTabIndex,
        currentQuestions,
        setCurrentQuestions,
        existeProximoTab,
        nextTab,
        formEncuesta,
        setFormEncuesta,
        formularioEnviado,
        setFormularioEnviado,
        dataReport,
        setDataReport
    }
}