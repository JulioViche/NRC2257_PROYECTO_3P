navbarActive('#homeIndex');
document.body.classList.add('home-body');

function scrollToImage(carouselId, imageIndex) {
    const carousel = document.getElementById(carouselId);
    const imageWidth = carousel.clientWidth;
    carousel.scrollLeft = imageWidth * imageIndex;
}

// Navegación entre tarjetas
const cardCarousel = document.getElementById('cardCarousel');
const nextCardBtn = document.getElementById('nextCard');
const prevCardBtn = document.getElementById('prevCard');
const cards = document.querySelectorAll('.card');

//// Ancho de una tarjeta incluyendo el espaciado
//const cardWidth = cards[0].offsetWidth + 24; // 24px es el espacio entre tarjetas (space-x-6)

nextCardBtn.addEventListener('click', () => {
    
});

prevCardBtn.addEventListener('click', () => {
    cardCarousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});


//Para listar los vehiculos en el form de reservas
function renderVehiculoOptions() {
    let vehiculoInput = document.getElementById('vehiculo-input');

    // Always use the base list URL
    let url = 'Vehiculo/listar';

    // Add default "Select a vehicle" option
    vehiculoInput.innerHTML = '<option value="0">Selecciona un vehículo</option>';

    fetchGet(url, 'json', res => {
        // Add vehicles to the select
        for (let obj of res) {
            let option = document.createElement('option');
            option.value = obj.id;
            option.textContent = `${obj.marca} ${obj.modelo} (${obj.año})`;
            vehiculoInput.appendChild(option);
        }
    }, error => {
        console.error('Error al cargar vehículos:', error);
    });
}

    // Llamar a la función cuando la página carga
    document.addEventListener('DOMContentLoaded', renderVehiculoOptions);


//RECUPERAR EMAIL para el formulario de reserva
function recuperarEmail() {
    const email = document.getElementById('Email').value.trim();

    if (!email) {

        alert('Por favor, ingrese un correo electrónico');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido');
        return;
    }

    fetchGet(`Cliente/RecuperarId?email=${encodeURIComponent(email)}`, 'json', res => {
        if (res > 0) {

            swalAlert('error', undefined, 'El cliente con este email ya está registrado');
        } else {
            $('#register-modal').modal('show');
            document.getElementById('email-input').value = email;
        }
    });
}

// Optional: Add real-time validation and error display
document.getElementById('Email').addEventListener('input', function () {
    const email = this.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorMessageElement = document.getElementById('error-message');

    if (email && !emailRegex.test(email)) {
        errorMessageElement.textContent = 'Por favor, ingrese un correo electrónico válido';
        errorMessageElement.classList.remove('d-none');
    } else {
        errorMessageElement.classList.add('d-none');
    }
});

function save() {
 
    const form = document.querySelector('#register-modal form');
    const formData = new FormData(form);

    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    });

    // En localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    $('#register-modal').modal('hide');

    $('#register-modal').on('hidden.bs.modal', function () {
      
        $('#reservation-modal #email').val(userData.Email);

        $('#reservation-modal').modal('show');

        $(this).off('hidden.bs.modal');
    });
}


function saveReservation() {
    const form = document.querySelector('#reservation-modal form');
    const formData = new FormData(form);

    const reservationData = {};
    formData.forEach((value, key) => {
        reservationData[key] = value;
    });

    // Guardar en localStorage
    localStorage.setItem('reservationData', JSON.stringify(reservationData));

    // Cerrar modal de reserva y abrir modal de seguro
    $('#reservation-modal').modal('hide');

    $('#reservation-modal').on('hidden.bs.modal', function () {
        cargarTiposSeguro();
        $('#insurance-modal').modal('show');
        $(this).off('hidden.bs.modal');
    });
}

// Cargar tipos de seguro
function cargarTiposSeguro() {
    const select = document.getElementById('tipo-seguro');
    select.innerHTML = '<option value="">Seleccione un tipo de seguro</option>';

    fetchGet('Seguro/ListarTiposSeguro', 'json', res => {
        res.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo;
            option.textContent = tipo;
            select.appendChild(option);
        });
    });
}



// Calcular costo del seguro
function calcularCostoSeguro() {
    const tipoSeguro = document.getElementById('tipo-seguro').value;
    if (!tipoSeguro) return;

    // Obtener datos de la reserva del localStorage
    const reservationData = JSON.parse(localStorage.getItem('reservationData'));

    // Calcular días entre fechas
    const fechaInicial = new Date(reservationData['fecha-inicial']);
    const fechaFinal = new Date(reservationData['fecha-final']);
    const diasDiferencia = Math.ceil((fechaFinal - fechaInicial) / (1000 * 60 * 60 * 24));

    // Llamar al backend para calcular el costo
    fetchGet(`Seguro/CalcularCostoSeguro?vehiculoId=${reservationData.VehiculoId}&dias=${diasDiferencia}&tipo=${encodeURIComponent(tipoSeguro)}`, 'json', res => {
        document.getElementById('costo-seguro').value = `$${res.toFixed(2)}`;
    });
}



