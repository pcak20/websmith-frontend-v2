import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Settings,
  Globe,
  TrendingUp,
  BarChart3,
  ArrowLeft,
} from "lucide-react";

// Common Components
import DashboardLayout from "../../../../components/layouts/DashboardLayout/DashboardLayout";
import LoadingState from "../../../../components/UI/LoadingState/LoadingState";
import ErrorState from "../../../../components/UI/ErrorState/ErrorState";
import EmptyState from "../../../../components/UI/EmptyState/EmptyState";

import Button from "../../../../components/UI/Button/Button";
import Tabs from "../../../../components/UI/Tabs/Tabs";
import CreateWebsiteModal from "../../../../components/websites/CreateWebsiteModal/CreateWebsiteModal";

// Business-specific Components
import BusinessOverview from "../../../../components/businesses/BusinessOverview/BusinessOverview";
import BusinessAnalytics from "../../../../components/businesses/BusinessAnalytics/BusinessAnalytics";
import BusinessSettings from "../../../../components/businesses/BusinessSettings/BusinessSettings";
import BusinessWebsitesTab from "../../../../components/businesses/BusinessWebsitesTab/BusinessWebsitesTab";

// Hooks and Utils
import { useCommonActions } from "../../../../hooks/common/useCommonActions";
import { useLoadingStates } from "../../../../hooks/common/useLoadingStates";
import { useErrorHandling } from "../../../../hooks/common/useErrorHandling";

// Redux/State Management
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBusiness,
  fetchBusinessWebsites,
  fetchBusinessAnalytics,
  selectBusinessDetails,
  selectBusinessLoading,
  selectBusinessError,
  // Import the memoized selector creators
  makeSelectBusinessWebsites,
  makeSelectBusinessAnalytics,
} from "../../../../store/slices/businessSlice";

import {
  fetchTemplates,
  fetchFeaturedTemplates,
  fetchTemplateCategories,
  selectTemplates,
  selectFeaturedTemplates,
  selectTemplateCategories,
  selectTemplateLoading,
} from "../../../../store/slices/templateSlice";

import BusinessHeader from "../../../../components/businesses/BusinessHeader/BusinessHeader";

import styles from "./BusinessDetailDashboard.module.css";
import { useWebsite } from "../../../../hooks/useWebsite";

