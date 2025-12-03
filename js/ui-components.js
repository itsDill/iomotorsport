/**
 * iomotorsport UI Components
 * Reusable rendering functions for common UI patterns
 */

import { DataService } from "./data-service.js";

/**
 * Render a race calendar event
 */
export function renderCalendarEvent(race, series) {
  const date = new Date(race.date);
  const seriesInfo = series[race.series] || {};

  const statusClass = race.isNextRace ? "next-race" : "";
  const statusBadge = race.isNextRace
    ? '<span class="status-badge status-next">Next Race</span>'
    : race.status === "completed"
    ? '<span class="status-badge status-completed">Completed</span>'
    : '<span class="status-badge status-upcoming">Upcoming</span>';

  return `
    <div class="calendar-event ${statusClass}">
      <div class="calendar-date">
        <span class="calendar-month">${date.toLocaleDateString("en-US", {
          month: "short",
        })}</span>
        <span class="calendar-day">${date.getDate()}</span>
        <span class="calendar-year">${date.getFullYear()}</span>
      </div>
      <div class="calendar-info">
        <h4>
          <span class="calendar-series-badge" style="background: ${
            seriesInfo.color
          }20; color: ${seriesInfo.color}">
            ${seriesInfo.shortName || race.series.toUpperCase()}
          </span>
          ${race.name}
        </h4>
        <div class="calendar-details">
          <span>📍 ${race.location}</span>
          <span>⏱️ ${race.duration}</span>
          <span>🏁 Round ${race.round}</span>
        </div>
      </div>
      <div class="calendar-status">
        ${statusBadge}
      </div>
    </div>
  `;
}

/**
 * Render an entry list card
 */
export function renderEntryCard(team, classes) {
  const classInfo = classes[team.class] || {};
  const drivers = team.drivers
    .map(
      (d) =>
        `<span>${DataService.getFlag(d.country)} ${d.name
          .split(" ")
          .pop()}</span>`
    )
    .join("");

  return `
    <div class="entry-card">
      <div class="entry-number">#${team.number}</div>
      <div class="entry-info">
        <h4>${team.name}</h4>
        <div class="entry-manufacturer">${team.car}</div>
        <div class="entry-drivers">${drivers}</div>
      </div>
      <span class="badge" style="background: ${classInfo.color}20; color: ${
    classInfo.color
  }">
        ${classInfo.name || team.class}
      </span>
    </div>
  `;
}

/**
 * Render a BoP card
 */
