// Display form data from URL query parameters
document.addEventListener('DOMContentLoaded', function() {
    displayFormData();
});

function displayFormData() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Map of field names to display element IDs
    const fieldMap = {
        'firstName': 'summaryFirstName',
        'lastName': 'summaryLastName',
        'email': 'summaryEmail',
        'phone': 'summaryPhone',
        'businessName': 'summaryBusiness',
        'timestamp': 'summaryTimestamp'
    };

    // Populate each field
    for (const [fieldName, elementId] of Object.entries(fieldMap)) {
        const value = urlParams.get(fieldName);
        const element = document.getElementById(elementId);
        
        if (element) {
            if (value) {
                element.textContent = decodeURIComponent(value);
            } else {
                element.textContent = '—';
            }
        }
    }
}
