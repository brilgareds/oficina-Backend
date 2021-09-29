import React from 'react';
import './login.css';
import { useLogin } from './hooks/useLogin.js';
import { routes } from '../../environments/environments';
import { Redirect } from 'react-router-dom';


export const Login = () => {

    const { onKeyUpInputHandle, onSubmitForm, onClickContratistasHandle } = useLogin({
        identification: ''
    });

    return (
        <>
            {
                //Si existen las cookies con la informacion del usuario d_u = data_user
                (localStorage.getItem('d_u')) ?
                    <Redirect to={routes.home.url} />
                    :
                    <main className="main login" id="top">
                        <div className="container" data-layout="container">

                            <div className="row flex-center text-center min-vh-100">
                                <img className="me-2 mt-5 mb-3" src="assets/img/logo-vum-login.png" alt="logo-vum-login" style={{ width: '200px' }} />
                                <span className="font-sans-serif fontBienvenido fs-5 d-inline-block tituloBienvenido">¡Bienvenido a tu oficina virtual!</span>
                                <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 text-center">
                                    <div>
                                        <div className="card-body p-4 p-sm-5 mt-2">
                                            <form onSubmit={onSubmitForm}>
                                                <div className="mb-3 text-center">
                                                    <label className="labelInpiut">Por favor digita tu cédula</label>
                                                    <input onKeyUp={onKeyUpInputHandle} name="identification" id="identification" className="form-control inputsFormulario fontFamilyToNumber" type="number" min="1" autoComplete="off" />
                                                </div>
                                                <div className="mb-3">
                                                    <button className="btn btnIniciarSesion d-block w-100 mt-3 fontLinkLabel" type="submit" name="submit">Ingresar</button>
                                                </div>
                                            </form>
                                            <div id="divContratistas" className="mb-3 text-center divContratistas">

                                                <button onClick={onClickContratistasHandle} className="btnContratistas d-block w-100 " name="submit">
                                                    <i className="fas fa-briefcase"></i> &nbsp;
                                                    Contratistas
                                                </button> &nbsp;
                                                <a href="https://www.listos.com.co/ListosWeb/vista/zonaCandidatosVista/zonaCandidatosVista.php" target="_blank" rel="noreferrer">
                                                    <button className="btnContratistas d-block w-100 " name="submit">
                                                        <i className="fas fa-user-tie"></i> &nbsp;
                                                        Candidatos
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <footer className="footer">
                                    <div className="row mb-3 text-center">
                                        <div className="col-12 col-md-12 col-sm-auto text-center">
                                            <p className="mb-0 fontFooter"> © Derechos reservados VUM 2021 </p>
                                        </div>
                                    </div>
                                </footer>
                            </div>

                        </div>
                    </main>
            }

        </>
    )
}
