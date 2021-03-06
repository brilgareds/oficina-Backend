import React from 'react';
import { DataTabla } from '../DataTable/DataTabla';

export const CartaIngresoMateriales = ({setForm, form}) => {

    const headerStyle = { zIndex: 0 };
    const columns = [
        { title: 'Material',  field: 'material',  validate: rowData => !!rowData.material, headerStyle },
        { title: 'Cantidad',  field: 'cantidad',  validate: rowData => !!rowData.cantidad && rowData.cantidad>0, headerStyle, type: 'numeric' },
        { title: 'Tipo Mov.', field: 'accion',    validate: rowData => !!rowData.accion, headerStyle, lookup: { 1: 'Ingreso', 2: 'Retiro' } }
    ];

    const onRowAdd = async(newValue) => await setForm(old_data => ({ ...old_data, materials: [...(old_data.materials || []), newValue] }));

    const onRowDelete = async(dataToRemove) => (
        await setForm(oldValue => {
            const materials = [ ...oldValue.materials ];
            materials.splice(dataToRemove.tableData.id, 1);

            return { ...oldValue, materials };
        })
    );

    return (
        <div>
            <DataTabla
                title={'Movimiento de Materiales'}
                columns={columns}
                data={form.materials}
                search={false}
                backgroundColor={'#edf2f9'}
                color={'#344050'}
                onRowAdd={onRowAdd}
                onRowDelete={onRowDelete}
            />
        </div>
    )
}