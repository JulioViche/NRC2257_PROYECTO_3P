window.onload = () => {
    renderTable();
}

let config = {
    headers: ['#', 'Nombre', 'Apellido', 'Cargo', 'Teléfono', 'Email'],
    properties: ['id', 'nombre', 'apellido', 'cargo', 'telefono', 'email'],
    identificator: 'id',
    editable: true,
    deletable: true,
    creatable: true
};
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
    if (confirm('¿Está seguro de eliminar el registro?')) {
        fetchGet('Empleado/eliminar?id=' + id, 'text', res => {
            renderTable();
            if (!parseInt(res)) alert('Error al eliminar');
        });
    }
}

function resetForm() {
    document.getElementById('search-form').reset();
    renderTable();
}