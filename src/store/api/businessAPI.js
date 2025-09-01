// store/api/businessAPI.js - Updated for Django Backend
import { createApiClient, API_CONFIG } from "./config";
import { setupInterceptors } from "./interceptors";

const businessClient = createApiClient(`${API_CONFIG.BASE_URL}/business/`);

// Setup all interceptors for authenticated endpoints
setupInterceptors(businessClient, { includeAuth: true, includeRetry: true });

export const businessAPI = {
  // Business CRUD - Maps to Django BusinessViewSet
  getBusinesses: (params = {}) => {
    // Convert frontend params to Django format
    const djangoParams = {
      page: params.page || 1,
      page_size: params.pageSize || 12,
      search: params.search || "",
      category: params.category || "",
      ordering: params.sortBy === "name" ? "name" : "-created_at",
      status: params.status || "",
    };

    // Remove empty params
    Object.keys(djangoParams).forEach(
      (key) =>
        (djangoParams[key] === "" || djangoParams[key] === undefined) &&
        delete djangoParams[key]
    );

    return businessClient.get("/", { params: djangoParams });
  },

  getBusiness: (businessId) => businessClient.get(`/${businessId}/`),

  createBusiness: (data) => {
    // Transform frontend data to match Django serializer
    const djangoData = {
      name: data.name,
      description: data.description,
      category_id: data.category_id,
      phone: data.phone || "",
      email: data.email || "",
      website: data.website || "",
      address_line1: data.address_line1 || "",
      address_line2: data.address_line2 || "",
      city: data.city || "",
      state: data.state || "",
      postal_code: data.postal_code || "",
      country: data.country || "",
      facebook_url: data.facebook_url || "",
      instagram_url: data.instagram_url || "",
      twitter_url: data.twitter_url || "",
      linkedin_url: data.linkedin_url || "",
    };

    return businessClient.post("/", djangoData);
  },

  updateBusiness: (businessId, data) =>
    businessClient.patch(`/${businessId}/`, data),

  deleteBusiness: (businessId) => businessClient.delete(`/${businessId}/`),

  // Categories - Maps to Django BusinessCategoryViewSet
  getCategories: () => businessClient.get("/categories/"),
  getCategory: (categoryId) => businessClient.get(`/categories/${categoryId}/`),

  // Business Analytics - Maps to Django custom actions
  getBusinessAnalytics: (businessId, params = {}) => {
    const djangoParams = {
      date_range: params.dateRange || "30d",
      metrics: params.metrics?.join(",") || "all",
    };

    return businessClient.get(`/${businessId}/analytics/`, {
      params: djangoParams,
    });
  },

  getBusinessMetrics: (businessId, params = {}) =>
    businessClient.get(`/${businessId}/metrics/`, { params }),

  getBusinessInsights: (businessId, params = {}) =>
    businessClient.get(`/${businessId}/insights/`, { params }),

  // Business Settings - Maps to Django settings action
  getBusinessSettings: (businessId) =>
    businessClient.get(`/${businessId}/settings/`),

  updateBusinessSettings: (businessId, settings) =>
    businessClient.put(`/${businessId}/settings/`, settings),

  // Logo Upload - Maps to Django upload_logo action
  uploadBusinessLogo: (businessId, formData, config = {}) =>
    businessClient.post(`/${businessId}/upload_logo/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),

  deleteBusinessLogo: (businessId) =>
    businessClient.delete(`/${businessId}/logo/`),

  // Business Images - Maps to Django images action
  uploadBusinessImage: (businessId, formData, config = {}) =>
    businessClient.post(`/${businessId}/images/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),

  getBusinessImages: (businessId) =>
    businessClient.get(`/${businessId}/images/`),

  deleteBusinessImage: (businessId, imageId) =>
    businessClient.delete(`/${businessId}/images/${imageId}/`),

  // Team Management - Maps to Django team actions
  getBusinessTeam: (businessId) => businessClient.get(`/${businessId}/team/`),

  inviteTeamMember: (businessId, inviteData) =>
    businessClient.post(`/${businessId}/team/invite/`, inviteData),

  updateTeamMember: (businessId, memberId, data) =>
    businessClient.put(`/${businessId}/team/${memberId}/`, data),

  removeTeamMember: (businessId, memberId) =>
    businessClient.delete(`/${businessId}/team/${memberId}/`),

  getTeamInvitations: (businessId) =>
    businessClient.get(`/${businessId}/team/invitations/`),

  // Invitation Management - Maps to Django invitation views
  acceptInvitation: (token) =>
    businessClient.post(`/business/api/invitations/accept/${token}/`),

  declineInvitation: (token) =>
    businessClient.post(`/business/api/invitations/decline/${token}/`),

  // Business Websites - This will connect to website app later
  getBusinessWebsites: (businessId) =>
    businessClient.get(`/${businessId}/websites/`),

  createBusinessWebsite: (businessId, websiteData) =>
    businessClient.post(`/${businessId}/websites/`, websiteData),

  updateBusinessWebsite: (businessId, websiteId, data) =>
    businessClient.put(`/${businessId}/websites/${websiteId}/`, data),

  deleteBusinessWebsite: (businessId, websiteId) =>
    businessClient.delete(`/${businessId}/websites/${websiteId}/`),

  // Activity Log - Maps to Django activity action
  getActivityLog: (businessId, params = {}) => {
    const djangoParams = {
      limit: params.limit || 50,
      offset: params.offset || 0,
    };

    return businessClient.get(`/${businessId}/activity/`, {
      params: djangoParams,
    });
  },

  // Backup Management - Maps to Django backup actions
  createBackup: (businessId, backupName) =>
    businessClient.post(`/${businessId}/backups/`, {
      name: backupName,
    }),

  getBackups: (businessId) => businessClient.get(`/${businessId}/backups/`),

  restoreBackup: (businessId, backupId) =>
    businessClient.post(`/${businessId}/backups/${backupId}/restore/`),

  deleteBackup: (businessId, backupId) =>
    businessClient.delete(`/${businessId}/backups/${backupId}/`),

  // Export/Import - Maps to Django export/import actions
  exportBusiness: (businessId, format = "json") =>
    businessClient.get(`/${businessId}/export/`, {
      params: { format },
      responseType: format === "json" ? "json" : "blob",
    }),

  importBusiness: (businessId, importData) =>
    businessClient.post(`/${businessId}/import/`, importData),

  // Domain Management - Maps to Django domains action
  getBusinessDomains: (businessId) =>
    businessClient.get(`/${businessId}/domains/`),

  addCustomDomain: (businessId, domainData) =>
    businessClient.post(`/${businessId}/domains/`, domainData),

  updateDomain: (businessId, domainId, domainData) =>
    businessClient.put(`/${businessId}/domains/${domainId}/`, domainData),

  deleteDomain: (businessId, domainId) =>
    businessClient.delete(`/${businessId}/domains/${domainId}/`),

  verifyDomain: (businessId, domainId) =>
    businessClient.post(`/${businessId}/domains/${domainId}/verify/`),

  enableSSL: (businessId, domainId) =>
    businessClient.post(`/${businessId}/domains/${domainId}/ssl/enable/`),

  // Integration Management - Maps to Django integrations action
  getIntegrations: (businessId) =>
    businessClient.get(`/${businessId}/integrations/`),

  enableIntegration: (businessId, integrationData) =>
    businessClient.post(`/${businessId}/integrations/`, integrationData),

  updateIntegration: (businessId, integrationId, integrationData) =>
    businessClient.put(
      `/${businessId}/integrations/${integrationId}/`,
      integrationData
    ),

  disableIntegration: (businessId, integrationId) =>
    businessClient.delete(`/${businessId}/integrations/${integrationId}/`),

  // Notification Settings
  getNotificationSettings: (businessId) =>
    businessClient.get(`/${businessId}/settings/`), // Part of settings

  updateNotificationSettings: (businessId, settings) =>
    businessClient.patch(`/${businessId}/settings/`, settings),
};

