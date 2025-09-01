// store/slices/analyticsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { analyticsAPI } from "../api/analyticsAPI";

// Website Analytics
export const fetchWebsiteAnalytics = createAsyncThunk(
  "analytics/fetchWebsiteAnalytics",
  async ({ websiteId, dateRange = "30d" }, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getWebsiteAnalytics(
        websiteId,
        dateRange
      );
      return { websiteId, dateRange, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch analytics"
      );
    }
  }
);

export const fetchRealTimeAnalytics = createAsyncThunk(
  "analytics/fetchRealTimeAnalytics",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getRealTimeAnalytics(websiteId);
      return { websiteId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch real-time analytics"
      );
    }
  }
);

export const fetchTrafficSources = createAsyncThunk(
  "analytics/fetchTrafficSources",
  async ({ websiteId, dateRange = "30d" }, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getTrafficSources(
        websiteId,
        dateRange
      );
      return { websiteId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch traffic sources"
      );
    }
  }
);

// Page Analytics
export const fetchPageAnalytics = createAsyncThunk(
  "analytics/fetchPageAnalytics",
  async ({ websiteId, pageId, dateRange = "30d" }, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getPageAnalytics(
        websiteId,
        pageId,
        dateRange
      );
      return { websiteId, pageId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch page analytics"
      );
    }
  }
);

export const fetchTopPages = createAsyncThunk(
  "analytics/fetchTopPages",
  async ({ websiteId, dateRange = "30d" }, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getTopPages(websiteId, dateRange);
      return { websiteId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch top pages"
      );
    }
  }
);

// User Behavior
export const fetchUserFlow = createAsyncThunk(
  "analytics/fetchUserFlow",
  async ({ websiteId, dateRange = "30d" }, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getUserFlow(websiteId, dateRange);
      return { websiteId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user flow"
      );
    }
  }
);

// Performance Metrics
export const fetchPerformanceMetrics = createAsyncThunk(
  "analytics/fetchPerformanceMetrics",
  async ({ websiteId, dateRange = "30d" }, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getPerformanceMetrics(
        websiteId,
        dateRange
      );
      return { websiteId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch performance metrics"
      );
    }
  }
);

// Custom Events
export const trackEvent = createAsyncThunk(
  "analytics/trackEvent",
  async ({ websiteId, eventData }, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.trackEvent(websiteId, eventData);
      return { websiteId, event: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to track event"
      );
    }
  }
);

export const fetchCustomEvents = createAsyncThunk(
  "analytics/fetchCustomEvents",
  async ({ websiteId, dateRange = "30d" }, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getCustomEvents(websiteId, dateRange);
      return { websiteId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch custom events"
      );
    }
  }
);

// Dashboard Summary
export const fetchDashboardSummary = createAsyncThunk(
  "analytics/fetchDashboardSummary",
  async ({ websiteId, dateRange = "30d" }, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getDashboardSummary(
        websiteId,
        dateRange
      );
      return { websiteId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard summary"
      );
    }
  }
);

// Visitor Analytics
export const fetchVisitorAnalytics = createAsyncThunk(
  "analytics/fetchVisitorAnalytics",
  async ({ websiteId, dateRange = "30d" }, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getVisitorAnalytics(
        websiteId,
        dateRange
      );
      return { websiteId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch visitor analytics"
      );
    }
  }
);

// Export Analytics
export const exportAnalytics = createAsyncThunk(
  "analytics/exportAnalytics",
  async (
    { websiteId, format = "csv", dateRange = "30d" },
    { rejectWithValue }
  ) => {
    try {
      const response = await analyticsAPI.exportAnalytics(
        websiteId,
        format,
        dateRange
      );
      return { websiteId, exportData: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to export analytics"
      );
    }
  }
);

