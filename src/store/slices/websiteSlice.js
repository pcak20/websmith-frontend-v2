// store/slices/websiteSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { websiteAPI } from "../api/websiteAPI";

// Website CRUD Operations
export const fetchWebsites = createAsyncThunk(
  "website/fetchWebsites",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.getWebsites(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch websites"
      );
    }
  }
);

export const fetchWebsite = createAsyncThunk(
  "website/fetchWebsite",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.getWebsite(websiteId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch website"
      );
    }
  }
);

export const fetchWebsiteDetails = createAsyncThunk(
  "website/fetchWebsiteDetails",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.getWebsiteDetails(websiteId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch website details"
      );
    }
  }
);

export const createWebsite = createAsyncThunk(
  "website/createWebsite",
  async ({ businessId, websiteData }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.createWebsite(businessId, websiteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create website"
      );
    }
  }
);

export const updateWebsite = createAsyncThunk(
  "website/updateWebsite",
  async ({ websiteId, data }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.updateWebsite(websiteId, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update website"
      );
    }
  }
);

export const deleteWebsite = createAsyncThunk(
  "website/deleteWebsite",
  async (websiteId, { rejectWithValue }) => {
    try {
      await websiteAPI.deleteWebsite(websiteId);
      return websiteId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete website"
      );
    }
  }
);

export const duplicateWebsite = createAsyncThunk(
  "website/duplicateWebsite",
  async ({ websiteId, duplicateData = {} }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.duplicateWebsite(
        websiteId,
        duplicateData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to duplicate website");
    }
  }
);

// Website Status and Publishing
export const publishWebsite = createAsyncThunk(
  "website/publishWebsite",
  async ({ websiteId, publishOptions = {} }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.publishWebsite(
        websiteId,
        publishOptions
      );
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to publish website"
      );
    }
  }
);

export const unpublishWebsite = createAsyncThunk(
  "website/unpublishWebsite",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.unpublishWebsite(websiteId);
      return { websiteId, ...response.data };
    } catch (error) {
      return rejectWithValue("Failed to unpublish website");
    }
  }
);

export const getWebsiteStatus = createAsyncThunk(
  "website/getWebsiteStatus",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.getWebsiteStatus(websiteId);
      return { websiteId, status: response.data };
    } catch (error) {
      return rejectWithValue("Failed to get website status");
    }
  }
);

// Page Management
export const fetchWebsitePages = createAsyncThunk(
  "website/fetchWebsitePages",
  async ({ websiteId, includeContent = false }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.getWebsitePages(
        websiteId,
        includeContent
      );
      return { websiteId, pages: response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch pages");
    }
  }
);

export const fetchPage = createAsyncThunk(
  "website/fetchPage",
  async ({ websiteId, pageId }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.getPage(websiteId, pageId);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch page");
    }
  }
);

export const createPage = createAsyncThunk(
  "website/createPage",
  async ({ websiteId, pageData }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.createPage(websiteId, pageData);
      return { websiteId, page: response.data };
    } catch (error) {
      return rejectWithValue("Failed to create page");
    }
  }
);

export const updatePage = createAsyncThunk(
  "website/updatePage",
  async ({ websiteId, pageId, pageData }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.updatePage(websiteId, pageId, pageData);
      return { websiteId, page: response.data };
    } catch (error) {
      return rejectWithValue("Failed to update page");
    }
  }
);

export const deletePage = createAsyncThunk(
  "website/deletePage",
  async ({ websiteId, pageId }, { rejectWithValue }) => {
    try {
      await websiteAPI.deletePage(websiteId, pageId);
      return { websiteId, pageId };
    } catch (error) {
      return rejectWithValue("Failed to delete page");
    }
  }
);

export const updatePageContent = createAsyncThunk(
  "website/updatePageContent",
  async ({ pageId, contentData }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.updatePageContent(pageId, contentData);
      return { pageId, content: response.data };
    } catch (error) {
      return rejectWithValue("Failed to update page content");
    }
  }
);

export const savePageDraft = createAsyncThunk(
  "website/savePageDraft",
  async ({ pageId, draftData }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.savePageDraft(pageId, draftData);
      return { pageId, draft: response.data };
    } catch (error) {
      return rejectWithValue("Failed to save draft");
    }
  }
);

