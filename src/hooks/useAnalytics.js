// ================================
// hooks/useAnalytics.js
// ================================
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import {
  fetchWebsiteAnalytics,
  fetchRealTimeAnalytics,
  fetchTrafficSources,
  fetchPageAnalytics,
  fetchTopPages,
  fetchDashboardSummary,
  fetchVisitorAnalytics,
  exportAnalytics,
  setAutoRefresh,
  updateLastRefresh,
  setDateRange,
  clearError,
  selectAnalytics,
  selectWebsiteAnalytics,
  selectRealTimeData,
  selectTrafficSources,
  selectDashboardSummary,
  selectAnalyticsLoading,
  selectAnalyticsError,
  selectAutoRefreshSettings,
  selectCurrentDateRange,
} from "../store/slices/analyticsSlice";

export const useAnalytics = (websiteId, options = {}) => {
  const {
    autoRefresh = false,
    refreshInterval = 30000,
    dateRange = "30d",
  } = options;

  const dispatch = useDispatch();
  const intervalRef = useRef(null);

  const analyticsState = useSelector(selectAnalytics);
  const websiteAnalytics = useSelector((state) =>
    selectWebsiteAnalytics(state, websiteId)
  );
  const realTimeData = useSelector((state) =>
    selectRealTimeData(state, websiteId)
  );
  const trafficSources = useSelector((state) =>
    selectTrafficSources(state, websiteId)
  );
  const dashboardSummary = useSelector((state) =>
    selectDashboardSummary(state, websiteId)
  );
  const loading = useSelector(selectAnalyticsLoading);
  const error = useSelector(selectAnalyticsError);
  const autoRefreshSettings = useSelector(selectAutoRefreshSettings);
  const currentDateRange = useSelector(selectCurrentDateRange);

  // Setup auto-refresh for real-time data
  useEffect(() => {
    if (autoRefresh && websiteId) {
      intervalRef.current = setInterval(() => {
        dispatch(fetchRealTimeAnalytics(websiteId));
        dispatch(updateLastRefresh());
      }, refreshInterval);

      // Initial fetch
      dispatch(fetchRealTimeAnalytics(websiteId));

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoRefresh, websiteId, refreshInterval, dispatch]);

  const getWebsiteAnalytics = async (dateRangeParam = dateRange) => {
    if (!websiteId) return;
    const result = await dispatch(
      fetchWebsiteAnalytics({ websiteId, dateRange: dateRangeParam })
    );
    return result;
  };

  const getRealTimeAnalytics = async () => {
    if (!websiteId) return;
    const result = await dispatch(fetchRealTimeAnalytics(websiteId));
    return result;
  };

  const getTrafficSources = async (dateRangeParam = dateRange) => {
    if (!websiteId) return;
    const result = await dispatch(
      fetchTrafficSources({ websiteId, dateRange: dateRangeParam })
    );
    return result;
  };

  const getPageAnalytics = async (pageId, dateRangeParam = dateRange) => {
    if (!websiteId || !pageId) return;
    const result = await dispatch(
      fetchPageAnalytics({ websiteId, pageId, dateRange: dateRangeParam })
    );
    return result;
  };

  const getTopPages = async (dateRangeParam = dateRange) => {
    if (!websiteId) return;
    const result = await dispatch(
      fetchTopPages({ websiteId, dateRange: dateRangeParam })
    );
    return result;
  };

  const getDashboardSummary = async (dateRangeParam = dateRange) => {
    if (!websiteId) return;
    const result = await dispatch(
      fetchDashboardSummary({ websiteId, dateRange: dateRangeParam })
    );
    return result;
  };

  const getVisitorAnalytics = async (dateRangeParam = dateRange) => {
    if (!websiteId) return;
    const result = await dispatch(
      fetchVisitorAnalytics({ websiteId, dateRange: dateRangeParam })
    );
    return result;
  };

  const exportData = async (format = "csv", dateRangeParam = dateRange) => {
    if (!websiteId) return;
    const result = await dispatch(
      exportAnalytics({ websiteId, format, dateRange: dateRangeParam })
    );
    return result;
  };

  const toggleAutoRefresh = (enabled, interval = refreshInterval) => {
    dispatch(setAutoRefresh({ enabled, interval }));
  };

  const changeDateRange = (newDateRange) => {
    dispatch(setDateRange(newDateRange));
  };

  const clearAnalyticsError = (errorType) => {
    dispatch(clearError(errorType));
  };

  const refreshAllData = async (dateRangeParam = currentDateRange) => {
    if (!websiteId) return;

    const promises = [
      getWebsiteAnalytics(dateRangeParam),
      getRealTimeAnalytics(),
      getTrafficSources(dateRangeParam),
      getDashboardSummary(dateRangeParam),
      getVisitorAnalytics(dateRangeParam),
    ];

    const results = await Promise.allSettled(promises);
    return results;
  };

  return {
    // State
    analyticsState,
    websiteAnalytics,
    realTimeData,
    trafficSources,
    dashboardSummary,
    loading,
    error,
    autoRefreshSettings,
    currentDateRange,
    websiteId,

    // Actions
    fetchWebsiteAnalytics: getWebsiteAnalytics,
    fetchRealTimeAnalytics: getRealTimeAnalytics,
    fetchTrafficSources: getTrafficSources,
    fetchPageAnalytics: getPageAnalytics,
    fetchTopPages: getTopPages,
    fetchDashboardSummary: getDashboardSummary,
    fetchVisitorAnalytics: getVisitorAnalytics,
    exportAnalytics: exportData,
    toggleAutoRefresh,
    setDateRange: changeDateRange,
    clearError: clearAnalyticsError,
    refreshAllData,
  };
};
