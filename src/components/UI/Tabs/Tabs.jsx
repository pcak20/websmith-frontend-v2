// components/common/Tabs/Tabs.js
import React from "react";
import styles from "./Tabs.module.css";

const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  variant = "default",
}) => {
  const variantClasses = {
    default: styles.default,
    pills: styles.pills,
    underline: styles.underline,
  };

  return (
    <div
      className={`${styles.tabsContainer} ${variantClasses[variant]} ${className}`}
    >
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon && <tab.icon size={16} />}
            {tab.label}
            {tab.count !== undefined && (
              <span className={styles.tabCount}>({tab.count})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
