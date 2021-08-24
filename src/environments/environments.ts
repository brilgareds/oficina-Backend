import { Bienestar } from "../pages/Bienestar/bienestar.js";
import { Dashboard } from "../pages/Dashboard/Dashboard.js";
import { Login } from "../pages/Login/Login.js";
import { routesRrhh } from "../pages/Rrhh/routes.js";
import { Sst } from "../pages/Sst/Sst.js";

const frontendPath = window.location.protocol + '//' + window.location.host;
const backendPath = 'http://localhost:3001/api/v1';

const routes = {
    home: { url: '/home', componente: Dashboard },
    login: { url: '/login', componente: Login },
    rrhh: routesRrhh,
    sst: { url: '/sst', componente: Sst },
    bienestar: { url: '/bienestar', componente: Bienestar }
};

const files = {
    novedadesEmpresariales: { url: `${frontendPath}/assets/documents/novedades_empresariales.pdf` }
};

const api = {
    path: backendPath,
    getAllMenu: `${backendPath}/navigator/`,
    getTokenPath: `${backendPath}/auth/login`,
    getUserInfoPath: `${backendPath}/auth/me`,
    getDocumentTypes: `${backendPath}/documentType/get`,
    getAllEps: `${backendPath}/eps/get`,
    getForYouCategory: `${backendPath}/rrhh/for_you_categories`,
    getresourceRequestCategory: `${backendPath}/rrhh/resource_request_categories`,
    postSaveFormRRHH: `${backendPath}/rrhh/saveFormRRHH`,
};

export {
    routes,
    api,
    files
}

