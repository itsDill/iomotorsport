// Full 2025 Formula 1 Calendar
const scheduleData = {
    2025: [
        {
            id: 1,
            race: "Australian Grand Prix",
            date: "March 16, 2025",
            time: "12:00",
            location: "Melbourne, Australia",
            circuitImage: "melbourne.jpg",
            details: {
                track: "Albert Park Circuit",
                laps: 58,
                lapRecord: "1:24.125 (Charles Leclerc, 2022)",
                description: "The Australian Grand Prix is held at the Albert Park Circuit, a semi-street circuit known for its scenic views and challenging layout."
            }
        },
        {
            id: 2,
            race: "Japanese Grand Prix",
            date: "April 6, 2025",
            time: "14:00",
            location: "Suzuka, Japan",
            circuitImage: "suzuka.jpg",
            details: {
                track: "Suzuka International Racing Course",
                laps: 53,
                lapRecord: "1:30.983 (Lewis Hamilton, 2019)",
                description: "The Japanese Grand Prix is held at the Suzuka Circuit, a iconic track known for its figure-eight layout and passionate fans."
            }
        },
        {
            id: 3,
            race: "Chinese Grand Prix",
            date: "April 20, 2025",
            time: "14:00",
            location: "Shanghai, China",
            circuitImage: "shanghai.jpg",
            details: {
                track: "Shanghai International Circuit",
                laps: 56,
                lapRecord: "1:32.238 (Michael Schumacher, 2004)",
                description: "The Chinese Grand Prix is held at the Shanghai International Circuit, known for its long straights and technical corners."
            }
        },
        {
            id: 4,
            race: "Miami Grand Prix",
            date: "May 4, 2025",
            time: "20:00",
            location: "Miami, USA",
            circuitImage: "miami.jpg",
            details: {
                track: "Miami International Autodrome",
                laps: 57,
                lapRecord: "1:29.708 (Max Verstappen, 2023)",
                description: "The Miami Grand Prix is held at the Miami International Autodrome, a street circuit with a vibrant atmosphere."
            }
        },
        {
            id: 5,
            race: "Emilia Romagna Grand Prix",
            date: "May 18, 2025",
            time: "14:00",
            location: "Imola, Italy",
            circuitImage: "imola.jpg",
            details: {
                track: "Imola Circuit",
                laps: 63,
                lapRecord: "1:15.484 (Lewis Hamilton, 2020)",
                description: "The Emilia Romagna Grand Prix is held at the Imola Circuit, a historic track with a mix of high-speed and technical sections."
            }
        },
        {
            id: 6,
            race: "Monaco Grand Prix",
            date: "May 25, 2025",
            time: "14:00",
            location: "Monte Carlo, Monaco",
            circuitImage: "monaco.jpg",
            details: {
                track: "Circuit de Monaco",
                laps: 78,
                lapRecord: "1:12.909 (Lewis Hamilton, 2021)",
                description: "The Monaco Grand Prix is held at the Circuit de Monaco, the most famous street circuit in the world."
            }
        },
        {
            id: 7,
            race: "Canadian Grand Prix",
            date: "June 8, 2025",
            time: "19:00",
            location: "Montreal, Canada",
            circuitImage: "montreal.jpg",
            details: {
                track: "Circuit Gilles Villeneuve",
                laps: 70,
                lapRecord: "1:13.078 (Valtteri Bottas, 2019)",
                description: "The Canadian Grand Prix is held at the Circuit Gilles Villeneuve, known for its Wall of Champions and tight chicanes."
            }
        },
        {
            id: 8,
            race: "British Grand Prix",
            date: "July 6, 2025",
            time: "14:00",
            location: "Silverstone, UK",
            circuitImage: "silverstone.jpg",
            details: {
                track: "Silverstone Circuit",
                laps: 52,
                lapRecord: "1:27.097 (Max Verstappen, 2020)",
                description: "The British Grand Prix is held at the Silverstone Circuit, the birthplace of Formula 1."
            }
        },
        {
            id: 9,
            race: "Austrian Grand Prix",
            date: "July 13, 2025",
            time: "14:00",
            location: "Spielberg, Austria",
            circuitImage: "spielberg.jpg",
            details: {
                track: "Red Bull Ring",
                laps: 71,
                lapRecord: "1:05.619 (Carlos Sainz, 2020)",
                description: "The Austrian Grand Prix is held at the Red Bull Ring, a short but challenging track with elevation changes."
            }
        },
        {
            id: 10,
            race: "French Grand Prix",
            date: "July 27, 2025",
            time: "14:00",
            location: "Le Castellet, France",
            circuitImage: "paulricard.jpg",
            details: {
                track: "Circuit Paul Ricard",
                laps: 53,
                lapRecord: "1:32.740 (Sebastian Vettel, 2019)",
                description: "The French Grand Prix is held at the Circuit Paul Ricard, known for its long straights and technical sections."
            }
        },
        {
            id: 11,
            race: "Hungarian Grand Prix",
            date: "August 3, 2025",
            time: "14:00",
            location: "Budapest, Hungary",
            circuitImage: "hungaroring.jpg",
            details: {
                track: "Hungaroring",
                laps: 70,
                lapRecord: "1:16.627 (Lewis Hamilton, 2020)",
                description: "The Hungarian Grand Prix is held at the Hungaroring, a tight and twisty circuit often compared to a karting track."
            }
        },
        {
            id: 12,
            race: "Belgian Grand Prix",
            date: "August 24, 2025",
            time: "14:00",
            location: "Spa-Francorchamps, Belgium",
            circuitImage: "spa.jpg",
            details: {
                track: "Circuit de Spa-Francorchamps",
                laps: 44,
                lapRecord: "1:46.286 (Valtteri Bottas, 2018)",
                description: "The Belgian Grand Prix is held at the Circuit de Spa-Francorchamps, one of the most iconic and challenging tracks in the world."
            }
        },
        {
            id: 13,
            race: "Dutch Grand Prix",
            date: "August 31, 2025",
            time: "14:00",
            location: "Zandvoort, Netherlands",
            circuitImage: "zandvoort.jpg",
            details: {
                track: "Circuit Zandvoort",
                laps: 72,
                lapRecord: "1:11.097 (Lewis Hamilton, 2021)",
                description: "The Dutch Grand Prix is held at the Circuit Zandvoort, known for its banked corners and seaside location."
            }
        },
        {
            id: 14,
            race: "Italian Grand Prix",
            date: "September 7, 2025",
            time: "14:00",
            location: "Monza, Italy",
            circuitImage: "monza.jpg",
            details: {
                track: "Monza Circuit",
                laps: 53,
                lapRecord: "1:21.046 (Rubens Barrichello, 2004)",
                description: "The Italian Grand Prix is held at the Monza Circuit, known as the 'Temple of Speed' for its high-speed straights."
            }
        },
        {
            id: 15,
            race: "Singapore Grand Prix",
            date: "September 21, 2025",
            time: "20:00",
            location: "Singapore",
            circuitImage: "singapore.jpg",
            details: {
                track: "Marina Bay Street Circuit",
                laps: 61,
                lapRecord: "1:41.905 (Lewis Hamilton, 2018)",
                description: "The Singapore Grand Prix is held at the Marina Bay Street Circuit, a night race with tight corners and high humidity."
            }
        },
        {
            id: 16,
            race: "United States Grand Prix",
            date: "October 5, 2025",
            time: "20:00",
            location: "Austin, USA",
            circuitImage: "cota.jpg",
            details: {
                track: "Circuit of the Americas",
                laps: 56,
                lapRecord: "1:36.169 (Charles Leclerc, 2019)",
                description: "The United States Grand Prix is held at the Circuit of the Americas, a modern track with elevation changes and a replica of the Silverstone corner."
            }
        },
        {
            id: 17,
            race: "Mexican Grand Prix",
            date: "October 19, 2025",
            time: "20:00",
            location: "Mexico City, Mexico",
            circuitImage: "mexico.jpg",
            details: {
                track: "Autódromo Hermanos Rodríguez",
                laps: 71,
                lapRecord: "1:17.774 (Valtteri Bottas, 2021)",
                description: "The Mexican Grand Prix is held at the Autódromo Hermanos Rodríguez, known for its high altitude and passionate fans."
            }
        },
        {
            id: 18,
            race: "Brazilian Grand Prix",
            date: "November 2, 2025",
            time: "17:00",
            location: "São Paulo, Brazil",
            circuitImage: "interlagos.jpg",
            details: {
                track: "Interlagos Circuit",
                laps: 71,
                lapRecord: "1:10.540 (Lewis Hamilton, 2018)",
                description: "The Brazilian Grand Prix is held at the Interlagos Circuit, a short but challenging track with elevation changes."
            }
        },
        {
            id: 19,
            race: "Las Vegas Grand Prix",
            date: "November 16, 2025",
            time: "22:00",
            location: "Las Vegas, USA",
            circuitImage: "vegas.jpg",
            details: {
                track: "Las Vegas Street Circuit",
                laps: 50,
                lapRecord: "TBD",
                description: "The Las Vegas Grand Prix is held on a street circuit in the heart of Las Vegas, offering a unique night race experience."
            }
        },
        {
            id: 20,
            race: "Abu Dhabi Grand Prix",
            date: "November 30, 2025",
            time: "17:00",
            location: "Abu Dhabi, UAE",
            circuitImage: "yasmarina.jpg",
            details: {
                track: "Yas Marina Circuit",
                laps: 55,
                lapRecord: "1:26.103 (Lewis Hamilton, 2021)",
                description: "The Abu Dhabi Grand Prix is held at the Yas Marina Circuit, known for its twilight race and luxurious facilities."
            }
        }
    ]
};

