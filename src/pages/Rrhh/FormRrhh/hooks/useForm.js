import { useState, useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';

export const useFormRrhh = (formInitialState = {}, typeForm,) => {

    const exprRegTelefono = /^[0-9+() -?]+$/;                                                //Expresion regular para validar el formato de un teléfono
    const exprRegEmail = /^([a-zA-Z0-9_.-]+)@([\da-zA-Z0-9.-]+)\.([a-z.]{2,6})$/;        //Expresion regular para validar los correos electronicos
    const exprRegTexto = /([\w\s\d\nÑñáéíóúÁÉÍÓÚ.,\-_@?¿"%'<>]){0,990}/;                      //Expresion regular para validar texto largos de 1000 caracteres

    useEffect(() => {
        document.getElementById('top').className = 'main dashboard rrhhForm';
    }, []);


    const [stateTitle, setStateTitle] = useState('Estamos para ti')


    useEffect(() => {
        (typeForm) && setStateTitle(validarTituloComponent(typeForm.typeForm));
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

    const [selectCategorias, setSelect] = useState({})
    const onChangeSelectHandle = ({ value }) => {
        setSelect(value);
    }

    const onSubmitFormHandle = (e) => {
        e.preventDefault();

        if (validarCampos()) {

            let dataForm = {
                categoria: selectCategorias.value,
                descripcion: formValue.descripcion,
                correoEnvioRespuesta: formValue.correoEnvioRespuesta,
                numeroTelefonico: formValue.numeroTelefonico,
                formulario: typeForm.typeForm,
                tipoContacto: tipoContacto
            }
            console.log("formValue", dataForm);

            Swal.fire({
                title: 'Datos guardados correctamente',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtoncolor: "#1783EE",
            });

        } else {
            Swal.fire({
                title: 'Advertencia',
                html: `
                    <div className="row">
                        <div className="col-12 col-lg-12" style="text-align: left; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                            Revisa el formulario con las siguientes indicacones:
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
                confirmButtoncolor: "#1783EE",
            });
        }
    }


    const validarCampos = () => {

        let response = false;


        if (
            exprRegTexto.test(formValue.descripcion) &&    //Si el texto de la descripcion cumple con la expresion regular
            exprRegEmail.test(formValue.correoEnvioRespuesta)   //Si el correo cumple con la expresion regular
        ) {

            console.log("typeForm", typeForm);

            if (
                selectCategorias.value === undefined && //Si el formulario es undefined
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

    return ({
        formValue,
        stateTitle,
        onChangeInputHandle,
        oncheckedButtonMedioRespuestaHandle,
        onChangeSelectHandle,
        onSubmitFormHandle,
        onClickButtonRespuestaHandle
    });


}
