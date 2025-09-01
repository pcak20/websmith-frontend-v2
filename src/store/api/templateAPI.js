// store/api/templateAPI.js
import { createApiClient, API_CONFIG } from "./config";
import { setupInterceptors } from "./interceptors";

const templateClient = createApiClient(`${API_CONFIG.BASE_URL}/templates`);

// Setup all interceptors for authenticated endpoints
setupInterceptors(templateClient, { includeAuth: true, includeRetry: true });

export const templateAPI = {
  // Template configuration
  getTemplateConfiguration: () => templateClient.get("/configuration/"),

  // Template browsing and discovery
  getTemplates: (params = {}) => templateClient.get("/", { params }),
  getTemplate: (templateId) => templateClient.get(`/detail/${templateId}/`),

  // Template categories
  getTemplateCategories: () => templateClient.get("/categories/"),
  getCategory: (categorySlug) =>
    templateClient.get(`/categories/${categorySlug}/`),
  getTemplatesByCategory: (categorySlug, params = {}) =>
    templateClient.get(`/categories/${categorySlug}/templates/`, { params }),

  // Category management (admin)
  createTemplateCategory: (categoryData) =>
    templateClient.post("/categories/create/", categoryData),
  updateTemplateCategory: (categoryId, categoryData) =>
    templateClient.put(`/categories/${categoryId}/update/`, categoryData),
  deleteTemplateCategory: (categoryId) =>
    templateClient.delete(`/categories/${categoryId}/delete/`),

  // Template search and filtering
  searchTemplates: (searchData) => templateClient.post("/search/", searchData),

  // Featured and curated content
  getFeaturedTemplates: () => templateClient.get("/featured/"),
  getTrendingTemplates: () => templateClient.get("/trending/"),
  getNewTemplates: () => templateClient.get("/new/"),
  getPopularTemplates: () => templateClient.get("/popular/"),

  // Template tags
  getTemplateTags: (params = {}) => templateClient.get("/tags/", { params }),
  getPopularTags: () => templateClient.get("/tags/popular/"),
  getFeaturedTags: () => templateClient.get("/tags/featured/"),
  getTag: (tagSlug) => templateClient.get(`/tags/${tagSlug}/`),

  // Template actions
  likeTemplate: (templateId) => templateClient.post(`/${templateId}/like/`),
  downloadTemplate: (templateId) =>
    templateClient.post(`/${templateId}/download/`),
  installTemplate: (templateId, installationData) =>
    templateClient.post(`/${templateId}/install/`, installationData),

  // Template reviews
  getTemplateReviews: (templateId, params = {}) =>
    templateClient.get(`/${templateId}/reviews/`, { params }),
  addTemplateReview: (templateId, reviewData) =>
    templateClient.post(`/${templateId}/add-review/`, reviewData),

  // Statistics and recommendations
  getTemplateStats: () => templateClient.get("/stats/"),
  getTemplateRecommendations: () => templateClient.get("/recommendations/"),

  // Admin template management
  createTemplate: (templateData) =>
    templateClient.post("/create/", templateData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateTemplate: (templateId, templateData) =>
    templateClient.put(`/${templateId}/`, templateData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteTemplate: (templateId) => templateClient.delete(`/${templateId}/`),
  publishTemplate: (templateId) =>
    templateClient.post(`/${templateId}/publish/`),
  archiveTemplate: (templateId) =>
    templateClient.post(`/${templateId}/archive/`),

  // Template versions
  getTemplateVersions: (templateId) =>
    templateClient.get(`/${templateId}/versions/`),
  getTemplateVersion: (templateId, versionId) =>
    templateClient.get(`/${templateId}/versions/${versionId}/`),

  // Template collections
  getTemplateCollections: () => templateClient.get("/collections/"),
  getCollection: (collectionId) =>
    templateClient.get(`/collections/${collectionId}/`),
  createTemplateCollection: (collectionData) =>
    templateClient.post("/collections/", collectionData),

  // Template licensing
  getTemplateLicenses: (params = {}) =>
    templateClient.get("/licenses/", { params }),
  purchaseTemplate: (templateId, paymentData) =>
    templateClient.post(`/${templateId}/purchase/`, paymentData),

  // Template usage tracking
  trackTemplateView: (templateId) =>
    templateClient.post(`/${templateId}/track-view/`),
  getTemplateAnalytics: (templateId, params = {}) =>
    templateClient.get(`/${templateId}/analytics/`, { params }),

  // Template media
  uploadTemplateMedia: (templateId, mediaData) =>
    templateClient.post(`/${templateId}/media/`, mediaData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Business category specific templates
  getTemplatesForBusinessCategory: (businessCategorySlug, params = {}) =>
    templateClient.get("/", {
      params: { business_category: businessCategorySlug, ...params },
    }),

  // Template compatibility
  checkTemplateCompatibility: (templateId, websiteConfig) =>
    templateClient.post(`/${templateId}/compatibility-check/`, websiteConfig),

  // Template export/import
  exportTemplate: (templateId, format = "json") =>
    templateClient.get(`/${templateId}/export/`, {
      params: { format },
      responseType: "blob",
    }),
  importTemplate: (templateData) =>
    templateClient.post("/import/", templateData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Bulk operations
  bulkUpdateTemplates: (templateIds, updates) =>
    templateClient.post("/bulk-update/", {
      template_ids: templateIds,
      updates,
    }),
  bulkDeleteTemplates: (templateIds) =>
    templateClient.post("/bulk-delete/", { template_ids: templateIds }),
};

// Export individual functions for tree-shaking
export const {
  getTemplateConfiguration,
  getTemplates,
  getTemplate,
  getTemplateCategories,
  getCategory,
  getTemplatesByCategory,
  createTemplateCategory,
  updateTemplateCategory,
  deleteTemplateCategory,
  searchTemplates,
  getFeaturedTemplates,
  getTrendingTemplates,
  getNewTemplates,
  getPopularTemplates,
  getTemplateTags,
  getPopularTags,
  getFeaturedTags,
  getTag,
  likeTemplate,
  downloadTemplate,
  installTemplate,
  getTemplateReviews,
  addTemplateReview,
  getTemplateStats,
  getTemplateRecommendations,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  publishTemplate,
  archiveTemplate,
  getTemplateVersions,
  getTemplateVersion,
  getTemplateCollections,
  getCollection,
  createTemplateCollection,
  getTemplateLicenses,
  purchaseTemplate,
  trackTemplateView,
  getTemplateAnalytics,
  uploadTemplateMedia,
  getTemplatesForBusinessCategory,
  checkTemplateCompatibility,
  exportTemplate,
  importTemplate,
  bulkUpdateTemplates,
  bulkDeleteTemplates,
} = templateAPI;

export default templateAPI;
