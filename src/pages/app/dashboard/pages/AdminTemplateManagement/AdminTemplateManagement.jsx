// components/AdminTemplateManagement/AdminTemplateManagement.js - Refactored
import React, { useState, useEffect } from "react";
import { Plus, Shield, FolderPlus, Upload } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import TemplateGrid from "../../../../../components/templates/TemplateGrid/TemplateGrid";
import TemplateFilters from "../../../../../components/templates/TemplateFilters/TemplateFilters";
import StatCard from "../../../../../components/UI/StatCard/StatCard";
import Button from "../../../../../components/UI/Button/Button";
import LoadingState from "../../../../../components/UI/LoadingState/LoadingState";
import ErrorState from "../../../../../components/UI/ErrorState/ErrorState";
import CreateTemplateModal from "../../components/CreateTemplateModal/CreateTemplateModal";
import CreateCategoryModal from "../../components/CreateCategoryModal/CreateCategoryModal";
import { useTemplate } from "../../../../../hooks/useTemplate";
import { useTemplateFilters } from "../../../../../hooks/templates/useTemplateFilters";
import { TEMPLATE_REGISTRY } from "../../../../templates/conf";
import { useNavigate } from "react-router-dom";
import styles from "./AdminTemplateManagement.module.css";

const AdminTemplateManagement = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTemplates, setSelectedTemplates] = useState([]);

  const {
    templates,
    categories,
    configuration,
    templateStats,
    loading,
    error,
    success,
    fetchTemplates,
    fetchCategories,
    fetchTemplateStats,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    publishTemplate,
    bulkUpdateTemplates,
    bulkDeleteTemplates,
    createTemplateCategory,
    clearError,
    clearSuccessFlags,
  } = useTemplate(false);

  const {
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    filteredTemplates,
  } = useTemplateFilters(templates, categories);

  // Fetch data on component mount
  useEffect(() => {
    fetchTemplates();
    fetchCategories();
    fetchTemplateStats();
  }, []);

  // Handle success/error states
  useEffect(() => {
    if (success.create) {
      setShowCreateModal(false);
      clearSuccessFlags("create");
      fetchTemplates();
    }

    if (success.createCategory) {
      setShowCreateCategoryModal(false);
      clearSuccessFlags("createCategory");
      fetchCategories();
    }
  }, [
    success.create,
    success.createCategory,
    clearSuccessFlags,
    fetchTemplates,
    fetchCategories,
  ]);

  // Sort templates
  const sortedTemplates = React.useMemo(() => {
    const sorted = [...filteredTemplates].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      return sortOrder === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

    return sorted;
  }, [filteredTemplates, sortBy, sortOrder]);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplates((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleBulkAction = async (action) => {
    try {
      if (action === "publish") {
        await bulkUpdateTemplates(selectedTemplates, { status: "published" });
      } else if (action === "archive") {
        await bulkUpdateTemplates(selectedTemplates, { status: "archived" });
      } else if (action === "delete") {
        if (
          window.confirm("Are you sure you want to delete these templates?")
        ) {
          await bulkDeleteTemplates(selectedTemplates);
        }
      }
      setSelectedTemplates([]);
    } catch (error) {
      console.error(`Bulk ${action} failed:`, error);
    }
  };

  const handleTemplateAction = async (action, template) => {
    try {
      switch (action) {
        case "edit":
          navigate(`/dashboard/admin/templates/${template.id}/edit`);
          break;
        case "view":
          window.open(`/templates/${template.slug}/preview`, "_blank");
          break;
        case "duplicate":
          console.log("Duplicate template:", template.id);
          break;
        case "publish":
          await publishTemplate(template.id);
          break;
        case "archive":
          await updateTemplate(template.id, { status: "archived" });
          break;
        case "delete":
          if (
            window.confirm("Are you sure you want to delete this template?")
          ) {
            await deleteTemplate(template.id);
          }
          break;
        default:
          console.log(`Unknown action: ${action}`);
      }
    } catch (error) {
      console.error(`Template ${action} failed:`, error);
    }
  };

  const stats = templateStats || {
    total: templates?.length || 0,
    published: templates?.filter((t) => t.status === "published").length || 0,
    draft: templates?.filter((t) => t.status === "draft").length || 0,
    archived: templates?.filter((t) => t.status === "archived").length || 0,
    totalInstallations:
      templates?.reduce((sum, t) => sum + (t.installation_count || 0), 0) || 0,
    averageRating:
      templates?.length > 0
        ? templates.reduce((sum, t) => sum + (t.average_rating || 0), 0) /
          templates.length
        : 0,
    featuredCount: templates?.filter((t) => t.is_featured).length || 0,
  };

  return (
    <DashboardLayout activePage="admin-templates">
      <div className={styles.templateManagement}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1>
                <Shield size={24} />
                Template Management
              </h1>
              <p>Manage templates, categories, and marketplace content</p>
            </div>
            <div className={styles.headerActions}>
              <Button
                variant="outline"
                icon={FolderPlus}
                onClick={() => setShowCreateCategoryModal(true)}
              >
                Create Category
              </Button>
              <Button variant="outline" icon={Upload}>
                Import Template
              </Button>
              <Button
                variant="primary"
                icon={Plus}
                onClick={() => setShowCreateModal(true)}
              >
                Create Template
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <StatCard
            icon={Shield}
            title="Total Templates"
            value={stats.total}
            subtitle={stats.draft > 0 ? `${stats.draft} drafts` : null}
            color="primary"
          />
          <StatCard
            icon={Shield}
            title="Published"
            value={stats.published}
            subtitle={stats.archived > 0 ? `${stats.archived} archived` : null}
            color="success"
          />
          <StatCard
            icon={Shield}
            title="Total Installations"
            value={stats.totalInstallations?.toLocaleString()}
            subtitle="Across all templates"
            color="warning"
          />
          <StatCard
            icon={Shield}
            title="Average Rating"
            value={stats.averageRating?.toFixed(1)}
            subtitle={`${stats.featuredCount} featured`}
            color="primary"
          />
        </div>

        {/* Template Filters */}
        <TemplateFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          categories={categories}
        />

        {/* Bulk Actions */}
        {selectedTemplates.length > 0 && (
          <div className={styles.bulkActions}>
            <span>{selectedTemplates.length} selected</span>
            <Button size="small" onClick={() => handleBulkAction("publish")}>
              Publish
            </Button>
            <Button size="small" onClick={() => handleBulkAction("archive")}>
              Archive
            </Button>
            <Button
              size="small"
              variant="destructive"
              onClick={() => handleBulkAction("delete")}
            >
              Delete
            </Button>
          </div>
        )}

        {/* Templates Grid */}
        {loading.templates ? (
          <LoadingState message="Loading templates..." />
        ) : error.templates ? (
          <ErrorState
            title="Failed to load templates"
            message={error.templates}
            onRetry={() => {
              clearError("templates");
              fetchTemplates();
            }}
          />
        ) : (
          <TemplateGrid
            templates={sortedTemplates}
            onTemplateSelect={(template) =>
              navigate(`/dashboard/admin/templates/${template.id}`)
            }
            onTemplatePreview={(template) =>
              handleTemplateAction("view", template)
            }
            cardVariant="detailed"
            emptyStateProps={{
              title: "No templates found",
              message: "Try adjusting your search or filters",
              action: (
                <Button
                  variant="primary"
                  icon={Plus}
                  onClick={() => setShowCreateModal(true)}
                >
                  Create Your First Template
                </Button>
              ),
            }}
          />
        )}

        {/* Create Template Modal */}
        <CreateTemplateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={createTemplate}
          categories={categories}
          configuration={configuration}
          loading={loading.create}
          temp_registry={TEMPLATE_REGISTRY}
        />

        {/* Create Category Modal */}
        <CreateCategoryModal
          isOpen={showCreateCategoryModal}
          onClose={() => setShowCreateCategoryModal(false)}
          onSubmit={createTemplateCategory}
          categories={categories}
          loading={loading.createCategory}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminTemplateManagement;
