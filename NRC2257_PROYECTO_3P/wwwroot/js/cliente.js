navbarActive('#clienteIndex');

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
            headerName: 'Nombre',
            field: 'nombre',
            minWidth: 100,
            flex: 1,
            filter: true
        },
        {
            headerName: 'Apellido',
            field: 'apellido',
            minWidth: 100,
            flex: 1,
            filter: true
        },
        {
            headerName: 'Teléfono',
            field: 'telefono',
            width: 125,
            resizable: false
        },
        {
            headerName: 'Email',
            field: 'email',
            minWidth: 200,
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
        fetchGet('Cliente/listar', 'json', res => {
            window.gridApi.updateGridOptions({ rowData: res });
        });
    else
        fetchGet('Cliente/filtrar?filtro=' + getValue('global-filter'), 'json', res => {
            window.gridApi.updateGridOptions({ rowData: res });
        });
}

async function update(id) {
    fetchGet('Cliente/recuperar?id=' + id, 'json', res => {
        setValue('id-input', res.id);
        setValue('nombre-input', res.nombre);
        setValue('apellido-input', res.apellido);
        setValue('telefono-input', res.telefono);
        setValue('email-input', res.email);
    });
    document.getElementById('modal-label').textContent = 'Editar Cliente';
    document.getElementById('modal-id-group').style.display = 'block';
    $('#save-modal').modal('show');
}


async function create() {
    document.getElementById('modal-form').reset();
    setValue('id-input', 0);
    document.getElementById('modal-label').textContent = 'Crear Cliente';
    document.getElementById('modal-id-group').style.display = 'none';
    $('#save-modal').modal('show');
}

async function save() {
    const form = new FormData(document.getElementById('modal-form'));
    fetchPost('Cliente/guardar', 'text', form, res => {
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

async function remove(id, rowIndex) {
    const rowNode = window.gridApi.getRowNode(rowIndex);
    const nombre = rowNode ? rowNode.data.nombre + ' ' + rowNode.data.apellido : 'UK';

    swalConfirmDelete('warning', '¿Está seguro de eliminar el registro del cliente ' + nombre + '?', () => {
        fetchGet('Cliente/eliminar?id=' + id, 'text', res => {
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

//window.onload = () => {
//    renderTable();
//}

//let config = {
//    headers: ['#', 'Nombre', 'Apellido', 'Teléfono', 'Correo electrónico'],
//    properties: ['id', 'nombre', 'apellido', 'telefono', 'email'],
//    editable: true
//};

//async function renderTable() {
//    if (getValue('email-input') === '' && getValue('name-input') === '') {
//        config.url = 'Cliente/listar';
//        config.method = 'get';
//        createTable(config);
//    }
//    else {
//        //let form = new FormData(document.getElementById('search-form'));
//        //console.log(form);
//        //config.url = 'Cliente/Filter';
//        // Cliente/Create
//        //config.method = 'post';
//        //createTable(config, form);
//    }
//}

//function search() {
//    resetForm();
//    renderTable();
//}

//function resetForm() {
//    document.getElementById('search-form').reset();
//}