export const publishPageChanges = createAsyncThunk(
  "website/publishPageChanges",
  async (pageId, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.publishPageChanges(pageId);
      return { pageId, ...response.data };
    } catch (error) {
      return rejectWithValue("Failed to publish page changes");
    }
  }
);

// Design and Styling
export const fetchDesignSettings = createAsyncThunk(
  "website/fetchDesignSettings",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.getDesignSettings(websiteId);
      return { websiteId, settings: response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch design settings");
    }
  }
);

export const updateDesignSettings = createAsyncThunk(
  "website/updateDesignSettings",
  async ({ websiteId, designData }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.updateDesignSettings(
        websiteId,
        designData
      );
      return { websiteId, settings: response.data };
    } catch (error) {
      return rejectWithValue("Failed to update design settings");
    }
  }
);

// SEO Management
export const fetchSEOSettings = createAsyncThunk(
  "website/fetchSEOSettings",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.getSEOSettings(websiteId);
      return { websiteId, seo: response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch SEO settings");
    }
  }
);

export const updateSEOSettings = createAsyncThunk(
  "website/updateSEOSettings",
  async ({ websiteId, seoData }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.updateSEOSettings(websiteId, seoData);
      return { websiteId, seo: response.data };
    } catch (error) {
      return rejectWithValue("Failed to update SEO settings");
    }
  }
);

export const generateSitemap = createAsyncThunk(
  "website/generateSitemap",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.generateSitemap(websiteId);
      return { websiteId, sitemap: response.data };
    } catch (error) {
      return rejectWithValue("Failed to generate sitemap");
    }
  }
);

// Domain Management
export const connectCustomDomain = createAsyncThunk(
  "website/connectCustomDomain",
  async ({ websiteId, domainData }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.connectCustomDomain(
        websiteId,
        domainData
      );
      return { websiteId, domain: response.data };
    } catch (error) {
      return rejectWithValue("Failed to connect domain");
    }
  }
);

export const verifyDomain = createAsyncThunk(
  "website/verifyDomain",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.verifyDomain(websiteId);
      return { websiteId, verification: response.data };
    } catch (error) {
      return rejectWithValue("Domain verification failed");
    }
  }
);

// Backup Management
export const createWebsiteBackup = createAsyncThunk(
  "website/createWebsiteBackup",
  async ({ websiteId, backupData = {} }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.createBackup(websiteId, backupData);
      return { websiteId, backup: response.data };
    } catch (error) {
      return rejectWithValue("Failed to create backup");
    }
  }
);

export const fetchWebsiteBackups = createAsyncThunk(
  "website/fetchWebsiteBackups",
  async ({ websiteId, params = {} }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.getBackups(websiteId, params);
      return { websiteId, backups: response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch backups");
    }
  }
);

export const restoreWebsiteBackup = createAsyncThunk(
  "website/restoreWebsiteBackup",
  async ({ websiteId, backupId, restoreOptions = {} }, { rejectWithValue }) => {
    try {
      const response = await websiteAPI.restoreBackup(
        websiteId,
        backupId,
        restoreOptions
      );
      return { websiteId, backupId, restore: response.data };
    } catch (error) {
      return rejectWithValue("Failed to restore backup");
    }
  }
);

const initialState = {
  // Website data
  websites: [],
  websiteDetails: {}, // websiteId -> detailed website data
  currentWebsite: null,

  // Page data
  websitePages: {}, // websiteId -> pages array
  pageDetails: {}, // pageId -> detailed page data
  currentPage: null,
  pageDrafts: {}, // pageId -> draft content

  // Settings and configuration
  designSettings: {}, // websiteId -> design settings
  seoSettings: {}, // websiteId -> SEO settings
  domainSettings: {}, // websiteId -> domain settings

  // Backups
  websiteBackups: {}, // websiteId -> backups array

  // Status tracking
  websiteStatuses: {}, // websiteId -> status info

  // Preview and testing
  previewUrls: {}, // websiteId -> preview URL

  // Loading states
  loading: {
    websites: false,
    websiteDetails: false,
    pages: false,
    pageDetails: false,
    create: false,
    update: false,
    delete: false,
    duplicate: false,
    publish: false,
    unpublish: false,
    designSettings: false,
    seoSettings: false,
    domain: false,
    backup: false,
    restore: false,
  },

  // Error states
  error: {
    websites: null,
    websiteDetails: null,
    pages: null,
    pageDetails: null,
    create: null,
    update: null,
    delete: null,
    duplicate: null,
    publish: null,
    unpublish: null,
    designSettings: null,
    seoSettings: null,
    domain: null,
    backup: null,
    restore: null,
  },

  // Success states
  success: {
    create: false,
    update: false,
    delete: false,
    duplicate: false,
    publish: false,
    unpublish: false,
    pageUpdate: false,
    designUpdate: false,
    seoUpdate: false,
    domainConnect: false,
    backup: false,
    restore: false,
  },

  // UI states
  selectedWebsites: [], // For bulk operations
  currentView: "grid", // 'grid' | 'list'
  sortBy: "updated_at",
  sortOrder: "desc",
  filterStatus: "all", // 'all' | 'published' | 'draft'
};

