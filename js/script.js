// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (document.querySelector('nav ul').classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
});

// Mobile menu functionality
const menuToggle = document.createElement('button');
menuToggle.classList.add('menu-toggle');
menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('header .container').appendChild(menuToggle);

function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    const icon = menuToggle.querySelector('i');
    
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
}

menuToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav ul');
    if (nav.classList.contains('active') && 
        !e.target.closest('nav') && 
        !e.target.closest('.menu-toggle')) {
        toggleMobileMenu();
    }
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Add animate class to elements that should animate
    document.querySelectorAll('#about, #features, #community, #social').forEach(section => {
        section.classList.add('animate');
    });
    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.classList.add('animate');
    });
    
    // Run once on load
    animateOnScroll();
});

// Run on scroll
window.addEventListener('scroll', animateOnScroll);