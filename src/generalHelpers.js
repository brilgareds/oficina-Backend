import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
import { routes } from './environments/environments';

const getFetch = async ({ url, set }) => {

    try {
        const headers = {
            'Authorization': (!localStorage.getItem('a_t')) ? '' : `Bearer ${localStorage.getItem('a_t')}`,
            'accept': '*/*',
            'Content-Type': 'application/json'
        }
        const result = await (await axios.get(url, { headers })).data;

        if (typeof set === 'function') set(result);

        return result;

    } catch (e) {
        const error = e.toString();

        if (error === 'Error: Request failed with status code 402') {

        }
        console.log(error);
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
        href: (['R', 'M'].includes(tipoAccion)) ? redireccionar : `#${k}`,
        dataBsTarget: (tipoAccion === 'RI') ? '#modalImagenRedireccion' : '',
        dataBsToggle: (tieneSubMenus) ? 'collapse' : ((tipoAccion === 'RI') ? 'modal' : ''),
        titulo, recurso, tipoAccion, clasesIcono, descripcion, redireccionar, tieneSubMenus
    };

    return response;
};


const getDotOrCommaPosition = (value) => {
    const dotPosition = value.indexOf('.');
    const commaPosition = value.indexOf(',');

    const response = (
        (dotPosition >= 0) ? dotPosition :
            (commaPosition >= 0) ? commaPosition : -1
    );

    return response;
};


const removeNotNumber = text => text.replaceAll(/[^0-9.,]+/gm, '');

const changeCommaToDot = text => text.replaceAll(',', '.').replaceAll(/[.]+/gm, '.');

const formatDecimals = text => changeCommaToDot(removeNotNumber(text));


const specificDecimals = (value = 0, quantityDecimals = 0) => {

    if (quantityDecimals) quantityDecimals++;

    const dotOrCommaPosition = getDotOrCommaPosition(value);

    if (dotOrCommaPosition === 0) {
        value = (quantityDecimals) ? `0${value}` : value.substring(1);
    }

    const maxQuantityCharacters = (dotOrCommaPosition && value[dotOrCommaPosition]) ? parseFloat(dotOrCommaPosition) + quantityDecimals : value.length;
    value = formatDecimals(value.substring(0, maxQuantityCharacters)); // value[value.length-1]).toString();

    return value;
};


const getTwoLastCharacters = text => text.substring(text.length - 2);


const currentDate = (obj = {}) => {

    const { format = 'spanish', withTime = true } = obj;

    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const month = getTwoLastCharacters(`0${dateNow.getMonth() + 1}`);
    const day = getTwoLastCharacters(`0${dateNow.getDate()}`);
    const hour = getTwoLastCharacters(`0${dateNow.getHours()}`);
    const minutes = getTwoLastCharacters(`0${dateNow.getMinutes()}`);
    const seconds = getTwoLastCharacters(`0${dateNow.getSeconds()}`);
    const time = `${hour}:${minutes}:${seconds}`;

    const englishDate = `${year}-${month}-${day}`;
    const spanishDate = `${day}/${month}/${year}`;

    const date = (
        (format === 'english') ? englishDate :
            (format === 'spanish') ? spanishDate : ''
    );

    const fullDate = `${date} ${(withTime) ? ` ${time}` : ''}`;

    return fullDate;
}


const postFetch = async ({
    url,
    params,
    headers = {
        'Authorization': (!localStorage.getItem('a_t')) ? '' : `Bearer ${localStorage.getItem('a_t')}`,
        'accept': '*/*',
        'Content-Type': 'application/json'
    }
}) => {

    let responseApi = null;

    try {
        responseApi = (await axios.post(url, params, { headers })).data;

        return responseApi;
    } catch (error) {

        (error.message.includes("402")) && (logOutHelper());
        return error;
    }

}

const getFetchWithHeader = async ({
    url,
    headers = {
        'Authorization': (!localStorage.getItem('a_t')) ? '' : `Bearer ${localStorage.getItem('a_t')}`,
        'accept': '*/*',
        'Content-Type': 'application/json'
    }
}) => {

    let responseApi = null;

    try {
        responseApi = (await axios.get(url, { headers: headers })).data;

        return responseApi;
    } catch (error) {
        (error.message.includes("402")) && (logOutHelper());
        console.error(error);
    }

}

const overlay = (show = false) => {
    if (show === true) {
        Swal.fire({
            title: "<h3>Cargando...</h3>",
            html: "<div class='spinner-border text-primary' style='width: 3rem; height: 3rem; margin: 10px; margin-top: unset;' role='status'><span class='sr-only'>Loading...</span></div>",
            showCancelButton: false,
            showConfirmButton: false
        });
    } else if (show === false) {
        Swal.close();
    }
}

