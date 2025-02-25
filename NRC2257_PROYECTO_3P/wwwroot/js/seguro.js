window.onload = () => {
    renderTable();
}

let config = {
    headers: ['#', 'ReservaID', 'Cliente', 'Vehículo', 'Fecha Inicio', 'Fecha Fin', 'Tipo Seguro', 'Costo'],
    properties: ['id', 'reservaid', 'cliente', 'vehiculo', 'fechainicio', 'fechafin', 'tiposeguro', 'costo'],
    editable: true
};

async function renderTable() {
    if (getValue('email-input') === '' && getValue('name-input') === '') {
        config.url = 'Seguro/listar';
        config.method = 'get';
        createTable(config);
    }
    else {
        //let form = new FormData(document.getElementById('search-form'));
        //console.log(form);
        //config.url = 'Cliente/Filter';
        // Cliente/Create
        //config.method = 'post';
        //createTable(config, form);
    }
}

function search() {
    resetForm();
    renderTable();
}

function resetForm() {
    document.getElementById('search-form').reset();
}