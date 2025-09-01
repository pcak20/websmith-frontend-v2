// store/api/utils.js
export class APIError extends Error {
  constructor(message, status, data = null, originalError = null) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
    this.originalError = originalError;
    this.timestamp = Date.now();
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      data: this.data,
      timestamp: this.timestamp,
    };
  }
}

export const handleAPIError = (error, context = null) => {
  // Log error for debugging in development
  if (import.meta.env.DEV) {
    console.error("API Error:", error, "Context:", context);
  }

  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    let message = data?.message || data?.detail || data?.error;

    // Handle common HTTP status codes
    if (!message) {
      switch (status) {
        case 400:
          message = "Bad request. Please check your input.";
          break;
        case 401:
          message = "Authentication required. Please log in.";
          break;
        case 403:
          message = "Access denied. You don't have permission.";
          break;
        case 404:
          message = "Resource not found.";
          break;
        case 409:
          message = "Conflict. The resource already exists or is in use.";
          break;
        case 422:
          message = "Validation error. Please check your input.";
          break;
        case 429:
          message = "Too many requests. Please try again later.";
          break;
        case 500:
          message = "Internal server error. Please try again later.";
          break;
        case 502:
          message = "Bad gateway. The server is temporarily unavailable.";
          break;
        case 503:
          message = "Service unavailable. Please try again later.";
          break;
        default:
          message = `HTTP ${status} Error`;
      }
    }

    throw new APIError(message, status, data, error);
  } else if (error.request) {
    // Network error
    throw new APIError(
      "Network error. Please check your connection.",
      0,
      null,
      error
    );
  } else {
    // Other error
    throw new APIError(
      error.message || "An unexpected error occurred",
      0,
      null,
      error
    );
  }
};

// Enhanced Rate limiting utility
export class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000, identifier = "default") {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.identifier = identifier;
    this.requests = [];
    this.blocked = false;
    this.blockUntil = 0;
  }

  canMakeRequest() {
    const now = Date.now();

    // Check if still blocked
    if (this.blocked && now < this.blockUntil) {
      return false;
    } else if (this.blocked && now >= this.blockUntil) {
      this.blocked = false;
      this.blockUntil = 0;
    }

    // Clean old requests
    this.requests = this.requests.filter((time) => now - time < this.windowMs);

    return this.requests.length < this.maxRequests;
  }

  recordRequest() {
    const now = Date.now();
    this.requests.push(now);

    // If we've hit the limit, block for the window duration
    if (this.requests.length >= this.maxRequests) {
      this.blocked = true;
      this.blockUntil = now + this.windowMs;
    }
  }

  getResetTime() {
    if (this.blocked) {
      return this.blockUntil;
    }
    if (this.requests.length === 0) return 0;
    return this.requests[0] + this.windowMs;
  }

  getRemainingRequests() {
    if (this.blocked) return 0;
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.windowMs);
    return Math.max(0, this.maxRequests - this.requests.length);
  }

  reset() {
    this.requests = [];
    this.blocked = false;
    this.blockUntil = 0;
  }
}

// Enhanced API response cache
export class APICache {
  constructor(maxSize = 100, ttl = 300000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
    this.hits = 0;
    this.misses = 0;
  }

  generateKey(url, params = {}, method = "GET") {
    const paramString = Object.keys(params)
      .sort()
      .map((key) => `${key}=${JSON.stringify(params[key])}`)
      .join("&");
    return `${method}:${url}${paramString ? "?" + paramString : ""}`;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) {
      this.misses++;
      return null;
    }

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    this.hits++;
    // Update access time for LRU
    item.lastAccessed = Date.now();
    return item.data;
  }

  set(key, data) {
    // If at max size, remove least recently used item
    if (this.cache.size >= this.maxSize) {
      let lruKey = null;
      let lruTime = Infinity;

      for (const [k, v] of this.cache.entries()) {
        if (v.lastAccessed < lruTime) {
          lruTime = v.lastAccessed;
          lruKey = k;
        }
      }

      if (lruKey) {
        this.cache.delete(lruKey);
      }
    }

    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      lastAccessed: now,
    });
  }

  clear() {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  delete(key) {
    this.cache.delete(key);
  }

  getStats() {
    const total = this.hits + this.misses;
    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? ((this.hits / total) * 100).toFixed(2) + "%" : "0%",
    };
  }

  // Clear expired entries
  cleanup() {
    const now = Date.now();
    const keysToDelete = [];

    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.ttl) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => this.cache.delete(key));
    return keysToDelete.length;
  }
}

// Request deduplication utility
export class RequestDeduplicator {
  constructor(ttl = 5000) {
    this.pendingRequests = new Map();
    this.ttl = ttl;
  }

