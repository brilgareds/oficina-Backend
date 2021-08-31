import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';

const getFetch = async ({ url, set }) => {

    try {
        const result = (await axios.get(url)).data;
    
        if (typeof set === 'function') set(result);

        return result;

    } catch(e) {
        console.log(e.toString());
    }

};


const definirPropiedadesLink = (menu, k, first) => {
    const { descripcion, clasesIcono, titulo, redireccionar, recurso, tipoAccion, subMenus } = menu;
    const tieneSubMenus = (subMenus && subMenus.length);

    const response = {
        k,
        colorTitulo: (first) ? '' : '#5e6e82',
        collapse: (tieneSubMenus) ? 'collapse' : '',
        target: (tipoAccion === 'R') ? '_blank' : '',
        dropDown: (tieneSubMenus) ? 'dropdown-indicator' : '',
        href: (['R','M'].includes(tipoAccion)) ? redireccionar : `#${k}`,
        dataBsTarget: (tipoAccion === 'RI') ? '#modalImagenRedireccion' : '',
        dataBsToggle: (tieneSubMenus) ? 'collapse' : ((tipoAccion === 'RI') ? 'modal':''),
        titulo, recurso, tipoAccion, clasesIcono, descripcion, redireccionar, tieneSubMenus
    };

    return response;
};



/*
    tipoRespuesta
    'M' = Multiple,
    'U' = Simple,
    'A' = Abierta
    'F' = fecha
    SED  ???
    0.0  ???
    NUM  ???


    detalle: 'TXT',
*/


const fakeQuestions = [
    // tab
    {
        cod: 'tab1',
        titulo: 'Preexistencia o Comorbilidades',
        primeraPregunta: 'tab1_pre_1',
        preguntas: {
            tab1_pre_1: {
                cod: '',
                pregunta: 'Número de identificación',
                tipoRespuesta: 'N',
                respuestas: [
                    {
                        cod: 100,
                        detalle: '',
                        preguntaSiguiente: 'tab1_pre_2'
                    }
                ]
            },
            tab1_pre_2: {
                cod: '',
                pregunta: '¿Has viajado a algún lugar del territorio nacional en los últimos 30 días?',
                tipoRespuesta: 'S',
                respuestas: [
                    {
                        cod: 101,
                        detalle: 'Si',
                        preguntaSiguiente: 'tab1_pre_3'
                    },
                    {
                        cod: 102,
                        detalle: 'No',
                        preguntaSiguiente: 'tab1_pre_4'
                    }
                ]
            },
            tab1_pre_3: {
                cod: '',
                pregunta: 'Selecciona la región en la qué estuviste de viaje',
                tipoRespuesta: 'S',
                respuestas: [
                    {
                        cod: 103,
                        detalle: 'Bogota',
                        preguntaSiguiente: 'tab1_pre_4'
                    },
                    {
                        cod: 104,
                        detalle: 'Valle',
                        preguntaSiguiente: 'tab1_pre_4'
                    },
                    {
                        cod: 105,
                        detalle: 'Antioquia',
                        preguntaSiguiente: 'tab1_pre_4'
                    },
                    {
                        cod: 106,
                        detalle: 'Otras',
                        preguntaSiguiente: 'tab1_pre_4'
                    },
                ]
            },
            tab1_pre_4: {
                cod: '',
                pregunta: '¿Tienes alguna de las siguientes enfermedades o condiciones de salud de base?',
                tipoRespuesta: 'M',
                respuestas: [
                    {
                        cod: 107,
                        detalle: 'Artritis reumatoidea',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 107,
                        detalle: 'Asma moderada grave',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 107,
                        detalle: 'Diabetes mellitus',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 107,
                        detalle: 'Esta en embarazo',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 107,
                        detalle: 'Estado de inmunosupresión',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 107,
                        detalle: 'Hipertensión arterial',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 107,
                        detalle: 'Consume esteroides',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 107,
                        detalle: 'obesidad',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 107,
                        detalle: 'Sida',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 107,
                        detalle: 'Tratamiento contra el cáncer',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 107,
                        detalle: 'NINGUNA DE LAS ANTERIORES',
                        preguntaSiguiente: ''
                    },

                    
                ]
            },
            tab1_pre_5: {
                cod: '',
                pregunta: 'direccion de su domicilio',
                tipoRespuesta: 'A',
                respuestas: [

                ]
            },


            





            

        }
    },
    {
        cod: 'tab2',
        titulo: 'Sintomatología',
        primeraPregunta: 'tab2_pre_1',
        preguntas: {
            tab2_pre_1: {
                cod: '',
                pregunta: 'En los últimos 7 días, ¿Has presentado sensación de perdida del olfato y del gusto en las comidas ó bebidas?',
                tipoRespuesta: 'S',
                respuestas: [
                    {
                        cod: 1,
                        detalle: 'Si',
                        preguntaSiguiente: 'tab2_pre_2'
                    },
                    {
                        cod: 2,
                        detalle: 'No',
                        preguntaSiguiente: 'tab2_pre_2'
                    }
                ]
            },
        
            tab2_pre_2: {
                cod: '',
                pregunta: 'En las últimas 72 horas, ¿Has presentado fiebre?',
                tipoRespuesta: 'S',
                respuestas: [
                    {
                        cod: 3,
                        detalle: 'Si',
                        preguntaSiguiente: 'tab2_pre_3'
                    },
                    {
                        cod: 4,
                        detalle: 'No',
                        preguntaSiguiente: 'tab2_pre_4'
                    }
                ]
            },
        
            tab2_pre_3: {
                cod: '',
                pregunta: 'Temperatura',
                tipoRespuesta: 'S',
                respuestas: [
                    {
                        cod: 5,
                        detalle: 'De 37,5 a 38',
                        preguntaSiguiente: 'tab2_pre_4'
                    },
                    {
                        cod: 6,
                        detalle: 'Mayor a 38',
                        preguntaSiguiente: 'tab2_pre_4'
                    }
                ]
            },
        
            tab2_pre_4: {
                pregunta: 'En las últimas 48 horas, ¿Has presentado tos?',
                tipoRespuesta: 'S',
                cod: '',
                respuestas: [
                    {
                        cod: 7,
                        detalle: 'Si',
                        preguntaSiguiente: 'tab2_pre_5'
                    },
                    {
                        cod: 8,
                        detalle: 'No',
                        preguntaSiguiente: 'tab2_pre_5'
                    }
                ],
            },
        
            tab2_pre_5: {
                cod: '',
                pregunta: 'En las últimas 48 horas, ¿Has presentado dificultad para respirar?',
                tipoRespuesta: 'S',
                respuestas: [
                    {
                        cod: 9,
                        detalle: 'Si',
                        preguntaSiguiente: 'tab2_pre_6'
                    },
                    {
                        cod: 10,
                        detalle: 'No',
                        preguntaSiguiente: 'tab2_pre_6'
                    }
                ],
            },
            tab2_pre_6: {
                cod: '',
                pregunta: 'En las últimas 24 horas, ¿Te has sentido muy débil sin posibilidad de moverte?',
                tipoRespuesta: 'S',
                respuestas: [
                    {
                        cod: 11,
                        detalle: 'Si',
                        preguntaSiguiente: 'tab2_pre_7'
                    },
                    {
                        cod: 12,
                        detalle: 'No',
                        preguntaSiguiente: 'tab2_pre_7'
                    }
                ],
            },
            tab2_pre_7: {
                cod: '',
                pregunta: 'En las últimas 6 horas, ¿Has presentado algún cambio en tu condición de estado físico que tenga como referencia alguno de estos síntomas?',
                tipoRespuesta: 'M',
                respuestas: [
                    {
                        cod: 13,
                        detalle: 'Congestión nasal',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 14,
                        detalle: 'Dolor de cabeza',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 15,
                        detalle: 'Dolor de garganta',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 16,
                        detalle: 'Dolor o presión en el pecho',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 17,
                        detalle: 'Dolores musculares',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 18,
                        detalle: 'Fatiga',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 19,
                        detalle: 'Mareos',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 20,
                        detalle: 'Ojos llorosos',
                        preguntaSiguiente: ''
                    },
                    {
                        cod: 315,
                        detalle: 'Ninguna de las anteriores',
                        preguntaSiguiente: ''
                    }
                ]
            }
        }
    },
    {
        cod: 'tab3',
        titulo: 'Convivencia',
        primeraPregunta: '',
        preguntas: {

        }
    },
    {
        cod: 'tab4',
        titulo: 'Evaluación actos ocupacionales',
        primeraPregunta: '',
        preguntas: {

        }
    },
    {
        cod: 'tab5',
        titulo: 'Actualizacion datos personales',
        primeraPregunta: '',
        preguntas: {

        }
    }
];




