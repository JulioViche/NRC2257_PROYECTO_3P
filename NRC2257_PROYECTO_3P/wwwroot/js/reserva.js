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
            editable: false,
            deletable: false
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

async function renderClienteOptions() {
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

async function renderVehiculoOptions() {
    let vehiculoInput = document.getElementById('vehiculo-input');
    let url = getValue('vehiculo-filter') ? 'Vehiculo/filtrar?filtro=' + getValue('vehiculo-filter') : 'Vehiculo/listar';
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

function create() {
    document.getElementById('modal-form').reset();
    setValue('id-input', 0);
    document.getElementById('modal-label').textContent = 'Registrar Reserva';
    document.getElementById('modal-id-group').style.display = 'none';
    $('#save-modal').modal('show');
    renderClienteOptions();
    renderVehiculoOptions();
}

async function update(id) {
    fetchGet('Cliente/recuperar?id=' + id, 'json', res => {
        setValue('id-input', res.id);
        setValue('cliente-input', res.clienteId);
        setValue('vehiculo-input', res.vehiculoId);
        setValue('fecha-inicio-input', res.fechaInicio);
        setValue('fecha-fin-input', res.fechaFin);
    });
    document.getElementById('modal-label').textContent = 'Editar Reserva';
    document.getElementById('modal-id-group').style.display = 'block';
    $('#save-modal').modal('show');
}

async function save() {
    const form = new FormData(document.getElementById('modal-form'));
    form.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });
    //fetchPost('Cliente/guardar', 'text', form, res => {
    //    if (parseInt(res)) {
    //        $('#save-modal').modal('hide');
    //        renderGrid();
    //        toastr.success('', 'Cambios guardados con éxito.');
    //    } else {
    //        swalAlert('error', 'Ups...', 'Algo ha salido mal');
    //        toastr.error('Error al guardar en la base de datos', 'ERROR');
    //    }
    //});
}

function resetGlobalFilter() {
    document.getElementById('global-filter-form').reset();
    renderGrid();
}