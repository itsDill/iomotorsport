// Common JavaScript functionality for RallyData Pro

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(10, 10, 10, 0.98)";
  } else {
    header.style.background = "rgba(10, 10, 10, 0.95)";
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Set active navigation link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    // Check if current page matches the link
    if (
      href === currentPage ||
      (currentPage === "index.html" && href === "/") ||
      (currentPage === "" && href === "/")
    ) {
      link.classList.add("active");
    }
  });
}

// Utility function to format time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(1);
  return `${minutes}:${secs.padStart(4, "0")}`;
}

// Utility function to format date
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Utility function to format time difference
function formatTimeDiff(diff) {
  if (diff === 0) return "—";
  const sign = diff > 0 ? "+" : "";
  return `${sign}${diff.toFixed(1)}`;
}

// Initialize common functionality
document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();

  // Add loading animation to buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (this.classList.contains("loading-btn")) {
        e.preventDefault();
        this.innerHTML = '<span class="loading"></span> Loading...';
        this.disabled = true;

        // Remove loading state after 2 seconds (simulate API call)
        setTimeout(() => {
          this.innerHTML = this.dataset.originalText || "Button";
          this.disabled = false;
        }, 2000);
      }
    });
  });
});

// Live data simulation utilities
class LiveDataSimulator {
  constructor() {
    this.intervals = [];
  }

  startTimingUpdates(callback, interval = 3000) {
    const intervalId = setInterval(callback, interval);
    this.intervals.push(intervalId);
    return intervalId;
  }

  stopAllUpdates() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }

  generateRandomTime(base, variance = 2) {
    return base + (Math.random() - 0.5) * variance;
  }

  generateWeatherData() {
    return {
      temperature: Math.round(15 + Math.random() * 20),
      humidity: Math.round(40 + Math.random() * 40),
      windSpeed: Math.round(Math.random() * 25),
      windDirection: Math.round(Math.random() * 360),
      conditions: ["Sunny", "Cloudy", "Light Rain", "Heavy Rain"][
        Math.floor(Math.random() * 4)
      ],
    };
  }
}

// Export for use in other files
window.RallyDataPro = {
  LiveDataSimulator,
  formatTime,
  formatDate,
  formatTimeDiff,
  setActiveNavLink,
};
