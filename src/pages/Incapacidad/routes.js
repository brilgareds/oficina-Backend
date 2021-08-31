import { IncapacidadConsultar } from "./IncapacidadConsultar/IncapacidadConsultar";
import { IncapacidadRadicar } from "./IncapacidadRadicar/IncapacidadRadicar";


export const routesIncapacidad = {
    subPages: {
        consultar: { url: '/autogestion/incapacidad/consultar', componente: IncapacidadConsultar},
        radicar: { url: '/autogestion/incapacidad/radicar', componente: IncapacidadRadicar},
    }
}


