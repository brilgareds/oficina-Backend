
import { DataTabla } from '../../../components/DataTable/DataTabla';
import { useEpsCajaConsultar } from './hooks/useEpsCajaConsultar';
import './epsCajaConsultar.css';

export const EpsCajaConsultar = () => {


    const dataUser = JSON.parse(localStorage.getItem('d_u'));
    const headerStyles = { backgroundColor: '#EDF2F9', color: '#344050', zIndex: 0, textAlign: "center" };

    const {
        formValue,
        rowsTable,
    } = useEpsCajaConsultar(
        {
            columnsDataTable: [
                { title: 'Número radicado', field: 'consecutivo', headerStyle: headerStyles },
                { title: 'Documento identidad', field: 'cedulaIncapacidad', headerStyle: headerStyles },
                { title: 'Nombre', field: 'nombre', headerStyle: headerStyles },
                { title: 'Parentesco', field: 'parentesco', headerStyle: headerStyles },
                { title: 'Eps', field: 'eps', headerStyle: headerStyles },
                { title: 'Caja compensación', field: 'cajaCompensacion', headerStyle: headerStyles },
                { title: 'Estado', field: 'estado', headerStyle: headerStyles },
                { title: 'Documentos', field: 'documentos', headerStyle: headerStyles },
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
                            <h3>Consulta solicitudes inclusión de beneficiarios</h3>
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
