// ================================
// ENDURANCE RACING HUB - SHARED JS
// Common functionality across all pages
// ================================

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");
  const body = document.body;

  if (!mobileToggle || !navLinks) return;

  // Toggle mobile menu
  mobileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = navLinks.classList.toggle("active");
    mobileToggle.setAttribute("aria-expanded", isActive);

    // Prevent body scroll when menu is open
    body.style.overflow = isActive ? "hidden" : "";

    // Animate hamburger
    mobileToggle.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav") && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileToggle.classList.remove("active");
      body.style.overflow = "";
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.classList.remove("active");
        body.style.overflow = "";
      }
    });
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.classList.remove("active");
        body.style.overflow = "";
      }
    }, 250);
  });
}

/**
 * Smooth Scrolling
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#"
      if (href === "#") {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // Get nav height for offset
        const nav = document.querySelector("nav");
        const navHeight = nav ? nav.offsetHeight : 0;
        const breadcrumb = document.querySelector(".breadcrumb");
        const breadcrumbHeight = breadcrumb ? breadcrumb.offsetHeight : 0;

        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition =
          targetPosition - navHeight - breadcrumbHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }

        // Focus management for accessibility
        target.setAttribute("tabindex", "-1");
        target.focus();
        target.removeAttribute("tabindex");
      }
    });
  });
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;

          if (currentScroll > 100) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }

          // Optional: Hide navbar on scroll down, show on scroll up
          // if (currentScroll > lastScroll && currentScroll > 200) {
          //   navbar.style.transform = 'translateY(-100%)';
          // } else {
          //   navbar.style.transform = 'translateY(0)';
          // }

          lastScroll = currentScroll;
          ticking = false;
        });

        ticking = true;
      }
    },
    { passive: true }
  );
}

/**
 * Intersection Observer for Fade-in Animations
 */
function initScrollAnimations() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe sections
  document
    .querySelectorAll(".section, .card, .tool-card, .blog-card, .event-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      fadeObserver.observe(el);
    });

  // Add visible class style dynamically
  const style = document.createElement("style");
  style.textContent = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll("img[data-src]");
    images.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  } else {
    // Fallback to Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Mobile Dropdown Handling
 */
function initMobileDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector("a");

    dropdown.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();

        // Close other dropdowns
        dropdowns.forEach((other) => {
          if (other !== dropdown) {
            other.classList.remove("active");
          }
        });

        dropdown.classList.toggle("active");
      }
    });
  });
}

/**
 * Form Validation Helper
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Debounce Helper
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle Helper
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Toast Notification System
 */
const Toast = {
  show: function (message, type = "info", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      padding: 1rem 2rem;
      background: ${
        type === "success"
          ? "#06d6a0"
          : type === "error"
          ? "#ef476f"
          : "#1d3557"
      };
      color: white;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      font-weight: 600;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
};

// Add toast animations
const toastStyles = document.createElement("style");
toastStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(toastStyles);

/**
 * Initialize All Components on DOM Ready
 */
function init() {
  initMobileMenu();
  initSmoothScroll();
  initNavbarScroll();
  initScrollAnimations();
  initLazyLoading();
  initMobileDropdowns();

  // Performance: Preload hero image if it exists
  const heroImg = new Image();
  if (document.querySelector(".hero")) {
    heroImg.src = "/photos/hero.png";
  }

  console.log("🏁 Endurance Racing Hub initialized");
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Toast,
    debounce,
    throttle,
    validateEmail,
  };
}
