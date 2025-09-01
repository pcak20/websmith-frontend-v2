// ================================
// store/api/interceptors.js
// ================================
import { TokenManager, API_CONFIG } from "./config";
import { getStore } from "../storeInstance";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
export const setupRequestInterceptor = (client) => {
  client.interceptors.request.use(
    (config) => {
      const token = TokenManager.getToken();
      if (token && !TokenManager.isTokenExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add request timestamp for debugging
      config.metadata = { startTime: Date.now() };

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Response interceptor with token refresh
export const setupResponseInterceptor = (client) => {
  client.interceptors.response.use(
    (response) => {
      // Log response time for debugging
      if (response.config.metadata && import.meta.env.DEV) {
        const responseTime = Date.now() - response.config.metadata.startTime;
        console.log(
          `API ${response.config.method?.toUpperCase()} ${
            response.config.url
          }: ${responseTime}ms`
        );
      }
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 errors with token refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return client(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const store = getStore();
          const { refreshToken, logoutLocal } = await import(
            "../slices/authSlice"
          );

          const resultAction = await store.dispatch(refreshToken());

          if (refreshToken.fulfilled.match(resultAction)) {
            const newToken = resultAction.payload.access_token;
            processQueue(null, newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return client(originalRequest);
          } else {
            processQueue(resultAction.payload, null);
            store.dispatch(logoutLocal());
            return Promise.reject(error);
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          try {
            const store = getStore();
            const { logoutLocal } = await import("../slices/authSlice");
            store.dispatch(logoutLocal());
          } catch (storeError) {
            console.error("Store not available:", storeError);
          }
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      // Handle network errors
      if (!error.response) {
        error.message = "Network error. Please check your connection.";
      }

      return Promise.reject(error);
    }
  );
};

// Retry interceptor
export const setupRetryInterceptor = (client) => {
  client.interceptors.response.use(undefined, async (error) => {
    const { config } = error;

    if (!config || !config.retry) return Promise.reject(error);

    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= API_CONFIG.RETRY_ATTEMPTS) {
      return Promise.reject(error);
    }

    config.__retryCount += 1;
    // Exponential backoff
    const delay = API_CONFIG.RETRY_DELAY * Math.pow(2, config.__retryCount - 1);
    await new Promise((resolve) => setTimeout(resolve, delay));

    return client(config);
  });
};

// Helper function to setup all interceptors
export const setupInterceptors = (
  client,
  { includeAuth = true, includeRetry = false } = {}
) => {
  if (includeAuth) {
    setupRequestInterceptor(client);
    setupResponseInterceptor(client);
  }
  if (includeRetry) {
    setupRetryInterceptor(client);
  }
};
