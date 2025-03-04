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

// Fechas: Formatter, Sorter, Filter
function getDate(cellValue) {
    const [day, month, year] = cellValue.split(" ")[0].split("/").map(Number);
    return new Date(year, month - 1, day);
}

function dateFormatter(options) {
    const date = getDate(options.value);
    let weekday = date.toLocaleDateString("es-ES", { weekday: 'long' });
    weekday = weekday[0].toUpperCase() + weekday.slice(1);
    let day = date.toLocaleDateString("es-ES", { day: '2-digit' });
    let month = date.toLocaleDateString("es-ES", { month: 'short' });
    month = month[0].toUpperCase() + month.slice(1);
    let year = date.getFullYear();
    return `${weekday}, ${day}-${month}-${year}`;
}

function dateSorterComparator(cellDate1, cellDate2) {
    const date1 = getDate(cellDate1);
    const date2 = getDate(cellDate2);
    return date1 - date2;
}

function dateFilterComparator(filterLocalDateAtMidnight, cellValue) {
    const cellDate = getDate(cellValue);
    if (cellDate < filterLocalDateAtMidnight) return -1;
    if (cellDate > filterLocalDateAtMidnight) return 1;
    return 0;
}

function dateColumn(config) {
    return {
        headerName: config.headerName,
        field: config.field,
        comparator: dateSorterComparator,
        valueFormatter: dateFormatter,
        minWidth: 200,
        flex: 1,
        filter: 'agDateColumnFilter',
        filterParams: { comparator: dateFilterComparator }
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