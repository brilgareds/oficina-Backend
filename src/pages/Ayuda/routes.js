import { Ayuda } from "./Ayuda";
import { FormAyuda } from "./FormAyuda/FormAyuda";


export const routesAyuda = {
    url: '/ayuda',
    componente: Ayuda,
    subPages: {
        formAyuda: { url: '/form-ayuda', componente: FormAyuda },
    }
}


