import React, { useEffect } from 'react';
import { getFullNameUser } from '../../generalHelpers';
import { Link } from 'react-router-dom';
// import { routes } from '../../environments/environments';
import './desarrollo.css';

export const Desarrollo = () => {

    useEffect(() => {
        document.getElementById('root').className = 'desarrollo';
    }, []);

    return (
        <>
            <div className="col-md-12 cabeceraRRhh paddingRRHH">
                <h3 className="tituloBienvenidoRrhh">
                    Bienvenido a 
                    <img className="logoVumBienvenido" src="/assets/img/icono-vum-office-home.png" alt="icono-vum-office-home" />
                </h3>
            </div>

            <div className="col-md-12 paddingRRHH divTitulosRRHH">
                <h3 className="tituloModulo">Desarrollo</h3>
                <span className="spanNameUserRRHH">{getFullNameUser()}</span>
                <p className="copyPage mt-4">
                    Organiza y gestiona lo que necesitas para tu desarrollo como nuestro trabajador.
                </p>
            </div>

            <div className="col-md-12 paddingRRHH text-left mb-3">
                <Link to={{ pathname: '' }} data-bs-target="#modalImagenRedireccion" img-url="img/enconstruccion.jpg" data-bs-toggle="modal">
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <span style={{ marginRight: '0.5rem', fontSize: '1.4rem' }}><i className="fas fa-exclamation-circle"></i></span>
                        Entérate
                    </button>
                </Link>

                <Link to={{ pathname: '' }} data-bs-target="#modalImagenRedireccion" img-url="img/proteccion.jpg" data-bs-toggle="modal">
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                    <span style={{ marginRight: '0.5rem', fontSize: '1.4rem' }}><i className="fas fa-user-edit"></i></span>
                        Mejora tu perfil
                    </button>
                    <br/>
                </Link>

                <Link target='_blank' to={{ pathname: 'https://www.listos.com.co/ListosWeb/vista/zonaCandidatosVista/zonaCandidatosVista.php' }} >
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <span style={{ marginRight: '0.5rem', fontSize: '1.4rem' }}><i className="fas fa-running"></i></span>
                        ¡Ya estas listo!
                    </button>
                </Link>

                <Link target='_blank' to={{ pathname: 'https://www.listos.com.co/ListosWeb/vista/zonaCandidatosVista/zonaCandidatosVista.php' }}>
                    <button className=" btns-rrhh zoomBtn mb-3" type="button">
                        <span style={{ marginRight: '0.5rem', fontSize: '1.4rem' }}><i className="fas fa-network-wired"></i></span>
                        Novedades en redes
                    </button>
                </Link>
            </div>
        </>
    )
}
