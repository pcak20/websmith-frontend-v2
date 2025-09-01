// store/slices/templateSlice.js
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { templateAPI } from "../api/templateAPI";

// Template Configuration
export const fetchTemplateConfiguration = createAsyncThunk(
  "template/fetchTemplateConfiguration",
  async (_, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getTemplateConfiguration();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch template configuration"
      );
    }
  }
);

// Template Discovery and Browsing
export const fetchTemplates = createAsyncThunk(
  "template/fetchTemplates",
  async (params = {}, { rejectWithValue }) => {
    try {
      const cleanParams = {};

      // Map frontend params to Django API params
      if (params.business_category && params.business_category !== "all") {
        cleanParams.business_category = params.business_category;
      }

      if (params.category && params.category !== "all") {
        cleanParams.category = params.category;
      }

      if (params.pricing_tier && params.pricing_tier !== "all") {
        cleanParams.pricing_tier = params.pricing_tier;
      }

      if (params.complexity_level) {
        cleanParams.complexity_level = params.complexity_level;
      }

      if (params.is_featured !== undefined) {
        cleanParams.is_featured = params.is_featured;
      }

      if (params.is_trending !== undefined) {
        cleanParams.is_trending = params.is_trending;
      }

      if (params.is_responsive !== undefined) {
        cleanParams.is_responsive = params.is_responsive;
      }

      if (params.is_seo_optimized !== undefined) {
        cleanParams.is_seo_optimized = params.is_seo_optimized;
      }

      if (params.min_rating) {
        cleanParams.min_rating = params.min_rating;
      }

      if (params.tags && params.tags.length > 0) {
        cleanParams.tags = params.tags;
      }

      if (params.ordering) {
        cleanParams.ordering = params.ordering;
      }

      if (params.page) {
        cleanParams.page = params.page;
      }

      if (params.page_size) {
        cleanParams.page_size = params.page_size;
      }

      // Remove any undefined/null values
      Object.keys(cleanParams).forEach((key) => {
        if (cleanParams[key] === undefined || cleanParams[key] === null) {
          delete cleanParams[key];
        }
      });

      const response = await templateAPI.getTemplates(cleanParams);

      // Handle both paginated and non-paginated responses
      if (response.data.results) {
        return {
          ...response.data,
          page: params.page || 1,
        };
      } else {
        // Non-paginated response
        return {
          results: response.data,
          count: response.data.length,
          has_more: false,
          page: 1,
        };
      }
    } catch (error) {
      console.error("Template fetch error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to fetch templates"
      );
    }
  }
);

export const fetchTemplate = createAsyncThunk(
  "template/fetchTemplate",
  async (templateId, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getTemplate(templateId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch template"
      );
    }
  }
);

// Categories
export const fetchTemplateCategories = createAsyncThunk(
  "template/fetchTemplateCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getTemplateCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch categories"
      );
    }
  }
);

export const fetchTemplatesByCategory = createAsyncThunk(
  "template/fetchTemplatesByCategory",
  async ({ categorySlug, params = {} }, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getTemplatesByCategory(
        categorySlug,
        params
      );
      return {
        categorySlug,
        ...response.data,
        page: params.page || 1,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch category templates"
      );
    }
  }
);

// Template Category Management
export const createTemplateCategory = createAsyncThunk(
  "template/createTemplateCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await templateAPI.createTemplateCategory(categoryData);
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data?.name?.[0] || // Django field validation errors
        "Failed to create category";
      console.error("Create category error:", error.response?.data);
      return rejectWithValue(errorMsg);
    }
  }
);

export const updateTemplateCategory = createAsyncThunk(
  "template/updateTemplateCategory",
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const response = await templateAPI.updateTemplateCategory(
        categoryId,
        categoryData
      );
      return { categoryId, ...response.data };
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data?.name?.[0] ||
        "Failed to update category";
      console.error("Update category error:", error.response?.data);
      return rejectWithValue(errorMsg);
    }
  }
);

export const deleteTemplateCategory = createAsyncThunk(
  "template/deleteTemplateCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await templateAPI.deleteTemplateCategory(categoryId);
      return categoryId;
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete category";
      console.error("Delete category error:", error.response?.data);
      return rejectWithValue(errorMsg);
    }
  }
);

