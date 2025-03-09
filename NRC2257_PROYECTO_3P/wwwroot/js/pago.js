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
        },
        operationsColumn({
            editable: true,
            deletable: true,
            finalizable: false,
            seguro: false,
            createPago: false
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
    }
};

const gridDiv = document.getElementById('datagrid');
const grid = agGrid.createGrid(gridDiv, gridOptions);

function renderGrid() {
    fetchGet('Pago/listar', 'json', res => {
        window.gridApi.updateGridOptions({ rowData: res });
    });
}

function renderGrid() {
    if (!getValue('global-filter'))
        fetchGet('Pago/listar', 'json', res => {
            window.gridApi.updateGridOptions({ rowData: res });
        });
    else
        fetchGet('Pago/filtrar?filtro=' + getValue('global-filter'), 'json', res => {
            window.gridApi.updateGridOptions({ rowData: res });
        });
}

function update(id) {
    fetchGet('Pago/recuperar?id=' + id, 'json', res => {
        setValue('id-input', res.id);
        setValue('reservaId-input', res.reservaId);
        setValue('cliente-input', res.cliente);
        setValue('vehiculo-input', res.vehiculo);
        setValue('reservaFechaInicio-input', res.reservaFechaInicio);
        setValue('reservaFechaFin-input', res.reservaFechaFin);
        setValue('monto-input', res.monto);
        setValue('metodoPago-input', res.metodoPago);
        setValue('fechaPago-input', res.fechaPago); 
        
        $('#save-modal').modal('show');
    });
    document.getElementById('modal-label').textContent = 'Editar Pago';
    document.getElementById('modal-id-group').style.display = 'block';
    $('#save-modal').modal('show');
}

function create() {
    document.getElementById('modal-form').reset();
    setValue('id-input', 0);
    document.getElementById('modal-label').textContent = 'Registrar Pago';
    document.getElementById('modal-id-group').style.display = 'none';
    $('#save-modal').modal('show');
}

function save() {
    const form = new FormData(document.getElementById('modal-form'));
    fetchPost('Pago/guardar', 'text', form, res => {
        if (parseInt(res)) {
            $('#save-modal').modal('hide');
            renderGrid();
            toastr.success('', 'Cambios guardados con éxito.');
        } else {
            swalAlert('error', 'Ups...', 'Algo ha salido mal');
            toastr.error('Error al guardar en la base de datos', 'ERROR');
        }
    });
}

function remove(id, rowIndex) {
    const rowNode = window.gridApi.getRowNode(rowIndex);
    const nombre = rowNode ? rowNode.data.cliente : 'este pago';

    swalConfirmDelete('warning', '¿Está seguro de eliminar el pago de ' + nombre + '?', () => {
        fetchGet('Pago/eliminar?id=' + id, 'text', res => {
            if (parseInt(res)) {
                renderGrid();
                swalAlert('success', 'Eliminado', 'El pago ha sido eliminado');
            } else {
                swalAlert('error', 'Error', 'No se pudo eliminar el pago');
            }
        });
    });
}

function resetGlobalFilter() {
    document.getElementById('global-filter-form').reset();
    renderGrid();
}