const heroImages = [{
    image: "./images/hero-image-man.webp",
    altText: "Fitness motivation image"
},
{
    image: "./images/hero-image-women-2.webp",
    altText: "Person lifting weights in a gym"
},
{
    image: "./images/hero-image-man-2.webp",
    altText: "Group fitness class in action"
},
{
    image: "./images/hero-image-women.webp",
    altText: "Healthy meal prep for fitness"
}
];


const heroImageElement = document.querySelector(".hero-image");
let currentIndex = 0;

function updateHeroImage() {
    const { image, altText } = heroImages[currentIndex];
    heroImageElement.src = image;
    heroImageElement.alt = altText;
    heroImageElement.style.opacity = '0';
    

    setTimeout(() => {
        heroImageElement.src = image;
        heroImageElement.alt = altText;
        
        // PASO 3: Fade IN (opacity 1) - CSS transition lo anima
        heroImageElement.style.opacity = '1';
    }, 500);

    currentIndex = (currentIndex + 1) % heroImages.length;
}



document.addEventListener('DOMContentLoaded', () => {
    if (heroImageElement) {
       
        updateHeroImage();

        setInterval(updateHeroImage, 5000);
    }
});