// CreateCategoryModal.js
import React, { useState } from "react";
import {
  X,
  Save,
  Folder,
  Hash,
  Palette,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import styles from "./CreateCategoryModal.module.css";

const CreateCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  loading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent: "",
    icon: "",
    color: "#64748b",
    meta_title: "",
    meta_description: "",
    sort_order: 0,
    is_active: true,
  });

  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (formData.name.length > 100) {
      newErrors.name = "Category name must be less than 100 characters";
    }

    if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (formData.meta_title.length > 60) {
      newErrors.meta_title = "Meta title must be less than 60 characters";
    }

    if (formData.meta_description.length > 160) {
      newErrors.meta_description =
        "Meta description must be less than 160 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const categoryData = {
      ...formData,
      parent: formData.parent || null,
    };

    try {
      await onSubmit(categoryData);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleClose = () => {
    // Reset form
    setFormData({
      name: "",
      description: "",
      parent: "",
      icon: "",
      color: "#64748b",
      meta_title: "",
      meta_description: "",
      sort_order: 0,
      is_active: true,
    });
    setErrors({});
    onClose();
  };

  const commonIcons = [
    "folder",
    "grid",
    "layout",
    "image",
    "code",
    "smartphone",
    "monitor",
    "tablet",
    "globe",
    "star",
    "heart",
    "shopping-cart",
    "briefcase",
    "camera",
    "music",
    "video",
    "book",
    "users",
    "settings",
    "tool",
  ];

  const predefinedColors = [
    "#64748b",
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>
            <Folder size={20} />
            Create New Category
          </h2>
          <button className={styles.closeBtn} onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalContent}>
            <div className={styles.formGroup}>
              <label>Category Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Restaurant Templates"
                className={errors.name ? styles.error : ""}
                maxLength={100}
              />
              {errors.name && (
                <span className={styles.errorText}>
                  <AlertCircle size={14} />
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Brief description of this category..."
                rows={3}
                className={errors.description ? styles.error : ""}
                maxLength={500}
              />
              {errors.description && (
                <span className={styles.errorText}>
                  <AlertCircle size={14} />
                  {errors.description}
                </span>
              )}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Parent Category</label>
                <select
                  value={formData.parent}
                  onChange={(e) => handleInputChange("parent", e.target.value)}
                >
                  <option value="">No Parent (Top Level)</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    handleInputChange(
                      "sort_order",
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Icon</label>
              <div className={styles.iconInput}>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => handleInputChange("icon", e.target.value)}
                  placeholder="Icon name (e.g., folder, grid, layout)"
                />
              </div>
              <div className={styles.iconGrid}>
                {commonIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className={`${styles.iconBtn} ${
                      formData.icon === icon ? styles.selected : ""
                    }`}
                    onClick={() => handleInputChange("icon", icon)}
                    title={icon}
                  >
                    <Hash size={16} />
                    <span>{icon}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Color</label>
              <div className={styles.colorInput}>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className={styles.colorPicker}
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  placeholder="#64748b"
                  className={styles.colorText}
                />
              </div>
              <div className={styles.colorGrid}>
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`${styles.colorBtn} ${
                      formData.color === color ? styles.selected : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleInputChange("color", color)}
                    title={color}
                  />
                ))}
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
                placeholder="SEO title for this category"
                className={errors.meta_title ? styles.error : ""}
                maxLength={60}
              />
              {errors.meta_title && (
                <span className={styles.errorText}>
                  <AlertCircle size={14} />
                  {errors.meta_title}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>SEO Description</label>
              <textarea
                value={formData.meta_description}
                onChange={(e) =>
                  handleInputChange("meta_description", e.target.value)
                }
                placeholder="SEO description for this category"
                rows={2}
                className={errors.meta_description ? styles.error : ""}
                maxLength={160}
              />
              {errors.meta_description && (
                <span className={styles.errorText}>
                  <AlertCircle size={14} />
                  {errors.meta_description}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) =>
                    handleInputChange("is_active", e.target.checked)
                  }
                />
                <span>Active Category</span>
              </label>
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
                    Create Category
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
