// components/common/SearchInput/SearchInput.js
import React from "react";
import { Search, X } from "lucide-react";
import styles from "./SearchInput.module.css";

const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  className = "",
  showClearButton = true,
  ...props
}) => {
  const handleClear = () => {
    onChange("");
    if (onClear) onClear();
  };

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <Search size={18} className={styles.searchIcon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
        {...props}
      />
      {showClearButton && value && (
        <button
          onClick={handleClear}
          className={styles.clearButton}
          type="button"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
