import { Dashboard } from "../pages/Dashboard/Dashboard.js";
import { Login } from "../pages/Login/Login.js";
import { routesRrhh } from "../pages/Rrhh/routes.js";
import { Sst } from "../pages/Sst/Sst.js";

export const environment = {
    path: {
        home: { url: '/home', componente: Dashboard },
        login: { url: '/login', componente: Login },
        rrhh: routesRrhh,
        sst: { url: '/sst', componente: Sst },
    }
}

