/**
 * iomotorsport Data Service
 * Central module for fetching and managing all site data
 *
 * Usage:
 * import { DataService } from './js/data-service.js';
 * const data = await DataService.getRaces();
 */

const DATA_BASE_PATH = "./data";

// Cache for loaded data
const dataCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Generic fetch with caching
 */
async function fetchJSON(filename) {
  const cacheKey = filename;
  const cached = dataCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(`${DATA_BASE_PATH}/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}: ${response.status}`);
    }
    const data = await response.json();

    dataCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    // Return cached data even if expired, as fallback
    if (cached) {
      console.warn(`Using stale cache for ${filename}`);
      return cached.data;
    }
    throw error;
  }
}

/**
 * Data Service - Main API
 */
export const DataService = {
  // ==========================================
  // RACES & CALENDAR
  // ==========================================

  async getRaces() {
    return fetchJSON("races.json");
  },

  async getCalendar(series = null) {
    const data = await this.getRaces();
    let calendar = data.calendar || [];

    if (series) {
      calendar = calendar.filter((race) => race.series === series);
    }

    // Sort by date
    return calendar.sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  async getUpcomingRaces(limit = 5) {
    const calendar = await this.getCalendar();
    const now = new Date();
    return calendar
      .filter(
        (race) => new Date(race.date) >= now || race.status === "upcoming"
      )
      .slice(0, limit);
  },

  async getNextRace() {
    const calendar = await this.getCalendar();
    return calendar.find(
      (race) => race.isNextRace || race.status === "upcoming"
    );
  },

  async getCompletedRaces(limit = 10) {
    const calendar = await this.getCalendar();
    return calendar
      .filter((race) => race.status === "completed")
      .reverse()
      .slice(0, limit);
  },

  async getSeries() {
    const data = await this.getRaces();
    return data.series || {};
  },

  // ==========================================
  // TEAMS & ENTRIES
  // ==========================================

  async getTeams() {
    return fetchJSON("teams.json");
  },

  async getEntryList(series = null, classFilter = null) {
    const data = await this.getTeams();
    let teams = data.teams || [];

    if (series) {
      teams = teams.filter((team) => team.series.includes(series));
    }

    if (classFilter) {
      teams = teams.filter((team) => team.class === classFilter);
    }

    // Sort by car number
    return teams.sort((a, b) => a.number - b.number);
  },

  async getManufacturers() {
    const data = await this.getTeams();
    return data.manufacturers || {};
  },

  async getClasses() {
    const data = await this.getTeams();
    return data.classes || {};
  },

  // ==========================================
  // BALANCE OF PERFORMANCE
  // ==========================================

  async getBoP() {
    return fetchJSON("bop.json");
  },

  async getBoPForRace(raceId) {
    const data = await this.getBoP();
    const adjustments = data.adjustments || [];
    return adjustments.find((adj) => adj.race === raceId);
  },

  async getLatestBoP() {
    const data = await this.getBoP();
    const adjustments = data.adjustments || [];
    // Return most recent
    return adjustments[adjustments.length - 1];
  },

  // ==========================================
  // PREDICTIONS
  // ==========================================

  async getPredictions() {
    return fetchJSON("predictions.json");
  },

  async getActivePredictions() {
    const data = await this.getPredictions();
    const predictions = data.predictions || [];
    return predictions.filter((p) => p.status === "active");
  },

  async getPredictionForRace(raceId) {
    const data = await this.getPredictions();
    const predictions = data.predictions || [];
    return predictions.find((p) => p.race === raceId);
  },

  async getPredictionStats() {
    const data = await this.getPredictions();
    return {
      accuracy: data.overallAccuracy,
      total: data.totalPredictions,
      correct: data.correctPredictions,
    };
  },

  // ==========================================
  // ESPORTS
  // ==========================================

  async getEsports() {
    return fetchJSON("esports.json");
  },

  async getEsportsDrivers(featured = false) {
    const data = await this.getEsports();
    let drivers = data.drivers || [];

    if (featured) {
      drivers = drivers.filter((d) => d.featured);
    }

    return drivers;
  },

  async getEsportsStats() {
    const data = await this.getEsports();
    return data.stats || {};
  },

  async getRecentEsportsResults(limit = 5) {
    const data = await this.getEsports();
    return (data.recentResults || []).slice(0, limit);
  },

  async getUpcomingEsportsEvents(limit = 5) {
    const data = await this.getEsports();
    return (data.upcomingEvents || []).slice(0, limit);
  },

  // ==========================================
  // COMMUNITY
  // ==========================================

  async getCommunity() {
    return fetchJSON("community.json");
  },

  async getCommunityStats() {
    const data = await this.getCommunity();
    return data.stats || {};
  },

  async getSocials() {
    const data = await this.getCommunity();
    return data.socials || [];
  },

  async getTopContributors(limit = 5) {
    const data = await this.getCommunity();
    return (data.topContributors || []).slice(0, limit);
  },

  async getRecentActivity(limit = 5) {
    const data = await this.getCommunity();
    return (data.recentActivity || []).slice(0, limit);
  },

  // ==========================================
  // STORE
  // ==========================================

  async getStore() {
    return fetchJSON("store.json");
  },

  async getProducts(category = null, featured = false) {
    const data = await this.getStore();
    let products = data.products || [];

    if (category) {
      products = products.filter((p) => p.category === category);
    }

    if (featured) {
      products = products.filter((p) => p.featured);
    }

    return products;
  },

  async getProductById(id) {
    const data = await this.getStore();
    return (data.products || []).find((p) => p.id === id);
  },

  async getStoreCategories() {
    const data = await this.getStore();
    return data.categories || [];
  },

  async getPromoCode() {
    const data = await this.getStore();
    return data.promoCode || null;
  },

  // ==========================================
  // UTILITIES
  // ==========================================

  clearCache() {
    dataCache.clear();
  },

  // Get country flag emoji from country code
  getFlag(countryCode) {
    if (!countryCode || countryCode.length !== 2) return "🏁";
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  },

  // Format date for display
  formatDate(dateString, options = {}) {
    const date = new Date(dateString);
    const defaultOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      ...options,
    };
    return date.toLocaleDateString("en-US", defaultOptions);
  },

  // Format relative time
  formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days ago`;
    } else if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else if (diffDays < 7) {
      return `In ${diffDays} days`;
    } else if (diffDays < 30) {
      return `In ${Math.floor(diffDays / 7)} weeks`;
    } else {
      return `In ${Math.floor(diffDays / 30)} months`;
    }
  },

  // Get countdown object for a date
  getCountdown(targetDate) {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const distance = target - now;

    if (distance <= 0) {
      return { expired: true, days: 0, hours: 0, mins: 0, secs: 0 };
    }

    return {
      expired: false,
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      secs: Math.floor((distance % (1000 * 60)) / 1000),
    };
  },
};

// Also expose as window global for non-module scripts
if (typeof window !== "undefined") {
  window.DataService = DataService;
}

export default DataService;
