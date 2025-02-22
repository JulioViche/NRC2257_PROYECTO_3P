window.onload = () => {
    renderTable();
}

let config = {
    headers: ['#', 'Nombre', 'Apellido', 'Teléfono', 'Correo electrónico'],
    properties: ['id', 'nombre', 'apellido', 'telefono', 'email'],
    editable: true
};

async function renderTable() {
    if (getValue('email-input') === '' && getValue('name-input') === '') {
        config.url = 'Cliente/Get';
        config.method = 'get';
        createTable(config);
    }
    else {
        //let form = new FormData(document.getElementById('search-form'));
        //console.log(form);
        //config.url = 'Cliente/Filter';
        //config.method = 'post';
        //createTable(config, form);
    }
}

function search() {
    renderTable();
    clear();
}

function clear() {
    document.getElementById('search-form').reset();
    setTimeout(renderTable(), 0);
}