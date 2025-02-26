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

    if (!table) {
        table = document.createElement('table');
        table.setAttribute('id', 'datatable');
        table.classList.add('table', 'table-sm', 'table-hover', 'table-responsive', 'w-100', 'mb-0');
        tableContainer.appendChild(table);
    }

    if (config.method === 'get')
        fetchGet(config.url, 'json', res => table.innerHTML = generateTableContent(config, res));
    if (config.method === 'post')
        fetchPost(config.url, 'json', form, res => table.innerHTML = generateTableContent(config, res));
}

function generateTableContent(config, res) {
    let content = '';

    content += '<thead><tr>';
    for (header of config.headers) content += `<th class="px-lg-3 px-1">${header}</th>`;
    content += config.editable ? '<th></th>' : '';
    content += '</tr></thead>';

    content += '<tbody class"table-group-divider">';
    for (obj of res) {
        content += '<tr>';
        for (property of config.properties) content += `<td class="px-lg-3 px-1">${obj[property]}</td>`;
        if (config.editable || connfig.deletable) {
            content += '<td>';
            content += config.editable ? `<a title="Editar" class="px-2 text-primary" onclick="update(${obj[config.identificator]})"><i class="fa-solid fa-pen-to-square"></i></a>` : '';
            content += config.deletable ? `<a title="Eliminar" class="px-2 text-danger" onclick="remove(${obj[config.identificator]})"><i class="fa-solid fa-trash-can"></i></a>` : '';
            content += '</td>';
        }
        content += '</tr>';
    }
    if (config.creatable) {
        content += `<tr class="create text-center"><td title="Nuevo" class="text-success w-100" onclick="create()" colspan="${config.properties.length + (config.editable || config.deletable ? 1 : 0)}"><i class="fa-solid fa-plus"></i></td></tr>`;
    }
    content += '</tbody>';

    return content;
}