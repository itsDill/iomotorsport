// Global JavaScript - Shared across all pages

// Navigation highlighting functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Simulate data loading with opacity animation
function simulateDataLoading() {
    const tables = document.querySelectorAll('.data-table tbody');
    tables.forEach(tbody => {
        // Add subtle loading animation
        tbody.style.opacity = '0.7';
        setTimeout(() => {
            tbody.style.opacity = '1';
        }, 300);
    });
}

// Generic tab switching functionality
function initTabSwitching(containerSelector = document) {
    containerSelector.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const tabId = e.target.dataset.tab;
            const parentSection = e.target.closest('.data-section') || e.target.closest('.tab-container');
            
            if (!parentSection) return;
            
            // Update active tab button
            parentSection.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Show corresponding content
            parentSection.querySelectorAll('.data-content').forEach(content => {
                content.style.display = 'none';
                if (content.id === tabId) {
                    content.style.display = 'block';
                }
            });
        }
    });
}

// Utility function to format time differences
function formatTimeDifference(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(3);
    
    if (minutes > 0) {
        return `${minutes}:${remainingSeconds.padStart(6, '0')}`;
    }
    return `${remainingSeconds}s`;
}

// Utility function to add loading state to elements
function addLoadingState(element) {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading';
    loadingSpinner.style.marginLeft = '10px';
    element.appendChild(loadingSpinner);
    
    return () => {
        if (element.contains(loadingSpinner)) {
            element.removeChild(loadingSpinner);
        }
    };
}

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTabSwitching(document);
    simulateDataLoading();
    initMobileMenu();
});

// Export functions for use in other scripts
window.ioMotorsport = {
    initNavigation,
    simulateDataLoading,
    initTabSwitching,
    formatTimeDifference,
    addLoadingState
};

function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Optional: close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}
