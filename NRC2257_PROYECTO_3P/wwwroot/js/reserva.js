navbarActive('#reservaIndex');

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
            //hide: true
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
        {
            headerName: 'Fecha inicial',
            field: 'fechaInicio',
            valueFormatter: options => {
                return formattedDate(options.value)
            },
            minWidth: 100,
            flex: 1,
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: (filterLocalDateAtMidnight, cellValue) => {
                    const cellDate = getDate(cellValue);
                    if (cellDate < filterLocalDateAtMidnight) return -1;
                    if (cellDate > filterLocalDateAtMidnight) return 1;
                    return 0;
                }
            }
        },
        {
            headerName: 'Fecha final',
            field: 'fechaFin',
            valueFormatter: options => {
                console.log(options.value, getDate(options.value),formattedDate(options.value));
                return formattedDate(options.value)
            },
            minWidth: 100,
            flex: 1,
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: (filterLocalDateAtMidnight, cellValue) => {
                    const cellDate = getDate(cellValue);
                    if (cellDate < filterLocalDateAtMidnight) return -1;
                    if (cellDate > filterLocalDateAtMidnight) return 1;
                    return 0;
                }
            }
        },
        {
            headerName: 'Estado',
            field: 'estado',
            width: 125,
            resizable: false
        },
        operationsColumn({
            editable: false,
            deletable: false
        })
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
    },
    getRowClass: (params) => {
        if (params.data.estado === "En curso") return 'reserva-en-curso';
        if (params.data.estado === "Atrasada") return 'reserva-atrasada';
        if (params.data.estado === "Finalizada") return 'reserva-finalizada';
        return '';
    }
};

const gridDiv = document.getElementById('datagrid');
const grid = agGrid.createGrid(gridDiv, gridOptions);

function renderGrid() {
    //if (!getValue('global-filter'))
        fetchGet('Reserva/listar', 'json', res => {
            window.gridApi.updateGridOptions({ rowData: res });
        });
    //else
        //fetchGet('Vehiculo/filtrar?nombre=' + getValue('global-filter'), 'json', res => {
        //    window.gridApi.updateGridOptions({ rowData: res });
        //});
}

function resetGlobalFilter() {
    document.getElementById('global-filter-form').reset();
    renderGrid();
}