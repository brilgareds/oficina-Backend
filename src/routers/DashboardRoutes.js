import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { Navbar } from '../components/Navbar/Navbar';
import { getAllMenu } from '../repositories/Menu/Menu';
import Footer from '../components/shared/footer/Footer';
import { routes } from '../environments/environments.ts';
import { Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie/es6';

export const DashboardRoutes = () => {

    const [menu, setMenu] = useState([]);
    const cookies = new Cookies();

    useEffect(() => {
        getAllMenu(setMenu);
    }, []);


    return (

        <>
            {
                //Si no existen las cookies con la informacion del usuario d_u = data_user
                (!cookies.get('d_u')) ?
                    <Redirect to={routes.login.url} />
                    :
                    <main className="main dashboard" id="top">
                        <div className="paddingContainer" data-layout="container">
                            <Navbar menu={menu[0]} />
                            <div className="content">
                                <Header menu={menu[1]} />
                                <div className="row p-4" id="root">
                                    <Switch>
                                        {
                                            (cookies.get('d_u').ingresoExterno) ?
                                                <>
                                                    <Route path="*" component={routes.sst.componente} />
                                                    <Redirect to={routes.sst.url} />
                                                </>
                                                :
                                                <>
                                                    <Route exact path={routes.home.url} component={routes.home.componente} />
                                                    <Route exact path={routes.rrhh.url} component={routes.rrhh.componente} />
                                                    <Route exact path={routes.rrhh.subPages.formRrhh.url} component={routes.rrhh.subPages.formRrhh.componente} />
                                                    <Route exact path={routes.sst.url} component={routes.sst.componente} />
                                                    <Route exact path={routes.bienestar.url} component={routes.bienestar.componente} />
                                                    <Redirect to={routes.home.url} />
                                                </>
                                        }
                                    </Switch>
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </main>
            }
        </>

    )
}
