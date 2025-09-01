// ================================
// store/slices/authSlice.js
// ================================
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../api/authAPI";
import { TokenManager } from "../api/config";

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login({
        email,
        password,
        remember_me: rememberMe,
      });
      const { access_token, refresh_token, user } = response.data;

      TokenManager.setToken(access_token);
      TokenManager.setRefreshToken(refresh_token);

      return { access_token, refresh_token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = TokenManager.getRefreshToken();
      await authAPI.logout({ refresh_token: refreshToken });
      TokenManager.clearAll();
      return true;
    } catch (error) {
      TokenManager.clearAll();
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = TokenManager.getRefreshToken();
      if (!refreshTokenValue) {
        throw new Error("No refresh token available");
      }

      const response = await authAPI.refreshToken({
        refresh: refreshTokenValue,
      });
      const { access_token } = response.data;

      TokenManager.setToken(access_token);

      return { access_token };
    } catch (error) {
      TokenManager.clearAll();
      return rejectWithValue(
        error.response?.data?.message || "Token refresh failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await authAPI.forgotPassword({ email });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset email"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.resetPassword({ token, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyEmail({ token });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Email verification failed"
      );
    }
  }
);

export const enable2FA = createAsyncThunk(
  "auth/enable2FA",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.enableTwoFactor();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to enable 2FA"
      );
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  // Token management
  accessToken: TokenManager.getToken(),
  refreshToken: TokenManager.getRefreshToken(),

  // Auth states
  loginAttempts: 0,
  lastLoginAttempt: null,
  sessionTimeout: null,

  // 2FA state
  twoFactorRequired: false,
  twoFactorSecret: null,
  backupCodes: [],

  // Password reset
  passwordResetSent: false,
  passwordResetSuccess: false,

  // Email verification
  emailVerificationSent: false,
  emailVerified: false,

  // Registration
  registrationSuccess: false,

  // UI states
  errors: {},
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Local actions
    logoutLocal: (state) => {
      TokenManager.clearAll();
      return {
        ...initialState,
        accessToken: null,
        refreshToken: null,
        isInitialized: true,
      };
    },

    clearErrors: (state) => {
      state.errors = {};
    },

    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },

    setSessionTimeout: (state, action) => {
      state.sessionTimeout = action.payload;
    },

    incrementLoginAttempts: (state) => {
      state.loginAttempts += 1;
      state.lastLoginAttempt = Date.now();
    },

    resetLoginAttempts: (state) => {
      state.loginAttempts = 0;
      state.lastLoginAttempt = null;
    },

    initializeAuth: (state) => {
      const token = TokenManager.getToken();
      const refreshToken = TokenManager.getRefreshToken();

      if (token && !TokenManager.isTokenExpired(token)) {
        state.isAuthenticated = true;
        state.accessToken = token;
        state.refreshToken = refreshToken;
      } else {
        TokenManager.clearAll();
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
      }
      state.isInitialized = true;
    },

    clearPasswordResetFlags: (state) => {
      state.passwordResetSent = false;
      state.passwordResetSuccess = false;
    },

    clearEmailVerificationFlags: (state) => {
      state.emailVerificationSent = false;
      state.emailVerified = false;
    },

    clearRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.loginAttempts = 0;
        state.lastLoginAttempt = null;
        state.errors = {};
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.errors.login = action.payload;
        state.loginAttempts += 1;
        state.lastLoginAttempt = Date.now();
      })

      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrationSuccess = true;
        state.successMessage =
          "Registration successful! Please check your email to verify your account.";
        state.errors = {};
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.register = action.payload;
        state.registrationSuccess = false;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        return {
          ...initialState,
          isInitialized: true,
          isLoading: false,
        };
      })
      .addCase(logout.rejected, (state, action) => {
        return {
          ...initialState,
          isInitialized: true,
          isLoading: false,
          errors: { logout: action.payload },
        };
      })

      // Refresh token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      // Forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.passwordResetSent = true;
        state.successMessage = "Password reset email sent successfully!";
        state.errors = {};
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.forgotPassword = action.payload;
      })

      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.passwordResetSuccess = true;
        state.successMessage = "Password reset successfully!";
        state.errors = {};
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.resetPassword = action.payload;
      })

      // Email verification
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.emailVerified = true;
        state.successMessage = "Email verified successfully!";
        state.errors = {};
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.verifyEmail = action.payload;
      })

      // 2FA
      .addCase(enable2FA.pending, (state) => {
        state.isLoading = true;
        state.errors = {};
      })
      .addCase(enable2FA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.twoFactorSecret = action.payload.secret;
        state.backupCodes = action.payload.backup_codes;
        state.successMessage = "2FA enabled successfully!";
        state.errors = {};
      })
      .addCase(enable2FA.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.twoFactor = action.payload;
      });
  },
});

export const {
  logoutLocal,
  clearErrors,
  clearSuccessMessage,
  setSessionTimeout,
  incrementLoginAttempts,
  resetLoginAttempts,
  initializeAuth,
  clearPasswordResetFlags,
  clearEmailVerificationFlags,
  clearRegistrationSuccess,
} = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectErrors = (state) => state.auth.errors;
export const selectIsInitialized = (state) => state.auth.isInitialized;

export default authSlice.reducer;
