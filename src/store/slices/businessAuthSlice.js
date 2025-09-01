// store/slices/businessAuthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { businessAuthAPI, BusinessTokenManager } from "../api/businessAuthAPI";

// Authentication Actions
export const loginToBusiness = createAsyncThunk(
  "businessAuth/login",
  async ({ websiteId, authMethod, credentials }, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.login(websiteId, {
        auth_method: authMethod,
        ...credentials,
      });

      const { access_token, refresh_token, user, shared_data, consent } =
        response.data;

      BusinessTokenManager.setToken(websiteId, access_token);
      if (refresh_token) {
        BusinessTokenManager.setRefreshToken(websiteId, refresh_token);
      }

      return { websiteId, user, shared_data, consent, access_token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerToBusiness = createAsyncThunk(
  "businessAuth/register",
  async ({ websiteId, userData }, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.register(websiteId, userData);
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const logoutFromBusiness = createAsyncThunk(
  "businessAuth/logout",
  async (websiteId, { rejectWithValue }) => {
    try {
      await businessAuthAPI.logout(websiteId);
      BusinessTokenManager.clearAll(websiteId);
      return websiteId;
    } catch (error) {
      BusinessTokenManager.clearAll(websiteId);
      return websiteId;
    }
  }
);

export const refreshBusinessToken = createAsyncThunk(
  "businessAuth/refreshToken",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.refreshToken(websiteId);
      const { access_token } = response.data;
      BusinessTokenManager.setToken(websiteId, access_token);
      return { websiteId, access_token };
    } catch (error) {
      BusinessTokenManager.clearAll(websiteId);
      return rejectWithValue("Token refresh failed");
    }
  }
);

// Password Management
export const forgotBusinessPassword = createAsyncThunk(
  "businessAuth/forgotPassword",
  async ({ websiteId, email }, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.forgotPassword(websiteId, email);
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset email"
      );
    }
  }
);

export const resetBusinessPassword = createAsyncThunk(
  "businessAuth/resetPassword",
  async ({ websiteId, token, password }, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.resetPassword(
        websiteId,
        token,
        password
      );
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);

export const changeBusinessPassword = createAsyncThunk(
  "businessAuth/changePassword",
  async ({ websiteId, currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.changePassword(
        websiteId,
        currentPassword,
        newPassword
      );
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password change failed"
      );
    }
  }
);

// OAuth Integration
export const initiateWebCraftOAuth = createAsyncThunk(
  "businessAuth/initiateWebCraftOAuth",
  async ({ websiteId, scope }, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.initiateWebCraftOAuth(
        websiteId,
        scope
      );
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue("Failed to initiate WebCraft OAuth");
    }
  }
);

export const handleWebCraftCallback = createAsyncThunk(
  "businessAuth/handleWebCraftCallback",
  async ({ websiteId, code, state }, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.handleWebCraftCallback(
        websiteId,
        code,
        state
      );
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue("WebCraft OAuth callback failed");
    }
  }
);

export const initiateGoogleOAuth = createAsyncThunk(
  "businessAuth/initiateGoogleOAuth",
  async ({ websiteId, redirectUri }, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.initiateGoogleOAuth(
        websiteId,
        redirectUri
      );
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue("Failed to initiate Google OAuth");
    }
  }
);

// Data Sharing and Consent
export const fetchConsentSettings = createAsyncThunk(
  "businessAuth/fetchConsentSettings",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.getConsentSettings(websiteId);
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch consent settings");
    }
  }
);

export const updateDataConsent = createAsyncThunk(
  "businessAuth/updateDataConsent",
  async ({ websiteId, consentData }, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.updateConsent(
        websiteId,
        consentData
      );
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue("Failed to update consent");
    }
  }
);

export const fetchSharedData = createAsyncThunk(
  "businessAuth/fetchSharedData",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.getSharedData(websiteId);
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch shared data");
    }
  }
);

// Profile Management
export const fetchBusinessProfile = createAsyncThunk(
  "businessAuth/fetchProfile",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.getProfile(websiteId);
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

export const updateBusinessProfile = createAsyncThunk(
  "businessAuth/updateProfile",
  async ({ websiteId, profileData }, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.updateProfile(
        websiteId,
        profileData
      );
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue("Failed to update profile");
    }
  }
);

// Address Management
export const fetchBusinessAddresses = createAsyncThunk(
  "businessAuth/fetchAddresses",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.getAddresses(websiteId);
      return { websiteId, addresses: response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch addresses");
    }
  }
);

