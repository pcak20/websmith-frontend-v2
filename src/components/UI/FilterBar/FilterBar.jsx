// components/common/FilterBar/FilterBar.js
import React from "react";
import { Filter, X } from "lucide-react";
import styles from "./FilterBar.module.css";

const FilterBar = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  className = "",
}) => {
  const hasActiveFilters = Object.values(activeFilters).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== "" && value !== "all"
  );

  return (
    <div className={`${styles.filterBar} ${className}`}>
      <div className={styles.filterIcon}>
        <Filter size={16} />
        <span>Filters</span>
      </div>

      <div className={styles.filters}>
        {filters.map((filter) => (
          <div key={filter.key} className={styles.filterGroup}>
            <label className={styles.filterLabel}>{filter.label}</label>
            {filter.type === "select" && (
              <select
                value={activeFilters[filter.key] || filter.defaultValue || ""}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
                className={styles.filterSelect}
              >
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            {filter.type === "multiselect" && (
              <select
                multiple
                value={activeFilters[filter.key] || []}
                onChange={(e) => {
                  const values = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  onFilterChange(filter.key, values);
                }}
                className={styles.filterSelect}
              >
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      {hasActiveFilters && (
        <button onClick={onClearAll} className={styles.clearButton}>
          <X size={14} />
          Clear All
        </button>
      )}
    </div>
  );
};

export default FilterBar;