  async dedupe(key, requestFn) {
    // If request is already pending, return the same promise
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key).promise;
    }

    // Create new request
    const promise = requestFn().finally(() => {
      // Clean up after request completes
      setTimeout(() => {
        this.pendingRequests.delete(key);
      }, this.ttl);
    });

    this.pendingRequests.set(key, { promise, timestamp: Date.now() });
    return promise;
  }

  clear() {
    this.pendingRequests.clear();
  }

  cleanup() {
    const now = Date.now();
    const keysToDelete = [];

    for (const [key, value] of this.pendingRequests.entries()) {
      if (now - value.timestamp > this.ttl) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => this.pendingRequests.delete(key));
    return keysToDelete.length;
  }
}

// Retry utility with exponential backoff
export class RetryManager {
  constructor(maxRetries = 3, baseDelay = 1000, maxDelay = 10000) {
    this.maxRetries = maxRetries;
    this.baseDelay = baseDelay;
    this.maxDelay = maxDelay;
  }

  async retry(fn, retryCondition = (error) => error.status >= 500) {
    let lastError;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;

        if (attempt === this.maxRetries || !retryCondition(error)) {
          throw error;
        }

        const delay = Math.min(
          this.baseDelay * Math.pow(2, attempt),
          this.maxDelay
        );

        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Batch request utility
export class BatchRequestManager {
  constructor(batchSize = 10, delayBetweenBatches = 100) {
    this.batchSize = batchSize;
    this.delayBetweenBatches = delayBetweenBatches;
  }

  async processBatch(items, processor, onProgress = null) {
    const results = [];
    const errors = [];

    for (let i = 0; i < items.length; i += this.batchSize) {
      const batch = items.slice(i, i + this.batchSize);
      const batchPromises = batch.map(async (item, index) => {
        try {
          const result = await processor(item, i + index);
          return { success: true, result, item, index: i + index };
        } catch (error) {
          return { success: false, error, item, index: i + index };
        }
      });

      const batchResults = await Promise.all(batchPromises);

      batchResults.forEach((result) => {
        if (result.success) {
          results.push(result);
        } else {
          errors.push(result);
        }
      });

      if (onProgress) {
        onProgress({
          completed: Math.min(i + this.batchSize, items.length),
          total: items.length,
          progress: Math.min(i + this.batchSize, items.length) / items.length,
          results: results.length,
          errors: errors.length,
        });
      }

      // Delay between batches to avoid overwhelming the server
      if (i + this.batchSize < items.length && this.delayBetweenBatches > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.delayBetweenBatches)
        );
      }
    }

    return { results, errors };
  }
}

// Performance monitoring utility
export class APIPerformanceMonitor {
  constructor(maxEntries = 1000) {
    this.requests = [];
    this.maxEntries = maxEntries;
  }

  recordRequest(method, url, duration, success, error = null) {
    const entry = {
      timestamp: Date.now(),
      method,
      url,
      duration,
      success,
      error: error ? error.message : null,
      status: error ? error.status : 200,
    };

    this.requests.unshift(entry);

    if (this.requests.length > this.maxEntries) {
      this.requests = this.requests.slice(0, this.maxEntries);
    }
  }

  getStats(timeframe = 3600000) {
    // 1 hour default
    const now = Date.now();
    const recentRequests = this.requests.filter(
      (req) => now - req.timestamp < timeframe
    );

    if (recentRequests.length === 0) {
      return {
        totalRequests: 0,
        successRate: 0,
        averageResponseTime: 0,
        errorRate: 0,
      };
    }

    const successful = recentRequests.filter((req) => req.success);
    const durations = recentRequests.map((req) => req.duration);
    const averageResponseTime =
      durations.reduce((a, b) => a + b, 0) / durations.length;

    return {
      totalRequests: recentRequests.length,
      successfulRequests: successful.length,
      successRate:
        ((successful.length / recentRequests.length) * 100).toFixed(2) + "%",
      errorRate:
        (
          ((recentRequests.length - successful.length) /
            recentRequests.length) *
          100
        ).toFixed(2) + "%",
      averageResponseTime: Math.round(averageResponseTime),
      minResponseTime: Math.min(...durations),
      maxResponseTime: Math.max(...durations),
    };
  }

  clear() {
    this.requests = [];
  }
}

// Global instances
export const globalRateLimiter = new RateLimiter();
export const globalAPICache = new APICache();
export const globalRequestDeduplicator = new RequestDeduplicator();
export const globalRetryManager = new RetryManager();
export const globalBatchRequestManager = new BatchRequestManager();
export const globalPerformanceMonitor = new APIPerformanceMonitor();

// Utility functions
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatDuration = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
  return `${(ms / 3600000).toFixed(1)}h`;
};

export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Cleanup function to run periodically
export const runCleanup = () => {
  globalAPICache.cleanup();
  globalRequestDeduplicator.cleanup();
};

// Set up automatic cleanup every 5 minutes
if (typeof window !== "undefined") {
  setInterval(runCleanup, 300000);
}
