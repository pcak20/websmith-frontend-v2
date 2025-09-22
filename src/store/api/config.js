// ================================
// store/api/config.js
// ================================
import axios from "axios";

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// In your store/api/config.js or similar
export const createApiClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add auth interceptor
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken"); // or however you store it
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return client;
};

// Token management utilities
export const TokenManager = {
  getToken: () => localStorage.getItem("accessToken"),
  setToken: (token) => localStorage.setItem("accessToken", token),
  removeToken: () => localStorage.removeItem("accessToken"),

  getRefreshToken: () => localStorage.getItem("refreshToken"),
  setRefreshToken: (token) => localStorage.setItem("refreshToken", token),
  removeRefreshToken: () => localStorage.removeItem("refreshToken"),

  isTokenExpired: (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * API_CONFIG.TIMEOUT < Date.now();
    } catch {
      return true;
    }
  },

  clearAll: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
