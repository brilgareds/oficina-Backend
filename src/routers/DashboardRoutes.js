import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Navbar } from '../components/Navbar/Navbar';
import Footer from '../components/shared/footer/Footer';
import { environment } from '../environments/environments.ts';

export const DashboardRoutes = () => {

    const { path } = environment;
    const [menu, setMenu] = useState([]);

    useEffect(() => {

        console.log("useEffect");

        const getMenu = () => {

            fetch('http://localhost:3001/api/v1/navigator/')
                .then(data => data.json())
                .then(data => { setMenu(data) }, err => { console.log('Error is: ', err); setMenu([]) });

        };

        getMenu();
    }, []);


    return (

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