// Tags
export const fetchTemplateTags = createAsyncThunk(
  "template/fetchTemplateTags",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getTemplateTags(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch tags"
      );
    }
  }
);

export const fetchPopularTags = createAsyncThunk(
  "template/fetchPopularTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getPopularTags();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch popular tags");
    }
  }
);

export const fetchFeaturedTags = createAsyncThunk(
  "template/fetchFeaturedTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getFeaturedTags();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch featured tags");
    }
  }
);

// Search and Filtering
export const searchTemplates = createAsyncThunk(
  "template/searchTemplates",
  async (searchData, { rejectWithValue }) => {
    try {
      const response = await templateAPI.searchTemplates(searchData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || "Search failed");
    }
  }
);

// Featured and Curated Content
export const fetchFeaturedTemplates = createAsyncThunk(
  "template/fetchFeaturedTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getFeaturedTemplates();
      return response.data;
    } catch (error) {
      console.error("Featured templates fetch error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch featured templates"
      );
    }
  }
);

export const fetchTrendingTemplates = createAsyncThunk(
  "template/fetchTrendingTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getTrendingTemplates();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch trending templates"
      );
    }
  }
);

export const fetchNewTemplates = createAsyncThunk(
  "template/fetchNewTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getNewTemplates();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch new templates"
      );
    }
  }
);

export const fetchPopularTemplates = createAsyncThunk(
  "template/fetchPopularTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getPopularTemplates();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch popular templates"
      );
    }
  }
);

// Template Actions
export const likeTemplate = createAsyncThunk(
  "template/likeTemplate",
  async (templateId, { rejectWithValue }) => {
    try {
      const response = await templateAPI.likeTemplate(templateId);
      return { templateId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to like template"
      );
    }
  }
);

export const downloadTemplate = createAsyncThunk(
  "template/downloadTemplate",
  async (templateId, { rejectWithValue }) => {
    try {
      const response = await templateAPI.downloadTemplate(templateId);
      return { templateId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to download template"
      );
    }
  }
);

export const installTemplate = createAsyncThunk(
  "template/installTemplate",
  async ({ templateId, installationData }, { rejectWithValue }) => {
    try {
      const response = await templateAPI.installTemplate(
        templateId,
        installationData
      );
      return { templateId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to install template"
      );
    }
  }
);

// Reviews
export const fetchTemplateReviews = createAsyncThunk(
  "template/fetchTemplateReviews",
  async ({ templateId, params = {} }, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getTemplateReviews(templateId, params);
      return { templateId, reviews: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch reviews"
      );
    }
  }
);

export const addTemplateReview = createAsyncThunk(
  "template/addTemplateReview",
  async ({ templateId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await templateAPI.addTemplateReview(
        templateId,
        reviewData
      );
      return { templateId, review: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to add review"
      );
    }
  }
);

// Statistics
export const fetchTemplateStats = createAsyncThunk(
  "template/fetchTemplateStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getTemplateStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch stats"
      );
    }
  }
);

export const fetchTemplateRecommendations = createAsyncThunk(
  "template/fetchTemplateRecommendations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await templateAPI.getTemplateRecommendations();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch recommendations"
      );
    }
  }
);

// Admin Template Management
export const createTemplate = createAsyncThunk(
  "template/createTemplate",
  async (templateData, { rejectWithValue }) => {
    try {
      const response = await templateAPI.createTemplate(templateData);
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to create template";
      console.error("Create template error:", error.response?.data);
      return rejectWithValue(errorMsg);
    }
  }
);

