import { Settings, Layers, Palette } from "lucide-react";
import styles from "./SideBarHeader.module.css";

function SideBarHeader({ onActiveTabClick, activeTab }) {
  return (
    <div className={styles.sidebarHeader}>
      <h3>Editor</h3>
      <div className={styles.editorTabs}>
        <button
          className={`${styles.editorTab} ${
            activeTab === "elements" ? styles.active : ""
          }`}
          onClick={() => onActiveTabClick("elements")}
        >
          <Layers size={16} />
          Elements
        </button>
        <button
          className={`${styles.editorTab} ${
            activeTab === "design" ? styles.active : ""
          }`}
          onClick={() => onActiveTabClick("design")}
        >
          <Palette size={16} />
          Design
        </button>
        <button
          className={`${styles.editorTab} ${
            activeTab === "settings" ? styles.active : ""
          }`}
          onClick={() => onActiveTabClick("settings")}
        >
          <Settings size={16} />
          Settings
        </button>
      </div>
    </div>
  );
}

export default SideBarHeader;
