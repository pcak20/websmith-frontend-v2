// store/api/mediaAPI.js
import { createApiClient, API_CONFIG } from "./config";
import { setupInterceptors } from "./interceptors";

const mediaClient = createApiClient(`${API_CONFIG.BASE_URL}/media`);

// Setup all interceptors for authenticated endpoints
setupInterceptors(mediaClient, { includeAuth: true, includeRetry: true });

export const mediaAPI = {
  // File management
  getMediaFiles: (businessId, params = {}) =>
    mediaClient.get("/", { params: { business: businessId, ...params } }),

  getMediaFile: (fileId) => mediaClient.get(`/${fileId}/`),

  uploadFile: (formData, config = {}) =>
    mediaClient.post("/upload/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),

  updateFile: (fileId, data) => mediaClient.put(`/${fileId}/`, data),

  deleteFile: (fileId) => mediaClient.delete(`/${fileId}/`),

  // Multiple file upload
  uploadMultipleFiles: (formData, config = {}) =>
    mediaClient.post("/upload/multiple/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    }),

  // File operations
  copyFile: (fileId, targetFolderId = null) =>
    mediaClient.post(`/${fileId}/copy/`, { folder: targetFolderId }),

  moveFile: (fileId, targetFolderId) =>
    mediaClient.post(`/${fileId}/move/`, { folder: targetFolderId }),

  renameFile: (fileId, newName) =>
    mediaClient.patch(`/${fileId}/`, { name: newName }),

  // Bulk operations
  bulkDelete: (fileIds) =>
    mediaClient.post("/bulk-delete/", { file_ids: fileIds }),

  bulkMove: (fileIds, folderId) =>
    mediaClient.post("/bulk-move/", { file_ids: fileIds, folder_id: folderId }),

  bulkCopy: (fileIds, folderId) =>
    mediaClient.post("/bulk-copy/", { file_ids: fileIds, folder_id: folderId }),

  bulkDownload: (fileIds) =>
    mediaClient.post(
      "/bulk-download/",
      { file_ids: fileIds },
      {
        responseType: "blob",
      }
    ),

  // Folder management
  getFolders: (businessId) =>
    mediaClient.get("/folders/", { params: { business: businessId } }),

  getFolder: (folderId) => mediaClient.get(`/folders/${folderId}/`),

  createFolder: (businessId, name, parentId = null) =>
    mediaClient.post("/folders/", {
      business: businessId,
      name,
      parent: parentId,
    }),

  updateFolder: (folderId, data) =>
    mediaClient.put(`/folders/${folderId}/`, data),

  deleteFolder: (folderId) => mediaClient.delete(`/folders/${folderId}/`),

  getFolderContents: (folderId, params = {}) =>
    mediaClient.get(`/folders/${folderId}/contents/`, { params }),

  // Image processing
  resizeImage: (fileId, width, height, maintainAspectRatio = true) =>
    mediaClient.post(`/${fileId}/resize/`, {
      width,
      height,
      maintain_aspect_ratio: maintainAspectRatio,
    }),

  cropImage: (fileId, x, y, width, height) =>
    mediaClient.post(`/${fileId}/crop/`, { x, y, width, height }),

  rotateImage: (fileId, degrees) =>
    mediaClient.post(`/${fileId}/rotate/`, { degrees }),

  flipImage: (fileId, direction = "horizontal") =>
    mediaClient.post(`/${fileId}/flip/`, { direction }),

  // Image filters and effects
  applyFilter: (fileId, filterType, options = {}) =>
    mediaClient.post(`/${fileId}/filter/`, { type: filterType, options }),

  adjustBrightness: (fileId, level) =>
    mediaClient.post(`/${fileId}/brightness/`, { level }),

  adjustContrast: (fileId, level) =>
    mediaClient.post(`/${fileId}/contrast/`, { level }),

  adjustSaturation: (fileId, level) =>
    mediaClient.post(`/${fileId}/saturation/`, { level }),

  // File optimization
  optimizeImage: (fileId, quality = 80) =>
    mediaClient.post(`/${fileId}/optimize/`, { quality }),

  compressVideo: (fileId, quality = "medium") =>
    mediaClient.post(`/${fileId}/compress/`, { quality }),

  generateThumbnails: (fileId, sizes = ["150x150", "300x300", "600x600"]) =>
    mediaClient.post(`/${fileId}/thumbnails/`, { sizes }),

  // File conversion
  convertImage: (fileId, targetFormat) =>
    mediaClient.post(`/${fileId}/convert/`, { format: targetFormat }),

  convertVideo: (fileId, targetFormat, options = {}) =>
    mediaClient.post(`/${fileId}/convert-video/`, {
      format: targetFormat,
      ...options,
    }),

  // File metadata
  getMetadata: (fileId) => mediaClient.get(`/${fileId}/metadata/`),

  updateMetadata: (fileId, metadata) =>
    mediaClient.patch(`/${fileId}/metadata/`, metadata),

  // File sharing and permissions
  getFilePermissions: (fileId) => mediaClient.get(`/${fileId}/permissions/`),

  updateFilePermissions: (fileId, permissions) =>
    mediaClient.put(`/${fileId}/permissions/`, permissions),

  generateShareLink: (fileId, expiresIn = "7d", password = null) =>
    mediaClient.post(`/${fileId}/share/`, {
      expires_in: expiresIn,
      password,
    }),

  revokeShareLink: (fileId, linkId) =>
    mediaClient.delete(`/${fileId}/share/${linkId}/`),

  // Storage management
  getStorageInfo: (businessId) =>
    mediaClient.get("/storage/", { params: { business: businessId } }),

  getStorageUsage: (businessId, timeframe = "30d") =>
    mediaClient.get("/storage/usage/", {
      params: { business: businessId, timeframe },
    }),

  cleanupStorage: (businessId, options = {}) =>
    mediaClient.post("/storage/cleanup/", {
      business: businessId,
      ...options,
    }),

  // File search and filtering
  searchFiles: (businessId, query, filters = {}) =>
    mediaClient.get("/search/", {
      params: {
        business: businessId,
        q: query,
        ...filters,
      },
    }),

  getRecentFiles: (businessId, limit = 20) =>
    mediaClient.get("/recent/", {
      params: { business: businessId, limit },
    }),

  getFilesByType: (businessId, fileType, params = {}) =>
    mediaClient.get("/by-type/", {
      params: {
        business: businessId,
        type: fileType,
        ...params,
      },
    }),

  // File versioning
  getFileVersions: (fileId) => mediaClient.get(`/${fileId}/versions/`),

  createFileVersion: (fileId, formData) =>
    mediaClient.post(`/${fileId}/versions/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  restoreFileVersion: (fileId, versionId) =>
    mediaClient.post(`/${fileId}/versions/${versionId}/restore/`),

  deleteFileVersion: (fileId, versionId) =>
    mediaClient.delete(`/${fileId}/versions/${versionId}/`),

  // Trash/recycle bin
  getTrashFiles: (businessId) =>
    mediaClient.get("/trash/", { params: { business: businessId } }),

  restoreFromTrash: (fileId) => mediaClient.post(`/${fileId}/restore/`),

  permanentDelete: (fileId) => mediaClient.delete(`/${fileId}/permanent/`),

  emptyTrash: (businessId) =>
    mediaClient.delete("/trash/empty/", {
      data: { business: businessId },
    }),

  // File tags and organization
  getFileTags: (fileId) => mediaClient.get(`/${fileId}/tags/`),

  addFileTag: (fileId, tag) => mediaClient.post(`/${fileId}/tags/`, { tag }),

  removeFileTag: (fileId, tagId) =>
    mediaClient.delete(`/${fileId}/tags/${tagId}/`),

  getAllTags: (businessId) =>
    mediaClient.get("/tags/", { params: { business: businessId } }),

  // CDN and delivery
  getCDNInfo: (fileId) => mediaClient.get(`/${fileId}/cdn/`),

  purgeFromCDN: (fileId) => mediaClient.post(`/${fileId}/cdn/purge/`),

  getDeliveryStats: (fileId, timeframe = "30d") =>
    mediaClient.get(`/${fileId}/delivery-stats/`, {
      params: { timeframe },
    }),

  // File analytics
  getFileAnalytics: (fileId, timeframe = "30d") =>
    mediaClient.get(`/${fileId}/analytics/`, {
      params: { timeframe },
    }),

  getDownloadStats: (businessId, timeframe = "30d") =>
    mediaClient.get("/download-stats/", {
      params: { business: businessId, timeframe },
    }),

  // Import/Export
  importFromURL: (businessId, url, folderId = null) =>
    mediaClient.post("/import/url/", {
      business: businessId,
      url,
      folder: folderId,
    }),

  exportToCloud: (fileIds, cloudProvider, config = {}) =>
    mediaClient.post("/export/cloud/", {
      file_ids: fileIds,
      provider: cloudProvider,
      config,
    }),
};

// Export individual functions for tree-shaking
export const {
  getMediaFiles,
  getMediaFile,
  uploadFile,
  updateFile,
  deleteFile,
  uploadMultipleFiles,
  copyFile,
  moveFile,
  renameFile,
  bulkDelete,
  bulkMove,
  bulkCopy,
  bulkDownload,
  getFolders,
  getFolder,
  createFolder,
  updateFolder,
  deleteFolder,
  getFolderContents,
  resizeImage,
  cropImage,
  rotateImage,
  flipImage,
  applyFilter,
  adjustBrightness,
  adjustContrast,
  adjustSaturation,
  optimizeImage,
  compressVideo,
  generateThumbnails,
  convertImage,
  convertVideo,
  getMetadata,
  updateMetadata,
  getFilePermissions,
  updateFilePermissions,
  generateShareLink,
  revokeShareLink,
  getStorageInfo,
  getStorageUsage,
  cleanupStorage,
  searchFiles,
  getRecentFiles,
  getFilesByType,
  getFileVersions,
  createFileVersion,
  restoreFileVersion,
  deleteFileVersion,
  getTrashFiles,
  restoreFromTrash,
  permanentDelete,
  emptyTrash,
  getFileTags,
  addFileTag,
  removeFileTag,
  getAllTags,
  getCDNInfo,
  purgeFromCDN,
  getDeliveryStats,
  getFileAnalytics,
  getDownloadStats,
  importFromURL,
  exportToCloud,
} = mediaAPI;

export default mediaAPI;
