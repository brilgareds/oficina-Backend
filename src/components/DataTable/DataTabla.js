import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import './dataTabla.css';

export const DataTabla = ({ title, columns, data, paging = true, search = true, toolbar = true, backgroundColor, color, onRowAdd = undefined, onRowDelete = undefined }) => {

    const tableIcons = {
        Add: forwardRef((props, ref) => <div className='containerAddCircleIcon'><AddCircleIcon className='addCircleIcon' style={{ fontSize: '2rem', color: '#1780e8' }} {...props} ref={ref} /></div>),
        Check: forwardRef((props, ref) => <Check style={{ color: '#1780e8' }} {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear style={{ color: 'darkred' }} {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    return (
        <MaterialTable
            icons={tableIcons}
            title={title}
            columns={columns}
            data={data}
            editable={{
                onRowAdd,
                onRowDelete
            }}
            options={{
                paging,
                pageSize: 10,
                maxBodyHeight: 400,
                headerStyle: { backgroundColor, color },
                search,
                toolbar
            }}
            localization={{
                toolbar: {
                    searchPlaceholder: 'Buscar...',
                },
                header: {
                    actions: ''
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsSelect: 'Filas'
                },
                body: {
                    addTooltip: 'Agregar',
                    deleteTooltip: 'Eliminar',
                    editRow: {
                        cancelTooltip: 'Cancelar',
                        saveTooltip: 'Confirmar',
                        deleteText: '??Est?? seguro que desea eliminar el item?',
                    },
                    emptyDataSourceMessage: 'No hay informaci??n',
                },
            }}
        />
    )

}

DataTabla.propTypes = {
    title: PropTypes.any.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
};

DataTabla.defaultProps = {
    title: "Tabla de datos",
    columns: [],
    data: [],
}

