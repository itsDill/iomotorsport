// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing mobile menu...");
  initializeMobileMenu();
});

// Simple Mobile menu functionality
function initializeMobileMenu() {
  console.log("=== MOBILE MENU INITIALIZATION ===");

  // Get the mobile toggle button that already exists in HTML
  const mobileToggle = document.querySelector(".mobile-menu-toggle");

  if (!mobileToggle) {
    console.log("ERROR: No mobile toggle button found in HTML");
    return;
  }

  console.log("Mobile toggle button found:", mobileToggle);

  // Remove any existing mobile nav
  const existingMobileNav = document.querySelector(".mobile-nav");
  if (existingMobileNav) {
    existingMobileNav.remove();
    console.log("Removed existing mobile nav");
  }

  // Create the mobile nav
  const mobileNav = document.createElement("div");
  mobileNav.className = "mobile-nav";

  // Create mobile nav links container
  const mobileNavLinks = document.createElement("div");
  mobileNavLinks.className = "mobile-nav-links";

  // Get navigation links and clone them
  const navLinks = document.querySelectorAll(".nav-links a");
  console.log("Found navigation links:", navLinks.length);

  navLinks.forEach((link) => {
    const mobileLink = link.cloneNode(true);

    // Add click handler to each individual link
    mobileLink.addEventListener("click", function (e) {
      console.log("Mobile link clicked:", this.href);
      // Close menu immediately when link is clicked
      mobileNav.classList.remove("active");
      mobileToggle.innerHTML = "☰";
      document.body.style.overflow = "";
      console.log("Menu closed via individual link click");

      // Allow the navigation to proceed
      // The menu will close before the page navigation happens
    });

    mobileNavLinks.appendChild(mobileLink);
  });

  mobileNav.appendChild(mobileNavLinks);
  document.body.appendChild(mobileNav);

  console.log("Mobile nav created and added to body");

  // Simple click handler
  mobileToggle.onclick = function (e) {
    e.preventDefault();
    console.log("=== MOBILE MENU CLICKED ===");

    const isActive = mobileNav.classList.contains("active");
    console.log("Menu currently active:", isActive);

    if (isActive) {
      // Close menu
      mobileNav.classList.remove("active");
      mobileToggle.textContent = "☰";
      document.body.style.overflow = "";
      console.log("Menu closed");
    } else {
      // Open menu
      mobileNav.classList.add("active");
      mobileToggle.textContent = "✕";
      document.body.style.overflow = "hidden";
      console.log("Menu opened");
    }
  };

  // Close menu when clicking on the mobile nav container (backup)
  mobileNavLinks.onclick = function (e) {
    // Only close if clicking on the container itself, not on links
    if (e.target === mobileNavLinks) {
      mobileNav.classList.remove("active");
      mobileToggle.textContent = "☰";
      document.body.style.overflow = "";
      console.log("Menu closed via container click");
    }
  };

  // Close menu when clicking outside
  document.onclick = function (e) {
    if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
      if (mobileNav.classList.contains("active")) {
        mobileNav.classList.remove("active");
        mobileToggle.textContent = "☰";
        document.body.style.overflow = "";
        console.log("Menu closed via outside click");
      }
    }
  };

  console.log("=== MOBILE MENU SETUP COMPLETE ===");

  // Additional safeguards for menu state

  // Close menu when page becomes hidden (user navigates away)
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && mobileNav.classList.contains("active")) {
      mobileNav.classList.remove("active");
      mobileToggle.textContent = "☰";
      document.body.style.overflow = "";
      console.log("Menu closed via page visibility change");
    }
  });

  // Close menu before page unloads
  window.addEventListener("beforeunload", function () {
    if (mobileNav.classList.contains("active")) {
      mobileNav.classList.remove("active");
      mobileToggle.textContent = "☰";
      document.body.style.overflow = "";
      console.log("Menu closed via page unload");
    }
  });

  // Ensure menu is closed when page loads
  window.addEventListener("load", function () {
    mobileNav.classList.remove("active");
    mobileToggle.textContent = "☰";
    document.body.style.overflow = "";
    console.log("Menu state reset on page load");
  });
}
