import Select from 'react-select';
import { DataTabla } from '../../../components/DataTable/DataTabla';
import { getDateToday, getFullNameUser } from '../../../generalHelpers';
import { useIncapacidadRadicar } from './hooks/useIncapacidadRadicar';
import './incapacidadRadicar.css';



export const IncapacidadRadicar = () => {

    const dataUser = JSON.parse(localStorage.getItem('d_u'));

    const headerStyles = { backgroundColor: '#EDF2F9', color: '#344050', zIndex: 0, };

    const {
        formValue,
        optionsOtherEntity,
        optionsTipoIncapacidad,
        stateOtraEntidadCheck,
        rowsTable,
        onChangeInputHandle,
        onCheckedOtherEntity,
        onChangeTipoIncapacidadHandle,
        onSubmitFormIncapacidad,
        onChangeSelectHandle,
        onCheckedInputCheck,
    } = useIncapacidadRadicar(
        {
            cedula: dataUser.cedula.trim(),
            nombreUsuario: getFullNameUser().toUpperCase(),
            telefono: dataUser.numeroCelular.trim(),
            correoElectronico: dataUser.mail.trim().toLowerCase(),
            eps: dataUser.entidad.trim().toUpperCase(),
            fechaInicio: getDateToday(),
            fechaFin: getDateToday(),
            columnsDataTable: [
                { title: '#', field: 'numero', headerStyle: headerStyles },
                { title: 'DOCUMENTO', field: 'documento', headerStyle: headerStyles },
                { title: 'ARCHIVO', field: 'archivo', headerStyle: headerStyles },
            ],
            rowsDataTable: [],
            files: [],
        },
        dataUser
    );

    const { cedula, nombreUsuario, telefono, correoElectronico, eps, fechaInicio, fechaFin, columnsDataTable } = formValue;
    const customStyles = {
        menuPortal: provided => ({ ...provided, zIndex: 9999 }),
        menu: provided => ({ ...provided, zIndex: 9999 })
    }

    return (
        <>
            <div className="card mb-3">
                <div className="card-body position-relative textoMigaDePan">
                    <div className="row">
                        <div className="col-lg-8">
                            <h3>Radicar Incapacidades</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3">

                <div className="card-body bg-light">
                    <form id="formIncapacidad" onSubmit={onSubmitFormIncapacidad} encType="multipart/form-data">
                        <div className="row">
                            <div className="card-header">
                                <h5 className="card-title">Datos del colaborador</h5>
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="cedula">Cédula: </label>
                                <input onChange={onChangeInputHandle} value={cedula} id="cedula" name="cedula" className="form-control" placeholder="Cédula" type="text" disabled />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="nombreUsuario">Nombre: </label>
                                <input onChange={onChangeInputHandle} value={nombreUsuario} id="nombreUsuario" name="nombreUsuario" className="form-control" placeholder="Nombre usuario" type="text" disabled />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="telefono">Teléfono: </label>
                                <input onChange={onChangeInputHandle} value={telefono} id="telefono" name="telefono" className="form-control" placeholder="Teléfono" type="text" />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="correoElectronico">Correo Electronico: </label>
                                <input onChange={onChangeInputHandle} value={correoElectronico} id="correoElectronico" name="correoElectronico" className="form-control" placeholder="correoElectronico" type="email" />
                            </div>
                            <div className="col-12 col-lg-3 mb-3">
                                <label className="form-label" htmlFor="eps">EPS: </label>
                                <input onChange={onChangeInputHandle} value={eps} id="eps" name="eps" className="form-control" placeholder="Eps" type="eps" disabled />
                            </div>
                            <div className="col-12 col-lg-2 mb-3 text-center">
                                <label className="form-label labelSinMargin" htmlFor="otraEntidad">Otra entidad:</label>
                                <br />
                                <input onClick={onCheckedOtherEntity} id="otraEntidad" name="otraEntidad" className="form-check-input" type="checkbox" />
                            </div>
                            <div className="col-12 col-lg-3 mb-5">
                                <label className="form-label" htmlFor="descripcion">Otra Entidad: </label>
                                <Select onChange={valueSe => onChangeSelectHandle({ nameSelect: 'otraEntidad', value: valueSe })} options={optionsOtherEntity} defaultValue={[optionsOtherEntity[0]]} placeholder={'Seleccione...'} isDisabled={stateOtraEntidadCheck} styles={customStyles} />
                            </div>
                            <div className="card-header">
                                <h5 className="card-title">Datos de la incapacidad</h5>
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="descripcion">Tipo incapacidad: </label>
                                <Select onChange={value => { onChangeTipoIncapacidadHandle({ value }); onChangeSelectHandle({ nameSelect: 'tipoIncapacidad', value }); }} options={optionsTipoIncapacidad} defaultValue={[optionsTipoIncapacidad[0]]} placeholder={"Selecciona..."} />
                            </div>
                            <div className="col-12 col-lg-4">
                                <label className="form-label" htmlFor="exampleFormControlInput1">Rango de fechas</label>
                                <div className="input-group mr-auto md-auto">
                                    <input onChange={onChangeInputHandle} defaultValue={fechaInicio} id="fechaInicio" name="fechaInicio" className="form-control fechas datepicker" placeholder="Fecha inicio" type="date" />
                                    <span className="input-group-text"> - </span>
                                    <input onChange={onChangeInputHandle} defaultValue={fechaFin} id="fechaFin" name="fechaFin" className="form-control fechas datepicker" placeholder="Fecha final" type="date" />
                                </div>

                            </div>
                            <div className="col-12 col-lg-2 mb-6 text-center">
                                <label className="form-label labelSinMargin" htmlFor="prorroga">Prorroga:</label>
                                <br />
                                <input onChange={onCheckedInputCheck} id="prorroga" name="prorroga" className="form-check-input" type="checkbox" />
                            </div>

                            <div className="card-header" id="tituloDataTableDesktop">
                                <h5 className="card-title">Sube tus archivos aquí en formato pdf </h5>
                            </div>

                            <DataTabla title={<> <h5 className="card-title">Sube tus archivos aquí en formato pdf </h5> </>} columns={columnsDataTable} data={rowsTable} />

                            <div className="col-12 col-lg-12 mt-4 mb-3">
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
