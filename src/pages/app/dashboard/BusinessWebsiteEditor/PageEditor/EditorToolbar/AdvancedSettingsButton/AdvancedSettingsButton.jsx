import { useState } from "react";
import { Settings } from "lucide-react";
import styles from "./AdvancedSettingsButton.module.css";

const AdvancedSettingsButton = ({ conf }) => {
  const { isAdvancedOpen, handleAdvanceToggle } = conf;
  return (
    <button
      onClick={() => handleAdvanceToggle(!isAdvancedOpen)}
      className={`${styles.headerBtn} ${isAdvancedOpen ? styles.active : ""}`}
    >
      <Settings className={styles.icon} />
      <span>Settings</span>
    </button>
  );
};

export default AdvancedSettingsButton;
