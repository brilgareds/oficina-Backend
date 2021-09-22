import { api } from "../../environments/environments";
import { postFetch } from "../../generalHelpers";

const saveCheckIn = async({params}) => {

    const url = api.saveCheckIn;
    const response = await(await(url ? postFetch({ url, params }) : {}) || {});

    return response;
};

const saveCheckOut = async({params}) => {

    const url = api.saveCheckOut;
    const response = await(await(url ? postFetch({ url, params }) : {}) || {});

    return response;
};

export {
    saveCheckIn,
    saveCheckOut
}