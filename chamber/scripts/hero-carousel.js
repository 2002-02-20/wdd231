// Array de imágenes del carrusel
// Agrega más imágenes aquí según sea necesario
const heroImages = [
    './images/hero-timbuktu.webp',
    './images/ecotransporte-logo.png',
    './images/dmp-logo.png',
    './images/dmp-logo.png'
];

let currentImageIndex = 0;
let carouselInterval;

// Función para cambiar la imagen del carrusel
function changeHeroImage() {
    const carousel = document.querySelector('.hero-carousel');
    const images = carousel.querySelectorAll('.hero-image');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Remover clase active de todas las imágenes y puntos
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Avanzar al siguiente índice
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    
    // Agregar clase active a la imagen actual
    if (images[currentImageIndex]) {
        images[currentImageIndex].classList.add('active');
    }
    
    // Agregar clase active al punto actual
    if (dots[currentImageIndex]) {
        dots[currentImageIndex].classList.add('active');
    }
}

// Función para inicializar el carrusel
function initHeroCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    // Solo inicializar si hay más de una imagen
    if (heroImages.length <= 1) {
        return;
    }
    
    // Crear imágenes adicionales en el carrusel
    heroImages.forEach((imgSrc, index) => {
        if (index > 0) { // La primera imagen ya existe en el HTML
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Timbuktu cityscape ${index + 1}`;
            img.className = 'hero-image';
            carousel.appendChild(img);
        }
    });
    
    // Crear puntos indicadores
    heroImages.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to image ${index + 1}`);
        dot.addEventListener('click', () => goToImage(index));
        dotsContainer.appendChild(dot);
    });
    
    // Iniciar el cambio automático cada 5 segundos
    carouselInterval = setInterval(changeHeroImage, 5000);
    
    // Pausar cuando el usuario hace hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    // Reanudar cuando el usuario quita el mouse
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(changeHeroImage, 5000);
    });
}

// Función para ir a una imagen específica
function goToImage(index) {
    const carousel = document.querySelector('.hero-carousel');
    const images = carousel.querySelectorAll('.hero-image');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Remover clase active de todas las imágenes y puntos
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Establecer el índice actual
    currentImageIndex = index;
    
    // Agregar clase active a la imagen seleccionada
    if (images[currentImageIndex]) {
        images[currentImageIndex].classList.add('active');
    }
    
    // Agregar clase active al punto seleccionado
    if (dots[currentImageIndex]) {
        dots[currentImageIndex].classList.add('active');
    }
    
    // Reiniciar el intervalo
    clearInterval(carouselInterval);
    carouselInterval = setInterval(changeHeroImage, 5000);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initHeroCarousel);