export const updateTemplate = createAsyncThunk(
  "template/updateTemplate",
  async ({ templateId, templateData }, { rejectWithValue }) => {
    try {
      const response = await templateAPI.updateTemplate(
        templateId,
        templateData
      );
      return { templateId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to update template"
      );
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  "template/deleteTemplate",
  async (templateId, { rejectWithValue }) => {
    try {
      await templateAPI.deleteTemplate(templateId);
      return templateId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to delete template"
      );
    }
  }
);

export const publishTemplate = createAsyncThunk(
  "template/publishTemplate",
  async (templateId, { rejectWithValue }) => {
    try {
      const response = await templateAPI.publishTemplate(templateId);
      return { templateId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to publish template"
      );
    }
  }
);

// Bulk Operations
export const bulkUpdateTemplates = createAsyncThunk(
  "template/bulkUpdateTemplates",
  async ({ templateIds, updates }, { rejectWithValue }) => {
    try {
      const response = await templateAPI.bulkUpdateTemplates(
        templateIds,
        updates
      );
      return { templateIds, updates, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to bulk update templates"
      );
    }
  }
);

export const bulkDeleteTemplates = createAsyncThunk(
  "template/bulkDeleteTemplates",
  async (templateIds, { rejectWithValue }) => {
    try {
      await templateAPI.bulkDeleteTemplates(templateIds);
      return templateIds;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to bulk delete templates"
      );
    }
  }
);

const initialState = {
  // Template data
  templates: [],
  templateDetails: {}, // templateId -> detailed template data
  currentTemplate: null,

  // Configuration data from server
  configuration: {
    pricing_tiers: [],
    complexity_levels: [],
    common_pages: [],
    common_features: [],
    template_tags: [],
    popular_tags: [],
    status_choices: [],
  },

  // Categories, tags, and collections
  categories: [],
  tags: [],
  popularTags: [],
  featuredTags: [],
  collections: [],

  // Curated lists
  popularTemplates: [],
  trendingTemplates: [],
  featuredTemplates: [],
  newTemplates: [],

  // Search and filtering
  searchResults: [],
  searchQuery: "",
  currentFilters: {
    category: "all",
    business_category: "all",
    pricing_tier: "all",
    complexity_level: null,
    is_featured: null,
    is_trending: null,
    is_responsive: null,
    is_seo_optimized: null,
    min_rating: null,
    tags: [],
    ordering: "-created_at",
  },

  // Template interactions
  templateReviews: {}, // templateId -> reviews
  templateStats: null,
  recommendations: null,

  // Pagination
  totalCount: 0,
  currentPage: 1,
  hasMore: false,

  // Loading states
  loading: {
    configuration: false,
    templates: false,
    templateDetails: false,
    categories: false,
    tags: false,
    popular: false,
    trending: false,
    featured: false,
    new: false,
    search: false,
    like: false,
    download: false,
    install: false,
    reviews: false,
    stats: false,
    recommendations: false,
    create: false,
    update: false,
    delete: false,
    publish: false,
    bulkUpdate: false,
    bulkDelete: false,
    createCategory: false,
    updateCategory: false,
    deleteCategory: false,
  },

  // Error states
  error: {
    configuration: null,
    templates: null,
    templateDetails: null,
    categories: null,
    tags: null,
    popular: null,
    trending: null,
    featured: null,
    new: null,
    search: null,
    like: null,
    download: null,
    install: null,
    reviews: null,
    stats: null,
    recommendations: null,
    create: null,
    update: null,
    delete: null,
    publish: null,
    bulkUpdate: null,
    bulkDelete: null,
    createCategory: null,
    updateCategory: null,
    deleteCategory: null,
  },

  // Success states
  success: {
    like: false,
    download: false,
    install: false,
    create: false,
    update: false,
    delete: false,
    publish: false,
    bulkUpdate: false,
    bulkDelete: false,
    createCategory: false,
    updateCategory: false,
    deleteCategory: false,
  },

  // UI states
  viewMode: "grid", // "grid" | "list"
  selectedCategory: "all",
  selectedBusinessCategory: "all",
  previewMode: "desktop", // "desktop" | "tablet" | "mobile"
};

