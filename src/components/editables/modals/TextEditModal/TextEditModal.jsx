import React, { useState } from "react";
import styles from "./TextEditModal.module.css";

const TextEditModal = ({ isOpen, onClose, textData, onSave }) => {
  const [content, setContent] = useState(textData?.content || "");
  const [fontSize, setFontSize] = useState(
    textData?.fontSize ? parseInt(textData.fontSize) : 16
  );
  const [color, setColor] = useState(textData?.color || "#000000");
  const [fontWeight, setFontWeight] = useState(
    textData?.fontWeight || "normal"
  );
  const [fontFamily, setFontFamily] = useState(
    textData?.fontFamily || "inherit"
  );
  const [elementType, setElementType] = useState(textData?.elementType || "p");

  // Track which properties have been changed
  const [changedProperties, setChangedProperties] = useState(new Set());

  // Advanced options visibility state
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleContentChange = (value) => {
    setContent(value);
    setChangedProperties((prev) => new Set(prev).add("content"));
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
    setChangedProperties((prev) => new Set(prev).add("fontSize"));
  };

  const handleColorChange = (value) => {
    setColor(value);
    setChangedProperties((prev) => new Set(prev).add("color"));
  };

  const handleFontWeightChange = (value) => {
    setFontWeight(value);
    setChangedProperties((prev) => new Set(prev).add("fontWeight"));
  };

  const handleFontFamilyChange = (value) => {
    setFontFamily(value);
    setChangedProperties((prev) => new Set(prev).add("fontFamily"));
  };

  const handleElementTypeChange = (value) => {
    setElementType(value);
    setChangedProperties((prev) => new Set(prev).add("elementType"));
  };

  const handleSave = () => {
    // Only include properties that were actually changed
    const updatedData = { ...textData }; // Start with existing data

    if (changedProperties.has("content")) {
      updatedData.content = content;
    }
    if (changedProperties.has("fontSize")) {
      updatedData.fontSize = `${fontSize}px`;
    }
    if (changedProperties.has("color")) {
      updatedData.color = color;
    }
    if (changedProperties.has("fontWeight")) {
      updatedData.fontWeight = fontWeight;
    }
    if (changedProperties.has("fontFamily")) {
      updatedData.fontFamily = fontFamily;
    }
    if (changedProperties.has("elementType")) {
      updatedData.elementType = elementType;
    }

    onSave(updatedData);
    onClose();
  };

  const handleCancel = () => {
    // Reset to original values and clear changed properties
    setContent(textData?.content || "");
    setFontSize(textData?.fontSize ? parseInt(textData.fontSize) : 16);
    setColor(textData?.color || "#000000");
    setFontWeight(textData?.fontWeight || "normal");
    setFontFamily(textData?.fontFamily || "inherit");
    setElementType(textData?.elementType || "p");
    setChangedProperties(new Set());
    setShowAdvanced(false);
    onClose();
  };

  // Update state when modal opens with new textData
  React.useEffect(() => {
    if (isOpen) {
      setContent(textData?.content || "");
      setFontSize(textData?.fontSize ? parseInt(textData.fontSize) : 16);
      setColor(textData?.color || "#000000");
      setFontWeight(textData?.fontWeight || "normal");
      setFontFamily(textData?.fontFamily || "inherit");
      setElementType(textData?.elementType || "p");
      setChangedProperties(new Set());
      setShowAdvanced(false);
    }
  }, [isOpen, textData]);

  // Prevent body scroll when modal is open, but preserve scrollbar
  React.useEffect(() => {
    if (isOpen) {
      // Get current scroll position
      const scrollY = window.scrollY;

      // Get scrollbar width before hiding overflow
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Find all fixed positioned elements
      const fixedElements = document.querySelectorAll("*");
      const elementsToAdjust = [];

      fixedElements.forEach((element) => {
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.position === "fixed") {
          elementsToAdjust.push({
            element,
            originalPaddingRight: element.style.paddingRight,
            originalRight: element.style.right,
          });
        }
      });

      // Apply styles to prevent scrolling while preserving layout
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      // Adjust fixed elements to account for missing scrollbar
      elementsToAdjust.forEach(({ element }) => {
        const currentPaddingRight =
          parseInt(window.getComputedStyle(element).paddingRight) || 0;
        element.style.paddingRight = `${
          currentPaddingRight + scrollBarWidth
        }px`;
      });

      // Cleanup function
      return () => {
        // Restore fixed elements
        elementsToAdjust.forEach(({ element, originalPaddingRight }) => {
          element.style.paddingRight = originalPaddingRight;
        });

        // Restore body styles
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.paddingRight = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Get preview element type for rendering
  const PreviewElement = elementType;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Edit Text</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.formGroup}>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              className={styles.textarea}
              rows={4}
              placeholder="Enter your text content..."
            />
          </div>

          {/* Advanced Options Toggle */}
          <div className={styles.advancedToggle}>
            <button
              className={styles.toggleButton}
              onClick={() => setShowAdvanced(!showAdvanced)}
              type="button"
            >
              Advanced Options
              <span
                className={`${styles.toggleIcon} ${
                  showAdvanced ? styles.expanded : ""
                }`}
              >
                ▼
              </span>
            </button>
          </div>

          {/* Advanced Options (conditionally rendered) */}
          {showAdvanced && (
            <div className={styles.advancedOptions}>
              {/* Element Type Selection */}
              <div className={styles.formGroup}>
                <label>Element Type:</label>
                <select
                  value={elementType}
                  onChange={(e) => handleElementTypeChange(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="p">Paragraph (p)</option>
                  <option value="span">Span</option>
                  <option value="div">Div</option>
                  <option value="h1">Heading 1 (h1)</option>
                  <option value="h2">Heading 2 (h2)</option>
                  <option value="h3">Heading 3 (h3)</option>
                  <option value="h4">Heading 4 (h4)</option>
                  <option value="h5">Heading 5 (h5)</option>
                  <option value="h6">Heading 6 (h6)</option>
                  <option value="blockquote">Blockquote</option>
                  <option value="label">Label</option>
                </select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Font Size:</label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => handleFontSizeChange(e.target.value)}
                    className={styles.numberInput}
                    min="8"
                    max="72"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Color:</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className={styles.colorInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Font Weight:</label>
                  <select
                    value={fontWeight}
                    onChange={(e) => handleFontWeightChange(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="100">Thin</option>
                    <option value="200">Extra Light</option>
                    <option value="300">Light</option>
                    <option value="400">Normal</option>
                    <option value="500">Medium</option>
                    <option value="600">Semi Bold</option>
                    <option value="700">Bold</option>
                    <option value="800">Extra Bold</option>
                    <option value="900">Black</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Font Family:</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => handleFontFamilyChange(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="inherit">Inherit</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Helvetica Neue', Helvetica, sans-serif">
                      Helvetica
                    </option>
                    <option value="'Times New Roman', Times, serif">
                      Times New Roman
                    </option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="'Courier New', monospace">
                      Courier New
                    </option>
                    <option value="Verdana, sans-serif">Verdana</option>
                    <option value="'Trebuchet MS', sans-serif">
                      Trebuchet MS
                    </option>
                    <option value="'Comic Sans MS', cursive">
                      Comic Sans MS
                    </option>
                    <option value="Impact, sans-serif">Impact</option>
                    <option value="'Lucida Console', monospace">
                      Lucida Console
                    </option>
                    <option value="'Palatino Linotype', serif">Palatino</option>
                    <option value="Tahoma, sans-serif">Tahoma</option>
                    <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
                      Segoe UI
                    </option>
                    <option value="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
                      System Font
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className={styles.preview}>
            <div
              className={styles.previewContent}
              style={{
                fontSize: `${fontSize}px`,
                color: color,
                fontWeight: fontWeight,
                fontFamily: fontFamily,
              }}
            >
              {content || "Preview text..."}
            </div>
          </div>

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
          <button className={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditModal;
