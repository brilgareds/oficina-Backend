import { AsteriskRequired } from '../../../components/AsteriskRequired/AsteriskRequired';
import { getFullNameUser } from '../../../generalHelpers';
import { useMiBilletera } from './hooks/useMiBilletera';
import './MiBilletera.css';

export const MiBilletera = () => {


    const dataUser = JSON.parse(localStorage.getItem('d_u'));
    const headerStyles = { backgroundColor: '#FFFFFF', color: '#344050', zIndex: 0 };
    const {
        formValue,
        stateSalarioUsuario,
        stateSumaDeGastos,
        statetTatalDisponible,
        tbodyTest,
        onChangeInputHandle,
        onClickGuardar,
    } = useMiBilletera(
        {
            columnsDataTable: [
                { title: 'Gasto', field: 'gasto', headerStyle: headerStyles },
                { title: 'Costo', field: 'costo', headerStyle: headerStyles },
                { title: 'Eliminar', field: 'accion', headerStyle: headerStyles },
            ],
            rowsDataTable: [],
            gasto: "",
            valorGasto: "",
            salarioUsuario: "$0",
            sumaDeGastos: "$0",
            tatalDisponible: "$0",
            loadingPage: true,
            loadingTable: false,
            billeteraNueva: true,
        },
        dataUser
    );

    const {gasto, valorGasto } = formValue;


    return (
        <>
            <div className="card mb-3">
                <div className="card-body position-relative textoMigaDePan">
                    <div className="row">
                        <div className="col-lg-8">
                            <h3>Mi billetera</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-5 cardCabeceraImagen">
                <img className="imagenCabecera" src="/assets/img/billetera/background-billetera.png" alt=""></img>
            </div>

            <div className="col-md-12">

                <div className="row">
                    <div className="col-md-3 p-4 dividorPantalla">
                        <div className="row">
                            <div className="col-md-12 textoPpal text-center">
                                Ingresar nuevo gasto:
                            </div>
                            <div className="col-12 col-lg-12 mb-3 text-center">
                                <span className="form-label texto2rio" htmlFor="gasto">Gasto:  <AsteriskRequired /> </span>
                                <input onChange={onChangeInputHandle} value={gasto} name="gasto" id="gasto" className="form-control inputsMiBilletera" placeholder="Tipo de gasto" type="text" />
                            </div>
                            <div className="col-12 col-lg-12 mb-4 text-center">
                                <span className="form-label texto2rio" htmlFor="valorGasto">Valor:  <AsteriskRequired /> </span>
                                <input onChange={onChangeInputHandle} value={valorGasto} name="valorGasto" id="valorGasto" className="form-control inputsMiBilletera" placeholder="Valor del gasto" type="text" />
                            </div>

                            <div className="col-12 col-lg-12 mb-4 text-left">
                                <span className="textoSalario">SALARIO: ${stateSalarioUsuario}</span>
                                <hr className="hrDividor" />
                                <span className="texto2rio">Total gastos: ${stateSumaDeGastos}</span>
                                <hr className="hrDividor" />
                                <span className="texto2rio">Total disponible: ${statetTatalDisponible}</span>
                            </div>

                            <div className="col-12 col-lg-12 mb-3 text-center">
                                <button onClick={onClickGuardar} className=" btns-billetera mb-3" type="button">
                                    Agregar y Guardar
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-6 p-4 dividorPantalla text-center">
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <span className="textoPpal">Gastos mensuales de<br /></span>
                                <span className="texto2rio">{getFullNameUser()}</span>
                            </div>
                            <div className="col-md-12">
                                {/* <DataTabla title={""} columns={columnsDataTable} data={rowsTable} toolbar={false} inputSearch={false} /> */}
                                <div className="row">
                                    <div className="col-md-12 table-responsive scrollbar" style={{ height: "300px" }}>
                                        <table className="tablle_billetera table table-striped overflow-hidden bg-light">
                                            <thead>
                                                <tr>
                                                    <th>Gasto</th>
                                                    <th>Costo</th>
                                                    <th>Eliminar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tbodyTest || ""}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 p-4">
                        <div className="row">
                            <div className="col-md-12 mb-5">
                                <span className="textoPpal">Estos son tus beneficios:<br /></span>
                                <span className="texto2rio">Descubre tus beneficios oprimiendo alguno de los botones de nuestras marcas aliadas.</span>
                            </div>
                            <div className="col-md-12 mb-4">
                                <a href="https://employeeexpierences.gointegro.com/authentication/login" target="_blank" rel="noreferrer">
                                    <img className="imgBeneficios" src="/assets/img/billetera/boton-employe.png" alt="boton-employe"></img>
                                </a>
                            </div>
                            <div className="col-md-12 mb-4">
                                <a href="https://www.fincomercio.com/" target="_blank" rel="noreferrer">
                                    <img className="imgBeneficios" src="/assets/img/billetera/boton-fincomercio.png" alt="boton-fincomercio"></img>
                                </a>
                            </div>
                            <div className="col-md-12 mb-4">
                                <a href="https://suenos.co/" target="_blank" rel="noreferrer">
                                    <img className="imgBeneficios" src="/assets/img/billetera/boton-suenos.png" alt="boton-suenos"></img>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
