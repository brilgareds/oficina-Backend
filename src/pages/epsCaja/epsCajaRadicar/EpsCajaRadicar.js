import Select from 'react-select';
import { DataTabla } from '../../../components/DataTable/DataTabla';
import { getDateToday, getFullNameUser } from '../../../generalHelpers';
import { useEpsCajaRadicar } from './hooks/useEpsCajaRadicar';
import './epsCajaRadicar.css';

export const EpsCajaRadicar = () => {

    const dataUser = JSON.parse(localStorage.getItem('d_u'));
    const headerStyles = { backgroundColor: '#EDF2F9', color: '#344050', zIndex: 0, };
    const stylesSelects = { menuPortal: provided => ({ ...provided, zIndex: 9999 }), menu: provided => ({ ...provided, zIndex: 9999 }) }
    const {
        formValue,
        stateRowsBeneficiarios,
        stateTipoIdentificacion,
        statetipoParentesco,
        stateRowsTableDocumentos,
        onChangeInputHandle,
        onSubmitFormIncapacidad,
        onChangeSelectHandle,
        onClickButtonRadioHandle,
    } = useEpsCajaRadicar({
        cedula: dataUser.cedula.trim(),
        nombreUsuario: getFullNameUser().toUpperCase(),
        telefono: dataUser.numeroCelular.trim(),
        correoElectronico: dataUser.mail.trim().toLowerCase(),
        cedulaBeneficiario: "",
        nombreBeneficiario: "",
        apellidoBeneficiario: "",
        fechaNacimientoBeneficiario: getDateToday(),
        loadingPage: true,
        dataTables: {
            benefificarios: {
                headers: [
                    { title: 'IDENTIFICACION', field: 'identificacion', headerStyle: headerStyles },
                    { title: 'NOMBRES', field: 'nombres', headerStyle: headerStyles },
                    { title: 'SEXO', field: 'genero', headerStyle: headerStyles },
                    { title: 'EDAD', field: 'edad', headerStyle: headerStyles },
                    { title: 'BENEFICIARIO EPS', field: 'beneficiarioEps', headerStyle: headerStyles },
                    { title: 'BENEFICIARIO CAJA', field: 'beneficiarioCaja', headerStyle: headerStyles },
                ],
            },
            documentos: {
                headers: [
                    { title: '#', field: 'numero', headerStyle: headerStyles },
                    { title: 'DOCUMENTO', field: 'documento', headerStyle: headerStyles },
                    { title: 'ARCHIVO', field: 'archivo', headerStyle: headerStyles },
                ],
            },
        },
    }, dataUser);

    const {
        cedula,
        nombreUsuario,
        telefono,
        correoElectronico,
        dataTables,
        cedulaBeneficiario,
        nombreBeneficiario,
        apellidoBeneficiario,
        fechaNacimientoBeneficiario,
    } = formValue;
    const { benefificarios, documentos } = dataTables;

    return (
        <>
            <div className="card mb-3">
                <div className="card-body position-relative textoMigaDePan">
                    <div className="row">
                        <div className="col-lg-8">
                            <h3>Radicación de beneficiarios</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3">

                <div className="card-body bg-light">
                    <form id="formIncapacidad" onSubmit={onSubmitFormIncapacidad} encType="multipart/form-data">
                        <div className="row">
                            <div className="card-header" id="tituloDataTableDesktop">
                                <h5 className="card-title">Listado de sus beneficiarios </h5>
                            </div>

                            <DataTabla title={<> <h5 className="card-title">Listado de sus beneficiarios </h5> </>} columns={benefificarios.headers} data={stateRowsBeneficiarios} />

                            <div className="card-header mt-3">
                                <h5 className="card-title">Datos del colaborador</h5>
                            </div>
                            <div className="col-12 col-lg-3 mb-3">
                                <label className="form-label" htmlFor="cedula">Cédula: </label>
                                <input onChange={onChangeInputHandle} value={cedula} id="cedula" name="cedula" className="form-control" placeholder="Cédula" type="text" disabled />
                            </div>
                            <div className="col-12 col-lg-3 mb-3">
                                <label className="form-label" htmlFor="nombreUsuario">Nombre: </label>
                                <input onChange={onChangeInputHandle} value={nombreUsuario} id="nombreUsuario" name="nombreUsuario" className="form-control" placeholder="Nombre usuario" type="text" disabled />
                            </div>
                            <div className="col-12 col-lg-3 mb-3">
                                <label className="form-label" htmlFor="telefono">Teléfono: </label>
                                <input onChange={onChangeInputHandle} value={telefono} id="telefono" name="telefono" className="form-control" placeholder="Teléfono" type="text" />
                            </div>
                            <div className="col-12 col-lg-3 mb-5">
                                <label className="form-label" htmlFor="correoElectronico">Correo Electronico: </label>
                                <input onChange={onChangeInputHandle} value={correoElectronico} id="correoElectronico" name="correoElectronico" className="form-control" placeholder="correoElectronico" type="email" />
                            </div>


                            <div className="card-header">
                                <h5 className="card-title">Solicitar un beneficiario nuevo </h5>
                            </div>

                            <div className="col-12 col-lg-3 mb-3">
                                <label className="form-label" htmlFor="OtroMedioRespuesta">
                                    Beneficiario para: &nbsp;&nbsp;
                                </label>
                                <div className="row">
                                    <div className="col-md-6 text-right">
                                        <input onChange={onClickButtonRadioHandle} data-target="eps" className="form-check-input inputRadioCajaRadicar" id="epsBeneficiario" type="radio" name="BeneficiarioPara" />
                                        <label data-target="epsBeneficiario" className="form-check-label" htmlFor="epsBeneficiario">EPS</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input onChange={onClickButtonRadioHandle} data-target="caja" className="form-check-input inputRadioCajaRadicar" id="cajaBeneficiario" type="radio" name="BeneficiarioPara" />
                                        <label data-target="cajaBeneficiario" className="form-check-label" htmlFor="cajaBeneficiario">Caja</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 mb-3">
                                <label className="form-label" htmlFor="descripcion">Tipo Parentesco: </label>
                                <Select onChange={valueSe => onChangeSelectHandle({ nameSelect: 'tipoParentesco', value: valueSe })} options={statetipoParentesco} defaultValue={[statetipoParentesco[0]]} placeholder={'Seleccione...'} styles={stylesSelects} />
                            </div>
                            <div className="col-12 col-lg-3 mb-3">
                                <label className="form-label" htmlFor="descripcion">Tipo Documento: </label>
                                <Select onChange={valueSe => onChangeSelectHandle({ nameSelect: 'tipoDocumento', value: valueSe })} options={stateTipoIdentificacion} defaultValue={[stateTipoIdentificacion[0]]} placeholder={'Seleccione...'} styles={stylesSelects} />
                            </div>
                            <div className="col-12 col-lg-3 mb-3">
                                <label className="form-label" htmlFor="cedulaBeneficiario">Documento identidad: </label>
                                <input onChange={onChangeInputHandle} value={cedulaBeneficiario} id="cedulaBeneficiario" name="cedulaBeneficiario" className="form-control" placeholder="Cédula beneficiario" type="number" />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="nombreBeneficiario">Nombre: </label>
                                <input onChange={onChangeInputHandle} value={nombreBeneficiario} id="nombreBeneficiario" name="nombreBeneficiario" className="form-control" placeholder="Nombre beneficiario" type="text" />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="apellidoBeneficiario">Apellido: </label>
                                <input onChange={onChangeInputHandle} value={apellidoBeneficiario} id="apellidoBeneficiario" name="apellidoBeneficiario" className="form-control" placeholder="Apellido beneficiario" type="text" />
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <label className="form-label" htmlFor="correoElectronico">Fecha nacimiento: </label>
                                {/* <input onChange={onChangeInputHandle} value={fechaNacimientoBeneficiario} id="fechaNacimientoBeneficiario" name="fechaNacimientoBeneficiario" className="form-control fechas datepicker" placeholder="Fecha Nacimientos" type="date" /> */}
                                <input onChange={onChangeInputHandle} defaultValue={fechaNacimientoBeneficiario} id="fechaNacimientoBeneficiario" name="fechaNacimientoBeneficiario" className="form-control fechas datepicker" placeholder="Fecha Nacimiento" type="date" />
                            </div>


                            <div className="card-header" id="tituloDataTableDesktop">
                                <h5 className="card-title">Listado de beneficiarios </h5>
                            </div>

                            <div className="card-header" id="tituloDataTableDesktop">
                                <h5 className="card-title">Sube tus archivos aquí en formato pdf </h5>
                            </div>

                            <DataTabla title={<> <h5 className="card-title">Sube tus archivos aquí en formato pdf </h5> </>} columns={documentos.headers} data={stateRowsTableDocumentos} />

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