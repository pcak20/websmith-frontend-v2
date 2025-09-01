// CreateTemplateModal.js
import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  Image as ImageIcon,
  Save,
  Eye,
  AlertCircle,
  Star,
  Palette,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Zap,
  Shield,
  Search,
  Plus,
  Trash2,
  CheckCircle,
} from "lucide-react";
import styles from "./CreateTemplateModal.module.css";

const CreateTemplateModal = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  configuration,
  loading,
  temp_registry,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    short_description: "",
    template_id: "",
    category: "",
    pricing_tier: "free",
    price: "0.00",
    complexity_level: "beginner",
    tags: [],
    business_categories: [],
    features: [],
    included_pages: [],
    color_schemes: [],
    font_options: [],
    configurable_features: {},
    required_features: [],
    is_featured: false,
    is_responsive: true,
    is_seo_optimized: true,
    is_accessible: true,
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    page_structure: {},
    default_content: {},
    design_system: {},
    components: {},
  });

  const [currentTag, setCurrentTag] = useState("");
  const [currentFeature, setCurrentFeature] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("basic");

  const thumbnailInputRef = useRef(null);
  const previewImagesInputRef = useRef(null);

  // Get configuration data with fallbacks
  const pricingTiers = configuration?.pricing_tiers || [
    { value: "free", label: "Free", description: "Available to all users" },
  ];

  const complexityLevels = configuration?.complexity_levels || [
    { value: "beginner", label: "Beginner", description: "Easy to customize" },
  ];

  const commonPages = configuration?.common_pages || [
    { name: "Home", type: "home", show_in_menu: true, menu_order: 0 },
  ];

  const commonFeatures = configuration?.common_features || [
    "Contact Forms",
    "Mobile Responsive",
    "SEO Optimized",
  ];

  const availableTags = configuration?.template_tags || [];
  const popularTags = configuration?.popular_tags || [];

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          thumbnail: "Image must be smaller than 5MB",
        }));
        return;
      }

      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target.result);
      reader.readAsDataURL(file);

      setErrors((prev) => ({
        ...prev,
        thumbnail: null,
      }));
    }
  };

  const handlePreviewImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      return file.type.startsWith("image/") && file.size < 5 * 1024 * 1024;
    });

    setPreviewImages((prev) => [...prev, ...validFiles]);
  };

  const removePreviewImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      handleInputChange("tags", [...formData.tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const addFeature = () => {
    if (
      currentFeature.trim() &&
      !formData.features.includes(currentFeature.trim())
    ) {
      handleInputChange("features", [
        ...formData.features,
        currentFeature.trim(),
      ]);
      setCurrentFeature("");
    }
  };

  const removeFeature = (featureToRemove) => {
    handleInputChange(
      "features",
      formData.features.filter((feature) => feature !== featureToRemove)
    );
  };

  const addPage = () => {
    if (
      currentPage.trim() &&
      !formData.included_pages.some((page) => page.name === currentPage.trim())
    ) {
      const newPage = {
        name: currentPage.trim(),
        type: "custom",
        show_in_menu: true,
        menu_order: formData.included_pages.length,
        content: {},
      };
      handleInputChange("included_pages", [
        ...formData.included_pages,
        newPage,
      ]);
      setCurrentPage("");
    }
  };

  const addCommonPage = (pageTemplate) => {
    if (
      !formData.included_pages.some((page) => page.name === pageTemplate.name)
    ) {
      handleInputChange("included_pages", [
        ...formData.included_pages,
        { ...pageTemplate },
      ]);
    }
  };

  const removePage = (pageToRemove) => {
    handleInputChange(
      "included_pages",
      formData.included_pages.filter((page) => page.name !== pageToRemove)
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Template name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!thumbnailFile) newErrors.thumbnail = "Template thumbnail is required";
    if (formData.tags.length === 0)
      newErrors.tags = "At least one tag is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setActiveTab("basic");
      return;
    }

    const templateData = new FormData();

    // Basic fields - match Django model exactly
    templateData.append("name", formData.name);
    templateData.append("description", formData.description);
    templateData.append("short_description", formData.short_description || "");
    templateData.append("category", formData.category);
    templateData.append("pricing_tier", formData.pricing_tier);
    templateData.append("price", formData.price);
    templateData.append("complexity_level", formData.complexity_level);
    templateData.append("is_responsive", formData.is_responsive);
    templateData.append("is_seo_optimized", formData.is_seo_optimized);
    templateData.append("is_accessible", formData.is_accessible);
    templateData.append("is_featured", formData.is_featured);
    templateData.append("meta_title", formData.meta_title || "");
    templateData.append("meta_description", formData.meta_description || "");
    templateData.append("meta_keywords", formData.meta_keywords || "");
    templateData.append("template_id", formData.template_id || "");

    // JSON fields
    templateData.append(
      "page_structure",
      JSON.stringify(formData.page_structure)
    );
    templateData.append(
      "default_content",
      JSON.stringify(formData.default_content)
    );
    templateData.append(
      "design_system",
      JSON.stringify(formData.design_system)
    );
    templateData.append("components", JSON.stringify(formData.components));
    templateData.append("features", JSON.stringify(formData.features));
    templateData.append(
      "included_pages",
      JSON.stringify(formData.included_pages)
    );
    templateData.append(
      "color_schemes",
      JSON.stringify(formData.color_schemes)
    );
    templateData.append("font_options", JSON.stringify(formData.font_options));
    templateData.append(
      "configurable_features",
      JSON.stringify(formData.configurable_features)
    );
    templateData.append(
      "required_features",
      JSON.stringify(formData.required_features)
    );

    // Tags array
    templateData.append("tags", JSON.stringify(formData.tags));

    // Business categories (if any selected)
    if (formData.business_categories.length > 0) {
      templateData.append(
        "business_categories",
        JSON.stringify(formData.business_categories)
      );
    }

    // Files
    if (thumbnailFile) {
      templateData.append("thumbnail", thumbnailFile);
    }

    // Preview images
    if (previewImages.length > 0) {
      const previewImageUrls = [];
      previewImages.forEach((file, index) => {
        templateData.append(`preview_image_${index}`, file);
        previewImageUrls.push(`preview_image_${index}`);
      });
      templateData.append("preview_images", JSON.stringify(previewImageUrls));
    }

    try {
      await onSubmit(templateData);
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };

  const handleClose = () => {
    // Reset form
    setFormData({
      name: "",
      description: "",
      short_description: "",
      category: "",
      pricing_tier: "free",
      price: "0.00",
      complexity_level: "beginner",
      tags: [],
      business_categories: [],
      features: [],
      included_pages: [],
      color_schemes: [],
      font_options: [],
      configurable_features: {},
      required_features: [],
      is_featured: false,
      is_responsive: true,
      is_seo_optimized: true,
      is_accessible: true,
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      page_structure: {},
      default_content: {},
      design_system: {},
      components: {},
    });
    setCurrentTag("");
    setCurrentFeature("");
    setCurrentPage("");
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setPreviewImages([]);
    setErrors({});
    setActiveTab("basic");
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Create New Template</h2>
          <button className={styles.closeBtn} onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalTabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "basic" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Info
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "design" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("design")}
          >
            Design & Features
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "files" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("files")}
          >
            Files & Media
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "settings" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalContent}>
            {activeTab === "basic" && (
              <div className={styles.tabContent}>
                <div className={styles.formGroup}>
                  <label>Template Base *</label>
                  <select
                    value={formData.template_id}
                    onChange={(e) =>
                      handleInputChange("template_id", e.target.value)
                    }
                    className={errors.template_id ? styles.error : ""}
                  >
                    <option value="">Select a template base</option>
                    {Object.keys(temp_registry).map((the_key) => {
                      const template = temp_registry[the_key];
                      return (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.template_id && (
                    <span className={styles.errorText}>
                      {errors.template_id}
                    </span>
                  )}
                </div>

                {/* Show template ID field (read-only, auto-filled) */}
                {formData.template_id && (
                  <div className={styles.formGroup}>
                    <label>Template ID</label>
                    <input
                      type="text"
                      value={formData.template_id}
                      readOnly
                      className={styles.readOnly}
                    />
                    <small className={styles.helpText}>
                      This ID connects your template to the frontend components
                    </small>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label>Template Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Modern Restaurant Template"
                    className={errors.name ? styles.error : ""}
                  />
                  {errors.name && (
                    <span className={styles.errorText}>{errors.name}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe what makes this template special..."
                    rows={4}
                    className={errors.description ? styles.error : ""}
                  />
                  {errors.description && (
                    <span className={styles.errorText}>
                      {errors.description}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Short Description</label>
                  <input
                    type="text"
                    value={formData.short_description}
                    onChange={(e) =>
                      handleInputChange("short_description", e.target.value)
                    }
                    placeholder="Brief description for template cards (max 160 chars)"
                    maxLength={160}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className={errors.category ? styles.error : ""}
                    >
                      <option value="">Select Category</option>
                      {categories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <span className={styles.errorText}>
                        {errors.category}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Pricing Tier</label>
                    <select
                      value={formData.pricing_tier}
                      onChange={(e) =>
                        handleInputChange("pricing_tier", e.target.value)
                      }
                    >
                      {pricingTiers.map((tier) => (
                        <option key={tier.value} value={tier.value}>
                          {tier.label} - {tier.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.pricing_tier !== "free" && (
                  <div className={styles.formGroup}>
                    <label>Price</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      placeholder="0.00"
                    />
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label>Complexity Level</label>
                  <select
                    value={formData.complexity_level}
                    onChange={(e) =>
                      handleInputChange("complexity_level", e.target.value)
                    }
                  >
                    {complexityLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label} - {level.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Tags *</label>
                  <div className={styles.tagInput}>
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add tags..."
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className={styles.addBtn}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Popular Tags Quick Select */}
                  {popularTags.length > 0 && (
                    <div className={styles.quickAdd}>
                      <span>Popular tags: </span>
                      {popularTags.slice(0, 8).map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => {
                            if (!formData.tags.includes(tag.name)) {
                              handleInputChange("tags", [
                                ...formData.tags,
                                tag.name,
                              ]);
                            }
                          }}
                          className={`${styles.quickAddBtn} ${
                            formData.tags.includes(tag.name)
                              ? styles.disabled
                              : ""
                          }`}
                          disabled={formData.tags.includes(tag.name)}
                          style={{
                            borderColor: tag.color,
                            color: formData.tags.includes(tag.name)
                              ? "#9ca3af"
                              : tag.color,
                          }}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* All Available Tags */}
                  {availableTags.length > 0 && (
                    <details className={styles.tagBrowser}>
                      <summary>
                        Browse all tags ({availableTags.length})
                      </summary>
                      <div className={styles.tagGrid}>
                        {availableTags.map((tag) => (
                          <button
                            key={tag.id}
                            type="button"
                            onClick={() => {
                              if (!formData.tags.includes(tag.name)) {
                                handleInputChange("tags", [
                                  ...formData.tags,
                                  tag.name,
                                ]);
                              }
                            }}
                            className={`${styles.tagOption} ${
                              formData.tags.includes(tag.name)
                                ? styles.selected
                                : ""
                            }`}
                            disabled={formData.tags.includes(tag.name)}
                            style={{ borderColor: tag.color }}
                          >
                            <span
                              className={styles.tagColorDot}
                              style={{ backgroundColor: tag.color }}
                            />
                            {tag.name}
                            <span className={styles.tagUsage}>
                              ({tag.usage_count})
                            </span>
                          </button>
                        ))}
                      </div>
                    </details>
                  )}

                  <div className={styles.tagList}>
                    {formData.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.tags && (
                    <span className={styles.errorText}>{errors.tags}</span>
                  )}
                </div>
              </div>
            )}

            {activeTab === "design" && (
              <div className={styles.tabContent}>
                <div className={styles.formGroup}>
                  <label>Features</label>
                  <div className={styles.tagInput}>
                    <input
                      type="text"
                      value={currentFeature}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      placeholder="Add features..."
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addFeature())
                      }
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className={styles.addBtn}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className={styles.quickAdd}>
                    <span>Quick add: </span>
                    {commonFeatures.slice(0, 8).map((feature) => (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => {
                          if (!formData.features.includes(feature)) {
                            handleInputChange("features", [
                              ...formData.features,
                              feature,
                            ]);
                          }
                        }}
                        className={styles.quickAddBtn}
                        disabled={formData.features.includes(feature)}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                  <div className={styles.tagList}>
                    {formData.features.map((feature, index) => (
                      <span key={index} className={styles.tag}>
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Included Pages</label>
                  <div className={styles.tagInput}>
                    <input
                      type="text"
                      value={currentPage}
                      onChange={(e) => setCurrentPage(e.target.value)}
                      placeholder="Add custom page..."
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addPage())
                      }
                    />
                    <button
                      type="button"
                      onClick={addPage}
                      className={styles.addBtn}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className={styles.quickAdd}>
                    <span>Common pages: </span>
                    {commonPages.slice(0, 8).map((page) => (
                      <button
                        key={page.name}
                        type="button"
                        onClick={() => addCommonPage(page)}
                        className={styles.quickAddBtn}
                        disabled={formData.included_pages.some(
                          (p) => p.name === page.name
                        )}
                      >
                        {page.name}
                      </button>
                    ))}
                  </div>
                  <div className={styles.tagList}>
                    {formData.included_pages.map((page, index) => (
                      <span key={index} className={styles.tag}>
                        {page.name}
                        <button
                          type="button"
                          onClick={() => removePage(page.name)}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "files" && (
              <div className={styles.tabContent}>
                <div className={styles.formGroup}>
                  <label>Template Thumbnail *</label>
                  <div className={styles.thumbnailUpload}>
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      style={{ display: "none" }}
                    />
                    <div
                      className={`${styles.thumbnailPreview} ${
                        errors.thumbnail ? styles.error : ""
                      }`}
                      onClick={() => thumbnailInputRef.current?.click()}
                    >
                      {thumbnailPreview ? (
                        <img src={thumbnailPreview} alt="Template thumbnail" />
                      ) : (
                        <div className={styles.thumbnailPlaceholder}>
                          <ImageIcon size={48} />
                          <p>Click to upload thumbnail</p>
                          <span>Recommended: 800x600px</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.thumbnail && (
                    <span className={styles.errorText}>{errors.thumbnail}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Preview Images</label>
                  <div className={styles.fileUpload}>
                    <input
                      ref={previewImagesInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePreviewImagesUpload}
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      onClick={() => previewImagesInputRef.current?.click()}
                      className={styles.uploadBtn}
                    >
                      <Upload size={20} />
                      Upload Preview Images
                    </button>
                    <p className={styles.uploadHelp}>
                      Upload additional images to showcase your template. Max
                      5MB per file.
                    </p>
                  </div>

                  {previewImages.length > 0 && (
                    <div className={styles.fileList}>
                      {previewImages.map((file, index) => (
                        <div key={index} className={styles.fileItem}>
                          <ImageIcon size={16} />
                          <span>{file.name}</span>
                          <span className={styles.fileSize}>
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                          <button
                            type="button"
                            onClick={() => removePreviewImage(index)}
                            className={styles.removeFileBtn}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className={styles.tabContent}>
                <div className={styles.formGroup}>
                  <label>Template Flags</label>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) =>
                          handleInputChange("is_featured", e.target.checked)
                        }
                      />
                      <Star size={16} />
                      Featured Template
                    </label>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={formData.is_responsive}
                        onChange={(e) =>
                          handleInputChange("is_responsive", e.target.checked)
                        }
                      />
                      <Smartphone size={16} />
                      Mobile Responsive
                    </label>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={formData.is_seo_optimized}
                        onChange={(e) =>
                          handleInputChange(
                            "is_seo_optimized",
                            e.target.checked
                          )
                        }
                      />
                      <Search size={16} />
                      SEO Optimized
                    </label>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={formData.is_accessible}
                        onChange={(e) =>
                          handleInputChange("is_accessible", e.target.checked)
                        }
                      />
                      <Shield size={16} />
                      Accessibility Ready
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>SEO Title</label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) =>
                      handleInputChange("meta_title", e.target.value)
                    }
                    placeholder="SEO title for this template"
                    maxLength={60}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>SEO Description</label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) =>
                      handleInputChange("meta_description", e.target.value)
                    }
                    placeholder="SEO description for this template"
                    maxLength={160}
                    rows={3}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>SEO Keywords</label>
                  <input
                    type="text"
                    value={formData.meta_keywords}
                    onChange={(e) =>
                      handleInputChange("meta_keywords", e.target.value)
                    }
                    placeholder="Comma-separated keywords"
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelBtn}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className={styles.spinner} />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Create Template
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplateModal;
