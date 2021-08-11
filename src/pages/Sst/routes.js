import { Sst } from "./Sst.js";
import { Sstform } from "../SstForm/Sstform.js";

export const routesSst = {
    url: '/sst',
    componente: Sst,
    subPages: {
        // reporteCasoCovid: { url: '/sst/reporte-caso-covid', componente: Sstform, },
        cercoEpidemiologico: { url: '/sst/cerco-epidemiologico', componente: "", },
        encuestaRiesgoCovid: { url: '/sst/encuesta-riesgo-covid', componente: "", },
    }
}


