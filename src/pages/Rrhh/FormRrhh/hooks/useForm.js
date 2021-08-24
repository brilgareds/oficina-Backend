import { useState, useEffect } from 'react';

export const useFormRrhh = (formInitialState = {}, typeForm,) => {

    useEffect(() => {
        document.getElementById('root').className = 'rrhhForm';
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


    const onCheckedButtonHandle = () => {
        let otroMedioRespuesta = document.getElementById("otroMedioRespuesta");

        if (otroMedioRespuesta.checked) {
            document.getElementById("radioLlamadaTelefonica").disabled = false;
            document.getElementById("radioWpp").disabled = false;
            document.getElementById("divNumeroTelefonico").style.display = 'unset';
        } else {
            document.getElementById("radioLlamadaTelefonica").disabled = true;
            document.getElementById("radioLlamadaTelefonica").checked = false;

            document.getElementById("radioWpp").disabled = true;
            document.getElementById("radioWpp").checked = false;

            document.getElementById("divNumeroTelefonico").style.display = 'none';
        }

    }

    const [selectValue, setSelect] = useState({})
    const onChangeSelectHandle = ({ value }) => {
        setSelect(value);
    }

    const onSubmitFormHandle = (e) => {
        e.preventDefault();

        let dataForm = {
            categoria: selectValue.value,
            descripcion: formValue.descripcion,
            correoEnvioRespuesta: formValue.correoEnvioRespuesta,
            numeroTelefonico: formValue.numeroTelefonico,
        }

        console.log("formValue", dataForm);
    }

    const [checkedValue, setCheckedValue] = useState(formInitialState);
    const onClickButtonRespuestaHandle = ({ target }) => {
        // setCheckedValue({
        //     ...formValue,
        //     [target.name]: target.value
        // })
    }

    return ({
        formValue,
        stateTitle,
        onChangeInputHandle,
        onCheckedButtonHandle,
        onChangeSelectHandle,
        onSubmitFormHandle,
        onClickButtonRespuestaHandle
    });


}
