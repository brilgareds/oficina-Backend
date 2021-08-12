import React from 'react';
import './formRrhh.css';
import Select from 'react-select';
import { useFormRrhh } from './hooks/useForm';

export const FormRrhh = (props) => {

    const typeForm = props.location.params;

    const {
        formValue,
        stateTitle,
        onChangeInputHandle,
        onCheckedButtonHandle,
        onChangeSelectHandle,
        onSubmitFormHandle,
        onClickButtonRespuestaHandle
    } = useFormRrhh(
        {
            descripcion: '',
            correoEnvioRespuesta: '',
            numeroTelefonico: '',
        },
        typeForm,
    );

    const { descripcion, correoEnvioRespuesta, numeroTelefonico, } = formValue;

    const options = [
        { value: 'FAMILIAR', label: 'FAMILIAR' },
        { value: 'LABORAL', label: 'LABORAL' },
        { value: 'FORMACION', label: 'FORMACIÓN' },
    ];


    return (
        <>

            <div className="card mb-3">
                <div className="bg-holder d-none d-lg-block bg-card bg-image-vum">
                </div>
                <div className="card-body position-relative">
                    <div className="row">
                        <div className="col-lg-8">
                            <h3>{stateTitle}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body bg-light">
                    <form onSubmit={onSubmitFormHandle}>
                        <div className="row">
                            {
                                (stateTitle !== 'Talk to us')
                                &&
                                <div className="col-12 col-lg-4 mb-3">
                                    <label className="form-label" htmlFor="descripcion">Categoria: </label>
                                    <Select onChange={value => onChangeSelectHandle({ value })} options={options} placeholder={"Selecciona..."} />
                                </div>
                            }
                            <div className="col-12 col-lg-8 mb-3">
                                <label className="form-label" htmlFor="descripcion">Descripción: </label>
                                <textarea onChange={onChangeInputHandle} value={descripcion} id="descripcion" name="descripcion" className="form-control" placeholder="Descripción"></textarea>
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="correoEnvio">Correo envío respuesta: </label>
                                <input onChange={onChangeInputHandle} value={correoEnvioRespuesta} id="correoEnvioRespuesta" name="correoEnvioRespuesta" className="form-control" placeholder="Correo Envío Respuesta" type="email" />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="OtroMedioRespuesta">
                                    Otro medio de respuesta: &nbsp;&nbsp;
                                    <input onClick={onCheckedButtonHandle} className="form-check-input" id="otroMedioRespuesta" name="otroMedioRespuesta" type="checkbox" />
                                </label>
                                <div className="row">
                                    <div className="col-md-7 text-right">
                                        <input onClick={onClickButtonRespuestaHandle} className="form-check-input inputRadioOtraRespuesta" id="radioLlamadaTelefonica" type="radio" name="radioMedioRespuesta" disabled />
                                        <label className="form-check-label" htmlFor="radioLlamadaTelefonica">Llamada teléfonica</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input onClick={onClickButtonRespuestaHandle} className="form-check-input inputRadioOtraRespuesta" id="radioWpp" type="radio" name="radioMedioRespuesta" disabled />
                                        <label className="form-check-label" htmlFor="radioWpp">WhatsApp</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 mb-3" id="divNumeroTelefonico">
                                <label className="form-label" htmlFor="numeroTelefonico">Numero Teléfonico: </label>
                                <input onChange={onChangeInputHandle} value={numeroTelefonico} id="numeroTelefonico" name="numeroTelefonico" className="form-control" placeholder="Numero Teléfonico" type="number" />
                            </div>
                            <div className="col-12 col-lg-12 mb-3">
                                <div className="row">
                                    <div className="col-12 col-lg-10 mb-3"></div>
                                    <div className="col-12 col-lg-2 mb-3 d-grid gap-2">
                                        <button type="submit" className="btn btn-success  btnEnviar">Enviar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )

}
