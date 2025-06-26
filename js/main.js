// Mobile Menu Toggle
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  const mobileMenu = document.querySelector(".mobile-menu");

  navLinks.classList.toggle("active");
  mobileMenu.classList.toggle("active");
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const navLinks = document.querySelector(".nav-links");
      if (navLinks.classList.contains("active")) {
        toggleMobileMenu();
      }
    }
  });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;

    // Here you would typically send the email to your server
    console.log("Subscribed email:", email);

    // Show success message
    alert("Thank you for subscribing to our newsletter!");
    emailInput.value = "";
  });
}

// Sticky Navigation on Scroll
window.addEventListener("scroll", function () {
  const navHeader = document.querySelector(".nav-header");
  if (window.scrollY > 100) {
    navHeader.classList.add("sticky");
  } else {
    navHeader.classList.remove("sticky");
  }
});

// Hero Section Animation
document.addEventListener("DOMContentLoaded", function () {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add("animate");
    }, 300);
  }
});

// Stats Counter Animation
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  const statsSection = document.querySelector(".stats-bar");

  if (!statsSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statNumbers.forEach((stat) => {
            const target =
              +stat.getAttribute("data-target") || +stat.textContent;
            const increment = target / 50;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                clearInterval(timer);
                stat.textContent = target;
              } else {
                stat.textContent = Math.floor(current);
              }
            }, 20);
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  animateStats();

  // Set current year in footer
  const yearElement = document.querySelector(".footer-bottom p");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace("2025", currentYear);
  }
});

// Image Lazy Loading
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("data-src");
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach((img) => {
      img.src = img.getAttribute("data-src");
    });
  }
});

// Featured Card Hover Effect
document.querySelectorAll(".featured-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.querySelector(".featured-overlay").style.opacity = "1";
  });

  card.addEventListener("mouseleave", function () {
    this.querySelector(".featured-overlay").style.opacity = "0";
  });
});

// Google Analytics Event Tracking
document.querySelectorAll("a[data-event]").forEach((link) => {
  link.addEventListener("click", function () {
    const eventCategory =
      this.getAttribute("data-event-category") || "Engagement";
    const eventAction = this.getAttribute("data-event-action") || "Click";
    const eventLabel =
      this.getAttribute("data-event-label") || this.textContent;

    if (typeof gtag === "function") {
      gtag("event", eventAction, {
        event_category: eventCategory,
        event_label: eventLabel,
      });
    }
  });
});
