window.onload = () => {
    renderTable();
}

let config = {
    headers: ['#', 'Nombre', 'Apellido', 'Cargo', 'Teléfono', 'Email'],
    properties: ['id', 'nombre', 'apellido', 'cargo', 'telefono', 'email'],
    editable: true
};

async function renderTable() {
    if (getValue('nombre-input') === '') {
        config.url = 'Empleado/listar';
        config.method = 'get';
        createTable(config);
    }
    else {
        let form = new FormData(document.getElementById('search-form'));
        config.url = 'Empleado/filtrar';
        config.method = 'post';
        createTable(config, form);
    }
}

function resetForm() {
    document.getElementById('search-form').reset();
    renderTable();
}