navbarActive('#pagoIndex');

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
        dateColumn({
            headerName: 'Fecha de pago',
            field: 'fechaPago'
        }),
        {
            headerName: 'Método de Pago',
            field: 'metodoPago',
            width: 150,
            resizable: false
        },
        {
            headerName: 'Monto',
            field: 'monto',
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
    fetchGet('Pago/listar', 'json', res => {
        window.gridApi.updateGridOptions({ rowData: res });
    });
    //else
    //    fetchGet('Reserva/filtrar?filtro=' + getValue('global-filter'), 'json', res => {
    //        window.gridApi.updateGridOptions({ rowData: res });
    //    });
}