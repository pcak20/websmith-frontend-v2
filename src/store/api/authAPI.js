// ================================
// store/api/authAPI.js - UPDATED FOR DJANGO BACKEND
// ================================
import { API_CONFIG, createApiClient } from "./config";
import { setupInterceptors } from "./interceptors";

const authClient = createApiClient(`${API_CONFIG.BASE_URL}/auth`);

// Setup response interceptor only (no auth needed for auth endpoints)
setupInterceptors(authClient, { includeAuth: false });

export const authAPI = {
  // Authentication - matches Django auth_urls.py
  login: (credentials) => authClient.post("/login/", credentials),
  register: (userData) => authClient.post("/register/", userData),
  logout: (data) => authClient.post("/logout/", data),
  refreshToken: (data) => authClient.post("/token/refresh/", data),

  // Password management - matches Django auth_urls.py
  forgotPassword: (data) => authClient.post("/forgot-password/", data),
  resetPassword: (data) => authClient.post("/reset-password/", data),
  changePassword: (data) => authClient.post("/change-password/", data),

  // Email verification - matches Django auth_urls.py
  verifyEmail: (data) => authClient.post("/verify-email/", data),
  resendVerification: (data) => authClient.post("/resend-verification/", data),

  // Two-factor authentication - matches Django auth_urls.py
  enableTwoFactor: () => authClient.post("/2fa/setup/"),
  verifyTwoFactor: (data) => authClient.post("/2fa/verify/", data),
  disableTwoFactor: (data) => authClient.post("/2fa/disable/", data),

  // Profile management - matches Django auth_urls.py
  getProfile: () => authClient.get("/profile/"),
  updateProfile: (data) => authClient.put("/profile/", data),
  uploadProfileImage: (formData, config = {}) =>
    authClient.post("/profile/image/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),
  deleteProfileImage: () => authClient.delete("/profile/image/"),

  // User utilities - matches Django auth_urls.py
  getUserStats: () => authClient.get("/stats/"),
  exportUserData: () => authClient.post("/export/"),
  deleteAccount: (data) => authClient.delete("/delete-account/", { data }),
};
