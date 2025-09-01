// ================================
// store/api/userAPI.js - UPDATED FOR DJANGO BACKEND
// ================================
import { createApiClient, API_CONFIG } from "./config";
import { setupInterceptors } from "./interceptors";

const userClient = createApiClient(`${API_CONFIG.BASE_URL}/users`);
const authClient = createApiClient(`${API_CONFIG.BASE_URL}/auth`);

// Setup all interceptors for authenticated endpoints
setupInterceptors(userClient, { includeAuth: true, includeRetry: true });
setupInterceptors(authClient, { includeAuth: true, includeRetry: true });

export const userAPI = {
  // Profile management - using auth endpoints per Django backend
  getProfile: () => authClient.get("/profile/"),
  updateProfile: (profileData) => {
    // Map frontend form fields to Django backend fields
    const backendData = {
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      phone_number: profileData.phone, // Map phone to phone_number
    };

    // Only include timezone if location is provided and not empty
    if (profileData.location && profileData.location.trim() !== "") {
      backendData.timezone = profileData.location;
    }

    // Note: bio, website, birth_date don't exist in Django User model
    return authClient.put("/profile/", backendData);
  },
  uploadProfileImage: (formData, config = {}) => {
    // Receive FormData directly from userSlice, don't create new FormData
    return authClient.post("/profile/image/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    });
  },
  deleteProfileImage: () => authClient.delete("/profile/image/"),

  // Password management - using auth endpoints
  changePassword: (passwordData) =>
    authClient.post("/change-password/", passwordData),

  // User stats and data export - using auth endpoints
  getUserStats: () => authClient.get("/stats/"),
  exportUserData: () => authClient.post("/export/"),
  deleteAccount: (data) => authClient.delete("/delete-account/", { data }),

  // Session management - using users endpoints
  getActiveSessions: () => userClient.get("/sessions/"),
  terminateSession: (sessionId) =>
    userClient.delete(`/sessions/${sessionId}/terminate/`),
  terminateAllSessions: () => userClient.delete("/sessions/all/"),

  // Address management - using users endpoints
  getAddresses: () => userClient.get("/addresses/"),
  addAddress: (addressData) => userClient.post("/addresses/", addressData),
  updateAddress: (addressId, addressData) =>
    userClient.put(`/addresses/${addressId}/`, addressData),
  deleteAddress: (addressId) => userClient.delete(`/addresses/${addressId}/`),
  setDefaultAddress: (addressId) =>
    userClient.post(`/addresses/${addressId}/set-default/`),

  // Two-factor authentication - using auth endpoints
  enable2FA: () => authClient.post("/2fa/setup/"),
  verify2FA: (data) => authClient.post("/2fa/verify/", data),
  disable2FA: (data) => authClient.post("/2fa/disable/", data),

  // Notification settings (mock until backend endpoints added)
  getNotificationSettings: () => {
    return Promise.resolve({
      data: {
        email_notifications: true,
        sms_notifications: false,
        marketing_emails: true,
        security_alerts: true,
        business_updates: true,
        website_analytics: true,
      },
    });
  },
  updateNotificationSettings: (settings) => {
    return Promise.resolve({ data: settings });
  },

  // Security settings (mock until backend endpoints added)
  getSecuritySettings: () => {
    return Promise.resolve({
      data: {
        twoFactorEnabled: false,
        loginNotifications: true,
        sessionTimeout: 30,
        passwordLastChanged: new Date().toISOString(),
      },
    });
  },

  // Login history (mock until backend endpoints added)
  getLoginHistory: (params = {}) => {
    return Promise.resolve({
      data: {
        sessions: [],
        total_count: 0,
        page: 1,
        has_more: false,
      },
    });
  },

  // Usage statistics - use existing Django stats endpoint
  getUsageStatistics: () => authClient.get("/stats/"),

  // Preferences (mock until backend endpoints added)
  getPreferences: () => {
    return Promise.resolve({
      data: {
        timezone: "UTC",
        language: "en",
        dateFormat: "MM/dd/yyyy",
        timeFormat: "12h",
        theme: "light",
        emailDigest: "weekly",
      },
    });
  },
  updatePreferences: (preferences) => {
    return Promise.resolve({ data: preferences });
  },
};
