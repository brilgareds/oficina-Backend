import { Dashboard } from "../pages/Dashboard/Dashboard.js";
import { Login } from "../pages/Login/Login.js";
import { Rrhh } from "../pages/Rrhh/Rrhh.js";

export const environment = {
    path: {
        home: { url: '/home', componente: Dashboard, },
        login: { url: '/login', componente: Login, },
        rrhh: { url: '/rrhh', componente: Rrhh, },
    }
}

