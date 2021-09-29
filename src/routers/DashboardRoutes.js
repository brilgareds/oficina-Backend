import { useState, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { Navbar } from '../components/Navbars/MainNavBar/Navbar';
import { getAllMenu } from '../repositories/Menu/Menu';
import Footer from '../components/shared/footer/Footer';
import { routes } from '../environments/environments.ts';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MenuCV } from '../components/Menus/MenuCV/MenuCV';

export const DashboardRoutes = () => {

    const [menu, setMenu] = useState([{}, {}]);

    useEffect(() => {
        getAllMenu(setMenu);
    }, []);

    const obtenerRutas = (newRoutes, arrayRoutes = [], k = 'route') => {

        if (!arrayRoutes.length) {

            if (JSON.parse(localStorage.getItem('d_u')).ingresoExterno === true) {
                return (
                    <Switch>
                        <Route path={routes.ingreso.url} component={routes.ingreso.componente} />
                        <Route path="*" component={routes.encuestaRiesgoCovid.componente} />
                    </Switch>
                )

            } else if (JSON.parse(localStorage.getItem('d_u')).estado === "I") {
                return (
                    <Switch>
                        <Route exact={true} path={routes.home.url} component={routes.home.componente} />
                        <Route exact={true} path={routes.rrhh.url} component={routes.rrhh.componente} />
                        <Route exact={true} path={routes.ayuda.url} component={routes.ayuda.componente} />
                        <Route exact={true} path={routes.ayuda.subPages.formAyuda.url} component={routes.ayuda.subPages.formAyuda.componente} />
                        <Route exact={true} path={routes.rrhh.subPages.formRrhh.url} component={routes.rrhh.subPages.formRrhh.componente} />
                        <Route path="*" component={routes.home.componente} />
                    </Switch>
                )

            }

        }


        Object.keys(newRoutes).forEach(prop => {
            const key = `${k}_${prop}`;
            const { url, componente, subPages, exact = true } = newRoutes[prop];

            if (url && componente) arrayRoutes.push(<Route key={key} exact={exact} path={url} component={componente} />);

            if (subPages) obtenerRutas(subPages, arrayRoutes, key);
        });

        // return arrayRoutes;
        return (<Switch>{arrayRoutes}</Switch>);
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


                            <div className="content">
                                <Switch>
                                    <Route path='/cv'>
                                        <Header menu={menu[1]} />
                                    </Route>
                                    <Route>
                                        <Header menu={menu[1]} />
                                    </Route>
                                </Switch>

                                <div className="dashboard" id="root" style={{ minHeight: '94.7vh' }}>
                                    <div className="container-2">

                                        {obtenerRutas(routes)}

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
