import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { DashboardRoutes } from './DashboardRoutes';
import { routes } from '../environments/environments.ts';

export const AppRouter = () => {

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path={routes.login.url} component={routes.login.componente} />
                    <Route path="/" component={DashboardRoutes} />
                </Switch>
            </div>
        </Router>
    )
}
