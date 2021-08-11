import React, { useState, useEffect } from 'react';
import './estilos-vum-office.css';
import './dashboard.css';
// import Header from '../../components/shared/header/Header';
import Footer from '../../components/shared/footer/Footer';
import { CardsOficina } from '../../components/cards-oficina/CardsOficina';
import { Navbar } from '../../components/Navbar/Navbar';
import { Header } from '../../components/Header/Header';

export const Dashboard = () => {

    
    let elementModalRedireccion = document.querySelector('#modalImagenRedireccion');
    let elementModalUrlRedireccion = document.querySelector('#modalUrlImagenRedireccion');
    let elementModalImgImagenRedireccion = document.querySelector('#modalImgImagenRedireccion');

    const [menu, setMenu] = useState([]);

    useEffect(() => {

        const getMenu = () => {

            fetch('http://localhost:3001/api/v1/navigator/')
                .then(data => data.json())
                .then(data => { setMenu(data) }, err => { console.log('Error is: ', err); setMenu([]) });
            
        };

        getMenu();
    }, []);


    const abriendoModalRedireccion = (e) => {

        const button = e.relatedTarget;
        const imgUrl = button.getAttribute('img-url');
        const urlRedireccion = button.getAttribute('img-redireccion');
        const target = (urlRedireccion && urlRedireccion !== '#') ? '_blank' : '_self';

        elementModalImgImagenRedireccion.src = (imgUrl) ? `./assets/${imgUrl}` : '';
        elementModalUrlRedireccion.href = urlRedireccion;
        elementModalUrlRedireccion.target = target;
    };

    
    elementModalRedireccion.addEventListener('show.bs.modal', abriendoModalRedireccion);



    return (
        <main className="main dashboard" id="top">
            <div className="paddingContainer" data-layout="container">
                <Navbar menu={ menu[0] } />
                <div className="content">
                    <Header menu={ menu[1] } />
                    <div className="row p-4" id="root">
                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane preview-tab-pane active" role="tabpanel" aria-labelledby="tab-dom-533ab411-31a3-4e27-87a1-2e6e0f25835c" id="dom-533ab411-31a3-4e27-87a1-2e6e0f25835c">
                                    <div className="row light">

                                        <div className="col-md-12 text-center mb-4">
                                            <img className="imgVumHeader" src="./assets/img/icono-vum-office-home.svg" alt="icono-vum-office-home" />
                                        </div>

                                        <div className="col-md-12 text-center mb-5">
                                            <h3 className="tituloComoTePodemosAyudar">¿Como te podemos ayudar?</h3>
                                            <span className="spanNombreUsuario">Jose Carlos Avila Perea</span>
                                        </div>

                                        <CardsOficina />

                                        <div className="col-md-12 text-center">
                                            <button className="btn btnVumOffice d-block w-100 mt-3 fontBtnVumOffice" type="submit" name="submit">
                                                <img className="imgControlIngresoYSalida" src="./assets/img/icono-control-ingreso-salida.svg" alt="icono-control-ingreso-salida" />
                                                Control de ingreso y salida
                                            </button>
                                            <button className="btn btnVumOffice d-block w-100 mt-3 fontBtnVumOffice" type="submit" name="submit">
                                                Califícanos y comunícate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </main>
    )
}
