import axios from 'axios';

const getMainPath = () => window.location.protocol+'//'+window.location.host;

const getFetch = async ({ url, set }) => {

    try {
        const result = (await axios.get(url)).data;

        if (typeof set === 'function') set(result);
        
        return result;

    } catch (e) {
        console.error(e);
    }
}

export {
    getFetch,
    getMainPath
}