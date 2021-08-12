import React, { useState, useEffect } from 'react';
import { CategoriaMenuPrincipal } from '../CategoriaMenuPrincipal/CategoriaMenuPrincipal';

export const MenuPrincipal = ({ k, setMenu }) => {

    let menu = [];

    useEffect(() => {

        const getMenu = () => {
            setMenu([]);

            fetch('http://localhost:3001/api/v1/navigator/')
                .then(data => data.json())
                .then(data => data, err => { console.log('Error ', err) });
            
        };

        menu = getMenu();
        setMenu(menu);
    }, []);


    return (menu && menu.subMenus) ?

        <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav" style={{ padding: '13px', paddingTop: '0px' }}>{
            menu.subMenus.map((categoria, b) => (
                <CategoriaMenuPrincipal k={ k+'_'+(b+1) } key={ k+'_'+(b+1) } categoria={ categoria } />
            ))}
        </ul>
        :
        <></>
};