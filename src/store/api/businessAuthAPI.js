// store/api/businessAuthAPI.js
import { createApiClient, API_CONFIG, TokenManager } from "./config";
import { setupInterceptors } from "./interceptors";

const businessAuthClient = createApiClient(
  `${API_CONFIG.BASE_URL}/business-auth`
);

// Setup interceptors with custom token management for multi-tenant
const setupBusinessAuthInterceptors = (client) => {
  client.interceptors.request.use(
    (config) => {
      // Extract websiteId from URL for multi-tenant token management
      const urlParts = config.url?.split("/");
      const websiteId = urlParts?.[1];

      if (websiteId && websiteId !== "oauth") {
        const businessToken = localStorage.getItem(
          `business_token_${websiteId}`
        );
        if (businessToken && !TokenManager.isTokenExpired(businessToken)) {
          config.headers.Authorization = `Bearer ${businessToken}`;
        }
      }

      config.metadata = { startTime: Date.now() };
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => {
      if (response.config.metadata && import.meta.env.DEV) {
        const responseTime = Date.now() - response.config.metadata.startTime;
        // console.log(
        //   `Business Auth API ${response.config.method?.toUpperCase()} ${
        //     response.config.url
        //   }: ${responseTime}ms`
        // );
      }
      return response;
    },
    (error) => {
      if (!error.response) {
        error.message = "Network error. Please check your connection.";
      }
      return Promise.reject(error);
    }
  );
};

// Setup custom interceptors
setupBusinessAuthInterceptors(businessAuthClient);

// Token management utilities for business websites
export const BusinessTokenManager = {
  getToken: (websiteId) => localStorage.getItem(`business_token_${websiteId}`),
  setToken: (websiteId, token) =>
    localStorage.setItem(`business_token_${websiteId}`, token),
  removeToken: (websiteId) =>
    localStorage.removeItem(`business_token_${websiteId}`),

  getRefreshToken: (websiteId) =>
    localStorage.getItem(`business_refresh_token_${websiteId}`),
  setRefreshToken: (websiteId, token) =>
    localStorage.setItem(`business_refresh_token_${websiteId}`, token),
  removeRefreshToken: (websiteId) =>
    localStorage.removeItem(`business_refresh_token_${websiteId}`),

  clearAll: (websiteId) => {
    localStorage.removeItem(`business_token_${websiteId}`);
    localStorage.removeItem(`business_refresh_token_${websiteId}`);
    localStorage.removeItem(`business_user_${websiteId}`);
    localStorage.removeItem(`business_consent_${websiteId}`);
  },

  getAllBusinessTokens: () => {
    const tokens = {};
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("business_token_")) {
        const websiteId = key.replace("business_token_", "");
        tokens[websiteId] = localStorage.getItem(key);
      }
    });
    return tokens;
  },

  clearAllBusinessTokens: () => {
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith("business_token_") ||
        key.startsWith("business_refresh_token_") ||
        key.startsWith("business_user_") ||
        key.startsWith("business_consent_")
      ) {
        localStorage.removeItem(key);
      }
    });
  },
};

