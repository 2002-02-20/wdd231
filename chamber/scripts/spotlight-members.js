// Fetch and display spotlight members
async function loadSpotlightMembers() {
    try {
        const response = await fetch('./data/members.json');
        const members = await response.json();

        // Filter for Gold (level 3) and Silver (level 2) members
        const premiumMembers = members.filter(member => 
            member.membershipLevel >= 2 // Gold = 3, Silver = 2
        );

        // Shuffle and get 2-3 random members
        const shuffled = premiumMembers.sort(() => Math.random() - 0.5);
        const spotlightMembers = shuffled.slice(0, Math.min(3, shuffled.length));

        // Display spotlight members
        const container = document.getElementById('spotlight-container');
        container.innerHTML = '';

        spotlightMembers.forEach(member => {
            const card = createSpotlightCard(member);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading spotlight members:', error);
        document.getElementById('spotlight-container').innerHTML = 
            '<p class="loading">Unable to load featured members.</p>';
    }
}

function getMembershipLabel(level) {
    switch(level) {
        case 3:
            return 'Gold';
        case 2:
            return 'Silver';
        case 1:
            return 'Bronze';
        default:
            return 'Member';
    }
}

function createSpotlightCard(member) {
    const card = document.createElement('div');
    card.className = 'spotlight-card';

    const logoSection = document.createElement('div');
    logoSection.className = 'spotlight-logo';
    
    const logo = document.createElement('img');
    logo.src = member.imageFilename;
    logo.alt = member.name;
    logoSection.appendChild(logo);

    const content = document.createElement('div');
    content.className = 'spotlight-content';

    const name = document.createElement('h3');
    name.textContent = member.name;

    const membershipLabel = getMembershipLabel(member.membershipLevel);
    const badge = document.createElement('span');
    badge.className = `spotlight-badge ${membershipLabel.toLowerCase()}`;
    badge.textContent = membershipLabel + ' Member';

    // Phone
    const phoneInfo = document.createElement('div');
    phoneInfo.className = 'spotlight-info';
    phoneInfo.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

    // Address
    const addressInfo = document.createElement('div');
    addressInfo.className = 'spotlight-info';
    addressInfo.innerHTML = `<strong>Address:</strong> ${member.address}`;

    // Links
    const links = document.createElement('div');
    links.className = 'spotlight-links';

    if (member.website) {
        const websiteLink = document.createElement('a');
        websiteLink.href = member.website;
        websiteLink.target = '_blank';
        websiteLink.className = 'spotlight-link';
        websiteLink.textContent = 'Visit Site';
        links.appendChild(websiteLink);
    }

    content.appendChild(name);
    content.appendChild(badge);
    content.appendChild(phoneInfo);
    content.appendChild(addressInfo);
    content.appendChild(links);

    card.appendChild(logoSection);
    card.appendChild(content);

    return card;
}

// Load spotlight members when page loads
document.addEventListener('DOMContentLoaded', loadSpotlightMembers);

// Reload spotlight members every 5 minutes
setInterval(loadSpotlightMembers, 5 * 60 * 1000);