const templateSlice = createSlice({
  name: "template",
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

    // Template selection
    setCurrentTemplate: (state, action) => {
      state.currentTemplate = action.payload;
    },

    clearCurrentTemplate: (state) => {
      state.currentTemplate = null;
    },

    // Search and filtering
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    updateFilters: (state, action) => {
      state.currentFilters = { ...state.currentFilters, ...action.payload };
    },

    clearFilters: (state) => {
      state.currentFilters = {
        category: "all",
        business_category: "all",
        pricing_tier: "all",
        complexity_level: null,
        is_featured: null,
        is_trending: null,
        is_responsive: null,
        is_seo_optimized: null,
        min_rating: null,
        tags: [],
        ordering: "-created_at",
      };
      state.searchQuery = "";
    },

    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },

    setSelectedBusinessCategory: (state, action) => {
      state.selectedBusinessCategory = action.payload;
    },

    // UI preferences
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },

    setPreviewMode: (state, action) => {
      state.previewMode = action.payload;
    },

    // Local updates
    updateTemplateLocal: (state, action) => {
      const { templateId, updates } = action.payload;

      // Update in templates list
      const templateIndex = state.templates.findIndex(
        (t) => t.id === templateId
      );
      if (templateIndex !== -1) {
        state.templates[templateIndex] = {
          ...state.templates[templateIndex],
          ...updates,
        };
      }

      // Update in template details
      if (state.templateDetails[templateId]) {
        state.templateDetails[templateId] = {
          ...state.templateDetails[templateId],
          ...updates,
        };
      }

      // Update current template
      if (state.currentTemplate?.id === templateId) {
        state.currentTemplate = { ...state.currentTemplate, ...updates };
      }
    },

    // Data management
    clearTemplates: (state) => {
      state.templates = [];
      state.currentPage = 1;
      state.hasMore = false;
      state.totalCount = 0;
    },

    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
    },

    clearTemplateDetails: (state, action) => {
      const templateId = action.payload;
      if (templateId) {
        delete state.templateDetails[templateId];
        delete state.templateReviews[templateId];
      } else {
        state.templateDetails = {};
        state.templateReviews = {};
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch template configuration
      .addCase(fetchTemplateConfiguration.pending, (state) => {
        state.loading.configuration = true;
        state.error.configuration = null;
      })
      .addCase(fetchTemplateConfiguration.fulfilled, (state, action) => {
        state.loading.configuration = false;
        state.configuration = action.payload;
      })
      .addCase(fetchTemplateConfiguration.rejected, (state, action) => {
        state.loading.configuration = false;
        state.error.configuration = action.payload;
      })

      // Fetch templates
      .addCase(fetchTemplates.pending, (state, action) => {
        state.loading.templates = true;
        state.error.templates = null;

        // Clear templates if it's a new search (page 1)
        if (!action.meta.arg?.page || action.meta.arg.page === 1) {
          state.templates = [];
        }
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading.templates = false;
        const { results, count, has_more, page } = action.payload;

        if (page === 1) {
          state.templates = results;
        } else {
          state.templates = [...state.templates, ...results];
        }

        state.totalCount = count || results.length;
        state.currentPage = page || 1;
        state.hasMore = has_more || false;
        state.error.templates = null;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading.templates = false;
        state.error.templates = action.payload;
      })

      // Fetch template details
      .addCase(fetchTemplate.pending, (state) => {
        state.loading.templateDetails = true;
        state.error.templateDetails = null;
      })
      .addCase(fetchTemplate.fulfilled, (state, action) => {
        state.loading.templateDetails = false;
        const template = action.payload;
        state.templateDetails[template.id] = template;
        state.currentTemplate = template;
      })
      .addCase(fetchTemplate.rejected, (state, action) => {
        state.loading.templateDetails = false;
        state.error.templateDetails = action.payload;
      })

      // Categories
      .addCase(fetchTemplateCategories.pending, (state) => {
        state.loading.categories = true;
        state.error.categories = null;
      })
      .addCase(fetchTemplateCategories.fulfilled, (state, action) => {
        state.loading.categories = false;
        state.categories = action.payload;
      })
      .addCase(fetchTemplateCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error.categories = action.payload;
      })

      // Tags
      .addCase(fetchTemplateTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(fetchPopularTags.fulfilled, (state, action) => {
        state.popularTags = action.payload;
      })
      .addCase(fetchFeaturedTags.fulfilled, (state, action) => {
        state.featuredTags = action.payload;
      })

      // Search
      .addCase(searchTemplates.pending, (state) => {
        state.loading.search = true;
        state.error.search = null;
      })
      .addCase(searchTemplates.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload.results || action.payload;
      })
      .addCase(searchTemplates.rejected, (state, action) => {
        state.loading.search = false;
        state.error.search = action.payload;
      })

      // Featured templates
      .addCase(fetchFeaturedTemplates.pending, (state) => {
        state.loading.featured = true;
        state.error.featured = null;
      })
      .addCase(fetchFeaturedTemplates.fulfilled, (state, action) => {
        state.loading.featured = false;
        state.featuredTemplates = action.payload;
      })
      .addCase(fetchFeaturedTemplates.rejected, (state, action) => {
        state.loading.featured = false;
        state.error.featured = action.payload;
      })

      // Trending templates
      .addCase(fetchTrendingTemplates.fulfilled, (state, action) => {
        state.trendingTemplates = action.payload;
      })

      // New templates
      .addCase(fetchNewTemplates.fulfilled, (state, action) => {
        state.newTemplates = action.payload;
      })

      // Popular templates
      .addCase(fetchPopularTemplates.fulfilled, (state, action) => {
        state.popularTemplates = action.payload;
      })

      // Template actions
      .addCase(likeTemplate.pending, (state) => {
        state.loading.like = true;
        state.error.like = null;
      })
      .addCase(likeTemplate.fulfilled, (state, action) => {
        state.loading.like = false;
        state.success.like = true;
        // Update template like count locally
        const { templateId, liked, like_count } = action.payload;
        state.updateTemplateLocal({ templateId, updates: { like_count } });
      })
      .addCase(likeTemplate.rejected, (state, action) => {
        state.loading.like = false;
        state.error.like = action.payload;
      })

      // Download template
      .addCase(downloadTemplate.pending, (state) => {
        state.loading.download = true;
        state.error.download = null;
      })
      .addCase(downloadTemplate.fulfilled, (state, action) => {
        state.loading.download = false;
        state.success.download = true;
        // Update download count locally
        const { templateId } = action.payload;
        const template = state.templates.find((t) => t.id === templateId);
        if (template) {
          template.download_count += 1;
        }
      })
      .addCase(downloadTemplate.rejected, (state, action) => {
        state.loading.download = false;
        state.error.download = action.payload;
      })

      // Install template
      .addCase(installTemplate.pending, (state) => {
        state.loading.install = true;
        state.error.install = null;
        state.success.install = false;
      })
      .addCase(installTemplate.fulfilled, (state, action) => {
        state.loading.install = false;
        state.success.install = true;
        // Update installation count locally
        const { templateId } = action.payload;
        const template = state.templates.find((t) => t.id === templateId);
        if (template) {
          template.installation_count += 1;
        }
      })
      .addCase(installTemplate.rejected, (state, action) => {
        state.loading.install = false;
        state.error.install = action.payload;
      })

      // Reviews
      .addCase(fetchTemplateReviews.pending, (state) => {
        state.loading.reviews = true;
        state.error.reviews = null;
      })
      .addCase(fetchTemplateReviews.fulfilled, (state, action) => {
        state.loading.reviews = false;
        const { templateId, reviews } = action.payload;
        state.templateReviews[templateId] = reviews;
      })
      .addCase(fetchTemplateReviews.rejected, (state, action) => {
        state.loading.reviews = false;
        state.error.reviews = action.payload;
      })

      .addCase(addTemplateReview.fulfilled, (state, action) => {
        const { templateId, review } = action.payload;
        if (state.templateReviews[templateId]) {
          state.templateReviews[templateId].results = [
            review,
            ...state.templateReviews[templateId].results,
          ];
        }
      })

      // Statistics
      .addCase(fetchTemplateStats.fulfilled, (state, action) => {
        state.templateStats = action.payload;
      })

      .addCase(fetchTemplateRecommendations.fulfilled, (state, action) => {
        state.recommendations = action.payload;
      })

      // Admin template management
      .addCase(createTemplate.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
        state.success.create = false;
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.loading.create = false;
        state.success.create = true;
        // Add the new template to the list
        state.templates.unshift(action.payload);
      })
      .addCase(createTemplate.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload;
      })

      .addCase(updateTemplate.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
        state.success.update = false;
      })
      .addCase(updateTemplate.fulfilled, (state, action) => {
        state.loading.update = false;
        state.success.update = true;
        const { templateId, ...updates } = action.payload;

        // Update in templates list
        const templateIndex = state.templates.findIndex(
          (t) => t.id === templateId
        );
        if (templateIndex !== -1) {
          state.templates[templateIndex] = {
            ...state.templates[templateIndex],
            ...updates,
          };
        }

        // Update in template details
        if (state.templateDetails[templateId]) {
          state.templateDetails[templateId] = {
            ...state.templateDetails[templateId],
            ...updates,
          };
        }
      })
      .addCase(updateTemplate.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload;
      })

      .addCase(deleteTemplate.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
        state.success.delete = false;
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.success.delete = true;
        const templateId = action.payload;

        // Remove from templates list
        state.templates = state.templates.filter((t) => t.id !== templateId);

        // Remove from template details
        delete state.templateDetails[templateId];
        delete state.templateReviews[templateId];

        // Clear current template if it's the deleted one
        if (state.currentTemplate?.id === templateId) {
          state.currentTemplate = null;
        }
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload;
      })

      .addCase(publishTemplate.pending, (state) => {
        state.loading.publish = true;
        state.error.publish = null;
        state.success.publish = false;
      })
      .addCase(publishTemplate.fulfilled, (state, action) => {
        state.loading.publish = false;
        state.success.publish = true;
        const { templateId, ...updates } = action.payload;

        // Update template status
        const template = state.templates.find((t) => t.id === templateId);
        if (template) {
          Object.assign(template, updates);
        }

        if (state.templateDetails[templateId]) {
          Object.assign(state.templateDetails[templateId], updates);
        }
      })
      .addCase(publishTemplate.rejected, (state, action) => {
        state.loading.publish = false;
        state.error.publish = action.payload;
      })

      // Bulk operations
      .addCase(bulkUpdateTemplates.pending, (state) => {
        state.loading.bulkUpdate = true;
        state.error.bulkUpdate = null;
        state.success.bulkUpdate = false;
      })
      .addCase(bulkUpdateTemplates.fulfilled, (state, action) => {
        state.loading.bulkUpdate = false;
        state.success.bulkUpdate = true;
        const { templateIds, updates } = action.payload;

        // Update all affected templates
        templateIds.forEach((templateId) => {
          const template = state.templates.find((t) => t.id === templateId);
          if (template) {
            Object.assign(template, updates);
          }

          if (state.templateDetails[templateId]) {
            Object.assign(state.templateDetails[templateId], updates);
          }
        });
      })
      .addCase(bulkUpdateTemplates.rejected, (state, action) => {
        state.loading.bulkUpdate = false;
        state.error.bulkUpdate = action.payload;
      })

      .addCase(bulkDeleteTemplates.pending, (state) => {
        state.loading.bulkDelete = true;
        state.error.bulkDelete = null;
        state.success.bulkDelete = false;
      })
      .addCase(bulkDeleteTemplates.fulfilled, (state, action) => {
        state.loading.bulkDelete = false;
        state.success.bulkDelete = true;
        const templateIds = action.payload;

        // Remove all deleted templates
        state.templates = state.templates.filter(
          (t) => !templateIds.includes(t.id)
        );

        // Clean up template details and reviews
        templateIds.forEach((templateId) => {
          delete state.templateDetails[templateId];
          delete state.templateReviews[templateId];
        });

        // Clear current template if it was deleted
        if (
          state.currentTemplate &&
          templateIds.includes(state.currentTemplate.id)
        ) {
          state.currentTemplate = null;
        }
      })
      .addCase(bulkDeleteTemplates.rejected, (state, action) => {
        state.loading.bulkDelete = false;
        state.error.bulkDelete = action.payload;
      })

      // Category management
      .addCase(createTemplateCategory.pending, (state) => {
        state.loading.createCategory = true;
        state.error.createCategory = null;
        state.success.createCategory = false;
      })
      .addCase(createTemplateCategory.fulfilled, (state, action) => {
        state.loading.createCategory = false;
        state.success.createCategory = true;
        // Add the new category to the list
        state.categories.unshift(action.payload);
      })
      .addCase(createTemplateCategory.rejected, (state, action) => {
        state.loading.createCategory = false;
        state.error.createCategory = action.payload;
      })

      .addCase(updateTemplateCategory.pending, (state) => {
        state.loading.updateCategory = true;
        state.error.updateCategory = null;
        state.success.updateCategory = false;
      })
      .addCase(updateTemplateCategory.fulfilled, (state, action) => {
        state.loading.updateCategory = false;
        state.success.updateCategory = true;
        const { categoryId, ...updates } = action.payload;

        // Update category in the list
        const categoryIndex = state.categories.findIndex(
          (cat) => cat.id === categoryId
        );
        if (categoryIndex !== -1) {
          state.categories[categoryIndex] = {
            ...state.categories[categoryIndex],
            ...updates,
          };
        }
      })
      .addCase(updateTemplateCategory.rejected, (state, action) => {
        state.loading.updateCategory = false;
        state.error.updateCategory = action.payload;
      })

      .addCase(deleteTemplateCategory.pending, (state) => {
        state.loading.deleteCategory = true;
        state.error.deleteCategory = null;
        state.success.deleteCategory = false;
      })
      .addCase(deleteTemplateCategory.fulfilled, (state, action) => {
        state.loading.deleteCategory = false;
        state.success.deleteCategory = true;
        const categoryId = action.payload;

        // Remove category from the list
        state.categories = state.categories.filter(
          (cat) => cat.id !== categoryId
        );
      })
      .addCase(deleteTemplateCategory.rejected, (state, action) => {
        state.loading.deleteCategory = false;
        state.error.deleteCategory = action.payload;
      });
  },
});

