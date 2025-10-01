// Common JavaScript functionality for Thailand Motorsports Tourism

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(10, 10, 10, 0.98)";
  } else {
    header.style.background = "rgba(10, 10, 10, 0.95)";
  }
});

// Sticky bottom ad functionality for mobile devices
function initializeStickyAd() {
  // Only show on mobile devices
  if (window.innerWidth <= 768) {
    const stickyAd = document.createElement("div");
    stickyAd.className = "sticky-bottom-ad";
    stickyAd.innerHTML = `
      <button class="sticky-close" onclick="this.parentElement.remove(); document.body.classList.remove('has-sticky-ad');">×</button>
      <p class="adsense-label">Advertisement</p>
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-2456627863532019"
           data-ad-slot="1111111111"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    `;

    document.body.appendChild(stickyAd);
    document.body.classList.add("has-sticky-ad");

    // Show after 3 seconds
    setTimeout(() => {
      stickyAd.classList.add("show");
      // Initialize the ad
      if (typeof adsbygoogle !== "undefined") {
        (adsbygoogle = window.adsbygoogle || []).push({});
      }
    }, 3000);
  }
}

// Enhanced Mobile menu functionality
function initializeMobileMenu() {
  // Check if mobile toggle already exists
  let mobileToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector("nav");

  if (!mobileToggle && nav) {
    // Create mobile menu toggle button if it doesn't exist
    mobileToggle = document.createElement("button");
    mobileToggle.className = "mobile-menu-toggle";
    mobileToggle.innerHTML = "☰";
    mobileToggle.setAttribute("aria-label", "Toggle mobile menu");
    mobileToggle.setAttribute("type", "button");
    nav.appendChild(mobileToggle);
  }

  if (mobileToggle && !document.querySelector(".mobile-nav")) {
    // Create mobile navigation
    const mobileNav = document.createElement("div");
    mobileNav.className = "mobile-nav";

    const mobileNavLinks = document.createElement("div");
    mobileNavLinks.className = "mobile-nav-links";

    // Copy navigation links to mobile menu
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
      const mobileLink = link.cloneNode(true);
      mobileNavLinks.appendChild(mobileLink);
    });

    mobileNav.appendChild(mobileNavLinks);
    document.body.appendChild(mobileNav);

    // Toggle mobile menu with improved event handling
    const toggleMenu = function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isActive = mobileNav.classList.contains("active");

      if (isActive) {
        mobileNav.classList.remove("active");
        mobileToggle.innerHTML = "☰";
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      } else {
        mobileNav.classList.add("active");
        mobileToggle.innerHTML = "✕";
        mobileToggle.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
      }
    };

    // Add multiple event listeners for better compatibility
    mobileToggle.addEventListener("click", toggleMenu);
    mobileToggle.addEventListener("touchstart", toggleMenu, { passive: false });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileNav.classList.remove("active");
        mobileToggle.innerHTML = "☰";
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking on a link
    mobileNavLinks.addEventListener("click", function () {
      mobileNav.classList.remove("active");
      mobileToggle.innerHTML = "☰";
      mobileToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });

    // Handle window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        mobileNav.classList.remove("active");
        mobileToggle.innerHTML = "☰";
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("active")) {
        mobileNav.classList.remove("active");
        mobileToggle.innerHTML = "☰";
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }
}

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

// Thailand weather simulation
function generateThailandWeather() {
  const cities = ["Bangkok", "Buriram", "Pattaya", "Phetchaburi"];
  const city = cities[Math.floor(Math.random() * cities.length)];

  return {
    city: city,
    temperature: Math.round(25 + Math.random() * 10), // 25-35°C typical for Thailand
    humidity: Math.round(60 + Math.random() * 30), // 60-90% typical
    windSpeed: Math.round(Math.random() * 15),
    windDirection: Math.round(Math.random() * 360),
    conditions: ["Sunny", "Partly Cloudy", "Thunderstorms", "Hot"][
      Math.floor(Math.random() * 4)
    ],
  };
}

// Initialize common functionality
document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();
  initializeMobileMenu();

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

  // Initialize mobile menu
  initializeMobileMenu();

  // Initialize AdSense ads if present
  if (typeof adsbygoogle !== "undefined") {
    (adsbygoogle = window.adsbygoogle || []).push({});
  }

  // Initialize sticky bottom ad for mobile
  initializeStickyAd();
});

// Mobile menu functionality
function initializeMobileMenu() {
  // Create mobile menu toggle button if it doesn't exist
  const nav = document.querySelector("nav");
  if (nav && !document.querySelector(".mobile-menu-toggle")) {
    const mobileToggle = document.createElement("button");
    mobileToggle.className = "mobile-menu-toggle";
    mobileToggle.innerHTML = "☰";
    mobileToggle.setAttribute("aria-label", "Toggle mobile menu");
    nav.appendChild(mobileToggle);

    // Create mobile navigation
    const mobileNav = document.createElement("div");
    mobileNav.className = "mobile-nav";

    const mobileNavLinks = document.createElement("div");
    mobileNavLinks.className = "mobile-nav-links";

    // Copy navigation links to mobile menu
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
      const mobileLink = link.cloneNode(true);
      mobileNavLinks.appendChild(mobileLink);
    });

    mobileNav.appendChild(mobileNavLinks);
    document.body.appendChild(mobileNav);

    // Toggle mobile menu
    mobileToggle.addEventListener("click", function () {
      const isActive = mobileNav.classList.contains("active");

      if (isActive) {
        mobileNav.classList.remove("active");
        this.innerHTML = "☰";
      } else {
        mobileNav.classList.add("active");
        this.innerHTML = "✕";
      }
    });

    // Close mobile menu when clicking on links
    mobileNavLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        mobileNav.classList.remove("active");
        mobileToggle.innerHTML = "☰";
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove("active");
        mobileToggle.innerHTML = "☰";
      }
    });

    // Handle window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        mobileNav.classList.remove("active");
        mobileToggle.innerHTML = "☰";
      }
    });
  }
}

