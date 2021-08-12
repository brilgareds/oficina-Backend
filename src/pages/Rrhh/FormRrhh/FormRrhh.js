import React, { useEffect } from 'react';
import './../rrhh.css';
// import { Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min';
// import { environment } from '../../../environments/environments.ts';

export const FormRrhh = (props) => {

    // const { path } = environment;
    // const typeForm = props.location?.params?.typeForm ?? '';

    useEffect(() => {
        document.getElementById('top').className = 'main dashboard rrhh';
    }, [])


    return (

        <div className="card-body bg-light">
            <div className="row">
                <div className="col-12 col-lg-4">
                    <label className="form-label" htmlFor="descripcion">Categoría: </label>
                    <select>
                        <option value="nulls">Seleccione..</option>
                    </select>
                </div>
                <div className="col-12 col-lg-4">
                    <label className="form-label" htmlFor="descripcion">Descripción: </label>
                    <input id="descripcion" name="descripcion" className="form-control" placeholder="Descripción" type="text" />
                </div>
                <div className="col-12 col-lg-4">
                    <label className="form-label" htmlFor="correoEnvio">Correo Envío Respuesta: </label>
                    <input id="correoEnvioRespuesta" name="correoEnvio" className="form-control" placeholder="Correo Envío Respuesta" type="text" />
                </div>
                <div className="col-12 col-lg-4">
                    <label className="form-label" htmlFor="OtroMedioRespuesta">Otro Medio de Respuesta: </label>

                </div>
            </div>
        </div>

    )

}
