
import { DataTabla } from '../../../components/DataTable/DataTabla';
import { useEpsCajaConsultar } from './hooks/useEpsCajaConsultar';
import './epsCajaConsultar.css';

export const EpsCajaConsultar = () => {


    const dataUser = JSON.parse(localStorage.getItem('d_u'));
    const headerStyles = { backgroundColor: '#EDF2F9', color: '#344050', zIndex: 0, };

    const {
        formValue,
        rowsTable,
    } = useEpsCajaConsultar(
        {
            columnsDataTable: [
                { title: 'CONSECUTIVO', field: 'consecutivo', headerStyle: headerStyles },
                { title: 'CEDULA INCAPACIDAD', field: 'cedulaIncapacidad', headerStyle: headerStyles },
                { title: 'NOMBRE', field: 'nombre', headerStyle: headerStyles },
                { title: 'PARENTESCO', field: 'parentesco', headerStyle: headerStyles },
                { title: 'EPS', field: 'eps', headerStyle: headerStyles },
                { title: 'CAJA COMPENSACION', field: 'cajaCompensacion', headerStyle: headerStyles },
                { title: 'ESTADO', field: 'estado', headerStyle: headerStyles },
                { title: 'DOCUMENTOS', field: 'documentos', headerStyle: headerStyles },
            ],
            rowsDataTable: [],
            files: [],
            loadingPage: true,
            loadingTable: false,
        },
        dataUser
    );

    const { columnsDataTable } = formValue;


    return (
        <>
            <div className="card mb-3">
                <div className="card-body position-relative textoMigaDePan">
                    <div className="row">
                        <div className="col-lg-8">
                            <h3>Consulta de solicitud Beneficiarios</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3">

                <div className="card-body bg-light">
                    <DataTabla title={""} columns={columnsDataTable} data={rowsTable} />
                </div>
            </div>

        </>
    )
}
