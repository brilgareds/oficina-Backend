import { useState, useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
import { getFetchWithHeader, overlay, postFetch } from '../../../../generalHelpers';
import { api } from '../../../../environments/environments';
import Cookies from 'universal-cookie/es6';

export const useFormRrhh = (formInitialState = {}, typeForm,) => {          //typeForm = es el tipo de formulario que llega desde el dashboard de RRHH: (estamosParaTi, talkToUs, SolicitudesRRHH)

    const exprRegTelefono = /^[0-9+() -?]+$/;                                                //Expresion regular para validar el formato de un teléfono
    const exprRegEmail = /^([a-zA-Z0-9_.-]+)@([\da-zA-Z0-9.-]+)\.([a-z.]{2,6})$/;        //Expresion regular para validar los correos electronicos
    const exprRegTexto = /^([\w\s\d\nÑñáéíóúÁÉÍÓÚ.,\-_@?¿%<>]){1,990}$/;                      //Expresion regular para validar texto largos de 1000 caracteres
    const cookies = new Cookies();

    const [stateTitle, setStateTitle] = useState('Estamos para ti')

    useEffect(() => {
        document.getElementById('top').className = 'main dashboard rrhhForm';

        if (typeForm) {
            setStateTitle(validarTituloComponent(typeForm.typeForm));
            loadCategories(typeForm.typeForm);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeForm])

    const validarTituloComponent = (data) => {
        let response = '';

        switch (data) {
            case 'estamosParaTi':
                response = 'Estamos para ti';
                break;
            case 'talkToUs':
                response = 'Talk to us';
                break;
            case 'SolicitudesRRHH':
                response = 'Solicitudes de RRHH';
                break;

            default:
                response = '';
                break;
        }

        return response;
    }

    const [formValue, setStateForm] = useState(formInitialState);
    const onChangeInputHandle = ({ target }) => {
        setStateForm({
            ...formValue,
            [target.name]: target.value
        })
    }


    const [checkedButtonMedioRespuesta, setcheckedButtonMedioRespuesta] = useState(null)
    const oncheckedButtonMedioRespuestaHandle = () => {
        let otroMedioRespuesta = document.getElementById("otroMedioRespuesta");

        if (otroMedioRespuesta.checked) {
            setcheckedButtonMedioRespuesta(true);
            document.getElementById("radioLlamadaTelefonica").disabled = false;
            document.getElementById("radioWpp").disabled = false;
            document.getElementById("divNumeroTelefonico").style.display = 'unset';
        } else {
            setcheckedButtonMedioRespuesta(false);
            setTipoContacto(null);

            setStateForm({
                ...formValue,
                'numeroTelefonico': ''
            });

            document.getElementById("radioLlamadaTelefonica").disabled = true;
            document.getElementById("radioWpp").disabled = true;

            document.getElementById("radioLlamadaTelefonica").checked = false;
            document.getElementById("radioWpp").checked = false;

            document.getElementById("divNumeroTelefonico").style.display = 'none';
        }

    }

    const [selectCategorias, setSelect] = useState({});
    const onChangeSelectHandle = ({ value }) => {
        setSelect(value);
    }

    const onSubmitFormHandle = (e) => {
        e.preventDefault();
        overlay();

        if (validarCampos()) {

            enviarFormulario();

        } else {
            Swal.fire({
                title: 'Advertencia',
                html: `
                    <div className="row">
                        <div className="col-12 col-lg-12" style="text-align: left; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                            Revisa el formulario con las siguientes indicaciones:
                        </div>
                        <div className="col-12 col-lg-12" style="text-align: left; font-size: 15px;">
                            ◉ Los campos no deben estar vacios <br/>
                            ◉ No se permiten carácteres especiales Eje: !"#$%&/() <br/>
                        </div>
                    </div>
                     <br/>
                    
                `,
                icon: 'warning',
                confirmButtonText: 'Cerrar',
            });
        }
    }


    const validarCampos = () => {

        let response = false;

        if (
            exprRegTexto.test(formValue.descripcion) &&    //Si el texto de la descripcion cumple con la expresion regular
            exprRegEmail.test(formValue.correoEnvioRespuesta)   //Si el correo cumple con la expresion regular
        ) {

            if (
                (selectCategorias.value === undefined || selectCategorias.value === null) && //Si el campo de categorias es undefined  o null
                typeForm.typeForm !== "talkToUs" //Si el formulario es diferente de talkToUs
            ) {
                response = false;
            } else {
                response = true;
            }

            if (checkedButtonMedioRespuesta === true && tipoContacto === null) { //Si Otro medio de respuesta esta checkeado y no se ha seleccionado el tipo de contacto
                response = false;
            } else if (checkedButtonMedioRespuesta === true && tipoContacto !== null) { //Si Otro medio de respuesta esta checkeado y se ha seleccionado el tipo de contacto
                (exprRegTelefono.test(formValue.numeroTelefonico)) ? response = true : response = false; //Si el formato del telefono cumple  = true
            }

        }

        return response;

    }

    const enviarFormulario = () => {

        let allData = {
            dataForm: {
                formulario: String(typeForm.typeForm),
                categoria: Number(selectCategorias.value),
                descripcion: String(formValue.descripcion).replace("'", ""),
                correoEnvioRespuesta: String(formValue.correoEnvioRespuesta),
                otroMedioRespuesta: Boolean(checkedButtonMedioRespuesta),
                numeroTelefonico: Number(formValue.numeroTelefonico),
                tipoContacto: String(tipoContacto),
            },
            dataUser: {
                cedula: String(cookies.get('d_u').cedula).trim(),
                nombres: String(cookies.get('d_u').nombres).trim(),
                apellidos: String(cookies.get('d_u').apellidos).trim(),
                empresa: String(cookies.get('d_u').empresa).trim(),
                cCostos: String(cookies.get('d_u').ccostos).trim(),
                numeroCelular: String(cookies.get('d_u').numeroCelular).trim(),
            }

        };

        console.log("formValue", allData);

        postFetch({
            url: api.postSaveFormRRHH,
            params: { allData }
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos guardados correctamente.',
                    confirmButtonText: 'Ok',
                });
            })
            .catch(() => {

                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error en la inserción, por favor revisa el formulario.',
                    confirmButtonText: 'Cerrar',
                });
            });


    }


    const [tipoContacto, setTipoContacto] = useState(null);
    const onClickButtonRespuestaHandle = ({ target }) => {

        let inputRadio = document.querySelector("#" + target.id);

        if (inputRadio.checked && target.dataset.target === "wpp") {
            setTipoContacto("wpp");
        } else if (inputRadio.checked && target.dataset.target === "llamada") {
            setTipoContacto("llamada");
        } else {
            setTipoContacto(null);
        }

    }

    const [optionsCategory, setOptionsCategory] = useState({});
    const loadCategories = (typeForm) => {

        if (typeForm !== 'talkToUs') {

            let urlApi = null;

            (typeForm === 'estamosParaTi') ? urlApi = api.getForYouCategory : urlApi = api.getresourceRequestCategory;

            getFetchWithHeader({
                url: urlApi,
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + cookies.get('a_t')
                }
            })
                .then((responseGetFetchWithHeader) => {

                    let optionsCategory = [{ value: null, label: "SELECCIONE..." }];

                    responseGetFetchWithHeader.data.forEach(element => {
                        optionsCategory.push({ value: element.codigo, label: element.nombre.toUpperCase() })
                    });

                    setOptionsCategory(optionsCategory);

                });

        }
    }





    return ({
        formValue,
        stateTitle,
        optionsCategory,
        onChangeInputHandle,
        oncheckedButtonMedioRespuestaHandle,
        onChangeSelectHandle,
        onSubmitFormHandle,
        onClickButtonRespuestaHandle,
    });


}
