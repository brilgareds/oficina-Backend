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
                    pregunta.responses[0].PREGUNTA_SIGUIENTE_ID = question.questions[i + 1]?.ID || '';
                }

                pregunta.responses.forEach((response, j) => {
                    pregunta.responses[j].codeER = pregunta.responses[j].COD_ER;
                    delete pregunta.responses[j].COD_ER;

                    if (pregunta.SELECCION === 'M') {
                        pregunta.responses[j].single = (response.RESPUESTA.toLowerCase().includes('ninguna'));
                    }
                });

                pregunta.responses.sort((a, b) => ((
                    (a.PUNTOS < b.PUNTOS) ? 1 :
                        (a.PUNTOS > b.PUNTOS) ? -1 : 0
                )));

                newQuestion[pregunta.ID] = pregunta;
            });

            question.primeraPregunta = question.questions[0]?.ID || '';
            question.questions = newQuestion;

            return question;
        });
    }

    return newQuestions;
};


const getSurveys = async ({ tipoEncuesta = '' }) => {

    const url = (
        (tipoEncuesta === 'casosCovid') ? api.getSurveysCovid :
            (tipoEncuesta === 'cercoEpidemeologico') ? api.getSurveysFence :
                (tipoEncuesta === 'riesgoCovid') ? api.getSurveysHealthCondition : ''
    );

    let surveys;
    const dataUser = JSON.parse(localStorage.getItem('d_u'));

    if (dataUser.ingresoExterno === true) {

        const params = {
            apellidos: dataUser.apellidos,
            area: dataUser.area,
            cargo: dataUser.cargo,
            cedula: dataUser.cedula,
            eps: dataUser.eps,
            genero: dataUser.genero,
            externo: true,
            mail: dataUser.mail,
            nombres: dataUser.nombres,
            numeroCelular: dataUser.numeroCelular,
            tipoDocumento: dataUser.tipoDocumento,
            name: dataUser.nombres,
            last_name: dataUser.apellidos,
            identification: dataUser.cedula,
        };

        const tokens = await (await (url ? postFetch({ url: api.postLoginContratista, params: { params } }) : {}) || {});

        localStorage.setItem('a_t', tokens.access_token);  // access_token
        localStorage.setItem('r_t', tokens.refresh_token); // refresh_token

        surveys = await (await (url ? getFetch({ url }) : {}) || {});


    } else {

        surveys = await (await (url ? getFetch({ url }) : {}) || {});
    }
    const response = formatSurveys(surveys.data);

    return response;
};


const saveSurveys = async ({ params, tipoEncuesta }) => {

    const url = (
        (tipoEncuesta === 'casosCovid') ? api.saveSurveysCovid :
            (tipoEncuesta === 'riesgoCovid') ? api.saveSurveysHealthCondition :
                (tipoEncuesta === 'cercoEpidemeologico') ? api.saveSurveysEpidemiologicalFence : ''
    );
    const response = (await (await (url ? postFetch({ url, params }) : {}) || {})) || {};

    return response?.data || {};
};


export {
    getSurveys,
    saveSurveys
}