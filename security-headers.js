// Security Headers and Content Security Policy
// Add this script to the head of each HTML page for enhanced security

(function () {
  "use strict";

  // Content Security Policy - prevent XSS attacks
  const meta = document.createElement("meta");
  meta.httpEquiv = "Content-Security-Policy";
  meta.content =
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' https:; " +
    "connect-src 'self' https:; " +
    "frame-src https://www.google.com; " +
    "object-src 'none'; " +
    "base-uri 'self';";
  document.head.appendChild(meta);

  // X-Content-Type-Options
  const xContentType = document.createElement("meta");
  xContentType.httpEquiv = "X-Content-Type-Options";
  xContentType.content = "nosniff";
  document.head.appendChild(xContentType);

  // X-Frame-Options
  const xFrame = document.createElement("meta");
  xFrame.httpEquiv = "X-Frame-Options";
  xFrame.content = "DENY";
  document.head.appendChild(xFrame);

  // X-XSS-Protection
  const xssProtection = document.createElement("meta");
  xssProtection.httpEquiv = "X-XSS-Protection";
  xssProtection.content = "1; mode=block";
  document.head.appendChild(xssProtection);

  // Referrer Policy
  const referrer = document.createElement("meta");
  referrer.name = "referrer";
  referrer.content = "strict-origin-when-cross-origin";
  document.head.appendChild(referrer);

  // Clear any potentially malicious scripts on page load
  document.addEventListener("DOMContentLoaded", function () {
    // Remove any scripts that might have been injected
    const suspiciousScripts = document.querySelectorAll(
      'script[src*="javascript:"], script[src*="data:"]'
    );
    suspiciousScripts.forEach((script) => script.remove());

    // Scan for potentially dangerous attributes
    const elementsWithEvents = document.querySelectorAll(
      "[onclick], [onload], [onerror], [onmouseover]"
    );
    elementsWithEvents.forEach((el) => {
      console.warn("Potentially unsafe event handler found:", el);
    });
  });
})();
