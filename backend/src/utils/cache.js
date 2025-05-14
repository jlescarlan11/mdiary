// cache.js
const NodeCache = require("node-cache");

// Create a new cache instance.
// stdTTL: (standard TTL) The default time to live for cached items in seconds.
// checkperiod: The interval in seconds to check for expired keys.
// Use a reasonable default TTL, e.g., 10 minutes (600 seconds)
const myCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

// Define cache keys as constants for better maintainability
const CACHE_KEYS = {
  DASHBOARD: "dashboard_movies",
  // Function to generate a key for a specific movie detail based on its ID
  MOVIE_DETAIL: (movieId) => `movie_detail:${movieId}`,
  // Function to generate a key for the paginated movies list based on all parameters
  MOVIES_LIST: (search, page, limit, sortColumn, sortDirection) =>
    `movies_list:${search || "all"}:${page}:${limit}:${sortColumn || "none"}:${
      sortDirection || "none"
    }`,
  // Add other cache keys as needed for other parts of your API
};

module.exports = {
  /**
   * Get data from the cache.
   * @param {string} key - The cache key.
   * @returns {any | undefined} The cached data, or undefined if not found.
   */
  get: (key) => {
    console.log(`Attempting to get cache key: ${key}`); // Log cache access
    const value = myCache.get(key);
    if (value !== undefined) {
      console.log(`Cache hit for key: ${key}`);
    } else {
      console.log(`Cache miss for key: ${key}`);
    }
    return value;
  },

  /**
   * Set data in the cache.
   * @param {string} key - The cache key.
   * @param {any} value - The data to cache.
   * @param {number} [ttl=null] - Optional time to live in seconds. If null, uses the default stdTTL.
   * @returns {boolean} True if the operation was successful.
   */
  set: (key, value, ttl = null) => {
    console.log(
      `Setting cache key: ${key} with TTL: ${ttl || myCache.options.stdTTL}`
    ); // Log cache set
    if (ttl) {
      return myCache.set(key, value, ttl);
    } else {
      return myCache.set(key, value);
    }
  },

  /**
   * Delete data from the cache.
   * @param {string} key - The cache key.
   * @returns {number} The number of keys deleted (0 or 1 in this case).
   */
  del: (key) => {
    console.log(`Deleting cache key: ${key}`); // Log cache deletion
    return myCache.del(key);
  },

  /**
   * Delete multiple keys from the cache.
   * @param {string[]} keys - An array of cache keys to delete.
   * @returns {number} The number of keys deleted.
   */
  delMany: (keys) => {
    console.log(`Deleting multiple cache keys: ${keys.join(", ")}`); // Log cache deletion
    return myCache.del(keys);
  },

  // Export the CACHE_KEYS constants/functions
  CACHE_KEYS,
};