export const addBusinessAddress = createAsyncThunk(
  "businessAuth/addAddress",
  async ({ websiteId, addressData }, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.addAddress(websiteId, addressData);
      return { websiteId, address: response.data };
    } catch (error) {
      return rejectWithValue("Failed to add address");
    }
  }
);

// Session Management
export const fetchActiveSessions = createAsyncThunk(
  "businessAuth/fetchActiveSessions",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await businessAuthAPI.getActiveSessions(websiteId);
      return { websiteId, sessions: response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch sessions");
    }
  }
);

export const terminateBusinessSession = createAsyncThunk(
  "businessAuth/terminateSession",
  async ({ websiteId, sessionId }, { rejectWithValue }) => {
    try {
      await businessAuthAPI.terminateSession(websiteId, sessionId);
      return { websiteId, sessionId };
    } catch (error) {
      return rejectWithValue("Failed to terminate session");
    }
  }
);

const initialState = {
  // Active sessions per website
  activeSessions: {}, // websiteId -> session data

  // Data sharing and consent
  sharedDataConsent: {}, // websiteId -> consent settings
  availableSharedData: {}, // websiteId -> available shared data
  consentSettings: {}, // websiteId -> full consent configuration

  // OAuth states
  oauthStates: {}, // websiteId -> oauth flow state
  connectedAccounts: {}, // websiteId -> connected external accounts

  // Profile data per website
  profiles: {}, // websiteId -> user profile
  addresses: {}, // websiteId -> user addresses
  paymentMethods: {}, // websiteId -> user payment methods

  // Session management
  sessionHistory: {}, // websiteId -> session history
  activeSessions: {}, // websiteId -> active sessions list

  // Loading states
  loading: {
    login: false,
    register: false,
    logout: false,
    profile: false,
    consent: false,
    oauth: false,
    addresses: false,
    sessions: false,
    passwordReset: false,
    passwordChange: false,
  },

  // Error states
  error: {
    login: null,
    register: null,
    logout: null,
    profile: null,
    consent: null,
    oauth: null,
    addresses: null,
    sessions: null,
    passwordReset: null,
    passwordChange: null,
  },

  // Success states
  success: {
    login: false,
    register: false,
    profileUpdate: false,
    consentUpdate: false,
    oauthConnection: false,
    addressUpdate: false,
    passwordReset: false,
    passwordChange: false,
  },

  // UI states
  loginSuccess: false,
  registerSuccess: false,
  passwordResetSent: false,
  emailVerificationSent: false,
};