const websiteSlice = createSlice({
  name: "website",
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

    // Website selection
    setCurrentWebsite: (state, action) => {
      state.currentWebsite = action.payload;
    },

    clearCurrentWebsite: (state) => {
      state.currentWebsite = null;
    },

    // Page selection
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    clearCurrentPage: (state) => {
      state.currentPage = null;
    },

    // Local updates for optimistic UI
    updateWebsiteLocal: (state, action) => {
      const { websiteId, updates } = action.payload;

      // Update in websites list
      const websiteIndex = state.websites.findIndex((w) => w.id === websiteId);
      if (websiteIndex !== -1) {
        state.websites[websiteIndex] = {
          ...state.websites[websiteIndex],
          ...updates,
        };
      }

      // Update in website details
      if (state.websiteDetails[websiteId]) {
        state.websiteDetails[websiteId] = {
          ...state.websiteDetails[websiteId],
          ...updates,
        };
      }

      // Update current website
      if (state.currentWebsite?.id === websiteId) {
        state.currentWebsite = { ...state.currentWebsite, ...updates };
      }
    },

    updatePageLocal: (state, action) => {
      const { websiteId, pageId, updates } = action.payload;

      // Update in website pages
      if (state.websitePages[websiteId]) {
        const pageIndex = state.websitePages[websiteId].findIndex(
          (p) => p.id === pageId
        );
        if (pageIndex !== -1) {
          state.websitePages[websiteId][pageIndex] = {
            ...state.websitePages[websiteId][pageIndex],
            ...updates,
          };
        }
      }

      // Update in page details
      if (state.pageDetails[pageId]) {
        state.pageDetails[pageId] = {
          ...state.pageDetails[pageId],
          ...updates,
        };
      }

      // Update current page
      if (state.currentPage?.id === pageId) {
        state.currentPage = { ...state.currentPage, ...updates };
      }
    },

    // Design settings local update
    updateDesignSettingsLocal: (state, action) => {
      const { websiteId, settings } = action.payload;
      if (state.designSettings[websiteId]) {
        state.designSettings[websiteId] = {
          ...state.designSettings[websiteId],
          ...settings,
        };
      } else {
        state.designSettings[websiteId] = settings;
      }
    },

    // Draft management
    saveDraftLocal: (state, action) => {
      const { pageId, draftContent } = action.payload;
      state.pageDrafts[pageId] = draftContent;
    },

    clearDraft: (state, action) => {
      const pageId = action.payload;
      delete state.pageDrafts[pageId];
    },

    // Website selection for bulk operations
    toggleWebsiteSelection: (state, action) => {
      const websiteId = action.payload;
      const index = state.selectedWebsites.indexOf(websiteId);
      if (index > -1) {
        state.selectedWebsites.splice(index, 1);
      } else {
        state.selectedWebsites.push(websiteId);
      }
    },

    selectAllWebsites: (state) => {
      state.selectedWebsites = state.websites.map((w) => w.id);
    },

    clearWebsiteSelection: (state) => {
      state.selectedWebsites = [];
    },

    // UI preferences
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },

    updateSortSettings: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      if (sortBy !== undefined) state.sortBy = sortBy;
      if (sortOrder !== undefined) state.sortOrder = sortOrder;
    },

    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },

    // Data management
    clearWebsiteDetails: (state, action) => {
      const websiteId = action.payload;
      if (websiteId) {
        delete state.websiteDetails[websiteId];
        delete state.websitePages[websiteId];
        delete state.designSettings[websiteId];
        delete state.seoSettings[websiteId];
        delete state.domainSettings[websiteId];
        delete state.websiteBackups[websiteId];
      } else {
        state.websiteDetails = {};
        state.websitePages = {};
        state.designSettings = {};
        state.seoSettings = {};
        state.domainSettings = {};
        state.websiteBackups = {};
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch websites
      .addCase(fetchWebsites.pending, (state) => {
        state.loading.websites = true;
        state.error.websites = null;
      })
      .addCase(fetchWebsites.fulfilled, (state, action) => {
        state.loading.websites = false;
        state.websites = action.payload.results || action.payload;
      })
      .addCase(fetchWebsites.rejected, (state, action) => {
        state.loading.websites = false;
        state.error.websites = action.payload;
      })

      // Fetch website
      .addCase(fetchWebsite.pending, (state) => {
        state.loading.websiteDetails = true;
        state.error.websiteDetails = null;
      })
      .addCase(fetchWebsite.fulfilled, (state, action) => {
        state.loading.websiteDetails = false;
        const website = action.payload;
        state.websiteDetails[website.id] = website;
      })
      .addCase(fetchWebsite.rejected, (state, action) => {
        state.loading.websiteDetails = false;
        state.error.websiteDetails = action.payload;
      })

      // Fetch website details
      .addCase(fetchWebsiteDetails.fulfilled, (state, action) => {
        const details = action.payload;
        state.currentWebsite = details.website || details;
        if (details.design_settings) {
          state.designSettings[details.website?.id || details.id] =
            details.design_settings;
        }
      })

      // Create website
      .addCase(createWebsite.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
        state.success.create = false;
      })
      .addCase(createWebsite.fulfilled, (state, action) => {
        state.loading.create = false;
        state.success.create = true;
        state.websites.unshift(action.payload);
      })
      .addCase(createWebsite.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload;
      })

      // Update website
      .addCase(updateWebsite.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
        state.success.update = false;
      })
      .addCase(updateWebsite.fulfilled, (state, action) => {
        state.loading.update = false;
        state.success.update = true;

        const updatedWebsite = action.payload;
        const index = state.websites.findIndex(
          (w) => w.id === updatedWebsite.id
        );
        if (index !== -1) {
          state.websites[index] = updatedWebsite;
        }

        state.websiteDetails[updatedWebsite.id] = updatedWebsite;

        if (state.currentWebsite?.id === updatedWebsite.id) {
          state.currentWebsite = updatedWebsite;
        }
      })
      .addCase(updateWebsite.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload;
      })

      // Delete website
      .addCase(deleteWebsite.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteWebsite.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.success.delete = true;

        const websiteId = action.payload;
        state.websites = state.websites.filter((w) => w.id !== websiteId);

        // Clean up related data
        delete state.websiteDetails[websiteId];
        delete state.websitePages[websiteId];
        delete state.designSettings[websiteId];
        delete state.seoSettings[websiteId];
        delete state.domainSettings[websiteId];

        if (state.currentWebsite?.id === websiteId) {
          state.currentWebsite = null;
        }

        state.selectedWebsites = state.selectedWebsites.filter(
          (id) => id !== websiteId
        );
      })
      .addCase(deleteWebsite.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload;
      })

      // Duplicate website
      .addCase(duplicateWebsite.fulfilled, (state, action) => {
        state.success.duplicate = true;
        state.websites.unshift(action.payload);
      })

      // Publish website
      .addCase(publishWebsite.pending, (state) => {
        state.loading.publish = true;
        state.error.publish = null;
        state.success.publish = false;
      })
      .addCase(publishWebsite.fulfilled, (state, action) => {
        state.loading.publish = false;
        state.success.publish = true;

        const { websiteId } = action.payload;

        // Update website status in all relevant places
        const updateStatus = (website) => {
          if (website && website.id === websiteId) {
            return {
              ...website,
              status: "published",
              published_at: action.payload.published_at,
            };
          }
          return website;
        };

        state.websites = state.websites.map(updateStatus);
        if (state.websiteDetails[websiteId]) {
          state.websiteDetails[websiteId] = updateStatus(
            state.websiteDetails[websiteId]
          );
        }
        if (state.currentWebsite?.id === websiteId) {
          state.currentWebsite = updateStatus(state.currentWebsite);
        }
      })
      .addCase(publishWebsite.rejected, (state, action) => {
        state.loading.publish = false;
        state.error.publish = action.payload;
      })

      // Unpublish website
      .addCase(unpublishWebsite.fulfilled, (state, action) => {
        const { websiteId } = action.payload;

        const updateStatus = (website) => {
          if (website && website.id === websiteId) {
            return { ...website, status: "draft", published_at: null };
          }
          return website;
        };

        state.websites = state.websites.map(updateStatus);
        if (state.websiteDetails[websiteId]) {
          state.websiteDetails[websiteId] = updateStatus(
            state.websiteDetails[websiteId]
          );
        }
        if (state.currentWebsite?.id === websiteId) {
          state.currentWebsite = updateStatus(state.currentWebsite);
        }
      })

      // Website status
      .addCase(getWebsiteStatus.fulfilled, (state, action) => {
        const { websiteId, status } = action.payload;
        state.websiteStatuses[websiteId] = status;
      })

      // Fetch pages
      .addCase(fetchWebsitePages.pending, (state) => {
        state.loading.pages = true;
        state.error.pages = null;
      })
      .addCase(fetchWebsitePages.fulfilled, (state, action) => {
        state.loading.pages = false;
        const { websiteId, pages } = action.payload;
        state.websitePages[websiteId] = pages;
      })
      .addCase(fetchWebsitePages.rejected, (state, action) => {
        state.loading.pages = false;
        state.error.pages = action.payload;
      })

      // Fetch page
      .addCase(fetchPage.pending, (state) => {
        state.loading.pageDetails = true;
        state.error.pageDetails = null;
      })
      .addCase(fetchPage.fulfilled, (state, action) => {
        state.loading.pageDetails = false;
        const page = action.payload;
        state.pageDetails[page.id] = page;
      })
      .addCase(fetchPage.rejected, (state, action) => {
        state.loading.pageDetails = false;
        state.error.pageDetails = action.payload;
      })

      // Create page
      .addCase(createPage.fulfilled, (state, action) => {
        const { websiteId, page } = action.payload;
        if (!state.websitePages[websiteId]) {
          state.websitePages[websiteId] = [];
        }
        state.websitePages[websiteId].push(page);
      })

      // Update page
      .addCase(updatePage.fulfilled, (state, action) => {
        state.success.pageUpdate = true;
        const { websiteId, page } = action.payload;

        if (state.websitePages[websiteId]) {
          const index = state.websitePages[websiteId].findIndex(
            (p) => p.id === page.id
          );
          if (index !== -1) {
            state.websitePages[websiteId][index] = page;
          }
        }

        state.pageDetails[page.id] = page;

        if (state.currentPage?.id === page.id) {
          state.currentPage = page;
        }
      })

      // Delete page
      .addCase(deletePage.fulfilled, (state, action) => {
        const { websiteId, pageId } = action.payload;

        if (state.websitePages[websiteId]) {
          state.websitePages[websiteId] = state.websitePages[websiteId].filter(
            (p) => p.id !== pageId
          );
        }

        delete state.pageDetails[pageId];
        delete state.pageDrafts[pageId];

        if (state.currentPage?.id === pageId) {
          state.currentPage = null;
        }
      })

      // Update page content
      .addCase(updatePageContent.fulfilled, (state, action) => {
        const { pageId, content } = action.payload;

        if (state.pageDetails[pageId]) {
          state.pageDetails[pageId] = {
            ...state.pageDetails[pageId],
            ...content,
          };
        }

        if (state.currentPage?.id === pageId) {
          state.currentPage = { ...state.currentPage, ...content };
        }
      })

      // Save page draft
      .addCase(savePageDraft.fulfilled, (state, action) => {
        const { pageId, draft } = action.payload;
        state.pageDrafts[pageId] = draft;
      })

      // Publish page changes
      .addCase(publishPageChanges.fulfilled, (state, action) => {
        const { pageId } = action.payload;
        delete state.pageDrafts[pageId];

        if (state.pageDetails[pageId]) {
          state.pageDetails[pageId].has_draft = false;
        }
      })

      // Design settings
      .addCase(fetchDesignSettings.fulfilled, (state, action) => {
        const { websiteId, settings } = action.payload;
        state.designSettings[websiteId] = settings;
      })

      .addCase(updateDesignSettings.pending, (state) => {
        state.loading.designSettings = true;
        state.error.designSettings = null;
        state.success.designUpdate = false;
      })
      .addCase(updateDesignSettings.fulfilled, (state, action) => {
        state.loading.designSettings = false;
        state.success.designUpdate = true;
        const { websiteId, settings } = action.payload;
        state.designSettings[websiteId] = settings;
      })
      .addCase(updateDesignSettings.rejected, (state, action) => {
        state.loading.designSettings = false;
        state.error.designSettings = action.payload;
      })

      // SEO settings
      .addCase(fetchSEOSettings.fulfilled, (state, action) => {
        const { websiteId, seo } = action.payload;
        state.seoSettings[websiteId] = seo;
      })

      .addCase(updateSEOSettings.fulfilled, (state, action) => {
        state.success.seoUpdate = true;
        const { websiteId, seo } = action.payload;
        state.seoSettings[websiteId] = seo;
      })

      // Domain management
      .addCase(connectCustomDomain.fulfilled, (state, action) => {
        state.success.domainConnect = true;
        const { websiteId, domain } = action.payload;
        state.domainSettings[websiteId] = domain;
      })

      .addCase(verifyDomain.fulfilled, (state, action) => {
        const { websiteId, verification } = action.payload;
        if (state.domainSettings[websiteId]) {
          state.domainSettings[websiteId] = {
            ...state.domainSettings[websiteId],
            verification_status: verification.status,
          };
        }
      })

      // Backups
      .addCase(fetchWebsiteBackups.fulfilled, (state, action) => {
        const { websiteId, backups } = action.payload;
        state.websiteBackups[websiteId] = backups;
      })

      .addCase(createWebsiteBackup.fulfilled, (state, action) => {
        state.success.backup = true;
        const { websiteId, backup } = action.payload;
        if (!state.websiteBackups[websiteId]) {
          state.websiteBackups[websiteId] = [];
        }
        state.websiteBackups[websiteId].unshift(backup);
      })

      .addCase(restoreWebsiteBackup.fulfilled, (state, action) => {
        state.success.restore = true;
      });
  },
});

