import React, { useEffect } from 'react';
import './estilos-vum-office.css';
import './dashboard.css';
import { CardsOficina } from '../../components/cards-oficina/CardsOficina';
import { ImportanBottons } from '../../components/ImportantBottons/ImportanBottons';
export const Dashboard = () => {

    useEffect(() => {
        document.getElementById('root').className = 'dashboard';
    }, [])

    return (
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

                        <ImportanBottons />
                    </div>
                </div>
            </div>
        </div>
    )
}
