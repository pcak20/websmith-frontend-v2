// TextEditModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./TextEditModal.module.css";

const TextEditModal = ({
  isOpen,
  onClose,
  onSave,
  initialText,
  textElement,
}) => {
  const [text, setText] = useState(initialText);
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus input after modal animation
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 100);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        handleCancel();
      }
    };

    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        isOpen
      ) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, initialText]);

  const handleSave = () => {
    if (text.trim() === "") {
      return; // Don't save empty text
    }
    onSave(text);
    handleClose();
  };

  const handleCancel = () => {
    setText(initialText);
    handleClose();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200); // Match animation duration
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const getElementDisplayName = (element) => {
    const displayNames = {
      h1: "Heading 1",
      h2: "Heading 2",
      h3: "Heading 3",
      h4: "Heading 4",
      h5: "Heading 5",
      h6: "Heading 6",
      p: "Paragraph",
      span: "Span",
      div: "Division",
      blockquote: "Blockquote",
      code: "Code",
      pre: "Preformatted",
      small: "Small Text",
      strong: "Bold Text",
      em: "Emphasized Text",
      textarea: "Text Area",
    };
    return displayNames[element.toLowerCase()] || element.toUpperCase();
  };

  const isMultiline =
    textElement === "textarea" ||
    textElement === "pre" ||
    textElement === "blockquote";
  const hasError = text.trim() === "";

  if (!isOpen && !isClosing) return null;

  const modalContent = (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}
    >
      <div className={styles.backdrop} onClick={handleCancel} />

      <div
        ref={modalRef}
        className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className={styles.header}>
          <h3 id="modal-title" className={styles.title}>
            Edit {getElementDisplayName(textElement)}
          </h3>
          <button
            onClick={handleCancel}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            ✕
          </button>
          <div id="modal-description" className={styles.elementType}>
            Element type:{" "}
            <span className={styles.elementTag}>&lt;{textElement}&gt;</span>
          </div>
        </div>

        <div className={styles.content}>
          <label htmlFor="text-input" className={styles.label}>
            Text Content
            {hasError && <span className={styles.required}> *</span>}
          </label>
          {isMultiline ? (
            <textarea
              ref={inputRef}
              id="text-input"
              value={text}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`${styles.textarea} ${
                hasError ? styles.inputError : ""
              }`}
              rows={textElement === "pre" ? 6 : 4}
              placeholder="Enter your text here..."
              aria-describedby="input-hint input-error"
              maxLength={5000}
            />
          ) : (
            <input
              ref={inputRef}
              id="text-input"
              type="text"
              value={text}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`${styles.input} ${hasError ? styles.inputError : ""}`}
              placeholder="Enter your text here..."
              aria-describedby="input-hint input-error"
              maxLength={1000}
            />
          )}

          <div className={styles.inputMeta}>
            <div id="input-hint" className={styles.hint}>
              Press Ctrl+Enter (or Cmd+Enter) to save, Escape to cancel
            </div>
            <div className={styles.charCount}>
              {text.length}/{isMultiline ? 5000 : 1000}
            </div>
          </div>

          {hasError && (
            <div id="input-error" className={styles.errorMessage} role="alert">
              Text content cannot be empty
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            onClick={handleCancel}
            className={styles.cancelButton}
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`${styles.saveButton} ${
              hasError ? styles.saveButtonDisabled : ""
            }`}
            type="button"
            disabled={hasError}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default TextEditModal;
