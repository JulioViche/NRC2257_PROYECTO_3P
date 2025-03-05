navbarActive('#homeIndex');

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
    const email = document.getElementById('Email').value;

    if (!email) {
        alert('Por favor, ingrese un correo electrónico');
        return;
    }

    // Realizar el fetch para recuperar el ID del cliente
    fetchGet(`Cliente/RecuperarId?email=${encodeURIComponent(email)}`, 'json', res => {
        if (res > 0) {
            // Cliente ya existe
            swalAlert('error', undefined, 'El cliente con este email ya está registrado')
         
        } else {
            // Proceder con el registro de nuevo cliente
            alert('Registrar nuevo cliente');
            $('#register-modal').modal('show');
        }
    });
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


