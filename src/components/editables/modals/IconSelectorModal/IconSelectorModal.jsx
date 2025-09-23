import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Save, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./IconSelectorModal.module.css";

const IconSelectorModal = ({
  availableIcons,
  currentIcon = "Star",
  currentColor = "#000000",
  currentSize = 24,
  currentStrokeWidth = 2,
  onSave,
  onClose,
  isOpen = true,
}) => {
  // State management
  const [tempSelectedIcon, setTempSelectedIcon] = useState(currentIcon);
  const [iconColor, setIconColor] = useState(currentColor);
  const [iconSize, setIconSize] = useState(currentSize);
  const [strokeWidth, setStrokeWidth] = useState(currentStrokeWidth);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Refs for focus management
  const modalRef = useRef(null);
  const firstFocusableElementRef = useRef(null);
  const lastFocusableElementRef = useRef(null);

  // Reset state when modal opens with new props
  useEffect(() => {
    setTempSelectedIcon(currentIcon);
    setIconColor(currentColor);
    setIconSize(currentSize);
    setStrokeWidth(currentStrokeWidth);
    setShowAdvanced(false);
    setSearchTerm("");
  }, [currentIcon, currentColor, currentSize, currentStrokeWidth, isOpen]);

  // Handle saving the selected icon
  const handleSave = useCallback(() => {
    if (onSave) {
      onSave({
        icon: tempSelectedIcon,
        color: iconColor,
        size: iconSize,
        strokeWidth: strokeWidth,
      });
    }
  }, [tempSelectedIcon, iconColor, iconSize, strokeWidth, onSave]);

  // Handle modal close
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  // Handle escape key and focus management
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }

      // Tab key focus management
      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [handleClose]
  );

  // Add event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      // Focus the modal when it opens
      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector("button, input");
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }, 100);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  // Handle icon selection
  const handleIconSelect = useCallback((iconName) => {
    setTempSelectedIcon(iconName);
  }, []);

  // Handle color input validation
  const handleColorChange = useCallback((value) => {
    // Validate hex color format
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(value) || value === "") {
      setIconColor(value);
    }
  }, []);

  // Handle advanced settings toggle
  const handleAdvancedToggle = useCallback(() => {
    setShowAdvanced((prev) => !prev);
  }, []);

  // Filter icons based on search term
  const filteredIcons = React.useMemo(() => {
    if (!searchTerm) return Object.entries(availableIcons);

    return Object.entries(availableIcons).filter(([iconName]) =>
      iconName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Handle reset to defaults
  const handleReset = useCallback(() => {
    setTempSelectedIcon(currentIcon);
    setIconColor(currentColor);
    setIconSize(currentSize);
    setStrokeWidth(currentStrokeWidth);
  }, [currentIcon, currentColor, currentSize, currentStrokeWidth]);

  // Don't render if not open
  if (!isOpen) return null;

  const modalContent = (
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className={`${styles.modalContent} ${
          showAdvanced ? styles.modalExpanded : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div>
            <h3 id="modal-title">Select Icon</h3>
            <p id="modal-description" className={styles.modalDescription}>
              Choose an icon and customize its appearance
            </p>
          </div>
          <button
            ref={firstFocusableElementRef}
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Section */}
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            aria-label="Search icons"
          />
          {searchTerm && (
            <button
              className={styles.clearSearchButton}
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              type="button"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Current Selection Preview */}
        <div className={styles.previewSection}>
          <div className={styles.previewLabel}>Preview:</div>
          <div className={styles.previewIcon}>
            {React.createElement(
              availableIcons[tempSelectedIcon] || availableIcons.Star,
              {
                size: iconSize,
                color: iconColor,
                strokeWidth: strokeWidth,
              }
            )}
          </div>
          <div className={styles.previewInfo}>
            <span className={styles.iconName}>{tempSelectedIcon}</span>
            <span className={styles.iconSpecs}>
              {iconSize}px • {iconColor} • {strokeWidth}px stroke
            </span>
          </div>
        </div>

        {/* Icon Grid */}
        <div className={styles.iconGridContainer}>
          {filteredIcons.length > 0 ? (
            <div
              className={styles.iconGrid}
              role="grid"
              aria-label="Icon selection grid"
            >
              {filteredIcons.map(([iconName, IconComponent]) => (
                <button
                  key={iconName}
                  className={`${styles.iconOption} ${
                    tempSelectedIcon === iconName ? styles.iconSelected : ""
                  }`}
                  onClick={() => handleIconSelect(iconName)}
                  title={iconName}
                  aria-label={`Select ${iconName} icon`}
                  role="gridcell"
                  type="button"
                >
                  <IconComponent size={24} />
                  <span className={styles.iconTooltip}>{iconName}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No icons found matching "{searchTerm}"</p>
              <button
                className={styles.clearSearchButton}
                onClick={() => setSearchTerm("")}
                type="button"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className={styles.advancedSettings} id="advanced-settings">
            <div className={styles.advancedHeader}>
              <h4>Advanced Settings</h4>
              <button
                className={styles.resetButton}
                onClick={handleReset}
                title="Reset to original values"
                type="button"
              >
                Reset
              </button>
            </div>

            <div className={styles.settingsGrid}>
              <div className={styles.settingGroup}>
                <label htmlFor="iconColor">Color:</label>
                <div className={styles.colorInputGroup}>
                  <input
                    id="iconColor"
                    type="color"
                    value={iconColor}
                    onChange={(e) => setIconColor(e.target.value)}
                    className={styles.colorInput}
                    aria-label="Icon color picker"
                  />
                  <input
                    type="text"
                    value={iconColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className={styles.colorTextInput}
                    placeholder="#000000"
                    aria-label="Icon color hex value"
                    pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                  />
                </div>
              </div>

              <div className={styles.settingGroup}>
                <label htmlFor="iconSize">
                  Size:{" "}
                  <span className={styles.settingValue}>{iconSize}px</span>
                </label>
                <input
                  id="iconSize"
                  type="range"
                  min="16"
                  max="64"
                  value={iconSize}
                  onChange={(e) => setIconSize(Number(e.target.value))}
                  className={styles.rangeInput}
                  aria-label={`Icon size: ${iconSize} pixels`}
                />
                <div className={styles.rangeLabels}>
                  <span>16px</span>
                  <span>64px</span>
                </div>
              </div>

              <div className={styles.settingGroup}>
                <label htmlFor="strokeWidth">
                  Stroke Width:{" "}
                  <span className={styles.settingValue}>{strokeWidth}px</span>
                </label>
                <input
                  id="strokeWidth"
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  className={styles.rangeInput}
                  aria-label={`Stroke width: ${strokeWidth} pixels`}
                />
                <div className={styles.rangeLabels}>
                  <span>1px</span>
                  <span>4px</span>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className={styles.presets}>
              <h5>Quick Presets:</h5>
              <div className={styles.presetButtons}>
                <button
                  className={styles.presetButton}
                  onClick={() => {
                    setIconSize(20);
                    setStrokeWidth(1.5);
                    setIconColor("#6b7280");
                  }}
                  type="button"
                >
                  Small & Light
                </button>
                <button
                  className={styles.presetButton}
                  onClick={() => {
                    setIconSize(32);
                    setStrokeWidth(2);
                    setIconColor("#374151");
                  }}
                  type="button"
                >
                  Medium
                </button>
                <button
                  className={styles.presetButton}
                  onClick={() => {
                    setIconSize(48);
                    setStrokeWidth(3);
                    setIconColor("#1f2937");
                  }}
                  type="button"
                >
                  Large & Bold
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className={styles.modalActions}>
          <button
            className={styles.advancedButton}
            onClick={handleAdvancedToggle}
            aria-expanded={showAdvanced}
            aria-controls="advanced-settings"
            type="button"
          >
            {showAdvanced ? (
              <>
                <ChevronUp size={16} />
                Hide Advanced
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                Advanced Options
              </>
            )}
          </button>

          <div className={styles.actionButtons}>
            <button
              className={styles.cancelButton}
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
            <button
              ref={lastFocusableElementRef}
              className={styles.saveButton}
              onClick={handleSave}
              type="button"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default IconSelectorModal;
