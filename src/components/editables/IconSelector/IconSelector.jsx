import React, { useState } from "react";
import {
  Star,
  Heart,
  Home,
  User,
  Settings,
  Bell,
  Mail,
  Search,
  Plus,
  X,
  Edit,
  Delete,
  Save,
  Upload,
  Download,
  Play,
  Pause,
  Volume2,
  Calendar,
  Clock,
  Map,
  Camera,
  Phone,
  MessageCircle,
  Share,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  FileText,
  Folder,
  Image,
  Video,
  Music,
  Book,
  Globe,
  Shield,
  Lock,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Gift,
  Target,
  Award,
  ChefHat,
} from "lucide-react";
import IconSelectorModal from "../modals/IconSelectorModal/IconSelectorModal";
import styles from "./IconSelector.module.css";
import Tooltip from "../../UI/Tooltip/Tooltip";

// Available icons for selection
export const availableIcons = {
  Star,
  Heart,
  Home,
  User,
  Settings,
  Bell,
  Mail,
  Search,
  Plus,
  X,
  Edit,
  Delete,
  Save,
  Upload,
  Download,
  Play,
  Pause,
  Volume2,
  Calendar,
  Clock,
  Map,
  Camera,
  Phone,
  MessageCircle,
  Share,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  FileText,
  Folder,
  Image,
  Video,
  Music,
  Book,
  Globe,
  Shield,
  Lock,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Gift,
  Target,
  Award,
  ChefHat,
};

const IconSelector = ({
  initialIcon = "Star",
  initialColor,
  initialSize,
  initialStrokeWidth = 2,
  onIconChange,
  className = "",
  disabled = false,
}) => {
  const [selectedIcon, setSelectedIcon] = useState(initialIcon);
  const [iconColor, setIconColor] = useState(initialColor);
  const [iconSize, setIconSize] = useState(initialSize);
  const [strokeWidth, setStrokeWidth] = useState(initialStrokeWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the current icon component
  const CurrentIcon = availableIcons[selectedIcon] || availableIcons.Star;

  // Handle icon click to open modal
  const handleIconClick = () => {
    if (!disabled) {
      setIsModalOpen(true);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle saving the selected icon from modal
  const handleModalSave = (iconData) => {
    setSelectedIcon(iconData.icon);
    setIconColor(iconData.color);
    setIconSize(iconData.size);
    setStrokeWidth(iconData.strokeWidth);
    setIsModalOpen(false);

    if (onIconChange) {
      onIconChange(iconData);
    }
  };

  return (
    <>
      <div className={`${styles.iconSelector} ${className}`}>
        <button
          className={`${styles.iconDisplay} ${disabled ? styles.disabled : ""}`}
          onClick={handleIconClick}
          disabled={disabled}
        >
          <Tooltip content={"Click to change icon"}>
            <CurrentIcon
              size={iconSize}
              color={iconColor}
              strokeWidth={strokeWidth}
            />
          </Tooltip>
        </button>
      </div>

      {isModalOpen && (
        <IconSelectorModal
          availableIcons={availableIcons}
          currentIcon={selectedIcon}
          currentColor={iconColor}
          currentSize={iconSize}
          currentStrokeWidth={strokeWidth}
          onSave={handleModalSave}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default IconSelector;
