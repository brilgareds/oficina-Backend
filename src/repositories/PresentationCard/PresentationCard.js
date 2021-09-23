import { api } from "../../environments/environments";
import { postFetch } from "../../generalHelpers";

const ResquestApproval = async({params}) => {

    const url = api.resquestApprovalPresentationCard;
    const response = await(await(url ? postFetch({ url, params }) : {}) || {});

    return response;
};

export {
    ResquestApproval
}