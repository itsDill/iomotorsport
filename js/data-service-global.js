/**
 * iomotorsport Data Service (Non-Module Version)
 * Use this in regular script tags
 *
 * Usage:
 * <script src="js/data-service-global.js"></script>
 * <script>
 *   DataService.getRaces().then(data => console.log(data));
 * </script>
 */

(function (window) {
  "use strict";

  const DATA_BASE_PATH = "./data";
  const dataCache = new Map();
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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
      if (cached) {
        console.warn(`Using stale cache for ${filename}`);
        return cached.data;
      }
      throw error;
    }
  }

  const DataService = {
    // Races & Calendar
    getRaces: () => fetchJSON("races.json"),

    async getCalendar(series) {
      const data = await this.getRaces();
      let calendar = data.calendar || [];
      if (series) {
        calendar = calendar.filter((race) => race.series === series);
      }
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

    async getSeries() {
      const data = await this.getRaces();
      return data.series || {};
    },

    // Teams
    getTeams: () => fetchJSON("teams.json"),

    async getEntryList(series, classFilter) {
      const data = await this.getTeams();
      let teams = data.teams || [];
      if (series) teams = teams.filter((team) => team.series.includes(series));
      if (classFilter)
        teams = teams.filter((team) => team.class === classFilter);
      return teams.sort((a, b) => a.number - b.number);
    },

    async getClasses() {
      const data = await this.getTeams();
      return data.classes || {};
    },

    // BoP
    getBoP: () => fetchJSON("bop.json"),

    async getLatestBoP() {
      const data = await this.getBoP();
      const adjustments = data.adjustments || [];
      return adjustments[adjustments.length - 1];
    },

    // Predictions
    getPredictions: () => fetchJSON("predictions.json"),

    async getActivePredictions() {
      const data = await this.getPredictions();
      return (data.predictions || []).filter((p) => p.status === "active");
    },

    async getPredictionStats() {
      const data = await this.getPredictions();
      return {
        accuracy: data.overallAccuracy,
        total: data.totalPredictions,
        correct: data.correctPredictions,
      };
    },

    // Esports
    getEsports: () => fetchJSON("esports.json"),

    async getEsportsDrivers(featured) {
      const data = await this.getEsports();
      let drivers = data.drivers || [];
      if (featured) drivers = drivers.filter((d) => d.featured);
      return drivers;
    },

    async getEsportsStats() {
      const data = await this.getEsports();
      return data.stats || {};
    },

    // Community
    getCommunity: () => fetchJSON("community.json"),

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

    // Store
    getStore: () => fetchJSON("store.json"),

    async getProducts(category, featured) {
      const data = await this.getStore();
      let products = data.products || [];
      if (category) products = products.filter((p) => p.category === category);
      if (featured) products = products.filter((p) => p.featured);
      return products;
    },

    async getStoreCategories() {
      const data = await this.getStore();
      return data.categories || [];
    },

    // Utilities
    clearCache: () => dataCache.clear(),

    getFlag(countryCode) {
      if (!countryCode || countryCode.length !== 2) return "🏁";
      const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    },

    formatDate(dateString, options = {}) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        ...options,
      });
    },

    formatRelativeTime(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = date - now;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Tomorrow";
      if (diffDays < 7) return `In ${diffDays} days`;
      if (diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`;
      return `In ${Math.floor(diffDays / 30)} months`;
    },

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
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      };
    },
  };

  // Expose to window
  window.DataService = DataService;
})(window);
