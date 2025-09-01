// components/common/StatusBadge/StatusBadge.js
import React from "react";
import styles from "./StatusBadge.module.css";

const StatusBadge = ({
  status,
  variant = "default",
  showDot = true,
  className = "",
}) => {
  const variantClasses = {
    default: styles.default,
    published: styles.published,
    draft: styles.draft,
    archived: styles.archived,
    active: styles.active,
    inactive: styles.inactive,
    pending: styles.pending,
    rejected: styles.rejected,
  };

  const statusClass = variantClasses[status] || variantClasses[variant];

  return (
    <span className={`${styles.badge} ${statusClass} ${className}`}>
      {showDot && <span className={styles.dot}></span>}
      <span className={styles.text}>{status}</span>
    </span>
  );
};

export default StatusBadge;