// Procesar selección de seguro
function procesarSeguro() {
    const seguroData = {
        tipo: document.getElementById('tipo-seguro').value,
        costo: document.getElementById('costo-seguro').value
    };

    localStorage.setItem('seguroData', JSON.stringify(seguroData));

    $('#insurance-modal').modal('hide');

    $('#insurance-modal').on('hidden.bs.modal', function () {
        $('#payment-modal').modal('show');
        $(this).off('hidden.bs.modal');
    });
}



//// Procesar pago
//function procesarPago() {
//    const userData = JSON.parse(localStorage.getItem('userData'));
//    const reservationData = JSON.parse(localStorage.getItem('reservationData'));
//    const seguroData = JSON.parse(localStorage.getItem('seguroData'));

//    // Aquí puedes implementar la lógica de pago
//    // Una vez completado el pago, limpiar localStorage

//    localStorage.removeItem('userData');
//    localStorage.removeItem('reservationData');
//    localStorage.removeItem('seguroData');

//    $('#payment-modal').modal('hide');
//    swalAlert('success', undefined, '¡Reserva completada con éxito!');
//}

function swalLoading(message) {
    Swal.fire({
        title: message || 'Procesando...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}


async function procesarPago() {
    try {
        // Show loading indicator
        swalLoading('Procesando transacción...');

        const userData = JSON.parse(localStorage.getItem('userData'));
        const reservationData = JSON.parse(localStorage.getItem('reservationData'));
        const seguroData = JSON.parse(localStorage.getItem('seguroData'));
        const metodoPago = document.getElementById('metodo-pago').value;

        // 1. Save Cliente
        const clienteForm = new FormData();
        clienteForm.append('Id', 0);
        clienteForm.append('Nombre', userData.Nombre);
        clienteForm.append('Apellido', userData.Apellido);
        clienteForm.append('Telefono', userData.Telefono);
        clienteForm.append('Email', userData.Email);

        const clienteId = await new Promise((resolve, reject) => {
            fetchPost('Cliente/guardar', 'text', clienteForm, res => {
                resolve(parseInt(res));
            }, error => reject(error));
        });

        if (!clienteId) throw new Error('Error al crear cliente');

        // 2. Create Reserva
        const reservaForm = new FormData();
        reservaForm.append('Id', 0);
        reservaForm.append('ClienteId', clienteId);
        reservaForm.append('VehiculoId', reservationData.VehiculoId);
        reservaForm.append('FechaInicio', reservationData.FechaInicio);
        reservaForm.append('FechaFin', reservationData.FechaFin);

        const reservaId = await new Promise((resolve, reject) => {
            fetchPost('Reserva/guardar', 'text', reservaForm, res => {
                resolve(parseInt(res));
            }, error => reject(error));
        });

        if (!reservaId) throw new Error('Error al crear reserva');

        // 3. Create Seguro
        const seguroForm = new FormData();
        seguroForm.append('ReservaId', reservaId);
        seguroForm.append('TipoSeguro', seguroData.TipoSeguro);
        seguroForm.append('Costo', seguroData.Costo);

        const seguroId = await new Promise((resolve, reject) => {
            fetchPost('Seguro/guardar', 'text', seguroForm, res => {
                resolve(parseInt(res));
            }, error => reject(error));
        });

        if (!seguroId) throw new Error('Error al crear seguro');

        // 4. Create Pago
        const pagoForm = new FormData();
        pagoForm.append('ReservaId', reservaId);
        pagoForm.append('MetodoPago', metodoPago);
        pagoForm.append('Monto', seguroData.Costo);
        pagoForm.append('FechaPago', new Date().toISOString());

        const pagoId = await new Promise((resolve, reject) => {
            fetchPost('Pago/guardar', 'text', pagoForm, res => {
                resolve(parseInt(res));
            }, error => reject(error));
        });

        if (!pagoId) throw new Error('Error al crear pago');

        // Clear storage and show success
        localStorage.removeItem('userData');
        localStorage.removeItem('reservationData');
        localStorage.removeItem('seguroData');

        $('#payment-modal').modal('hide');
        swalAlert('success', '¡Éxito!', 'Transacción completada correctamente');

    } catch (error) {
        console.error('Error en la transacción:', error);
        swalAlert('error', 'Error', 'Ha ocurrido un error al procesar la transacción');
    }
}



//RECOMENDACIONES
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    
    function nextSlide() {
        // Oculta el slide actual
        slides[currentSlide].classList.add('hidden');

        // Avanza al siguiente slide
        currentSlide = (currentSlide + 1) % slides.length;

        // Muestra el nuevo slide
        slides[currentSlide].classList.remove('hidden');
    }

    // Cambia de slide cada 5 segundos
    setInterval(nextSlide, 5000);
});


