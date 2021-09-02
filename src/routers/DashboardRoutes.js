import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { Navbar } from '../components/Navbars/MainNavBar/Navbar';
import { getAllMenu } from '../repositories/Menu/Menu';
import Footer from '../components/shared/footer/Footer';
import { routes } from '../environments/environments.ts';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MenuCV } from '../components/Menus/MenuCV/MenuCV';

export const DashboardRoutes = () => {

    const [menu, setMenu] = useState([{},{}]);
    const abortCont = new AbortController();

    useEffect(() => {
        getAllMenu(setMenu);
        return () => abortCont.abort();
    }, []);

    const obtenerRutas = (newRoutes, arrayRoutes = [], k = 'route') => {

        if (!arrayRoutes.length && JSON.parse(localStorage.getItem('d_u')).ingresoExterno) {
            return (
                <>
                    <Route path="*" component={routes.sst.componente} />
                    <Redirect to={routes.sst.url} />
                </>
            )
        }

        Object.keys(newRoutes).forEach(prop => {
            const key = `${k}_${prop}`;
            const { url, componente, subPages } = newRoutes[prop];

            if (url && componente) arrayRoutes.push(<Route key={key} exact path={url} component={componente} />);

            if (subPages) obtenerRutas(subPages, arrayRoutes, key);
        });

        // arrayRoutes.push(<Redirect to={routes.home.url} />);

        return arrayRoutes;
    };



    return (
        <>
            {
                //Si no existen las cookies con la informacion del usuario d_u = data_user
                (!localStorage.getItem('d_u')) ?
                    <Redirect to={routes.login.url} />
                    :
                    <main className="main">
                        <div className="paddingContainer" data-layout="container">

                            <Switch>
                                <Route path='/cv'>
                                    <MenuCV />
                                </Route>
                                <Route>
                                    <Navbar menu={menu[0]} />
                                </Route>
                            </Switch>

        <main className="main dashboard" id="top">
            <div className="paddingContainer" data-layout="container">
                <Navbar menu={menu[0]} />
                <div className="content">
                    <Header menu={menu[1]} />
                    <div className="row p-4" id="root">
                        <Switch>
                            <Route exact path={path.home.url} component={path.home.componente} />
                            <Route exact path={path.rrhh.url} component={path.rrhh.componente} />
                            <Route path={path.rrhh.subPages.formRrhh.url} component={path.rrhh.subPages.formRrhh.componente} />
                            <Route exact path={path.sst.url} component={path.sst.componente} />
                            <Route exact path={path.cv.url} component={path.cv.componente} />
                            <Redirect to={path.home.url} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </div>
        </main>
    )
}