export const {
  clearError,
  clearAllErrors,
  clearSuccessFlags,
  setCurrentWebsite,
  clearCurrentWebsite,
  setCurrentPage,
  clearCurrentPage,
  updateWebsiteLocal,
  updatePageLocal,
  updateDesignSettingsLocal,
  saveDraftLocal,
  clearDraft,
  toggleWebsiteSelection,
  selectAllWebsites,
  clearWebsiteSelection,
  setCurrentView,
  updateSortSettings,
  setFilterStatus,
  clearWebsiteDetails,
} = websiteSlice.actions;

// Selectors
export const selectWebsite = (state) => state.website;
export const selectWebsites = (state) => state.website.websites;
export const selectCurrentWebsite = (state) => state.website.currentWebsite;
export const selectWebsiteDetails = (state, websiteId) =>
  state.website.websiteDetails[websiteId];
export const selectWebsitePages = (state, websiteId) =>
  state.website.websitePages[websiteId];
export const selectCurrentPage = (state) => state.website.currentPage;
export const selectPageDetails = (state, pageId) =>
  state.website.pageDetails[pageId];
export const selectPageDraft = (state, pageId) =>
  state.website.pageDrafts[pageId];
export const selectDesignSettings = (state, websiteId) =>
  state.website.designSettings[websiteId];
export const selectSEOSettings = (state, websiteId) =>
  state.website.seoSettings[websiteId];
export const selectDomainSettings = (state, websiteId) =>
  state.website.domainSettings[websiteId];
export const selectWebsiteBackups = (state, websiteId) =>
  state.website.websiteBackups[websiteId];
export const selectSelectedWebsites = (state) => state.website.selectedWebsites;
export const selectWebsiteLoading = (state) => state.website.loading;
export const selectWebsiteError = (state) => state.website.error;
export const selectWebsiteSuccess = (state) => state.website.success;
export const selectUISettings = (state) => ({
  currentView: state.website.currentView,
  sortBy: state.website.sortBy,
  sortOrder: state.website.sortOrder,
  filterStatus: state.website.filterStatus,
});

export default websiteSlice.reducer;