// Sticky bottom ad functionality for mobile devices
function initializeStickyAd() {
  // Only show on mobile devices
  if (window.innerWidth <= 768) {
    const stickyAd = document.createElement("div");
    stickyAd.className = "sticky-bottom-ad";
    stickyAd.innerHTML = `
      <button class="sticky-close" onclick="this.parentElement.remove(); document.body.classList.remove('has-sticky-ad');">×</button>
      <p class="adsense-label">Advertisement</p>
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-2456627863532019"
           data-ad-slot="1111111111"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    `;

    document.body.appendChild(stickyAd);
    document.body.classList.add("has-sticky-ad");

    // Show after 3 seconds
    setTimeout(() => {
      stickyAd.classList.add("show");
      // Initialize the ad
      if (typeof adsbygoogle !== "undefined") {
        (adsbygoogle = window.adsbygoogle || []).push({});
      }
    }, 3000);
  }
}

// Live data simulation utilities for racing events
class RacingDataSimulator {
  constructor() {
    this.intervals = [];
  }

  startRaceUpdates(callback, interval = 3000) {
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

  generateThailandRaceData() {
    const drivers = [
      "Vutthikorn Inthraphuvasak",
      "Nattavude Charoensukhawatana",
      "Kantadhee Kusiri",
      "Pattarawat Yokubon",
      "Sandy Stuvik",
    ];

    return {
      driver: drivers[Math.floor(Math.random() * drivers.length)],
      lapTime: this.generateRandomTime(95, 3), // ~1:35 base lap time
      position: Math.floor(Math.random() * 20) + 1,
      circuit: "Chang International Circuit",
    };
  }
}

// Enhanced Google Analytics 4 tracking functions
function trackUserEngagement() {
  // Track scroll depth
  let maxScrollDepth = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
      maxScrollDepth = scrollPercent;
      if (typeof gtag !== "undefined") {
        gtag("event", "scroll", {
          scroll_depth: scrollPercent,
        });
      }
    }
  });

  // Track time on page
  let startTime = Date.now();
  window.addEventListener("beforeunload", function () {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (typeof gtag !== "undefined" && timeSpent > 10) {
      gtag("event", "page_view_time", {
        time_spent: timeSpent,
        page_title: document.title,
      });
    }
  });

  // Track outbound link clicks
  document.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      const href = e.target.href;
      if (href && !href.includes(window.location.hostname)) {
        if (typeof gtag !== "undefined") {
          gtag("event", "click", {
            event_category: "outbound",
            event_label: href,
            transport_type: "beacon",
          });
        }
      }
    }
  });

  // Track file downloads
  document.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      const href = e.target.href;
      const fileExtensions = [
        ".pdf",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".zip",
        ".rar",
      ];
      const isDownload = fileExtensions.some((ext) =>
        href.toLowerCase().includes(ext)
      );

      if (isDownload && typeof gtag !== "undefined") {
        gtag("event", "file_download", {
          file_name: href.split("/").pop(),
          file_extension: href.split(".").pop().toLowerCase(),
        });
      }
    }
  });
}

// Track racing-specific user interests
function trackRacingInterests() {
  // Track which racing content users interact with
  const racingLinks = document.querySelectorAll(
    'a[href*="f1"], a[href*="motogp"], a[href*="bangkok"], a[href*="chang"]'
  );
  racingLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (typeof gtag !== "undefined") {
        const linkText = this.textContent.trim().toLowerCase();
        let category = "general";

        if (linkText.includes("f1") || linkText.includes("formula")) {
          category = "formula_1";
        } else if (
          linkText.includes("motogp") ||
          linkText.includes("motorcycle")
        ) {
          category = "motogp";
        } else if (linkText.includes("bangkok")) {
          category = "bangkok_racing";
        } else if (linkText.includes("chang")) {
          category = "chang_circuit";
        }

        gtag("event", "racing_interest_click", {
          racing_category: category,
          link_text: linkText,
          page_location: window.location.pathname,
        });
      }
    });
  });
}

// Initialize enhanced analytics
document.addEventListener("DOMContentLoaded", function () {
  // Register service worker for better caching and offline support
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }

  // Initialize mobile menu
  initializeMobileMenu();

  // Wait a bit to ensure gtag is loaded
  setTimeout(() => {
    if (typeof gtag !== "undefined") {
      trackUserEngagement();
      trackRacingInterests();

      // Track page category based on URL
      const path = window.location.pathname;
      let pageCategory = "general";

      if (path.includes("blog")) pageCategory = "blog";
      else if (path.includes("circuits")) pageCategory = "circuits";
      else if (path.includes("events")) pageCategory = "events";
      else if (path.includes("calendar")) pageCategory = "calendar";
      else if (path.includes("contact")) pageCategory = "contact";
      else if (path.includes("f1")) pageCategory = "formula_1";
      else if (path.includes("motogp")) pageCategory = "motogp";

      gtag("event", "page_category_view", {
        page_category: pageCategory,
        page_title: document.title,
      });
    }
  }, 1000);
});

// Export for use in other files
window.ThailandMotorsports = {
  RacingDataSimulator,
  formatTime,
  formatDate,
  formatTimeDiff,
  setActiveNavLink,
  generateThailandWeather,
  trackUserEngagement,
  trackRacingInterests,
};
