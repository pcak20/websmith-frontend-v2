// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../api/userAPI";

// Async thunks for user profile management
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateProfile(profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "user/uploadProfileImage",
  async (imageFile, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("profile_image", imageFile);

      const response = await userAPI.uploadProfileImage(formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          dispatch(setImageUploadProgress(progress));
        },
      });

      dispatch(resetImageUploadProgress());
      return response.data;
    } catch (error) {
      dispatch(resetImageUploadProgress());
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload image"
      );
    }
  }
);

export const deleteProfileImage = createAsyncThunk(
  "user/deleteProfileImage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.deleteProfileImage();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete image"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await userAPI.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password"
      );
    }
  }
);

export const updateUserPreferences = createAsyncThunk(
  "user/updateUserPreferences",
  async (preferences, { rejectWithValue }) => {
    try {
      const response = await userAPI.updatePreferences(preferences);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update preferences"
      );
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async ({ password }, { rejectWithValue }) => {
    try {
      const response = await userAPI.deleteAccount({ password });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete account"
      );
    }
  }
);

export const exportUserData = createAsyncThunk(
  "user/exportUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.exportUserData();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to export data"
      );
    }
  }
);

export const getNotificationSettings = createAsyncThunk(
  "user/getNotificationSettings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getNotificationSettings();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch notification settings");
    }
  }
);

export const updateNotificationSettings = createAsyncThunk(
  "user/updateNotificationSettings",
  async (settings, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateNotificationSettings(settings);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to update notification settings");
    }
  }
);

export const getSecuritySettings = createAsyncThunk(
  "user/getSecuritySettings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getSecuritySettings();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch security settings");
    }
  }
);

export const getLoginHistory = createAsyncThunk(
  "user/getLoginHistory",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await userAPI.getLoginHistory({ page, limit });
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch login history");
    }
  }
);

export const terminateSession = createAsyncThunk(
  "user/terminateSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await userAPI.terminateSession(sessionId);
      return { sessionId, ...response.data };
    } catch (error) {
      return rejectWithValue("Failed to terminate session");
    }
  }
);

export const getUsageStatistics = createAsyncThunk(
  "user/getUsageStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUsageStatistics();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch usage statistics");
    }
  }
);