// Data transformation utilities
export const transformBusinessData = {
  // Transform Django response to frontend format
  fromDjango: (djangoBusiness) => ({
    id: djangoBusiness.id,
    name: djangoBusiness.name,
    slug: djangoBusiness.slug,
    description: djangoBusiness.description,
    category: djangoBusiness.category,
    status: djangoBusiness.status,
    verification_status: djangoBusiness.verification_status,

    // Contact info
    phone: djangoBusiness.phone,
    email: djangoBusiness.email,
    website: djangoBusiness.website,

    // Address
    address: {
      line1: djangoBusiness.address_line1,
      line2: djangoBusiness.address_line2,
      city: djangoBusiness.city,
      state: djangoBusiness.state,
      postalCode: djangoBusiness.postal_code,
      country: djangoBusiness.country,
      full: djangoBusiness.full_address,
    },

    // Dates
    establishedDate: djangoBusiness.established_date,
    createdAt: djangoBusiness.created_at,
    updatedAt: djangoBusiness.updated_at,

    // Media
    logo: djangoBusiness.logo,
    logoUrl: djangoBusiness.logo_url,
    images: djangoBusiness.images || [],

    // Social media
    socialMedia: {
      facebook: djangoBusiness.facebook_url,
      instagram: djangoBusiness.instagram_url,
      twitter: djangoBusiness.twitter_url,
      linkedin: djangoBusiness.linkedin_url,
    },

    // Stats
    averageRating: djangoBusiness.average_rating,
    totalReviews: djangoBusiness.total_reviews,
    teamMembersCount: djangoBusiness.team_members_count,
    websitesCount: djangoBusiness.websites_count,

    // Related data
    owner: djangoBusiness.owner,
    teamMembers: djangoBusiness.team_members || [],
    settings: djangoBusiness.settings,
    domains: djangoBusiness.domains || [],
    integrations: djangoBusiness.integrations || [],
  }),

  // Transform frontend data to Django format
  toDjango: (frontendBusiness) => ({
    name: frontendBusiness.name,
    description: frontendBusiness.description,
    category_id: frontendBusiness.categoryId,
    phone: frontendBusiness.phone || "",
    email: frontendBusiness.email || "",
    website: frontendBusiness.website || "",
    address_line1: frontendBusiness.address?.line1 || "",
    address_line2: frontendBusiness.address?.line2 || "",
    city: frontendBusiness.address?.city || "",
    state: frontendBusiness.address?.state || "",
    postal_code: frontendBusiness.address?.postalCode || "",
    country: frontendBusiness.address?.country || "",
    established_date: frontendBusiness.establishedDate || null,
    facebook_url: frontendBusiness.socialMedia?.facebook || "",
    instagram_url: frontendBusiness.socialMedia?.instagram || "",
    twitter_url: frontendBusiness.socialMedia?.twitter || "",
    linkedin_url: frontendBusiness.socialMedia?.linkedin || "",
  }),
};

