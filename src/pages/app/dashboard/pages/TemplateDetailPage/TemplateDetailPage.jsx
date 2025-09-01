// TemplateDetailPage.js
// Remove the TemplateInstallModal import since it's no longer used
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Globe,
  Eye,
  Users,
  Clock,
  Shield,
  Smartphone,
  Search,
  Zap,
  CheckCircle,
  Play,
  ExternalLink,
  ArrowLeft,
  Share2,
  Bookmark,
  Tag,
  DollarSign,
  Monitor,
  Tablet,
  Code,
  Palette,
  Settings,
  MessageCircle,
  ThumbsUp,
  Award,
  TrendingUp,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import { useTemplate } from "../../../../../hooks/useTemplate";
import { useUser } from "../../../../../hooks/useUser";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import styles from "./TemplateDetailPage.module.css";
import { get_image_url } from "../../../../../utils/constants";

const TemplateDetailPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    currentTemplate,
    loading,
    error,
    fetchTemplate,
    likeTemplate,
    fetchTemplateReviews,
  } = useTemplate();

  // Local state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [showShareModal, setShowShareModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (templateId) {
      fetchTemplate(templateId);
      fetchTemplateReviews(templateId);
    }
  }, [templateId]);

  if (loading.templateDetails) {
    return (
      <DashboardLayout>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading template...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error.templateDetails) {
    return (
      <DashboardLayout>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Template Not Found</h2>
          <p>{error.templateDetails}</p>
          <button
            onClick={() => navigate("/templates")}
            className={styles.backBtn}
          >
            Browse Templates
          </button>
        </div>
      </DashboardLayout>
    );
  }

  if (!currentTemplate) {
    return (
      <DashboardLayout>
        <div>Template not found</div>
      </DashboardLayout>
    );
  }

  const template = currentTemplate;

  // Parse preview images - handle both string and array formats
  let previewImages = [];
  if (template.preview_images) {
    if (typeof template.preview_images === "string") {
      try {
        // If it's a JSON string, parse it
        previewImages = JSON.parse(template.preview_images);
      } catch (e) {
        // If parsing fails, treat as single URL
        previewImages = [template.preview_images];
      }
    } else if (Array.isArray(template.preview_images)) {
      // If it's already an array, use it directly
      previewImages = template.preview_images;
    }
  }

  // Add thumbnail as the first image if it exists
  const allImages = [
    ...(template.thumbnail ? [template.thumbnail] : []),
    ...previewImages,
  ]
    .filter(Boolean)
    .map((item) => get_image_url(item));

  const handleLike = async () => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }

    try {
      await likeTemplate(template.id);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking template:", error);
    }
  };

  const handleViewSample = () => {
    // Navigate to the dashboard sample viewer with template context
    const sampleUrl = `/dashboard/sample/${template.template_id}`;
    window.open(sampleUrl, "_blank");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const getPricingColor = (tier) => {
    const colors = {
      free: "#10b981",
      premium: "#f59e0b",
      pro: "#8b5cf6",
      enterprise: "#ef4444",
    };
    return colors[tier] || "#6b7280";
  };

  const formatPrice = (price, tier) => {
    if (tier === "free") return "Free";
    return `$${parseFloat(price).toFixed(2)}`;
  };

  return (
    <DashboardLayout>
      <div className={styles.templateDetail}>
        {/* Header */}
        <div className={styles.header}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            <ArrowLeft size={20} />
            Back
          </button>

          <div className={styles.headerActions}>
            <button
              onClick={() => setShowShareModal(true)}
              className={styles.shareBtn}
            >
              <Share2 size={18} />
              Share
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`${styles.bookmarkBtn} ${
                isBookmarked ? styles.bookmarked : ""
              }`}
            >
              <Bookmark size={18} />
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {/* Left Column - Preview */}
          <div className={styles.previewSection}>
            <div className={styles.previewContainer}>
              {allImages.length > 0 && (
                <>
                  <div
                    className={`${styles.previewFrame} ${styles[previewMode]}`}
                  >
                    <img
                      src={allImages[currentImageIndex]}
                      alt={`${template.name} preview ${currentImageIndex + 1}`}
                      className={styles.previewImage}
                    />

                    {allImages.length > 1 && (
                      <>
                        <button className={styles.prevBtn} onClick={prevImage}>
                          <ChevronLeft size={24} />
                        </button>
                        <button className={styles.nextBtn} onClick={nextImage}>
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Preview Mode Controls */}
                  <div className={styles.previewControls}>
                    <div className={styles.deviceToggle}>
                      <button
                        className={
                          previewMode === "desktop" ? styles.active : ""
                        }
                        onClick={() => setPreviewMode("desktop")}
                      >
                        <Monitor size={16} />
                        Desktop
                      </button>
                      <button
                        className={
                          previewMode === "tablet" ? styles.active : ""
                        }
                        onClick={() => setPreviewMode("tablet")}
                      >
                        <Tablet size={16} />
                        Tablet
                      </button>
                      <button
                        className={
                          previewMode === "mobile" ? styles.active : ""
                        }
                        onClick={() => setPreviewMode("mobile")}
                      >
                        <Smartphone size={16} />
                        Mobile
                      </button>
                    </div>

                    {template.demo_url && (
                      <button
                        onClick={handleViewSample}
                        className={styles.livePreviewBtn}
                      >
                        <ExternalLink size={16} />
                        View Sample Site
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className={styles.thumbnailGallery}>
                {allImages.map((image, index) => {
                  return (
                    <button
                      key={index}
                      className={`${styles.thumbnail} ${
                        index === currentImageIndex ? styles.active : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={image} alt={`Preview ${index + 1}`} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className={styles.detailsSection}>
            <div className={styles.templateHeader}>
              <div className={styles.templateBadges}>
                {template.is_featured && (
                  <span
                    className={styles.badge}
                    style={{ background: "#f59e0b" }}
                  >
                    <Award size={14} />
                    Featured
                  </span>
                )}
                {template.is_trending && (
                  <span
                    className={styles.badge}
                    style={{ background: "#10b981" }}
                  >
                    <TrendingUp size={14} />
                    Trending
                  </span>
                )}
                {template.is_new && (
                  <span
                    className={styles.badge}
                    style={{ background: "#3b82f6" }}
                  >
                    ⭐ New
                  </span>
                )}
              </div>

              <h1>{template.name}</h1>
              <p className={styles.shortDescription}>
                {template.short_description}
              </p>

              {/* Stats */}
              <div className={styles.templateStats}>
                <div className={styles.stat}>
                  <div className={styles.statValue}>
                    {parseFloat(template.average_rating).toFixed(1)}
                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                  </div>
                  <div className={styles.statLabel}>
                    ({template.rating_count} reviews)
                  </div>
                </div>

                <div className={styles.stat}>
                  <div className={styles.statValue}>
                    <Globe size={16} />
                    {(template.installation_count || 0).toLocaleString()}
                  </div>
                  <div className={styles.statLabel}>Installations</div>
                </div>

                <div className={styles.stat}>
                  <div className={styles.statValue}>
                    <Download size={16} />
                    {(template.download_count || 0).toLocaleString()}
                  </div>
                  <div className={styles.statLabel}>Downloads</div>
                </div>

                <div className={styles.stat}>
                  <div className={styles.statValue}>
                    <Eye size={16} />
                    {(template.view_count || 0).toLocaleString()}
                  </div>
                  <div className={styles.statLabel}>Views</div>
                </div>
              </div>
            </div>

            {/* Pricing & Actions */}
            <div className={styles.pricingSection}>
              <div className={styles.pricing}>
                <div
                  className={styles.priceTag}
                  style={{ color: getPricingColor(template.pricing_tier) }}
                >
                  {formatPrice(template.price, template.pricing_tier)}
                </div>
                <div className={styles.pricingTier}>
                  {template.pricing_tier.charAt(0).toUpperCase() +
                    template.pricing_tier.slice(1)}
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  onClick={handleViewSample}
                  className={styles.viewSampleBtn}
                >
                  <ExternalLink size={20} />
                  View Sample Site
                </button>

                <div className={styles.secondaryActions}>
                  <button
                    onClick={handleLike}
                    className={`${styles.likeBtn} ${
                      isLiked ? styles.liked : ""
                    }`}
                  >
                    <Heart size={18} />
                    {template.like_count || 0}
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className={styles.featuresSection}>
              <h3>Key Features</h3>
              <div className={styles.featureGrid}>
                {template.is_responsive && (
                  <div className={styles.feature}>
                    <Smartphone size={20} />
                    <span>Mobile Responsive</span>
                  </div>
                )}
                {template.is_seo_optimized && (
                  <div className={styles.feature}>
                    <Search size={20} />
                    <span>SEO Optimized</span>
                  </div>
                )}
                {template.is_accessible && (
                  <div className={styles.feature}>
                    <Shield size={20} />
                    <span>Accessibility Ready</span>
                  </div>
                )}
                <div className={styles.feature}>
                  <Zap size={20} />
                  <span>Fast Loading</span>
                </div>
                <div className={styles.feature}>
                  <Code size={20} />
                  <span>Clean Code</span>
                </div>
                <div className={styles.feature}>
                  <Palette size={20} />
                  <span>Customizable</span>
                </div>
              </div>

              {template.features && template.features.length > 0 && (
                <div className={styles.additionalFeatures}>
                  {template.features.map((feature, index) => (
                    <span key={index} className={styles.featureTag}>
                      <CheckCircle size={14} />
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            {template.tags && template.tags.length > 0 && (
              <div className={styles.tagsSection}>
                <h3>Tags</h3>
                <div className={styles.tags}>
                  {template.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      <Tag size={12} />
                      {typeof tag === "string" ? tag : tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className={styles.tabsSection}>
          <div className={styles.tabs}>
            <button
              className={activeTab === "overview" ? styles.active : ""}
              onClick={() => setActiveTab("overview")}
            >
              <Info size={16} />
              Overview
            </button>
            <button
              className={activeTab === "pages" ? styles.active : ""}
              onClick={() => setActiveTab("pages")}
            >
              <Settings size={16} />
              Included Pages
            </button>
            <button
              className={activeTab === "reviews" ? styles.active : ""}
              onClick={() => setActiveTab("reviews")}
            >
              <MessageCircle size={16} />
              Reviews ({template.rating_count || 0})
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "overview" && (
              <div className={styles.overviewTab}>
                <div className={styles.description}>
                  <h3>About This Template</h3>
                  <div className={styles.descriptionContent}>
                    {template.description
                      .split("\n")
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                </div>

                <div className={styles.specifications}>
                  <h3>Specifications</h3>
                  <div className={styles.specGrid}>
                    <div className={styles.spec}>
                      <span className={styles.specLabel}>Category:</span>
                      <span>{template.category?.name}</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.specLabel}>Complexity:</span>
                      <span>
                        {template.complexity_level.charAt(0).toUpperCase() +
                          template.complexity_level.slice(1)}
                      </span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.specLabel}>Version:</span>
                      <span>{template.current_version}</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.specLabel}>Template ID:</span>
                      <span className={styles.templateId}>
                        {template.template_id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pages" && (
              <div className={styles.pagesTab}>
                <h3>Included Pages</h3>
                {template.included_pages &&
                template.included_pages.length > 0 ? (
                  <div className={styles.pagesList}>
                    {template.included_pages.map((page, index) => (
                      <div key={index} className={styles.pageItem}>
                        <div className={styles.pageIcon}>📄</div>
                        <div className={styles.pageInfo}>
                          <h4>{page.name}</h4>
                          <p>Page type: {page.type}</p>
                        </div>
                        {page.show_in_menu && (
                          <div className={styles.menuBadge}>In Menu</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No specific pages defined for this template.</p>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className={styles.reviewsTab}>
                <div className={styles.reviewsHeader}>
                  <h3>Customer Reviews</h3>
                  {template.rating_count > 0 && (
                    <div className={styles.overallRating}>
                      <div className={styles.ratingValue}>
                        {template.average_rating.toFixed(1)}
                        <Star size={20} fill="#fbbf24" color="#fbbf24" />
                      </div>
                      <div className={styles.ratingBreakdown}>
                        Based on {template.rating_count} reviews
                      </div>
                    </div>
                  )}
                </div>

                {template.rating_count === 0 ? (
                  <div className={styles.noReviews}>
                    <MessageCircle size={48} />
                    <h4>No reviews yet</h4>
                    <p>Be the first to review this template!</p>
                  </div>
                ) : (
                  <div className={styles.reviewsList}>
                    {/* Reviews would be loaded here */}
                    <div className={styles.reviewItem}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewerInfo}>
                          <div className={styles.reviewerAvatar}>JD</div>
                          <div>
                            <div className={styles.reviewerName}>John Doe</div>
                            <div className={styles.reviewDate}>2 weeks ago</div>
                          </div>
                        </div>
                        <div className={styles.reviewRating}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              fill="#fbbf24"
                              color="#fbbf24"
                            />
                          ))}
                        </div>
                      </div>
                      <p className={styles.reviewComment}>
                        Great template! Easy to customize and looks
                        professional. Perfect for my restaurant business.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Share Template</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.shareOptions}>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
              >
                📋 Copy Link
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}&text=${encodeURIComponent(
                      `Check out this template: ${template.name}`
                    )}`,
                    "_blank"
                  )
                }
              >
                🐦 Share on Twitter
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`,
                    "_blank"
                  )
                }
              >
                📘 Share on Facebook
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TemplateDetailPage;
