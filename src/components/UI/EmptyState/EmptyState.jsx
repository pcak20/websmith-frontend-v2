// components/common/EmptyState/EmptyState.js
import React from "react";
import styles from "./EmptyState.module.css";

const EmptyState = ({ icon: Icon, title, message, action, className = "" }) => {
  return (
    <div className={`${styles.emptyState} ${className}`}>
      {Icon && <Icon size={64} className={styles.emptyIcon} />}
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyMessage}>{message}</p>
      {action && <div className={styles.emptyAction}>{action}</div>}
    </div>
  );
};

export default EmptyState;
