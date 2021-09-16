import { EpsCajaConsultar } from "./epsCajaConsultar/EpsCajaConsultar";
import { EpsCajaRadicar } from "./epsCajaRadicar/EpsCajaRadicar";

export const routesBeneficiarios = {
    subPages: {
        consultar: { url: '/autogestion/inclusionBeneficiarios/consultar', componente: EpsCajaConsultar },
        radicar: { url: '/autogestion/inclusionBeneficiarios/radicar', componente: EpsCajaRadicar },
    }
}