export const businessAuthAPI = {
  // Business website authentication
  login: (websiteId, credentials) =>
    businessAuthClient.post(`/${websiteId}/login/`, credentials),

  register: (websiteId, userData) =>
    businessAuthClient.post(`/${websiteId}/register/`, userData),

  logout: (websiteId) => businessAuthClient.post(`/${websiteId}/logout/`),

  refreshToken: (websiteId) => {
    const refreshToken = BusinessTokenManager.getRefreshToken(websiteId);
    return businessAuthClient.post(`/${websiteId}/refresh/`, {
      refresh: refreshToken,
    });
  },

  // Password management
  forgotPassword: (websiteId, email) =>
    businessAuthClient.post(`/${websiteId}/forgot-password/`, { email }),

  resetPassword: (websiteId, token, password) =>
    businessAuthClient.post(`/${websiteId}/reset-password/`, {
      token,
      password,
    }),

  changePassword: (websiteId, currentPassword, newPassword) =>
    businessAuthClient.post(`/${websiteId}/change-password/`, {
      current_password: currentPassword,
      new_password: newPassword,
    }),

  // Email verification
  verifyEmail: (websiteId, token) =>
    businessAuthClient.post(`/${websiteId}/verify-email/`, { token }),

  resendVerification: (websiteId) =>
    businessAuthClient.post(`/${websiteId}/resend-verification/`),

  // OAuth flows - WebCraft Account Connection
  initiateWebCraftOAuth: (
    websiteId,
    scope = ["profile", "addresses", "payments"]
  ) =>
    businessAuthClient.post(`/${websiteId}/oauth/webcraft/initiate/`, {
      scope,
    }),

  handleWebCraftCallback: (websiteId, code, state) =>
    businessAuthClient.post(`/${websiteId}/oauth/webcraft/callback/`, {
      code,
      state,
    }),

  disconnectWebCraftAccount: (websiteId) =>
    businessAuthClient.delete(`/${websiteId}/oauth/webcraft/disconnect/`),

  // Google OAuth
  initiateGoogleOAuth: (websiteId, redirectUri) =>
    businessAuthClient.post(`/${websiteId}/oauth/google/initiate/`, {
      redirect_uri: redirectUri,
    }),

  handleGoogleCallback: (websiteId, code, state) =>
    businessAuthClient.post(`/${websiteId}/oauth/google/callback/`, {
      code,
      state,
    }),

  disconnectGoogleAccount: (websiteId) =>
    businessAuthClient.delete(`/${websiteId}/oauth/google/disconnect/`),

  // Data sharing and consent management
  getConsentSettings: (websiteId) =>
    businessAuthClient.get(`/${websiteId}/consent/`),

  updateConsent: (websiteId, consentData) =>
    businessAuthClient.put(`/${websiteId}/consent/`, consentData),

  revokeConsent: (websiteId, consentType) =>
    businessAuthClient.delete(`/${websiteId}/consent/${consentType}/`),

  getSharedData: (websiteId) =>
    businessAuthClient.get(`/${websiteId}/shared-data/`),

  updateSharedDataPreferences: (websiteId, preferences) =>
    businessAuthClient.put(
      `/${websiteId}/shared-data/preferences/`,
      preferences
    ),

  // User profile management for business websites
  getProfile: (websiteId) => businessAuthClient.get(`/${websiteId}/profile/`),

  updateProfile: (websiteId, profileData) =>
    businessAuthClient.put(`/${websiteId}/profile/`, profileData),

  uploadProfileImage: (websiteId, formData, config = {}) =>
    businessAuthClient.post(`/${websiteId}/profile/image/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),

  deleteProfileImage: (websiteId) =>
    businessAuthClient.delete(`/${websiteId}/profile/image/`),

  // Address management
  getAddresses: (websiteId) =>
    businessAuthClient.get(`/${websiteId}/addresses/`),

  addAddress: (websiteId, addressData) =>
    businessAuthClient.post(`/${websiteId}/addresses/`, addressData),

  updateAddress: (websiteId, addressId, addressData) =>
    businessAuthClient.put(
      `/${websiteId}/addresses/${addressId}/`,
      addressData
    ),

  deleteAddress: (websiteId, addressId) =>
    businessAuthClient.delete(`/${websiteId}/addresses/${addressId}/`),

  setDefaultAddress: (websiteId, addressId) =>
    businessAuthClient.post(
      `/${websiteId}/addresses/${addressId}/set-default/`
    ),

  // Payment methods management
  getPaymentMethods: (websiteId) =>
    businessAuthClient.get(`/${websiteId}/payment-methods/`),

  addPaymentMethod: (websiteId, paymentData) =>
    businessAuthClient.post(`/${websiteId}/payment-methods/`, paymentData),

  updatePaymentMethod: (websiteId, paymentMethodId, paymentData) =>
    businessAuthClient.put(
      `/${websiteId}/payment-methods/${paymentMethodId}/`,
      paymentData
    ),

  deletePaymentMethod: (websiteId, paymentMethodId) =>
    businessAuthClient.delete(
      `/${websiteId}/payment-methods/${paymentMethodId}/`
    ),

  setDefaultPaymentMethod: (websiteId, paymentMethodId) =>
    businessAuthClient.post(
      `/${websiteId}/payment-methods/${paymentMethodId}/set-default/`
    ),

  // Order history and management
  getOrders: (websiteId, params = {}) =>
    businessAuthClient.get(`/${websiteId}/orders/`, { params }),

  getOrder: (websiteId, orderId) =>
    businessAuthClient.get(`/${websiteId}/orders/${orderId}/`),

  createOrder: (websiteId, orderData) =>
    businessAuthClient.post(`/${websiteId}/orders/`, orderData),

  cancelOrder: (websiteId, orderId, reason) =>
    businessAuthClient.post(`/${websiteId}/orders/${orderId}/cancel/`, {
      reason,
    }),

  // Wishlist/favorites
  getWishlist: (websiteId) => businessAuthClient.get(`/${websiteId}/wishlist/`),

  addToWishlist: (websiteId, itemData) =>
    businessAuthClient.post(`/${websiteId}/wishlist/`, itemData),

  removeFromWishlist: (websiteId, itemId) =>
    businessAuthClient.delete(`/${websiteId}/wishlist/${itemId}/`),

  // Preferences for business website
  getPreferences: (websiteId) =>
    businessAuthClient.get(`/${websiteId}/preferences/`),

  updatePreferences: (websiteId, preferences) =>
    businessAuthClient.put(`/${websiteId}/preferences/`, preferences),

  // Notification settings per website
  getNotificationSettings: (websiteId) =>
    businessAuthClient.get(`/${websiteId}/notifications/`),

  updateNotificationSettings: (websiteId, settings) =>
    businessAuthClient.put(`/${websiteId}/notifications/`, settings),

  // Session management
  getActiveSessions: (websiteId) =>
    businessAuthClient.get(`/${websiteId}/sessions/`),

  terminateSession: (websiteId, sessionId) =>
    businessAuthClient.delete(`/${websiteId}/sessions/${sessionId}/`),

  terminateAllSessions: (websiteId) =>
    businessAuthClient.delete(`/${websiteId}/sessions/all/`),

  // Account connection status
  getConnectionStatus: (websiteId) =>
    businessAuthClient.get(`/${websiteId}/connection-status/`),

  // Privacy and data management
  getPrivacySettings: (websiteId) =>
    businessAuthClient.get(`/${websiteId}/privacy/`),

  updatePrivacySettings: (websiteId, settings) =>
    businessAuthClient.put(`/${websiteId}/privacy/`, settings),

  requestDataExport: (websiteId) =>
    businessAuthClient.post(`/${websiteId}/data-export/`),

  deleteAccount: (websiteId, password, reason) =>
    businessAuthClient.delete(`/${websiteId}/account/`, {
      data: { password, reason },
    }),

  // Cross-site data synchronization
  syncDataFromWebCraft: (websiteId, dataTypes = []) =>
    businessAuthClient.post(`/${websiteId}/sync/from-webcraft/`, {
      data_types: dataTypes,
    }),

  syncDataToWebCraft: (websiteId, dataTypes = []) =>
    businessAuthClient.post(`/${websiteId}/sync/to-webcraft/`, {
      data_types: dataTypes,
    }),

  getSyncHistory: (websiteId) =>
    businessAuthClient.get(`/${websiteId}/sync/history/`),
};

// Export individual functions for tree-shaking
export const {
  login,
  register,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  resendVerification,
  initiateWebCraftOAuth,
  handleWebCraftCallback,
  disconnectWebCraftAccount,
  initiateGoogleOAuth,
  handleGoogleCallback,
  disconnectGoogleAccount,
  getConsentSettings,
  updateConsent,
  revokeConsent,
  getSharedData,
  updateSharedDataPreferences,
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteProfileImage,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  getOrders,
  getOrder,
  createOrder,
  cancelOrder,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getPreferences,
  updatePreferences,
  getNotificationSettings,
  updateNotificationSettings,
  getActiveSessions,
  terminateSession,
  terminateAllSessions,
  getConnectionStatus,
  getPrivacySettings,
  updatePrivacySettings,
  requestDataExport,
  deleteAccount,
  syncDataFromWebCraft,
  syncDataToWebCraft,
  getSyncHistory,
} = businessAuthAPI;

export default businessAuthAPI;
