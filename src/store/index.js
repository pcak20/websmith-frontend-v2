// ================================
// store/index.js
// ================================
import { configureStore } from "@reduxjs/toolkit";

// Import all reducers
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import businessReducer from "./slices/businessSlice";
import businessAuthReducer from "./slices/businessAuthSlice";
import websiteReducer from "./slices/websiteSlice";
import analyticsReducer from "./slices/analyticsSlice";
import templateReducer from "./slices/templateSlice";
import mediaReducer from "./slices/mediaSlice";

import { setStore } from "./storeInstance";

export const store = configureStore({
  reducer: {
    // Core authentication
    auth: authReducer,
    user: userReducer,

    // Business management
    business: businessReducer,
    businessAuth: businessAuthReducer,

    // Website and content
    website: websiteReducer,
    template: templateReducer,
    media: mediaReducer,

    // Analytics and insights
    analytics: analyticsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          // Add any other actions that might contain non-serializable data
        ],
        ignoredPaths: [
          // Ignore upload progress and file objects
          "media.uploads",
          "user.imageUploadProgress",
          // Ignore real-time data timestamps
          "analytics.realTimeData",
          "analytics.autoRefresh.lastRefresh",
          // Ignore session timestamps
          "auth.sessionTimeout",
          "businessAuth.activeSessions",
        ],
      },
      // Enable immutability check in development
      immutableCheck: {
        warnAfter: 64, // Warn if state mutations take longer than 64ms
      },
      // Enable thunk middleware options
      thunk: {
        extraArgument: {
          // You can add extra arguments here if needed
        },
      },
    }),

  // Enable Redux DevTools in development
  devTools: import.meta.env.DEV && {
    name: "WebCraft Redux Store",
    trace: true,
    traceLimit: 25,
    // Customize action sanitizer
    actionSanitizer: (action) => ({
      ...action,
      // Hide sensitive data in dev tools
      payload:
        action.type.includes("login") || action.type.includes("register")
          ? { ...action.payload, password: "[HIDDEN]" }
          : action.payload,
    }),
    // Customize state sanitizer
    stateSanitizer: (state) => ({
      ...state,
      // Hide sensitive tokens in dev tools
      auth: {
        ...state.auth,
        accessToken: state.auth.accessToken ? "[HIDDEN]" : null,
        refreshToken: state.auth.refreshToken ? "[HIDDEN]" : null,
      },
      businessAuth: {
        ...state.businessAuth,
        activeSessions: Object.keys(state.businessAuth.activeSessions).reduce(
          (acc, key) => {
            acc[key] = {
              ...state.businessAuth.activeSessions[key],
              // Hide sensitive session data
              sharedData: "[HIDDEN]",
            };
            return acc;
          },
          {}
        ),
      },
    }),
  },

  // Preloaded state (useful for SSR or state restoration)
  preloadedState: undefined,

  // Enhanced reducer options
  enhancers: (getDefaultEnhancers) => {
    if (import.meta.env.DEV) {
      // Add development enhancers
      return getDefaultEnhancers();
    }
    return getDefaultEnhancers();
  },
});

// Set the store instance for interceptors
setStore(store);

// Infer the RootState and AppDispatch types from the store itself
export const selectRootState = (state) => state;

// Export common selectors for convenience
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.user;
export const selectBusiness = (state) => state.business;
export const selectBusinessAuth = (state) => state.businessAuth;
export const selectWebsite = (state) => state.website;
export const selectTemplate = (state) => state.template;
export const selectMedia = (state) => state.media;
export const selectAnalytics = (state) => state.analytics;

// Store state persistence helpers (if you add redux-persist later)
export const getStoredState = () => {
  try {
    const serializedState = localStorage.getItem("webcraft-state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      // Only persist non-sensitive data
      auth: {
        isAuthenticated: state.auth.isAuthenticated,
        isInitialized: state.auth.isInitialized,
        // Don't persist tokens - they should be managed by TokenManager
      },
      user: {
        preferences: state.user.preferences,
        notificationSettings: state.user.notificationSettings,
      },
      business: {
        selectedCategory: state.business.selectedCategory,
        viewMode: state.business.viewMode,
        sortBy: state.business.sortBy,
        sortOrder: state.business.sortOrder,
      },
      website: {
        currentView: state.website.currentView,
        sortBy: state.website.sortBy,
        sortOrder: state.website.sortOrder,
        filterStatus: state.website.filterStatus,
      },
      template: {
        viewMode: state.template.viewMode,
        selectedCategory: state.template.selectedCategory,
        currentFilters: state.template.currentFilters,
      },
      media: {
        viewMode: state.media.viewMode,
        selectedView: state.media.selectedView,
        currentFilters: state.media.currentFilters,
      },
      analytics: {
        currentDateRange: state.analytics.currentDateRange,
        chartSettings: state.analytics.chartSettings,
        autoRefresh: {
          enabled: state.analytics.autoRefresh.enabled,
          interval: state.analytics.autoRefresh.interval,
        },
      },
    });
    localStorage.setItem("webcraft-state", serializedState);
  } catch (err) {
    // Ignore write errors
    console.warn("Could not save state to localStorage:", err);
  }
};

// Subscribe to store changes for auto-saving (debounced)
let saveTimeout;
store.subscribe(() => {
  // Debounce save operations
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveState(store.getState());
  }, 1000);
});

// Hot module replacement for reducers in development
if (import.meta.env.DEV && import.meta.hot) {
  // Accept hot updates for reducers
  import.meta.hot.accept(
    [
      "./slices/authSlice",
      "./slices/userSlice",
      "./slices/businessSlice",
      "./slices/businessAuthSlice",
      "./slices/websiteSlice",
      "./slices/analyticsSlice",
      "./slices/templateSlice",
      "./slices/mediaSlice",
    ],
    () => {
      // Re-import updated reducers
      import("./slices/authSlice").then((module) => {
        store.replaceReducer({
          auth: module.default,
          user: userReducer,
          business: businessReducer,
          businessAuth: businessAuthReducer,
          website: websiteReducer,
          analytics: analyticsReducer,
          template: templateReducer,
          media: mediaReducer,
        });
      });
    }
  );
}

// Development helpers
if (import.meta.env.DEV) {
  // Make store available in browser console for debugging
  window.__WEBCRAFT_STORE__ = store;

  // Add store debugging helpers
  window.__WEBCRAFT_DEBUG__ = {
    getState: () => store.getState(),
    dispatch: store.dispatch,
    subscribe: store.subscribe,
    // Helper to log state changes
    logStateChanges: (sliceName) => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        console.log(`${sliceName} state:`, state[sliceName]);
      });
      return unsubscribe;
    },
    // Helper to track action dispatches
    logActions: () => {
      const originalDispatch = store.dispatch;
      store.dispatch = (action) => {
        console.log("Dispatching action:", action);
        const result = originalDispatch(action);
        console.log("New state:", store.getState());
        return result;
      };
    },
  };
}

export default store;
