import React, { useState, useEffect } from "react";
import {
  Plus,
  Briefcase,
  Globe,
  Users,
  DollarSign,
  Palette,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import StatCard from "../../../../../components/UI/StatCard/StatCard";
import SearchInput from "../../../../../components/UI/SearchInput/SearchInput";
import LoadingState from "../../../../../components/UI/LoadingState/LoadingState";
import ErrorState from "../../../../../components/UI/ErrorState/ErrorState";
import EmptyState from "../../../../../components/UI/EmptyState/EmptyState";
import Button from "../../../../../components/UI/Button/Button";
import CreateBusinessModal from "../../components/CreateBusinessModal/CreateBusinessModal";
import { useBusiness } from "../../../../../hooks/useBusiness";
import { useDebounce } from "../../../../../hooks/useDebounce";
import {
  getCategoryIcon,
  getCategoryColor,
  formatBusinessMetrics,
  generateBusinessSummary,
} from "../../../../../utils/businessUtils";
import QuickActionCard from "../../../../../components/businesses/QuickActionCard/QuickActionCard";
import styles from "./BusinessDashboard.module.css";
import BusinessCard from "../../../../../components/businesses/BusinessCard/BusinessCard";

const BusinessDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    businesses,
    categories,
    loading,
    error,
    success,
    pagination,
    filters,
    fetchBusinesses,
    fetchCategories,
    createBusiness,
    setSearchFilters,
    clearError,
    clearSuccessFlags,
  } = useBusiness();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const searchFilters = {
      search: debouncedSearchTerm,
      category: selectedCategory === "all" ? "" : selectedCategory,
      page: 1,
    };

    setSearchFilters(searchFilters);
    fetchBusinesses(searchFilters);
  }, [
    debouncedSearchTerm,
    selectedCategory,
    fetchBusinesses,
    setSearchFilters,
  ]);

  useEffect(() => {
    if (success.create) {
      const timer = setTimeout(() => {
        clearSuccessFlags("create");
        setShowCreateModal(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success.create, clearSuccessFlags]);

  const overallStats = generateBusinessSummary(businesses);

  const handleCreateBusiness = async (businessData) => {
    try {
      await createBusiness(businessData);
    } catch (error) {
      console.error("Failed to create business:", error);
    }
  };

  const handleBusinessAction = (action, businessId) => {
    switch (action) {
      case "view":
        window.location.href = `/dashboard/business/detail/${businessId}`;
        break;
      case "edit":
        window.location.href = `/dashboard/businesses/${businessId}/edit`;
        break;
      case "settings":
        window.location.href = `/dashboard/businesses/${businessId}/settings`;
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  const handleLoadMore = () => {
    if (pagination.hasMore && !loading.businesses) {
      const nextPage = pagination.currentPage + 1;
      fetchBusinesses({ ...filters, page: nextPage }, true);
    }
  };

  return (
    <DashboardLayout activePage="businesses">
      <div className={styles.businessDashboard}>
        {/* Header */}
        <div className={styles.dashboardHeaderSection}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1>My Businesses</h1>
              <p>
                Manage your businesses and create stunning websites for each one
              </p>
            </div>
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => setShowCreateModal(true)}
              loading={loading.create}
            >
              {loading.create ? "Creating..." : "Create New Business"}
            </Button>
          </div>
        </div>

        {/* Success Message */}
        {success.create && (
          <div className={styles.successMessage}>
            <div className={styles.successContent}>
              <span>Business created successfully!</span>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className={styles.statsOverview}>
          <StatCard
            icon={Briefcase}
            title="Total Businesses"
            value={overallStats.total}
            subtitle={`${overallStats.active} active`}
            color="primary"
          />
          <StatCard
            icon={Globe}
            title="Total Websites"
            value={overallStats.totalWebsites}
            subtitle="Across all businesses"
            color="primary"
          />
          <StatCard
            icon={Users}
            title="Total Visitors"
            value={overallStats.totalVisitors.toLocaleString()}
            subtitle="This month"
            color="success"
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${overallStats.totalRevenue.toLocaleString()}`}
            subtitle="This month"
            color="warning"
          />
        </div>

        {/* Search & Filter */}
        <div className={styles.controlsSection}>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search businesses..."
            className={styles.searchContainer}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categoryFilter}
            disabled={loading.categories}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Error Display */}
        {error.businesses && (
          <ErrorState
            title="Unable to load businesses"
            message={error.businesses}
            onRetry={() => {
              clearError("businesses");
              fetchBusinesses(filters);
            }}
          />
        )}

        {/* Loading Display */}
        {loading.businesses && businesses.length === 0 && (
          <LoadingState message="Loading your businesses..." />
        )}

        {/* Business Cards */}
        {!error.businesses && businesses.length > 0 && (
          <div className={styles.businessesGrid}>
            {businesses.map((business) => {
              const IconComponent = getCategoryIcon(business.category?.slug);
              const categoryColor = getCategoryColor(business.category?.slug);
              const metrics = formatBusinessMetrics(business);

              return (
                <BusinessCard
                  key={business.id}
                  business={business}
                  icon={IconComponent}
                  categoryColor={categoryColor}
                  metrics={metrics}
                  onAction={handleBusinessAction}
                />
              );
            })}

            {/* Create New Business Card */}
            <div
              className={`${styles.businessCard} ${styles.createNew}`}
              onClick={() => setShowCreateModal(true)}
            >
              <div className={styles.createContent}>
                <Plus size={48} />
                <h3>Create New Business</h3>
                <p>
                  Start building your online presence with our easy-to-use
                  website builder
                </p>
                <Button variant="primary">
                  Get Started <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {pagination.hasMore && businesses.length > 0 && (
          <div className={styles.loadMoreContainer}>
            <Button
              variant="outline"
              onClick={handleLoadMore}
              loading={loading.businesses}
            >
              {loading.businesses ? "Loading..." : "Load More"}
              <ArrowRight size={16} />
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading.businesses &&
          !error.businesses &&
          businesses.length === 0 && (
            <EmptyState
              icon={Briefcase}
              title="No businesses found"
              message={
                searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Create your first business to get started"
              }
              action={
                !searchTerm &&
                selectedCategory === "all" && (
                  <Button
                    variant="primary"
                    icon={Plus}
                    onClick={() => setShowCreateModal(true)}
                  >
                    Create Your First Business
                  </Button>
                )
              }
            />
          )}

        {/* Quick Actions */}
        <div className={styles.quickActionsSection}>
          <h2>Quick Actions</h2>
          <div className={styles.quickActionsGrid}>
            <QuickActionCard
              icon={Palette}
              title="Browse Templates"
              description="Explore our collection of business templates"
              href="/dashboard/templates"
            />
            <QuickActionCard
              icon={BarChart3}
              title="View Analytics"
              description="Check your business performance metrics"
              href="/dashboard/analytics"
            />
            <QuickActionCard
              icon={Settings}
              title="Account Settings"
              description="Manage your profile and preferences"
              href="/dashboard/settings"
            />
          </div>
        </div>

        {/* Create Business Modal */}
        {showCreateModal && (
          <CreateBusinessModal
            categories={categories}
            loading={loading.create}
            error={error.create}
            onSubmit={handleCreateBusiness}
            onClose={() => {
              setShowCreateModal(false);
              clearError("create");
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default BusinessDashboard;
