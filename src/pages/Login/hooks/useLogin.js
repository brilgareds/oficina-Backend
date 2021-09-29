import { useState, useEffect } from 'react';
import { api, routes } from '../../../environments/environments';
import { getFetchWithHeader, overlay } from '../../../generalHelpers';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { generateToken, getUserInfoResponse } from '../../../repositories/Login/login';


export const useLogin = (formInitialState = {}) => {

    const exprRegNumeros = /^[0-9+]+$/;                                                 //Expresion regular para validar el formato de solo numeros
    const exprRegTelefono = /^[0-9+() -?]+$/;                                           //Expresion regular para validar el formato de un teléfono
    const exprRegEmail = /^([a-zA-Z0-9_.-]+)@([\da-zA-Z0-9.-]+)\.([a-z.]{2,6})$/;       //Expresion regular para validar los correos electronicos
    const exprRegSoloLetras = /^[a-zA-ZÑñáéíóúÁÉÍÓÚÄËÏÖÜäëïöü\s+]+$/;                   //Expresion regular para validar solo letras
    const [formValue, setStateForm] = useState(formInitialState);
    const [modalInformation, setModalInformation] = useState({ eps: null, documentTypes: null });


    const onKeyUpInputHandle = ({ target }) => {
        if (!parseFloat(target.value)) return;

        setStateForm({
            ...formValue,
            [target.name]: target.value
        });
    }


    const logOut = () => {
        overlay(true);
        localStorage.clear();
        window.location.href = routes.login.url;
    }

    const formatUserInfo = (userInfo) => {

        return JSON.stringify({
            'nombres': userInfo.Nombres,
            'apellidos': userInfo.Apellidos,
            'cedula': userInfo.Cedula,
            'genero': userInfo.Genero,
            'mail': userInfo.Mail,
            'numContrato': userInfo.NUMERO_CONTRATO,
            'cargo': userInfo.Cargo,
            'area': userInfo.Area,
            'fechaIngreso': userInfo.FECHA_INGRESO,
            'fechaVencimiento': userInfo.FECHA_VENCIMIENTO,
            'ccostos': userInfo.C_COSTOS,
            'estado': userInfo.ESTADO,
            'empresa': userInfo.Empresa,
            'entidad': userInfo.Entidad,
            'jefe': userInfo.Jefe,
            'numeroCelular': userInfo.Numero,
        })
    };

    const setToken = (res) => {
        localStorage.setItem('a_t', res.access_token);  // access_token
        localStorage.setItem('r_t', res.refresh_token); // refresh_token

        return res;
    };


    const onSubmitForm = async (e) => {

        e.preventDefault();

        if (validarInputIdentificacion(formValue.identification)) { // Si la informacion es solo tipo numero

            overlay(true);
            localStorage.clear();

            try {
                setToken(await generateToken(formValue)); // Si el usuario existe colocará toda la informacion consultada en el localStorage

                const promisesArray = [
                    getUserInfoResponse()
                ];

                const [userInfo] = await Promise.all(promisesArray);

                if (userInfo?.usuarioInactivoConVariosContratos) {

                    let contratosOp = `<option value="null" selected disabled>SELECCIONE...</option>`;
                    userInfo.contratos.forEach((contrato, key) => {
                        contratosOp += `<option value="${key}">Contrato: #${contrato.NUMERO_CONTRATO} - ${contrato.FECHA_INGRESO} - ${contrato.FECHA_VENCIMIENTO} </option>`;
                    });

                    Swal.fire({
                        title: 'Empleado Inactivo',
                        html: `
                                <div class="row" style="text-align: left; margin: 10px;">
                                    <div class="col-12 col-lg-12 mb-3 text-center">
                                        <span style="font-weight: 600;font-size: 20px;">Por favor seleccione el contrato donde requiera iniciar el proceso.</span>
                                    </div>
            
                                    <div class="col-12 col-lg-12">
                                        <label class="form-label" htmlFor="correoEnvio">Seleccione un contrato: </label>
                                        <select id="contrato" name="contrato" class="form-control">
                                            ${contratosOp}
                                        </select>
                                    </div>

                                </div>
                                     
                                <br/>
                        `,
                        showCloseButton: true,
                        showCancelButton: false,
                        showConfirmButton: true,
                        allowOutsideClick: true,
                        confirmButtonColor: "#1783EE",
                        confirmButtonText: "Ingresar",

                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            const posicionContrato = document.getElementById("contrato").value;
                            localStorage.setItem('d_u', formatUserInfo(userInfo.contratos[posicionContrato])); // data_user
                            window.location.href = routes.home.url;
                        }
                    })

                } else {
                    localStorage.setItem('d_u', formatUserInfo(userInfo)); // data_user
                    window.location.href = routes.home.url;
                }

            } catch (error) { // //Si el usuario no existe le despliega una modal de alerta para ingresar como contratista

                Swal.fire({
                    title: 'Usuario no encontrado en el sistema',
                    html: `
                    <div className="row">
                        <div className="col-12 col-lg-12" style="text-align: left; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                            Si eres un personaje externo puedes ingresa por las opciones habilitadas en pantalla
                        </div>
                    </div>
                    <br/>
                `,
                    icon: 'warning',
                    confirmButtonText: 'Cerrar',
                    confirmButtonColor: "#A6A6A6",
                });

                document.querySelector('#divContratistas').style.display = 'unset';
            }
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
                confirmButtonColor: "#A6A6A6",
            });
        }

        return response;
    }


    const onClickContratistasHandle = () => {

        overlay(true);

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
            title: 'Personaje externo',
            html: `
                    <div class="row" style="text-align: left; margin: 10px;">
                        <div class="col-12 col-lg-12 mb-3 text-center">
                            <span style="font-weight: 600;font-size: 20px;">
                                Ingresa los siguientes datos para acceder al sistema.
                            </span>
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
                            <label class="form-label" htmlFor="genero">Sexo:</label>
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
                            <button id="btnEnviarModalContratistas" type="button" class="btn succesButton">Enviar</button>
                        </div>
                    </div>
                         
                    <br/>
            `,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: true,
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

                        overlay(true);

                        localStorage.setItem('d_u', JSON.stringify(dataContratistas)); //informacion de usuario contratista

                        window.location.href = routes.encuestaRiesgoCovid.url;

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
