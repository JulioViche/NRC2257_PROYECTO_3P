navbarActive('#pagoIndex');

window.onload = () => {
    renderTable();
}

let config = {
    headers: ['#', 'ReservaID', 'Cliente', 'Vehículo', 'Fecha Inicio', 'Fecha fin', 'Monto', 'Método Pago', 'Fecha Pago'],
    properties: ['id', 'reservaid', 'cliente', 'vehiculo', 'fechainicio', 'fechafin', 'monto','metodopago', 'fechapago'],
    editable: true
};

async function renderTable() {
    if (getValue('name-input') === '' && getValue('name-input') === '') {
        config.url = 'Pago/listar';
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