const getFakePreguntasRiesgoCovid = async() => {

    try {
        
        const response = fakeQuestions;

        return response;

    } catch(e) {
        console.log(e.toString());
    }


};


const postFetch = async ({
    url,
    params,
    headers = {
        'accept': '*/*',
        'Content-Type': 'application/json'
    }
}) => {

    let responseApi = null;

    try {
        responseApi = (await axios.post(url, params, headers)).data;

        return responseApi;
    } catch (error) {
        throw new Error(error);
    }

}

const getFetchWithHeader = async ({
    url,
    headers,
}) => {

    let responseApi = null;

    try {
        responseApi = (await axios.get(url, { headers: headers })).data;

        return responseApi;
    } catch (error) {
        console.error(error);
    }

}

const overlay = () => {
    Swal.fire({
        title: "<h3>Cargando...</h3>",
        html: "<div class='spinner-border text-primary' style='width: 3rem; height: 3rem; margin: 10px; margin-top: unset;' role='status'><span class='sr-only'>Loading...</span></div>",
        showCancelButton: false,
        showConfirmButton: false
    });
}

const capitalizarPalabras = (val) => {

    return val.toLowerCase()
        .trim()
        .split(' ')
        .map(v => v[0].toUpperCase() + v.substr(1))
        .join(' ');
}


const getDocumentId = () => {

    let documentId = '';

    if (localStorage.getItem('d_u') && JSON.parse(localStorage.getItem('d_u')) && JSON.parse(localStorage.getItem('d_u')).cedula) {
        documentId = JSON.parse(localStorage.getItem('d_u')).cedula;
    }

    return documentId;
};

const getFullNameUser = () => {

    let nombreUsuario = '';

    if (localStorage.getItem('d_u')) {
        nombreUsuario = `${JSON.parse(localStorage.getItem('d_u')).nombres.trim()} ${JSON.parse(localStorage.getItem('d_u')).apellidos.trim()}`;
    }

    return capitalizarPalabras(nombreUsuario);
}

export {
    getFetch,
    definirPropiedadesLink,
    getFakePreguntasRiesgoCovid,
    getFetchWithHeader,
    postFetch,
    overlay,
    capitalizarPalabras,
    getFullNameUser,
    getDocumentId
}