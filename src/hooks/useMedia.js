// ================================
// hooks/useMedia.js
// ================================
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMediaFiles,
  fetchMediaFile,
  uploadMediaFile,
  uploadMultipleFiles,
  deleteMediaFile,
  bulkDeleteFiles,
  fetchFolders,
  createFolder,
  deleteFolder,
  resizeImage,
  cropImage,
  optimizeImage,
  searchMediaFiles,
  fetchStorageInfo,
  selectFile,
  deselectFile,
  toggleFileSelection,
  selectAllFiles,
  clearFileSelection,
  setCurrentFolder,
  setSearchQuery,
  updateFilters,
  clearFilters,
  setViewMode,
  selectMedia,
  selectMediaFiles,
  selectSelectedFiles,
  selectFolders,
  selectCurrentFolder,
  selectStorageInfo,
  selectSearchResults,
  selectCurrentFilters,
  selectMediaLoading,
  selectMediaError,
  selectMediaSuccess,
} from "../store/slices/mediaSlice";

export const useMedia = (businessId) => {
  const dispatch = useDispatch();
  const mediaState = useSelector(selectMedia);
  const files = useSelector(selectMediaFiles);
  const selectedFiles = useSelector(selectSelectedFiles);
  const folders = useSelector(selectFolders);
  const currentFolder = useSelector(selectCurrentFolder);
  const storageInfo = useSelector(selectStorageInfo);
  const searchResults = useSelector(selectSearchResults);
  const currentFilters = useSelector(selectCurrentFilters);
  const loading = useSelector(selectMediaLoading);
  const error = useSelector(selectMediaError);
  const success = useSelector(selectMediaSuccess);

  const getMediaFiles = async (params = {}) => {
    if (!businessId) return;
    const result = await dispatch(fetchMediaFiles({ businessId, ...params }));
    return result;
  };

  const getMediaFile = async (fileId) => {
    const result = await dispatch(fetchMediaFile(fileId));
    return result;
  };

  const uploadFile = async (file, metadata = {}, folderId = null) => {
    if (!businessId) return;
    const result = await dispatch(
      uploadMediaFile({ businessId, file, metadata, folderId })
    );
    return result;
  };

  const uploadFiles = async (files, folderId = null) => {
    if (!businessId) return;
    const result = await dispatch(
      uploadMultipleFiles({ businessId, files, folderId })
    );
    return result;
  };

  const deleteFile = async (fileId) => {
    const result = await dispatch(deleteMediaFile(fileId));
    return result;
  };

  const deleteFiles = async (fileIds) => {
    const result = await dispatch(bulkDeleteFiles(fileIds));
    return result;
  };

  const getFolders = async () => {
    if (!businessId) return;
    const result = await dispatch(fetchFolders(businessId));
    return result;
  };

  const createNewFolder = async (name, parentId = null) => {
    if (!businessId) return;
    const result = await dispatch(createFolder({ businessId, name, parentId }));
    return result;
  };

  const removeFolder = async (folderId) => {
    const result = await dispatch(deleteFolder(folderId));
    return result;
  };

  const resizeImageFile = async (
    fileId,
    width,
    height,
    maintainAspectRatio = true
  ) => {
    const result = await dispatch(
      resizeImage({ fileId, width, height, maintainAspectRatio })
    );
    return result;
  };

  const cropImageFile = async (fileId, x, y, width, height) => {
    const result = await dispatch(cropImage({ fileId, x, y, width, height }));
    return result;
  };

  const optimizeImageFile = async (fileId, quality = 80) => {
    const result = await dispatch(optimizeImage({ fileId, quality }));
    return result;
  };

  const searchFiles = async (query, filters = {}) => {
    if (!businessId) return;
    const result = await dispatch(
      searchMediaFiles({ businessId, query, filters })
    );
    return result;
  };

  const getStorageInfo = async () => {
    if (!businessId) return;
    const result = await dispatch(fetchStorageInfo(businessId));
    return result;
  };

  // File selection actions
  const selectFileById = (fileId) => {
    dispatch(selectFile(fileId));
  };

  const deselectFileById = (fileId) => {
    dispatch(deselectFile(fileId));
  };

  const toggleFileSelectionById = (fileId) => {
    dispatch(toggleFileSelection(fileId));
  };

  const selectAllMediaFiles = () => {
    dispatch(selectAllFiles());
  };

  const clearAllFileSelection = () => {
    dispatch(clearFileSelection());
  };

  // Folder navigation
  const setFolder = (folder) => {
    dispatch(setCurrentFolder(folder));
  };

  // Search and filtering
  const setSearchText = (query) => {
    dispatch(setSearchQuery(query));
  };

  const updateMediaFilters = (filters) => {
    dispatch(updateFilters(filters));
  };

  const clearMediaFilters = () => {
    dispatch(clearFilters());
  };

  // View settings
  const setMediaViewMode = (mode) => {
    dispatch(setViewMode(mode));
  };

  return {
    // State
    mediaState,
    files,
    selectedFiles,
    folders,
    currentFolder,
    storageInfo,
    searchResults,
    currentFilters,
    loading,
    error,
    success,
    businessId,

    // Actions
    fetchMediaFiles: getMediaFiles,
    fetchMediaFile: getMediaFile,
    uploadMediaFile: uploadFile,
    uploadMultipleFiles: uploadFiles,
    deleteMediaFile: deleteFile,
    bulkDeleteFiles: deleteFiles,
    fetchFolders: getFolders,
    createFolder: createNewFolder,
    deleteFolder: removeFolder,
    resizeImage: resizeImageFile,
    cropImage: cropImageFile,
    optimizeImage: optimizeImageFile,
    searchMediaFiles: searchFiles,
    fetchStorageInfo: getStorageInfo,

    // Selection actions
    selectFile: selectFileById,
    deselectFile: deselectFileById,
    toggleFileSelection: toggleFileSelectionById,
    selectAllFiles: selectAllMediaFiles,
    clearFileSelection: clearAllFileSelection,

    // Navigation and UI
    setCurrentFolder: setFolder,
    setSearchQuery: setSearchText,
    updateFilters: updateMediaFilters,
    clearFilters: clearMediaFilters,
    setViewMode: setMediaViewMode,
  };
};
