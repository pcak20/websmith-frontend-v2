// iconData.js - Icon registry with lucide-react icons

import { useState } from "react";
import IconEditModal from "./IconEditModal/IconEditModal";
import { ICON_REGISTRY } from "../../../utils/iconUtils";
import styles from "./IconElement.module.css";

const IconElement = ({
  isEdit = false,
  iconId = "home",
  size,
  color,
  className = "",
  style = {},
  onIconChange,
}) => {
  const [currentIconId, setCurrentIconId] = useState(iconId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    if (isEdit) {
      setIsModalOpen(true);
    }
  };

  const handleIconSave = (newIconId) => {
    setCurrentIconId(newIconId);
    if (onIconChange) {
      onIconChange(newIconId);
    }
  };

  const iconData = ICON_REGISTRY[currentIconId];
  if (!iconData) {
    console.warn(`Icon with id "${currentIconId}" not found`);
    return null;
  }

  const IconComponent = iconData.component;

  return (
    <>
      <IconComponent
        className={`${className} ${isEdit ? styles.iconOverlay : ""}`}
        size={size}
        color={color}
        onClick={handleIconClick}
      />

      <IconEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleIconSave}
        currentIconId={currentIconId}
      />
    </>
  );
};

export default IconElement;
