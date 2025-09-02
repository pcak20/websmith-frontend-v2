import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Eye,
  Copy,
  Trash2,
  Globe,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Bell,
  User,
  LogOut,
  FolderOpen,
  Layout,
  Smartphone,
  Monitor,
  ChevronDown,
  TrendingUp,
  Activity,
  Star,
  Zap,
  Heart,
} from "lucide-react";
import styles from "./DashboardPage.module.css";
import DashboardLayout from "../../../../components/layouts/DashboardLayout/DashboardLayout";

const DashboardPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("recent");

  // Mock data with enhanced properties
  const userWebsites = [
    {
      id: 1,
      name: "My Business Website",
      template: "Modern Business",
      status: "published",
      domain: "mybusiness.webcraft.com",
      visits: 1240,
      lastModified: "2 days ago",
      thumbnail: "business",
      favorite: true,
      growth: "+12%",
      performance: 95,
    },
    {
      id: 2,
      name: "Portfolio Site",
      template: "Creative Portfolio",
      status: "draft",
      domain: "portfolio.webcraft.com",
      visits: 0,
      lastModified: "1 week ago",
      thumbnail: "portfolio",
      favorite: false,
      growth: "0%",
      performance: 0,
    },
    {
      id: 3,
      name: "Online Store",
      template: "E-commerce Pro",
      status: "published",
      domain: "mystore.webcraft.com",
      visits: 892,
      lastModified: "5 days ago",
      thumbnail: "ecommerce",
      favorite: false,
      growth: "+8%",
      performance: 88,
    },
  ];

  const templates = [
    {
      id: 1,
      name: "Modern Business",
      category: "business",
      preview: "business",
      rating: 4.8,
      popular: true,
      description: "Professional business template with modern design",
    },
    {
      id: 2,
      name: "Creative Portfolio",
      category: "portfolio",
      preview: "portfolio",
      rating: 4.9,
      popular: true,
      description: "Showcase your work with this stunning portfolio",
    },
    {
      id: 3,
      name: "E-commerce Pro",
      category: "ecommerce",
      preview: "ecommerce",
      rating: 4.7,
      popular: false,
      description: "Complete online store solution",
    },
    {
      id: 4,
      name: "Restaurant Menu",
      category: "business",
      preview: "restaurant",
      rating: 4.6,
      popular: false,
      description: "Perfect for restaurants and cafes",
    },
    {
      id: 5,
      name: "Photography Studio",
      category: "portfolio",
      preview: "photo",
      rating: 4.8,
      popular: true,
      description: "Elegant photography showcase",
    },
    {
      id: 6,
      name: "Tech Startup",
      category: "business",
      preview: "startup",
      rating: 4.5,
      popular: false,
      description: "Modern startup landing page",
    },
    {
      id: 7,
      name: "Fashion Store",
      category: "ecommerce",
      preview: "fashion",
      rating: 4.7,
      popular: true,
      description: "Stylish fashion e-commerce template",
    },
    {
      id: 8,
      name: "Personal Blog",
      category: "blog",
      preview: "blog",
      rating: 4.4,
      popular: false,
      description: "Clean and minimal blog template",
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || template.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateWebsite = (templateId) => {
    setIsLoading(true);
    console.log("Creating website with template:", templateId);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setShowTemplates(false);
    }, 2000);
  };

  const toggleDropdown = (websiteId) => {
    setActiveDropdown(activeDropdown === websiteId ? null : websiteId);
  };

  const handleAction = (action, websiteId) => {
    console.log(`${action} website:`, websiteId);
    setActiveDropdown(null);
  };

  const toggleFavorite = (websiteId) => {
    console.log("Toggle favorite:", websiteId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.websiteActions}`)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <DashboardLayout activePage="dashboard">
      <div className={styles.dashboard}>
        {/* Loading Overlay */}
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}>
              <Zap className={styles.spinnerIcon} size={24} />
              <p>Creating your website...</p>
            </div>
          </div>
        )}

        {/* Header */}
        <header className={styles.dashboardHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.logo}>
              <Zap size={24} />
              WebCraft
            </div>
            <nav className={styles.headerNav}>
              <a href="#" className={`${styles.navItem} ${styles.active}`}>
                Dashboard
              </a>
              <a href="#" className={styles.navItem}>
                Templates
              </a>
              <a href="#" className={styles.navItem}>
                Domains
              </a>
              <a href="#" className={styles.navItem}>
                Analytics
              </a>
            </nav>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.headerBtn}>
              <Bell size={20} />
              <span className={styles.notificationBadge}>2</span>
            </button>
            <div className={styles.userMenu}>
              <button className={styles.userAvatar}>
                <User size={20} />
              </button>
              <div className={styles.userDropdown}>
                <a href="#">
                  <User size={16} />
                  Profile
                </a>
                <a href="#">
                  <Settings size={16} />
                  Settings
                </a>
                <a href="#">
                  <LogOut size={16} />
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className={styles.dashboardMain}>
          {!showTemplates ? (
            <>
              {/* Dashboard Overview */}
              <div className={styles.dashboardContent}>
                <div className={styles.pageHeader}>
                  <div className={styles.pageTitle}>
                    <h1>My Websites</h1>
                    <p>Manage and create your websites with ease</p>
                  </div>
                  <button
                    className={styles.btnPrimary}
                    onClick={() => setShowTemplates(true)}
                  >
                    <Plus size={20} />
                    Create New Website
                  </button>
                </div>

                {/* Stats Cards */}
                <div className={styles.statsGrid}>
                  <div
                    className={`${styles.statCard} ${styles.statCardPrimary}`}
                  >
                    <div className={styles.statIcon}>
                      <Globe size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statNumber}>3</div>
                      <div className={styles.statLabel}>Total Websites</div>
                      <div className={styles.statChange}>+1 this month</div>
                    </div>
                    <div className={styles.statTrend}>
                      <TrendingUp size={16} />
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <Users size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statNumber}>2,132</div>
                      <div className={styles.statLabel}>Total Visitors</div>
                      <div className={styles.statChange}>+156 this week</div>
                    </div>
                    <div className={styles.statTrend}>
                      <TrendingUp size={16} />
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <BarChart3 size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statNumber}>+24%</div>
                      <div className={styles.statLabel}>Growth This Month</div>
                      <div className={styles.statChange}>vs last month</div>
                    </div>
                    <div className={styles.statTrend}>
                      <TrendingUp size={16} />
                    </div>
                  </div>

                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <Activity size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statNumber}>92%</div>
                      <div className={styles.statLabel}>Avg Performance</div>
                      <div className={styles.statChange}>excellent</div>
                    </div>
                    <div className={styles.statTrend}>
                      <TrendingUp size={16} />
                    </div>
                  </div>
                </div>

                {/* Websites Section */}
                <div className={styles.websitesSection}>
                  <div className={styles.sectionHeader}>
                    <h2>Your Websites</h2>
                    <div className={styles.sectionControls}>
                      <div className={styles.searchFilter}>
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
                          className={styles.sortSelect}
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="recent">Most Recent</option>
                          <option value="name">Name</option>
                          <option value="visits">Visits</option>
                          <option value="performance">Performance</option>
                        </select>
                        <button className={styles.filterBtn}>
                          <Filter size={18} />
                          Filter
                        </button>
                      </div>
                      <div className={styles.viewToggle}>
                        <button
                          className={`${styles.viewBtn} ${
                            viewMode === "grid" ? styles.active : ""
                          }`}
                          onClick={() => setViewMode("grid")}
                        >
                          <Layout size={16} />
                        </button>
                        <button
                          className={`${styles.viewBtn} ${
                            viewMode === "list" ? styles.active : ""
                          }`}
                          onClick={() => setViewMode("list")}
                        >
                          <FolderOpen size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.websitesGrid} ${
                      viewMode === "list" ? styles.listView : ""
                    }`}
                  >
                    {userWebsites.map((website) => (
                      <div key={website.id} className={styles.websiteCard}>
                        <div className={styles.websitePreview}>
                          <div
                            className={`${styles.previewContent} ${
                              styles[website.thumbnail]
                            }`}
                          >
                            {/* Preview content based on template type */}
                            {website.thumbnail === "business" && (
                              <div className={styles.previewBusiness}>
                                <div className={styles.previewNav}></div>
                                <div className={styles.previewHero}>
                                  <div className={styles.previewText}></div>
                                  <div
                                    className={`${styles.previewText} ${styles.short}`}
                                  ></div>
                                  <div className={styles.previewButton}></div>
                                </div>
                              </div>
                            )}
                            {website.thumbnail === "portfolio" && (
                              <div className={styles.previewPortfolio}>
                                <div className={styles.previewGallery}>
                                  <div className={styles.galleryItem}></div>
                                  <div className={styles.galleryItem}></div>
                                  <div className={styles.galleryItem}></div>
                                </div>
                              </div>
                            )}
                            {website.thumbnail === "ecommerce" && (
                              <div className={styles.previewEcommerce}>
                                <div className={styles.productGrid}>
                                  <div className={styles.productItem}></div>
                                  <div className={styles.productItem}></div>
                                </div>
                              </div>
                            )}
                          </div>

                          {website.favorite && (
                            <button className={styles.favoriteBtn}>
                              <Heart size={16} fill="currentColor" />
                            </button>
                          )}

                          <div className={styles.websiteOverlay}>
                            <button className={styles.previewBtn}>
                              <Eye size={16} />
                              Preview
                            </button>
                            <button className={styles.editBtn}>
                              <Edit3 size={16} />
                              Edit
                            </button>
                          </div>
                        </div>

                        <div className={styles.websiteInfo}>
                          <div className={styles.websiteHeader}>
                            <div className={styles.websiteTitle}>
                              <h3>{website.name}</h3>
                              <p className={styles.websiteTemplate}>
                                {website.template}
                              </p>
                            </div>
                            <div className={styles.websiteActions}>
                              <span
                                className={`${styles.statusBadge} ${
                                  styles[website.status]
                                }`}
                              >
                                {website.status}
                              </span>
                              <button
                                className={styles.moreBtn}
                                onClick={() => toggleDropdown(website.id)}
                              >
                                <MoreVertical size={16} />
                              </button>
                              {activeDropdown === website.id && (
                                <div className={styles.dropdownMenu}>
                                  <button
                                    onClick={() =>
                                      handleAction("edit", website.id)
                                    }
                                  >
                                    <Edit3 size={14} />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleAction("duplicate", website.id)
                                    }
                                  >
                                    <Copy size={14} />
                                    Duplicate
                                  </button>
                                  <button
                                    onClick={() => toggleFavorite(website.id)}
                                  >
                                    <Heart size={14} />
                                    {website.favorite
                                      ? "Unfavorite"
                                      : "Favorite"}
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleAction("delete", website.id)
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

                          <div className={styles.websiteStats}>
                            <div className={styles.statItem}>
                              <Users size={14} />
                              <span>
                                {website.visits.toLocaleString()} visits
                              </span>
                              <span className={styles.growth}>
                                {website.growth}
                              </span>
                            </div>
                            <div className={styles.statItem}>
                              <Calendar size={14} />
                              <span>{website.lastModified}</span>
                            </div>
                            <div className={styles.statItem}>
                              <Globe size={14} />
                              <span className={styles.domain}>
                                {website.domain}
                              </span>
                            </div>
                          </div>

                          {website.status === "published" && (
                            <div className={styles.performanceBar}>
                              <div className={styles.performanceLabel}>
                                Performance: {website.performance}%
                              </div>
                              <div className={styles.performanceTrack}>
                                <div
                                  className={styles.performanceFill}
                                  style={{ width: `${website.performance}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Add New Website Card */}
                    <div
                      className={`${styles.websiteCard} ${styles.addNew}`}
                      onClick={() => setShowTemplates(true)}
                    >
                      <div className={styles.addContent}>
                        <div className={styles.addIcon}>
                          <Plus size={48} />
                        </div>
                        <h3>Create New Website</h3>
                        <p>Choose from our premium templates</p>
                        <div className={styles.addCta}>
                          <span>Start Building →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={styles.activitySection}>
                  <div className={styles.activityHeader}>
                    <h2>Recent Activity</h2>
                    <button className={styles.viewAllBtn}>View All</button>
                  </div>
                  <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                      <div className={`${styles.activityIcon} ${styles.edit}`}>
                        <Edit3 size={16} />
                      </div>
                      <div className={styles.activityContent}>
                        <p>
                          <strong>My Business Website</strong> was updated
                        </p>
                        <span>2 days ago</span>
                      </div>
                      <div className={styles.activityBadge}>Updated</div>
                    </div>
                    <div className={styles.activityItem}>
                      <div
                        className={`${styles.activityIcon} ${styles.traffic}`}
                      >
                        <Globe size={16} />
                      </div>
                      <div className={styles.activityContent}>
                        <p>
                          <strong>Online Store</strong> received 50 new visitors
                        </p>
                        <span>3 days ago</span>
                      </div>
                      <div className={styles.activityBadge}>Traffic</div>
                    </div>
                    <div className={styles.activityItem}>
                      <div
                        className={`${styles.activityIcon} ${styles.create}`}
                      >
                        <Plus size={16} />
                      </div>
                      <div className={styles.activityContent}>
                        <p>
                          <strong>Portfolio Site</strong> was created
                        </p>
                        <span>1 week ago</span>
                      </div>
                      <div className={styles.activityBadge}>Created</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Template Selection */
            <div className={styles.templateSelection}>
              <div className={styles.templateHeader}>
                <button
                  className={styles.backBtn}
                  onClick={() => setShowTemplates(false)}
                >
                  ← Back to Dashboard
                </button>
                <h1>Choose a Template</h1>
                <p>
                  Select a professionally designed template to start building
                  your website
                </p>
              </div>

              <div className={styles.templateControls}>
                <div className={styles.searchBox}>
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className={styles.filterDropdown}>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="business">Business</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="blog">Blog</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className={styles.templatesGrid}>
                {filteredTemplates.map((template) => (
                  <div key={template.id} className={styles.templateCard}>
                    {template.popular && (
                      <div className={styles.popularBadge}>
                        <Star size={12} fill="currentColor" />
                        Popular
                      </div>
                    )}

                    <div className={styles.templatePreview}>
                      <div
                        className={`${styles.previewContent} ${
                          styles[template.preview]
                        }`}
                      >
                        {/* Template preview content */}
                        {template.preview === "business" && (
                          <div className={styles.previewBusiness}>
                            <div className={styles.previewNav}></div>
                            <div className={styles.previewHero}>
                              <div className={styles.previewText}></div>
                              <div
                                className={`${styles.previewText} ${styles.short}`}
                              ></div>
                              <div className={styles.previewButton}></div>
                            </div>
                          </div>
                        )}
                        {/* Add other template previews here */}
                      </div>

                      <div className={styles.templateOverlay}>
                        <div className={styles.devicePreview}>
                          <button
                            className={`${styles.deviceBtn} ${styles.active}`}
                          >
                            <Monitor size={16} />
                          </button>
                          <button className={styles.deviceBtn}>
                            <Smartphone size={16} />
                          </button>
                        </div>
                        <button className={styles.previewBtnLarge}>
                          <Eye size={16} />
                          Preview
                        </button>
                      </div>
                    </div>

                    <div className={styles.templateInfo}>
                      <div className={styles.templateTitle}>
                        <h3>{template.name}</h3>
                        <div className={styles.templateRating}>
                          <Star size={14} fill="currentColor" />
                          {template.rating}
                        </div>
                      </div>
                      <p className={styles.templateDescription}>
                        {template.description}
                      </p>
                      <span className={styles.templateCategory}>
                        {template.category}
                      </span>
                      <button
                        className={styles.useTemplateBtn}
                        onClick={() => handleCreateWebsite(template.id)}
                      >
                        Use This Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
