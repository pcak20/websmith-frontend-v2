import React, { useState } from "react";
import TextEditModal from "../modals/TextEditModal/TextEditModal";
import styles from "./Text.module.css";

const Text = ({
  children,
  className = "",
  elementType = "p",
  onChange,
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
    setIsModalOpen(true);
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

  return (
    <>
      <ElementType
        {...props}
        className={`${getElementClass(ElementType)} ${className}`}
        style={dynamicStyles}
        onClick={handleClick}
        title={`Click to edit ${ElementType}`}
      >
        {textData.content}
      </ElementType>

      <TextEditModal
        isOpen={isModalOpen}
        textData={textData}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </>
  );
};

export default Text;
