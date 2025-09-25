/* ===================================

IconEditModal.jsx */
import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import styles from "./IconEditModal.module.css";
import {
  ICON_REGISTRY,
  ICON_CATEGORIES,
  searchIcons,
  getIconsByCategory,
} from "../../../../utils/iconUtils";

const IconEditModal = ({ isOpen, onClose, onSave, currentIconId }) => {
  const [selectedIconId, setSelectedIconId] = useState(currentIconId);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setSelectedIconId(currentIconId);
  }, [currentIconId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSearchQuery("");
      setSelectedCategory("all");
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const filteredIcons = useMemo(() => {
    let icons = Object.values(ICON_REGISTRY);

    // Filter by category
    if (selectedCategory !== "all") {
      icons = getIconsByCategory(selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      icons = searchIcons(searchQuery);
    }

    return icons;
  }, [searchQuery, selectedCategory]);

  const handleSave = () => {
    onSave(selectedIconId);
    handleClose();
  };

  const handleCancel = () => {
    setSelectedIconId(currentIconId);
    handleClose();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCancel();
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  if (!isOpen && !isClosing) return null;

  const currentIcon = ICON_REGISTRY[currentIconId];
  const selectedIcon = ICON_REGISTRY[selectedIconId];

  const modalContent = (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}
    >
      <div className={styles.backdrop} onClick={handleCancel} />

      <div
        className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
        role="dialog"
        aria-labelledby="modal-title"
        onKeyDown={handleKeyDown}
      >
        <div className={styles.header}>
          <h3 id="modal-title" className={styles.title}>
            Choose Icon
          </h3>
          <button
            onClick={handleCancel}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className={styles.currentSelection}>
          <div className={styles.currentIcon}>
            <div className={styles.iconPreview}>
              {currentIcon && React.createElement(currentIcon.component)}
            </div>
            <span className={styles.iconName}>
              Current: {currentIcon?.name}
            </span>
          </div>
          <div className={styles.arrow}>→</div>
          <div className={styles.selectedIcon}>
            <div className={styles.iconPreview}>
              {selectedIcon && React.createElement(selectedIcon.component)}
            </div>
            <span className={styles.iconName}>
              Selected: {selectedIcon?.name}
            </span>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            <option value="all">All Categories</option>
            {Object.entries(ICON_CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.iconGrid}>
          {filteredIcons.length > 0 ? (
            filteredIcons.map((icon) => {
              const IconComponent = icon.component;
              const isSelected = icon.id === selectedIconId;

              return (
                <button
                  key={icon.id}
                  className={`${styles.iconButton} ${
                    isSelected ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedIconId(icon.id)}
                  title={`${icon.name} - ${icon.tooltip}`}
                >
                  <IconComponent />
                  <span className={styles.iconButtonName}>{icon.name}</span>
                </button>
              );
            })
          ) : (
            <div className={styles.noResults}>
              <p>No icons found matching your search.</p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.resultCount}>
            {filteredIcons.length} icon{filteredIcons.length !== 1 ? "s" : ""}{" "}
            found
          </div>
          <div className={styles.actions}>
            <button onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={styles.saveButton}
              disabled={!selectedIconId}
            >
              Use This Icon
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default IconEditModal;
