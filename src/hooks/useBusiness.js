// hooks/useBusiness.js
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import {
  fetchUserBusinesses,
  fetchBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  fetchBusinessCategories,
  fetchBusinessWebsites,
  fetchBusinessAnalytics,
  fetchBusinessTeam,
  fetchBusinessSettings,
  updateBusinessSettings,
  uploadBusinessLogo,
  inviteTeamMember,
  setSearchFilters,
  clearSearchFilters,
  clearError,
  clearSuccessFlags,
  clearBusinesses,
  setCurrentBusiness,
  clearCurrentBusiness,
  updateBusinessLocal,
} from "../store/slices/businessSlice";

export const useBusiness = () => {
  const dispatch = useDispatch();

  // Select state from Redux store
  const businessState = useSelector((state) => state.business);

  const {
    businesses,
    businessDetails,
    currentBusiness,
    categories,
    businessWebsites,
    businessAnalytics,
    businessTeams,
    businessSettings,
    loading,
    error,
    success,
    totalCount,
    currentPage,
    hasMore,
    searchTerm,
    selectedCategory,
    sortBy,
    sortOrder,
    logoUploadProgress,
    isUploadingLogo,
  } = businessState;

  // Memoized selectors
  const pagination = useMemo(
    () => ({
      currentPage,
      totalCount,
      hasMore,
      pageSize: 12, // Should match backend pagination
    }),
    [currentPage, totalCount, hasMore]
  );

  const filters = useMemo(
    () => ({
      search: searchTerm,
      category: selectedCategory,
      sortBy,
      sortOrder,
    }),
    [searchTerm, selectedCategory, sortBy, sortOrder]
  );

  // Action creators wrapped with useCallback for optimization
  const fetchBusinesses = useCallback(
    (params = {}, append = false) => {
      const searchParams = {
        page: params.page || 1,
        search: params.search || "",
        category: params.category || "",
        sortBy: params.sortBy || "created_at",
        sortOrder: params.sortOrder || "desc",
        ...params,
      };

      if (!append) {
        dispatch(clearBusinesses());
      }

      return dispatch(fetchUserBusinesses(searchParams));
    },
    [dispatch]
  );

  const fetchCategories = useCallback(() => {
    return dispatch(fetchBusinessCategories());
  }, [dispatch]);

  const createNewBusiness = useCallback(
    async (businessData) => {
      const result = await dispatch(createBusiness(businessData));

      if (createBusiness.fulfilled.match(result)) {
        // Refresh businesses list to show new business
        await dispatch(fetchUserBusinesses({ page: 1 }));
        return result.payload;
      }

      throw new Error(result.payload || "Failed to create business");
    },
    [dispatch]
  );

  const updateExistingBusiness = useCallback(
    async (businessId, data) => {
      const result = await dispatch(updateBusiness({ businessId, data }));

      if (updateBusiness.fulfilled.match(result)) {
        return result.payload;
      }

      throw new Error(result.payload || "Failed to update business");
    },
    [dispatch]
  );

  const removeBusinesss = useCallback(
    async (businessId) => {
      const result = await dispatch(deleteBusiness(businessId));

      if (deleteBusiness.fulfilled.match(result)) {
        return result.payload;
      }

      throw new Error(result.payload || "Failed to delete business");
    },
    [dispatch]
  );

  const getBusinessDetails = useCallback(
    (businessId) => {
      if (!businessDetails[businessId]) {
        dispatch(fetchBusiness(businessId));
      }
      return businessDetails[businessId];
    },
    [dispatch, businessDetails]
  );

  const getBusinessWebsites = useCallback(
    (businessId) => {
      if (!businessWebsites[businessId]) {
        dispatch(fetchBusinessWebsites(businessId));
      }
      return businessWebsites[businessId] || [];
    },
    [dispatch, businessWebsites]
  );

  const getBusinessAnalytics = useCallback(
    (businessId, params = {}) => {
      dispatch(fetchBusinessAnalytics({ businessId, params }));
      return businessAnalytics[businessId];
    },
    [dispatch, businessAnalytics]
  );

  const getBusinessTeam = useCallback(
    (businessId) => {
      if (!businessTeams[businessId]) {
        dispatch(fetchBusinessTeam(businessId));
      }
      return businessTeams[businessId];
    },
    [dispatch, businessTeams]
  );

  const getBusinessSettings = useCallback(
    (businessId) => {
      if (!businessSettings[businessId]) {
        dispatch(fetchBusinessSettings(businessId));
      }
      return businessSettings[businessId];
    },
    [dispatch, businessSettings]
  );

  const updateSettings = useCallback(
    async (businessId, settings) => {
      const result = await dispatch(
        updateBusinessSettings({ businessId, settings })
      );

      if (updateBusinessSettings.fulfilled.match(result)) {
        return result.payload;
      }

      throw new Error(result.payload || "Failed to update settings");
    },
    [dispatch]
  );

  const uploadLogo = useCallback(
    async (businessId, file) => {
      const formData = new FormData();
      formData.append("logo", file);

      const result = await dispatch(
        uploadBusinessLogo({ businessId, formData })
      );

      if (uploadBusinessLogo.fulfilled.match(result)) {
        return result.payload;
      }

      throw new Error(result.payload || "Failed to upload logo");
    },
    [dispatch]
  );

  const inviteTeamMemberToBusiness = useCallback(
    async (businessId, inviteData) => {
      const result = await dispatch(
        inviteTeamMember({ businessId, inviteData })
      );

      if (inviteTeamMember.fulfilled.match(result)) {
        // Refresh team data
        dispatch(fetchBusinessTeam(businessId));
        return result.payload;
      }

      throw new Error(result.payload || "Failed to invite team member");
    },
    [dispatch]
  );

  const updateSearchFilters = useCallback(
    (newFilters) => {
      dispatch(setSearchFilters(newFilters));
    },
    [dispatch]
  );

  const clearSearchAndFilters = useCallback(() => {
    dispatch(clearSearchFilters());
  }, [dispatch]);

  const clearErrorState = useCallback(
    (errorType) => {
      dispatch(clearError(errorType));
    },
    [dispatch]
  );

  const clearSuccessState = useCallback(
    (successType) => {
      dispatch(clearSuccessFlags(successType));
    },
    [dispatch]
  );

  const selectBusiness = useCallback(
    (business) => {
      dispatch(setCurrentBusiness(business));
    },
    [dispatch]
  );

  const deselectBusiness = useCallback(() => {
    dispatch(clearCurrentBusiness());
  }, [dispatch]);

  const updateBusinessLocally = useCallback(
    (businessId, updates) => {
      dispatch(updateBusinessLocal({ businessId, updates }));
    },
    [dispatch]
  );

  // Helper functions
  const getBusinessById = useCallback(
    (businessId) => {
      return (
        businesses.find((b) => b.id === businessId) ||
        businessDetails[businessId]
      );
    },
    [businesses, businessDetails]
  );

  const isBusinessOwner = useCallback((business, userId) => {
    return business?.owner?.id === userId;
  }, []);

  const canEditBusiness = useCallback(
    (business, userId) => {
      if (isBusinessOwner(business, userId)) return true;

      const team = businessTeams[business?.id];
      if (!team) return false;

      const userMember = team.find((member) => member.user?.id === userId);
      return userMember?.role === "admin";
    },
    [businessTeams, isBusinessOwner]
  );

  const getBusinessStats = useCallback(
    (businessId) => {
      const business = getBusinessById(businessId);
      const analytics = businessAnalytics[businessId];

      return {
        websites: business?.websites_count || 0,
        visitors: analytics?.total_visitors || 0,
        revenue: analytics?.revenue_this_month || 0,
        growth: analytics?.growth_percentage || 0,
        rating: business?.average_rating || 0,
        reviews: business?.total_reviews || 0,
      };
    },
    [getBusinessById, businessAnalytics]
  );

  // Return hook interface
  return {
    // State
    businesses,
    businessDetails,
    currentBusiness,
    categories,
    loading,
    error,
    success,
    pagination,
    filters,
    logoUploadProgress,
    isUploadingLogo,

    // Core CRUD operations
    fetchBusinesses,
    fetchCategories,
    createBusiness: createNewBusiness,
    updateBusiness: updateExistingBusiness,
    deleteBusiness: removeBusinesss,

    // Detailed operations
    getBusinessDetails,
    getBusinessWebsites,
    getBusinessAnalytics,
    getBusinessTeam,
    getBusinessSettings,
    updateSettings,
    uploadLogo,
    inviteTeamMember: inviteTeamMemberToBusiness,

    // UI state management
    setSearchFilters: updateSearchFilters,
    clearSearchFilters: clearSearchAndFilters,
    clearError: clearErrorState,
    clearSuccessFlags: clearSuccessState,
    selectBusiness,
    deselectBusiness,
    updateBusinessLocal,

    // Helper functions
    getBusinessById,
    isBusinessOwner,
    canEditBusiness,
    getBusinessStats,
  };
};
