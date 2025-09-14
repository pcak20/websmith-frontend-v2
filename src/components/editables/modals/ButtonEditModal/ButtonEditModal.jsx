import React, { useState } from "react";
import styles from "./ButtonEditModal.module.css";

const ButtonEditModal = ({ isOpen, onClose, buttonData, onSave }) => {
  const [title, setTitle] = useState(buttonData?.title || "");
  const [fontSize, setFontSize] = useState(
    buttonData?.fontSize ? parseInt(buttonData.fontSize) : 16
  );
  const [textColor, setTextColor] = useState(
    buttonData?.textColor || "#ffffff"
  );
  const [fontWeight, setFontWeight] = useState(
    buttonData?.fontWeight || "normal"
  );
  const [fontFamily, setFontFamily] = useState(
    buttonData?.fontFamily || "inherit"
  );

  // Button styling
  const [backgroundType, setBackgroundType] = useState(
    buttonData?.backgroundType || "solid"
  );
  const [backgroundColor, setBackgroundColor] = useState(
    buttonData?.backgroundColor || "#3b82f6"
  );
  const [gradientColor1, setGradientColor1] = useState(
    buttonData?.gradientColor1 || "#3b82f6"
  );
  const [gradientColor2, setGradientColor2] = useState(
    buttonData?.gradientColor2 || "#1d4ed8"
  );
  const [gradientDirection, setGradientDirection] = useState(
    buttonData?.gradientDirection || "135deg"
  );

  // Button sizing
  const [padding, setPadding] = useState(buttonData?.padding || "12px 24px");
  const [borderRadius, setBorderRadius] = useState(
    buttonData?.borderRadius ? parseInt(buttonData.borderRadius) : 8
  );
  const [width, setWidth] = useState(buttonData?.width || "auto");
  const [height, setHeight] = useState(buttonData?.height || "auto");

  // Track which properties have been changed
  const [changedProperties, setChangedProperties] = useState(new Set());

  // Track if advanced options are expanded
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleTitleChange = (value) => {
    setTitle(value);
    setChangedProperties((prev) => new Set(prev).add("title"));
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
    setChangedProperties((prev) => new Set(prev).add("fontSize"));
  };

  const handleTextColorChange = (value) => {
    setTextColor(value);
    setChangedProperties((prev) => new Set(prev).add("textColor"));
  };

  const handleFontWeightChange = (value) => {
    setFontWeight(value);
    setChangedProperties((prev) => new Set(prev).add("fontWeight"));
  };

  const handleFontFamilyChange = (value) => {
    setFontFamily(value);
    setChangedProperties((prev) => new Set(prev).add("fontFamily"));
  };

  const handleBackgroundTypeChange = (value) => {
    setBackgroundType(value);
    setChangedProperties((prev) => new Set(prev).add("backgroundType"));
  };

  const handleBackgroundColorChange = (value) => {
    setBackgroundColor(value);
    setChangedProperties((prev) => new Set(prev).add("backgroundColor"));
  };

  const handleGradientColor1Change = (value) => {
    setGradientColor1(value);
    setChangedProperties((prev) => new Set(prev).add("gradientColor1"));
  };

  const handleGradientColor2Change = (value) => {
    setGradientColor2(value);
    setChangedProperties((prev) => new Set(prev).add("gradientColor2"));
  };

  const handleGradientDirectionChange = (value) => {
    setGradientDirection(value);
    setChangedProperties((prev) => new Set(prev).add("gradientDirection"));
  };

  const handlePaddingChange = (value) => {
    setPadding(value);
    setChangedProperties((prev) => new Set(prev).add("padding"));
  };

  const handleBorderRadiusChange = (value) => {
    setBorderRadius(value);
    setChangedProperties((prev) => new Set(prev).add("borderRadius"));
  };

  const handleWidthChange = (value) => {
    setWidth(value);
    setChangedProperties((prev) => new Set(prev).add("width"));
  };

  const handleHeightChange = (value) => {
    setHeight(value);
    setChangedProperties((prev) => new Set(prev).add("height"));
  };

  const getButtonBackground = () => {
    if (backgroundType === "solid") {
      return backgroundColor;
    } else if (backgroundType === "linear") {
      return `linear-gradient(${gradientDirection}, ${gradientColor1}, ${gradientColor2})`;
    } else if (backgroundType === "radial") {
      return `radial-gradient(circle, ${gradientColor1}, ${gradientColor2})`;
    }
    return backgroundColor;
  };

  const handleSave = () => {
    // Only include properties that were actually changed
    const updatedData = { ...buttonData }; // Start with existing data

    if (changedProperties.has("title")) {
      updatedData.title = title;
    }
    if (changedProperties.has("fontSize")) {
      updatedData.fontSize = `${fontSize}px`;
    }
    if (changedProperties.has("textColor")) {
      updatedData.textColor = textColor;
    }
    if (changedProperties.has("fontWeight")) {
      updatedData.fontWeight = fontWeight;
    }
    if (changedProperties.has("fontFamily")) {
      updatedData.fontFamily = fontFamily;
    }
    if (changedProperties.has("backgroundType")) {
      updatedData.backgroundType = backgroundType;
    }
    if (changedProperties.has("backgroundColor")) {
      updatedData.backgroundColor = backgroundColor;
    }
    if (changedProperties.has("gradientColor1")) {
      updatedData.gradientColor1 = gradientColor1;
    }
    if (changedProperties.has("gradientColor2")) {
      updatedData.gradientColor2 = gradientColor2;
    }
    if (changedProperties.has("gradientDirection")) {
      updatedData.gradientDirection = gradientDirection;
    }
    if (changedProperties.has("padding")) {
      updatedData.padding = padding;
    }
    if (changedProperties.has("borderRadius")) {
      updatedData.borderRadius = `${borderRadius}px`;
    }
    if (changedProperties.has("width")) {
      updatedData.width = width;
    }
    if (changedProperties.has("height")) {
      updatedData.height = height;
    }

    onSave(updatedData);
    onClose();
  };

  const handleCancel = () => {
    // Reset to original values and clear changed properties
    setTitle(buttonData?.title || "");
    setFontSize(buttonData?.fontSize ? parseInt(buttonData.fontSize) : 16);
    setTextColor(buttonData?.textColor || "#ffffff");
    setFontWeight(buttonData?.fontWeight || "normal");
    setFontFamily(buttonData?.fontFamily || "inherit");
    setBackgroundType(buttonData?.backgroundType || "solid");
    setBackgroundColor(buttonData?.backgroundColor || "#3b82f6");
    setGradientColor1(buttonData?.gradientColor1 || "#3b82f6");
    setGradientColor2(buttonData?.gradientColor2 || "#1d4ed8");
    setGradientDirection(buttonData?.gradientDirection || "135deg");
    setPadding(buttonData?.padding || "12px 24px");
    setBorderRadius(
      buttonData?.borderRadius ? parseInt(buttonData.borderRadius) : 8
    );
    setWidth(buttonData?.width || "auto");
    setHeight(buttonData?.height || "auto");
    setChangedProperties(new Set());
    setShowAdvancedOptions(false);
    onClose();
  };

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  // Update state when modal opens with new buttonData
  React.useEffect(() => {
    if (isOpen) {
      setTitle(buttonData?.title || "");
      setFontSize(buttonData?.fontSize ? parseInt(buttonData.fontSize) : 16);
      setTextColor(buttonData?.textColor || "#ffffff");
      setFontWeight(buttonData?.fontWeight || "normal");
      setFontFamily(buttonData?.fontFamily || "inherit");
      setBackgroundType(buttonData?.backgroundType || "solid");
      setBackgroundColor(buttonData?.backgroundColor || "#3b82f6");
      setGradientColor1(buttonData?.gradientColor1 || "#3b82f6");
      setGradientColor2(buttonData?.gradientColor2 || "#1d4ed8");
      setGradientDirection(buttonData?.gradientDirection || "135deg");
      setPadding(buttonData?.padding || "12px 24px");
      setBorderRadius(
        buttonData?.borderRadius ? parseInt(buttonData.borderRadius) : 8
      );
      setWidth(buttonData?.width || "auto");
      setHeight(buttonData?.height || "auto");
      setChangedProperties(new Set());
      setShowAdvancedOptions(false);
    }
  }, [isOpen, buttonData]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Edit Button</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalContent}>
          {/* Button Title - Always Visible */}
          <div className={styles.formGroup}>
            <label>Button Text:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={styles.textInput}
              placeholder="Enter button text..."
            />
          </div>

          {/* Button Preview - Always Visible */}
          <div className={styles.previewSection}>
            <p>Preview:</p>
            <button
              className={styles.buttonPreview}
              style={{
                fontSize: `${fontSize}px`,
                color: textColor,
                fontWeight: fontWeight,
                fontFamily: fontFamily,
                background: getButtonBackground(),
                padding: padding,
                borderRadius: `${borderRadius}px`,
                width: width === "auto" ? "auto" : width,
                height: height === "auto" ? "auto" : height,
                border: "none",
                cursor: "pointer",
              }}
            >
              {title || "Preview Button"}
            </button>
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
              {/* Text Styling */}
              <div className={styles.sectionTitle}>Text Styling</div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Font Size:</label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => handleFontSizeChange(e.target.value)}
                    className={styles.numberInput}
                    min="8"
                    max="48"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Text Color:</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => handleTextColorChange(e.target.value)}
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

              {/* Button Background */}
              <div className={styles.sectionTitle}>Button Background</div>

              <div className={styles.formGroup}>
                <label>Background Type:</label>
                <select
                  value={backgroundType}
                  onChange={(e) => handleBackgroundTypeChange(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="solid">Solid Color</option>
                  <option value="linear">Linear Gradient</option>
                  <option value="radial">Radial Gradient</option>
                </select>
              </div>

              {backgroundType === "solid" ? (
                <div className={styles.formGroup}>
                  <label>Background Color:</label>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) =>
                      handleBackgroundColorChange(e.target.value)
                    }
                    className={styles.colorInput}
                  />
                </div>
              ) : (
                <>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Gradient Color 1:</label>
                      <input
                        type="color"
                        value={gradientColor1}
                        onChange={(e) =>
                          handleGradientColor1Change(e.target.value)
                        }
                        className={styles.colorInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Gradient Color 2:</label>
                      <input
                        type="color"
                        value={gradientColor2}
                        onChange={(e) =>
                          handleGradientColor2Change(e.target.value)
                        }
                        className={styles.colorInput}
                      />
                    </div>
                  </div>

                  {backgroundType === "linear" && (
                    <div className={styles.formGroup}>
                      <label>Gradient Direction:</label>
                      <select
                        value={gradientDirection}
                        onChange={(e) =>
                          handleGradientDirectionChange(e.target.value)
                        }
                        className={styles.selectInput}
                      >
                        <option value="0deg">Top to Bottom</option>
                        <option value="90deg">Left to Right</option>
                        <option value="180deg">Bottom to Top</option>
                        <option value="270deg">Right to Left</option>
                        <option value="45deg">Top-Left to Bottom-Right</option>
                        <option value="135deg">Top-Right to Bottom-Left</option>
                        <option value="225deg">Bottom-Right to Top-Left</option>
                        <option value="315deg">Bottom-Left to Top-Right</option>
                      </select>
                    </div>
                  )}
                </>
              )}

              {/* Button Sizing */}
              <div className={styles.sectionTitle}>Button Sizing</div>

              <div className={styles.formGroup}>
                <label>Padding:</label>
                <select
                  value={padding}
                  onChange={(e) => handlePaddingChange(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="8px 16px">Small (8px 16px)</option>
                  <option value="12px 24px">Medium (12px 24px)</option>
                  <option value="16px 32px">Large (16px 32px)</option>
                  <option value="20px 40px">Extra Large (20px 40px)</option>
                </select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Border Radius: {borderRadius}px</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={borderRadius}
                    onChange={(e) => handleBorderRadiusChange(e.target.value)}
                    className={styles.rangeInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Width:</label>
                  <select
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="auto">Auto</option>
                    <option value="100%">Full Width</option>
                    <option value="200px">200px</option>
                    <option value="150px">150px</option>
                    <option value="100px">100px</option>
                  </select>
                </div>
              </div>
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
          <button className={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonEditModal;
