// components/common/TemplateFilters/TemplateFilters.js
import React from "react";
import SearchInput from "../../UI/SearchInput/SearchInput";
import FilterBar from "../../UI/FilterBar/FilterBar";
import { Star, Palette, Grid } from "lucide-react";
import styles from "./TemplateFilters.module.css";

const TemplateFilters = ({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
  categories = [],
  businessCategory = null,
  showBusinessCategoryFilter = false,
  className = "",
}) => {
  const filterOptions = [
    {
      key: "type",
      label: "Type",
      type: "select",
      defaultValue: "featured",
      options: [
        { value: "featured", label: "Featured" },
        { value: "all", label: "All Templates" },
        ...(showBusinessCategoryFilter && businessCategory
          ? [{ value: "business", label: businessCategory.name }]
          : []),
      ],
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      defaultValue: "all",
      options: [
        { value: "all", label: "All Categories" },
        ...categories.map((cat) => ({
          value: cat.slug,
          label: `${cat.name} (${cat.template_count || 0})`,
        })),
      ],
    },
    {
      key: "pricing",
      label: "Pricing",
      type: "select",
      defaultValue: "all",
      options: [
        { value: "all", label: "All Pricing" },
        { value: "free", label: "Free" },
        { value: "premium", label: "Premium" },
        { value: "pro", label: "Pro" },
        { value: "enterprise", label: "Enterprise" },
      ],
    },
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...activeFilter, [key]: value });
  };

  const handleClearAll = () => {
    onFilterChange({
      type: "featured",
      category: "all",
      pricing: "all",
    });
  };

  return (
    <div className={`${styles.templateFilters} ${className}`}>
      <div className={styles.searchSection}>
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search templates..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filterSection}>
        <FilterBar
          filters={filterOptions}
          activeFilters={activeFilter}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
        />
      </div>

      <div className={styles.quickFilters}>
        <button
          className={`${styles.quickFilter} ${
            activeFilter.type === "featured" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("type", "featured")}
        >
          <Star size={16} />
          Featured
        </button>

        {showBusinessCategoryFilter && businessCategory && (
          <button
            className={`${styles.quickFilter} ${
              activeFilter.type === "business" ? styles.active : ""
            }`}
            onClick={() => handleFilterChange("type", "business")}
          >
            <Palette size={16} />
            {businessCategory.name}
          </button>
        )}

        <button
          className={`${styles.quickFilter} ${
            activeFilter.type === "all" ? styles.active : ""
          }`}
          onClick={() => handleFilterChange("type", "all")}
        >
          <Grid size={16} />
          All Templates
        </button>
      </div>
    </div>
  );
};

export default TemplateFilters;