const businessAuthSlice = createSlice({
  name: "businessAuth",
  initialState,
  reducers: {
    // Error management
    clearError: (state, action) => {
      const errorType = action.payload;
      if (errorType && state.error[errorType] !== undefined) {
        state.error[errorType] = null;
      } else {
        Object.keys(state.error).forEach((key) => {
          state.error[key] = null;
        });
      }
    },

    clearAllErrors: (state) => {
      Object.keys(state.error).forEach((key) => {
        state.error[key] = null;
      });
    },

    // Success flags management
    clearSuccessFlags: (state, action) => {
      const successType = action.payload;
      if (successType && state.success[successType] !== undefined) {
        state.success[successType] = false;
      } else {
        Object.keys(state.success).forEach((key) => {
          state.success[key] = false;
        });
        state.loginSuccess = false;
        state.registerSuccess = false;
        state.passwordResetSent = false;
        state.emailVerificationSent = false;
      }
    },

    // Session management
    setBusinessSession: (state, action) => {
      const { websiteId, user, sharedData, metadata = {} } = action.payload;
      state.activeSessions[websiteId] = {
        user,
        sharedData: sharedData || {},
        isAuthenticated: true,
        loginTime: Date.now(),
        metadata,
      };

      // Update profile if provided
      if (user) {
        state.profiles[websiteId] = user;
      }
    },

    clearBusinessSession: (state, action) => {
      const websiteId = action.payload;
      delete state.activeSessions[websiteId];
      delete state.sharedDataConsent[websiteId];
      delete state.availableSharedData[websiteId];
      delete state.profiles[websiteId];
      delete state.addresses[websiteId];
      delete state.paymentMethods[websiteId];
      delete state.oauthStates[websiteId];
    },

    clearAllBusinessSessions: (state) => {
      state.activeSessions = {};
      state.sharedDataConsent = {};
      state.availableSharedData = {};
      state.profiles = {};
      state.addresses = {};
      state.paymentMethods = {};
      state.oauthStates = {};
      BusinessTokenManager.clearAllBusinessTokens();
    },

    // Data updates
    updateSharedData: (state, action) => {
      const { websiteId, data } = action.payload;
      if (state.activeSessions[websiteId]) {
        state.activeSessions[websiteId].sharedData = {
          ...state.activeSessions[websiteId].sharedData,
          ...data,
        };
      }
      if (state.availableSharedData[websiteId]) {
        state.availableSharedData[websiteId] = {
          ...state.availableSharedData[websiteId],
          ...data,
        };
      }
    },

    updateBusinessProfileLocal: (state, action) => {
      const { websiteId, profileData } = action.payload;
      if (state.profiles[websiteId]) {
        state.profiles[websiteId] = {
          ...state.profiles[websiteId],
          ...profileData,
        };
      }
      if (state.activeSessions[websiteId]) {
        state.activeSessions[websiteId].user = {
          ...state.activeSessions[websiteId].user,
          ...profileData,
        };
      }
    },

    // OAuth state management
    setOAuthState: (state, action) => {
      const { websiteId, provider, oauthData } = action.payload;
      if (!state.oauthStates[websiteId]) {
        state.oauthStates[websiteId] = {};
      }
      state.oauthStates[websiteId][provider] = oauthData;
    },

    clearOAuthState: (state, action) => {
      const { websiteId, provider } = action.payload;
      if (state.oauthStates[websiteId]) {
        delete state.oauthStates[websiteId][provider];
      }
    },

    // Connected accounts management
    addConnectedAccount: (state, action) => {
      const { websiteId, provider, accountData } = action.payload;
      if (!state.connectedAccounts[websiteId]) {
        state.connectedAccounts[websiteId] = {};
      }
      state.connectedAccounts[websiteId][provider] = accountData;
    },

    removeConnectedAccount: (state, action) => {
      const { websiteId, provider } = action.payload;
      if (state.connectedAccounts[websiteId]) {
        delete state.connectedAccounts[websiteId][provider];
      }
    },

    // Initialize from stored tokens
    initializeBusinessSessions: (state) => {
      const tokens = BusinessTokenManager.getAllBusinessTokens();
      Object.entries(tokens).forEach(([websiteId, token]) => {
        if (token && !BusinessTokenManager.isTokenExpired?.(token)) {
          // Initialize minimal session - full data should be fetched
          state.activeSessions[websiteId] = {
            isAuthenticated: true,
            loginTime: Date.now(),
            user: null,
            sharedData: {},
            needsRefresh: true,
          };
        }
      });
    },
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginToBusiness.pending, (state) => {
        state.loading.login = true;
        state.error.login = null;
        state.success.login = false;
        state.loginSuccess = false;
      })
      .addCase(loginToBusiness.fulfilled, (state, action) => {
        state.loading.login = false;
        state.success.login = true;
        state.loginSuccess = true;

        const { websiteId, user, shared_data, consent } = action.payload;
        state.activeSessions[websiteId] = {
          user,
          sharedData: shared_data || {},
          isAuthenticated: true,
          loginTime: Date.now(),
        };

        if (user) {
          state.profiles[websiteId] = user;
        }

        if (consent) {
          state.sharedDataConsent[websiteId] = consent;
        }

        state.error.login = null;
      })
      .addCase(loginToBusiness.rejected, (state, action) => {
        state.loading.login = false;
        state.error.login = action.payload;
        state.success.login = false;
      })

      // Register
      .addCase(registerToBusiness.pending, (state) => {
        state.loading.register = true;
        state.error.register = null;
        state.success.register = false;
        state.registerSuccess = false;
      })
      .addCase(registerToBusiness.fulfilled, (state, action) => {
        state.loading.register = false;
        state.success.register = true;
        state.registerSuccess = true;

        const { websiteId, user, message } = action.payload;

        if (user) {
          state.activeSessions[websiteId] = {
            user,
            sharedData: {},
            isAuthenticated: true,
            loginTime: Date.now(),
          };
          state.profiles[websiteId] = user;
        }

        // Check if email verification is required
        if (message && message.includes("verification")) {
          state.emailVerificationSent = true;
        }

        state.error.register = null;
      })
      .addCase(registerToBusiness.rejected, (state, action) => {
        state.loading.register = false;
        state.error.register = action.payload;
        state.success.register = false;
      })

      // Logout
      .addCase(logoutFromBusiness.pending, (state) => {
        state.loading.logout = true;
        state.error.logout = null;
      })
      .addCase(logoutFromBusiness.fulfilled, (state, action) => {
        state.loading.logout = false;
        const websiteId = action.payload;
        delete state.activeSessions[websiteId];
        delete state.sharedDataConsent[websiteId];
        delete state.availableSharedData[websiteId];
        delete state.profiles[websiteId];
        delete state.addresses[websiteId];
        delete state.paymentMethods[websiteId];
        delete state.oauthStates[websiteId];
        delete state.connectedAccounts[websiteId];
      })
      .addCase(logoutFromBusiness.rejected, (state, action) => {
        state.loading.logout = false;
        state.error.logout = action.payload;
      })

      // Token Refresh
      .addCase(refreshBusinessToken.fulfilled, (state, action) => {
        const { websiteId } = action.payload;
        if (state.activeSessions[websiteId]) {
          state.activeSessions[websiteId].needsRefresh = false;
        }
      })
      .addCase(refreshBusinessToken.rejected, (state, action) => {
        // Token refresh failed - clear session
        const websiteId = action.meta.arg;
        delete state.activeSessions[websiteId];
      })

      // Password Management
      .addCase(forgotBusinessPassword.pending, (state) => {
        state.loading.passwordReset = true;
        state.error.passwordReset = null;
        state.passwordResetSent = false;
      })
      .addCase(forgotBusinessPassword.fulfilled, (state) => {
        state.loading.passwordReset = false;
        state.passwordResetSent = true;
        state.success.passwordReset = true;
      })
      .addCase(forgotBusinessPassword.rejected, (state, action) => {
        state.loading.passwordReset = false;
        state.error.passwordReset = action.payload;
      })

      .addCase(resetBusinessPassword.pending, (state) => {
        state.loading.passwordReset = true;
        state.error.passwordReset = null;
      })
      .addCase(resetBusinessPassword.fulfilled, (state) => {
        state.loading.passwordReset = false;
        state.success.passwordReset = true;
      })
      .addCase(resetBusinessPassword.rejected, (state, action) => {
        state.loading.passwordReset = false;
        state.error.passwordReset = action.payload;
      })

      .addCase(changeBusinessPassword.pending, (state) => {
        state.loading.passwordChange = true;
        state.error.passwordChange = null;
      })
      .addCase(changeBusinessPassword.fulfilled, (state) => {
        state.loading.passwordChange = false;
        state.success.passwordChange = true;
      })
      .addCase(changeBusinessPassword.rejected, (state, action) => {
        state.loading.passwordChange = false;
        state.error.passwordChange = action.payload;
      })

      // OAuth Flows
      .addCase(initiateWebCraftOAuth.pending, (state) => {
        state.loading.oauth = true;
        state.error.oauth = null;
      })
      .addCase(initiateWebCraftOAuth.fulfilled, (state, action) => {
        state.loading.oauth = false;
        const {
          websiteId,
          authorization_url,
          state: oauthState,
        } = action.payload;
        if (!state.oauthStates[websiteId]) {
          state.oauthStates[websiteId] = {};
        }
        state.oauthStates[websiteId].webcraft = {
          authorization_url,
          state: oauthState,
          initiated_at: Date.now(),
        };
      })
      .addCase(initiateWebCraftOAuth.rejected, (state, action) => {
        state.loading.oauth = false;
        state.error.oauth = action.payload;
      })

      .addCase(handleWebCraftCallback.fulfilled, (state, action) => {
        const { websiteId, connected_account, shared_data } = action.payload;

        if (connected_account) {
          if (!state.connectedAccounts[websiteId]) {
            state.connectedAccounts[websiteId] = {};
          }
          state.connectedAccounts[websiteId].webcraft = connected_account;
        }

        if (shared_data && state.activeSessions[websiteId]) {
          state.activeSessions[websiteId].sharedData = {
            ...state.activeSessions[websiteId].sharedData,
            ...shared_data,
          };
        }

        state.success.oauthConnection = true;

        // Clear OAuth state
        if (state.oauthStates[websiteId]) {
          delete state.oauthStates[websiteId].webcraft;
        }
      })

      // Consent and Shared Data
      .addCase(fetchConsentSettings.fulfilled, (state, action) => {
        const { websiteId, consent_settings } = action.payload;
        state.consentSettings[websiteId] = consent_settings;
      })

      .addCase(updateDataConsent.pending, (state) => {
        state.loading.consent = true;
        state.error.consent = null;
        state.success.consentUpdate = false;
      })
      .addCase(updateDataConsent.fulfilled, (state, action) => {
        state.loading.consent = false;
        state.success.consentUpdate = true;
        const { websiteId, consent } = action.payload;
        state.sharedDataConsent[websiteId] = consent;
      })
      .addCase(updateDataConsent.rejected, (state, action) => {
        state.loading.consent = false;
        state.error.consent = action.payload;
      })

      .addCase(fetchSharedData.fulfilled, (state, action) => {
        const { websiteId, shared_data } = action.payload;
        state.availableSharedData[websiteId] = shared_data;
      })

      // Profile Management
      .addCase(fetchBusinessProfile.pending, (state) => {
        state.loading.profile = true;
        state.error.profile = null;
      })
      .addCase(fetchBusinessProfile.fulfilled, (state, action) => {
        state.loading.profile = false;
        const { websiteId, profile } = action.payload;
        state.profiles[websiteId] = profile;

        // Update session user data
        if (state.activeSessions[websiteId]) {
          state.activeSessions[websiteId].user = profile;
        }
      })
      .addCase(fetchBusinessProfile.rejected, (state, action) => {
        state.loading.profile = false;
        state.error.profile = action.payload;
      })

      .addCase(updateBusinessProfile.pending, (state) => {
        state.loading.profile = true;
        state.error.profile = null;
        state.success.profileUpdate = false;
      })
      .addCase(updateBusinessProfile.fulfilled, (state, action) => {
        state.loading.profile = false;
        state.success.profileUpdate = true;
        const { websiteId, profile } = action.payload;
        state.profiles[websiteId] = {
          ...state.profiles[websiteId],
          ...profile,
        };

        // Update session user data
        if (state.activeSessions[websiteId]) {
          state.activeSessions[websiteId].user = {
            ...state.activeSessions[websiteId].user,
            ...profile,
          };
        }
      })
      .addCase(updateBusinessProfile.rejected, (state, action) => {
        state.loading.profile = false;
        state.error.profile = action.payload;
      })

      // Address Management
      .addCase(fetchBusinessAddresses.fulfilled, (state, action) => {
        const { websiteId, addresses } = action.payload;
        state.addresses[websiteId] = addresses;
      })

      .addCase(addBusinessAddress.fulfilled, (state, action) => {
        const { websiteId, address } = action.payload;
        if (!state.addresses[websiteId]) {
          state.addresses[websiteId] = [];
        }
        state.addresses[websiteId].push(address);
      })

      // Session Management
      .addCase(fetchActiveSessions.fulfilled, (state, action) => {
        const { websiteId, sessions } = action.payload;
        state.sessionHistory[websiteId] = sessions;
      })

      .addCase(terminateBusinessSession.fulfilled, (state, action) => {
        const { websiteId, sessionId } = action.payload;
        if (state.sessionHistory[websiteId]) {
          state.sessionHistory[websiteId] = state.sessionHistory[
            websiteId
          ].filter((session) => session.id !== sessionId);
        }
      });
  },
});

