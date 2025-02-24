window.onload = () => {
    renderTable();
}

let config = {
    headers: ['#', 'Nombre', 'Apellido', 'Cargo', 'Teléfono', 'Email'],
    properties: ['id', 'nombre', 'apellido', 'cargo', 'telefono', 'email'],
    editable: true
};

async function renderTable() {
    if (getValue('email-input') === '' && getValue('name-input') === '') {
        config.url = 'Empleado/Get';
        config.method = 'get';
        createTable(config);
    }
    else {
        let form = new FormData(document.getElementById('search-form'));
        console.log(form);
        config.url = 'Empleado/Filter';
        config.method = 'post';
        createTable(config, form);
    }
}

function search() {
    resetForm();
    renderTable();
}

function resetForm() {
    document.getElementById('search-form').reset();
}