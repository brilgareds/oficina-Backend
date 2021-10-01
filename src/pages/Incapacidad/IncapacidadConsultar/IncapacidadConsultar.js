import React from 'react';
import { DataTabla } from '../../../components/DataTable/DataTabla';
import { useIncapacidadConsultar } from './hooks/useIncapacidadConsultar';
import './incapacidadConsultar.css';

export const IncapacidadConsultar = () => {

    const dataUser = JSON.parse(localStorage.getItem('d_u'));
    const headerStyles = { backgroundColor: '#EDF2F9', color: '#344050', zIndex: 0, };

    const {
        formValue,
        rowsTable,
    } = useIncapacidadConsultar(
        {
            columnsDataTable: [
                { title: 'Consecutivo', field: 'consecutivo', headerStyle: headerStyles },
                { title: 'Tipo incapacidad', field: 'tipo_incapacidad', headerStyle: headerStyles },
                { title: 'Documentos', field: 'documentos', headerStyle: headerStyles },
                { title: 'Estado', field: 'estado', headerStyle: headerStyles },
                { title: 'Actualizar', field: 'actualizar', headerStyle: headerStyles },
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
                            <h3>Consultar incapacidades</h3>
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
