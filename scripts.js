// Menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeIn = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', fadeIn);
window.addEventListener('load', fadeIn);

// Map interactions
const mapPoints = document.querySelectorAll('.map-point');
const venueInfos = document.querySelectorAll('.venue-info');

mapPoints.forEach(point => {
    point.addEventListener('click', () => {
        const venue = point.getAttribute('data-venue');

        mapPoints.forEach(p => p.classList.remove('active'));
        point.classList.add('active');

        venueInfos.forEach(info => info.classList.remove('active'));
        document.getElementById(`venue-${venue}`).classList.add('active');
    });
});