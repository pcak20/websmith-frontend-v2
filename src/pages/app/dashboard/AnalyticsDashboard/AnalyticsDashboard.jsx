import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Users,
  Eye,
  MousePointer,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Search,
  ExternalLink,
  Share2,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  Zap,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout/DashboardLayout";
import styles from "./AnalyticsDashboard.module.css";

const AnalyticsDashboard = () => {
  const { websiteId } = useParams();
  const [dateRange, setDateRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("visitors");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock analytics data - in real app this would come from API
  const analyticsData = {
    overview: {
      totalVisitors: 12547,
      totalPageViews: 34821,
      avgSessionDuration: 342, // seconds
      bounceRate: 42.3,
      conversionRate: 3.8,
      newVisitors: 8324,
      returningVisitors: 4223,
      peakConcurrentUsers: 89,
    },
    growth: {
      visitors: 15.2,
      pageViews: 22.8,
      sessionDuration: -5.1,
      bounceRate: -8.4,
      conversionRate: 12.6,
    },
    realtime: {
      activeUsers: 23,
      activePages: 7,
      topPages: [
        { page: "/", users: 8, title: "Home" },
        { page: "/services", users: 5, title: "Services" },
        { page: "/about", users: 4, title: "About Us" },
        { page: "/contact", users: 3, title: "Contact" },
        { page: "/blog", users: 3, title: "Blog" },
      ],
    },
    traffic: [
      { date: "2024-01-01", visitors: 245, pageViews: 680, sessions: 198 },
      { date: "2024-01-02", visitors: 289, pageViews: 742, sessions: 234 },
      { date: "2024-01-03", visitors: 312, pageViews: 856, sessions: 267 },
      { date: "2024-01-04", visitors: 398, pageViews: 1024, sessions: 321 },
      { date: "2024-01-05", visitors: 445, pageViews: 1156, sessions: 378 },
      { date: "2024-01-06", users: 523, pageViews: 1342, sessions: 445 },
      { date: "2024-01-07", visitors: 467, pageViews: 1198, sessions: 398 },
    ],
    devices: {
      desktop: 58.4,
      mobile: 34.2,
      tablet: 7.4,
    },
    browsers: [
      { name: "Chrome", percentage: 67.8, users: 8514 },
      { name: "Safari", percentage: 18.2, users: 2283 },
      { name: "Firefox", percentage: 8.9, users: 1117 },
      { name: "Edge", percentage: 3.7, users: 464 },
      { name: "Opera", percentage: 1.4, users: 176 },
    ],
    countries: [
      { country: "United States", users: 4523, percentage: 36.1 },
      { country: "United Kingdom", users: 2156, percentage: 17.2 },
      { country: "Canada", users: 1834, percentage: 14.6 },
      { country: "Australia", users: 1245, percentage: 9.9 },
      { country: "Germany", users: 987, percentage: 7.9 },
      { country: "France", users: 756, percentage: 6.0 },
      { country: "Other", users: 1046, percentage: 8.3 },
    ],
    pages: [
      {
        page: "/",
        title: "Home",
        views: 8945,
        uniqueViews: 6234,
        avgTime: 245,
        bounceRate: 35.2,
      },
      {
        page: "/services",
        title: "Services",
        views: 5432,
        uniqueViews: 4123,
        avgTime: 312,
        bounceRate: 28.7,
      },
      {
        page: "/about",
        title: "About Us",
        views: 3456,
        uniqueViews: 2987,
        avgTime: 198,
        bounceRate: 45.6,
      },
      {
        page: "/contact",
        title: "Contact",
        views: 2341,
        uniqueViews: 2156,
        avgTime: 156,
        bounceRate: 52.3,
      },
      {
        page: "/blog",
        title: "Blog",
        views: 1987,
        uniqueViews: 1745,
        avgTime: 387,
        bounceRate: 31.4,
      },
    ],
    referrers: [
      { source: "Google", visits: 5634, percentage: 44.9 },
      { source: "Direct", visits: 3421, percentage: 27.3 },
      { source: "Facebook", visits: 1567, percentage: 12.5 },
      { source: "Twitter", visits: 987, percentage: 7.9 },
      { source: "LinkedIn", visits: 534, percentage: 4.3 },
      { source: "Other", visits: 404, percentage: 3.1 },
    ],
    goals: [
      {
        name: "Newsletter Signup",
        completions: 234,
        conversionRate: 1.86,
        value: 2340,
      },
      {
        name: "Contact Form",
        completions: 189,
        conversionRate: 1.51,
        value: 18900,
      },
      {
        name: "Download Brochure",
        completions: 156,
        conversionRate: 1.24,
        value: 1560,
      },
      {
        name: "Phone Call Click",
        completions: 98,
        conversionRate: 0.78,
        value: 9800,
      },
    ],
  };

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 1000);
  }, [dateRange]);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const formatNumber = (number) => {
    if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
    if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
    return number.toLocaleString();
  };

  const getGrowthIcon = (growth) => {
    if (growth > 0)
      return <ArrowUp className={styles.growthPositive} size={16} />;
    if (growth < 0)
      return <ArrowDown className={styles.growthNegative} size={16} />;
    return <ArrowUp className={styles.growthNeutral} size={16} />;
  };

  const getGrowthClass = (growth) => {
    if (growth > 0) return styles.growthPositive;
    if (growth < 0) return styles.growthNegative;
    return styles.growthNeutral;
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 800);
  };

  const handleExport = () => {
    // Simulate export functionality
    console.log("Exporting analytics data...");
  };

  return (
    <DashboardLayout activePage="analytics">
      <div className={styles.analyticsDashboard}>
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <div className={styles.headerLeft}>
            <h1>Analytics Dashboard</h1>
            <p className={styles.headerSubtitle}>
              Website performance insights and metrics
            </p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.headerControls}>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className={styles.dateRangeSelect}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="365d">Last year</option>
              </select>
              <button className={styles.refreshBtn} onClick={handleRefresh}>
                <RefreshCw size={16} />
                Refresh
              </button>
              <button className={styles.exportBtn} onClick={handleExport}>
                <Download size={16} />
                Export
              </button>
            </div>
            <div className={styles.lastUpdated}>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className={styles.realtimeSection}>
          <div className={styles.sectionHeader}>
            <h2>Real-time Overview</h2>
            <div className={styles.liveIndicator}>
              <div className={styles.liveDot}></div>
              <span>Live</span>
            </div>
          </div>
          <div className={styles.realtimeGrid}>
            <div className={styles.realtimeCard}>
              <div className={styles.realtimeNumber}>
                {analyticsData.realtime.activeUsers}
              </div>
              <div className={styles.realtimeLabel}>Active Users</div>
            </div>
            <div className={styles.realtimeCard}>
              <div className={styles.realtimeNumber}>
                {analyticsData.realtime.activePages}
              </div>
              <div className={styles.realtimeLabel}>Pages Being Viewed</div>
            </div>
            <div className={styles.realtimeCard}>
              <div className={styles.realtimeNumber}>
                {analyticsData.overview.peakConcurrentUsers}
              </div>
              <div className={styles.realtimeLabel}>Peak Concurrent Users</div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className={styles.metricsSection}>
          <div className={styles.sectionHeader}>
            <h2>Key Metrics</h2>
            <div className={styles.metricsFilter}>
              <button
                className={`${styles.filterBtn} ${
                  selectedMetric === "visitors" ? styles.active : ""
                }`}
                onClick={() => setSelectedMetric("visitors")}
              >
                Visitors
              </button>
              <button
                className={`${styles.filterBtn} ${
                  selectedMetric === "pageViews" ? styles.active : ""
                }`}
                onClick={() => setSelectedMetric("pageViews")}
              >
                Page Views
              </button>
              <button
                className={`${styles.filterBtn} ${
                  selectedMetric === "sessions" ? styles.active : ""
                }`}
                onClick={() => setSelectedMetric("sessions")}
              >
                Sessions
              </button>
            </div>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricIcon}>
                  <Users size={24} />
                </div>
                <div className={styles.metricGrowth}>
                  {getGrowthIcon(analyticsData.growth.visitors)}
                  <span
                    className={getGrowthClass(analyticsData.growth.visitors)}
                  >
                    {Math.abs(analyticsData.growth.visitors)}%
                  </span>
                </div>
              </div>
              <div className={styles.metricNumber}>
                {formatNumber(analyticsData.overview.totalVisitors)}
              </div>
              <div className={styles.metricLabel}>Total Visitors</div>
              <div className={styles.metricDetail}>
                {formatNumber(analyticsData.overview.newVisitors)} new,{" "}
                {formatNumber(analyticsData.overview.returningVisitors)}{" "}
                returning
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricIcon}>
                  <Eye size={24} />
                </div>
                <div className={styles.metricGrowth}>
                  {getGrowthIcon(analyticsData.growth.pageViews)}
                  <span
                    className={getGrowthClass(analyticsData.growth.pageViews)}
                  >
                    {Math.abs(analyticsData.growth.pageViews)}%
                  </span>
                </div>
              </div>
              <div className={styles.metricNumber}>
                {formatNumber(analyticsData.overview.totalPageViews)}
              </div>
              <div className={styles.metricLabel}>Page Views</div>
              <div className={styles.metricDetail}>
                {(
                  analyticsData.overview.totalPageViews /
                  analyticsData.overview.totalVisitors
                ).toFixed(1)}{" "}
                pages per visitor
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricIcon}>
                  <Clock size={24} />
                </div>
                <div className={styles.metricGrowth}>
                  {getGrowthIcon(analyticsData.growth.sessionDuration)}
                  <span
                    className={getGrowthClass(
                      analyticsData.growth.sessionDuration
                    )}
                  >
                    {Math.abs(analyticsData.growth.sessionDuration)}%
                  </span>
                </div>
              </div>
              <div className={styles.metricNumber}>
                {formatDuration(analyticsData.overview.avgSessionDuration)}
              </div>
              <div className={styles.metricLabel}>Avg. Session Duration</div>
              <div className={styles.metricDetail}>Time spent per visit</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricIcon}>
                  <TrendingUp size={24} />
                </div>
                <div className={styles.metricGrowth}>
                  {getGrowthIcon(analyticsData.growth.bounceRate)}
                  <span
                    className={getGrowthClass(-analyticsData.growth.bounceRate)}
                  >
                    {Math.abs(analyticsData.growth.bounceRate)}%
                  </span>
                </div>
              </div>
              <div className={styles.metricNumber}>
                {analyticsData.overview.bounceRate}%
              </div>
              <div className={styles.metricLabel}>Bounce Rate</div>
              <div className={styles.metricDetail}>Single-page sessions</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricIcon}>
                  <Target size={24} />
                </div>
                <div className={styles.metricGrowth}>
                  {getGrowthIcon(analyticsData.growth.conversionRate)}
                  <span
                    className={getGrowthClass(
                      analyticsData.growth.conversionRate
                    )}
                  >
                    {Math.abs(analyticsData.growth.conversionRate)}%
                  </span>
                </div>
              </div>
              <div className={styles.metricNumber}>
                {analyticsData.overview.conversionRate}%
              </div>
              <div className={styles.metricLabel}>Conversion Rate</div>
              <div className={styles.metricDetail}>Goal completions</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className={styles.chartsSection}>
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <h3>Traffic Over Time</h3>
              <div className={styles.chartLegend}>
                <div className={styles.legendItem}>
                  <div
                    className={styles.legendColor}
                    style={{ backgroundColor: "#667eea" }}
                  ></div>
                  <span>Visitors</span>
                </div>
                <div className={styles.legendItem}>
                  <div
                    className={styles.legendColor}
                    style={{ backgroundColor: "#764ba2" }}
                  ></div>
                  <span>Page Views</span>
                </div>
              </div>
            </div>
            <div className={styles.chartArea}>
              <div className={styles.chartPlaceholder}>
                <BarChart3 size={48} />
                <p>Interactive traffic chart would appear here</p>
                <div className={styles.mockChart}>
                  {analyticsData.traffic.map((day, index) => (
                    <div
                      key={index}
                      className={styles.chartBar}
                      style={{ height: `${(day.visitors / 600) * 100}%` }}
                      title={`${day.visitors} visitors on ${day.date}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
              <h3>Device Breakdown</h3>
            </div>
            <div className={styles.deviceStats}>
              <div className={styles.deviceItem}>
                <div className={styles.deviceIcon}>
                  <Monitor size={20} />
                </div>
                <div className={styles.deviceInfo}>
                  <div className={styles.deviceName}>Desktop</div>
                  <div className={styles.devicePercentage}>
                    {analyticsData.devices.desktop}%
                  </div>
                </div>
                <div className={styles.deviceBar}>
                  <div
                    className={styles.deviceProgress}
                    style={{ width: `${analyticsData.devices.desktop}%` }}
                  ></div>
                </div>
              </div>
              <div className={styles.deviceItem}>
                <div className={styles.deviceIcon}>
                  <Smartphone size={20} />
                </div>
                <div className={styles.deviceInfo}>
                  <div className={styles.deviceName}>Mobile</div>
                  <div className={styles.devicePercentage}>
                    {analyticsData.devices.mobile}%
                  </div>
                </div>
                <div className={styles.deviceBar}>
                  <div
                    className={styles.deviceProgress}
                    style={{ width: `${analyticsData.devices.mobile}%` }}
                  ></div>
                </div>
              </div>
              <div className={styles.deviceItem}>
                <div className={styles.deviceIcon}>
                  <Tablet size={20} />
                </div>
                <div className={styles.deviceInfo}>
                  <div className={styles.deviceName}>Tablet</div>
                  <div className={styles.devicePercentage}>
                    {analyticsData.devices.tablet}%
                  </div>
                </div>
                <div className={styles.deviceBar}>
                  <div
                    className={styles.deviceProgress}
                    style={{ width: `${analyticsData.devices.tablet}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className={styles.detailsSection}>
          {/* Top Pages */}
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <h3>Top Pages</h3>
              <button className={styles.detailAction}>
                <ExternalLink size={16} />
                View All
              </button>
            </div>
            <div className={styles.pagesTable}>
              <div className={styles.tableHeader}>
                <span>Page</span>
                <span>Views</span>
                <span>Unique Views</span>
                <span>Avg. Time</span>
                <span>Bounce Rate</span>
              </div>
              {analyticsData.pages.map((page, index) => (
                <div key={index} className={styles.tableRow}>
                  <div className={styles.pageInfo}>
                    <div className={styles.pagePath}>{page.page}</div>
                    <div className={styles.pageTitle}>{page.title}</div>
                  </div>
                  <span>{formatNumber(page.views)}</span>
                  <span>{formatNumber(page.uniqueViews)}</span>
                  <span>{formatDuration(page.avgTime)}</span>
                  <span
                    className={
                      page.bounceRate > 50
                        ? styles.highBounce
                        : styles.lowBounce
                    }
                  >
                    {page.bounceRate}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <h3>Traffic Sources</h3>
              <button className={styles.detailAction}>
                <Share2 size={16} />
                Details
              </button>
            </div>
            <div className={styles.sourcesChart}>
              {analyticsData.referrers.map((source, index) => (
                <div key={index} className={styles.sourceItem}>
                  <div className={styles.sourceInfo}>
                    <div className={styles.sourceName}>{source.source}</div>
                    <div className={styles.sourceStats}>
                      {formatNumber(source.visits)} visits ({source.percentage}
                      %)
                    </div>
                  </div>
                  <div className={styles.sourceBar}>
                    <div
                      className={styles.sourceProgress}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Data */}
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <h3>Geographic Distribution</h3>
              <button className={styles.detailAction}>
                <MapPin size={16} />
                Map View
              </button>
            </div>
            <div className={styles.countriesList}>
              {analyticsData.countries.map((country, index) => (
                <div key={index} className={styles.countryItem}>
                  <div className={styles.countryInfo}>
                    <div className={styles.countryName}>{country.country}</div>
                    <div className={styles.countryStats}>
                      {formatNumber(country.users)} users ({country.percentage}
                      %)
                    </div>
                  </div>
                  <div className={styles.countryBar}>
                    <div
                      className={styles.countryProgress}
                      style={{ width: `${country.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals & Conversions */}
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <h3>Goals & Conversions</h3>
              <button className={styles.detailAction}>
                <Target size={16} />
                Manage Goals
              </button>
            </div>
            <div className={styles.goalsTable}>
              {analyticsData.goals.map((goal, index) => (
                <div key={index} className={styles.goalItem}>
                  <div className={styles.goalInfo}>
                    <div className={styles.goalName}>{goal.name}</div>
                    <div className={styles.goalStats}>
                      {goal.completions} completions • {goal.conversionRate}%
                      rate
                    </div>
                  </div>
                  <div className={styles.goalValue}>
                    ${formatNumber(goal.value)}
                  </div>
                  <div className={styles.goalRate}>{goal.conversionRate}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Browser Stats */}
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <h3>Browsers</h3>
            </div>
            <div className={styles.browsersList}>
              {analyticsData.browsers.map((browser, index) => (
                <div key={index} className={styles.browserItem}>
                  <div className={styles.browserInfo}>
                    <div className={styles.browserName}>{browser.name}</div>
                    <div className={styles.browserStats}>
                      {formatNumber(browser.users)} users ({browser.percentage}
                      %)
                    </div>
                  </div>
                  <div className={styles.browserBar}>
                    <div
                      className={styles.browserProgress}
                      style={{ width: `${browser.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Pages */}
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <h3>Currently Active Pages</h3>
              <div className={styles.liveIndicator}>
                <div className={styles.liveDot}></div>
                <span>Live</span>
              </div>
            </div>
            <div className={styles.activePagesList}>
              {analyticsData.realtime.topPages.map((page, index) => (
                <div key={index} className={styles.activePageItem}>
                  <div className={styles.activePageInfo}>
                    <div className={styles.activePageTitle}>{page.title}</div>
                    <div className={styles.activePagePath}>{page.page}</div>
                  </div>
                  <div className={styles.activePageUsers}>
                    <Activity size={16} />
                    {page.users} users
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}>
              <Zap size={24} />
              <span>Loading analytics data...</span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsDashboard;
