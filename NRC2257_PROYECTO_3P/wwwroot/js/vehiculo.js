window.onload = () => {
    renderTable();
}

let config = {
    headers: ['#', 'Marca', 'Modelo', 'Año', 'Precio',  'Estado'],
    properties: ['id', 'marca', 'modelo', 'año', 'precio', 'estado'],
    editable: truemodelo
};

async function renderTable() {
    if (getValue('email-input') === '' && getValue('name-input') === '') {
        config.url = 'Vehiculo/listar';
        config.method = 'get';
        createTable(config);
    }
    else {
        let form = new FormData(document.getElementById('search-form'));
        console.log(form);
        config.url = 'Cliente/filtrar';
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