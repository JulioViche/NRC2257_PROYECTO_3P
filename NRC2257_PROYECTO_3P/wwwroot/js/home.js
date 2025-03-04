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
