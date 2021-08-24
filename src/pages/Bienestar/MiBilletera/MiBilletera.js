import React,{ useEffect } from 'react';
import '../bienestar.css';
import './MiBilletera.css';

export const MiBilletera = () => {

    useEffect(() => {
        document.getElementById('root').className = 'mi-billetera';
    }, []);
    
    return (
        <>
            <div className="col-md-12 cabeceraRRhh paddingRRHH">
                <h3 className="tituloBienvenidoRrhh">
                    Bienvenido a 
                    <img className="logoVumBienvenido" src="./assets/img/icono-vum-office-home.svg" alt="icono-vum-office-home" />
                </h3>
            </div>
            <div className="col-md-12 paddingRRHH divTitulosRRHH">
                <h3 className="tituloModulo">Mi Billetera</h3>
                <span className="spanNameUserRRHH"></span>
                <p className="copyPage mt-4"></p>
            </div>
        </>
    )
}
