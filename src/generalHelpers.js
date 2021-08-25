import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'universal-cookie/es6';

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


const fakeQuestions = {
    pre_1: {
        pregunta: 'En los últimos 7 días, ¿Has presentado sensación de perdida del olfato y del gusto en las comidas ó bebidas?',
        tipoRespuesta: 'S',
        respuestas: [
            {
                detalle: 'Si',
                preguntaSiguiente: 'pre_2'
            },
            {
                detalle: 'No',
                preguntaSiguiente: 'pre_2'
            }
        ]
    },

    pre_2: {
        pregunta: 'En las últimas 72 horas, ¿Has presentado fiebre?',
        tipoRespuesta: 'S',
        respuestas: [
            {
                detalle: 'Si',
                preguntaSiguiente: 'pre_3'
            },
            {
                detalle: 'No',
                preguntaSiguiente: 'pre_4'
            }
        ]
    },

    pre_3: {
        pregunta: 'Temperatura',
        tipoRespuesta: 'S',
        respuestas: [
            {
                detalle: 'De 37,5 a 38',
                preguntaSiguiente: 'pre_4'
            },
            {
                detalle: 'Mayor a 38',
                preguntaSiguiente: 'pre_4'
            }
        ]
    },

    pre_4: {
        pregunta: 'En las últimas 48 horas, ¿Has presentado tos?',
        tipoRespuesta: 'S',
        respuestas: [
            {
                detalle: 'Si',
                preguntaSiguiente: 'pre_5'
            },
            {
                detalle: 'No',
                preguntaSiguiente: 'pre_5'
            }
        ],
    },

    pre_5: {
        pregunta: 'En las últimas 48 horas, ¿Has presentado dificultad para respirar?',
        tipoRespuesta: 'S',
        respuestas: [
            {
                detalle: 'Si',
                preguntaSiguiente: 'pre_6'
            },
            {
                detalle: 'No',
                preguntaSiguiente: 'pre_6'
            }
        ],
    },


    pre_6: {
        pregunta: 'En las últimas 24 horas, ¿Te has sentido muy débil sin posibilidad de moverte?',
        tipoRespuesta: 'S',
        respuestas: [
            {
                detalle: 'Si',
                preguntaSiguiente: 'pre_7'
            },
            {
                detalle: 'No',
                preguntaSiguiente: 'pre_7'
            }
        ],
    },




    pre_7: {
        pregunta: 'En las últimas 6 horas, ¿Has presentado algún cambio en tu condición de estado físico que tenga como referencia alguno de estos síntomas?',
        tipoRespuesta: 'M',
        respuestas: [
            {
                detalle: 'CONGESTIÓN NASAL',
                preguntaSiguiente: ''
            },
            {
                detalle: 'DOLOR DE CABEZA',
                preguntaSiguiente: ''
            },
            {
                detalle: 'DOLOR DE GARGANTA',
                preguntaSiguiente: ''
            },
            {
                detalle: 'DOLOR O PRESIÓN EN EL PECHO',
                preguntaSiguiente: ''
            },
            {
                detalle: 'DOLORES MUSCULARES',
                preguntaSiguiente: ''
            },
            {
                detalle: 'FATIGA',
                preguntaSiguiente: ''
            },
            {
                detalle: 'MAREOS',
                preguntaSiguiente: ''
            },
            {
                detalle: 'OJOS LLOROSOS',
                preguntaSiguiente: ''
            },
            {
                detalle: 'NINGUNA DE LAS ANTERIORES',
                preguntaSiguiente: ''
            }
        ],
    }


    
};




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

const getFullNameUser = () => {

    const cookies = new Cookies();
    let nombreUsuario = '';

    if (cookies.get('d_u')) {
        nombreUsuario = `${cookies.get('d_u').nombres.trim()} ${cookies.get('d_u').apellidos.trim()}`;
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
    getFullNameUser
}