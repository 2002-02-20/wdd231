// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        // Toggle menu when clicking the hamburger button
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el click se propague al documento
            mobileMenuBtn.classList.toggle('open');
            mobileNav.classList.toggle('open');
            // Prevent body scrolling when menu is open
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const mobileLinks = mobileNav.querySelectorAll('.items_menu');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('open');
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', () => {
        if (mobileMenuBtn && mobileNav && mobileNav.classList.contains('open')) {
            mobileMenuBtn.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});
