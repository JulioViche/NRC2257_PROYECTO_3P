navbarActive('#seguroIndex');

const gridOptions = {
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
    columnDefs: [
        {
            headerName: 'ID',
            field: 'id',
            width: 75,
            resizable: false,
            sort: "asc",
        },
        {
            headerName: 'ReservaID',
            field: 'reservaId',
            width: 100,
            resizable: false,
            hide: true
        },
        {
            headerName: 'Cliente',
            field: 'cliente',
            minWidth: 100,
            flex: 1,
            filter: true
        },
        {
            headerName: 'Vehículo',
            field: 'vehiculo',
            minWidth: 100,
            flex: 1,
            filter: true
        },
        dateColumn({
            headerName: 'Fecha inicial',
            field: 'reservaFechaInicio'
        }),
        dateColumn({
            headerName: 'Fecha final',
            field: 'reservaFechaFin'
        }),
        {
            headerName: 'Tipo de Seguro',
            field: 'tipoSeguro',
            width: 150,
            resizable: false
        },
        {
            headerName: 'Costo',
            field: 'costo',
            width: 100,
            resizable: false
        }
    ],
    onGridReady: options => {
        window.gridApi = options.api;
        renderGrid();
    },
    onFirstDataRendered: () => {
        const rows = document.querySelectorAll('.ag-row');
        rows.forEach(row => {
            row.classList.add('fadeIn');
        });
    }
};

const gridDiv = document.getElementById('datagrid');
const grid = agGrid.createGrid(gridDiv, gridOptions);

function renderGrid() {
    //if (!getValue('global-filter'))
        fetchGet('Seguro/listar', 'json', res => {
            window.gridApi.updateGridOptions({ rowData: res });
        });
    //else
    //    fetchGet('Reserva/filtrar?filtro=' + getValue('global-filter'), 'json', res => {
    //        window.gridApi.updateGridOptions({ rowData: res });
    //    });
}