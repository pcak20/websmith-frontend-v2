import React, { useState, useRef, useEffect } from "react";
import ImageEditModal from "../modals/ImageEditModal/ImageEditModal";
import styles from "./Image.module.css";

const Image = ({
  src,
  alt = "",
  className = "",
  onChange,
  style = {},
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageData, setImageData] = useState({
    src: src || null,
    alt: alt,
    blur: null,
    objectFit: null,
    objectPosition: null,
  });

  const [containerDimensions, setContainerDimensions] = useState({
    width: 300,
    height: 200,
  });
  const imageRef = useRef(null);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = (updatedData) => {
    setImageData(updatedData);

    // Call the onChange prop to notify parent component
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Measure container dimensions for modal preview
  useEffect(() => {
    if (imageRef.current) {
      const updateDimensions = () => {
        const rect = imageRef.current.getBoundingClientRect();
        setContainerDimensions({
          width: rect.width || 300,
          height: rect.height || 200,
        });
      };

      updateDimensions();

      // Update on window resize
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  // Only apply styles that have been explicitly set
  const dynamicStyles = { ...style };
  if (imageData.blur) dynamicStyles.filter = `blur(${imageData.blur}px)`;
  if (imageData.objectFit) dynamicStyles.objectFit = imageData.objectFit;
  if (imageData.objectPosition)
    dynamicStyles.objectPosition = imageData.objectPosition;

  const hasImage = imageData.src;

  return (
    <>
      <div
        {...props}
        ref={imageRef}
        className={`${styles.imageElement} ${className}`}
        style={dynamicStyles}
        onClick={handleClick}
        title="Click to edit image"
      >
        {hasImage ? (
          <img
            src={imageData.src}
            alt={imageData.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: imageData.objectFit || "cover",
              objectPosition: imageData.objectPosition || "center",
              filter: imageData.blur ? `blur(${imageData.blur}px)` : "none",
            }}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>+ Add Image</span>
          </div>
        )}
      </div>

      <ImageEditModal
        isOpen={isModalOpen}
        imageData={imageData}
        containerDimensions={containerDimensions}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </>
  );
};

export default Image;