// Error handling utilities
export const handleBusinessAPIError = (error) => {
  if (error.response?.data) {
    // Django validation errors
    if (error.response.data.detail) {
      return error.response.data.detail;
    }

    // Field-specific errors
    if (typeof error.response.data === "object") {
      const firstError = Object.values(error.response.data)[0];
      return Array.isArray(firstError) ? firstError[0] : firstError;
    }
  }

  // Network or other errors
  if (error.message) {
    return error.message;
  }

  return "An unexpected error occurred";
};

// Request configuration helpers
export const createBusinessRequestConfig = (options = {}) => ({
  timeout: options.timeout || 30000,
  ...options,
});

export const createFileUploadConfig = (onProgress) => ({
  headers: {
    "Content-Type": "multipart/form-data",
  },
  onUploadProgress: (progressEvent) => {
    if (onProgress && progressEvent.total) {
      const progress = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      onProgress(progress);
    }
  },
  timeout: 60000, // Longer timeout for file uploads
});

// Export individual functions for tree-shaking
export const {
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getCategories,
  getCategory,
  getBusinessWebsites,
  createBusinessWebsite,
  updateBusinessWebsite,
  deleteBusinessWebsite,
  getBusinessAnalytics,
  getBusinessMetrics,
  getBusinessInsights,
  getBusinessSettings,
  updateBusinessSettings,
  uploadBusinessLogo,
  deleteBusinessLogo,
  uploadBusinessImage,
  getBusinessImages,
  deleteBusinessImage,
  getBusinessTeam,
  inviteTeamMember,
  updateTeamMember,
  removeTeamMember,
  getTeamInvitations,
  acceptInvitation,
  declineInvitation,
  getActivityLog,
  createBackup,
  getBackups,
  restoreBackup,
  deleteBackup,
  exportBusiness,
  importBusiness,
  getBusinessDomains,
  addCustomDomain,
  updateDomain,
  deleteDomain,
  verifyDomain,
  enableSSL,
  getIntegrations,
  enableIntegration,
  updateIntegration,
  disableIntegration,
  getNotificationSettings,
  updateNotificationSettings,
} = businessAPI;

export default businessAPI;
