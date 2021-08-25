import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { Navbar } from '../components/Navbars/MainNavBar/Navbar';
import { getAllMenu } from '../repositories/Menu/Menu';
import Footer from '../components/shared/footer/Footer';
import { routes } from '../environments/environments.ts';
import { Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie/es6';
import { MenuCV } from '../components/Menus/MenuCV/MenuCV';

export const DashboardRoutes = () => {

    const [menu, setMenu] = useState([{},{}]);
    const cookies = new Cookies();

    useEffect(() => {
        getAllMenu(setMenu);
    }, []);

    const obtenerRutas = (newRoutes, arrayRoutes=[], k='route') => {

        if (!arrayRoutes.length && cookies.get('d_u').ingresoExterno) {
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
                (!cookies.get('d_u')) ?
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
                            
                            <div className="content">
                                <Header menu={menu[1]} />
                                <div className="dashboard" id="root" style={{ minHeight: '94.7vh' }}>
                                    <div className="container-2">
                                        <Switch>
                                            { obtenerRutas(routes) }
                                        </Switch>
                                    </div>
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </main>
            }
        </>
    )
}
