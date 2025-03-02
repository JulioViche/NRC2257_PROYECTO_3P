navbarActive('#empleadoIndex');

let config = {
    headers: ['#', 'Nombre', 'Apellido', 'Cargo', 'Teléfono', 'Email'],
    properties: ['id', 'nombre', 'apellido', 'cargo', 'telefono', 'email'],
    identificator: 'id',
    editable: true,
    deletable: true,
    creatable: true
};

const gridOptions = {
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
    columnDefs: [
        {
            headerName: 'ID',
            field: 'id',
            resizable: false,
            width: 100,
            sort: "asc"
        },
        {
            headerName: 'Nombre',
            field: 'nombre',
            minWidth: 150,
            filter: true
        },
        {
            headerName: 'Apellido',
            field: 'apellido',
            minWidth: 150,
            filter: true
        },
        {
            headerName: 'Cargo',
            field: 'cargo',
            resizable: false,
            width: 100
        },
        {
            headerName: 'Teléfono',
            field: 'telefono',
            minWidth: 100
        },
        {
            headerName: 'Email',
            field: 'email',
            minWidth: 200,
            filter: true
        }
    ],
    onGridReady: params => {
        gridOptions.api = params.api;
    }
};

window.onload = () => {
    renderGrid();
    agGrid.createGrid(document.querySelector('#datagrid'), gridOptions);
}

function renderGrid() {
    console.log(!$('#nombre-input').val());
    if (!$('#nombre-input').val())
        fetchGet('Empleado/listar', 'json', res => {
            gridOptions.rowData = res;
            console.log(res);
            recreateGrid();
        });
    else
        fetchGet('Empleado/filtrar?nombre=' + $('#nombre-input').val(),'json', res => {
            gridOptions.rowData = Array.isArray(res) ? res : [res];
            console.log(res);
            recreateGrid();
        });
}

function recreateGrid() {
    const gridDiv = document.querySelector('#datagrid');
    gridDiv.innerHTML = '';
    new agGrid.createGrid(gridDiv, gridOptions);
}

function renderTable() {
    if (getValue('nombre-input') === '')
        list();
    else
        filter();
}

async function list() {
    config.url = 'Empleado/listar';
    config.method = 'get';
    createTable(config);
}


async function filter() {
    let form = new FormData(document.getElementById('search-form'));
    config.url = 'Empleado/filtrar';
    config.method = 'post';
    createTable(config, form);
}


async function update(id) {
    fetchGet('Empleado/recuperar?id=' + id, 'json', res => {
        setValue('modal-id-input', res.id);
        setValue('modal-nombre-input', res.nombre);
        setValue('modal-apellido-input', res.apellido);
        setValue('modal-cargo-input', res.cargo);
        setValue('modal-telefono-input', res.telefono);
        setValue('modal-email-input', res.email);
    });
    document.getElementById('modal-label').textContent = 'Editar Empleado';
    document.getElementById('modal-id-group').style.display = 'block';
    $('#save-modal').modal('show');
}


async function create() {
    document.getElementById('modal-form').reset();
    setValue('modal-id-input', 0);
    document.getElementById('modal-label').textContent = 'Crear Empleado';
    document.getElementById('modal-id-group').style.display = 'none';
    $('#save-modal').modal('show');
}


async function save() {
    let form = new FormData(document.getElementById('modal-form'));
    fetchPost('Empleado/guardar', 'text', form, res => {
        renderTable();
        if (parseInt(res)) $('#save-modal').modal('hide');
        else alert('Error al guardar');
    });
}


async function remove(id) {
    fetchGet('Empleado/Recuperar?id=' + id, 'json', res => {
        let Nombre = res.nombre;

        Confirmacion(undefined, "¿Desea eliminar: " + Nombre + "?", function () {
            fetchGet('Empleado/Eliminar?id=' + id, 'text', res => {
                Exito(); ErrorG();
                renderTable();
                if (!parseInt(res)) alert('Error al eliminar');
            });
        });
    });
} 


function resetForm() {
    document.getElementById('search-form').reset();
    renderTable();
    renderGrid();
}