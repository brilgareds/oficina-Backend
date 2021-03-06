import { Dashboard } from "../pages/Dashboard/Dashboard.js";
import { Bienestar } from "../pages/Bienestar/bienestar.js";
import { MiBilletera } from "../pages/Bienestar/MiBilletera/MiBilletera.js";
import { Login } from "../pages/Login/Login.js";
import { routesRrhh } from "../pages/Rrhh/routes.js";
import { Sst } from "../pages/Sst/Sst.js";
import { EncuestaRiesgoCovid } from "../pages/Encuestas/EncuestaRiesgoCovid/EncuestaRiesgoCovid.js";
import { routesAyuda } from "../pages/Ayuda/routes.js";
import { MenuCV } from "../components/Menus/MenuCV/MenuCV.js";
import { routesIncapacidad } from "../pages/Incapacidad/routes.js";
import { Desarrollo } from "../pages/Desarrollo/Desarrollo.js";
import { Report } from "../pages/Report/Report.js";
import { CartaPresentacion } from "../pages/Certificados/CartaPresentacion/CartaPresentacion.js";
import { Ingreso } from "../pages/Ingreso/Ingreso.js";
import { CercoEpidemeologico } from "../pages/Encuestas/CercoEpidemeologico/CercoEpidemeologico.js";
import { CasosCovid } from "../pages/Encuestas/CasosCovid/CasosCovid.js";
import CV from "../pages/CurriculumVitae/CV";
import Education from "../pages/Education/Education";
import Family from "../pages/Family/Family.js";
import DataAdditional from "../pages/DataAdditional/Data.js";
import Salud from "../pages/Salud/Salud.js";
import LivingPlace from "../pages/LivingPlace/LivingPlave.js";
import { baseUrl } from "../config/config.js";
import { Navbar } from "../components/Navbars/MainNavBar/Navbar.js";
import { routesBeneficiarios } from "../pages/epsCaja/routes.js";


