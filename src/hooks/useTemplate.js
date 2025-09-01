// hooks/useTemplate.js
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  fetchTemplateConfiguration,
  fetchTemplates,
  fetchTemplate,
  fetchTemplateCategories,
  fetchTemplatesByCategory,
  fetchTemplateTags,
  fetchPopularTags,
  fetchFeaturedTags,
  searchTemplates,
  fetchPopularTemplates,
  fetchTrendingTemplates,
  fetchFeaturedTemplates,
  fetchNewTemplates,
  likeTemplate,
  downloadTemplate,
  installTemplate,
  fetchTemplateReviews,
  addTemplateReview,
  fetchTemplateStats,
  fetchTemplateRecommendations,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  publishTemplate,
  bulkUpdateTemplates,
  bulkDeleteTemplates,
  createTemplateCategory,
  updateTemplateCategory,
  deleteTemplateCategory,
  setCurrentTemplate,
  setSearchQuery,
  updateFilters,
  clearFilters,
  setSelectedCategory,
  setSelectedBusinessCategory,
  clearError,
  clearAllErrors,
  clearSuccessFlags,
  selectTemplate,
  selectTemplateConfiguration,
  selectTemplates,
  selectCurrentTemplate,
  selectTemplateDetails,
  selectTemplateCategories,
  selectTemplateTags,
  selectPopularTags,
  selectFeaturedTags,
  selectPopularTemplates,
  selectTrendingTemplates,
  selectFeaturedTemplates,
  selectNewTemplates,
  selectSearchResults,
  selectTemplateReviews,
  selectTemplateStats,
  selectTemplateRecommendations,
  selectCurrentFilters,
  selectTemplateLoading,
  selectTemplateError,
  selectTemplateSuccess,
  selectUISettings,
  selectPaginationInfo,
} from "../store/slices/templateSlice";

