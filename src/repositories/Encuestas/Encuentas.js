import { api } from '../../environments/environments';
import { getFetch, postFetch } from '../../generalHelpers';

const formatSurveys = (questions) => {
    let newQuestions = [];

    if (questions) {
        newQuestions = questions.map(question => {
            
            const newQuestion = {};

            question.questions.forEach((pregunta, i) => {
                const quantityResponses = pregunta.responses.length;
                
                if (quantityResponses === 1 && !pregunta.PREGUNTA_SIGUIENTE_ID) {
                    pregunta.responses[0].PREGUNTA_SIGUIENTE_ID = question.questions[i+1]?.ID || '';
                }

                if (pregunta.SELECCION === 'M') {

                    pregunta.responses.forEach((response, j) => {
                        pregunta.responses[j].single = (response.RESPUESTA.toLowerCase().includes('ninguna'));
                    });
                }

                newQuestion[pregunta.ID] = pregunta;
            });
    
            question.primeraPregunta = question.questions[0]?.ID || '';
            question.questions = newQuestion;
    
            return question;
        });
    }

    return newQuestions;
};


const getSurveys = async({tipoEncuesta=''}) => {    

    const url = (
        (tipoEncuesta === 'casosCovid')          ? api.getSurveysCovid :
        (tipoEncuesta === 'cercoEpidemeologico') ? api.getSurveysFence :
        (tipoEncuesta === 'riesgoCovid')         ? api.getSurveysHealthCondition : ''
    );
    const surveys = await(await(url ? getFetch({ url }) : {}) || {});
    const response = formatSurveys(surveys.data);

    console.log('\nEncuesta: ', response);

    return response;
};


const saveSurveys = async(params) => {

    const url = api.saveSurveys;
    const response = await(await(url ? postFetch({ url, params }) : {}) || {});

    return response;
};


export {
    getSurveys,
    saveSurveys
}