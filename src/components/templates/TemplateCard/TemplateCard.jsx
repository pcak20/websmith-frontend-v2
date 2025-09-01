// components/common/TemplateCard/TemplateCard.js
import React from "react";
import { Star, Download, Eye, Heart, Plus, ShoppingCart } from "lucide-react";
import StatusBadge from "../../UI/StatusBadge/StatusBadge";
import Button from "../../UI/Button/Button";
import styles from "./TemplateCard.module.css";

const TemplateCard = ({
  template,
  onSelect,
  onPreview,
  onLike,
  onUse,
  variant = "default", // default, compact, detailed
  showActions = true,
  loading = false,
  className = "",
}) => {
  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    if (onSelect) onSelect(template);
  };

  return (
    <div
      className={`${styles.templateCard} ${styles[variant]} ${
        loading ? styles.loading : ""
      } ${className}`}
      onClick={handleCardClick}
    >
      {/* Template Preview */}
      <div className={styles.templatePreview}>
        {template.thumbnail ? (
          <img
            src={template.thumbnail}
            alt={template.name}
            className={styles.templateImage}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholderImage}>
            <div className={styles.placeholderIcon}>🎨</div>
          </div>
        )}

        {/* Overlay with badges and actions */}
        <div className={styles.overlay}>
          <div className={styles.badges}>
            {template.is_featured && (
              <StatusBadge
                status="featured"
                variant="warning"
                showDot={false}
              />
            )}
            {template.is_trending && (
              <StatusBadge
                status="trending"
                variant="success"
                showDot={false}
              />
            )}
            {template.is_new && (
              <StatusBadge status="new" variant="primary" showDot={false} />
            )}
            {template.pricing_tier === "free" || template.price === 0 ? (
              <StatusBadge status="free" variant="success" showDot={false} />
            ) : (
              <span className={styles.priceBadge}>${template.price}</span>
            )}
          </div>

          {template.average_rating > 0 && (
            <div className={styles.rating}>
              <Star size={14} fill="#fbbf24" color="#fbbf24" />
              <span>{template.average_rating.toFixed(1)}</span>
              {template.rating_count && (
                <span className={styles.ratingCount}>
                  ({template.rating_count})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Quick action buttons */}
        {showActions && (
          <div className={styles.quickActions}>
            {onPreview && (
              <button
                className={styles.quickAction}
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(template);
                }}
                title="Preview template"
              >
                <Eye size={16} />
              </button>
            )}
            {onLike && (
              <button
                className={`${styles.quickAction} ${
                  template.liked ? styles.liked : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(template);
                }}
                title="Like template"
              >
                <Heart size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Template Info */}
      <div className={styles.templateInfo}>
        <div className={styles.templateHeader}>
          <h4 className={styles.templateName}>{template.name}</h4>
          <div className={styles.templateMeta}>
            {template.complexity && (
              <span
                className={`${styles.complexity} ${
                  styles[template.complexity]
                }`}
              >
                {template.complexity}
              </span>
            )}
            {template.template_type && (
              <span
                className={`${styles.templateType} ${
                  styles[template.template_type]
                }`}
              >
                {template.template_type}
              </span>
            )}
          </div>
        </div>

        {variant !== "compact" && template.short_description && (
          <p className={styles.description}>{template.short_description}</p>
        )}

        {/* Template Features */}
        {variant === "detailed" && template.features && (
          <div className={styles.features}>
            {template.responsive_design && (
              <span className={styles.feature} title="Responsive Design">
                📱
              </span>
            )}
            {template.seo_optimized && (
              <span className={styles.feature} title="SEO Optimized">
                🔍
              </span>
            )}
            {template.mobile_optimized && (
              <span className={styles.feature} title="Mobile Optimized">
                📲
              </span>
            )}
            {template.accessibility_compliant && (
              <span className={styles.feature} title="Accessible">
                ♿
              </span>
            )}
          </div>
        )}

        {/* Template Stats */}
        {variant !== "compact" && (
          <div className={styles.stats}>
            <div className={styles.stat}>
              <Download size={12} />
              <span>{template.downloads_count?.toLocaleString() || "0"}</span>
            </div>
            <div className={styles.stat}>
              <Eye size={12} />
              <span>{template.views_count?.toLocaleString() || "0"}</span>
            </div>
            {template.likes_count > 0 && (
              <div className={styles.stat}>
                <Heart size={12} />
                <span>{template.likes_count?.toLocaleString() || "0"}</span>
              </div>
            )}
          </div>
        )}

        {/* Use Template Button */}
        {showActions && onUse && (
          <Button
            variant="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onUse(template);
            }}
            loading={loading}
            icon={
              template.pricing_tier === "free" || template.price === 0
                ? Plus
                : ShoppingCart
            }
            className={styles.useButton}
          >
            {template.pricing_tier === "free" || template.price === 0
              ? "Use Template"
              : `Use - $${template.price}`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TemplateCard;
