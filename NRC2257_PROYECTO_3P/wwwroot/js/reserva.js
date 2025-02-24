window.onload = () => {
    renderTable();
}

let config = {
    headers: ['#', 'Cliente ID', 'Vehículo ID', 'Cliente', 'Vehículo', 'Fecha Inicio', 'Fecha Fin', 'Estado'],
    properties: ['id', 'clienteid', 'vehiculoid', 'cliente', 'vehiculo', 'fechainicio', 'fechafin', 'estado'],
    editable: true
};

async function renderTable() {
    if (getValue('email-input') === '' && getValue('name-input') === '') {
        config.url = 'Empleado/Get';
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