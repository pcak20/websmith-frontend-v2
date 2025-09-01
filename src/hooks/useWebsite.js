// ================================
// hooks/useWebsite.js
// ================================
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWebsites,
  fetchWebsite,
  fetchWebsiteDetails,
  createWebsite,
  updateWebsite,
  deleteWebsite,
  publishWebsite,
  unpublishWebsite,
  fetchWebsitePages,
  createPage,
  updatePage,
  deletePage,
  updatePageContent,
  fetchDesignSettings,
  updateDesignSettings,
  fetchSEOSettings,
  updateSEOSettings,
  connectCustomDomain,
  verifyDomain,
  createWebsiteBackup,
  fetchWebsiteBackups,
  restoreWebsiteBackup,
  setCurrentWebsite,
  setCurrentPage,
  clearError,
  clearSuccessFlags,
  updateWebsiteLocal,
  selectWebsite,
  selectWebsites,
  selectCurrentWebsite,
  selectWebsiteDetails,
  selectWebsitePages,
  selectCurrentPage,
  selectDesignSettings,
  selectSEOSettings,
  selectWebsiteLoading,
  selectWebsiteError,
  selectWebsiteSuccess,
} from "../store/slices/websiteSlice";

export const useWebsite = () => {
  const dispatch = useDispatch();
  const websiteState = useSelector(selectWebsite);
  const websites = useSelector(selectWebsites);
  const currentWebsite = useSelector(selectCurrentWebsite);
  const loading = useSelector(selectWebsiteLoading);
  const error = useSelector(selectWebsiteError);
  const success = useSelector(selectWebsiteSuccess);

  const getWebsites = async (params = {}) => {
    const result = await dispatch(fetchWebsites(params));
    return result;
  };

  const getWebsite = async (websiteId) => {
    const result = await dispatch(fetchWebsite(websiteId));
    return result;
  };

  const getWebsiteDetails = async (websiteId) => {
    const result = await dispatch(fetchWebsiteDetails(websiteId));
    return result;
  };

  const createNewWebsite = async (businessId, websiteData) => {
    const result = await dispatch(createWebsite({ businessId, websiteData }));
    return result;
  };

  const updateWebsiteData = async (websiteId, data) => {
    const result = await dispatch(updateWebsite({ websiteId, data }));
    return result;
  };

  const removeWebsite = async (websiteId) => {
    const result = await dispatch(deleteWebsite(websiteId));
    return result;
  };

  const publishSite = async (websiteId, publishOptions = {}) => {
    const result = await dispatch(
      publishWebsite({ websiteId, publishOptions })
    );
    return result;
  };

  const unpublishSite = async (websiteId) => {
    const result = await dispatch(unpublishWebsite(websiteId));
    return result;
  };

  const getPages = async (websiteId, includeContent = false) => {
    const result = await dispatch(
      fetchWebsitePages({ websiteId, includeContent })
    );
    return result;
  };

  const createNewPage = async (websiteId, pageData) => {
    const result = await dispatch(createPage({ websiteId, pageData }));
    return result;
  };

  const updatePageData = async (websiteId, pageId, pageData) => {
    const result = await dispatch(updatePage({ websiteId, pageId, pageData }));
    return result;
  };

  const removePage = async (websiteId, pageId) => {
    const result = await dispatch(deletePage({ websiteId, pageId }));
    return result;
  };

  const updateContent = async (pageId, contentData) => {
    const result = await dispatch(updatePageContent({ pageId, contentData }));
    return result;
  };

  const getDesignSettings = async (websiteId) => {
    const result = await dispatch(fetchDesignSettings(websiteId));
    return result;
  };

  const updateDesign = async (websiteId, designData) => {
    const result = await dispatch(
      updateDesignSettings({ websiteId, designData })
    );
    return result;
  };

  const getSEOSettings = async (websiteId) => {
    const result = await dispatch(fetchSEOSettings(websiteId));
    return result;
  };

  const updateSEO = async (websiteId, seoData) => {
    const result = await dispatch(updateSEOSettings({ websiteId, seoData }));
    return result;
  };

  const connectDomain = async (websiteId, domainData) => {
    const result = await dispatch(
      connectCustomDomain({ websiteId, domainData })
    );
    return result;
  };

  const verifyCustomDomain = async (websiteId) => {
    const result = await dispatch(verifyDomain(websiteId));
    return result;
  };

  const createBackup = async (websiteId, backupData = {}) => {
    const result = await dispatch(
      createWebsiteBackup({ websiteId, backupData })
    );
    return result;
  };

  const getBackups = async (websiteId, params = {}) => {
    const result = await dispatch(fetchWebsiteBackups({ websiteId, params }));
    return result;
  };

  const restoreBackup = async (websiteId, backupId, restoreOptions = {}) => {
    const result = await dispatch(
      restoreWebsiteBackup({ websiteId, backupId, restoreOptions })
    );
    return result;
  };

  const setCurrentSite = (website) => {
    dispatch(setCurrentWebsite(website));
  };

  const setCurrentPageData = (page) => {
    dispatch(setCurrentPage(page));
  };

  const clearWebsiteError = (errorType) => {
    dispatch(clearError(errorType));
  };

  const clearWebsiteSuccessFlags = (successType) => {
    dispatch(clearSuccessFlags(successType));
  };

  const updateLocalWebsite = (websiteId, updates) => {
    dispatch(updateWebsiteLocal({ websiteId, updates }));
  };

  // Selectors with website ID
  const getWebsiteDetailsById = (websiteId) => {
    return useSelector((state) => selectWebsiteDetails(state, websiteId));
  };

  const getWebsitePagesById = (websiteId) => {
    return useSelector((state) => selectWebsitePages(state, websiteId));
  };

  const getDesignSettingsById = (websiteId) => {
    return useSelector((state) => selectDesignSettings(state, websiteId));
  };

  const getSEOSettingsById = (websiteId) => {
    return useSelector((state) => selectSEOSettings(state, websiteId));
  };

  return {
    // State
    websiteState,
    websites,
    currentWebsite,
    currentPage: useSelector(selectCurrentPage),
    loading,
    error,
    success,

    // Actions
    fetchWebsites: getWebsites,
    fetchWebsite: getWebsite,
    fetchWebsiteDetails: getWebsiteDetails,
    createWebsite: createNewWebsite,
    updateWebsite: updateWebsiteData,
    deleteWebsite: removeWebsite,
    publishWebsite: publishSite,
    unpublishWebsite: unpublishSite,
    fetchPages: getPages,
    createPage: createNewPage,
    updatePage: updatePageData,
    deletePage: removePage,
    updatePageContent: updateContent,
    fetchDesignSettings: getDesignSettings,
    updateDesignSettings: updateDesign,
    fetchSEOSettings: getSEOSettings,
    updateSEOSettings: updateSEO,
    connectCustomDomain: connectDomain,
    verifyDomain: verifyCustomDomain,
    createBackup,
    fetchBackups: getBackups,
    restoreBackup,
    setCurrentWebsite: setCurrentSite,
    setCurrentPage: setCurrentPageData,
    clearError: clearWebsiteError,
    clearSuccessFlags: clearWebsiteSuccessFlags,
    updateWebsiteLocal: updateLocalWebsite,

    // Selector functions
    getWebsiteDetailsById,
    getWebsitePagesById,
    getDesignSettingsById,
    getSEOSettingsById,
  };
};
