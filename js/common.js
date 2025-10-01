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
      mobileToggle.innerHTML = "☰";
      document.body.style.overflow = "";
      console.log("Menu closed");
    } else {
      // Open menu
      mobileNav.classList.add("active");
      mobileToggle.innerHTML = "✕";
      document.body.style.overflow = "hidden";
      console.log("Menu opened");
    }
  };

  // Close menu when clicking a link
  mobileNavLinks.onclick = function () {
    mobileNav.classList.remove("active");
    mobileToggle.innerHTML = "☰";
    document.body.style.overflow = "";
    console.log("Menu closed via link click");
  };

  // Close menu when clicking outside
  document.onclick = function (e) {
    if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
      if (mobileNav.classList.contains("active")) {
        mobileNav.classList.remove("active");
        mobileToggle.innerHTML = "☰";
        document.body.style.overflow = "";
        console.log("Menu closed via outside click");
      }
    }
  };

  console.log("=== MOBILE MENU SETUP COMPLETE ===");
}
