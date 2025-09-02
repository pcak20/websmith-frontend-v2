import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Grid,
  List,
  Plus,
  Eye,
  Edit3,
  Settings,
  MoreVertical,
  Globe,
  Users,
  MousePointer,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  Copy,
  Trash2,
  ExternalLink,
  BarChart3,
  Zap,
  Shield,
  Star,
  Download,
  Share2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Layers,
  Building,
} from "lucide-react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout/DashboardLayout";
import styles from "./AllWebsitesDashboard.module.css";

const AllWebsitesDashboard = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [selectedWebsites, setSelectedWebsites] = useState(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock websites data
  const websites = [
    {
      id: 1,
      name: "Pizza Palace Main Site",
      businessName: "Pizza Palace",
      businessId: "biz-1",
      template: "Restaurant Pro",
      status: "published",
      url: "pizzapalace.webcraft.com",
      customDomain: "www.pizzapalace.com",
      visitors: 2847,
      pageViews: 8921,
      conversionRate: 4.2,
      lastModified: "2 hours ago",
      publishedAt: "2024-01-15T10:30:00Z",
      createdAt: "2024-01-01T09:00:00Z",
      performance: 94,
      sslEnabled: true,
      backupsCount: 5,
      pagesCount: 8,
      thumbnailColor: "#ff6b35",
    },
    {
      id: 2,
      name: "Corporate Website",
      businessName: "TechCorp Solutions",
      businessId: "biz-2",
      template: "Modern Business",
      status: "published",
      url: "techcorp.webcraft.com",
      customDomain: "www.techcorp.com",
      visitors: 5234,
      pageViews: 15847,
      conversionRate: 3.8,
      lastModified: "1 day ago",
      publishedAt: "2024-01-12T14:20:00Z",
      createdAt: "2023-12-15T11:00:00Z",
      performance: 98,
      sslEnabled: true,
      backupsCount: 12,
      pagesCount: 15,
      thumbnailColor: "#667eea",
    },
    {
      id: 3,
      name: "Portfolio Site",
      businessName: "Creative Studio",
      businessId: "biz-3",
      template: "Creative Portfolio",
      status: "draft",
      url: "creative.webcraft.com",
      customDomain: null,
      visitors: 0,
      pageViews: 0,
      conversionRate: 0,
      lastModified: "3 days ago",
      publishedAt: null,
      createdAt: "2024-01-10T16:45:00Z",
      performance: 0,
      sslEnabled: false,
      backupsCount: 2,
      pagesCount: 6,
      thumbnailColor: "#8b5cf6",
    },
    {
      id: 4,
      name: "Online Store",
      businessName: "Fashion Boutique",
      businessId: "biz-4",
      template: "E-commerce Pro",
      status: "published",
      url: "fashionboutique.webcraft.com",
      customDomain: "shop.fashionboutique.com",
      visitors: 3921,
      pageViews: 12456,
      conversionRate: 5.7,
      lastModified: "5 hours ago",
      publishedAt: "2024-01-18T08:15:00Z",
      createdAt: "2024-01-05T13:30:00Z",
      performance: 91,
      sslEnabled: true,
      backupsCount: 8,
      pagesCount: 22,
      thumbnailColor: "#f59e0b",
    },
    {
      id: 5,
      name: "Music Studio Site",
      businessName: "Sound Waves Studio",
      businessId: "biz-5",
      template: "Music Studio",
      status: "maintenance",
      url: "soundwaves.webcraft.com",
      customDomain: "www.soundwavesstudio.com",
      visitors: 1456,
      pageViews: 4892,
      conversionRate: 2.1,
      lastModified: "1 week ago",
      publishedAt: "2024-01-08T12:00:00Z",
      createdAt: "2023-12-20T10:00:00Z",
      performance: 87,
      sslEnabled: true,
      backupsCount: 6,
      pagesCount: 12,
      thumbnailColor: "#7c3aed",
    },
    {
      id: 6,
      name: "Travel Agency",
      businessName: "Adventure Tours",
      businessId: "biz-6",
      template: "Travel Agency",
      status: "published",
      url: "adventure.webcraft.com",
      customDomain: "www.adventuretours.travel",
      visitors: 6789,
      pageViews: 23145,
      conversionRate: 6.3,
      lastModified: "4 hours ago",
      publishedAt: "2024-01-16T09:45:00Z",
      createdAt: "2023-11-28T14:20:00Z",
      performance: 96,
      sslEnabled: true,
      backupsCount: 15,
      pagesCount: 28,
      thumbnailColor: "#0ea5e9",
    },
  ];

  const [filteredWebsites, setFilteredWebsites] = useState(websites);
  const [dashboardStats, setDashboardStats] = useState({
    totalWebsites: 0,
    publishedWebsites: 0,
    draftWebsites: 0,
    totalVisitors: 0,
    totalPageViews: 0,
    avgConversionRate: 0,
  });

  useEffect(() => {
    calculateStats();
    filterWebsites();
  }, [searchTerm, selectedFilter, sortBy]);

  const calculateStats = () => {
    const stats = {
      totalWebsites: websites.length,
      publishedWebsites: websites.filter((w) => w.status === "published")
        .length,
      draftWebsites: websites.filter((w) => w.status === "draft").length,
      totalVisitors: websites.reduce((sum, w) => sum + w.visitors, 0),
      totalPageViews: websites.reduce((sum, w) => sum + w.pageViews, 0),
      avgConversionRate: websites
        .filter((w) => w.status === "published")
        .reduce((sum, w, _, arr) => sum + w.conversionRate / arr.length, 0),
    };
    setDashboardStats(stats);
  };

  const filterWebsites = () => {
    let filtered = websites.filter((website) => {
      const matchesSearch =
        website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.template.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "all" || website.status === selectedFilter;

      return matchesSearch && matchesFilter;
    });

    // Sort websites
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "updated":
          return new Date(b.lastModified) - new Date(a.lastModified);
        case "created":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "name":
          return a.name.localeCompare(b.name);
        case "visitors":
          return b.visitors - a.visitors;
        case "performance":
          return b.performance - a.performance;
        default:
          return 0;
      }
    });

    setFilteredWebsites(filtered);
  };

  const handleWebsiteAction = (action, websiteId) => {
    console.log(`${action} website:`, websiteId);
    setActiveDropdown(null);

    switch (action) {
      case "view":
        navigate(`/dashboard/business/website/detail/${websiteId}`);
        break;
      case "edit":
        navigate(`/dashboard/business/website/editor/${websiteId}`);
        break;
      case "analytics":
        navigate(`/dashboard/analytics/${websiteId}`);
        break;
      case "settings":
        navigate(`/dashboard/business/website/settings/${websiteId}`);
        break;
      case "duplicate":
        // Handle duplicate logic
        break;
      case "delete":
        // Handle delete logic
        break;
      default:
        break;
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action}:`, Array.from(selectedWebsites));
    setSelectedWebsites(new Set());
    setShowBulkActions(false);
  };

  const toggleWebsiteSelection = (websiteId) => {
    setSelectedWebsites((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(websiteId)) {
        newSelection.delete(websiteId);
      } else {
        newSelection.add(websiteId);
      }
      setShowBulkActions(newSelection.size > 0);
      return newSelection;
    });
  };

  const selectAllWebsites = () => {
    if (selectedWebsites.size === filteredWebsites.length) {
      setSelectedWebsites(new Set());
      setShowBulkActions(false);
    } else {
      setSelectedWebsites(new Set(filteredWebsites.map((w) => w.id)));
      setShowBulkActions(true);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "published":
        return <CheckCircle size={16} className={styles.publishedIcon} />;
      case "draft":
        return <Clock size={16} className={styles.draftIcon} />;
      case "maintenance":
        return <AlertCircle size={16} className={styles.maintenanceIcon} />;
      default:
        return <Clock size={16} className={styles.draftIcon} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "published":
        return styles.published;
      case "draft":
        return styles.draft;
      case "maintenance":
        return styles.maintenance;
      default:
        return styles.draft;
    }
  };

  const formatNumber = (number) => {
    if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
    if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
    return number.toLocaleString();
  };

  const getPerformanceClass = (score) => {
    if (score >= 90) return styles.excellent;
    if (score >= 80) return styles.good;
    if (score >= 70) return styles.average;
    return styles.poor;
  };

  return (
    <DashboardLayout activePage="websites">
      <div className={styles.allWebsitesDashboard}>
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <div className={styles.headerLeft}>
            <h1>All Websites</h1>
            <p className={styles.headerSubtitle}>
              Manage all your websites across different businesses
            </p>
          </div>
          <div className={styles.headerRight}>
            <button
              className={styles.createBtn}
              onClick={() => navigate("/dashboard/templates")}
            >
              <Plus size={18} />
              Create Website
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Globe size={24} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>
                {dashboardStats.totalWebsites}
              </div>
              <div className={styles.statLabel}>Total Websites</div>
              <div className={styles.statDetail}>
                {dashboardStats.publishedWebsites} published •{" "}
                {dashboardStats.draftWebsites} drafts
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Users size={24} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>
                {formatNumber(dashboardStats.totalVisitors)}
              </div>
              <div className={styles.statLabel}>Total Visitors</div>
              <div className={styles.statDetail}>
                Across all published sites
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <MousePointer size={24} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>
                {formatNumber(dashboardStats.totalPageViews)}
              </div>
              <div className={styles.statLabel}>Total Page Views</div>
              <div className={styles.statDetail}>Combined traffic metrics</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <TrendingUp size={24} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>
                {dashboardStats.avgConversionRate.toFixed(1)}%
              </div>
              <div className={styles.statLabel}>Avg Conversion</div>
              <div className={styles.statDetail}>Average across all sites</div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className={styles.controlsBar}>
          <div className={styles.leftControls}>
            <div className={styles.searchBox}>
              <Search size={18} />
              <input
                type="text"
                placeholder="Search websites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Websites</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="updated">Recently Updated</option>
              <option value="created">Recently Created</option>
              <option value="name">Name A-Z</option>
              <option value="visitors">Most Visitors</option>
              <option value="performance">Best Performance</option>
            </select>
          </div>

          <div className={styles.rightControls}>
            <button
              className={styles.refreshBtn}
              onClick={() => setIsLoading(true)}
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <div className={styles.viewToggle}>
              <button
                className={viewMode === "grid" ? styles.active : ""}
                onClick={() => setViewMode("grid")}
              >
                <Grid size={16} />
              </button>
              <button
                className={viewMode === "list" ? styles.active : ""}
                onClick={() => setViewMode("list")}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {showBulkActions && (
          <div className={styles.bulkActionsBar}>
            <div className={styles.bulkInfo}>
              <span>{selectedWebsites.size} websites selected</span>
            </div>
            <div className={styles.bulkActions}>
              <button onClick={() => handleBulkAction("publish")}>
                <Play size={16} />
                Publish
              </button>
              <button onClick={() => handleBulkAction("unpublish")}>
                <Pause size={16} />
                Unpublish
              </button>
              <button onClick={() => handleBulkAction("duplicate")}>
                <Copy size={16} />
                Duplicate
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className={styles.deleteAction}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Websites Grid/List */}
        <div className={styles.websitesContainer}>
          <div className={styles.websitesHeader}>
            <div className={styles.resultsCount}>
              {filteredWebsites.length} websites found
            </div>
            <label className={styles.selectAll}>
              <input
                type="checkbox"
                checked={
                  selectedWebsites.size === filteredWebsites.length &&
                  filteredWebsites.length > 0
                }
                onChange={selectAllWebsites}
              />
              Select All
            </label>
          </div>

          <div className={`${styles.websitesGrid} ${styles[viewMode]}`}>
            {filteredWebsites.map((website) => (
              <div
                key={website.id}
                className={`${styles.websiteCard} ${
                  selectedWebsites.has(website.id) ? styles.selected : ""
                }`}
              >
                <div className={styles.websitePreview}>
                  <div
                    className={styles.websiteThumbnail}
                    style={{ backgroundColor: website.thumbnailColor }}
                  >
                    <div className={styles.thumbnailContent}>
                      <Globe size={32} color="white" />
                    </div>
                  </div>

                  <div className={styles.websiteOverlay}>
                    <button
                      className={styles.quickAction}
                      onClick={() => handleWebsiteAction("view", website.id)}
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      className={styles.quickAction}
                      onClick={() => handleWebsiteAction("edit", website.id)}
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                  </div>

                  <div className={styles.websiteStatus}>
                    {getStatusIcon(website.status)}
                  </div>

                  <div className={styles.websiteSelection}>
                    <input
                      type="checkbox"
                      checked={selectedWebsites.has(website.id)}
                      onChange={() => toggleWebsiteSelection(website.id)}
                    />
                  </div>
                </div>

                <div className={styles.websiteInfo}>
                  <div className={styles.websiteHeader}>
                    <div className={styles.websiteTitle}>
                      <h3>{website.name}</h3>
                      <div className={styles.businessName}>
                        <Building size={12} />
                        {website.businessName}
                      </div>
                    </div>
                    <div className={styles.websiteActions}>
                      <button
                        className={styles.actionsBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(
                            activeDropdown === website.id ? null : website.id
                          );
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {activeDropdown === website.id && (
                        <div className={styles.actionsMenu}>
                          <button
                            onClick={() =>
                              handleWebsiteAction("view", website.id)
                            }
                          >
                            <Eye size={14} />
                            View Details
                          </button>
                          <button
                            onClick={() =>
                              handleWebsiteAction("edit", website.id)
                            }
                          >
                            <Edit3 size={14} />
                            Edit Website
                          </button>
                          <button
                            onClick={() =>
                              handleWebsiteAction("analytics", website.id)
                            }
                          >
                            <BarChart3 size={14} />
                            Analytics
                          </button>
                          <button
                            onClick={() =>
                              handleWebsiteAction("settings", website.id)
                            }
                          >
                            <Settings size={14} />
                            Settings
                          </button>
                          <div className={styles.menuDivider}></div>
                          <button
                            onClick={() =>
                              handleWebsiteAction("duplicate", website.id)
                            }
                          >
                            <Copy size={14} />
                            Duplicate
                          </button>
                          <button
                            onClick={() =>
                              handleWebsiteAction("delete", website.id)
                            }
                            className={styles.deleteAction}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.websiteDetails}>
                    <div className={styles.websiteTemplate}>
                      <Layers size={12} />
                      {website.template}
                    </div>
                    <div className={styles.websiteUrl}>
                      <Globe size={12} />
                      {website.customDomain || website.url}
                    </div>
                  </div>

                  <div className={styles.websiteMetrics}>
                    <div className={styles.metricItem}>
                      <Users size={14} />
                      <span>{formatNumber(website.visitors)}</span>
                      <span className={styles.metricLabel}>visitors</span>
                    </div>
                    <div className={styles.metricItem}>
                      <MousePointer size={14} />
                      <span>{formatNumber(website.pageViews)}</span>
                      <span className={styles.metricLabel}>views</span>
                    </div>
                    <div className={styles.metricItem}>
                      <TrendingUp size={14} />
                      <span>{website.conversionRate}%</span>
                      <span className={styles.metricLabel}>conversion</span>
                    </div>
                  </div>

                  <div className={styles.websiteFooter}>
                    <div className={styles.websiteStatusBadge}>
                      <span
                        className={`${styles.statusDot} ${getStatusClass(
                          website.status
                        )}`}
                      ></span>
                      <span className={styles.statusText}>
                        {website.status}
                      </span>
                    </div>

                    <div className={styles.websitePerformance}>
                      {website.performance > 0 && (
                        <>
                          <div
                            className={`${
                              styles.performanceScore
                            } ${getPerformanceClass(website.performance)}`}
                          >
                            {website.performance}
                          </div>
                          <span className={styles.performanceLabel}>score</span>
                        </>
                      )}
                    </div>

                    <div className={styles.websiteMeta}>
                      <div className={styles.lastModified}>
                        <Clock size={12} />
                        {website.lastModified}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredWebsites.length === 0 && (
            <div className={styles.noResults}>
              <Globe size={48} />
              <h3>No websites found</h3>
              <p>Try adjusting your search terms or filters</p>
              <button
                className={styles.clearFilters}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFilter("all");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}>
              <Zap size={24} />
              <span>Refreshing websites...</span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AllWebsitesDashboard;
