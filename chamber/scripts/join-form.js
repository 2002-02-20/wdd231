// Set timestamp when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set the timestamp field with current date and time
    const timestamp = new Date();
    document.getElementById('timestamp').value = timestamp.toLocaleString();

    // Handle modal open/close
    handleModals();
});

function handleModals() {
    const infoButtons = document.querySelectorAll('.info-btn');
    
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close modal when clicking the close button
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });

    // Close modal when clicking outside of it
    const modals = document.querySelectorAll('dialog');
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.close();
            }
        });
    });
}

// Handle form submission
document.getElementById('joinForm').addEventListener('submit', function(event) {
    // The form will automatically submit to thankyou.html
    // The hidden timestamp field will be passed along
});