const initialState = {
  // Profile data
  profile: null,

  // Preferences
  preferences: {
    timezone: "UTC",
    language: "en",
    dateFormat: "MM/dd/yyyy",
    timeFormat: "12h",
    theme: "light",
    emailDigest: "weekly",
  },

  // Notification settings
  notifications: {
    email: {
      marketing: false,
      productUpdates: true,
      securityAlerts: true,
      websiteActivity: true,
      businessUpdates: true,
      systemNotifications: true,
    },
    push: {
      enabled: false,
      websiteActivity: true,
      businessUpdates: true,
      securityAlerts: true,
    },
    inApp: {
      enabled: true,
      websiteActivity: true,
      businessUpdates: true,
      systemNotifications: true,
    },
  },

  // Security data
  securitySettings: {
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: 30, // days
    passwordLastChanged: null,
    backupCodes: [],
  },

  // Usage statistics
  usage: {
    totalBusinesses: 0,
    totalWebsites: 0,
    storageUsed: 0,
    storageLimit: 1073741824, // 1GB in bytes
    apiCallsUsed: 0,
    apiCallsLimit: 10000,
    bandwidthUsed: 0,
    bandwidthLimit: 107374182400, // 100GB in bytes
  },

  // Login history
  loginHistory: {
    sessions: [],
    totalCount: 0,
    currentPage: 1,
    hasMore: false,
  },

  // UI state
  imageUploadProgress: 0,
  isLoading: false,
  isUpdating: false,
  isUploadingImage: false,
  isExporting: false,

  // Success states
  updateSuccess: false,
  passwordChangeSuccess: false,
  imageUploadSuccess: false,
  exportSuccess: false,
  preferencesUpdateSuccess: false,
  notificationsUpdateSuccess: false,

  // Error handling
  error: null,
  validationErrors: {},

  // Data export
  exportData: null,
  exportUrl: null,

  // Account deletion
  isDeletingAccount: false,
  accountDeletionRequested: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Error management
    clearError: (state) => {
      state.error = null;
      state.validationErrors = {};
    },

    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },

    // Success flags management
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },

    clearPasswordChangeSuccess: (state) => {
      state.passwordChangeSuccess = false;
    },

    clearImageUploadSuccess: (state) => {
      state.imageUploadSuccess = false;
    },

    clearExportSuccess: (state) => {
      state.exportSuccess = false;
      state.exportData = null;
      state.exportUrl = null;
    },

    clearPreferencesUpdateSuccess: (state) => {
      state.preferencesUpdateSuccess = false;
    },

    clearNotificationsUpdateSuccess: (state) => {
      state.notificationsUpdateSuccess = false;
    },

    // Image upload progress
    setImageUploadProgress: (state, action) => {
      state.imageUploadProgress = action.payload;
    },

    resetImageUploadProgress: (state) => {
      state.imageUploadProgress = 0;
    },

    // Local preferences update (optimistic)
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },

    // Local notifications update (optimistic)
    updateNotifications: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },

    // Profile updates (optimistic)
    updateProfileLocal: (state, action) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },

    // Usage statistics updates
    updateUsageStats: (state, action) => {
      state.usage = { ...state.usage, ...action.payload };
    },

    // Login history management
    clearLoginHistory: (state) => {
      state.loginHistory = initialState.loginHistory;
    },

    // Reset user state (for logout)
    resetUserState: () => initialState,

    // Account deletion state
    setAccountDeletionRequested: (state, action) => {
      state.accountDeletionRequested = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;

        // Update nested state if provided
        if (action.payload.preferences) {
          state.preferences = {
            ...state.preferences,
            ...action.payload.preferences,
          };
        }
        if (action.payload.notifications) {
          state.notifications = {
            ...state.notifications,
            ...action.payload.notifications,
          };
        }
        if (action.payload.usage) {
          state.usage = { ...state.usage, ...action.payload.usage };
        }

        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
        state.validationErrors = {};
        state.updateSuccess = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.profile = { ...state.profile, ...action.payload };
        state.updateSuccess = true;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
        state.updateSuccess = false;

        // Handle validation errors
        if (typeof action.payload === "object" && action.payload.fields) {
          state.validationErrors = action.payload.fields;
        }
      })

      // Upload profile image
      .addCase(uploadProfileImage.pending, (state) => {
        state.isUploadingImage = true;
        state.error = null;
        state.imageUploadSuccess = false;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.isUploadingImage = false;
        state.imageUploadSuccess = true;
        state.error = null;

        // Update profile with new image URL
        if (state.profile) {
          state.profile.profile_image = action.payload.profile_image_url;
        }
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.isUploadingImage = false;
        state.error = action.payload;
        state.imageUploadSuccess = false;
      })

      // Delete profile image
      .addCase(deleteProfileImage.fulfilled, (state) => {
        if (state.profile) {
          state.profile.profile_image = null;
        }
      })

      // Change password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.passwordChangeSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.passwordChangeSuccess = true;
        state.error = null;

        // Update security settings if provided
        if (action.payload.password_last_changed) {
          state.securitySettings.passwordLastChanged =
            action.payload.password_last_changed;
        }
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.passwordChangeSuccess = false;
      })

      // Update preferences
      .addCase(updateUserPreferences.pending, (state) => {
        state.isUpdating = true;
        state.preferencesUpdateSuccess = false;
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.preferences = { ...state.preferences, ...action.payload };
        state.preferencesUpdateSuccess = true;
        state.error = null;
      })
      .addCase(updateUserPreferences.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })

      // Delete account
      .addCase(deleteAccount.pending, (state) => {
        state.isDeletingAccount = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        // Account deletion successful - state will be reset by logout
        state.isDeletingAccount = false;
        state.accountDeletionRequested = true;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isDeletingAccount = false;
        state.error = action.payload;
      })

      // Export user data
      .addCase(exportUserData.pending, (state) => {
        state.isExporting = true;
        state.error = null;
        state.exportSuccess = false;
      })
      .addCase(exportUserData.fulfilled, (state, action) => {
        state.isExporting = false;
        state.exportSuccess = true;
        state.exportData = action.payload.data;
        state.exportUrl = action.payload.download_url;
      })
      .addCase(exportUserData.rejected, (state, action) => {
        state.isExporting = false;
        state.error = action.payload;
      })

      // Notification settings
      .addCase(getNotificationSettings.fulfilled, (state, action) => {
        state.notifications = { ...state.notifications, ...action.payload };
      })
      .addCase(updateNotificationSettings.fulfilled, (state, action) => {
        state.notifications = { ...state.notifications, ...action.payload };
        state.notificationsUpdateSuccess = true;
      })

      // Security settings
      .addCase(getSecuritySettings.fulfilled, (state, action) => {
        state.securitySettings = {
          ...state.securitySettings,
          ...action.payload,
        };
      })

      // Login history
      .addCase(getLoginHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        const { sessions, total_count, page, has_more } = action.payload;

        if (page === 1) {
          state.loginHistory.sessions = sessions;
        } else {
          state.loginHistory.sessions = [
            ...state.loginHistory.sessions,
            ...sessions,
          ];
        }

        state.loginHistory.totalCount = total_count;
        state.loginHistory.currentPage = page;
        state.loginHistory.hasMore = has_more;
      })
      .addCase(getLoginHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Terminate session
      .addCase(terminateSession.fulfilled, (state, action) => {
        const { sessionId } = action.payload;
        state.loginHistory.sessions = state.loginHistory.sessions.filter(
          (session) => session.id !== sessionId
        );
      })

      // Usage statistics
      .addCase(getUsageStatistics.fulfilled, (state, action) => {
        state.usage = { ...state.usage, ...action.payload };
      });
  },
});

// Export actions
export const {
  clearError,
  setValidationErrors,
  clearUpdateSuccess,
  clearPasswordChangeSuccess,
  clearImageUploadSuccess,
  clearExportSuccess,
  clearPreferencesUpdateSuccess,
  clearNotificationsUpdateSuccess,
  setImageUploadProgress,
  resetImageUploadProgress,
  updatePreferences,
  updateNotifications,
  updateProfileLocal,
  updateUsageStats,
  clearLoginHistory,
  resetUserState,
  setAccountDeletionRequested,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user;
export const selectUserProfile = (state) => state.user.profile;
export const selectUserPreferences = (state) => state.user.preferences;
export const selectNotificationSettings = (state) => state.user.notifications;
export const selectSecuritySettings = (state) => state.user.securitySettings;
export const selectUsageStats = (state) => state.user.usage;
export const selectLoginHistory = (state) => state.user.loginHistory;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