const BusinessDetailDashboard = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createWebsite } = useWebsite();

  // State
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateWebsite, setShowCreateWebsite] = useState(false);

  // Create memoized selectors for this specific business
  const selectBusinessWebsitesForBusiness = useMemo(
    makeSelectBusinessWebsites,
    []
  );
  const selectBusinessAnalyticsForBusiness = useMemo(
    makeSelectBusinessAnalytics,
    []
  );

  // Custom hooks
  const { handleBusinessAction, handleWebsiteAction, handleTemplateAction } =
    useCommonActions();
  const { loading: localLoading, withLoading } = useLoadingStates({
    createWebsite: false,
  });
  const { errors: localErrors, withErrorHandling } = useErrorHandling();

  // Redux selectors - now using memoized selectors
  const business = useSelector((state) =>
    selectBusinessDetails(state, businessId)
  );

  // Use the memoized selectors
  const websites = useSelector((state) =>
    selectBusinessWebsitesForBusiness(state, businessId)
  );

  const analytics = useSelector((state) =>
    selectBusinessAnalyticsForBusiness(state, businessId)
  );

  const templates = useSelector(selectTemplates);
  const featuredTemplates = useSelector(selectFeaturedTemplates);
  const templateCategories = useSelector(selectTemplateCategories);

  const businessLoading = useSelector(selectBusinessLoading);
  const businessError = useSelector(selectBusinessError);
  const templateLoading = useSelector(selectTemplateLoading);

  // Fetch data on component mount
  useEffect(() => {
    if (businessId) {
      dispatch(fetchBusiness(businessId));
      dispatch(fetchBusinessWebsites(businessId));
      dispatch(fetchBusinessAnalytics({ businessId }));
    }
  }, [dispatch, businessId]);

  // Fetch template data
  useEffect(() => {
    dispatch(fetchTemplateCategories());
    dispatch(fetchFeaturedTemplates());

    if (business?.business_category?.slug) {
      dispatch(
        fetchTemplates({
          business_category: business.business_category.slug,
        })
      );
    }
  }, [dispatch, business?.business_category?.slug]);

  // Handle website creation
  const handleCreateWebsite = async (websiteData) => {
    return withLoading("createWebsite", async () => {
      return withErrorHandling("createWebsite", async () => {
        const result = await createWebsite(businessId, {
          ...websiteData,
          design_settings: websiteData.design_settings || {},
          seo_settings: websiteData.seo_settings || {},
        });

        setShowCreateWebsite(false);
        dispatch(fetchBusinessWebsites(businessId)); // Refresh websites
        return result;
      });
    });
  };

  // Define tabs configuration - memoize to prevent unnecessary re-renders
  const tabsConfig = useMemo(
    () => [
      {
        id: "overview",
        label: "Overview",
        icon: BarChart3,
      },
      {
        id: "websites",
        label: "Websites",
        icon: Globe,
        count: websites?.length || 0,
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: TrendingUp,
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
      },
    ],
    [websites?.length]
  );

  // Custom action handlers - memoize to prevent unnecessary re-renders
  const businessActionHandlers = useMemo(
    () => ({
      onView: (business) => navigate(`/dashboard/businesses/${business.id}`),
      onEdit: (business) =>
        navigate(`/dashboard/businesses/${business.id}/edit`),
      onSettings: (business) =>
        navigate(`/dashboard/businesses/${business.id}/settings`),
    }),
    [navigate]
  );

  const websiteActionHandlers = useMemo(
    () => ({
      onEdit: (website) => navigate(`/websites/${website.id}/editor`),
      onPreview: (website) => {
        const url =
          website.custom_domain ||
          website.url ||
          `${website.subdomain}.webcraft.com`;
        window.open(`https://${url}`, "_blank");
      },
      onSettings: (website) => navigate(`/websites/${website.id}/settings`),
      onAnalytics: (website) => navigate(`/websites/${website.id}/analytics`),
    }),
    [navigate]
  );

  // Loading state
  if (businessLoading.businessDetails && !business) {
    return (
      <DashboardLayout activePage="businesses">
        <LoadingState size="large" message="Loading business details..." />
      </DashboardLayout>
    );
  }

  // Error state
  if (businessError.businessDetails && !business) {
    return (
      <DashboardLayout activePage="businesses">
        <ErrorState
          title="Error Loading Business"
          message={businessError.businessDetails}
          onRetry={() => dispatch(fetchBusiness(businessId))}
        />
      </DashboardLayout>
    );
  }

  // Not found state
  if (!businessLoading.businessDetails && !business) {
    return (
      <DashboardLayout activePage="businesses">
        <EmptyState
          title="Business Not Found"
          message="The business you're looking for doesn't exist or you don't have access to it."
          action={
            <Button
              variant="primary"
              icon={ArrowLeft}
              onClick={() => navigate("/dashboard/business")}
            >
              Back to Businesses
            </Button>
          }
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activePage="businesses">
      <div className={styles.businessDetail}>
        {/* Header */}
        <BusinessHeader
          business={business}
          analytics={analytics}
          onBack={() => navigate("/dashboard/business")}
          onAction={(action) =>
            handleBusinessAction(action, business, businessActionHandlers)
          }
        />

        {/* Navigation Tabs */}
        <div className={styles.tabsContainer}>
          <Tabs
            tabs={tabsConfig}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="underline"
          />
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === "overview" && (
            <BusinessOverview
              business={business}
              websites={websites}
              analytics={analytics}
              loading={businessLoading}
              error={businessError}
            />
          )}

          {activeTab === "websites" && (
            <BusinessWebsitesTab
              business={business}
              websites={websites}
              templates={templates}
              featuredTemplates={featuredTemplates}
              templateCategories={templateCategories}
              loading={{
                websites: businessLoading.websites,
                templates: templateLoading.templates,
                create: localLoading.createWebsite,
              }}
              error={{
                websites: businessError.websites,
                create: localErrors.createWebsite,
              }}
              onCreateWebsite={() => setShowCreateWebsite(true)}
              onWebsiteAction={(action, website) =>
                handleWebsiteAction(action, website, websiteActionHandlers)
              }
            />
          )}

          {activeTab === "analytics" && (
            <BusinessAnalytics
              business={business}
              analytics={analytics}
              loading={businessLoading.analytics}
              error={businessError.analytics}
              onRefresh={() => dispatch(fetchBusinessAnalytics({ businessId }))}
            />
          )}

          {activeTab === "settings" && (
            <BusinessSettings
              business={business}
              loading={businessLoading.settings}
              error={businessError.settings}
            />
          )}
        </div>

        {/* Create Website Modal */}
        <CreateWebsiteModal
          isOpen={showCreateWebsite}
          onClose={() => setShowCreateWebsite(false)}
          onCreateWebsite={handleCreateWebsite}
          business={business}
          templates={
            business?.business_category ? templates : featuredTemplates
          }
          categories={templateCategories}
          loading={localLoading.createWebsite || templateLoading.templates}
          error={localErrors.createWebsite}
        />
      </div>
    </DashboardLayout>
  );
};

export default BusinessDetailDashboard;
