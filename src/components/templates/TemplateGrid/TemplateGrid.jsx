// components/common/TemplateGrid/TemplateGrid.js
import React from "react";
import TemplateCard from "../TemplateCard/TemplateCard";
import LoadingState from "../../UI/LoadingState/LoadingState";
import EmptyState from "../../UI/EmptyState/EmptyState";
import { Palette } from "lucide-react";
import styles from "./TemplateGrid.module.css";

const TemplateGrid = ({
  templates,
  loading,
  error,
  onTemplateSelect,
  onTemplatePreview,
  onTemplateLike,
  onTemplateUse,
  emptyStateProps,
  cardVariant = "default",
  columns = "auto",
  className = "",
}) => {
  const gridClasses = {
    auto: styles.autoGrid,
    1: styles.grid1,
    2: styles.grid2,
    3: styles.grid3,
    4: styles.grid4,
  };

  if (loading) {
    return <LoadingState message="Loading templates..." />;
  }

  if (error) {
    return (
      <EmptyState
        icon={Palette}
        title="Failed to load templates"
        message={error}
      />
    );
  }

  if (!templates || templates.length === 0) {
    return (
      <EmptyState
        icon={Palette}
        title={emptyStateProps?.title || "No templates found"}
        message={
          emptyStateProps?.message || "Try adjusting your search or filters"
        }
        action={emptyStateProps?.action}
      />
    );
  }

  return (
    <div
      className={`${styles.templateGrid} ${gridClasses[columns]} ${className}`}
    >
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          variant={cardVariant}
          onSelect={onTemplateSelect}
          onPreview={onTemplatePreview}
          onLike={onTemplateLike}
          onUse={onTemplateUse}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
