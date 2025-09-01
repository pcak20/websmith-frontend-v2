// components/common/StatCard/StatCard.js
import React from "react";
import styles from "./StatCard.module.css";

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  color = "default",
  className = "",
  onClick,
}) => {
  const colorClasses = {
    default: styles.default,
    primary: styles.primary,
    success: styles.success,
    warning: styles.warning,
    danger: styles.danger,
  };

  const cardClass = onClick ? styles.clickable : "";

  return (
    <div
      className={`${styles.statCard} ${colorClasses[color]} ${cardClass} ${className}`}
      onClick={onClick}
    >
      {Icon && (
        <div className={styles.iconContainer}>
          <Icon size={24} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.value}>{value}</div>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        {trend && (
          <div
            className={`${styles.trend} ${
              trend.positive ? styles.positive : styles.negative
            }`}
          >
            {trend.value}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
