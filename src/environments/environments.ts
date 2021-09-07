import { Dashboard } from "../pages/Dashboard/Dashboard.js";
import { Bienestar } from "../pages/Bienestar/bienestar.js";
import { MiBilletera } from "../pages/Bienestar/MiBilletera/MiBilletera.js";
import { Login } from "../pages/Login/Login.js";
import { routesRrhh } from "../pages/Rrhh/routes.js";
import { Sst } from "../pages/Sst/Sst.js";
import { EncuestaRiesgoCovid } from "../pages/Encuestas/EncuestaRiesgoCovid/EncuestaRiesgoCovid.js";
import { routesAyuda } from "../pages/Ayuda/routes.js";
import { MainCV } from "../pages/MainCV/MainCV.js";
import { MenuCV } from "../components/Menus/MenuCV/MenuCV.js";
import { Navbar } from "../components/Navbars/MainNavBar/Navbar.js";
import { routesIncapacidad } from "../pages/Incapacidad/routes.js";
import { Desarrollo } from "../pages/Desarrollo/Desarrollo.js";
import { Report } from "../pages/Report/Report.js";
import { CartaPresentacion } from "../pages/Certificados/CartaPresentacion/CartaPresentacion.js";
import { Ingreso } from "../pages/Ingreso/Ingreso.js";
import { CercoEpidemeologico } from "../pages/Encuestas/CercoEpidemeologico/CercoEpidemeologico.js";
import { CasosCovid } from "../pages/Encuestas/CasosCovid/CasosCovid.js";

const frontendPath = window.location.protocol + '//' + window.location.host;
const backendPath = 'http://localhost:3001/api/v1';

const menus = {
    MenuCV: {
        url: '/cv',
        component: MenuCV
    },
    Navbar: {
        url: '',
        component: Navbar
    }
};

const routes = {
    root: { url: '/', componente: Dashboard },
    home: { url: '/home', componente: Dashboard },
    login: { url: '/login', componente: Login },
    desarrollo: { url: '/desarrollo', componente: Desarrollo },
    rrhh: routesRrhh,
    sst: { url: '/sst', componente: Sst },
    encuestaCasosCovid: { url: '/encuestaCasosCovid', componente: CasosCovid },
    encuestaRiesgoCovid: { url: '/encuestaRiesgoCovid', componente: EncuestaRiesgoCovid },
    encuestaCerco: { url: '/encuestaCercoEpidemeologico', componente: CercoEpidemeologico },
    bienestar: { url: '/bienestar', componente: Bienestar },
    miBilletera: { url: '/mi_billetera', componente: MiBilletera },
    ayuda: routesAyuda,
    incapacidad: routesIncapacidad,
    cv: {
        subPages: {
            main: { url: '/cv/main', componente: MainCV }
        }
    },
    certificados: {
        subPages: {
            cartaPresentacion: {
                url: '/certificados/carta_presentacion',
                componente: CartaPresentacion
            }
        }
    },
    ingreso: { url: '/ingreso', componente: Ingreso },
    report: {
        url: '/report',
        componente: Report
    }
};

const files = {
    novedadesEmpresariales: { url: `${frontendPath}/assets/documents/novedades_empresariales.pdf` }
};

const api = {
    path: backendPath,
    getAllMenu: `${backendPath}/navigator/`,
    getSurveysCovid: `${backendPath}/surveys/covid`,
    getSurveysFence: `${backendPath}/surveys/epidemiologicalFence`,
    getSurveysHealthCondition: `${backendPath}/surveys/healthCondition`,
    getTokenPath: `${backendPath}/auth/login`,
    getUserInfoPath: `${backendPath}/auth/me`,
    getDocumentTypes: `${backendPath}/documentType/get`,
    getAllEps: `${backendPath}/eps/get`,
    getForYouCategory: `${backendPath}/rrhh/for_you_categories`,
    getresourceRequestCategory: `${backendPath}/rrhh/resource_request_categories`,
    postSaveFormRRHH: `${backendPath}/rrhh/saveFormRRHH`,
    getRequestHelpCategories: `${backendPath}/help/requestsHelpCategory`,
    postSaveFormHelp: `${backendPath}/help/saveFormHelp`
};

export {
    menus,
    routes,
    api,
    files,
    frontendPath,
    backendPath
}