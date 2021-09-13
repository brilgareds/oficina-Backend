import { api } from "../../environments/environments";
import { getFetchWithHeader, postFetch } from "../../generalHelpers";

const getUserInfoResponse = async () => {

    const options = {
        url: api.getUserInfoPath,
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('a_t')
        }
    };

    const response = await getFetchWithHeader(options);

    return response;
};

const generateToken = async ({ identification }) => {

    return await postFetch({  // Realizamos el consumo para obtener el refresh_token y el access_token mandando la cedula del usuario
        url: api.getTokenPath,
        params: { identification: Number(identification) }
    });
};


export {
    generateToken,
    getUserInfoResponse
}