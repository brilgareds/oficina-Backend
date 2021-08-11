import React from 'react';
import './login.css';

export const Login = () => {


    return (
        <main className="main login" id="top">
            <div className="container" data-layout="container">

                <div className="row flex-center min-vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 text-center">
                        <a href=".#" className="d-flex flex-center mb-3">
                            <img className="me-2" src="assets/img/logo-vum-login.svg" alt="" width="158" />
                        </a>
                        <span className="font-sans-serif fontBienvenido fs-5 d-inline-block tituloBienvenido">¡Bienvenido a tu oficina virtual!</span>
                        <div>
                            <div className="card-body p-4 p-sm-5 mt-2">
                                <form>
                                    <div className="mb-3 text-center">
                                        <label className="labelInpiut">Por favor digita tu cédula</label>
                                        <input className="form-control inputsFormulario" type="text" autoComplete="off" />
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btnIniciarSesion d-block w-100 mt-3 fontLinkLabel" type="submit" name="submit">Ingresar</button>
                                    </div>
                                </form>
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
    )
}
