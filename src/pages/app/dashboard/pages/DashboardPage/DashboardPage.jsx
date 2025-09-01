import React, { useState } from "react";
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
} from "lucide-react";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mock data
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
    },
  ];

  const templates = [
    {
      id: 1,
      name: "Modern Business",
      category: "business",
      preview: "business",
    },
    {
      id: 2,
      name: "Creative Portfolio",
      category: "portfolio",
      preview: "portfolio",
    },
    {
      id: 3,
      name: "E-commerce Pro",
      category: "ecommerce",
      preview: "ecommerce",
    },
    {
      id: 4,
      name: "Restaurant Menu",
      category: "business",
      preview: "restaurant",
    },
    {
      id: 5,
      name: "Photography Studio",
      category: "portfolio",
      preview: "photo",
    },
    { id: 6, name: "Tech Startup", category: "business", preview: "startup" },
    { id: 7, name: "Fashion Store", category: "ecommerce", preview: "fashion" },
    { id: 8, name: "Personal Blog", category: "blog", preview: "blog" },
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
    console.log("Creating website with template:", templateId);
    setShowTemplates(false);
    // Here you would typically navigate to the editor or create a new website
  };

  const toggleDropdown = (websiteId) => {
    setActiveDropdown(activeDropdown === websiteId ? null : websiteId);
  };

  const handleAction = (action, websiteId) => {
    console.log(`${action} website:`, websiteId);
    setActiveDropdown(null);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">WebCraft</div>
          <nav className="header-nav">
            <a href="#" className="nav-item active">
              Dashboard
            </a>
            <a href="#" className="nav-item">
              Templates
            </a>
            <a href="#" className="nav-item">
              Domains
            </a>
            <a href="#" className="nav-item">
              Analytics
            </a>
          </nav>
        </div>
        <div className="header-right">
          <button className="header-btn">
            <Bell size={20} />
          </button>
          <div className="user-menu">
            <button className="user-avatar">
              <User size={20} />
            </button>
            <div className="user-dropdown">
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
      <main className="dashboard-main">
        {!showTemplates ? (
          <>
            {/* Dashboard Overview */}
            <div className="dashboard-content">
              <div className="page-header">
                <div>
                  <h1>My Websites</h1>
                  <p>Manage and create your websites</p>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => setShowTemplates(true)}
                >
                  <Plus size={20} />
                  Create New Website
                </button>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <Globe size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">3</div>
                    <div className="stat-label">Total Websites</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <Users size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">2,132</div>
                    <div className="stat-label">Total Visitors</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <BarChart3 size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">+24%</div>
                    <div className="stat-label">Growth This Month</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <Layout size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">2</div>
                    <div className="stat-label">Published Sites</div>
                  </div>
                </div>
              </div>

              {/* Websites List */}
              <div className="websites-section">
                <div className="section-header">
                  <h2>Your Websites</h2>
                  <div className="search-filter">
                    <div className="search-box">
                      <Search size={18} />
                      <input
                        type="text"
                        placeholder="Search websites..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button className="filter-btn">
                      <Filter size={18} />
                      Filter
                    </button>
                  </div>
                </div>

                <div className="websites-grid">
                  {userWebsites.map((website) => (
                    <div key={website.id} className="website-card">
                      <div className="website-preview">
                        <div className={`preview-content ${website.thumbnail}`}>
                          {website.thumbnail === "business" && (
                            <div className="preview-business">
                              <div className="preview-nav"></div>
                              <div className="preview-hero">
                                <div className="preview-text"></div>
                                <div className="preview-text short"></div>
                                <div className="preview-button"></div>
                              </div>
                            </div>
                          )}
                          {website.thumbnail === "portfolio" && (
                            <div className="preview-portfolio">
                              <div className="preview-gallery">
                                <div className="gallery-item"></div>
                                <div className="gallery-item"></div>
                                <div className="gallery-item"></div>
                              </div>
                            </div>
                          )}
                          {website.thumbnail === "ecommerce" && (
                            <div className="preview-ecommerce">
                              <div className="product-grid">
                                <div className="product-item"></div>
                                <div className="product-item"></div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="website-overlay">
                          <button className="preview-btn">
                            <Eye size={16} />
                            Preview
                          </button>
                          <button className="edit-btn">
                            <Edit3 size={16} />
                            Edit
                          </button>
                        </div>
                      </div>

                      <div className="website-info">
                        <div className="website-header">
                          <div>
                            <h3>{website.name}</h3>
                            <p className="website-template">
                              {website.template}
                            </p>
                          </div>
                          <div className="website-actions">
                            <span className={`status-badge ${website.status}`}>
                              {website.status}
                            </span>
                            <button
                              className="more-btn"
                              onClick={() => toggleDropdown(website.id)}
                            >
                              <MoreVertical size={16} />
                            </button>
                            {activeDropdown === website.id && (
                              <div className="dropdown-menu">
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
                                  onClick={() =>
                                    handleAction("delete", website.id)
                                  }
                                  className="delete-action"
                                >
                                  <Trash2 size={14} />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="website-stats">
                          <div className="stat-item">
                            <Users size={14} />
                            <span>{website.visits} visits</span>
                          </div>
                          <div className="stat-item">
                            <Calendar size={14} />
                            <span>{website.lastModified}</span>
                          </div>
                          <div className="stat-item">
                            <Globe size={14} />
                            <span>{website.domain}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Website Card */}
                  <div
                    className="website-card add-new"
                    onClick={() => setShowTemplates(true)}
                  >
                    <div className="add-content">
                      <Plus size={48} />
                      <h3>Create New Website</h3>
                      <p>Choose from our premium templates</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="activity-section">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">
                      <Edit3 size={16} />
                    </div>
                    <div className="activity-content">
                      <p>
                        <strong>My Business Website</strong> was updated
                      </p>
                      <span>2 days ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <Globe size={16} />
                    </div>
                    <div className="activity-content">
                      <p>
                        <strong>Online Store</strong> received 50 new visitors
                      </p>
                      <span>3 days ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <Plus size={16} />
                    </div>
                    <div className="activity-content">
                      <p>
                        <strong>Portfolio Site</strong> was created
                      </p>
                      <span>1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Template Selection */
          <div className="template-selection">
            <div className="template-header">
              <button
                className="back-btn"
                onClick={() => setShowTemplates(false)}
              >
                ← Back to Dashboard
              </button>
              <h1>Choose a Template</h1>
              <p>Select a template to start building your website</p>
            </div>

            <div className="template-controls">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-dropdown">
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

            <div className="templates-grid-large">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="template-card-large">
                  <div className="template-preview-large">
                    <div
                      className={`preview-content-large ${template.preview}`}
                    >
                      {template.preview === "business" && (
                        <div className="preview-business">
                          <div className="preview-nav"></div>
                          <div className="preview-hero">
                            <div className="preview-text"></div>
                            <div className="preview-text short"></div>
                            <div className="preview-button"></div>
                          </div>
                        </div>
                      )}
                      {template.preview === "portfolio" && (
                        <div className="preview-portfolio">
                          <div className="preview-gallery">
                            <div className="gallery-item"></div>
                            <div className="gallery-item"></div>
                            <div className="gallery-item"></div>
                            <div className="gallery-item"></div>
                          </div>
                        </div>
                      )}
                      {(template.preview === "ecommerce" ||
                        template.preview === "fashion") && (
                        <div className="preview-ecommerce">
                          <div className="product-grid-large">
                            <div className="product-item"></div>
                            <div className="product-item"></div>
                            <div className="product-item"></div>
                            <div className="product-item"></div>
                          </div>
                        </div>
                      )}
                      {template.preview === "restaurant" && (
                        <div className="preview-restaurant">
                          <div className="menu-header"></div>
                          <div className="menu-items">
                            <div className="menu-item"></div>
                            <div className="menu-item"></div>
                          </div>
                        </div>
                      )}
                      {template.preview === "photo" && (
                        <div className="preview-photo">
                          <div className="photo-hero"></div>
                          <div className="photo-grid">
                            <div className="photo-item"></div>
                            <div className="photo-item"></div>
                          </div>
                        </div>
                      )}
                      {template.preview === "startup" && (
                        <div className="preview-startup">
                          <div className="startup-nav"></div>
                          <div className="startup-hero">
                            <div className="startup-text"></div>
                            <div className="startup-buttons">
                              <div className="startup-btn"></div>
                              <div className="startup-btn"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      {template.preview === "blog" && (
                        <div className="preview-blog">
                          <div className="blog-header"></div>
                          <div className="blog-posts">
                            <div className="blog-post"></div>
                            <div className="blog-post"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="template-overlay-large">
                      <div className="device-preview">
                        <button className="device-btn active">
                          <Monitor size={16} />
                        </button>
                        <button className="device-btn">
                          <Smartphone size={16} />
                        </button>
                      </div>
                      <button className="preview-btn-large">
                        <Eye size={16} />
                        Preview
                      </button>
                    </div>
                  </div>
                  <div className="template-info-large">
                    <h3>{template.name}</h3>
                    <span className="template-category">
                      {template.category}
                    </span>
                    <button
                      className="use-template-btn"
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
  );
};

export default DashboardPage;
