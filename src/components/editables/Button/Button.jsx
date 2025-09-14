import React, { useState } from "react";
import ButtonEditModal from "../modals/ButtonEditModal/ButtonEditModal";
import styles from "./Button.module.css";

const Button = ({
  children,
  className = "",
  onChange,
  onClick,
  type = "button",
  disabled = false,
  title, // Add title prop to explicitly set button text
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract text content from children for initial title
  const getTextFromChildren = (children) => {
    if (typeof children === "string") {
      return children;
    }
    if (Array.isArray(children)) {
      return children
        .filter((child) => typeof child === "string")
        .join(" ")
        .trim();
    }
    return "";
  };

  const [buttonData, setButtonData] = useState({
    title: title || getTextFromChildren(children) || "Button",
    fontSize: null,
    textColor: null,
    fontWeight: null,
    fontFamily: null,
    backgroundType: null,
    backgroundColor: null,
    gradientColor1: null,
    gradientColor2: null,
    gradientDirection: null,
    padding: null,
    borderRadius: null,
    width: null,
    height: null,
  });

  const handleClick = (e) => {
    if (disabled) return;

    // Check if this is an edit click (when not disabled in edit mode)
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setIsModalOpen(true);
      return;
    }

    // Normal button click
    if (onClick) {
      onClick(e);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleSave = (updatedData) => {
    setButtonData(updatedData);

    // Call the onChange prop to notify parent component
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getButtonBackground = () => {
    if (!buttonData.backgroundType) return undefined;

    if (buttonData.backgroundType === "solid") {
      return buttonData.backgroundColor;
    } else if (buttonData.backgroundType === "linear") {
      return `linear-gradient(${buttonData.gradientDirection || "135deg"}, ${
        buttonData.gradientColor1 || "#3b82f6"
      }, ${buttonData.gradientColor2 || "#1d4ed8"})`;
    } else if (buttonData.backgroundType === "radial") {
      return `radial-gradient(circle, ${
        buttonData.gradientColor1 || "#3b82f6"
      }, ${buttonData.gradientColor2 || "#1d4ed8"})`;
    }
    return buttonData.backgroundColor;
  };

  // Only apply styles that have been explicitly set
  const dynamicStyles = {};
  if (buttonData.fontSize) dynamicStyles.fontSize = buttonData.fontSize;
  if (buttonData.textColor) dynamicStyles.color = buttonData.textColor;
  if (buttonData.fontWeight) dynamicStyles.fontWeight = buttonData.fontWeight;
  if (buttonData.fontFamily) dynamicStyles.fontFamily = buttonData.fontFamily;

  // FIX: Apply background when backgroundType OR backgroundColor is set
  if (buttonData.backgroundType || buttonData.backgroundColor) {
    const background = getButtonBackground();
    if (background) {
      dynamicStyles.background = background;
    }
  }

  if (buttonData.padding) dynamicStyles.padding = buttonData.padding;
  if (buttonData.borderRadius)
    dynamicStyles.borderRadius = buttonData.borderRadius;
  if (buttonData.width) dynamicStyles.width = buttonData.width;
  if (buttonData.height) dynamicStyles.height = buttonData.height;

  // Extract icons from children
  const getIconsFromChildren = (children) => {
    if (!children) return null;
    if (Array.isArray(children)) {
      return children.filter(
        (child) => React.isValidElement(child) && typeof child.type !== "string"
      );
    }
    if (React.isValidElement(children) && typeof children.type !== "string") {
      return [children];
    }
    return null;
  };

  const icons = getIconsFromChildren(children);

  return (
    <>
      <div className={styles.buttonContainer}>
        <button
          {...props}
          type={type}
          disabled={disabled}
          className={`${className} ${styles.editableButton}`}
          style={dynamicStyles}
          onClick={handleClick}
          title="Ctrl+Click (Cmd+Click on Mac) to edit button"
        >
          {icons &&
            icons.map((icon, index) => (
              <React.Fragment key={index}>{icon}</React.Fragment>
            ))}
          {buttonData.title}
        </button>

        {/* Edit overlay button */}
        <button
          className={styles.editOverlay}
          onClick={handleEditClick}
          title="Click to edit button"
          type="button"
        >
          ✏️
        </button>
      </div>

      <ButtonEditModal
        isOpen={isModalOpen}
        buttonData={buttonData}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </>
  );
};

export default Button;
