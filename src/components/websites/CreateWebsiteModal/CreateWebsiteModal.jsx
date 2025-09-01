// components/common/CreateWebsiteModal/CreateWebsiteModal.js
import React, { useState, useEffect } from "react";
import Modal from "../../UI/Modal/Modal";
import TemplateFilters from "../../templates/TemplateFilters/TemplateFilters";
import TemplateGrid from "../../templates/TemplateGrid/TemplateGrid";
import Button from "../../UI/Button/Button";
import { useTemplateFilters } from "../../../hooks/templates/useTemplateFilters";
import styles from "./CreateWebsiteModal.module.css";

const CreateWebsiteModal = ({
  isOpen,
  onClose,
  onCreateWebsite,
  business,
  templates,
  categories,
  loading,
  error,
}) => {
  const [step, setStep] = useState(1); // 1: Template Selection, 2: Website Details
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [websiteData, setWebsiteData] = useState({
    name: "",
    description: "",
  });

  const {
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    filteredTemplates,
  } = useTemplateFilters(templates, categories, business?.business_category);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedTemplate(null);
      setWebsiteData({
        name: business ? `${business.name} Website` : "",
        description: "",
      });
    }
  }, [isOpen, business]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setWebsiteData((prev) => ({
      ...prev,
      name: business ? `${business.name} Website` : template.name,
      description: template.short_description || template.description || "",
    }));
    setStep(2);
  };

  const handleCreateWebsite = async (e) => {
    e.preventDefault();
    if (!selectedTemplate || !websiteData.name.trim()) return;

    const websitePayload = {
      ...websiteData,
      template_id: selectedTemplate.id,
      business_id: business?.id,
    };

    await onCreateWebsite(websitePayload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Website"
      size="large"
      className={styles.createWebsiteModal}
    >
      {step === 1 && (
        <div className={styles.templateSelection}>
          <p className={styles.description}>
            Choose a template to create a new website for {business?.name}
          </p>

          <TemplateFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            categories={categories}
            businessCategory={business?.business_category}
            showBusinessCategoryFilter={true}
          />

          <TemplateGrid
            templates={filteredTemplates}
            loading={loading}
            error={error}
            onTemplateSelect={handleTemplateSelect}
            cardVariant="compact"
            emptyStateProps={{
              title: "No templates found",
              message: searchTerm
                ? `No templates match "${searchTerm}". Try a different search term.`
                : "No templates available for the selected filters.",
            }}
          />
        </div>
      )}

      {step === 2 && (
        <div className={styles.websiteDetails}>
          <form onSubmit={handleCreateWebsite}>
            {selectedTemplate && (
              <div className={styles.selectedTemplate}>
                <img
                  src={selectedTemplate.thumbnail}
                  alt={selectedTemplate.name}
                  className={styles.templateThumb}
                />
                <div className={styles.templateInfo}>
                  <h4>{selectedTemplate.name}</h4>
                  <p>{selectedTemplate.short_description}</p>
                </div>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => setStep(1)}
                  type="button"
                >
                  Change Template
                </Button>
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="website-name">Website Name *</label>
              <input
                id="website-name"
                type="text"
                value={websiteData.name}
                onChange={(e) =>
                  setWebsiteData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter website name"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="website-description">Description</label>
              <textarea
                id="website-description"
                value={websiteData.description}
                onChange={(e) =>
                  setWebsiteData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description of your website"
                rows={3}
                className={styles.textarea}
              />
            </div>

            <div className={styles.formActions}>
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                loading={loading}
                disabled={!websiteData.name.trim() || !selectedTemplate}
              >
                Create Website
              </Button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default CreateWebsiteModal;
