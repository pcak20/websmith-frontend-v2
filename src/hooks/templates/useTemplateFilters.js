// hooks/useTemplateFilters.js
import { useState, useMemo } from "react";

export const useTemplateFilters = (templates, categories, businessCategory) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState({
    type: "featured",
    category: "all",
    pricing: "all",
  });

  const filteredTemplates = useMemo(() => {
    if (!templates) return [];

    let filtered = [...templates];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (template) =>
          template.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.short_description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          template.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter.category !== "all") {
      filtered = filtered.filter(
        (template) =>
          template.category?.slug === activeFilter.category ||
          template.business_category?.slug === activeFilter.category
      );
    }

    // Apply pricing filter
    if (activeFilter.pricing !== "all") {
      filtered = filtered.filter(
        (template) => template.pricing_tier === activeFilter.pricing
      );
    }

    // Apply type filter (this affects the source of templates)
    // This should be handled by the parent component when fetching data

    return filtered;
  }, [templates, searchTerm, activeFilter]);

  return {
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    filteredTemplates,
  };
};
