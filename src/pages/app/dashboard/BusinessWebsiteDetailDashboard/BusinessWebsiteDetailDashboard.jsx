import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  Edit3,
  Settings,
  Share2,
  Copy,
  ExternalLink,
  Globe,
  Users,
  MousePointer,
  Clock,
  TrendingUp,
  BarChart3,
  Smartphone,
  Monitor,
  Tablet,
  Palette,
  Type,
  Image,
  Layout,
  CheckCircle,
  Calendar,
  Target,
  Zap,
  Shield,
  Layers,
  FileText,
  Camera,
} from "lucide-react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout/DashboardLayout";
import styles from "./BusinessWebsiteDetailDashboard.module.css";

const BusinessWebsiteDetailDashboard = ({ businessId, websiteId }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Mock website data
  const website = {
    id: 1,
    name: "Main Website",
    businessName: "Pizza Palace",
    template: "Restaurant Pro",
    status: "published",
    url: "pizzapalace.webcraft.com",
    customDomain: "www.pizzapalace.com",
    createdDate: "2024-01-01",
    lastModified: "2024-01-15",
    lastPublished: "2024-01-15",
    description:
      "Main restaurant website showcasing our authentic Italian cuisine",
    favicon: null,
    seoTitle: "Pizza Palace - Authentic Italian Restaurant in Downtown",
    seoDescription:
      "Experience authentic Italian pizza and pasta at Pizza Palace. Fresh ingredients, traditional recipes, family-friendly atmosphere.",
    socialImage: null,
    isSSLEnabled: true,
    customCode: "",
  };

  // Mock analytics data
  const analytics = {
    overview: {
      visitors: 1240,
      pageViews: 3520,
      avgSessionDuration: "2m 45s",
      bounceRate: 45.2,
      conversionRate: 3.2,
      uniqueVisitors: 890,
      returningVisitors: 350,
      newVisitors: 890,
    },
    realtime: {
      activeUsers: 12,
      currentPageViews: 28,
      topPages: [
        { page: "/", users: 5 },
        { page: "/menu", users: 4 },
        { page: "/contact", users: 3 },
      ],
    },
    performance: {
      loadTime: "1.2s",
      mobileScore: 94,
      desktopScore: 98,
      seoScore: 92,
      accessibilityScore: 89,
    },
    traffic: [
      { date: "2024-01-01", visitors: 45, pageViews: 120 },
      { date: "2024-01-02", visitors: 52, pageViews: 135 },
      { date: "2024-01-03", visitors: 38, pageViews: 98 },
      { date: "2024-01-04", visitors: 67, pageViews: 180 },
      { date: "2024-01-05", visitors: 74, pageViews: 195 },
    ],
  };

  // Mock page structure
  const pages = [
    {
      id: 1,
      name: "Home",
      path: "/",
      status: "published",
      lastModified: "2024-01-15",
    },
    {
      id: 2,
      name: "Menu",
      path: "/menu",
      status: "published",
      lastModified: "2024-01-14",
    },
    {
      id: 3,
      name: "About Us",
      path: "/about",
      status: "published",
      lastModified: "2024-01-13",
    },
    {
      id: 4,
      name: "Contact",
      path: "/contact",
      status: "published",
      lastModified: "2024-01-12",
    },
    {
      id: 5,
      name: "Gallery",
      path: "/gallery",
      status: "draft",
      lastModified: "2024-01-10",
    },
  ];

  // Mock design settings
  const designSettings = {
    theme: "restaurant-modern",
    primaryColor: "#ff6b35",
    secondaryColor: "#2c3e50",
    fontFamily: "Inter",
    logoUrl: null,
    backgroundType: "color",
    backgroundColor: "#ffffff",
  };

  const handleAction = (action) => {
    console.log(`Action: ${action}`);
    switch (action) {
      case "edit":
        // Navigate to page editor
        console.log("Opening page editor...");
        break;
      case "preview":
        // Open preview in new tab
        window.open(`https://${website.url}`, "_blank");
        break;
      case "publish":
        setShowPublishModal(true);
        break;
      case "settings":
        setShowSettingsModal(true);
        break;
      default:
        break;
    }
  };

  const PublishModal = () => (
    <div
      className={styles.modalOverlay}
      onClick={() => setShowPublishModal(false)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Publish Website</h3>
          <button onClick={() => setShowPublishModal(false)}>×</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.publishOptions}>
            <div className={styles.publishOption}>
              <div className={styles.optionIcon}>
                <Globe size={24} />
              </div>
              <div className={styles.optionContent}>
                <h4>Publish to WebCraft Domain</h4>
                <p>Your website will be available at {website.url}</p>
                <button className={styles.publishBtn}>Publish Now</button>
              </div>
            </div>
            <div className={styles.publishOption}>
              <div className={styles.optionIcon}>
                <ExternalLink size={24} />
              </div>
              <div className={styles.optionContent}>
                <h4>Publish to Custom Domain</h4>
                <p>Connect your own domain: {website.customDomain}</p>
                <button className={styles.publishBtn}>Configure Domain</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsModal = () => (
    <div
      className={styles.modalOverlay}
      onClick={() => setShowSettingsModal(false)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Website Settings</h3>
          <button onClick={() => setShowSettingsModal(false)}>×</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.settingsForm}>
            <div className={styles.formGroup}>
              <label>Website Name</label>
              <input type="text" defaultValue={website.name} />
            </div>
            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea defaultValue={website.description} rows="3" />
            </div>
            <div className={styles.formGroup}>
              <label>SEO Title</label>
              <input type="text" defaultValue={website.seoTitle} />
            </div>
            <div className={styles.formGroup}>
              <label>SEO Description</label>
              <textarea defaultValue={website.seoDescription} rows="2" />
            </div>
            <div className={styles.formActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowSettingsModal(false)}
              >
                Cancel
              </button>
              <button className={styles.saveBtn}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout activePage="businesses">
      <div className={styles.websiteDetail}>
        {/* Header */}
        <div className={styles.headerSection}>
          <div className={styles.headerTop}>
            <button className={styles.backBtn}>
              <ArrowLeft size={20} />
              Back to {website.businessName}
            </button>
            <div className={styles.headerActions}>
              <button
                className={styles.actionBtn}
                onClick={() => handleAction("preview")}
              >
                <Eye size={18} />
                Preview
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => handleAction("settings")}
              >
                <Settings size={18} />
                Settings
              </button>
              <button
                className={styles.primaryBtn}
                onClick={() => handleAction("edit")}
              >
                <Edit3 size={18} />
                Edit Website
              </button>
            </div>
          </div>

          <div className={styles.websiteHeader}>
            <div className={styles.websiteInfo}>
              <h1 className={styles.websiteName}>{website.name}</h1>
              <p className={styles.websiteDescription}>{website.description}</p>
              <div className={styles.websiteMeta}>
                <div className={styles.metaItem}>
                  <Globe size={16} />
                  <span>{website.customDomain || website.url}</span>
                </div>
                <div className={styles.metaItem}>
                  <Layout size={16} />
                  <span>{website.template}</span>
                </div>
                <div className={styles.metaItem}>
                  <Calendar size={16} />
                  <span>Last updated {website.lastModified}</span>
                </div>
                <div className={styles.statusIndicator}>
                  <span
                    className={`${styles.statusDot} ${styles[website.status]}`}
                  ></span>
                  <span className={styles.statusText}>{website.status}</span>
                </div>
              </div>
            </div>

            <div className={styles.websiteStats}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Users size={24} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statNumber}>
                    {analytics.overview.visitors.toLocaleString()}
                  </div>
                  <div className={styles.statLabel}>Visitors</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <MousePointer size={24} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statNumber}>
                    {analytics.overview.pageViews.toLocaleString()}
                  </div>
                  <div className={styles.statLabel}>Page Views</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Target size={24} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statNumber}>
                    {analytics.overview.conversionRate}%
                  </div>
                  <div className={styles.statLabel}>Conversion</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "overview" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "editor" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("editor")}
            >
              Page Editor
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "analytics" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "design" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("design")}
            >
              Design
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "pages" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("pages")}
            >
              Pages ({pages.length})
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "seo" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("seo")}
            >
              SEO & Performance
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === "overview" && (
            <div className={styles.overviewContent}>
              <div className={styles.overviewGrid}>
                <div className={styles.section}>
                  <h3>Quick Actions</h3>
                  <div className={styles.quickActions}>
                    <button
                      className={styles.quickAction}
                      onClick={() => handleAction("edit")}
                    >
                      <Edit3 size={20} />
                      <span>Edit Content</span>
                    </button>
                    <button
                      className={styles.quickAction}
                      onClick={() => handleAction("preview")}
                    >
                      <Eye size={20} />
                      <span>Preview Site</span>
                    </button>
                    <button
                      className={styles.quickAction}
                      onClick={() => handleAction("publish")}
                    >
                      <Globe size={20} />
                      <span>Publish Changes</span>
                    </button>
                    <button className={styles.quickAction}>
                      <Share2 size={20} />
                      <span>Share Link</span>
                    </button>
                  </div>
                </div>

                <div className={styles.section}>
                  <h3>Live Statistics</h3>
                  <div className={styles.liveStats}>
                    <div className={styles.liveStat}>
                      <div className={styles.liveStatNumber}>
                        {analytics.realtime.activeUsers}
                      </div>
                      <div className={styles.liveStatLabel}>Active Users</div>
                      <div className={styles.liveIndicator}></div>
                    </div>
                    <div className={styles.liveStat}>
                      <div className={styles.liveStatNumber}>
                        {analytics.realtime.currentPageViews}
                      </div>
                      <div className={styles.liveStatLabel}>
                        Page Views Today
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>Performance Overview</h3>
                <div className={styles.performanceGrid}>
                  <div className={styles.performanceCard}>
                    <div className={styles.performanceHeader}>
                      <Monitor size={20} />
                      <span>Desktop Score</span>
                    </div>
                    <div className={styles.performanceScore}>
                      <div
                        className={`${styles.scoreCircle} ${styles.excellent}`}
                      >
                        {analytics.performance.desktopScore}
                      </div>
                    </div>
                  </div>
                  <div className={styles.performanceCard}>
                    <div className={styles.performanceHeader}>
                      <Smartphone size={20} />
                      <span>Mobile Score</span>
                    </div>
                    <div className={styles.performanceScore}>
                      <div
                        className={`${styles.scoreCircle} ${styles.excellent}`}
                      >
                        {analytics.performance.mobileScore}
                      </div>
                    </div>
                  </div>
                  <div className={styles.performanceCard}>
                    <div className={styles.performanceHeader}>
                      <Zap size={20} />
                      <span>Load Time</span>
                    </div>
                    <div className={styles.performanceMetric}>
                      {analytics.performance.loadTime}
                    </div>
                  </div>
                  <div className={styles.performanceCard}>
                    <div className={styles.performanceHeader}>
                      <Shield size={20} />
                      <span>Security</span>
                    </div>
                    <div className={styles.performanceStatus}>
                      <CheckCircle size={16} />
                      <span>Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "editor" && (
            <div className={styles.editorContent}>
              <div className={styles.editorHeader}>
                <div className={styles.editorInfo}>
                  <h3>Page Editor</h3>
                  <p>
                    Edit your website content and design with our visual editor
                  </p>
                </div>
                <div className={styles.editorActions}>
                  <div className={styles.deviceSelector}>
                    <button
                      className={`${styles.deviceBtn} ${
                        previewDevice === "desktop" ? styles.active : ""
                      }`}
                      onClick={() => setPreviewDevice("desktop")}
                    >
                      <Monitor size={16} />
                    </button>
                    <button
                      className={`${styles.deviceBtn} ${
                        previewDevice === "tablet" ? styles.active : ""
                      }`}
                      onClick={() => setPreviewDevice("tablet")}
                    >
                      <Tablet size={16} />
                    </button>
                    <button
                      className={`${styles.deviceBtn} ${
                        previewDevice === "mobile" ? styles.active : ""
                      }`}
                      onClick={() => setPreviewDevice("mobile")}
                    >
                      <Smartphone size={16} />
                    </button>
                  </div>
                  <button className={styles.launchEditorBtn}>
                    <Edit3 size={16} />
                    Launch Editor
                  </button>
                </div>
              </div>

              <div className={styles.editorPreview}>
                <div
                  className={`${styles.previewFrame} ${styles[previewDevice]}`}
                >
                  <div className={styles.previewContent}>
                    <div className={styles.placeholderEditor}>
                      <div className={styles.editorPlaceholder}>
                        <Edit3 size={48} />
                        <h4>Visual Editor Preview</h4>
                        <p>
                          Click "Launch Editor" to start editing your website
                        </p>
                        <button className={styles.launchBtn}>
                          Launch Visual Editor
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.editorFeatures}>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <Type size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Text Editing</h4>
                    <p>
                      Edit text directly on the page with rich formatting
                      options
                    </p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <Image size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Image Management</h4>
                    <p>
                      Upload and manage images with drag-and-drop functionality
                    </p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <Palette size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Design Customization</h4>
                    <p>Change colors, fonts, and layouts to match your brand</p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <Layers size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Component Library</h4>
                    <p>Add pre-built components and sections to your pages</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className={styles.analyticsContent}>
              <div className={styles.analyticsGrid}>
                <div className={styles.section}>
                  <h3>Visitor Analytics</h3>
                  <div className={styles.analyticsStats}>
                    <div className={styles.analyticsStat}>
                      <Users size={20} />
                      <div>
                        <div className={styles.analyticsNumber}>
                          {analytics.overview.visitors.toLocaleString()}
                        </div>
                        <div className={styles.analyticsLabel}>
                          Total Visitors
                        </div>
                      </div>
                    </div>
                    <div className={styles.analyticsStat}>
                      <MousePointer size={20} />
                      <div>
                        <div className={styles.analyticsNumber}>
                          {analytics.overview.pageViews.toLocaleString()}
                        </div>
                        <div className={styles.analyticsLabel}>Page Views</div>
                      </div>
                    </div>
                    <div className={styles.analyticsStat}>
                      <Clock size={20} />
                      <div>
                        <div className={styles.analyticsNumber}>
                          {analytics.overview.avgSessionDuration}
                        </div>
                        <div className={styles.analyticsLabel}>
                          Avg. Session
                        </div>
                      </div>
                    </div>
                    <div className={styles.analyticsStat}>
                      <TrendingUp size={20} />
                      <div>
                        <div className={styles.analyticsNumber}>
                          {analytics.overview.bounceRate}%
                        </div>
                        <div className={styles.analyticsLabel}>Bounce Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h3>Real-time Activity</h3>
                  <div className={styles.realtimeData}>
                    <div className={styles.realtimeHeader}>
                      <div className={styles.activeUsers}>
                        <div className={styles.activeIndicator}></div>
                        <span>
                          {analytics.realtime.activeUsers} users online now
                        </span>
                      </div>
                    </div>
                    <div className={styles.topPagesRealtime}>
                      <h4>Currently Viewing</h4>
                      {analytics.realtime.topPages.map((page, index) => (
                        <div key={index} className={styles.realtimePage}>
                          <span className={styles.pagePath}>{page.page}</span>
                          <span className={styles.pageUsers}>
                            {page.users} users
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>Traffic Chart</h3>
                <div className={styles.chartContainer}>
                  <div className={styles.chartPlaceholder}>
                    <BarChart3 size={48} />
                    <p>Traffic visualization would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "design" && (
            <div className={styles.designContent}>
              <div className={styles.designGrid}>
                <div className={styles.section}>
                  <h3>Theme & Colors</h3>
                  <div className={styles.designOptions}>
                    <div className={styles.designOption}>
                      <label>Primary Color</label>
                      <div className={styles.colorPicker}>
                        <input
                          type="color"
                          value={designSettings.primaryColor}
                        />
                        <span>{designSettings.primaryColor}</span>
                      </div>
                    </div>
                    <div className={styles.designOption}>
                      <label>Secondary Color</label>
                      <div className={styles.colorPicker}>
                        <input
                          type="color"
                          value={designSettings.secondaryColor}
                        />
                        <span>{designSettings.secondaryColor}</span>
                      </div>
                    </div>
                    <div className={styles.designOption}>
                      <label>Font Family</label>
                      <select defaultValue={designSettings.fontFamily}>
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Montserrat">Montserrat</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h3>Brand Assets</h3>
                  <div className={styles.brandAssets}>
                    <div className={styles.assetUpload}>
                      <div className={styles.uploadArea}>
                        <Camera size={24} />
                        <p>Upload Logo</p>
                        <span>PNG, JPG up to 2MB</span>
                      </div>
                    </div>
                    <div className={styles.assetUpload}>
                      <div className={styles.uploadArea}>
                        <Image size={24} />
                        <p>Background Image</p>
                        <span>PNG, JPG up to 5MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>Template Customization</h3>
                <div className={styles.templateOptions}>
                  <div className={styles.templateOption}>
                    <div className={styles.optionHeader}>
                      <Layout size={20} />
                      <span>Layout Style</span>
                    </div>
                    <select>
                      <option>Modern Restaurant</option>
                      <option>Classic Dining</option>
                      <option>Fast Food</option>
                    </select>
                  </div>
                  <div className={styles.templateOption}>
                    <div className={styles.optionHeader}>
                      <Type size={20} />
                      <span>Typography</span>
                    </div>
                    <select>
                      <option>Professional</option>
                      <option>Friendly</option>
                      <option>Elegant</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pages" && (
            <div className={styles.pagesContent}>
              <div className={styles.pagesHeader}>
                <h3>Website Pages</h3>
                <button className={styles.addPageBtn}>
                  <FileText size={16} />
                  Add New Page
                </button>
              </div>

              <div className={styles.pagesList}>
                {pages.map((page) => (
                  <div key={page.id} className={styles.pageItem}>
                    <div className={styles.pageInfo}>
                      <div className={styles.pageIcon}>
                        <FileText size={16} />
                      </div>
                      <div className={styles.pageDetails}>
                        <h4 className={styles.pageName}>{page.name}</h4>
                        <p className={styles.pagePath}>{page.path}</p>
                        <span className={styles.pageModified}>
                          Modified {page.lastModified}
                        </span>
                      </div>
                    </div>
                    <div className={styles.pageActions}>
                      <span
                        className={`${styles.pageStatus} ${
                          styles[page.status]
                        }`}
                      >
                        {page.status}
                      </span>
                      <button className={styles.pageAction}>
                        <Eye size={14} />
                      </button>
                      <button className={styles.pageAction}>
                        <Edit3 size={14} />
                      </button>
                      <button className={styles.pageAction}>
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className={styles.seoContent}>
              <div className={styles.seoGrid}>
                <div className={styles.section}>
                  <h3>SEO Settings</h3>
                  <div className={styles.seoForm}>
                    <div className={styles.formGroup}>
                      <label>Page Title</label>
                      <input type="text" defaultValue={website.seoTitle} />
                      <span className={styles.charCount}>62/60 characters</span>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Meta Description</label>
                      <textarea
                        defaultValue={website.seoDescription}
                        rows="3"
                      />
                      <span className={styles.charCount}>
                        148/160 characters
                      </span>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Social Media Image</label>
                      <div className={styles.imageUpload}>
                        <div className={styles.uploadPlaceholder}>
                          <Image size={24} />
                          <span>Upload social preview image</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h3>Performance Scores</h3>
                  <div className={styles.seoScores}>
                    <div className={styles.seoScore}>
                      <div className={styles.scoreHeader}>
                        <span>SEO</span>
                        <div className={`${styles.scoreValue} ${styles.good}`}>
                          {analytics.performance.seoScore}
                        </div>
                      </div>
                      <div className={styles.scoreBar}>
                        <div
                          className={styles.scoreProgress}
                          style={{
                            width: `${analytics.performance.seoScore}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className={styles.seoScore}>
                      <div className={styles.scoreHeader}>
                        <span>Accessibility</span>
                        <div className={`${styles.scoreValue} ${styles.good}`}>
                          {analytics.performance.accessibilityScore}
                        </div>
                      </div>
                      <div className={styles.scoreBar}>
                        <div
                          className={styles.scoreProgress}
                          style={{
                            width: `${analytics.performance.accessibilityScore}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showPublishModal && <PublishModal />}
        {showSettingsModal && <SettingsModal />}
      </div>
    </DashboardLayout>
  );
};

export default BusinessWebsiteDetailDashboard;
