// TextElement.jsx
import React, { useState } from "react";
import TextEditModal from "./TextEditModal/TextEditModal";
import styles from "./TextElement.module.css";

const TextElement = ({
  isEdit = false,
  textElement = "p",
  children = "Sample text",
  className = "",
  style = {},
  onTextChange,
  ...props
}) => {
  const [text, setText] = useState(children);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTextClick = () => {
    if (isEdit) {
      setIsModalOpen(true);
    }
  };

  const handleTextSave = (newText) => {
    setText(newText);
    if (onTextChange) {
      onTextChange(newText);
    }
  };

  // Create the appropriate element based on textElement prop
  const createElement = () => {
    const combinedClassName = [
      className,
      isEdit ? styles.editable : "",
      styles[textElement.toLowerCase()] || styles.p,
    ]
      .filter(Boolean)
      .join(" ");

    const commonProps = {
      className: combinedClassName,
      style: style,
      onClick: handleTextClick,
      ...props,
    };

    // Add edit indicator
    const content = <>{text}</>;

    switch (textElement.toLowerCase()) {
      case "h1":
        return <h1 {...commonProps}>{content}</h1>;
      case "h2":
        return <h2 {...commonProps}>{content}</h2>;
      case "h3":
        return <h3 {...commonProps}>{content}</h3>;
      case "h4":
        return <h4 {...commonProps}>{content}</h4>;
      case "h5":
        return <h5 {...commonProps}>{content}</h5>;
      case "h6":
        return <h6 {...commonProps}>{content}</h6>;
      case "span":
        return <span {...commonProps}>{content}</span>;
      case "div":
        return <div {...commonProps}>{content}</div>;
      case "blockquote":
        return <blockquote {...commonProps}>{content}</blockquote>;
      case "code":
        return <code {...commonProps}>{content}</code>;
      case "pre":
        return <pre {...commonProps}>{content}</pre>;
      case "small":
        return <small {...commonProps}>{content}</small>;
      case "strong":
        return <strong {...commonProps}>{content}</strong>;
      case "em":
        return <em {...commonProps}>{content}</em>;
      default:
        return <p {...commonProps}>{content}</p>;
    }
  };

  return (
    <div className={isEdit ? styles.editGroup : ""}>
      {createElement()}
      <TextEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleTextSave}
        initialText={text}
        textElement={textElement}
      />
    </div>
  );
};

export default TextElement;
