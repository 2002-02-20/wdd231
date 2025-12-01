import { attractions } from '../data/attractions.mjs';

// Handle visitor message with localStorage
function handleVisitorMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();
    const messageElement = document.getElementById('visitorMessage');

    if (!lastVisit) {
        messageElement.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            messageElement.textContent = 'Back so soon! Awesome!';
        } else {
            const dayText = daysDifference === 1 ? 'day' : 'days';
            messageElement.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
        }
    }

    // Update localStorage with current visit date
    localStorage.setItem('lastVisit', currentDate.toString());
}

// Populate cards from attractions data
function populateCards() {
    const cardsGrid = document.getElementById('cardsGrid');
    cardsGrid.innerHTML = '';

    attractions.forEach(attraction => {
        const card = document.createElement('div');
        card.className = 'attraction-card';
        card.innerHTML = `
            <figure>
                <img src="${attraction.image}" alt="${attraction.name}" loading="lazy" width="300" height="200">
            </figure>
            <h2>${attraction.name}</h2>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button onclick="window.location.href='${attraction.url}'">Learn More</button>
        `;
        cardsGrid.appendChild(card);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    handleVisitorMessage();
    populateCards();
});
