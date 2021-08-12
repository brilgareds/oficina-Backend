import { FormRrhh } from "./FormRrhh/FormRrhh.js";
import { Rrhh } from "./Rrhh.js";

export const routesRrhh = {
    url: '/rrhh',
    componente: Rrhh,
    subPages: {
        formRrhh: { url: '/formRrhh', componente: FormRrhh },
    }
}