const initialState = {
  // Website-level analytics
  websiteAnalytics: {}, // websiteId -> { data, dateRange, lastUpdated }
  dashboardSummary: {}, // websiteId -> summary data
  trafficSources: {}, // websiteId -> traffic source data

  // Real-time data
  realTimeData: {}, // websiteId -> real-time data
  realTimeRefreshInterval: null,

  // Page analytics
  pageAnalytics: {}, // pageId -> analytics data
  topPages: {}, // websiteId -> top pages data
  userFlow: {}, // websiteId -> user flow data

  // Performance data
  performanceMetrics: {}, // websiteId -> performance data

  // Events and interactions
  customEvents: {}, // websiteId -> events data
  trackedEvents: [], // Recent events for feedback

  // Visitor data
  visitorAnalytics: {}, // websiteId -> visitor data

  // UI states
  loading: {
    websiteAnalytics: false,
    realTime: false,
    pageAnalytics: false,
    trafficSources: false,
    userFlow: false,
    performance: false,
    events: false,
    visitors: false,
    export: false,
    dashboard: false,
  },

  // Error states
  error: {
    websiteAnalytics: null,
    realTime: null,
    pageAnalytics: null,
    trafficSources: null,
    userFlow: null,
    performance: null,
    events: null,
    visitors: null,
    export: null,
    dashboard: null,
  },

  // Export state
  exportData: null,
  exportStatus: null, // 'pending', 'completed', 'failed'

  // Refresh settings
  autoRefresh: {
    enabled: false,
    interval: 30000, // 30 seconds
    lastRefresh: null,
  },

  // Date range settings
  currentDateRange: "30d",
  availableDateRanges: [
    { value: "1d", label: "Last 24 hours" },
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
    { value: "365d", label: "Last year" },
    { value: "custom", label: "Custom range" },
  ],

  // Chart settings
  chartSettings: {
    theme: "light",
    animations: true,
    showGrid: true,
    showLegend: true,
  },
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    // Error management
    clearError: (state, action) => {
      const errorType = action.payload;
      if (errorType && state.error[errorType] !== undefined) {
        state.error[errorType] = null;
      } else {
        // Clear all errors
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

    // Real-time data updates
    updateRealTimeData: (state, action) => {
      const { websiteId, data } = action.payload;
      state.realTimeData[websiteId] = {
        ...state.realTimeData[websiteId],
        ...data,
        lastUpdated: Date.now(),
      };
    },

    setRealTimeRefreshInterval: (state, action) => {
      state.realTimeRefreshInterval = action.payload;
    },

    // Auto-refresh settings
    setAutoRefresh: (state, action) => {
      const { enabled, interval } = action.payload;
      state.autoRefresh.enabled = enabled;
      if (interval) {
        state.autoRefresh.interval = interval;
      }
    },

    updateLastRefresh: (state) => {
      state.autoRefresh.lastRefresh = Date.now();
    },

    // Date range management
    setDateRange: (state, action) => {
      state.currentDateRange = action.payload;
    },

    // Chart settings
    updateChartSettings: (state, action) => {
      state.chartSettings = { ...state.chartSettings, ...action.payload };
    },

    // Data management
    clearAnalyticsData: (state, action) => {
      const websiteId = action.payload;
      if (websiteId) {
        // Clear data for specific website
        delete state.websiteAnalytics[websiteId];
        delete state.realTimeData[websiteId];
        delete state.dashboardSummary[websiteId];
        delete state.trafficSources[websiteId];
        delete state.topPages[websiteId];
        delete state.userFlow[websiteId];
        delete state.performanceMetrics[websiteId];
        delete state.customEvents[websiteId];
        delete state.visitorAnalytics[websiteId];
      } else {
        // Clear all data
        state.websiteAnalytics = {};
        state.realTimeData = {};
        state.dashboardSummary = {};
        state.trafficSources = {};
        state.topPages = {};
        state.userFlow = {};
        state.performanceMetrics = {};
        state.customEvents = {};
        state.visitorAnalytics = {};
        state.pageAnalytics = {};
      }
    },

    clearPageAnalytics: (state, action) => {
      const pageId = action.payload;
      if (pageId) {
        delete state.pageAnalytics[pageId];
      } else {
        state.pageAnalytics = {};
      }
    },

    // Export management
    clearExportData: (state) => {
      state.exportData = null;
      state.exportStatus = null;
    },

    // Event tracking feedback
    addTrackedEvent: (state, action) => {
      state.trackedEvents.unshift(action.payload);
      // Keep only last 10 tracked events
      if (state.trackedEvents.length > 10) {
        state.trackedEvents = state.trackedEvents.slice(0, 10);
      }
    },

    clearTrackedEvents: (state) => {
      state.trackedEvents = [];
    },
  },

  extraReducers: (builder) => {
    builder
      // Website Analytics
      .addCase(fetchWebsiteAnalytics.pending, (state) => {
        state.loading.websiteAnalytics = true;
        state.error.websiteAnalytics = null;
      })
      .addCase(fetchWebsiteAnalytics.fulfilled, (state, action) => {
        state.loading.websiteAnalytics = false;
        const { websiteId, dateRange, data } = action.payload;
        state.websiteAnalytics[websiteId] = {
          data,
          dateRange,
          lastUpdated: Date.now(),
        };
        state.error.websiteAnalytics = null;
      })
      .addCase(fetchWebsiteAnalytics.rejected, (state, action) => {
        state.loading.websiteAnalytics = false;
        state.error.websiteAnalytics = action.payload;
      })

      // Real-time Analytics
      .addCase(fetchRealTimeAnalytics.pending, (state) => {
        state.loading.realTime = true;
        state.error.realTime = null;
      })
      .addCase(fetchRealTimeAnalytics.fulfilled, (state, action) => {
        state.loading.realTime = false;
        const { websiteId, data } = action.payload;
        state.realTimeData[websiteId] = {
          ...data,
          lastUpdated: Date.now(),
        };
        state.autoRefresh.lastRefresh = Date.now();
      })
      .addCase(fetchRealTimeAnalytics.rejected, (state, action) => {
        state.loading.realTime = false;
        state.error.realTime = action.payload;
      })

      // Traffic Sources
      .addCase(fetchTrafficSources.pending, (state) => {
        state.loading.trafficSources = true;
        state.error.trafficSources = null;
      })
      .addCase(fetchTrafficSources.fulfilled, (state, action) => {
        state.loading.trafficSources = false;
        const { websiteId, data } = action.payload;
        state.trafficSources[websiteId] = {
          data,
          lastUpdated: Date.now(),
        };
      })
      .addCase(fetchTrafficSources.rejected, (state, action) => {
        state.loading.trafficSources = false;
        state.error.trafficSources = action.payload;
      })

      // Page Analytics
      .addCase(fetchPageAnalytics.pending, (state) => {
        state.loading.pageAnalytics = true;
        state.error.pageAnalytics = null;
      })
      .addCase(fetchPageAnalytics.fulfilled, (state, action) => {
        state.loading.pageAnalytics = false;
        const { websiteId, pageId, data } = action.payload;
        state.pageAnalytics[pageId] = {
          websiteId,
          data,
          lastUpdated: Date.now(),
        };
      })
      .addCase(fetchPageAnalytics.rejected, (state, action) => {
        state.loading.pageAnalytics = false;
        state.error.pageAnalytics = action.payload;
      })

      // Top Pages
      .addCase(fetchTopPages.fulfilled, (state, action) => {
        const { websiteId, data } = action.payload;
        state.topPages[websiteId] = {
          data,
          lastUpdated: Date.now(),
        };
      })

      // User Flow
      .addCase(fetchUserFlow.pending, (state) => {
        state.loading.userFlow = true;
        state.error.userFlow = null;
      })
      .addCase(fetchUserFlow.fulfilled, (state, action) => {
        state.loading.userFlow = false;
        const { websiteId, data } = action.payload;
        state.userFlow[websiteId] = {
          data,
          lastUpdated: Date.now(),
        };
      })
      .addCase(fetchUserFlow.rejected, (state, action) => {
        state.loading.userFlow = false;
        state.error.userFlow = action.payload;
      })

      // Performance Metrics
      .addCase(fetchPerformanceMetrics.pending, (state) => {
        state.loading.performance = true;
        state.error.performance = null;
      })
      .addCase(fetchPerformanceMetrics.fulfilled, (state, action) => {
        state.loading.performance = false;
        const { websiteId, data } = action.payload;
        state.performanceMetrics[websiteId] = {
          data,
          lastUpdated: Date.now(),
        };
      })
      .addCase(fetchPerformanceMetrics.rejected, (state, action) => {
        state.loading.performance = false;
        state.error.performance = action.payload;
      })

      // Track Event
      .addCase(trackEvent.fulfilled, (state, action) => {
        const { websiteId, event } = action.payload;
        state.trackedEvents.unshift({
          websiteId,
          event,
          timestamp: Date.now(),
        });
        if (state.trackedEvents.length > 10) {
          state.trackedEvents = state.trackedEvents.slice(0, 10);
        }
      })

      // Custom Events
      .addCase(fetchCustomEvents.pending, (state) => {
        state.loading.events = true;
        state.error.events = null;
      })
      .addCase(fetchCustomEvents.fulfilled, (state, action) => {
        state.loading.events = false;
        const { websiteId, data } = action.payload;
        state.customEvents[websiteId] = {
          data,
          lastUpdated: Date.now(),
        };
      })
      .addCase(fetchCustomEvents.rejected, (state, action) => {
        state.loading.events = false;
        state.error.events = action.payload;
      })

      // Dashboard Summary
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading.dashboard = true;
        state.error.dashboard = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading.dashboard = false;
        const { websiteId, data } = action.payload;
        state.dashboardSummary[websiteId] = {
          data,
          lastUpdated: Date.now(),
        };
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading.dashboard = false;
        state.error.dashboard = action.payload;
      })

      // Visitor Analytics
      .addCase(fetchVisitorAnalytics.pending, (state) => {
        state.loading.visitors = true;
        state.error.visitors = null;
      })
      .addCase(fetchVisitorAnalytics.fulfilled, (state, action) => {
        state.loading.visitors = false;
        const { websiteId, data } = action.payload;
        state.visitorAnalytics[websiteId] = {
          data,
          lastUpdated: Date.now(),
        };
      })
      .addCase(fetchVisitorAnalytics.rejected, (state, action) => {
        state.loading.visitors = false;
        state.error.visitors = action.payload;
      })

      // Export Analytics
      .addCase(exportAnalytics.pending, (state) => {
        state.loading.export = true;
        state.error.export = null;
        state.exportStatus = "pending";
      })
      .addCase(exportAnalytics.fulfilled, (state, action) => {
        state.loading.export = false;
        state.exportData = action.payload.exportData;
        state.exportStatus = "completed";
      })
      .addCase(exportAnalytics.rejected, (state, action) => {
        state.loading.export = false;
        state.error.export = action.payload;
        state.exportStatus = "failed";
      });
  },
});

