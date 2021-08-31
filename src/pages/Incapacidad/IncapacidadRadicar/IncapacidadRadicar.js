import React, { useEffect } from 'react';
import Select from 'react-select';
import { useIncapacidadRadicar } from './hooks/useIncapacidadRadicar';
import './incapacidadRadicar.css';

export const IncapacidadRadicar = () => {

    useEffect(() => {
        document.getElementById('root').className = 'incapacidadRadicar';
    }, []);

    return (
        <>
            <div className="card mb-3">
                <div className="card-body position-relative">
                    <div className="row">
                        <div className="col-lg-8">
                            <h3>Radicar Incapacidades</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body bg-light">
                    <form >
                        <div className="row">
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="cedula">Cédula: </label>
                                <input id="cedula" name="cedula" className="form-control" placeholder="Cédula" type="text" />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="nombreUsuario">Nombre: </label>
                                <input id="nombreUsuario" name="nombreUsuario" className="form-control" placeholder="Nombre usuario" type="text" />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="telefono">Teléfono: </label>
                                <input id="telefono" name="telefono" className="form-control" placeholder="Teléfono" type="text" />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="correoElectronico">Correo Electronico: </label>
                                <input id="correoElectronico" name="correoElectronico" className="form-control" placeholder="correoElectronico" type="email" />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="eps">EPS: </label>
                                <input id="eps" name="eps" className="form-control" placeholder="correoElectronico" type="eps" disabled />
                            </div>
                            <div className="col-12 col-lg-2 mb-3">
                                <label className="form-label labelSinMargin" htmlFor="otraEntidad">Otra entidad:</label>
                                <br />
                                <input id="otraEntidad" name="otraEntidad" className="form-check-input" type="checkbox" />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="descripcion">Otra Entidad: </label>
                                <Select options={{}} defaultValue={[{}[0]]} placeholder={"Selecciona..."} isDisabled={true} />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="descripcion">Tipo incapacidad: </label>
                                <Select options={{}} defaultValue={[{}[0]]} placeholder={"Selecciona..."} />
                            </div>
                            <div className="col-12 col-lg-4">
                                <label className="form-label" for="exampleFormControlInput1">Rango de fechas</label>
                                <div className="input-group mr-auto md-auto">
                                    <input id="fecIni" name="fecIni" className="form-control fechas datepicker" placeholder="Fecha inicio" type="date" />
                                    <span className="input-group-text"> - </span>
                                    <input id="fecFin" name="fecFin" className="form-control fechas datepicker" placeholder="Fecha final" type="date" />
                                </div>
                            </div>
                            <div className="col-12 col-lg-2 mb-3">
                                <label className="form-label labelSinMargin" htmlFor="otraEntidad">Otra entidad:</label>
                                <br />
                                <input id="otraEntidad" name="otraEntidad" className="form-check-input" type="checkbox" />
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