export function renderBoPCard(car) {
  const changesClass = car.hasChanges ? "has-changes" : "";

  const renderDelta = (delta) => {
    if (!delta || delta === 0) return "";
    const cls = delta > 0 ? "up" : "down";
    const sign = delta > 0 ? "+" : "";
    return `<span class="bop-delta ${cls}">${sign}${delta}</span>`;
  };

  return `
    <div class="bop-card ${changesClass}">
      <div class="bop-header">
        <div class="bop-car">
          <h4>${car.car}</h4>
          <span class="bop-manufacturer">${car.manufacturer}</span>
        </div>
        <span class="badge badge-red">${car.class}</span>
      </div>
      <div class="bop-changes">
        <div class="bop-item">
          <span class="bop-param">Minimum Weight</span>
          <div class="bop-value">
            <span class="bop-current">${car.weight.value} ${
    car.weight.unit
  }</span>
            ${renderDelta(car.weight.delta)}
          </div>
        </div>
        <div class="bop-item">
          <span class="bop-param">Power</span>
          <div class="bop-value">
            <span class="bop-current">${car.power.value} ${
    car.power.unit
  }</span>
            ${renderDelta(car.power.delta)}
          </div>
        </div>
        <div class="bop-item">
          <span class="bop-param">Energy per Stint</span>
          <div class="bop-value">
            <span class="bop-current">${car.energy.value} ${
    car.energy.unit
  }</span>
            ${renderDelta(car.energy.delta)}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render a prediction card
 */
export function renderPredictionCard(prediction, isExpanded = false) {
  const podium = prediction.podiumPrediction || [];

  const podiumHTML = podium
    .map(
      (p) => `
    <div class="prediction-position">
      <span class="position-number">P${p.position}</span>
      <div class="position-info">
        <span class="position-number-car">#${p.number}</span>
        <span class="position-team">${p.team}</span>
        <span class="position-car">${p.car}</span>
      </div>
      <span class="position-confidence">${p.confidence}%</span>
    </div>
  `
    )
    .join("");

  return `
    <div class="prediction-card">
      <div class="prediction-header">
        <div class="prediction-race-info">
          <span class="prediction-series badge badge-red">${prediction.series.toUpperCase()}</span>
          <h3>${prediction.raceName}</h3>
          <p>${DataService.formatDate(prediction.date)}</p>
        </div>
        <div class="prediction-confidence-meter">
          <span class="confidence-value">${prediction.confidence}%</span>
          <span class="confidence-label">Confidence</span>
        </div>
      </div>
      <div class="prediction-body">
        <h4>Podium Prediction</h4>
        <div class="prediction-podium">
          ${podiumHTML}
        </div>
        ${
          prediction.analysis
            ? `
          <div class="prediction-analysis">
            <h4>Analysis</h4>
            <p>${prediction.analysis.summary}</p>
          </div>
        `
            : ""
        }
      </div>
    </div>
  `;
}

/**
 * Render an esports driver card
 */
export function renderDriverCard(driver) {
  const achievements = (driver.achievements || [])
    .slice(0, 2)
    .map((a) => `<span class="achievement">🏆 ${a}</span>`)
    .join("");

  return `
    <div class="driver-card">
      <div class="driver-avatar">
        <span class="driver-country">${DataService.getFlag(
          driver.country
        )}</span>
      </div>
      <div class="driver-info">
        <h3>${driver.name}</h3>
        <span class="driver-role">${driver.role}</span>
        <div class="driver-stats">
          <span>🏆 ${driver.stats.wins} Wins</span>
          <span>🥇 ${driver.stats.podiums} Podiums</span>
          <span>⚡ ${driver.irating} iRating</span>
        </div>
        <div class="driver-platforms">
          ${driver.platforms
            .map((p) => `<span class="platform-badge">${p}</span>`)
            .join("")}
        </div>
        ${
          achievements
            ? `<div class="driver-achievements">${achievements}</div>`
            : ""
        }
      </div>
    </div>
  `;
}

/**
 * Render a product card
 */
export function renderProductCard(product) {
  const priceHTML = product.originalPrice
    ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>
       <span class="price-current">$${product.price.toFixed(2)}</span>`
    : `<span class="price-current">$${product.price.toFixed(2)}</span>`;

  const badgeHTML = product.badge
    ? `<span class="product-badge ${product.badge.toLowerCase()}">${
        product.badge
      }</span>`
    : "";

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        ${badgeHTML}
        <span class="product-icon">🛍️</span>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">${priceHTML}</div>
        <button class="btn btn-primary btn-sm add-to-cart">Add to Cart</button>
      </div>
    </div>
  `;
}

/**
 * Render a stat card with animation
 */
export function renderStatCard(value, label, icon = "") {
  return `
    <div class="stat-item">
      ${icon ? `<span class="stat-icon">${icon}</span>` : ""}
      <span class="stat-number" data-value="${value}">${value}</span>
      <span class="stat-label">${label}</span>
    </div>
  `;
}

/**
 * Render countdown timer
 */
export function renderCountdown(targetDate, elementId = "countdown") {
  const container = document.getElementById(elementId);
  if (!container) return;

  const update = () => {
    const countdown = DataService.getCountdown(targetDate);

    if (countdown.expired) {
      container.innerHTML =
        '<div class="countdown-live">RACE IN PROGRESS!</div>';
      return;
    }

    container.innerHTML = `
      <div class="countdown-item">
        <span class="countdown-number" id="days">${String(
          countdown.days
        ).padStart(2, "0")}</span>
        <span class="countdown-label">Days</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number" id="hours">${String(
          countdown.hours
        ).padStart(2, "0")}</span>
        <span class="countdown-label">Hours</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number" id="mins">${String(
          countdown.mins
        ).padStart(2, "0")}</span>
        <span class="countdown-label">Mins</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number" id="secs">${String(
          countdown.secs
        ).padStart(2, "0")}</span>
        <span class="countdown-label">Secs</span>
      </div>
    `;
  };

  update();
  setInterval(update, 1000);
}

/**
 * Render activity feed item
 */
export function renderActivityItem(activity) {
  const timeAgo = DataService.formatRelativeTime(activity.timestamp);

  const categoryColors = {
    prediction: "rgba(230, 57, 70, 0.2)",
    discussion: "rgba(0, 123, 255, 0.2)",
    esports: "rgba(156, 39, 176, 0.2)",
    fantasy: "rgba(40, 167, 69, 0.2)",
  };

  return `
    <div class="activity-item">
      <div class="activity-avatar">${
        activity.type === "prediction"
          ? "📊"
          : activity.type === "esports"
          ? "🎮"
          : "💬"
      }</div>
      <div class="activity-content">
        <div class="activity-user">${activity.user} <span>${
    activity.action
  }</span></div>
        <div class="activity-text">${activity.content}</div>
        <div class="activity-time">${timeAgo}</div>
      </div>
      <span class="activity-type ${activity.category}" style="background: ${
    categoryColors[activity.category] || categoryColors.discussion
  }">
        ${activity.category}
      </span>
    </div>
  `;
}

/**
 * Loading skeleton for cards
 */
export function renderSkeleton(type = "card", count = 3) {
  const skeletons = {
    card: `
      <div class="skeleton-card">
        <div class="skeleton skeleton-image"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `,
    row: `
      <div class="skeleton-row">
        <div class="skeleton skeleton-avatar"></div>
        <div class="skeleton-content">
          <div class="skeleton skeleton-title short"></div>
          <div class="skeleton skeleton-text"></div>
        </div>
      </div>
    `,
  };

  return Array(count)
    .fill(skeletons[type] || skeletons.card)
    .join("");
}

// Export all components
export const UIComponents = {
  renderCalendarEvent,
  renderEntryCard,
  renderBoPCard,
  renderPredictionCard,
  renderDriverCard,
  renderProductCard,
  renderStatCard,
  renderCountdown,
  renderActivityItem,
  renderSkeleton,
};

// Expose to window for non-module scripts
if (typeof window !== "undefined") {
  window.UIComponents = UIComponents;
}

export default UIComponents;
