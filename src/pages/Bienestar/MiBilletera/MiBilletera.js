import { DataTabla } from '../../../components/DataTable/DataTabla';
import { getFullNameUser } from '../../../generalHelpers';
import { useMiBilletera } from './hooks/useMiBilletera';
import './MiBilletera.css';

export const MiBilletera = () => {


    const dataUser = JSON.parse(localStorage.getItem('d_u'));
    const headerStyles = { backgroundColor: '#FFFFFF', color: '#344050', zIndex: 0 };
    const {
        formValue,
        rowsTable,
        stateSalarioUsuario,
        stateSumaDeGastos,
        statetTatalDisponible,
        onChangeInputHandle,
        onClickGuardar,
    } = useMiBilletera(
        {
            columnsDataTable: [
                { title: 'GASTO', field: 'gasto', headerStyle: headerStyles },
                { title: 'COSTO', field: 'costo', headerStyle: headerStyles },
                { title: 'ELIMINAR', field: 'accion', headerStyle: headerStyles },
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

    const { columnsDataTable, gasto, valorGasto } = formValue;


    return (
        <>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-7 p-4 dividorPantalla text-center">
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <span className="textoPpal">Gastos mensuales de<br /></span>
                                        <span className="texto2rio">{getFullNameUser()}</span>
                                    </div>
                                    <div className="col-md-12">
                                        <DataTabla title={""} columns={columnsDataTable} data={rowsTable} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 p-4">
                                <div className="row">
                                    <div className="col-md-12 textoPpal text-center">
                                        Ingresar nuevo gasto:
                                    </div>
                                    <div className="col-12 col-lg-12 mb-3 text-center">
                                        <span className="form-label texto2rio" htmlFor="gasto">Gasto: </span>
                                        <input onChange={onChangeInputHandle} value={gasto} name="gasto" id="gasto" className="form-control inputsMiBilletera" placeholder="Tipo de gasto" type="text" />
                                    </div>
                                    <div className="col-12 col-lg-12 mb-4 text-center">
                                        <span className="form-label texto2rio" htmlFor="valorGasto">valor: </span>
                                        <input onChange={onChangeInputHandle} value={valorGasto} name="valorGasto" id="valorGasto" className="form-control inputsMiBilletera" placeholder="Valor del gasto" type="number" />
                                    </div>
                                    <div className="col-12 col-lg-12 mb-3 text-center">
                                        <button className=" btns-billetera mb-3" type="button">
                                            Agregar
                                        </button>
                                    </div>

                                    <div className="col-12 col-lg-12 mb-4 text-left">
                                        <span className="textoSalario">SALARIO: ${stateSalarioUsuario}</span>
                                        <hr />
                                        <span className="texto2rio">Total gastos: ${stateSumaDeGastos}</span>
                                        <hr />
                                        <span className="texto2rio">Total disponible: ${statetTatalDisponible}</span>
                                    </div>

                                    <div className="col-12 col-lg-12 mb-3 text-center">
                                        <button onClick={onClickGuardar} className=" btns-billetera mb-3" type="button">
                                            Guardar
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </>
    )
}
