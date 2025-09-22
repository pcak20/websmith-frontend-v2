import React, { useState } from "react";
import { createPortal } from "react-dom";
import TextEditModal from "../modals/TextEditModal/TextEditModal";
import Tooltip from "../../UI/Tooltip/Tooltip";
import styles from "./Text.module.css";

const Text = ({
  children,
  className = "",
  elementType = "p",
  onChange,
  disabled = false,
  tooltipDelay = 300,
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textData, setTextData] = useState({
    content: children || "",
    fontSize: null,
    color: null,
    fontWeight: null,
    fontFamily: null,
    elementType: elementType,
  });

  const handleClick = () => {
    if (!disabled) {
      setIsModalOpen(true);
    }
  };

  const handleSave = (updatedData) => {
    setTextData(updatedData);

    // Call the onChange prop to notify parent component
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Only apply styles that have been explicitly set
  const dynamicStyles = {};
  if (textData.fontSize) dynamicStyles.fontSize = textData.fontSize;
  if (textData.color) dynamicStyles.color = textData.color;
  if (textData.fontWeight) dynamicStyles.fontWeight = textData.fontWeight;
  if (textData.fontFamily) dynamicStyles.fontFamily = textData.fontFamily;

  // Define the element type to render
  const ElementType = textData.elementType || elementType;

  // Get appropriate CSS class based on element type
  const getElementClass = (type) => {
    const baseClass = styles.textElement;
    switch (type) {
      case "h1":
        return `${baseClass} ${styles.heading1}`;
      case "h2":
        return `${baseClass} ${styles.heading2}`;
      case "h3":
        return `${baseClass} ${styles.heading3}`;
      case "h4":
        return `${baseClass} ${styles.heading4}`;
      case "h5":
        return `${baseClass} ${styles.heading5}`;
      case "h6":
        return `${baseClass} ${styles.heading6}`;
      case "span":
        return `${baseClass} ${styles.spanElement}`;
      case "div":
        return `${baseClass} ${styles.divElement}`;
      case "blockquote":
        return `${baseClass} ${styles.blockquoteElement}`;
      case "label":
        return `${baseClass} ${styles.labelElement}`;
      default:
        return baseClass;
    }
  };

  // Get tooltip text based on element type
  const getTooltipText = (type) => {
    switch (type) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return "✏️ Click to edit heading";
      case "span":
        return "✏️ Click to edit span";
      case "div":
        return "✏️ Click to edit div";
      case "blockquote":
        return "✏️ Click to edit quote";
      case "label":
        return "✏️ Click to edit label";
      default:
        return `✏️ Click to edit ${type}`;
    }
  };

  const tooltipContent = disabled ? null : getTooltipText(ElementType);

  return (
    <>
      <Tooltip
        content={tooltipContent}
        position="top"
        delay={tooltipDelay}
        disabled={disabled || isModalOpen}
      >
        <ElementType
          {...props}
          className={`${getElementClass(ElementType)} ${className} ${
            disabled ? styles.disabled : ""
          }`}
          style={dynamicStyles}
          onClick={handleClick}
          role={disabled ? undefined : "button"}
          tabIndex={disabled ? undefined : 0}
          onKeyDown={
            disabled
              ? undefined
              : (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                  }
                }
          }
        >
          {textData.content}
        </ElementType>
      </Tooltip>

      {/* Render modal using portal to escape stacking context */}
      {isModalOpen &&
        createPortal(
          <TextEditModal
            isOpen={isModalOpen}
            textData={textData}
            onClose={handleCloseModal}
            onSave={handleSave}
          />,
          document.body
        )}
    </>
  );
};

export default Text;
