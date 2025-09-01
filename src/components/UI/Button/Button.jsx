// components/common/Button/Button.js
import React from "react";
import { Loader2 } from "lucide-react";
import styles from "./Button.module.css";

const Button = ({
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  children,
  className = "",
  ...props
}) => {
  const variantClasses = {
    primary: styles.primary,
    secondary: styles.secondary,
    outline: styles.outline,
    ghost: styles.ghost,
    destructive: styles.destructive,
  };

  const sizeClasses = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`
        ${styles.button} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${isDisabled ? styles.disabled : ""}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 size={16} className={styles.spinner} />}
      {!loading && Icon && iconPosition === "left" && <Icon size={16} />}
      {children}
      {!loading && Icon && iconPosition === "right" && <Icon size={16} />}
    </button>
  );
};

export default Button;