export const {
  clearError,
  clearAllErrors,
  clearSuccessFlags,
  setCurrentTemplate,
  clearCurrentTemplate,
  setSearchQuery,
  updateFilters,
  clearFilters,
  setSelectedCategory,
  setSelectedBusinessCategory,
  setViewMode,
  setPreviewMode,
  updateTemplateLocal,
  clearTemplates,
  clearSearchResults,
  clearTemplateDetails,
} = templateSlice.actions;

export const selectTemplate = (state) => state.template;
export const selectTemplates = (state) => state.template.templates;
export const selectCurrentTemplate = (state) => state.template.currentTemplate;
export const selectTemplateConfiguration = (state) =>
  state.template.configuration;
export const selectTemplateDetails = (state, templateId) =>
  state.template.templateDetails[templateId];
export const selectTemplateCategories = (state) => state.template.categories;
export const selectTemplateTags = (state) => state.template.tags;
export const selectPopularTags = (state) => state.template.popularTags;
export const selectFeaturedTags = (state) => state.template.featuredTags;
export const selectPopularTemplates = (state) =>
  state.template.popularTemplates;
export const selectTrendingTemplates = (state) =>
  state.template.trendingTemplates;
export const selectFeaturedTemplates = (state) =>
  state.template.featuredTemplates;
