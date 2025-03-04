navbarActive('#vehiculoIndex');

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
            sort: "asc"
        },
        {
            headerName: 'Marca',
            field: 'marca',
            minWidth: 100,
            flex: 1,
            filter: true
        },
        {
            headerName: 'Modelo',
            field: 'modelo',
            minWidth: 100,
            flex: 1,
            filter: true
        },
        {
            headerName: 'Año',
            field: 'año',
            width: 125,
            resizable: false,
            filter: true
        },
        {
            headerName: 'Estado',
            field: 'estado',
            width: 125,
            resizable: false
        },
        {
            headerName: 'Precio',
            field: 'precio',
            minWidth: 125,
            flex: 1,
            filter: true
        },
        operationsColumn({
            editable: true,
            deletable: true
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
    if (!getValue('global-filter'))
        fetchGet('Vehiculo/listar', 'json', res => {
            window.gridApi.updateGridOptions({ rowData: res });
        });
    else
        fetchGet('Vehiculo/filtrar?filtro=' + getValue('global-filter'), 'json', res => {
            window.gridApi.updateGridOptions({ rowData: res });
        });
}

function update(id) {
    fetchGet('Vehiculo/recuperar?id=' + id, 'json', res => {
        setValue('id-input', res.id);
        setValue('marca-input', res.marca);
        setValue('modelo-input', res.modelo);
        setValue('año-input', res.año);
        setValue('precio-input', res.precio);
    });
    document.getElementById('modal-label').textContent = 'Editar Vehículo';
    document.getElementById('modal-id-group').style.display = 'block';
    $('#save-modal').modal('show');
}


function create() {
    document.getElementById('modal-form').reset();
    setValue('id-input', 0);
    document.getElementById('modal-label').textContent = 'Registrar Vehículo';
    document.getElementById('modal-id-group').style.display = 'none';
    $('#save-modal').modal('show');
}

function save() {
    const form = new FormData(document.getElementById('modal-form'));
    fetchPost('Vehiculo/guardar', 'text', form, res => {
        console.log(getValue('id-input'));
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
    const nombre = rowNode ? rowNode.data.marca + ' ' + rowNode.data.modelo + ' ' + rowNode.data.año : 'UK';

    swalConfirmDelete('warning', '¿Está seguro de eliminar el registro del vehículo ' + nombre + '?', () => {
        fetchGet('Vehiculo/eliminar?id=' + id, 'text', res => {
            if (parseInt(res)) {
                renderGrid();
                swalAlert('success', 'Eliminado', 'El registro ha sido eliminado');
                toastr.success('El registro ha sido eliminado', 'Eliminado');
            } else {
                swalAlert('error', 'Ups...', 'Algo ha salido mal');
                toastr.error('Error al eliminar en la base de datos', 'ERROR');
            }
        });
    });
}

function resetGlobalFilter() {
    document.getElementById('global-filter-form').reset();
    renderGrid();
}