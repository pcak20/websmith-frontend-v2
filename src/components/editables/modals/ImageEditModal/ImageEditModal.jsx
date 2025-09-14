import React, { useState } from "react";
import styles from "./ImageEditModal.module.css";

const ImageEditModal = ({
  isOpen,
  onClose,
  imageData,
  onSave,
  containerDimensions,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(imageData?.src || null);
  const [blur, setBlur] = useState(imageData?.blur || 0);
  const [objectFit, setObjectFit] = useState(imageData?.objectFit || "cover");
  const [objectPosition, setObjectPosition] = useState(
    imageData?.objectPosition || "center"
  );
  const [altText, setAltText] = useState(imageData?.alt || "");

  // Track which properties have been changed
  const [changedProperties, setChangedProperties] = useState(new Set());

  // Track if advanced options are expanded
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setChangedProperties((prev) => new Set(prev).add("src"));
    }
  };

  const handleBlurChange = (value) => {
    setBlur(value);
    setChangedProperties((prev) => new Set(prev).add("blur"));
  };

  const handleObjectFitChange = (value) => {
    setObjectFit(value);
    setChangedProperties((prev) => new Set(prev).add("objectFit"));
  };

  const handleObjectPositionChange = (value) => {
    setObjectPosition(value);
    setChangedProperties((prev) => new Set(prev).add("objectPosition"));
  };

  const handleAltTextChange = (value) => {
    setAltText(value);
    setChangedProperties((prev) => new Set(prev).add("alt"));
  };

  const handleSave = () => {
    // Only include properties that were actually changed
    const updatedData = { ...imageData }; // Start with existing data

    if (changedProperties.has("src")) {
      updatedData.src = previewUrl;
      updatedData.file = selectedFile;
    }
    if (changedProperties.has("blur")) {
      updatedData.blur = blur;
    }
    if (changedProperties.has("objectFit")) {
      updatedData.objectFit = objectFit;
    }
    if (changedProperties.has("objectPosition")) {
      updatedData.objectPosition = objectPosition;
    }
    if (changedProperties.has("alt")) {
      updatedData.alt = altText;
    }

    onSave(updatedData);
    onClose();
  };

  const handleCancel = () => {
    // Only revoke URLs that were created in this session and not saved
    if (
      selectedFile &&
      previewUrl &&
      previewUrl !== imageData?.src &&
      previewUrl.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(imageData?.src || null);
    setBlur(imageData?.blur || 0);
    setObjectFit(imageData?.objectFit || "cover");
    setObjectPosition(imageData?.objectPosition || "center");
    setAltText(imageData?.alt || "");
    setChangedProperties(new Set());
    setShowAdvancedOptions(false);
    onClose();
  };

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  // Update state when modal opens with new imageData
  React.useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
      setPreviewUrl(imageData?.src || null);
      setBlur(imageData?.blur || 0);
      setObjectFit(imageData?.objectFit || "cover");
      setObjectPosition(imageData?.objectPosition || "center");
      setAltText(imageData?.alt || "");
      setChangedProperties(new Set());
      setShowAdvancedOptions(false);
    }
  }, [isOpen, imageData]);

  // Cleanup object URLs on unmount
  React.useEffect(() => {
    return () => {
      if (selectedFile && previewUrl && previewUrl !== imageData?.src) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [selectedFile, previewUrl, imageData?.src]);

  if (!isOpen) return null;

  // Calculate preview dimensions to match real usage
  const getPreviewDimensions = () => {
    if (!containerDimensions) {
      return { width: 300, height: 200 };
    }

    const maxWidth = 400;
    const maxHeight = 300;
    const aspectRatio = containerDimensions.width / containerDimensions.height;

    let width, height;
    if (aspectRatio > maxWidth / maxHeight) {
      width = maxWidth;
      height = maxWidth / aspectRatio;
    } else {
      height = maxHeight;
      width = maxHeight * aspectRatio;
    }

    return { width: Math.round(width), height: Math.round(height) };
  };

  const previewDimensions = getPreviewDimensions();

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Edit Image</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalContent}>
          {/* Image Upload - Always Visible */}
          <div className={styles.formGroup}>
            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            {previewUrl && (
              <div className={styles.currentImage}>
                <p>Current Image:</p>
                <div
                  className={styles.imagePreview}
                  style={{
                    width: `${previewDimensions.width}px`,
                    height: `${previewDimensions.height}px`,
                  }}
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      filter: `blur(${blur}px)`,
                      objectFit: objectFit,
                      objectPosition: objectPosition,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Alt Text:</label>
            <input
              type="text"
              value={altText}
              onChange={(e) => handleAltTextChange(e.target.value)}
              className={styles.textInput}
              placeholder="Describe the image for accessibility..."
            />
          </div>

          {/* Advanced Options Toggle Button */}
          <div className={styles.advancedToggle}>
            <button
              type="button"
              className={styles.toggleButton}
              onClick={toggleAdvancedOptions}
            >
              {showAdvancedOptions ? "Hide" : "Show"} Styling Options
              <span
                className={`${styles.toggleIcon} ${
                  showAdvancedOptions ? styles.expanded : ""
                }`}
              >
                ▼
              </span>
            </button>
          </div>

          {/* Advanced Options - Collapsible */}
          {showAdvancedOptions && (
            <div className={styles.advancedOptions}>
              <div className={styles.formGroup}>
                <label>Blur Level: {blur}px</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={blur}
                  onChange={(e) => handleBlurChange(parseFloat(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Object Fit:</label>
                <select
                  value={objectFit}
                  onChange={(e) => handleObjectFitChange(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="cover">Cover</option>
                  <option value="contain">Contain</option>
                  <option value="fill">Fill</option>
                  <option value="scale-down">Scale Down</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Image Position:</label>
                <div className={styles.positionGrid}>
                  {[
                    { value: "top left", label: "↖" },
                    { value: "top center", label: "↑" },
                    { value: "top right", label: "↗" },
                    { value: "center left", label: "←" },
                    { value: "center", label: "●" },
                    { value: "center right", label: "→" },
                    { value: "bottom left", label: "↙" },
                    { value: "bottom center", label: "↓" },
                    { value: "bottom right", label: "↘" },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      className={`${styles.positionButton} ${
                        objectPosition === value ? styles.active : ""
                      }`}
                      onClick={() => handleObjectPositionChange(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {previewUrl && (
                <div className={styles.stylePreview}>
                  <p>Style Preview:</p>
                  <div
                    className={styles.previewContainer}
                    style={{
                      width: `${previewDimensions.width}px`,
                      height: `${previewDimensions.height}px`,
                    }}
                  >
                    <img
                      src={previewUrl}
                      alt="Style Preview"
                      style={{
                        filter: `blur(${blur}px)`,
                        objectFit: objectFit,
                        objectPosition: objectPosition,
                      }}
                    />
                  </div>
                  <div className={styles.previewInfo}>
                    <span>Object Fit: {objectFit}</span>
                    <span>Position: {objectPosition}</span>
                    <span>Blur: {blur}px</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Show which properties will be changed */}
          {changedProperties.size > 0 && (
            <div className={styles.changedIndicator}>
              <p>
                Properties to be updated:{" "}
                {Array.from(changedProperties).join(", ")}
              </p>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={!previewUrl}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditModal;
