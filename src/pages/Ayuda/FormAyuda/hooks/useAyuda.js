import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie/es6';
import { api } from '../../../../environments/environments';
import { advertenciaFormularioVacio, getFetchWithHeader, overlay, postFetch } from '../../../../generalHelpers';

export const useAyuda = (formInitialState = {}, typeForm) => {

    const exprRegTelefono = /^[0-9+() -?]+$/;                                                //Expresion regular para validar el formato de un teléfono
    const exprRegEmail = /^([a-zA-Z0-9_.-]+)@([\da-zA-Z0-9.-]+)\.([a-z.]{2,6})$/;        //Expresion regular para validar los correos electronicos
    const exprRegTexto = /^([\w\s\d\nÑñáéíóúÁÉÍÓÚ.,\-_@?¿%<>]){1,990}$/;                      //Expresion regular para validar texto largos de 1000 caracteres
    const cookies = new Cookies();

    const [stateTitle, setStateTitle] = useState('Felicitaciones');
    useEffect(() => {
        document.getElementById('root').className = 'ayudaForm';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (typeForm) {
            setStateTitle(validarTituloComponent(typeForm.typeForm));
            loadCategories(typeForm.typeForm);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeForm])

    const validarTituloComponent = (data) => {
        let response = '';

        switch (data) {
            case 'felicitaciones':
                response = 'Felicitaciones';
                break;
            case 'solicitud':
                response = 'Solicitud';
                break;
            case 'queja':
                response = 'Queja';
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

        getFetchWithHeader({
            url: api.getRequestHelpCategories,
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + cookies.get('a_t')
            }
        })
            .then((responseGetFetchWithHeader) => {

                let optionsCategory = [{ value: null, label: "SELECCIONE..." }];

                responseGetFetchWithHeader.data.forEach(element => {
                    optionsCategory.push({ value: element.TIP_CODIGO, label: element.TIP_NOMBRE.toUpperCase() })
                });

                setOptionsCategory(optionsCategory);

            });

    }


    const onSubmitFormHandle = (e) => {
        e.preventDefault();
        overlay();

        if (validarCampos()) {
            enviarFormulario();
        } else {
            advertenciaFormularioVacio();
        }
    }



    const validarCampos = () => {

        let response = false;

        if (
            exprRegTexto.test(formValue.descripcion) &&    //Si el texto de la descripcion cumple con la expresion regular
            exprRegEmail.test(formValue.correoEnvioRespuesta)   //Si el correo cumple con la expresion regular
        ) {

            if (typeForm.typeForm === "felicitaciones") {
                response = true;
            } else {

                if (
                    (selectCategorias.value === undefined || selectCategorias.value === null) && //Si el campo de categorias es undefined  o null
                    typeForm.typeForm !== "queja" //Si el formulario es diferente a Felicitacione y Queja
                ) {
                    return false;
                } else {
                    response = true;
                }

                if (checkedButtonMedioRespuesta === true && tipoContacto === null) { //Si Otro medio de respuesta esta checkeado y no se ha seleccionado el tipo de contacto
                    return false;
                } else if (checkedButtonMedioRespuesta === true && tipoContacto !== null) { //Si Otro medio de respuesta esta checkeado y se ha seleccionado el tipo de contacto
                    (exprRegTelefono.test(formValue.numeroTelefonico)) ? response = true : response = false; //Si el formato del telefono cumple  = true
                }

            }


        }

        return response;

    }


    const enviarFormulario = () => {

        let allData = {

            dataForm: {
                categoria: Number(selectCategorias.value),
                categoriaTxt: String(selectCategorias.label),
                correoEnvioRespuesta: String(formValue.correoEnvioRespuesta),
                descripcion: String(formValue.descripcion).replace("'", ""),
                formulario: String(typeForm.typeForm),
                numeroTelefonico: Number(formValue.numeroTelefonico),
                otroMedioRespuesta: Boolean(checkedButtonMedioRespuesta),
                tipoContacto: String(tipoContacto),
            },
            dataUser: {
                apellidos: String(cookies.get('d_u').apellidos).trim(),
                cedula: String(cookies.get('d_u').cedula).trim(),
                cCostos: String(cookies.get('d_u').ccostos).trim(),
                empresa: String(cookies.get('d_u').empresa).trim(),
                estado: String(cookies.get('d_u').estado).trim(),
                nombres: String(cookies.get('d_u').nombres).trim(),
                numeroCelular: String(cookies.get('d_u').numeroCelular).trim(),
            }

        };

        postFetch({
            url: api.postSaveFormHelp,
            params: { allData }
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos guardados correctamente.',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    window.location.reload();
                })
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error en la inserción, por favor revisa el formulario.',
                    confirmButtonText: 'Cerrar',
                });
            });


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