export const {
  clearError,
  clearAllErrors,
  updateRealTimeData,
  setRealTimeRefreshInterval,
  setAutoRefresh,
  updateLastRefresh,
  setDateRange,
  updateChartSettings,
  clearAnalyticsData,
  clearPageAnalytics,
  clearExportData,
  addTrackedEvent,
  clearTrackedEvents,
} = analyticsSlice.actions;

// Selectors
export const selectAnalytics = (state) => state.analytics;
export const selectWebsiteAnalytics = (state, websiteId) =>
  state.analytics.websiteAnalytics[websiteId];
export const selectRealTimeData = (state, websiteId) =>
  state.analytics.realTimeData[websiteId];
export const selectPageAnalytics = (state, pageId) =>
  state.analytics.pageAnalytics[pageId];
export const selectTrafficSources = (state, websiteId) =>
  state.analytics.trafficSources[websiteId];
export const selectTopPages = (state, websiteId) =>
  state.analytics.topPages[websiteId];
export const selectUserFlow = (state, websiteId) =>
  state.analytics.userFlow[websiteId];
export const selectPerformanceMetrics = (state, websiteId) =>
  state.analytics.performanceMetrics[websiteId];
export const selectCustomEvents = (state, websiteId) =>
  state.analytics.customEvents[websiteId];
export const selectVisitorAnalytics = (state, websiteId) =>
  state.analytics.visitorAnalytics[websiteId];
export const selectDashboardSummary = (state, websiteId) =>
  state.analytics.dashboardSummary[websiteId];
export const selectAnalyticsLoading = (state) => state.analytics.loading;
export const selectAnalyticsError = (state) => state.analytics.error;
export const selectAutoRefreshSettings = (state) => state.analytics.autoRefresh;
export const selectChartSettings = (state) => state.analytics.chartSettings;
export const selectCurrentDateRange = (state) =>
  state.analytics.currentDateRange;
export const selectExportData = (state) => state.analytics.exportData;
export const selectTrackedEvents = (state) => state.analytics.trackedEvents;

export default analyticsSlice.reducer;
