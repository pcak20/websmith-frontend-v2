// components/common/ErrorState/ErrorState.js
import React from "react";
import { AlertCircle } from "lucide-react";
import styles from "./ErrorState.module.css";

const ErrorState = ({
  title = "Something went wrong",
  message = "Please try again",
  onRetry,
  showRetry = true,
  className = "",
  icon: CustomIcon,
}) => {
  const IconComponent = CustomIcon || AlertCircle;

  return (
    <div className={`${styles.errorContainer} ${className}`}>
      <IconComponent size={48} className={styles.errorIcon} />
      <h3 className={styles.errorTitle}>{title}</h3>
      <p className={styles.errorMessage}>{message}</p>
      {showRetry && onRetry && (
        <button onClick={onRetry} className={styles.retryBtn}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
