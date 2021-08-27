import React from 'react';
import { Redirect } from 'react-router-dom';
import { useFormRrhh } from './hooks/useForm.js';
import { routes } from '../../../environments/environments.ts';
import Select from 'react-select';
import Cookies from 'universal-cookie/es6';

import './formRrhh.css';


export const FormRrhh = (props) => {

    const cookies = new Cookies();
    const typeForm = props.location.params;

    const {
        formValue,
        stateTitle,
        optionsCategory,
        onChangeInputHandle,
        oncheckedButtonMedioRespuestaHandle,
        onChangeSelectHandle,
        onSubmitFormHandle,
        onClickButtonRespuestaHandle,

    } = useFormRrhh({
        descripcion: '',
        correoEnvioRespuesta: cookies.get('d_u').mail,
        numeroTelefonico: '',
    },
        typeForm,
    );

    const { descripcion, correoEnvioRespuesta, numeroTelefonico, } = formValue;

    return (
        <>
            {
                (typeForm) ?  //Si trae el tipo de formulario por el cual entra al componente
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
                                                <label className="form-label" htmlFor="descripcion">Categoría: </label>
                                                <Select onChange={value => onChangeSelectHandle({ value })} options={optionsCategory} defaultValue={[optionsCategory[0]]} placeholder={"Selecciona..."} />
                                            </div>
                                        }
                                        <div className="col-12 col-lg-8 mb-3">
                                            <label className="form-label" htmlFor="descripcion">Descripción: </label>
                                            <textarea onChange={onChangeInputHandle} value={descripcion} id="descripcion" name="descripcion" className="form-control" placeholder="Descripción" maxLength="990" ></textarea>
                                        </div>
                                        <div className="col-12 col-lg-4 mb-3">
                                            <label className="form-label" htmlFor="correoEnvio">Correo envío respuesta: </label>
                                            <input onChange={onChangeInputHandle} value={correoEnvioRespuesta} id="correoEnvioRespuesta" name="correoEnvioRespuesta" className="form-control" placeholder="Correo Envío Respuesta" type="email" />
                                        </div>
                                        <div className="col-12 col-lg-4 mb-3">
                                            <label className="form-label" htmlFor="OtroMedioRespuesta">
                                                Otro medio de respuesta: &nbsp;&nbsp;
                                                <input onClick={oncheckedButtonMedioRespuestaHandle} className="form-check-input" id="otroMedioRespuesta" name="otroMedioRespuesta" type="checkbox" />
                                            </label>
                                            <div className="row">
                                                <div className="col-md-7 text-right">
                                                    <input onChange={onClickButtonRespuestaHandle} data-target="llamada" className="form-check-input inputRadioOtraRespuesta" id="radioLlamadaTelefonica" type="radio" name="radioMedioRespuesta" disabled />
                                                    <label data-target="radioLlamadaTelefonica" className="form-check-label" htmlFor="radioLlamadaTelefonica">Llamada teléfonica</label>
                                                </div>
                                                <div className="col-md-5">
                                                    <input onChange={onClickButtonRespuestaHandle} data-target="wpp" className="form-check-input inputRadioOtraRespuesta" id="radioWpp" type="radio" name="radioMedioRespuesta" disabled />
                                                    <label data-target="radioWpp" className="form-check-label" htmlFor="radioWpp">WhatsApp</label>
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

                    :

                    <Redirect to={routes.rrhh.url} /> //Si no trae el tipo e formulario se redirecciona al page padre de RRHH
            }

        </>
    )

}
