import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { Navbar } from '../components/Navbar/Navbar';
import { getAllMenu } from '../repositories/Menu/Menu';
import Footer from '../components/shared/footer/Footer';
import { routes } from '../environments/environments.ts';
import { Redirect, Route, Switch } from 'react-router-dom';

export const DashboardRoutes = () => {

    const [menu, setMenu] = useState([{},{}]);

    useEffect(() => {
        getAllMenu(setMenu);
    }, []);
    

    return (
        <main className="main">
            <div className="paddingContainer" data-layout="container">
                <Navbar menu={ menu[0] } />
                <div className="content">
                    <Header menu={menu[1]} />
                    <div className="dashboard" id="root" style={{ minHeight: '94.7vh' }}>
                        <div className="container-2">
                            <Switch>
                                <Route exact path={routes.home.url} component={routes.home.componente} />
                                <Route exact path={routes.rrhh.url} component={routes.rrhh.componente} />
                                <Route path={routes.rrhh.subPages.formRrhh.url} component={routes.rrhh.subPages.formRrhh.componente} />
                                <Route exact path={routes.sst.url} component={routes.sst.componente} />
                                <Route exact path={routes.bienestar.url} component={routes.bienestar.componente} />
                                <Route exact path={routes.miBilletera.url} component={routes.miBilletera.componente} />
                                <Route exact path={routes.encuestaRiesgoCovid.url} component={routes.encuestaRiesgoCovid.componente} />
                                <Redirect to={routes.home.url} />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </main>
    )
}
