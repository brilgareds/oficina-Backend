import { useState, useEffect } from 'react';
import { getSurveys, saveSurveys } from '../../repositories/Encuestas/Encuentas';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

export const useEncuestas = ({tipoEncuesta=''}) => {

    const [tabIndex, setTabIndex] = useState(0);
    const [encuestas, setEncuestas] = useState([]);
    const [formEncuesta, setFormEncuesta] = useState([]);
    const [currentQuestions, setCurrentQuestions] = useState({});
    const [formularioEnviado, setFormularioEnviado] = useState(false);

    useEffect(() => {

        document.getElementById('root').className = 'encuesta';

        getSurveys({tipoEncuesta}).then(setEncuestas);
    }, [tipoEncuesta]);

    const generarReporte = () => {
        
        setFormularioEnviado(true);
    };

    const formatRespuestas = (formEncuesta) => {
        let respuestas = [];

        const filtro = formEncuesta.reduce((acc, el) => ({ ...acc, ...el }), {})

        for (let prop in filtro) {
            let obj = filtro[prop];
            const esArray = Array.isArray(obj);
          
            if (!esArray) respuestas.push(filtro[prop])
            else {
                respuestas = [ ...respuestas, ...obj.map(({value}) => ({ COD_ER: value, value: null })) ];
            }
        }

        return respuestas
    };


    const respuestasConfirmadas = (evt, value) => {

        console.log('formEncuesta: ', formEncuesta);
        
        const respuestasRespondidas = formatRespuestas(formEncuesta);

        console.log('\n\nrespuestasRespondidas: ', respuestasRespondidas);

        saveSurveys(respuestasRespondidas)
            .then(response => {
                alertify.alert('Respuestas guardadas correctamente!', '¡Gracias por responder la encuesta!', generarReporte);
            })
            .catch(e => {
                console.log('Error: ', e);
                alertify.error('Error al guardar las respuestas<br>Intente nuevamente!');
            });
    };

    const respuestasDenegadas = () => {};

    const nextTab = () => {

        if (existeProximoTab) {

            setTabIndex(currentIndex => {
                const newIndex = currentIndex+1;
                const existeTab = encuestas[newIndex];
    
                if (existeTab) currentIndex = newIndex;
    
                return currentIndex;
            });
        } else {
            const content = '¿Confirmar envío?';
            const titulo  = 'Encuesta finalizada';
            const labels  = { ok: 'Enviar', cancel: 'Cancelar' };

            alertify.confirm(titulo, content, respuestasConfirmadas, respuestasDenegadas).set('labels', labels);
        }
    };
    
    const existeProximoTab = (encuestas && encuestas[tabIndex+1]);
    
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
        setFormularioEnviado
    }
}