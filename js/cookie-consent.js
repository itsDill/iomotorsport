(function () {
  var CONSENT_KEY = "imo_cookie_consent";

  function setConsent(granted) {
    var state = granted ? "granted" : "denied";
    if (typeof gtag === "function") {
      gtag("consent", "update", {
        analytics_storage: state,
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
      });
    }
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  }

  function removeBanner() {
    var banner = document.getElementById("cookie-consent-banner");
    if (banner) banner.remove();
  }

  function injectStyles() {
    var style = document.createElement("style");
    style.textContent = [
      "#cookie-consent-banner{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#141416;border-top:1px solid #27272a;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;font-size:0.875rem;color:#a1a1aa;}",
      "#cookie-consent-banner p{margin:0;flex:1;min-width:200px;}",
      "#cookie-consent-banner a{color:#e63946;text-decoration:none;}",
      "#cookie-consent-banner a:hover{text-decoration:underline;}",
      "#cookie-consent-banner .cc-actions{display:flex;gap:10px;flex-shrink:0;}",
      "#cookie-consent-banner button{padding:8px 20px;border-radius:6px;font-size:0.875rem;font-weight:600;cursor:pointer;border:none;transition:opacity 0.2s;}",
      "#cc-accept{background:linear-gradient(135deg,#e63946,#f77f00);color:#fff;}",
      "#cc-decline{background:transparent;color:#a1a1aa;border:1px solid #27272a !important;}",
      "#cc-accept:hover,#cc-decline:hover{opacity:0.85;}",
    ].join("");
    document.head.appendChild(style);
  }

  function showBanner() {
    injectStyles();
    var banner = document.createElement("div");
    banner.id = "cookie-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      "<p>We use cookies to analyse site traffic and improve your experience. " +
      'See our <a href="/privacy-policy.html">privacy policy</a>.</p>' +
      '<div class="cc-actions">' +
      '<button id="cc-decline">Decline</button>' +
      '<button id="cc-accept">Accept</button>' +
      "</div>";
    document.body.appendChild(banner);

    document.getElementById("cc-accept").addEventListener("click", function () {
      setConsent(true);
      removeBanner();
    });

    document
      .getElementById("cc-decline")
      .addEventListener("click", function () {
        setConsent(false);
        removeBanner();
      });
  }

  // On load: check stored preference
  var stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "granted") {
    setConsent(true);
  } else if (stored === "denied") {
    setConsent(false);
  } else {
    // No prior choice — show the banner
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", showBanner);
    } else {
      showBanner();
    }
  }
})();
