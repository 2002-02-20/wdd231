/**
 * Main.js - Global JavaScript for EasyGym
 * Handles navigation, hamburger menu, and shared functionality
 */

// ===== HAMBURGER MENU ===== //
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburger && navLinks) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// ===== VIDEO LINK ===== //
document.addEventListener('DOMContentLoaded', () => {
    const videoLink = document.getElementById('videoLink');
    if (videoLink) {
        // Replace with your actual YouTube/Loom video URL
        videoLink.href = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID';
        videoLink.target = '_blank';
        videoLink.rel = 'noopener noreferrer';
    }
});

// ===== UTILITIES ===== //

/**
 * Format date to readable string
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate form fields
 * @param {Object} formData - Form data to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} Validation result {isValid, errors}
 */
export function validateForm(formData, requiredFields) {
    const errors = {};

    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            errors[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} is required`;
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

/**
 * Display error message
 * @param {string} elementId - ID of error container
 * @param {string} message - Error message
 */
export function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Clear error messages
 * @param {Array} errorElementIds - Array of error element IDs
 */
export function clearErrors(errorElementIds) {
    errorElementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    });
}

/**
 * Show/Hide loading spinner
 * @param {string} elementId - ID of spinner element
 * @param {boolean} show - Show or hide
 */
export function toggleSpinner(elementId, show) {
    const spinner = document.getElementById(elementId);
    if (spinner) {
        spinner.style.display = show ? 'flex' : 'none';
    }
}

/**
 * Scroll to element smoothly
 * @param {string} elementId - ID of element to scroll to
 */
export function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}