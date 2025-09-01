// store/api/analyticsAPI.js
import { createApiClient, API_CONFIG } from "./config";
import { setupInterceptors } from "./interceptors";

const analyticsClient = createApiClient(`${API_CONFIG.BASE_URL}/analytics`);

// Setup all interceptors for authenticated endpoints
setupInterceptors(analyticsClient, { includeAuth: true, includeRetry: true });

export const analyticsAPI = {
  // Website analytics
  getWebsiteAnalytics: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/`, {
      params: { date_range: dateRange },
    }),

  getRealTimeAnalytics: (websiteId) =>
    analyticsClient.get(`/websites/${websiteId}/realtime/`),

  getTrafficSources: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/traffic-sources/`, {
      params: { date_range: dateRange },
    }),

  // Page analytics
  getPageAnalytics: (websiteId, pageId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/pages/${pageId}/`, {
      params: { date_range: dateRange },
    }),

  getTopPages: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/top-pages/`, {
      params: { date_range: dateRange },
    }),

  // User behavior
  getUserFlow: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/user-flow/`, {
      params: { date_range: dateRange },
    }),

  getHeatmap: (websiteId, pageId) =>
    analyticsClient.get(`/websites/${websiteId}/pages/${pageId}/heatmap/`),

  // Performance metrics
  getPerformanceMetrics: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/performance/`, {
      params: { date_range: dateRange },
    }),

  // Custom events
  trackEvent: (websiteId, eventData) =>
    analyticsClient.post(`/websites/${websiteId}/events/`, eventData),

  getCustomEvents: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/events/`, {
      params: { date_range: dateRange },
    }),

  // Export data
  exportAnalytics: (websiteId, format = "csv", dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/export/`, {
      params: { format, date_range: dateRange },
      responseType: "blob",
    }),

  // Dashboard summary
  getDashboardSummary: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/summary/`, {
      params: { date_range: dateRange },
    }),

  // Visitor analytics
  getVisitorAnalytics: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/visitors/`, {
      params: { date_range: dateRange },
    }),

  getDeviceAnalytics: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/devices/`, {
      params: { date_range: dateRange },
    }),

  getBrowserAnalytics: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/browsers/`, {
      params: { date_range: dateRange },
    }),

  getLocationAnalytics: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/locations/`, {
      params: { date_range: dateRange },
    }),

  // Conversion tracking
  getConversions: (websiteId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/conversions/`, {
      params: { date_range: dateRange },
    }),

  getFunnelAnalysis: (websiteId, funnelId, dateRange = "30d") =>
    analyticsClient.get(`/websites/${websiteId}/funnels/${funnelId}/`, {
      params: { date_range: dateRange },
    }),

  // Goals and objectives
  getGoals: (websiteId) => analyticsClient.get(`/websites/${websiteId}/goals/`),

  createGoal: (websiteId, goalData) =>
    analyticsClient.post(`/websites/${websiteId}/goals/`, goalData),

  updateGoal: (websiteId, goalId, goalData) =>
    analyticsClient.put(`/websites/${websiteId}/goals/${goalId}/`, goalData),

  deleteGoal: (websiteId, goalId) =>
    analyticsClient.delete(`/websites/${websiteId}/goals/${goalId}/`),

  // Segments
  getSegments: (websiteId) =>
    analyticsClient.get(`/websites/${websiteId}/segments/`),

  createSegment: (websiteId, segmentData) =>
    analyticsClient.post(`/websites/${websiteId}/segments/`, segmentData),

  getSegmentAnalytics: (websiteId, segmentId, dateRange = "30d") =>
    analyticsClient.get(
      `/websites/${websiteId}/segments/${segmentId}/analytics/`,
      {
        params: { date_range: dateRange },
      }
    ),

  // Alerts and notifications
  getAlerts: (websiteId) =>
    analyticsClient.get(`/websites/${websiteId}/alerts/`),

  createAlert: (websiteId, alertData) =>
    analyticsClient.post(`/websites/${websiteId}/alerts/`, alertData),

  updateAlert: (websiteId, alertId, alertData) =>
    analyticsClient.put(`/websites/${websiteId}/alerts/${alertId}/`, alertData),

  deleteAlert: (websiteId, alertId) =>
    analyticsClient.delete(`/websites/${websiteId}/alerts/${alertId}/`),

  // Reports
  getReports: (websiteId) =>
    analyticsClient.get(`/websites/${websiteId}/reports/`),

  generateReport: (websiteId, reportConfig) =>
    analyticsClient.post(
      `/websites/${websiteId}/reports/generate/`,
      reportConfig
    ),

  scheduleReport: (websiteId, reportData) =>
    analyticsClient.post(
      `/websites/${websiteId}/reports/schedule/`,
      reportData
    ),

  // Data retention and cleanup
  getDataRetentionSettings: (websiteId) =>
    analyticsClient.get(`/websites/${websiteId}/retention/`),

  updateDataRetentionSettings: (websiteId, settings) =>
    analyticsClient.put(`/websites/${websiteId}/retention/`, settings),
};

// Export individual functions for tree-shaking
export const {
  getWebsiteAnalytics,
  getRealTimeAnalytics,
  getTrafficSources,
  getPageAnalytics,
  getTopPages,
  getUserFlow,
  getHeatmap,
  getPerformanceMetrics,
  trackEvent,
  getCustomEvents,
  exportAnalytics,
  getDashboardSummary,
  getVisitorAnalytics,
  getDeviceAnalytics,
  getBrowserAnalytics,
  getLocationAnalytics,
  getConversions,
  getFunnelAnalysis,
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getSegments,
  createSegment,
  getSegmentAnalytics,
  getAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
  getReports,
  generateReport,
  scheduleReport,
  getDataRetentionSettings,
  updateDataRetentionSettings,
} = analyticsAPI;

export default analyticsAPI;
