// store/slices/businessSlice.js - Updated for Django Backend
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  businessAPI,
  transformBusinessData,
  handleBusinessAPIError,
} from "../api/businessAPI";

// Async thunks for Django API integration
export const fetchUserBusinesses = createAsyncThunk(
  "business/fetchUserBusinesses",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await businessAPI.getBusinesses(params);

      // Transform Django pagination response to match frontend expectations
      return {
        results: response.data.results.map(transformBusinessData.fromDjango),
        count: response.data.count,
        has_more: response.data.has_more,
        page: params.page || 1,
        total_pages: response.data.total_pages,
        page_size: response.data.page_size,
      };
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const fetchBusiness = createAsyncThunk(
  "business/fetchBusiness",
  async (businessId, { rejectWithValue }) => {
    try {
      const response = await businessAPI.getBusiness(businessId);
      return transformBusinessData.fromDjango(response.data);
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const createBusiness = createAsyncThunk(
  "business/createBusiness",
  async (businessData, { rejectWithValue }) => {
    try {
      const response = await businessAPI.createBusiness(businessData);
      return transformBusinessData.fromDjango(response.data);
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const updateBusiness = createAsyncThunk(
  "business/updateBusiness",
  async ({ businessId, data }, { rejectWithValue }) => {
    try {
      // Transform frontend data to Django format
      const djangoData = transformBusinessData.toDjango(data);
      const response = await businessAPI.updateBusiness(businessId, djangoData);
      return transformBusinessData.fromDjango(response.data);
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const deleteBusiness = createAsyncThunk(
  "business/deleteBusiness",
  async (businessId, { rejectWithValue }) => {
    try {
      await businessAPI.deleteBusiness(businessId);
      return businessId;
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const fetchBusinessCategories = createAsyncThunk(
  "business/fetchBusinessCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await businessAPI.getCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const fetchBusinessWebsites = createAsyncThunk(
  "business/fetchBusinessWebsites",
  async (businessId, { rejectWithValue }) => {
    try {
      // Import websiteAPI instead of using businessAPI
      const { websiteAPI } = await import("../api/websiteAPI");
      const response = await websiteAPI.getWebsitesByBusiness(businessId);
      return { businessId, websites: response.data.results || response.data };
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const createBusinessWebsite = createAsyncThunk(
  "business/createBusinessWebsite",
  async ({ businessId, websiteData }, { rejectWithValue }) => {
    try {
      const response = await businessAPI.createBusinessWebsite(
        businessId,
        websiteData
      );
      return { businessId, website: response.data };
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const fetchBusinessAnalytics = createAsyncThunk(
  "business/fetchBusinessAnalytics",
  async ({ businessId, params = {} }, { rejectWithValue }) => {
    try {
      const response = await businessAPI.getBusinessAnalytics(
        businessId,
        params
      );
      return { businessId, analytics: response.data };
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const uploadBusinessLogo = createAsyncThunk(
  "business/uploadBusinessLogo",
  async ({ businessId, formData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await businessAPI.uploadBusinessLogo(
        businessId,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            dispatch(setLogoUploadProgress(progress));
          },
        }
      );

      dispatch(resetLogoUploadProgress());
      const updatedBusiness = transformBusinessData.fromDjango(response.data);
      return { businessId, business: updatedBusiness };
    } catch (error) {
      dispatch(resetLogoUploadProgress());
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const fetchBusinessTeam = createAsyncThunk(
  "business/fetchBusinessTeam",
  async (businessId, { rejectWithValue }) => {
    try {
      const response = await businessAPI.getBusinessTeam(businessId);
      return { businessId, team: response.data };
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const inviteTeamMember = createAsyncThunk(
  "business/inviteTeamMember",
  async ({ businessId, inviteData }, { rejectWithValue }) => {
    try {
      const response = await businessAPI.inviteTeamMember(
        businessId,
        inviteData
      );
      return { businessId, invitation: response.data };
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const fetchBusinessSettings = createAsyncThunk(
  "business/fetchBusinessSettings",
  async (businessId, { rejectWithValue }) => {
    try {
      const response = await businessAPI.getBusinessSettings(businessId);
      return { businessId, settings: response.data };
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

export const updateBusinessSettings = createAsyncThunk(
  "business/updateBusinessSettings",
  async ({ businessId, settings }, { rejectWithValue }) => {
    try {
      const response = await businessAPI.updateBusinessSettings(
        businessId,
        settings
      );
      return { businessId, settings: response.data };
    } catch (error) {
      return rejectWithValue(handleBusinessAPIError(error));
    }
  }
);

// Enhanced initial state matching Django models
const initialState = {
  // Business data
  businesses: [],
  businessDetails: {}, // businessId -> detailed business data
  currentBusiness: null,

  // Categories from Django
  categories: [],

  // Pagination matching Django pagination response
  totalCount: 0,
  currentPage: 1,
  hasMore: false,
  totalPages: 0,
  pageSize: 12,

  // Search and filtering
  searchTerm: "",
  selectedCategory: "all",
  sortBy: "created_at",
  sortOrder: "desc",

  // Related data (normalized by businessId)
  businessWebsites: {}, // businessId -> websites array
  businessAnalytics: {}, // businessId -> analytics data
  businessTeams: {}, // businessId -> team members
  businessSettings: {}, // businessId -> settings

  // Upload states
  logoUploadProgress: 0,
  isUploadingLogo: false,

  // Loading states (granular for better UX)
  loading: {
    businesses: false,
    businessDetails: false,
    create: false,
    update: false,
    delete: false,
    categories: false,
    websites: false,
    analytics: false,
    team: false,
    settings: false,
    logoUpload: false,
    invite: false,
  },

  // Error states (granular for better error handling)
  error: {
    businesses: null,
    businessDetails: null,
    create: null,
    update: null,
    delete: null,
    categories: null,
    websites: null,
    analytics: null,
    team: null,
    settings: null,
    logoUpload: null,
    invite: null,
  },

  // Success states (for UI feedback)
  success: {
    create: false,
    update: false,
    delete: false,
    logoUpload: false,
    teamInvite: false,
    settingsUpdate: false,
  },

  // UI states
  selectedBusinesses: [], // For bulk operations
  viewMode: "grid", // 'grid' or 'list'

  // Cache control
  lastFetched: null,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    // Error management
    clearError: (state, action) => {
      const errorType = action.payload;
      if (errorType && state.error[errorType] !== undefined) {
        state.error[errorType] = null;
      } else {
        Object.keys(state.error).forEach((key) => {
          state.error[key] = null;
        });
      }
    },

    clearAllErrors: (state) => {
      Object.keys(state.error).forEach((key) => {
        state.error[key] = null;
      });
    },

    // Success flags management
    clearSuccessFlags: (state, action) => {
      const successType = action.payload;
      if (successType && state.success[successType] !== undefined) {
        state.success[successType] = false;
      } else {
        Object.keys(state.success).forEach((key) => {
          state.success[key] = false;
        });
      }
    },

    // Business selection
    setCurrentBusiness: (state, action) => {
      state.currentBusiness = action.payload;
    },

    clearCurrentBusiness: (state) => {
      state.currentBusiness = null;
    },

    // Search and filtering (optimized for Django backend)
    setSearchFilters: (state, action) => {
      const { search, category, sortBy, sortOrder, page } = action.payload;

      if (search !== undefined) state.searchTerm = search;
      if (category !== undefined) state.selectedCategory = category;
      if (sortBy !== undefined) state.sortBy = sortBy;
      if (sortOrder !== undefined) state.sortOrder = sortOrder;

      // Reset pagination when filters change (except page)
      if (
        search !== undefined ||
        category !== undefined ||
        sortBy !== undefined ||
        sortOrder !== undefined
      ) {
        if (page === undefined) {
          state.currentPage = 1;
          state.hasMore = false;
        }
      }
    },

    clearSearchFilters: (state) => {
      state.searchTerm = "";
      state.selectedCategory = "all";
      state.sortBy = "created_at";
      state.sortOrder = "desc";
      state.currentPage = 1;
      state.hasMore = false;
    },

    // Data management
    clearBusinesses: (state) => {
      state.businesses = [];
      state.currentPage = 1;
      state.hasMore = false;
      state.totalCount = 0;
      state.totalPages = 0;
    },

    clearBusinessDetails: (state, action) => {
      const businessId = action.payload;
      if (businessId) {
        delete state.businessDetails[businessId];
        delete state.businessWebsites[businessId];
        delete state.businessAnalytics[businessId];
        delete state.businessTeams[businessId];
        delete state.businessSettings[businessId];
      } else {
        state.businessDetails = {};
        state.businessWebsites = {};
        state.businessAnalytics = {};
        state.businessTeams = {};
        state.businessSettings = {};
      }
    },

    // UI preferences
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },

    // Business selection (for bulk operations)
    toggleBusinessSelection: (state, action) => {
      const businessId = action.payload;
      const index = state.selectedBusinesses.indexOf(businessId);
      if (index > -1) {
        state.selectedBusinesses.splice(index, 1);
      } else {
        state.selectedBusinesses.push(businessId);
      }
    },

    selectAllBusinesses: (state) => {
      state.selectedBusinesses = state.businesses.map((b) => b.id);
    },

    clearBusinessSelection: (state) => {
      state.selectedBusinesses = [];
    },

    // Logo upload progress
    setLogoUploadProgress: (state, action) => {
      state.logoUploadProgress = action.payload;
      state.isUploadingLogo = action.payload > 0 && action.payload < 100;
    },

    resetLogoUploadProgress: (state) => {
      state.logoUploadProgress = 0;
      state.isUploadingLogo = false;
    },

    // Local updates for optimistic UI
    updateBusinessLocal: (state, action) => {
      const { businessId, updates } = action.payload;

      // Update in businesses list
      const index = state.businesses.findIndex((b) => b.id === businessId);
      if (index !== -1) {
        state.businesses[index] = { ...state.businesses[index], ...updates };
      }

      // Update in business details
      if (state.businessDetails[businessId]) {
        state.businessDetails[businessId] = {
          ...state.businessDetails[businessId],
          ...updates,
        };
      }

      // Update current business
      if (state.currentBusiness?.id === businessId) {
        state.currentBusiness = { ...state.currentBusiness, ...updates };
      }
    },

    // Cache management
    setCacheTimestamp: (state) => {
      state.lastFetched = Date.now();
    },

    checkCacheExpiry: (state) => {
      if (
        state.lastFetched &&
        Date.now() - state.lastFetched > state.cacheTimeout
      ) {
        // Cache expired, clear data
        state.businesses = [];
        state.lastFetched = null;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch businesses
      .addCase(fetchUserBusinesses.pending, (state, action) => {
        state.loading.businesses = true;
        state.error.businesses = null;

        // Clear businesses if it's a new search/filter (page 1)
        const isNewSearch = action.meta.arg?.page === 1;
        if (isNewSearch) {
          state.businesses = [];
        }
      })
      .addCase(fetchUserBusinesses.fulfilled, (state, action) => {
        state.loading.businesses = false;
        const { results, count, has_more, page, total_pages, page_size } =
          action.payload;

        // Handle pagination properly
        if (page === 1) {
          state.businesses = results;
        } else {
          // Append for infinite scroll
          state.businesses = [...state.businesses, ...results];
        }

        state.totalCount = count;
        state.currentPage = page;
        state.hasMore = has_more;
        state.totalPages = total_pages;
        state.pageSize = page_size;
        state.error.businesses = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchUserBusinesses.rejected, (state, action) => {
        state.loading.businesses = false;
        state.error.businesses = action.payload;
      })

      // Fetch business details
      .addCase(fetchBusiness.pending, (state, action) => {
        state.loading.businessDetails = true;
        state.error.businessDetails = null;
      })
      .addCase(fetchBusiness.fulfilled, (state, action) => {
        state.loading.businessDetails = false;
        const business = action.payload;
        state.businessDetails[business.id] = business;
        state.error.businessDetails = null;
      })
      .addCase(fetchBusiness.rejected, (state, action) => {
        state.loading.businessDetails = false;
        state.error.businessDetails = action.payload;
      })

      // Create business
      .addCase(createBusiness.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
        state.success.create = false;
      })
      .addCase(createBusiness.fulfilled, (state, action) => {
        state.loading.create = false;
        const newBusiness = action.payload;

        // Add to beginning of list
        state.businesses.unshift(newBusiness);
        state.totalCount += 1;
        state.success.create = true;
        state.error.create = null;

        // Cache the detailed data
        state.businessDetails[newBusiness.id] = newBusiness;
      })
      .addCase(createBusiness.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload;
        state.success.create = false;
      })

      // Update business
      .addCase(updateBusiness.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
        state.success.update = false;
      })
      .addCase(updateBusiness.fulfilled, (state, action) => {
        state.loading.update = false;
        const updatedBusiness = action.payload;

        // Update in all relevant places
        const updateBusinessInState = (business) => {
          if (business && business.id === updatedBusiness.id) {
            return updatedBusiness;
          }
          return business;
        };

        // Update in businesses list
        const index = state.businesses.findIndex(
          (b) => b.id === updatedBusiness.id
        );
        if (index !== -1) {
          state.businesses[index] = updatedBusiness;
        }

        // Update in business details
        state.businessDetails[updatedBusiness.id] = updatedBusiness;

        // Update current business
        if (state.currentBusiness?.id === updatedBusiness.id) {
          state.currentBusiness = updatedBusiness;
        }

        state.success.update = true;
        state.error.update = null;
      })
      .addCase(updateBusiness.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload;
        state.success.update = false;
      })

      // Delete business
      .addCase(deleteBusiness.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteBusiness.fulfilled, (state, action) => {
        state.loading.delete = false;
        const businessId = action.payload;

        // Remove from businesses list
        state.businesses = state.businesses.filter((b) => b.id !== businessId);
        state.totalCount = Math.max(0, state.totalCount - 1);

        // Clear related data
        delete state.businessDetails[businessId];
        delete state.businessWebsites[businessId];
        delete state.businessAnalytics[businessId];
        delete state.businessTeams[businessId];
        delete state.businessSettings[businessId];

        // Clear current business if it's the deleted one
        if (state.currentBusiness?.id === businessId) {
          state.currentBusiness = null;
        }

        // Remove from selection
        state.selectedBusinesses = state.selectedBusinesses.filter(
          (id) => id !== businessId
        );

        state.success.delete = true;
      })
      .addCase(deleteBusiness.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload;
      })

      // Fetch categories
      .addCase(fetchBusinessCategories.pending, (state) => {
        state.loading.categories = true;
        state.error.categories = null;
      })
      .addCase(fetchBusinessCategories.fulfilled, (state, action) => {
        state.loading.categories = false;
        state.categories = action.payload;
        state.error.categories = null;
      })
      .addCase(fetchBusinessCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error.categories = action.payload;
      })

      // Business websites
      .addCase(fetchBusinessWebsites.pending, (state) => {
        state.loading.websites = true;
        state.error.websites = null;
      })
      .addCase(fetchBusinessWebsites.fulfilled, (state, action) => {
        state.loading.websites = false;
        const { businessId, websites } = action.payload;
        state.businessWebsites[businessId] = websites;
        state.error.websites = null;
      })
      .addCase(fetchBusinessWebsites.rejected, (state, action) => {
        state.loading.websites = false;
        state.error.websites = action.payload;
      })

      .addCase(createBusinessWebsite.fulfilled, (state, action) => {
        const { businessId, website } = action.payload;
        if (!state.businessWebsites[businessId]) {
          state.businessWebsites[businessId] = [];
        }
        state.businessWebsites[businessId].unshift(website);

        // Update websites count in business data
        const business = state.businesses.find((b) => b.id === businessId);
        if (business) {
          business.websitesCount = (business.websitesCount || 0) + 1;
        }
      })

      // Business analytics
      .addCase(fetchBusinessAnalytics.pending, (state) => {
        state.loading.analytics = true;
        state.error.analytics = null;
      })
      .addCase(fetchBusinessAnalytics.fulfilled, (state, action) => {
        state.loading.analytics = false;
        const { businessId, analytics } = action.payload;
        state.businessAnalytics[businessId] = {
          ...state.businessAnalytics[businessId],
          ...analytics,
          lastUpdated: Date.now(),
        };
        state.error.analytics = null;
      })
      .addCase(fetchBusinessAnalytics.rejected, (state, action) => {
        state.loading.analytics = false;
        state.error.analytics = action.payload;
      })

      // Logo upload
      .addCase(uploadBusinessLogo.pending, (state) => {
        state.loading.logoUpload = true;
        state.isUploadingLogo = true;
        state.error.logoUpload = null;
        state.success.logoUpload = false;
      })
      .addCase(uploadBusinessLogo.fulfilled, (state, action) => {
        state.loading.logoUpload = false;
        state.isUploadingLogo = false;
        state.success.logoUpload = true;

        const { businessId, business } = action.payload;

        // Update business data everywhere
        const updateBusiness = (targetBusiness) => {
          if (targetBusiness && targetBusiness.id === businessId) {
            return { ...targetBusiness, ...business };
          }
          return targetBusiness;
        };

        // Update in list
        state.businesses = state.businesses.map(updateBusiness);

        // Update in details
        if (state.businessDetails[businessId]) {
          state.businessDetails[businessId] = updateBusiness(
            state.businessDetails[businessId]
          );
        }

        // Update current business
        if (state.currentBusiness?.id === businessId) {
          state.currentBusiness = updateBusiness(state.currentBusiness);
        }

        state.error.logoUpload = null;
      })
      .addCase(uploadBusinessLogo.rejected, (state, action) => {
        state.loading.logoUpload = false;
        state.isUploadingLogo = false;
        state.error.logoUpload = action.payload;
        state.success.logoUpload = false;
      })

      // Team management
      .addCase(fetchBusinessTeam.pending, (state) => {
        state.loading.team = true;
        state.error.team = null;
      })
      .addCase(fetchBusinessTeam.fulfilled, (state, action) => {
        state.loading.team = false;
        const { businessId, team } = action.payload;
        state.businessTeams[businessId] = team;
        state.error.team = null;
      })
      .addCase(fetchBusinessTeam.rejected, (state, action) => {
        state.loading.team = false;
        state.error.team = action.payload;
      })

      .addCase(inviteTeamMember.pending, (state) => {
        state.loading.invite = true;
        state.error.invite = null;
        state.success.teamInvite = false;
      })
      .addCase(inviteTeamMember.fulfilled, (state, action) => {
        state.loading.invite = false;
        state.success.teamInvite = true;
        state.error.invite = null;

        const { businessId, invitation } = action.payload;
        // Update team data with pending invitation
        if (state.businessTeams[businessId]) {
          state.businessTeams[businessId].pending_invitations =
            state.businessTeams[businessId].pending_invitations || [];
          state.businessTeams[businessId].pending_invitations.push(invitation);
        }
      })
      .addCase(inviteTeamMember.rejected, (state, action) => {
        state.loading.invite = false;
        state.error.invite = action.payload;
        state.success.teamInvite = false;
      })

      // Settings
      .addCase(fetchBusinessSettings.pending, (state) => {
        state.loading.settings = true;
        state.error.settings = null;
      })
      .addCase(fetchBusinessSettings.fulfilled, (state, action) => {
        state.loading.settings = false;
        const { businessId, settings } = action.payload;
        state.businessSettings[businessId] = settings;
        state.error.settings = null;
      })
      .addCase(fetchBusinessSettings.rejected, (state, action) => {
        state.loading.settings = false;
        state.error.settings = action.payload;
      })

      .addCase(updateBusinessSettings.pending, (state) => {
        state.loading.settings = true;
        state.error.settings = null;
        state.success.settingsUpdate = false;
      })
      .addCase(updateBusinessSettings.fulfilled, (state, action) => {
        state.loading.settings = false;
        state.success.settingsUpdate = true;

        const { businessId, settings } = action.payload;
        state.businessSettings[businessId] = {
          ...state.businessSettings[businessId],
          ...settings,
        };
        state.error.settings = null;
      })
      .addCase(updateBusinessSettings.rejected, (state, action) => {
        state.loading.settings = false;
        state.error.settings = action.payload;
        state.success.settingsUpdate = false;
      });
  },
});

export const {
  clearError,
  clearAllErrors,
  clearSuccessFlags,
  setCurrentBusiness,
  clearCurrentBusiness,
  setSearchFilters,
  clearSearchFilters,
  clearBusinesses,
  clearBusinessDetails,
  setViewMode,
  toggleBusinessSelection,
  selectAllBusinesses,
  clearBusinessSelection,
  setLogoUploadProgress,
  resetLogoUploadProgress,
  updateBusinessLocal,
  setCacheTimestamp,
  checkCacheExpiry,
} = businessSlice.actions;

// Enhanced selectors with memoization
export const selectBusiness = (state) => state.business;
export const selectBusinesses = (state) => state.business.businesses;
export const selectCurrentBusiness = (state) => state.business.currentBusiness;

export const selectBusinessDetails = (state, businessId) =>
  state.business.businessDetails[businessId];

export const selectBusinessWebsites = (state, businessId) =>
  state.business.businessWebsites[businessId] || [];

export const selectBusinessAnalytics = (state, businessId) =>
  state.business.businessAnalytics[businessId];

export const selectBusinessTeam = (state, businessId) =>
  state.business.businessTeams[businessId];

export const selectBusinessSettings = (state, businessId) =>
  state.business.businessSettings[businessId];

export const selectBusinessCategories = (state) => state.business.categories;
export const selectBusinessLoading = (state) => state.business.loading;
export const selectBusinessError = (state) => state.business.error;
export const selectBusinessSuccess = (state) => state.business.success;
export const selectSelectedBusinesses = (state) =>
  state.business.selectedBusinesses;

export const selectSearchFilters = (state) => ({
  searchTerm: state.business.searchTerm,
  selectedCategory: state.business.selectedCategory,
  sortBy: state.business.sortBy,
  sortOrder: state.business.sortOrder,
});

export const selectPaginationData = (state) => ({
  currentPage: state.business.currentPage,
  totalCount: state.business.totalCount,
  totalPages: state.business.totalPages,
  pageSize: state.business.pageSize,
  hasMore: state.business.hasMore,
});

// Derived selectors
export const selectBusinessById = (state, businessId) => {
  const fromList = state.business.businesses.find((b) => b.id === businessId);
  const fromDetails = state.business.businessDetails[businessId];
  return fromDetails || fromList;
};

export const selectActiveBusinesses = (state) =>
  state.business.businesses.filter((b) => b.status === "active");

export const selectBusinessesByCategory = (state, categorySlug) =>
  state.business.businesses.filter((b) => b.category?.slug === categorySlug);

export const selectIsDataStale = (state) => {
  if (!state.business.lastFetched) return true;
  return Date.now() - state.business.lastFetched > state.business.cacheTimeout;
};

export default businessSlice.reducer;