export const useTemplate = (autoFetchCategories = true) => {
  const dispatch = useDispatch();

  // State selectors
  const templateState = useSelector(selectTemplate);
  const templates = useSelector(selectTemplates);
  const currentTemplate = useSelector(selectCurrentTemplate);
  const configuration = useSelector(selectTemplateConfiguration);
  const categories = useSelector(selectTemplateCategories);
  const tags = useSelector(selectTemplateTags);
  const popularTags = useSelector(selectPopularTags);
  const featuredTags = useSelector(selectFeaturedTags);
  const popularTemplates = useSelector(selectPopularTemplates);
  const trendingTemplates = useSelector(selectTrendingTemplates);
  const featuredTemplates = useSelector(selectFeaturedTemplates);
  const newTemplates = useSelector(selectNewTemplates);
  const searchResults = useSelector(selectSearchResults);
  const templateStats = useSelector(selectTemplateStats);
  const recommendations = useSelector(selectTemplateRecommendations);
  const currentFilters = useSelector(selectCurrentFilters);
  const loading = useSelector(selectTemplateLoading);
  const error = useSelector(selectTemplateError);
  const success = useSelector(selectTemplateSuccess);
  const uiSettings = useSelector(selectUISettings);
  const paginationInfo = useSelector(selectPaginationInfo);

  // Auto-fetch categories on mount
  // Auto-fetch categories and configuration on mount
  useEffect(() => {
    // Auto-fetch configuration if not loaded
    if (configuration.pricing_tiers.length === 0 && !loading.configuration) {
      dispatch(fetchTemplateConfiguration());
    }

    // Auto-fetch categories if enabled
    if (autoFetchCategories && categories.length === 0 && !loading.categories) {
      dispatch(fetchTemplateCategories());
    }
  }, [
    dispatch,
    autoFetchCategories,
    categories.length,
    // loading.categories,
    configuration.pricing_tiers.length,
  ]);

  const getConfiguration = useCallback(async () => {
    const result = await dispatch(fetchTemplateConfiguration());
    return result;
  }, [dispatch]);

  // Template browsing
  const getTemplates = async (params = {}) => {
    const result = await dispatch(fetchTemplates(params));
    return result;
  };

  const getTemplate = async (templateId) => {
    const result = await dispatch(fetchTemplate(templateId));
    return result;
  };

  const getTemplatesByCategory = async (categorySlug, params = {}) => {
    const result = await dispatch(
      fetchTemplatesByCategory({ categorySlug, params })
    );
    return result;
  };

  // Categories and tags
  const getCategories = async () => {
    const result = await dispatch(fetchTemplateCategories());
    return result;
  };

  const getTags = async (params = {}) => {
    const result = await dispatch(fetchTemplateTags(params));
    return result;
  };

  const getPopularTags = async () => {
    const result = await dispatch(fetchPopularTags());
    return result;
  };

  const getFeaturedTags = async () => {
    const result = await dispatch(fetchFeaturedTags());
    return result;
  };

  // Search and filtering
  const searchForTemplates = async (searchData) => {
    const result = await dispatch(searchTemplates(searchData));
    return result;
  };

  // Curated content
  const getFeaturedTemplates = async () => {
    const result = await dispatch(fetchFeaturedTemplates());
    return result;
  };

  const getTrendingTemplates = async () => {
    const result = await dispatch(fetchTrendingTemplates());
    return result;
  };

  const getNewTemplates = async () => {
    const result = await dispatch(fetchNewTemplates());
    return result;
  };

  const getPopularTemplates = async () => {
    const result = await dispatch(fetchPopularTemplates());
    return result;
  };

  // Template actions
  const likeTemplateAction = async (templateId) => {
    const result = await dispatch(likeTemplate(templateId));
    return result;
  };

  const downloadTemplateAction = async (templateId) => {
    const result = await dispatch(downloadTemplate(templateId));
    return result;
  };

  const installTemplateAction = async (templateId, installationData) => {
    const result = await dispatch(
      installTemplate({ templateId, installationData })
    );
    return result;
  };

  // Reviews
  const getTemplateReviews = async (templateId, params = {}) => {
    const result = await dispatch(fetchTemplateReviews({ templateId, params }));
    return result;
  };

  const addReview = async (templateId, reviewData) => {
    const result = await dispatch(
      addTemplateReview({ templateId, reviewData })
    );
    return result;
  };

  // Statistics and recommendations
  const getTemplateStats = async () => {
    const result = await dispatch(fetchTemplateStats());
    return result;
  };

  const getRecommendations = async () => {
    const result = await dispatch(fetchTemplateRecommendations());
    return result;
  };

  // Admin template management
  const createNewTemplate = async (templateData) => {
    const result = await dispatch(createTemplate(templateData));
    return result;
  };

  const updateExistingTemplate = async (templateId, templateData) => {
    const result = await dispatch(updateTemplate({ templateId, templateData }));
    return result;
  };

  const deleteExistingTemplate = async (templateId) => {
    const result = await dispatch(deleteTemplate(templateId));
    return result;
  };

  const publishTemplateAction = async (templateId) => {
    const result = await dispatch(publishTemplate(templateId));
    return result;
  };

  const bulkUpdateTemplatesAction = async (templateIds, updates) => {
    const result = await dispatch(
      bulkUpdateTemplates({ templateIds, updates })
    );
    return result;
  };

  const bulkDeleteTemplatesAction = async (templateIds) => {
    const result = await dispatch(bulkDeleteTemplates(templateIds));
    return result;
  };

  // Category management
  const createNewCategory = async (categoryData) => {
    const result = await dispatch(createTemplateCategory(categoryData));
    return result;
  };

  const updateExistingCategory = async (categoryId, categoryData) => {
    const result = await dispatch(
      updateTemplateCategory({ categoryId, categoryData })
    );
    return result;
  };

  const deleteExistingCategory = async (categoryId) => {
    const result = await dispatch(deleteTemplateCategory(categoryId));
    return result;
  };

  // Template selection and UI
  const setCurrentTemplateData = (template) => {
    dispatch(setCurrentTemplate(template));
  };

  const updateSearchQuery = (query) => {
    dispatch(setSearchQuery(query));
  };

  const updateTemplateFilters = (filters) => {
    dispatch(updateFilters(filters));
  };

  const clearTemplateFilters = () => {
    dispatch(clearFilters());
  };

  const setCategory = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const setBusinessCategory = (businessCategory) => {
    dispatch(setSelectedBusinessCategory(businessCategory));
  };

  // Error and success management
  const clearTemplateError = (errorType) => {
    dispatch(clearError(errorType));
  };

  const clearAllTemplateErrors = () => {
    dispatch(clearAllErrors());
  };

  const clearTemplateSuccessFlags = (successType) => {
    dispatch(clearSuccessFlags(successType));
  };

  // Helper function to get template details by ID
  const getTemplateDetails = (templateId) => {
    return useSelector((state) => selectTemplateDetails(state, templateId));
  };

  // Helper function to get template reviews by ID
  const getTemplateReviewsData = (templateId) => {
    return useSelector((state) => selectTemplateReviews(state, templateId));
  };

  return {
    // State
    templateState,
    templates,
    currentTemplate,
    configuration,
    categories,
    tags,
    popularTags,
    featuredTags,
    popularTemplates,
    trendingTemplates,
    featuredTemplates,
    newTemplates,
    searchResults,
    templateStats,
    recommendations,
    currentFilters,
    loading,
    error,
    success,
    uiSettings,
    paginationInfo,

    // Template browsing actions
    fetchTemplates: getTemplates,
    fetchTemplate: getTemplate,
    fetchTemplatesByCategory: getTemplatesByCategory,

    // Categories and tags actions
    fetchCategories: getCategories,
    fetchConfiguration: getConfiguration,
    fetchTags: getTags,
    fetchPopularTags: getPopularTags,
    fetchFeaturedTags: getFeaturedTags,
    fetchPopularTags: getPopularTags,
    fetchFeaturedTags: getFeaturedTags,

    // Search actions
    searchTemplates: searchForTemplates,

    // Curated content actions
    fetchFeaturedTemplates: getFeaturedTemplates,
    fetchTrendingTemplates: getTrendingTemplates,
    fetchNewTemplates: getNewTemplates,
    fetchPopularTemplates: getPopularTemplates,

    // Template actions
    likeTemplate: likeTemplateAction,
    downloadTemplate: downloadTemplateAction,
    installTemplate: installTemplateAction,

    // Review actions
    fetchTemplateReviews: getTemplateReviews,
    addTemplateReview: addReview,

    // Statistics actions
    fetchTemplateStats: getTemplateStats,
    fetchRecommendations: getRecommendations,

    // Admin actions
    createTemplate: createNewTemplate,
    updateTemplate: updateExistingTemplate,
    deleteTemplate: deleteExistingTemplate,
    publishTemplate: publishTemplateAction,
    bulkUpdateTemplates: bulkUpdateTemplatesAction,
    bulkDeleteTemplates: bulkDeleteTemplatesAction,

    // Category admin actions
    createTemplateCategory: createNewCategory,
    updateTemplateCategory: updateExistingCategory,
    deleteTemplateCategory: deleteExistingCategory,

    // UI actions
    setCurrentTemplate: setCurrentTemplateData,
    setSearchQuery: updateSearchQuery,
    updateFilters: updateTemplateFilters,
    clearFilters: clearTemplateFilters,
    setSelectedCategory: setCategory,
    setSelectedBusinessCategory: setBusinessCategory,

    // Error management actions
    clearError: clearTemplateError,
    clearAllErrors: clearAllTemplateErrors,
    clearSuccessFlags: clearTemplateSuccessFlags,

    // Helper functions
    getTemplateDetails,
    getTemplateReviewsData,
  };
};
