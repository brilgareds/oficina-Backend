import { Dashboard } from "../pages/Dashboard/Dashboard.js";
import { Bienestar } from "../pages/Bienestar/bienestar.js";
import { MiBilletera } from "../pages/Bienestar/MiBilletera/MiBilletera.js";
import { Login } from "../pages/Login/Login.js";
import { routesRrhh } from "../pages/Rrhh/routes.js";
import { Sst } from "../pages/Sst/Sst.js";
import { EncuestaRiesgoCovid } from "../pages/Encuestas/EncuestaRiesgoCovid/EncuestaRiesgoCovid.js";

const frontendPath = window.location.protocol + '//' + window.location.host;
const backendPath = 'http://localhost:3001/api/v1';

const routes = {
    home: { url: '/home', componente: Dashboard },
    login: { url: '/login', componente: Login },
    rrhh: routesRrhh,
    sst: { url: '/sst', componente: Sst },
    encuestaRiesgoCovid: { url: '/encuestaRiesgoCovid', componente: EncuestaRiesgoCovid },
    bienestar: { url: '/bienestar', componente: Bienestar },
    miBilletera: { url: '/mi_billetera', componente: MiBilletera }
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
    files,
    frontendPath,
    backendPath
}

