﻿function navbarActive(id) {
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

function createTable(config, form) {
    let tableContainer = document.getElementById('datatable-container');
    let table = document.getElementById('datatable');

    // Crear la tabla si no existe
    if (!table) {
        table = document.createElement('table');
        table.setAttribute('id', 'datatable');
        table.classList.add('table', 'table-sm', 'table-hover', 'w-100');
        tableContainer.appendChild(table);
    }

    // Obtener datos con métodos GET o POST
    if (config.method === 'get')
        fetchGet(config.url, 'json', res => updateTableContent(config, res));
    if (config.method === 'post')
        fetchPost(config.url, 'json', form, res => updateTableContent(config, res));
}

function updateTableContent(config, res) {
    let table = document.getElementById('datatable');
    table.innerHTML = generateTableContent(config, res);

    // Destruir instancia previa de DataTables si existe
    if ($.fn.dataTable.isDataTable('#datatable')) {
        $('#datatable').DataTable().destroy();
    }

    // Inicializar DataTables con configuración mínima
    new DataTable('#datatable');
}

function generateTableContent(config, res) {
    let content = '<thead><tr>';
    for (let header of config.headers) content += `<th>${header}</th>`;
    content += (config.editable || config.deletable) ? '<th>Acciones</th>' : '';
    content += '</tr></thead><tbody>';

    for (let obj of res) {
        content += '<tr>';
        for (let property of config.properties) {
            content += `<td>${obj[property]}</td>`;
        }
        if (config.editable || config.deletable) {
            content += '<td>';
            content += config.editable
                ? `<a title="Editar" class="px-2 text-primary" onclick="update(${obj[config.identificator]})">
                     <i class="fa-solid fa-pen-to-square"></i>
                   </a>`
                : '';
            content += config.deletable
                ? `<a title="Eliminar" class="px-2 text-danger" onclick="remove(${obj[config.identificator]})">
                     <i class="fa-solid fa-trash-can"></i>
                   </a>`
                : '';
            content += '</td>';
        }
        content += '</tr>';
    }

    content += '</tbody>';
    return content;
}