const frontendPath = window.location.protocol + '//' + window.location.host;
const backendPath = `${baseUrl}/v1`;

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
    epsCaja: routesBeneficiarios,
    cv: {
        subPages: {
            hojaVida: { url: '/cv/datos_basicos', componente: CV },
            datosBasicos: { url: '/cv/hoja_de_vida', componente: CV },
            education: { url: '/cv/educacion_formal', componente: Education },
            family: { url: '/cv/mis_familiares', componente: Family },
            dataAdditional: { url: '/cv/datos_adicionales', componente: DataAdditional },
            salud: { url: '/cv/salud', componente: Salud },
            livingPlace: { url: '/cv/vivienda', componente: LivingPlace }

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
    novedadesEmpresariales: { url: `https://controlfdata.blob.core.windows.net/vumoffice/assets/docs/novedades_vum.pdf` },
    recomendacionesGenerales: { url: `https://controlfdata.blob.core.windows.net/vumoffice/assets/docs/Recomendaciones_generales.pdf` },
};

const direccionesPorEmpresa = {
    tercerizar: {
        modulos: {
            desarrollo: {
                yaEstasListo: "https://www.listos.com.co/ListosWeb/vista/zonaCandidatosVista/zonaCandidatosVista.php",
                novedadesEnRed: "https://www.listos.com.co/ListosWeb/vista/zonaCandidatosVista/zonaCandidatosVista.php",
            },
            reglamentoTrabajo: "https://www.listos.com.co/oficinaVirtual/temporales/reglamento/Reglamento%20Interno%20de%20Trabajo%20Tercerizar_SF.pdf",

        }
    },
    visionYMarketing: {
        modulos: {
            desarrollo: {
                yaEstasListo: "https://www.visionymarketing.com.co/#Trabaja",
                novedadesEnRed: "https://www.visionymarketing.com.co/#Trabaja",
            },
            reglamentoTrabajo: "https://www.listos.com.co/oficinaVirtual/temporales/reglamento/Reglamento%20Interno%20de%20Trabajo%20V&M_SF.pdf",
        }
    },
    listos: {
        modulos: {
            desarrollo: {
                yaEstasListo: "https://www.listos.com.co/ListosWeb/vista/zonaCandidatosVista/zonaCandidatosVista.php",
                novedadesEnRed: "https://www.listos.com.co/ListosWeb/vista/zonaCandidatosVista/zonaCandidatosVista.php",
            },
            reglamentoTrabajo: "https://www.listos.com.co/oficinaVirtual/temporales/reglamento/Reglamento%20Interno%20De%20Trabajo%20Listos_SF.pdf",
        }
    },

}

const api = {
    path: backendPath,
    saveCheckIn: `${backendPath}/entrance/`,
    saveCheckOut: `${backendPath}/departure/`,
    resquestApprovalPresentationCard: `${backendPath}/presentationCard/resquestApproval/`,
    getAllBranches: `${backendPath}/branches/`,
    getCheckInAndCheckOutInfo: `${backendPath}/checkInAndCheckOut/getMainInfo/`,
    getAllCities: `${backendPath}/allCities/`,
    getCitiesForASpecificPerson: `${backendPath}/cities/`,
    getsalesPoints: `${backendPath}/cities/`,
    getAllMenu: `${backendPath}/navigator/`,
    saveSurveysCovid: `${backendPath}/surveys/covid`,
    saveSurveysEpidemiologicalFence: `${backendPath}/surveys/epidemiologicalFence`,
    saveSurveysHealthCondition: `${backendPath}/surveys/healthCondition`,
    getSurveysCovid: `${backendPath}/surveys/covid`,
    getSurveysFence: `${backendPath}/surveys/epidemiologicalFence`,
    getSurveysHealthCondition: `${backendPath}/surveys/healthCondition`,
    getTokenPath: `${backendPath}/auth/login`,
    getUserInfoPath: `${backendPath}/auth/me`,
    postLoginContratista: `${backendPath}/auth/loginContratista`,
    getDocumentTypes: `${backendPath}/documentType/get`,
    getAllEps: `${backendPath}/eps/get`,
    getForYouCategory: `${backendPath}/rrhh/for_you_categories`,
    getresourceRequestCategory: `${backendPath}/rrhh/resource_request_categories`,
    postSaveFormRRHH: `${backendPath}/rrhh/saveFormRRHH`,
    getRequestHelpCategories: `${backendPath}/help/requestsHelpCategory`,
    postSaveFormHelp: `${backendPath}/help/saveFormHelp`,
    getEpsIncapacidad: `${backendPath}/incapacity/getEpsIncapacidad`,
    getTypesIncapacity: `${backendPath}/incapacity/getTypesIncapacity`,
    getDocumentsIncapacity: `${backendPath}/incapacity/getDocumentsIncapacity`,
    postSaveDisabilityFiling: `${backendPath}/incapacity/saveDisabilityFiling`,
    postUpdateDisabilityFiling: `${backendPath}/incapacity/updateDisabilityFiling`,
    getUserIncapacities: `${backendPath}/incapacity/getUserIncapacities`,
    getUserIncapacitiesFiles: `${backendPath}/incapacity/getUserIncapacitiesFiles`,
    getUserDataIncapacity: `${backendPath}/incapacity/getUserDataIncapacity`,
    getConsultarDatosUsuarioBilletera: `${backendPath}/mywallet/getConsultarDatosUsuarioBilletera`,
    deleteGastoBilletera: `${backendPath}/mywallet/deleteGastoBilletera`,
    saveGastoBilletera: `${backendPath}/mywallet/saveGastoBilletera`,
    getBeneficiariesByUser: `${backendPath}/inclusionBeneficiarios/getBeneficiariesByUser`,
    getTipoDocumentoBeneficiario: `${backendPath}/inclusionBeneficiarios/getTipoDocumentoBeneficiario`,
    getConsultarParentesco: `${backendPath}/inclusionBeneficiarios/consultarParentesco`,
    getCajasBeneficiario: `${backendPath}/inclusionBeneficiarios/getCajasBeneficiario`,
    consultarArchivosBeneficiarios: `${backendPath}/inclusionBeneficiarios/consultarArchivosBeneficiarios`,
    saveInclusionBeneficios: `${backendPath}/inclusionBeneficiarios/saveInclusionBeneficios`,
    consultarBeneficiarios: `${backendPath}/inclusionBeneficiarios/consultarBeneficiarios`,
    consultarArchivosBenefactor: `${backendPath}/inclusionBeneficiarios/consultarArchivosBenefactor`,
    updateArchivosInclusionBeneficiarios: `${backendPath}/inclusionBeneficiarios/updateArchivosInclusionBeneficiarios`,
};

export {
    menus,
    routes,
    api,
    files,
    frontendPath,
    backendPath,
    direccionesPorEmpresa
}