// Function to load the schedule
function loadSchedule() {
    const year = document.getElementById("yearSelector").value;
    const schedule = scheduleData[year];
    const scheduleGrid = document.getElementById("schedule");

    if (!schedule) {
        scheduleGrid.innerHTML = "<p>No data available for the selected year.</p>";
        return;
    }

    scheduleGrid.innerHTML = schedule.map(event => `
        <div class="schedule-item">
            <img src="${event.circuitImage}" alt="${event.race}">
            <div class="details">
                <h2>${event.race}</h2>
                <p>Date: ${event.date}</p>
                <p>Time: ${event.time}</p>
                <p>Location: ${event.location}</p>
                <a href="#" onclick="loadEventDetails(${event.id}, '${year}')">View Details</a>
            </div>
        </div>
    `).join("");
}

// Function to load event details
function loadEventDetails(eventId, year) {
    const event = scheduleData[year].find(e => e.id == eventId);
    if (!event) {
        alert("Event not found!");
        return;
    }

    // Update the main content to show event details
    const main = document.querySelector("main");
    main.innerHTML = `
        <div class="event-details">
            <img src="${event.circuitImage}" alt="${event.race}">
            <div class="details">
                <h2>${event.race}</h2>
                <p>Date: ${event.date}</p>
                <p>Time: ${event.time}</p>
                <p>Location: ${event.location}</p>
                <h3>Track: ${event.details.track}</h3>
                <p>Laps: ${event.details.laps}</p>
                <p>Lap Record: ${event.details.lapRecord}</p>
                <p>${event.details.description}</p>
                <a href="#" onclick="loadSchedule()">Back to Schedule</a>
            </div>
        </div>
    `;
}

// Load the schedule when the page loads
window.onload = loadSchedule;