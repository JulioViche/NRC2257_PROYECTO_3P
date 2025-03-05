navbarActive('#reservaIndex');

const gridOptions = {
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
    columnDefs: [
        {
            headerName: 'ID',
            field: 'id',
            width: 75,
            resizable: false,
            sort: "asc",
        },
        {
            headerName: 'ClienteID',
            field: 'clienteId',
            width: 100,
            resizable: false,
            hide: true
        },
        {
            headerName: 'VehiculoID',
            field: 'vehiculoId',
            width: 100,
            resizable: false,
            hide: true
        },
        {
            headerName: 'Cliente',
            field: 'cliente',
            minWidth: 100,
            flex: 1,
            filter: true
        },
        {
            headerName: 'Vehículo',
            field: 'vehiculo',
            minWidth: 100,
            flex: 1,
            filter: true
        },
        dateColumn({
            headerName: 'Fecha inicial',
            field: 'fechaInicio'
        }),
        dateColumn({
            headerName: 'Fecha final',
            field: 'fechaFin'
        }),
        {
            headerName: 'Estado',
            field: 'estado',
            width: 125,
            resizable: false
        },
        operationsColumn({
            seguro: true,
            createPago: true,
            finalizable: true
        })
    ],
    onGridReady: options => {
        window.gridApi = options.api;
        renderGrid();
    },
    onFirstDataRendered: () => {
        const rows = document.querySelectorAll('.ag-row');
        rows.forEach(row => {
            row.classList.add('fadeIn');
        });
    },
    getRowClass: (params) => {
        if (params.data.estado === "En curso") return 'reserva-en-curso';
        if (params.data.estado === "Atrasada") return 'reserva-atrasada';
        if (params.data.estado === "Finalizada") return 'reserva-finalizada';
        return '';
    }
};

const gridDiv = document.getElementById('datagrid');
const grid = agGrid.createGrid(gridDiv, gridOptions);

function renderGrid() {
    if (!getValue('global-filter'))
        fetchGet('Reserva/listar', 'json', res => {
            window.gridApi.updateGridOptions({ rowData: res });
        });
    else
        fetchGet('Reserva/filtrar?filtro=' + getValue('global-filter'), 'json', res => {
            window.gridApi.updateGridOptions({ rowData: res });
        });
}

function renderClienteOptions() {
    let clienteInput = document.getElementById('cliente-input');
    let url = getValue('cliente-filter') ? 'Cliente/filtrar?filtro=' + getValue('cliente-filter') : 'Cliente/listar';
    let text = getValue('cliente-filter') ? '' : '<option value="0">Selecciona un cliente</option>';
    fetchGet(url, 'json', res => {
        clienteInput.innerHTML = text;
        for (let obj of res) {
            let option = document.createElement('option');
            option.value = obj.id;
            option.textContent = `${obj.nombre} ${obj.apellido} (${obj.email})`;
            clienteInput.appendChild(option);
        }
    });
}

function renderVehiculoOptions() {
    let vehiculoInput = document.getElementById('vehiculo-input');
    let url = getValue('vehiculo-filter') ? 'Vehiculo/filtrar?filtro=Disponible ' + getValue('vehiculo-filter') : 'Vehiculo/filtrar?filtro=Disponible';
    let text = getValue('vehiculo-filter') ? '' : '<option value="0">Selecciona un vehículo</option>';
    fetchGet(url, 'json', res => {
        vehiculoInput.innerHTML = text;
        for (let obj of res) {
            let option = document.createElement('option');
            option.value = obj.id;
            option.textContent = `${obj.marca} ${obj.modelo} (${obj.año})`;
            vehiculoInput.appendChild(option);
        }
    });
}

function renderTipoSeguro() {
    let seguroInput = document.getElementById('seguro-input');
    fetchGet('Seguro/listarTiposSeguro', 'json', res => {
        seguroInput.innerHTML = '<option value = "">Ninguno</option>';
        for (let obj of res) {
            let option = document.createElement('option');
            option.value = obj;
            option.textContent = obj;
            seguroInput.appendChild(option);
        }
    });
}

function renderMetodoPago() {
    let seguroInput = document.getElementById('pago-input');
    for (let obj of ['Efectivo', 'Tarjeta']) {
        let option = document.createElement('option');
        option.value = obj;
        option.textContent = obj;
        seguroInput.appendChild(option);
    }
}

function create() {
    document.getElementById('modal-form').reset();
    setValue('id-input', 0);
    document.getElementById('modal-label').textContent = 'Registrar Reserva';
    document.getElementById('modal-id-group').style.display = 'none';
    $('#save-modal').modal('show');
    renderClienteOptions();
    renderVehiculoOptions();
    renderTipoSeguro();
    renderMetodoPago();
}

function save() {
    let reservaForm = new FormData(document.getElementById('modal-form'));
    fetchPost('Reserva/guardar', 'text', reservaForm, res => {
        if (parseInt(res)) {
            console.log(parseInt(res))
            saveSeguro(parseInt(res));
            savePago(parseInt(res));
            $('#save-modal').modal('hide');
            renderGrid();
            toastr.success('', 'Cambios guardados con éxito.');
        } else {
            swalAlert('error', 'Ups...', 'Algo ha salido mal');
            toastr.error('Error al guardar en la base de datos', 'ERROR');
        }
    });
}

function saveSeguro(id) {
    let seguroForm = new FormData(document.getElementById('seguro-modal-form'));
    seguroForm.set('Id', 0);
    seguroForm.set('ReservaId', id);
    seguroForm.set('Costo', 100);
    fetchPost('Seguro/guardar', 'text', seguroForm, res => {});
}

function savePago(id) {
    let pagoForm = new FormData(document.getElementById('pago-modal-form'));
    pagoForm.set('Id', 0);
    pagoForm.set('FechaPago', new Date().toISOString().split('T')[0]);
    pagoForm.set('Monto', 200);
    pagoForm.set('ReservaId', id);
    fetchPost('Pago/guardar', 'text', pagoForm, res => { });
}

function mostrarSeguro() {
    window.location.href = 'Seguro/Index';
}

function mostrarPago() {
    window.location.href = 'Pago/Index';
}

function resetGlobalFilter() {
    document.getElementById('global-filter-form').reset();
    renderGrid();
}