export const selectNewTemplates = (state) => state.template.newTemplates;
export const selectSearchResults = (state) => state.template.searchResults;
export const selectTemplateReviews = (state, templateId) =>
  state.template.templateReviews[templateId];
export const selectTemplateStats = (state) => state.template.templateStats;
export const selectTemplateRecommendations = (state) =>
  state.template.recommendations;
export const selectCurrentFilters = (state) => state.template.currentFilters;
export const selectTemplateLoading = (state) => state.template.loading;
export const selectTemplateError = (state) => state.template.error;
export const selectTemplateSuccess = (state) => state.template.success;

// Memoized selectors for objects that could cause re-renders
export const selectUISettings = createSelector(
  [
    (state) => state.template.viewMode,
    (state) => state.template.selectedCategory,
    (state) => state.template.selectedBusinessCategory,
    (state) => state.template.previewMode,
  ],
  (viewMode, selectedCategory, selectedBusinessCategory, previewMode) => ({
    viewMode,
    selectedCategory,
    selectedBusinessCategory,
    previewMode,
  })
);

export const selectPaginationInfo = createSelector(
  [
    (state) => state.template.totalCount,
    (state) => state.template.currentPage,
    (state) => state.template.hasMore,
  ],
  (totalCount, currentPage, hasMore) => ({
    totalCount,
    currentPage,
    hasMore,
  })
);

export default templateSlice.reducer;
