import React from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import { routes } from '../../../environments/environments.ts';
import './formAyuda.css';
import { useAyuda } from './hooks/useAyuda';
import { AsteriskRequired } from '../../../components/AsteriskRequired/AsteriskRequired';

export const FormAyuda = (props) => {


    const typeForm = props.location.params;

    const {
        formValue,
        stateTitle,
        optionsCategory,
        onChangeInputHandle,
        oncheckedButtonMedioRespuestaHandle,
        onChangeSelectHandle,
        onClickButtonRespuestaHandle,
        onSubmitFormHandle,

    } = useAyuda({
        descripcion: '',
        correoEnvioRespuesta: JSON.parse(localStorage.getItem('d_u')).mail,
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
                            <div className="card-body position-relative textoMigaDePan">
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
                                            (stateTitle === 'Solicitud')
                                            &&
                                            <div className="col-12 col-lg-4 mb-3">
                                                <label className="form-label" htmlFor="descripcion">Categoria: <AsteriskRequired />  </label>
                                                <Select onChange={value => onChangeSelectHandle({ value })} options={optionsCategory} defaultValue={[optionsCategory[0]]} placeholder={"Selecciona..."} />
                                            </div>
                                        }

                                        <div className="col-12 col-lg-8 mb-3">
                                            <label className="form-label" htmlFor="descripcion">Descripci??n: </label> <AsteriskRequired />
                                            <textarea onChange={onChangeInputHandle} value={descripcion} id="descripcion" name="descripcion" className="form-control" placeholder="Descripci??n" maxLength="990" ></textarea>
                                        </div>
                                        <div className="col-12 col-lg-4 mb-3">
                                            <label className="form-label" htmlFor="correoEnvio">Correo env??o respuesta: <AsteriskRequired /> </label>
                                            <input onChange={onChangeInputHandle} value={correoEnvioRespuesta} id="correoEnvioRespuesta" name="correoEnvioRespuesta" className="form-control" placeholder="Correo Env??o Respuesta" type="email" />
                                        </div>

                                        {
                                            (stateTitle !== 'Felicitaciones')
                                            &&
                                            <>
                                                <div className="col-12 col-lg-4 mb-3">
                                                    <label className="form-label" htmlFor="OtroMedioRespuesta">
                                                        Otro medio de respuesta: &nbsp;&nbsp;
                                                        <input onClick={oncheckedButtonMedioRespuestaHandle} className="form-check-input" id="otroMedioRespuesta" name="otroMedioRespuesta" type="checkbox" />
                                                    </label>
                                                    <div className="row">
                                                        <div className="col-md-7 text-right">
                                                            <input onChange={onClickButtonRespuestaHandle} data-target="llamada" className="form-check-input inputRadioOtraRespuesta" id="radioLlamadaTelefonica" type="radio" name="radioMedioRespuesta" disabled />
                                                            <label data-target="radioLlamadaTelefonica" className="form-check-label" htmlFor="radioLlamadaTelefonica">Llamada tel??fonica</label>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <input onChange={onClickButtonRespuestaHandle} data-target="wpp" className="form-check-input inputRadioOtraRespuesta" id="radioWpp" type="radio" name="radioMedioRespuesta" disabled />
                                                            <label data-target="radioWpp" className="form-check-label" htmlFor="radioWpp">WhatsApp</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-4 mb-3" id="divNumeroTelefonico">
                                                    <label className="form-label" htmlFor="numeroTelefonico">Numero Tel??fonico:  <AsteriskRequired />  </label>
                                                    <input onChange={onChangeInputHandle} value={numeroTelefonico} id="numeroTelefonico" name="numeroTelefonico" className="form-control" placeholder="Numero Tel??fonico" type="number" />
                                                </div>
                                            </>
                                        }


                                        <div className="col-12 col-lg-12 mb-3">
                                            <div className="row">
                                                <div className="col-12 col-lg-10 mb-3"></div>
                                                <div className="col-12 col-lg-2 mb-3 d-grid gap-2">
                                                    <button type="submit" className="btn succesButton btnEnviar">Enviar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </>

                    :

                    <Redirect to={routes.ayuda.url} /> //Si no trae el tipo e formulario se redirecciona al page padre de Ayuda
            }

        </>
    )
}
