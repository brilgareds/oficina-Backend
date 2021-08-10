import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { environment } from '../environments/environments.ts';

export const DashboardRoutes = () => {

    const { path } = environment;

    return (
        <Switch>
            <Route exact path={path.rrhh.url} component={path.rrhh.componente} />
            <Route exact path={path.home.url} component={path.home.componente} />
            <Redirect to={path.home.url} />
        </Switch>
    )
}
