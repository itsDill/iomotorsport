// Homepage specific JavaScript functionality

// Series switching functionality
function initSeriesSwitching() {
    const seriesCards = document.querySelectorAll('.series-card');
    const dataSections = document.querySelectorAll('.data-section');

    seriesCards.forEach(card => {
        card.addEventListener('click', () => {
            const series = card.dataset.series;
            
            // Update active series card
            seriesCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Show corresponding data section
            dataSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${series}-data`) {
                    section.classList.add('active');
                }
            });

            // Trigger data loading animation for the newly visible section
            const activeSection = document.querySelector(`#${series}-data`);
            if (activeSection) {
                const tables = activeSection.querySelectorAll('.data-table tbody');
                tables.forEach(tbody => {
                    tbody.style.opacity = '0.7';
                    setTimeout(() => {
                        tbody.style.opacity = '1';
                    }, 200);
                });
            }
        });
    });
}

// Homepage specific data management
const homepageData = {
    f1: {
        drivers: [
            { pos: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 575, wins: 19, podiums: 21 },
            { pos: 2, name: "Lando Norris", team: "McLaren", points: 374, wins: 3, podiums: 8 },
            { pos: 3, name: "Charles Leclerc", team: "Ferrari", points: 356, wins: 3, podiums: 11 },
            { pos: 4, name: "Oscar Piastri", team: "McLaren", points: 292, wins: 2, podiums: 5 },
            { pos: 5, name: "Carlos Sainz", team: "Ferrari", points: 290, wins: 2, podiums: 6 }
        ],
        constructors: [
            { pos: 1, team: "McLaren", points: 666, wins: 5, podiums: 13 },
            { pos: 2, team: "Ferrari", points: 646, wins: 5, podiums: 17 },
            { pos: 3, team: "Red Bull Racing", points: 589, wins: 19, podiums: 22 }
        ]
    },
    wrc: {
        drivers: [
            { pos: 1, driver: "Thierry Neuville", codriver: "Martijn Wydaeghe", team: "Hyundai i20 N Rally1", points: 242 },
            { pos: 2, driver: "Ott Tänak", codriver: "Martin Järveoja", team: "Hyundai i20 N Rally1", points: 200 },
            { pos: 3, driver: "Elfyn Evans", codriver: "Scott Martin", team: "Toyota GR Yaris Rally1", points: 192 }
        ]
    },
    indycar: {
        drivers: [
            { pos: 1, name: "Alex Palou", team: "Chip Ganassi Racing", points: 544, wins: 3 },
            { pos: 2, name: "Will Power", team: "Team Penske", points: 495, wins: 2 },
            { pos: 3, name: "Colton Herta", team: "Andretti Global", points: 449, wins: 3 }
        ]
    }
};

// Function to update standings dynamically (for future API integration)
function updateStandings(series, category = 'drivers') {
    const tableBody = document.querySelector(`#${series}-${category} tbody`);
    if (!tableBody || !homepageData[series] || !homepageData[series][category]) return;

    const data = homepageData[series][category];
    const removeLoading = window.ioMotorsport.addLoadingState(tableBody.parentElement);

    // Simulate API delay
    setTimeout(() => {
        // Update table with fresh data
        removeLoading();
        window.ioMotorsport.simulateDataLoading();
    }, 500);
}

// Add hover effects to series cards
function addSeriesCardEffects() {
    const seriesCards = document.querySelectorAll('.series-card');
    
    seriesCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.series-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.series-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize homepage functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait for global scripts to load first
    setTimeout(() => {
        initSeriesSwitching();
        addSeriesCardEffects();
        
        // Set up periodic data refresh (every 30 seconds)
        setInterval(() => {
            const activeSection = document.querySelector('.data-section.active');
            if (activeSection) {
                const seriesId = activeSection.id.replace('-data', '');
                updateStandings(seriesId);
            }
        }, 30000);
    }, 100);
});

// Export homepage specific functions
window.homepageFunctions = {
    initSeriesSwitching,
    updateStandings,
    addSeriesCardEffects,
    homepageData
};