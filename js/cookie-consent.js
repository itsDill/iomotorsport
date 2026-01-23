/**
 * Cookie Consent Manager for iomotorsport
 * Implements Google Consent Mode v2 for GDPR/CCPA compliance
 */

(function () {
  "use strict";

  const CONSENT_KEY = "ioMotorsport_cookieConsent";
  const CONSENT_VERSION = "1.0";

  // Check if consent was already given
  function getStoredConsent() {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.version === CONSENT_VERSION) {
          return data;
        }
      }
    } catch (e) {
      console.warn("Could not read consent from storage");
    }
    return null;
  }

  // Store consent choice
  function storeConsent(accepted) {
    const data = {
      version: CONSENT_VERSION,
      accepted: accepted,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Could not store consent");
    }
  }

  // Update Google Consent Mode
  function updateConsent(accepted) {
    if (typeof gtag === "function") {
      gtag("consent", "update", {
        ad_storage: accepted ? "granted" : "denied",
        ad_user_data: accepted ? "granted" : "denied",
        ad_personalization: accepted ? "granted" : "denied",
        analytics_storage: accepted ? "granted" : "denied",
      });
    }
  }

  // Create and show the consent banner
  function showConsentBanner() {
    const banner = document.createElement("div");
    banner.id = "cookie-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML = `
      <div class="consent-content">
        <div class="consent-text">
          <p><strong>🍪 We value your privacy</strong></p>
          <p>We use cookies for analytics and personalized ads. You can accept all cookies or customize your preferences. 
          <a href="/privacy-policy.html" target="_blank">Privacy Policy</a></p>
        </div>
        <div class="consent-buttons">
          <button id="consent-reject" class="consent-btn consent-btn-secondary">Reject All</button>
          <button id="consent-accept" class="consent-btn consent-btn-primary">Accept All</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    document.getElementById("consent-accept").addEventListener("click", () => {
      storeConsent(true);
      updateConsent(true);
      hideBanner();
    });

    document.getElementById("consent-reject").addEventListener("click", () => {
      storeConsent(false);
      updateConsent(false);
      hideBanner();
    });

    // Animate in
    requestAnimationFrame(() => {
      banner.classList.add("consent-visible");
    });
  }

  function hideBanner() {
    const banner = document.getElementById("cookie-consent-banner");
    if (banner) {
      banner.classList.remove("consent-visible");
      banner.classList.add("consent-hiding");
      setTimeout(() => banner.remove(), 300);
    }
  }

  // Initialize on DOM ready
  function init() {
    const storedConsent = getStoredConsent();

    if (storedConsent) {
      // User already made a choice - update consent silently
      updateConsent(storedConsent.accepted);
    } else {
      // First visit - show banner
      showConsentBanner();
    }
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
