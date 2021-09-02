import { api } from "../../environments/environments";
import { getFakePreguntasRiesgoCovid } from "../../generalHelpers";


const getPreguntasRiesgoCovid = () => {
    const url = api.getAllMenu;
    return getFakePreguntasRiesgoCovid({ url });
};


export {
    getPreguntasRiesgoCovid
}