import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { DashboardRoutes } from './DashboardRoutes';
import { environment } from '../environments/environments.ts';

export const AppRouter = () => {

    const { path } = environment;

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path={path.login.url} component={path.login.componente} />
                    <Route path="/" component={DashboardRoutes} />
                </Switch>
            </div>
        </Router>
    )
}
