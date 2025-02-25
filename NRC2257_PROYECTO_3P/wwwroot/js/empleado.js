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
    var modal = new bootstrap.Modal(document.getElementById('update-modal'));
    modal.show();

    fetchGet('Empleado/recuperar?id=' + id, 'json', res => {
        setValue('modal-id-input', res.id);
        setValue('modal-nombre-input', res.nombre);
        setValue('modal-apellido-input', res.apellido);
        setValue('modal-cargo-input', res.cargo);
        setValue('modal-telefono-input', res.telefono);
        setValue('modal-email-input', res.email);
    });
}

function resetForm() {
    document.getElementById('search-form').reset();
    renderTable();
}