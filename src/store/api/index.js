// store/api/index.js
// Export all APIs
export { authAPI } from "./authAPI";
export { businessAPI } from "./businessAPI";
export { websiteAPI } from "./websiteAPI";
export { businessAuthAPI } from "./businessAuthAPI";
export { analyticsAPI } from "./analyticsAPI";
export { templateAPI } from "./templateAPI";
export { mediaAPI } from "./mediaAPI";

// Export utilities
export { TokenManager, API_CONFIG } from "./config";
export {
  APIError,
  handleAPIError,
  RateLimiter,
  APICache,
  globalRateLimiter,
  globalAPICache,
} from "./utils";

// Export interceptor setup functions
export {
  setupRequestInterceptor,
  setupResponseInterceptor,
  setupRetryInterceptor,
} from "./interceptors";
