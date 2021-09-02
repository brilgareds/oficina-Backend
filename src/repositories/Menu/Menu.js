import { api } from "../../environments/environments";
import { getFetch } from "../../generalHelpers";


const getAllMenu = (set) => {
    const url = api.getAllMenu;
    getFetch({ url, set });
};


export {
    getAllMenu
}