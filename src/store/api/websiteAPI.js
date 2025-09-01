// store/api/websiteAPI.js
import { createApiClient, API_CONFIG } from "./config";
import { setupInterceptors } from "./interceptors";

const websiteClient = createApiClient(`${API_CONFIG.BASE_URL}/websites`);

// Setup all interceptors for authenticated endpoints
setupInterceptors(websiteClient, { includeAuth: true, includeRetry: true });

export const websiteAPI = {
  // Website CRUD operations
  getWebsites: (params = {}) => websiteClient.get("/", { params }),
  getWebsite: (websiteId) => websiteClient.get(`/${websiteId}/`),
  getWebsiteDetails: (websiteId) => websiteClient.get(`/${websiteId}/details/`),
  createWebsite: (businessId, data) =>
    websiteClient.post("/", { business: businessId, ...data }),
  updateWebsite: (websiteId, data) => websiteClient.put(`/${websiteId}/`, data),
  deleteWebsite: (websiteId) => websiteClient.delete(`/${websiteId}/`),
  duplicateWebsite: (websiteId, duplicateData = {}) =>
    websiteClient.post(`/${websiteId}/duplicate/`, duplicateData),

  getWebsitesByBusiness: (businessId) =>
    websiteClient.get("/", {
      params: { business: businessId },
    }),

  // Website status and lifecycle
  publishWebsite: (websiteId, publishOptions = {}) =>
    websiteClient.post(`/${websiteId}/publish/`, publishOptions),
  unpublishWebsite: (websiteId) =>
    websiteClient.post(`/${websiteId}/unpublish/`),
  getWebsiteStatus: (websiteId) => websiteClient.get(`/${websiteId}/status/`),
  schedulePublication: (websiteId, scheduleData) =>
    websiteClient.post(`/${websiteId}/schedule/`, scheduleData),

  // Website preview and testing
  getPreviewUrl: (websiteId, previewType = "draft") =>
    websiteClient.get(`/${websiteId}/preview-url/`, {
      params: { type: previewType },
    }),
  generatePreview: (websiteId, deviceType = "desktop") =>
    websiteClient.post(`/${websiteId}/generate-preview/`, {
      device: deviceType,
    }),
  getPreviewScreenshot: (websiteId, deviceType = "desktop") =>
    websiteClient.get(`/${websiteId}/screenshot/`, {
      params: { device: deviceType },
      responseType: "blob",
    }),

  // Pages management
  getWebsitePages: (websiteId, includeContent = false) =>
    websiteClient.get(`/${websiteId}/pages/`, {
      params: { include_content: includeContent },
    }),
  getPage: (websiteId, pageId) =>
    websiteClient.get(`/${websiteId}/pages/${pageId}/`),
  createPage: (websiteId, pageData) =>
    websiteClient.post(`/${websiteId}/pages/`, pageData),
  updatePage: (websiteId, pageId, pageData) =>
    websiteClient.put(`/${websiteId}/pages/${pageId}/`, pageData),
  deletePage: (websiteId, pageId) =>
    websiteClient.delete(`/${websiteId}/pages/${pageId}/`),
  reorderPages: (websiteId, pageOrder) =>
    websiteClient.post(`/${websiteId}/pages/reorder/`, {
      page_order: pageOrder,
    }),
  duplicatePage: (websiteId, pageId, duplicateData = {}) =>
    websiteClient.post(
      `/${websiteId}/pages/${pageId}/duplicate/`,
      duplicateData
    ),

  // Page content management
  updatePageContent: (pageId, contentData) =>
    websiteClient.put(`/pages/${pageId}/content/`, contentData),
  getPageContent: (pageId, version = "current") =>
    websiteClient.get(`/pages/${pageId}/content/`, { params: { version } }),
  savePageDraft: (pageId, draftData) =>
    websiteClient.post(`/pages/${pageId}/draft/`, draftData),
  publishPageChanges: (pageId) =>
    websiteClient.post(`/pages/${pageId}/publish/`),
  discardPageDraft: (pageId) => websiteClient.delete(`/pages/${pageId}/draft/`),

  // Page versions and history
  getPageVersions: (pageId) => websiteClient.get(`/pages/${pageId}/versions/`),
  getPageVersion: (pageId, versionId) =>
    websiteClient.get(`/pages/${pageId}/versions/${versionId}/`),
  revertToPageVersion: (pageId, versionId) =>
    websiteClient.post(`/pages/${pageId}/versions/${versionId}/restore/`),
  comparePageVersions: (pageId, versionA, versionB) =>
    websiteClient.get(`/pages/${pageId}/compare/`, {
      params: { version_a: versionA, version_b: versionB },
    }),

  // Design and styling
  getDesignSettings: (websiteId) => websiteClient.get(`/${websiteId}/design/`),
  updateDesignSettings: (websiteId, designData) =>
    websiteClient.put(`/${websiteId}/design/`, designData),
  getThemes: (websiteId) => websiteClient.get(`/${websiteId}/themes/`),
  applyTheme: (websiteId, themeId, themeOptions = {}) =>
    websiteClient.post(`/${websiteId}/themes/${themeId}/apply/`, themeOptions),
  createCustomTheme: (websiteId, themeData) =>
    websiteClient.post(`/${websiteId}/themes/custom/`, themeData),
  updateCustomCSS: (websiteId, cssData) =>
    websiteClient.put(`/${websiteId}/custom-css/`, cssData),
  getCustomCSS: (websiteId) => websiteClient.get(`/${websiteId}/custom-css/`),

  // SEO and meta settings
  getSEOSettings: (websiteId) => websiteClient.get(`/${websiteId}/seo/`),
  updateSEOSettings: (websiteId, seoData) =>
    websiteClient.put(`/${websiteId}/seo/`, seoData),
  generateSitemap: (websiteId) =>
    websiteClient.post(`/${websiteId}/sitemap/generate/`),
  getSitemap: (websiteId) => websiteClient.get(`/${websiteId}/sitemap/`),
  updateRobotsTxt: (websiteId, robotsData) =>
    websiteClient.put(`/${websiteId}/robots/`, robotsData),
  getRobotsTxt: (websiteId) => websiteClient.get(`/${websiteId}/robots/`),
  validateSEO: (websiteId) => websiteClient.post(`/${websiteId}/seo/validate/`),

  // Domain and SSL management
  getDomainSettings: (websiteId) => websiteClient.get(`/${websiteId}/domain/`),
  connectCustomDomain: (websiteId, domainData) =>
    websiteClient.post(`/${websiteId}/domain/`, domainData),
  verifyDomain: (websiteId) =>
    websiteClient.post(`/${websiteId}/domain/verify/`),
  disconnectDomain: (websiteId) =>
    websiteClient.delete(`/${websiteId}/domain/`),
  enableSSL: (websiteId) => websiteClient.post(`/${websiteId}/ssl/enable/`),
  getSSLStatus: (websiteId) => websiteClient.get(`/${websiteId}/ssl/status/`),
  renewSSL: (websiteId) => websiteClient.post(`/${websiteId}/ssl/renew/`),

  // Website performance and optimization
  getPerformanceReport: (websiteId) =>
    websiteClient.get(`/${websiteId}/performance/`),
  optimizeWebsite: (websiteId, optimizationOptions = {}) =>
    websiteClient.post(`/${websiteId}/optimize/`, optimizationOptions),
  compressImages: (websiteId) =>
    websiteClient.post(`/${websiteId}/compress-images/`),
  minifyAssets: (websiteId) => websiteClient.post(`/${websiteId}/minify/`),
  enableCDN: (websiteId, cdnOptions = {}) =>
    websiteClient.post(`/${websiteId}/cdn/enable/`, cdnOptions),
  purgeCDNCache: (websiteId) => websiteClient.post(`/${websiteId}/cdn/purge/`),

  // Website backup and restore
  createBackup: (websiteId, backupData = {}) =>
    websiteClient.post(`/${websiteId}/backup/`, backupData),
  getBackups: (websiteId, params = {}) =>
    websiteClient.get(`/${websiteId}/backups/`, { params }),
  getBackup: (websiteId, backupId) =>
    websiteClient.get(`/${websiteId}/backups/${backupId}/`),
  restoreBackup: (websiteId, backupId, restoreOptions = {}) =>
    websiteClient.post(
      `/${websiteId}/backups/${backupId}/restore/`,
      restoreOptions
    ),
  deleteBackup: (websiteId, backupId) =>
    websiteClient.delete(`/${websiteId}/backups/${backupId}/`),
  scheduleBackup: (websiteId, scheduleData) =>
    websiteClient.post(`/${websiteId}/backups/schedule/`, scheduleData),

  // Website export and import
  exportWebsite: (websiteId, exportOptions = {}) => {
    const { format = "zip", ...options } = exportOptions;
    return websiteClient.get(`/${websiteId}/export/`, {
      params: { format, ...options },
      responseType: "blob",
    });
  },
  importWebsite: (businessId, importData) =>
    websiteClient.post(
      "/import/",
      { business: businessId, ...importData },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),
  getExportHistory: (websiteId) => websiteClient.get(`/${websiteId}/exports/`),

  // Website analytics integration
  connectAnalytics: (websiteId, analyticsData) =>
    websiteClient.post(`/${websiteId}/analytics/connect/`, analyticsData),
  disconnectAnalytics: (websiteId, provider) =>
    websiteClient.delete(`/${websiteId}/analytics/${provider}/`),
  getAnalyticsSettings: (websiteId) =>
    websiteClient.get(`/${websiteId}/analytics/`),

  // Website forms and interactions
  getForms: (websiteId) => websiteClient.get(`/${websiteId}/forms/`),
  createForm: (websiteId, formData) =>
    websiteClient.post(`/${websiteId}/forms/`, formData),
  updateForm: (websiteId, formId, formData) =>
    websiteClient.put(`/${websiteId}/forms/${formId}/`, formData),
  deleteForm: (websiteId, formId) =>
    websiteClient.delete(`/${websiteId}/forms/${formId}/`),
  getFormSubmissions: (websiteId, formId, params = {}) =>
    websiteClient.get(`/${websiteId}/forms/${formId}/submissions/`, { params }),
  exportFormSubmissions: (websiteId, formId, format = "csv") =>
    websiteClient.get(`/${websiteId}/forms/${formId}/export/`, {
      params: { format },
      responseType: "blob",
    }),

  // Website integrations
  getIntegrations: (websiteId) =>
    websiteClient.get(`/${websiteId}/integrations/`),
  enableIntegration: (websiteId, integrationData) =>
    websiteClient.post(`/${websiteId}/integrations/`, integrationData),
  updateIntegration: (websiteId, integrationId, integrationData) =>
    websiteClient.put(
      `/${websiteId}/integrations/${integrationId}/`,
      integrationData
    ),
  disableIntegration: (websiteId, integrationId) =>
    websiteClient.delete(`/${websiteId}/integrations/${integrationId}/`),
  testIntegration: (websiteId, integrationId) =>
    websiteClient.post(`/${websiteId}/integrations/${integrationId}/test/`),

  // Website security
  getSecuritySettings: (websiteId) =>
    websiteClient.get(`/${websiteId}/security/`),
  updateSecuritySettings: (websiteId, securityData) =>
    websiteClient.put(`/${websiteId}/security/`, securityData),
  enableFirewall: (websiteId, firewallRules = {}) =>
    websiteClient.post(`/${websiteId}/firewall/enable/`, firewallRules),
  disableFirewall: (websiteId) =>
    websiteClient.post(`/${websiteId}/firewall/disable/`),
  scanForVulnerabilities: (websiteId) =>
    websiteClient.post(`/${websiteId}/security/scan/`),

  // Website monitoring and uptime
  getUptimeStatus: (websiteId) => websiteClient.get(`/${websiteId}/uptime/`),
  enableMonitoring: (websiteId, monitoringConfig = {}) =>
    websiteClient.post(`/${websiteId}/monitoring/enable/`, monitoringConfig),
  disableMonitoring: (websiteId) =>
    websiteClient.post(`/${websiteId}/monitoring/disable/`),
  getMonitoringAlerts: (websiteId, params = {}) =>
    websiteClient.get(`/${websiteId}/monitoring/alerts/`, { params }),

  // Website collaboration
  getCollaborators: (websiteId) =>
    websiteClient.get(`/${websiteId}/collaborators/`),
  inviteCollaborator: (websiteId, inviteData) =>
    websiteClient.post(`/${websiteId}/collaborators/invite/`, inviteData),
  updateCollaboratorPermissions: (websiteId, collaboratorId, permissions) =>
    websiteClient.put(
      `/${websiteId}/collaborators/${collaboratorId}/`,
      permissions
    ),
  removeCollaborator: (websiteId, collaboratorId) =>
    websiteClient.delete(`/${websiteId}/collaborators/${collaboratorId}/`),

  // Website activity and logs
  getActivityLog: (websiteId, params = {}) =>
    websiteClient.get(`/${websiteId}/activity/`, { params }),
  getChangeHistory: (websiteId, params = {}) =>
    websiteClient.get(`/${websiteId}/changes/`, { params }),

  // Website templates and themes
  getInstalledTemplates: (websiteId) =>
    websiteClient.get(`/${websiteId}/templates/`),
  installTemplate: (websiteId, templateId, installOptions = {}) =>
    websiteClient.post(`/${websiteId}/templates/install/`, {
      template: templateId,
      ...installOptions,
    }),
  uninstallTemplate: (websiteId, templateId) =>
    websiteClient.delete(`/${websiteId}/templates/${templateId}/`),

  // Website settings and configuration
  getWebsiteSettings: (websiteId) =>
    websiteClient.get(`/${websiteId}/settings/`),
  updateWebsiteSettings: (websiteId, settings) =>
    websiteClient.put(`/${websiteId}/settings/`, settings),
  resetWebsiteSettings: (websiteId) =>
    websiteClient.post(`/${websiteId}/settings/reset/`),

  // Website validation and testing
  validateWebsite: (websiteId, validationType = "full") =>
    websiteClient.post(`/${websiteId}/validate/`, { type: validationType }),
  testResponsiveness: (websiteId) =>
    websiteClient.post(`/${websiteId}/test/responsive/`),
  testAccessibility: (websiteId) =>
    websiteClient.post(`/${websiteId}/test/accessibility/`),
  testPerformance: (websiteId) =>
    websiteClient.post(`/${websiteId}/test/performance/`),
};

