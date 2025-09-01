import React from "react";
import {
  Users,
  MousePointer,
  Clock,
  TrendingUp,
  Eye,
  BarChart3,
  RefreshCw,
  Calendar,
  Globe,
} from "lucide-react";
import StatCard from "../../UI/StatCard/StatCard";
import LoadingState from "../../UI/LoadingState/LoadingState";
import ErrorState from "../../UI/ErrorState/ErrorState";
import Button from "../../UI/Button/Button";
import styles from "./BusinessAnalytics.module.css";

const BusinessAnalytics = ({
  business,
  analytics,
  loading,
  error,
  onRefresh,
}) => {
  if (loading) {
    return <LoadingState message="Loading analytics..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error loading analytics"
        message={error}
        onRetry={onRefresh}
      />
    );
  }

  return (
    <div className={styles.analyticsContent}>
      <div className={styles.analyticsHeader}>
        <h3>Analytics Overview</h3>
        <Button
          variant="outline"
          icon={RefreshCw}
          onClick={onRefresh}
          size="small"
        >
          Refresh
        </Button>
      </div>

      <div className={styles.analyticsGrid}>
        {/* Overview Stats */}
        <div className={styles.section}>
          <h4>Traffic Overview</h4>
          <div className={styles.analyticsStats}>
            <StatCard
              icon={Users}
              title="Total Visitors"
              value={analytics?.total_visitors?.toLocaleString() || "0"}
              subtitle="All time"
              color="primary"
            />
            <StatCard
              icon={Eye}
              title="Page Views"
              value={analytics?.total_page_views?.toLocaleString() || "0"}
              subtitle="All time"
              color="success"
            />
            <StatCard
              icon={Clock}
              title="Avg. Session"
              value={analytics?.avg_session_duration || "0s"}
              subtitle="Time on site"
              color="warning"
            />
            <StatCard
              icon={TrendingUp}
              title="Bounce Rate"
              value={`${analytics?.bounce_rate || "0"}%`}
              subtitle="Single page visits"
              color="danger"
            />
          </div>
        </div>

        {/* Real-time Activity */}
        <div className={styles.section}>
          <h4>Real-time Activity</h4>
          <div className={styles.realtimeData}>
            <div className={styles.realtimeHeader}>
              <div className={styles.activeUsers}>
                <div className={styles.activeIndicator}></div>
                <span>
                  {analytics?.realtime?.active_users || 0} users online now
                </span>
              </div>
              <span className={styles.timestamp}>
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>

            {analytics?.realtime?.top_pages?.length > 0 && (
              <div className={styles.topPagesRealtime}>
                <h5>Currently Viewing</h5>
                {analytics.realtime.top_pages.map((page, index) => (
                  <div key={index} className={styles.realtimePage}>
                    <span className={styles.pagePath}>{page.page}</span>
                    <span className={styles.pageUsers}>{page.users} users</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className={styles.section}>
        <h4>Top Pages</h4>
        <div className={styles.topPages}>
          {analytics?.top_pages?.length > 0 ? (
            analytics.top_pages.map((page, index) => (
              <div key={index} className={styles.pageItem}>
                <div className={styles.pageRank}>{index + 1}</div>
                <div className={styles.pageName}>{page.page}</div>
                <div className={styles.pageViews}>
                  {page.views?.toLocaleString() || "0"} views
                </div>
                <div className={styles.pagePercentage}>
                  {page.percentage || 0}%
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noData}>
              <BarChart3 size={48} className={styles.noDataIcon} />
              <p>No page data available yet</p>
              <p className={styles.noDataSubtext}>
                Data will appear here once your websites receive traffic
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Traffic Sources */}
      {analytics?.traffic_sources && (
        <div className={styles.section}>
          <h4>Traffic Sources</h4>
          <div className={styles.trafficSources}>
            {Object.entries(analytics.traffic_sources).map(([source, data]) => (
              <div key={source} className={styles.sourceItem}>
                <div className={styles.sourceName}>{source}</div>
                <div className={styles.sourceStats}>
                  <span className={styles.sourceVisitors}>
                    {data.visitors?.toLocaleString() || "0"} visitors
                  </span>
                  <span className={styles.sourcePercentage}>
                    {data.percentage || 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      {analytics?.performance && (
        <div className={styles.section}>
          <h4>Performance Metrics</h4>
          <div className={styles.performanceGrid}>
            <div className={styles.performanceCard}>
              <div className={styles.performanceHeader}>
                <Globe size={20} />
                <span>Average Load Time</span>
              </div>
              <div className={styles.performanceValue}>
                {analytics.performance.avg_load_time || "N/A"}
              </div>
            </div>

            <div className={styles.performanceCard}>
              <div className={styles.performanceHeader}>
                <TrendingUp size={20} />
                <span>Core Web Vitals</span>
              </div>
              <div className={styles.performanceValue}>
                {analytics.performance.core_web_vitals_score || "N/A"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Period Selector */}
      <div className={styles.timePeriodSelector}>
        <Button variant="outline" size="small">
          <Calendar size={14} />
          Last 7 days
        </Button>
        <Button variant="ghost" size="small">
          Last 30 days
        </Button>
        <Button variant="ghost" size="small">
          Last 3 months
        </Button>
        <Button variant="ghost" size="small">
          Last year
        </Button>
      </div>
    </div>
  );
};

export default BusinessAnalytics;
