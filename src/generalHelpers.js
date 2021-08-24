import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'universal-cookie/es6';

const getMainPath = () => window.location.protocol + '//' + window.location.host;

const getFetch = async ({ url, set }) => {

    try {
        const result = (await axios.get(url)).data;

        if (typeof set === 'function') set(result);

        return result;

    } catch (e) {
        console.error(e);
    }
}

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
    getFetchWithHeader,
    getMainPath,
    postFetch,
    overlay,
    capitalizarPalabras,
    getFullNameUser
}