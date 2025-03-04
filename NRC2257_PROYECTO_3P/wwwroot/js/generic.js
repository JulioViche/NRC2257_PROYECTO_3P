toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-bottom-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "0",
    "hideDuration": "0",
    "timeOut": "5000",
    "extendedTimeOut": "3000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function navbarActive(id) {
    $("#accordian ul li").removeClass("active");
    $(id).addClass("active");

    var tabsVerticalInner = $("#accordian");
    var activeItemVerticalInner = tabsVerticalInner.find('.active');
    var itemPosVerticalTop = activeItemVerticalInner.position();
    var itemPosVerticalLeft = activeItemVerticalInner.position();
    var activeWidthVerticalHeight = activeItemVerticalInner.innerHeight();
    var activeWidthVerticalWidth = activeItemVerticalInner.innerWidth();

    $(".selector-active").css({
        top: itemPosVerticalTop.top + "px",
        left: itemPosVerticalLeft.left + "px",
        height: activeWidthVerticalHeight + "px",
        width: activeWidthVerticalWidth + "px"
    });
}

// Columna de operaciones de AG Grid (Editar, Eliminar)
function operationsColumn(config) {
    return {
        headerName: '',
        width: 75,
        resizable: false,
        cellStyle: { padding: 0 },
        sortable: false,
        hide: !config.editable && !config.deletable,
        cellRenderer: options => {
            const container = document.createElement('div');
            container.classList.add('text-center', 'm-0', 'w-100');

            if (config.editable) {
                const updateBtn = document.createElement('a');
                updateBtn.setAttribute('title', 'Editar');
                updateBtn.classList.add('px-2', 'text-primary');
                updateBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
                updateBtn.addEventListener('click', () => {
                    update(options.data.id);
                });
                container.appendChild(updateBtn);
            }

            if (config.deletable) {
                const removeBtn = document.createElement('a');
                removeBtn.setAttribute('title', 'Eliminar');
                removeBtn.classList.add('px-2', 'text-danger');
                removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                removeBtn.addEventListener('click', () => {
                    remove(options.data.id, options.node.rowIndex);
                });
                container.appendChild(removeBtn);
            }

            return container;
        }
    }
}

async function fetchGet(url, type, callback) {
    try {
        let root = document.getElementById('root').value;
        let absoluteUrl = window.location.protocol + '//' + window.location.host + '/' + root + url;
        let res = await fetch(absoluteUrl);

        if (type === 'json') res = await res.json();
        if (type === 'text') res = await res.text();

        callback(res);

    } catch (error) {
        alert(error);
    }
}

async function fetchPost(url, type, form, callback) {
    try {
        let root = document.getElementById('root').value;
        let absoluteUrl = window.location.protocol + '//' + window.location.host + '/' + root + url;
        let res = await fetch(absoluteUrl, {
            method: 'POST',
            body: form
        });

        if (type === 'json') res = await res.json();
        if (type === 'text') res = await res.text();

        callback(res);
    } catch (error) {
        alert(error);
    }
}

function getValue(id) {
    return document.getElementById(id).value;
}

function setValue(id, value) {
    document.getElementById(id).value = value;
}

function swalConfirmDelete(icon, title, callback) {
    Swal.fire({
        title: title,
        text: 'Esta acción no se puede revertir',
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#777',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        } else {
            swalAlert('error', 'Cancelado', 'No se ha eliminado nada');
        }
    });
}

function swalAlert(icon, title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: '#777'
    });
}

//function createTable(config, form) {
//    let tableContainer = document.getElementById('datatable-container');
//    let table = document.getElementById('datatable');

//    // Crear la tabla si no existe
//    if (!table) {
//        table = document.createElement('table');
//        table.setAttribute('id', 'datatable');
//        table.classList.add('table', 'table-sm', 'table-hover', 'w-100');
//        tableContainer.appendChild(table);
//    }

//    // Obtener datos con métodos GET o POST
//    if (config.method === 'get')
//        fetchGet(config.url, 'json', res => updateTableContent(config, res));
//    if (config.method === 'post')
//        fetchPost(config.url, 'json', form, res => updateTableContent(config, res));
//}

//function updateTableContent(config, res) {
//    let table = document.getElementById('datatable');
//    table.innerHTML = generateTableContent(config, res);

//    // Destruir instancia previa de DataTables si existe
//    if ($.fn.dataTable.isDataTable('#datatable')) {
//        $('#datatable').DataTable().destroy();
//    }

//    // Inicializar DataTables con configuración mínima
//    new DataTable('#datatable');
//}

//function generateTableContent(config, res) {
//    let content = '<thead><tr>';
//    for (let header of config.headers) content += `<th>${header}</th>`;
//    content += (config.editable || config.deletable) ? '<th>Acciones</th>' : '';
//    content += '</tr></thead><tbody>';

//    for (let obj of res) {
//        content += '<tr>';
//        for (let property of config.properties) {
//            content += `<td>${obj[property]}</td>`;
//        }
//        if (config.editable || config.deletable) {
//            content += '<td>';
//            content += config.editable
//                ? `<a title="Editar" class="px-2 text-primary" onclick="update(${obj[config.identificator]})">
//                     <i class="fa-solid fa-pen-to-square"></i>
//                   </a>`
//                : '';
//            content += config.deletable
//                ? `<a title="Eliminar" class="px-2 text-danger" onclick="remove(${obj[config.identificator]})">
//                     <i class="fa-solid fa-trash-can"></i>
//                   </a>`
//                : '';
//            content += '</td>';
//        }
//        content += '</tr>';
//    }

//    content += '</tbody>';
//    return content;
//}
