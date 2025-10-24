// ================================
// NEXT RACES COUNTDOWN WIDGET
// Displays the next 3 upcoming races with live countdowns
// ================================

/**
 * Initialize the countdown widget
 * @param {string} containerId - The ID of the container element
 * @param {Array} events - Array of event objects
 */
function initCountdownWidget(containerId, events) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Get next 3 upcoming races
  const upcomingRaces = getNextRaces(events, 3);

  if (upcomingRaces.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: #999;">No upcoming races scheduled.</p>';
    return;
  }

  // Render the widget
  renderCountdownWidget(container, upcomingRaces);

  // Update countdowns every second
  setInterval(() => updateCountdowns(upcomingRaces), 1000);
}

/**
 * Get the next N upcoming races
 */
function getNextRaces(events, count = 3) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= now;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, count);
}

/**
 * Render the countdown widget HTML
 */
function renderCountdownWidget(container, races) {
  const html = `
    <div class="next-races-widget">
      <div class="widget-header">
        <span style="font-size: 1.5rem;">🏁</span>
        <h2 class="widget-title">Next Races</h2>
      </div>
      <div class="countdown-grid">
        ${races.map((race, index) => renderCountdownItem(race, index)).join("")}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/**
 * Render a single countdown item
 */
function renderCountdownItem(race, index) {
  const seriesColors = {
    wec: "#0066cc",
    imsa: "#c8102e",
    elms: "#e30613",
    alms: "#ff9800",
    gtwc: "#ff6b00",
    igtc: "#7c3aed",
    "24h": "#fbbf24",
    classic: "#ec4899",
  };

  return `
    <div class="countdown-item ${race.series}">
      <div class="countdown-header">
        <div>
          <div class="countdown-event-name">${race.name}</div>
          <div class="countdown-location">📍 ${race.location}</div>
        </div>
        <span class="countdown-series-badge ${
          race.series
        }">${race.series.toUpperCase()}</span>
      </div>
      <div class="countdown-timer" id="countdown-${index}">
        <div class="countdown-unit">
          <span class="countdown-number" data-unit="days">--</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-number" data-unit="hours">--</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-number" data-unit="minutes">--</span>
          <span class="countdown-label">Min</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-number" data-unit="seconds">--</span>
          <span class="countdown-label">Sec</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Update all countdown timers
 */
function updateCountdowns(races) {
  races.forEach((race, index) => {
    const countdownEl = document.getElementById(`countdown-${index}`);
    if (!countdownEl) return;

    const timeLeft = getTimeUntil(race.date);

    // Update each unit
    const daysEl = countdownEl.querySelector('[data-unit="days"]');
    const hoursEl = countdownEl.querySelector('[data-unit="hours"]');
    const minutesEl = countdownEl.querySelector('[data-unit="minutes"]');
    const secondsEl = countdownEl.querySelector('[data-unit="seconds"]');

    if (daysEl) daysEl.textContent = timeLeft.days;
    if (hoursEl) hoursEl.textContent = timeLeft.hours;
    if (minutesEl) minutesEl.textContent = timeLeft.minutes;
    if (secondsEl) secondsEl.textContent = timeLeft.seconds;
  });
}

/**
 * Calculate time remaining until a date
 */
function getTimeUntil(targetDate) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initCountdownWidget, getNextRaces };
}
