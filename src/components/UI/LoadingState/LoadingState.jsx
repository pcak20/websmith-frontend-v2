// components/common/LoadingState/LoadingState.js
import React from "react";
import { Loader2 } from "lucide-react";
import styles from "./LoadingState.module.css";

const LoadingState = ({
  size = "default",
  message = "Loading...",
  className = "",
  showSpinner = true,
}) => {
  const sizeClasses = {
    small: styles.small,
    default: styles.default,
    large: styles.large,
  };

  return (
    <div
      className={`${styles.loadingContainer} ${sizeClasses[size]} ${className}`}
    >
      {showSpinner && (
        <Loader2
          size={size === "large" ? 48 : size === "small" ? 20 : 32}
          className={styles.spinner}
        />
      )}
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default LoadingState;