const makeWarningAlert = (props) => {

    const { errors = [], title = 'Advertencia', subTitle = 'Revisa el formulario con las siguientes indicaciones:' } = props;

    Swal.fire({
        title,
        html: `
            <div className="row">
                <div className="col-12 col-lg-12" style="text-align: left; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                    ${subTitle}
                </div>
                <div className="col-12 col-lg-12" style="text-align: left; font-size: 15px;">${errors.map(({ description }) => {
            return `◉ ${description}<br/>`
        })}
                </div>
            </div>
             <br/>
            
        `,
        icon: 'warning',
        confirmButtonText: 'Cerrar',
    });
};


const advertenciaFormularioVacio = () => {
    Swal.fire({
        title: 'Advertencia',
        html: `
            <div className="row">
                <div className="col-12 col-lg-12" style="text-align: left; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                    Revisa el formulario con las siguientes indicaciones:
                </div>
                <div className="col-12 col-lg-12" style="text-align: left; font-size: 15px;">
                    ◉ Los campos no deben estar vacios <br/>
                    ◉ No se permiten carácteres especiales Eje: !"#$%&/() <br/>
                    ◉ Debes seleccionar almenos una opción de los campos seleccionables <br/>
                </div>
            </div>
             <br/>
            
        `,
        icon: 'warning',
        confirmButtonText: 'Cerrar',
    });
}

const capitalizarPalabras = (val) => {

    return val.toLowerCase()
        .trim()
        .split(' ')
        .map(v => v[0].toUpperCase() + v.substr(1))
        .join(' ');
};

const upperFirtLetterText = (text='') => {
    if (typeof text !== 'string' || !text.length) return text;

    return text[0].toUpperCase() + text.slice(1).toLowerCase();
};

const getFullUser = () => {
    let user = {};

    if (localStorage.getItem('d_u') && JSON.parse(localStorage.getItem('d_u'))) {
        user = JSON.parse(localStorage.getItem('d_u'));
    }

    return user;
};

const getBranches = () => {

    let branches = [];

    if (localStorage.getItem('branches') && JSON.parse(localStorage.getItem('branches'))) {
        branches = JSON.parse(localStorage.getItem('branches'));
    }

    return branches;
};

const getCities = () => {
    let cities = [];

    if (localStorage.getItem('cities') && JSON.parse(localStorage.getItem('cities'))) {
        cities = JSON.parse(localStorage.getItem('cities'));
    }

    return cities;
}

const getEmailUser = () => (getFullUser().mail || '');
const getGenderUser = () => (getFullUser().genero || '');
const getStatusUser = () => (getFullUser().estado || '');
const getDocumentIdUser = () => (getFullUser().cedula || '');
const getNameUser = () => (getFullUser().nombres || '').trim();
const getLastNameUser = () => (getFullUser().apellidos || '').trim();
const getPhoneUser = () => (getFullUser().numeroCelular || '').trim();
const getFullNameUser = () => (capitalizarPalabras(`${getNameUser()} ${getLastNameUser()}`));

const getDateToday = () => {

    let dateFormat = new Date();
    let day = ("0" + dateFormat.getDate()).slice(-2);
    let month = ("0" + (dateFormat.getMonth() + 1)).slice(-2);
    let year = dateFormat.getFullYear();

    return `${year}-${month}-${day}`;

}


const changeMinutes = ({ time, operator, minutesToChange }) => {
    const itsSum = (operator === '+');
    const itsSubtraction = (operator === '-');

    if (!time || (!itsSum && !itsSubtraction) || !minutesToChange) return '';

    const arrayTime = time.split(':');
    const hour = arrayTime[0];
    const minutes = arrayTime[1];

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minutes);
    date.setSeconds('00');

    const newTime = (
        (itsSum) ? `${date.getMinutes() + minutesToChange}` :
            (itsSubtraction) ? `${date.getMinutes() - minutesToChange}` : ''
    );

    date.setMinutes(newTime);

    const newHour = getTwoLastCharacters(`0${date.getHours()}`);
    const newMinutes = getTwoLastCharacters(`0${date.getMinutes()}`);

    return `${newHour}:${newMinutes}`;
};

const logOutHelper = () => {
    localStorage.clear();
    window.location.href = routes.login.url;
}

export {
    changeMinutes,
    makeWarningAlert,
    getFetch,
    definirPropiedadesLink,
    getFetchWithHeader,
    postFetch,
    overlay,
    upperFirtLetterText,
    capitalizarPalabras,
    getFullNameUser,
    getDocumentIdUser,
    advertenciaFormularioVacio,
    currentDate,
    getFullUser,
    getGenderUser,
    getPhoneUser,
    getEmailUser,
    getStatusUser,
    specificDecimals,
    getDateToday,
    getBranches,
    getCities
}