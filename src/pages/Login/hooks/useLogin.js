import { useState, useEffect } from 'react';
import { api, routes } from '../../../environments/environments';
import { getFetchWithHeader, postFetch, overlay } from '../../../generalHelpers';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';


export const useLogin = (formInitialState = {}) => {

    const exprRegNumeros = /^[0-9+]+$/;                                                 //Expresion regular para validar el formato de solo numeros
    const exprRegTelefono = /^[0-9+() -?]+$/;                                           //Expresion regular para validar el formato de un teléfono
    const exprRegEmail = /^([a-zA-Z0-9_.-]+)@([\da-zA-Z0-9.-]+)\.([a-z.]{2,6})$/;       //Expresion regular para validar los correos electronicos
    const exprRegSoloLetras = /^[a-zA-ZÑñáéíóúÁÉÍÓÚÄËÏÖÜäëïöü\s+]+$/;                   //Expresion regular para validar solo letras
    const [formValue, setStateForm] = useState(formInitialState);
    const [modalInformation, setModalInformation] = useState({ eps: null, documentTypes: null });


    const onKeyUpInputHandle = ({ target }) => {
        setStateForm({
            ...formValue,
            [target.name]: target.value
        });
    }


    const logOut = () => {
        overlay();
        localStorage.clear();
        window.location.href = routes.login.url;
    }


    const onSubmitForm = (e) => {

        e.preventDefault();

        if (validarInputIdentificacion(formValue.identification)) {    //Si la informacion es solo tipo numero

            overlay();
            localStorage.clear();

            postFetch({     // Realizamos el consumo para obtener el refresh_token y el access_token mandando la cedula del usuario
                url: api.getTokenPath,
                params: { identification: Number(formValue.identification) }
            })
                .then((res) => {  // Si el usuario existe colocará toda la informacion consultada en la cookie d_u

                    let access_token = res.access_token;
                    let refresh_token = res.refresh_token;

                    getFetchWithHeader({
                        url: api.getUserInfoPath,
                        headers: {
                            'accept': '*/*',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_token
                        }
                    })
                        .then((getUserInfoResponse) => {

                            console.log("getUserInfoResponse", getUserInfoResponse);

                            localStorage.setItem('a_t', access_token);  // access_token
                            localStorage.setItem('r_t', refresh_token); // refresh_token
                            localStorage.setItem('d_u', JSON.stringify({
                                'nombres': getUserInfoResponse.Nombres,
                                'apellidos': getUserInfoResponse.Apellidos,
                                'cedula': getUserInfoResponse.Cedula,
                                'genero': getUserInfoResponse.Genero,
                                'mail': getUserInfoResponse.Mail,
                                'numContrato': getUserInfoResponse.NUMERO_CONTRATO,
                                'cargo': getUserInfoResponse.Cargo,
                                'area': getUserInfoResponse.Area,
                                'fechaIngreso': getUserInfoResponse.FECHA_INGRESO,
                                'fechaVencimiento': getUserInfoResponse.FECHA_VENCIMIENTO,
                                'ccostos': getUserInfoResponse.C_COSTOS,
                                'estado': getUserInfoResponse.ESTADO,
                                'empresa': getUserInfoResponse.Empresa,
                                'entidad': getUserInfoResponse.Entidad,
                                'jefe': getUserInfoResponse.Jefe,
                                'numeroCelular': getUserInfoResponse.Numero,
                            })); // data_user

                            console.log('This is: ', localStorage.getItem('d_u'))

                            window.location.href = routes.home.url;

                        });

                })
                .catch((error) => { //Si el usuario no existe le despliega una modal de alerta para ingresar como contratista


                    Swal.fire({
                        title: 'Usuario no encontrado en el sistema',
                        html: `
                        <div className="row">
                            <div className="col-12 col-lg-12" style="text-align: left; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                                Si eres un contratistas por favor ingresa por las opciones habilitadas en pantalla
                            </div>
                        </div>
                        <br/>
                    `,
                        icon: 'warning',
                        confirmButtonText: 'Cerrar',
                    });

                    document.querySelector("#divContratistas").style.display = 'unset';
                });

        }

    }


    const validarInputIdentificacion = (data) => {
        let response = false;

        if (exprRegNumeros.test(data)) {
            response = true;
        } else {        // Si la informacion no es tipo número
            Swal.fire({
                title: 'Advertencia',
                html: `
                    <div className="row">
                        <div className="col-12 col-lg-12" style="text-align: left; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                            Revisa el formulario con las siguientes indicaciones:
                        </div>
                        <div className="col-12 col-lg-12" style="text-align: left; font-size: 15px;">
                            ◉ Los campos no deben estar vacios <br/>
                            ◉ El campo solo permite números <br/>
                            ◉ No se permiten carácteres especiales Eje: !"#$%&/() <br/>
                        </div>
                    </div>
                     <br/>
                    
                `,
                icon: 'warning',
                confirmButtonText: 'Cerrar',
            });
        }

        return response;
    }


    const onClickContratistasHandle = () => {

        overlay();

        getFetchWithHeader({
            url: api.getDocumentTypes,
            headers: { 'accept': '*/*', }
        }).then((responseGetDocumentTypes) => {

            getFetchWithHeader({
                url: api.getAllEps,
                headers: { 'accept': '*/*', }
            }).then((responseGetAllEps) => {

                setModalInformation({ eps: responseGetAllEps, documentTypes: responseGetDocumentTypes });

            });
        });

    }

    useEffect(() => {
        (modalInformation.eps != null && modalInformation.documentTypes != null) && desplegarModalContratistas();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalInformation]);



    const desplegarModalContratistas = () => {

        let documentTypes = `<option value="null" selected disabled>SELECCIONE...</option>`;
        modalInformation.documentTypes.forEach(objDocumentTypes => {
            documentTypes += `<option value="${objDocumentTypes.nombre_documento}">${objDocumentTypes.nombre_documento}</option>`;
        });

        let eps = `<option value="null" selected disabled>SELECCIONE...</option>`;
        modalInformation.eps.forEach(objEps => {
            eps += `<option value="${objEps.EPS.trim()}">${objEps.EPS.trim()}</option>`;
        });

        Swal.fire({
            width: '800px',
            title: '¡¡Ingreso Externo¡¡',
            html: `
                    <div class="row" style="text-align: left; margin: 10px;">
                        <div class="col-12 col-lg-12 mb-3 text-center">
                            <span style="font-weight: 600;font-size: 20px;">Por favor ingresa los siguientes datos para ingresar al sistema</span>
                        </div>

                        <div class="col-12 col-lg-6">
                            <label class="form-label" htmlFor="correoEnvio">Tipo de Documento: </label>
                            <select id="tipoDocumento" name="tipoDocumento" class="form-control">
                                ${documentTypes}
                            </select>
                        </div>

                        <div class="col-12 col-lg-6">
                            <label class="form-label" htmlFor="cedula">Cédula:</label>
                            <input value="${formValue.identification}" id="cedula" name="cedula" class="form-control" type="text" disabled />
                        </div>

                        <div class="col-12 col-lg-6">
                            <label class="form-label" htmlFor="nombre">Nombre:</label>
                            <input id="nombre" name="nombre" class="form-control" type="text" />
                        </div>

                        <div class="col-12 col-lg-6">
                            <label class="form-label" htmlFor="apellido">Apellido:</label>
                            <input id="apellido" name="apellido" class="form-control" type="text" />
                        </div>

                        <div class="col-12 col-lg-6">
                            <label class="form-label" htmlFor="genero">Genero:</label>
                            <select id="genero" name="genero" class="form-control">
                                <option value="null" selected disabled>SELECCIONE...</option>
                                <option value="F">FEMENINO</option>
                                <option value="M">MASCULINO</option>
                            </select>
                        </div>

                        <div class="col-12 col-lg-6">
                            <label class="form-label" htmlFor="celular">Celular:</label>
                            <input id="celular" name="celular" class="form-control" type="number" />
                        </div>

                        <div class="col-12 col-lg-6">
                            <label class="form-label" htmlFor="correo">Correo:</label>
                            <input id="correo" name="correo" class="form-control" type="email" />
                        </div>

                        <div class="col-12 col-lg-6">
                            <label class="form-label" htmlFor="eps">Eps:</label>
                            <select id="eps" name="eps" class="form-control">
                                ${eps}
                            </select>
                        </div>

                        <div class="col-12 col-lg-6">
                            <label class="form-label" htmlFor="cargo">Cargo:</label>
                            <input id="cargo" name="cargo" class="form-control" type="text" />
                        </div>

                        <div class="col-12 col-lg-6">
                            <label class="form-label" htmlFor="area">Area:</label>
                            <input id="area" name="area" class="form-control" type="text" />
                        </div>

                        <div class="col-12 col-lg-12 mt-3" style="text-align: right;">
                            <button id="btnEnviarModalContratistas" type="button" class="btn btn-info">Enviar</button>
                        </div>
                    </div>
                         
                    <br/>
            `,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {

                document.getElementById('btnEnviarModalContratistas').addEventListener('click', () => {

                    let dataContratistas = {
                        'ingresoExterno': true,
                        'tipoDocumento': document.querySelector("#tipoDocumento").value,
                        'cedula': document.querySelector("#cedula").value,
                        'nombres': document.querySelector("#nombre").value,
                        'apellidos': document.querySelector("#apellido").value,
                        'genero': document.querySelector("#genero").value,
                        'numeroCelular': document.querySelector("#celular").value,
                        'mail': document.querySelector("#correo").value,
                        'eps': document.querySelector("#eps").value,
                        'cargo': document.querySelector("#cargo").value,
                        'area': document.querySelector("#area").value,
                    }

                    if (validarInfoContratista(dataContratistas)) {

                        overlay();

                        localStorage.setItem('d_u', JSON.stringify(dataContratistas)); //informacion de usuario contratista

                        window.location.href = routes.sst.url;

                    } else {

                        alertify.warning(`
                        <div className="row">
                            <div className="col-12 col-lg-12" style="text-align: center; font-size: 18px; font-weight: 800;">
                                Error.
                            </div>
                            <div className="col-12 col-lg-12" style="text-align: left; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                                Revisa el formulario con las siguientes indicaciones:
                            </div>
                            <div className="col-12 col-lg-12" style="text-align: left; font-size: 15px;">
                                ◉ Los campos no deben estar vacios <br/>
                                ◉ No se permiten carácteres especiales Eje: !"#$%&/() <br/>
                            </div>
                        </div>
                        `).delay(7);

                    }
                });

            }

        });
    }


    var el = document.getElementById('btnEnviarModalContratistas');
    if (el) {
        el.addEventListener('click', () => {
            console.log("btnEnviarModalContratistas", "sisas click aqui");

        }, false);
    }

    // let btnEnviarModalContratistas = document.getElementById('btnEnviarModalContratistas');

    // if (btnEnviarModalContratistas) {

    //     btnEnviarModalContratistas.addEventListener('click', () => {
    //     });
    // }


    const validarInfoContratista = (data) => {

        let response = false;

        if (
            data.tipoDocumento !== "null" &&
            data.genero !== "null" &&
            data.eps !== "null" &&
            exprRegNumeros.test(data.cedula) &&
            exprRegSoloLetras.test(data.nombres) &&
            exprRegSoloLetras.test(data.apellidos) &&
            exprRegTelefono.test(data.numeroCelular) &&
            exprRegEmail.test(data.mail) &&
            exprRegSoloLetras.test(data.cargo) &&
            exprRegSoloLetras.test(data.area)
        ) {
            response = true;
        }


        return response;
    }




    return ({
        onKeyUpInputHandle,
        logOut,
        onSubmitForm,
        onClickContratistasHandle,
    });
}