export const {
  clearError,
  clearAllErrors,
  clearSuccessFlags,
  setBusinessSession,
  clearBusinessSession,
  clearAllBusinessSessions,
  updateSharedData,
  updateBusinessProfileLocal,
  setOAuthState,
  clearOAuthState,
  addConnectedAccount,
  removeConnectedAccount,
  initializeBusinessSessions,
} = businessAuthSlice.actions;

// Selectors
export const selectBusinessAuth = (state) => state.businessAuth;
export const selectBusinessSession = (state, websiteId) =>
  state.businessAuth.activeSessions[websiteId];
export const selectIsBusinessAuthenticated = (state, websiteId) =>
  Boolean(state.businessAuth.activeSessions[websiteId]?.isAuthenticated);
export const selectBusinessUser = (state, websiteId) =>
  state.businessAuth.activeSessions[websiteId]?.user;
export const selectBusinessProfile = (state, websiteId) =>
  state.businessAuth.profiles[websiteId];
export const selectSharedData = (state, websiteId) =>
  state.businessAuth.activeSessions[websiteId]?.sharedData;
export const selectConsentSettings = (state, websiteId) =>
  state.businessAuth.sharedDataConsent[websiteId];
export const selectConnectedAccounts = (state, websiteId) =>
  state.businessAuth.connectedAccounts[websiteId];
export const selectBusinessAddresses = (state, websiteId) =>
  state.businessAuth.addresses[websiteId];
export const selectBusinessAuthLoading = (state) => state.businessAuth.loading;
export const selectBusinessAuthError = (state) => state.businessAuth.error;
export const selectBusinessAuthSuccess = (state) => state.businessAuth.success;
export const selectOAuthState = (state, websiteId) =>
  state.businessAuth.oauthStates[websiteId];
export const selectAllBusinessSessions = (state) =>
  state.businessAuth.activeSessions;

export default businessAuthSlice.reducer;
