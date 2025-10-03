// Input Validation and Sanitization Library
// Secure input handling for forms and user data

class SecurityUtils {
  // HTML Entity encoding to prevent XSS
  static escapeHtml(text) {
    if (typeof text !== "string") return text;

    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;",
    };

    return text.replace(/[&<>"'`=\/]/g, function (s) {
      return map[s];
    });
  }

  // Sanitize input by removing potentially dangerous content
  static sanitizeInput(input, maxLength = 1000) {
    if (typeof input !== "string") return "";

    // Remove any script tags
    input = input.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );

    // Remove any javascript: protocols
    input = input.replace(/javascript:/gi, "");

    // Remove any data: protocols
    input = input.replace(/data:/gi, "");

    // Remove any vbscript: protocols
    input = input.replace(/vbscript:/gi, "");

    // Remove any onXXX event handlers
    input = input.replace(/on\w+\s*=/gi, "");

    // Remove any iframe, object, embed tags
    input = input.replace(
      /<(iframe|object|embed|form|input|button)\b[^>]*>/gi,
      ""
    );

    // Limit length to prevent buffer overflow attacks
    if (input.length > maxLength) {
      input = input.substring(0, maxLength);
    }

    // Trim whitespace
    return input.trim();
  }

  // Validate email format
  static isValidEmail(email) {
    if (typeof email !== "string") return false;

    // Basic email validation regex that prevents common XSS vectors
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return emailRegex.test(email) && email.length <= 254;
  }

  // Validate phone number
  static isValidPhone(phone) {
    if (typeof phone !== "string") return false;

    // Allow international phone formats but prevent injection
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
    return phoneRegex.test(phone);
  }

  // Validate text input
  static isValidText(text, minLength = 1, maxLength = 1000) {
    if (typeof text !== "string") return false;

    const cleanText = text.trim();
    return cleanText.length >= minLength && cleanText.length <= maxLength;
  }

  // Validate country name
  static isValidCountry(country) {
    if (typeof country !== "string") return false;

    // Only allow letters, spaces, hyphens, and apostrophes
    const countryRegex = /^[a-zA-Z\s\-']{2,50}$/;
    return countryRegex.test(country);
  }

  // Validate names
  static isValidName(name) {
    if (typeof name !== "string") return false;

    // Only allow letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s\-']{1,100}$/;
    return nameRegex.test(name.trim());
  }

  // Rate limiting helper (simple client-side)
  static rateLimitCheck(key, maxAttempts = 5, timeWindow = 300000) {
    // 5 minutes
    const now = Date.now();
    const attempts = JSON.parse(localStorage.getItem(key) || "[]");

    // Remove old attempts outside time window
    const recentAttempts = attempts.filter((time) => now - time < timeWindow);

    if (recentAttempts.length >= maxAttempts) {
      return false; // Rate limited
    }

    // Add current attempt
    recentAttempts.push(now);
    localStorage.setItem(key, JSON.stringify(recentAttempts));

    return true; // Not rate limited
  }

  // Safe innerHTML replacement using textContent
  static safeSetContent(element, content) {
    if (!element) return;

    // Always use textContent instead of innerHTML for user data
    element.textContent = this.sanitizeInput(content);
  }

  // Safe dynamic content creation
  static createSafeElement(tagName, textContent, className = "") {
    const element = document.createElement(tagName);

    if (className) {
      element.className = className;
    }

    if (textContent) {
      element.textContent = this.sanitizeInput(textContent);
    }

    return element;
  }

  // Generate secure random token for CSRF protection
  static generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  }

  // Validate CSRF token
  static validateCSRFToken(token, sessionToken) {
    return token === sessionToken && token.length === 64;
  }
}

// Global security utilities
window.SecurityUtils = SecurityUtils;
