import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Eye,
  Download,
  Heart,
  Zap,
  Crown,
  Tag,
  Clock,
  Users,
  Smartphone,
  Monitor,
  Tablet,
  ChevronDown,
  X,
  Check,
  Play,
  ExternalLink,
  Palette,
  Layout,
  ShoppingBag,
  Camera,
  Briefcase,
  Coffee,
  Music,
  Plane,
  Home,
  BookOpen,
} from "lucide-react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout/DashboardLayout";
import styles from "./BrowseTemplatesDashboard.module.css";

const BrowseTemplatesDashboard = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock template data
  const templateCategories = [
    { id: "all", name: "All Templates", icon: Layout, count: 48 },
    { id: "business", name: "Business", icon: Briefcase, count: 12 },
    { id: "portfolio", name: "Portfolio", icon: Camera, count: 8 },
    { id: "ecommerce", name: "E-commerce", icon: ShoppingBag, count: 10 },
    { id: "restaurant", name: "Restaurant", icon: Coffee, count: 6 },
    { id: "blog", name: "Blog", icon: BookOpen, count: 5 },
    { id: "music", name: "Music", icon: Music, count: 3 },
    { id: "travel", name: "Travel", icon: Plane, count: 4 },
  ];

  const templates = [
    {
      id: 1,
      name: "Modern Business",
      category: "business",
      type: "premium",
      price: 49,
      rating: 4.8,
      reviews: 234,
      downloads: 1245,
      preview: "/previews/modern-business.jpg",
      demoUrl: "https://demo.modern-business.com",
      features: ["Responsive", "SEO Ready", "Fast Loading", "Mobile First"],
      description: "Professional business template with modern design",
      author: "WebCraft Team",
      lastUpdated: "2024-01-15",
      tags: ["corporate", "professional", "clean"],
      colors: ["#667eea", "#764ba2", "#f8fafc"],
    },
    {
      id: 2,
      name: "Creative Portfolio",
      category: "portfolio",
      type: "free",
      price: 0,
      rating: 4.6,
      reviews: 189,
      downloads: 2341,
      preview: "/previews/creative-portfolio.jpg",
      demoUrl: "https://demo.creative-portfolio.com",
      features: ["Gallery", "Animations", "Dark Mode", "Responsive"],
      description: "Showcase your creative work with this stunning portfolio",
      author: "Design Studio",
      lastUpdated: "2024-01-12",
      tags: ["creative", "portfolio", "minimal"],
      colors: ["#8b5cf6", "#06b6d4", "#ffffff"],
    },
    {
      id: 3,
      name: "E-commerce Pro",
      category: "ecommerce",
      type: "premium",
      price: 79,
      rating: 4.9,
      reviews: 456,
      downloads: 987,
      preview: "/previews/ecommerce-pro.jpg",
      demoUrl: "https://demo.ecommerce-pro.com",
      features: [
        "Shopping Cart",
        "Payment Integration",
        "Inventory",
        "Analytics",
      ],
      description: "Complete e-commerce solution with advanced features",
      author: "Commerce Experts",
      lastUpdated: "2024-01-18",
      tags: ["ecommerce", "shopping", "store"],
      colors: ["#f59e0b", "#ef4444", "#ffffff"],
    },
    {
      id: 4,
      name: "Restaurant Deluxe",
      category: "restaurant",
      type: "premium",
      price: 39,
      rating: 4.7,
      reviews: 123,
      downloads: 678,
      preview: "/previews/restaurant-deluxe.jpg",
      demoUrl: "https://demo.restaurant-deluxe.com",
      features: ["Menu System", "Reservations", "Location Map", "Reviews"],
      description: "Perfect template for restaurants and cafes",
      author: "Food Templates",
      lastUpdated: "2024-01-10",
      tags: ["restaurant", "food", "menu"],
      colors: ["#dc2626", "#f97316", "#fef3c7"],
    },
    {
      id: 5,
      name: "Minimal Blog",
      category: "blog",
      type: "free",
      price: 0,
      rating: 4.5,
      reviews: 321,
      downloads: 1876,
      preview: "/previews/minimal-blog.jpg",
      demoUrl: "https://demo.minimal-blog.com",
      features: ["Blog System", "Comments", "SEO", "Social Share"],
      description: "Clean and minimal blog template for writers",
      author: "Blog Masters",
      lastUpdated: "2024-01-08",
      tags: ["blog", "minimal", "writing"],
      colors: ["#1f2937", "#6b7280", "#f9fafb"],
    },
    {
      id: 6,
      name: "Music Studio",
      category: "music",
      type: "premium",
      price: 59,
      rating: 4.8,
      reviews: 87,
      downloads: 234,
      preview: "/previews/music-studio.jpg",
      demoUrl: "https://demo.music-studio.com",
      features: ["Audio Player", "Events", "Gallery", "Responsive"],
      description: "Perfect for musicians and music studios",
      author: "Sound Design",
      lastUpdated: "2024-01-14",
      tags: ["music", "audio", "events"],
      colors: ["#7c3aed", "#ec4899", "#000000"],
    },
    {
      id: 7,
      name: "Travel Agency",
      category: "travel",
      type: "premium",
      price: 69,
      rating: 4.6,
      reviews: 156,
      downloads: 445,
      preview: "/previews/travel-agency.jpg",
      demoUrl: "https://demo.travel-agency.com",
      features: ["Booking System", "Gallery", "Maps", "Reviews"],
      description: "Complete solution for travel agencies",
      author: "Travel Tech",
      lastUpdated: "2024-01-16",
      tags: ["travel", "booking", "tours"],
      colors: ["#0ea5e9", "#22d3ee", "#fef3c7"],
    },
    {
      id: 8,
      name: "Corporate Plus",
      category: "business",
      type: "free",
      price: 0,
      rating: 4.4,
      reviews: 289,
      downloads: 1567,
      preview: "/previews/corporate-plus.jpg",
      demoUrl: "https://demo.corporate-plus.com",
      features: ["Team Pages", "Services", "Contact Forms", "SEO"],
      description: "Professional corporate website template",
      author: "Corporate Designs",
      lastUpdated: "2024-01-11",
      tags: ["corporate", "business", "professional"],
      colors: ["#1e293b", "#3b82f6", "#f8fafc"],
    },
  ];

  const [filteredTemplates, setFilteredTemplates] = useState(templates);

  useEffect(() => {
    filterTemplates();
  }, [searchTerm, selectedCategory, selectedType, sortBy]);

  const filterTemplates = () => {
    let filtered = templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" || template.category === selectedCategory;
      const matchesType =
        selectedType === "all" || template.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.downloads - a.downloads;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredTemplates(filtered);
  };

  const handleTemplateSelect = (template) => {
    // Navigate to website creation with selected template
    navigate(`/dashboard/business/create-website?template=${template.id}`);
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  const toggleFavorite = (templateId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(templateId)) {
        newFavorites.delete(templateId);
      } else {
        newFavorites.add(templateId);
      }
      return newFavorites;
    });
  };

  const formatPrice = (price) => {
    return price === 0 ? "Free" : `$${price}`;
  };

  const getTypeIcon = (type) => {
    if (type === "premium")
      return <Crown size={16} className={styles.premiumIcon} />;
    return <Zap size={16} className={styles.freeIcon} />;
  };

  const PreviewModal = () => {
    if (!previewTemplate) return null;

    return (
      <div
        className={styles.modalOverlay}
        onClick={() => setPreviewTemplate(null)}
      >
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <div className={styles.modalTitle}>
              <h3>{previewTemplate.name}</h3>
              <div className={styles.templateMeta}>
                {getTypeIcon(previewTemplate.type)}
                <span className={styles.templatePrice}>
                  {formatPrice(previewTemplate.price)}
                </span>
                <div className={styles.templateRating}>
                  <Star size={14} />
                  <span>{previewTemplate.rating}</span>
                </div>
              </div>
            </div>
            <button
              className={styles.modalClose}
              onClick={() => setPreviewTemplate(null)}
            >
              <X size={20} />
            </button>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.previewContainer}>
              <div className={styles.previewFrame}>
                <div className={styles.previewPlaceholder}>
                  <Layout size={48} />
                  <p>Template Preview</p>
                  <p className={styles.previewDesc}>
                    {previewTemplate.description}
                  </p>
                </div>
              </div>

              <div className={styles.previewSidebar}>
                <div className={styles.previewInfo}>
                  <h4>Features</h4>
                  <div className={styles.featuresList}>
                    {previewTemplate.features.map((feature, index) => (
                      <div key={index} className={styles.featureItem}>
                        <Check size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.previewInfo}>
                  <h4>Details</h4>
                  <div className={styles.detailsList}>
                    <div className={styles.detailItem}>
                      <span>Author:</span>
                      <span>{previewTemplate.author}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Downloads:</span>
                      <span>{previewTemplate.downloads.toLocaleString()}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Rating:</span>
                      <span>
                        {previewTemplate.rating} ({previewTemplate.reviews}{" "}
                        reviews)
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span>Updated:</span>
                      <span>{previewTemplate.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.previewInfo}>
                  <h4>Colors</h4>
                  <div className={styles.colorPalette}>
                    {previewTemplate.colors.map((color, index) => (
                      <div
                        key={index}
                        className={styles.colorSwatch}
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button className={styles.demoBtn}>
              <ExternalLink size={16} />
              View Demo
            </button>
            <button
              className={styles.selectBtn}
              onClick={() => handleTemplateSelect(previewTemplate)}
            >
              <Check size={16} />
              Use This Template
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout activePage="templates">
      <div className={styles.browseTemplates}>
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <div className={styles.headerLeft}>
            <h1>Browse Templates</h1>
            <p className={styles.headerSubtitle}>
              Choose from {templates.length} professional website templates
            </p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.headerStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{templates.length}</span>
                <span className={styles.statLabel}>Templates</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {templateCategories.length - 1}
                </span>
                <span className={styles.statLabel}>Categories</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {templates.filter((t) => t.type === "free").length}
                </span>
                <span className={styles.statLabel}>Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className={styles.filtersBar}>
          <div className={styles.searchSection}>
            <div className={styles.searchBox}>
              <Search size={20} />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className={styles.filterToggle}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              Filters
              <ChevronDown
                size={16}
                className={showFilters ? styles.rotate : ""}
              />
            </button>
          </div>

          <div className={styles.controlsSection}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

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

        {/* Advanced Filters */}
        {showFilters && (
          <div className={styles.advancedFilters}>
            <div className={styles.filterSection}>
              <h4>Type</h4>
              <div className={styles.filterOptions}>
                <label className={styles.filterOption}>
                  <input
                    type="radio"
                    name="type"
                    value="all"
                    checked={selectedType === "all"}
                    onChange={(e) => setSelectedType(e.target.value)}
                  />
                  <span>All Templates</span>
                </label>
                <label className={styles.filterOption}>
                  <input
                    type="radio"
                    name="type"
                    value="free"
                    checked={selectedType === "free"}
                    onChange={(e) => setSelectedType(e.target.value)}
                  />
                  <span>Free Only</span>
                </label>
                <label className={styles.filterOption}>
                  <input
                    type="radio"
                    name="type"
                    value="premium"
                    checked={selectedType === "premium"}
                    onChange={(e) => setSelectedType(e.target.value)}
                  />
                  <span>Premium Only</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Categories Sidebar */}
          <div className={styles.categoriesSidebar}>
            <h3>Categories</h3>
            <div className={styles.categoriesList}>
              {templateCategories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryItem} ${
                    selectedCategory === category.id ? styles.active : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon size={20} />
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.categoryCount}>{category.count}</span>
                </button>
              ))}
            </div>

            <div className={styles.sidebarSection}>
              <h4>Filter by Features</h4>
              <div className={styles.featureFilters}>
                <label className={styles.featureFilter}>
                  <input type="checkbox" />
                  <span>Responsive Design</span>
                </label>
                <label className={styles.featureFilter}>
                  <input type="checkbox" />
                  <span>SEO Optimized</span>
                </label>
                <label className={styles.featureFilter}>
                  <input type="checkbox" />
                  <span>E-commerce Ready</span>
                </label>
                <label className={styles.featureFilter}>
                  <input type="checkbox" />
                  <span>Dark Mode</span>
                </label>
                <label className={styles.featureFilter}>
                  <input type="checkbox" />
                  <span>Animation Effects</span>
                </label>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className={styles.templatesContainer}>
            <div className={styles.resultsHeader}>
              <span className={styles.resultsCount}>
                {filteredTemplates.length} templates found
              </span>
            </div>

            <div className={`${styles.templatesGrid} ${styles[viewMode]}`}>
              {filteredTemplates.map((template) => (
                <div key={template.id} className={styles.templateCard}>
                  <div className={styles.templatePreview}>
                    <div className={styles.templateImage}>
                      <div className={styles.templatePlaceholder}>
                        <Layout size={32} />
                      </div>
                      <div className={styles.templateOverlay}>
                        <button
                          className={styles.previewBtn}
                          onClick={() => handlePreview(template)}
                        >
                          <Eye size={16} />
                          Preview
                        </button>
                        <button className={styles.demoBtn}>
                          <Play size={16} />
                          Demo
                        </button>
                      </div>
                    </div>

                    <div className={styles.templateBadges}>
                      {getTypeIcon(template.type)}
                      <button
                        className={`${styles.favoriteBtn} ${
                          favorites.has(template.id) ? styles.favorited : ""
                        }`}
                        onClick={() => toggleFavorite(template.id)}
                      >
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.templateInfo}>
                    <div className={styles.templateHeader}>
                      <h3 className={styles.templateName}>{template.name}</h3>
                      <div className={styles.templatePrice}>
                        {formatPrice(template.price)}
                      </div>
                    </div>

                    <p className={styles.templateDescription}>
                      {template.description}
                    </p>

                    <div className={styles.templateMeta}>
                      <div className={styles.templateRating}>
                        <Star size={14} />
                        <span>{template.rating}</span>
                        <span className={styles.reviewCount}>
                          ({template.reviews})
                        </span>
                      </div>
                      <div className={styles.templateDownloads}>
                        <Download size={14} />
                        <span>{template.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className={styles.templateTags}>
                      {template.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className={styles.templateTag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={styles.templateActions}>
                      <button
                        className={styles.previewAction}
                        onClick={() => handlePreview(template)}
                      >
                        <Eye size={16} />
                        Preview
                      </button>
                      <button
                        className={styles.selectAction}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <Check size={16} />
                        Use Template
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className={styles.noResults}>
                <Search size={48} />
                <h3>No templates found</h3>
                <p>Try adjusting your search terms or filters</p>
                <button
                  className={styles.clearFilters}
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedType("all");
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Modal */}
        {previewTemplate && <PreviewModal />}

        {/* Loading Overlay */}
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}>
              <Zap size={24} />
              <span>Loading templates...</span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BrowseTemplatesDashboard;