// Export individual functions for tree-shaking
export const {
  getWebsites,
  getWebsite,
  getWebsiteDetails,
  createWebsite,
  updateWebsite,
  deleteWebsite,
  duplicateWebsite,
  publishWebsite,
  unpublishWebsite,
  getWebsiteStatus,
  schedulePublication,
  getPreviewUrl,
  generatePreview,
  getPreviewScreenshot,
  getWebsitePages,
  getPage,
  createPage,
  updatePage,
  deletePage,
  reorderPages,
  duplicatePage,
  updatePageContent,
  getPageContent,
  savePageDraft,
  publishPageChanges,
  discardPageDraft,
  getPageVersions,
  getPageVersion,
  revertToPageVersion,
  comparePageVersions,
  getDesignSettings,
  updateDesignSettings,
  getThemes,
  applyTheme,
  createCustomTheme,
  updateCustomCSS,
  getCustomCSS,
  getSEOSettings,
  updateSEOSettings,
  generateSitemap,
  getSitemap,
  updateRobotsTxt,
  getRobotsTxt,
  validateSEO,
  getDomainSettings,
  connectCustomDomain,
  verifyDomain,
  disconnectDomain,
  enableSSL,
  getSSLStatus,
  renewSSL,
  getPerformanceReport,
  optimizeWebsite,
  compressImages,
  minifyAssets,
  enableCDN,
  purgeCDNCache,
  createBackup,
  getBackups,
  getBackup,
  restoreBackup,
  deleteBackup,
  scheduleBackup,
  exportWebsite,
  importWebsite,
  getExportHistory,
  connectAnalytics,
  disconnectAnalytics,
  getAnalyticsSettings,
  getForms,
  createForm,
  updateForm,
  deleteForm,
  getFormSubmissions,
  exportFormSubmissions,
  getIntegrations,
  enableIntegration,
  updateIntegration,
  disableIntegration,
  testIntegration,
  getSecuritySettings,
  updateSecuritySettings,
  enableFirewall,
  disableFirewall,
  scanForVulnerabilities,
  getUptimeStatus,
  enableMonitoring,
  disableMonitoring,
  getMonitoringAlerts,
  getCollaborators,
  inviteCollaborator,
  updateCollaboratorPermissions,
  removeCollaborator,
  getActivityLog,
  getChangeHistory,
  getInstalledTemplates,
  installTemplate,
  uninstallTemplate,
  getWebsiteSettings,
  updateWebsiteSettings,
  resetWebsiteSettings,
  validateWebsite,
  testResponsiveness,
  testAccessibility,
  testPerformance,
} = websiteAPI;

export default websiteAPI;
