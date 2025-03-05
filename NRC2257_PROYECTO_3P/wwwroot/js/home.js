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

//Btn banner Alquilar
function registerButtonClick() {
    alert('¡Botón de registro clickeado!');

}

//
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