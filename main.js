// Main JavaScript file for iO Motorsport website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero slider
    initHeroSlider();

    // Initialize tabs for standings
    initTabs();

    // Initialize video thumbnails
    initVideoThumbnails();
});

// Hero Slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentSlide = 0;
    const slideCount = slides.length;

    // For this demo we only have one slide, but the code is ready for more
    if (slideCount <= 1) return;

    // Auto slide change
    let slideInterval = setInterval(nextSlide, 7000);

    // Function to show specific slide
    function showSlide(n) {
        // Remove current class from all slides and dots
        slides.forEach(slide => slide.classList.remove('current'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Set current slide and dot
        currentSlide = (n + slideCount) % slideCount;
        slides[currentSlide].classList.add('current');
        dots[currentSlide].classList.add('active');

        // Reset interval
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000);
    }

    // Next slide function
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Previous slide function
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Click event for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
}

// Tabs functionality for standings
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Video thumbnails hover effect
function initVideoThumbnails() {
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            // In a real implementation, this would open a video modal or redirect