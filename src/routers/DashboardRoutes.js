import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { Navbar } from '../components/Navbar/Navbar';
import { getAllMenu } from '../repositories/Menu/Menu';
import Footer from '../components/shared/footer/Footer';
import { routes } from '../environments/environments.ts';
import { Redirect, Route, Switch } from 'react-router-dom';

export const DashboardRoutes = () => {

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        getAllMenu(setMenu);
    }, []);
    

    return (
        <main className="main dashboard" id="top">
            <div className="paddingContainer" data-layout="container">
                <Navbar menu={ menu[0] } />
                <div className="content">
                    <Header menu={menu[1]} />
                    <div className="row p-4" id="root">
                        <Switch>
                            <Route exact path={routes.home.url} component={routes.home.componente} />
                            <Route exact path={routes.rrhh.url} component={routes.rrhh.componente} />
                            <Route path={routes.rrhh.subPages.formRrhh.url} component={routes.rrhh.subPages.formRrhh.componente} />
                            <Route exact path={routes.sst.url} component={routes.sst.componente} />
                            <Route exact path={routes.bienestar.url} component={routes.bienestar.componente} />
                            <Redirect to={routes.home.url} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </div>
        </main>
    )
}
