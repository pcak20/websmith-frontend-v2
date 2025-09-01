// store/slices/mediaSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mediaAPI } from "../api/mediaAPI";

// File Management
export const fetchMediaFiles = createAsyncThunk(
  "media/fetchMediaFiles",
  async (
    { businessId, fileType = "all", page = 1, folderId = null },
    { rejectWithValue }
  ) => {
    try {
      const response = await mediaAPI.getMediaFiles(businessId, {
        file_type: fileType,
        page,
        folder: folderId,
      });
      return { ...response.data, page, folderId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch media files"
      );
    }
  }
);

export const fetchMediaFile = createAsyncThunk(
  "media/fetchMediaFile",
  async (fileId, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.getMediaFile(fileId);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch file details");
    }
  }
);

export const uploadMediaFile = createAsyncThunk(
  "media/uploadMediaFile",
  async (
    { businessId, file, metadata = {}, folderId = null },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("business", businessId);
      if (folderId) formData.append("folder", folderId);

      Object.keys(metadata).forEach((key) => {
        formData.append(key, metadata[key]);
      });

      const uploadId = `${file.name}_${Date.now()}`;
      dispatch(
        startUpload({ uploadId, fileName: file.name, fileSize: file.size })
      );

      const response = await mediaAPI.uploadFile(formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          dispatch(updateUploadProgress({ uploadId, progress }));
        },
      });

      dispatch(completeUpload(uploadId));
      return { ...response.data, uploadId };
    } catch (error) {
      const uploadId = action.meta.arg?.uploadId;
      if (uploadId) {
        dispatch(
          failUpload({
            uploadId,
            error: error.response?.data?.message || "Upload failed",
          })
        );
      }
      return rejectWithValue(error.response?.data?.message || "Upload failed");
    }
  }
);

export const uploadMultipleFiles = createAsyncThunk(
  "media/uploadMultipleFiles",
  async (
    { businessId, files, folderId = null },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("business", businessId);
      if (folderId) formData.append("folder", folderId);

      const response = await mediaAPI.uploadMultipleFiles(formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          dispatch(updateBulkUploadProgress(progress));
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to upload files");
    }
  }
);

export const deleteMediaFile = createAsyncThunk(
  "media/deleteMediaFile",
  async (fileId, { rejectWithValue }) => {
    try {
      await mediaAPI.deleteFile(fileId);
      return fileId;
    } catch (error) {
      return rejectWithValue("Failed to delete file");
    }
  }
);

export const bulkDeleteFiles = createAsyncThunk(
  "media/bulkDeleteFiles",
  async (fileIds, { rejectWithValue }) => {
    try {
      await mediaAPI.bulkDelete(fileIds);
      return fileIds;
    } catch (error) {
      return rejectWithValue("Failed to delete files");
    }
  }
);

// Folder Management
export const fetchFolders = createAsyncThunk(
  "media/fetchFolders",
  async (businessId, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.getFolders(businessId);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch folders");
    }
  }
);

export const createFolder = createAsyncThunk(
  "media/createFolder",
  async ({ businessId, name, parentId = null }, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.createFolder(businessId, name, parentId);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create folder");
    }
  }
);

export const deleteFolder = createAsyncThunk(
  "media/deleteFolder",
  async (folderId, { rejectWithValue }) => {
    try {
      await mediaAPI.deleteFolder(folderId);
      return folderId;
    } catch (error) {
      return rejectWithValue("Failed to delete folder");
    }
  }
);

// Image Processing
export const resizeImage = createAsyncThunk(
  "media/resizeImage",
  async (
    { fileId, width, height, maintainAspectRatio = true },
    { rejectWithValue }
  ) => {
    try {
      const response = await mediaAPI.resizeImage(
        fileId,
        width,
        height,
        maintainAspectRatio
      );
      return { fileId, processedImage: response.data };
    } catch (error) {
      return rejectWithValue("Failed to resize image");
    }
  }
);

export const cropImage = createAsyncThunk(
  "media/cropImage",
  async ({ fileId, x, y, width, height }, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.cropImage(fileId, x, y, width, height);
      return { fileId, processedImage: response.data };
    } catch (error) {
      return rejectWithValue("Failed to crop image");
    }
  }
);

export const optimizeImage = createAsyncThunk(
  "media/optimizeImage",
  async ({ fileId, quality = 80 }, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.optimizeImage(fileId, quality);
      return { fileId, optimizedImage: response.data };
    } catch (error) {
      return rejectWithValue("Failed to optimize image");
    }
  }
);

// Search and Filtering
export const searchMediaFiles = createAsyncThunk(
  "media/searchMediaFiles",
  async ({ businessId, query, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.searchFiles(businessId, query, filters);
      return response.data;
    } catch (error) {
      return rejectWithValue("Search failed");
    }
  }
);

// Storage Management
export const fetchStorageInfo = createAsyncThunk(
  "media/fetchStorageInfo",
  async (businessId, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.getStorageInfo(businessId);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch storage info");
    }
  }
);

const initialState = {
  // File data
  files: [],
  fileDetails: {}, // fileId -> detailed file data
  selectedFiles: [], // For bulk operations

  // Folder data
  folders: [],
  currentFolder: null,
  folderTree: [],

  // Search and filtering
  searchResults: [],
  searchQuery: "",
  currentFilters: {
    fileType: "all",
    dateRange: "all",
    size: "all",
    sortBy: "created_at",
    sortOrder: "desc",
  },

  // Upload management
  uploads: {}, // uploadId -> upload state
  bulkUploadProgress: 0,
  activeUploads: [],

  // Processing states
  processingFiles: {}, // fileId -> processing state

  // Storage information
  storageInfo: {
    used: 0,
    total: 0,
    percentage: 0,
    breakdown: {},
  },

  // Pagination
  totalCount: 0,
  currentPage: 1,
  hasMore: false,

  // Loading states
  loading: {
    files: false,
    fileDetails: false,
    folders: false,
    upload: false,
    bulkUpload: false,
    delete: false,
    bulkDelete: false,
    search: false,
    storage: false,
    processing: false,
  },

  // Error states
  error: {
    files: null,
    fileDetails: null,
    folders: null,
    upload: null,
    bulkUpload: null,
    delete: null,
    bulkDelete: null,
    search: null,
    storage: null,
    processing: null,
  },

  // Success states
  success: {
    upload: false,
    bulkUpload: false,
    delete: false,
    bulkDelete: false,
    folderCreate: false,
    processing: false,
  },

  // UI states
  viewMode: "grid", // "grid" | "list"
  selectedView: "all", // "all" | "images" | "videos" | "documents"
  showHiddenFiles: false,
};

const mediaSlice = createSlice({
  name: "media",
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

    // File selection
    selectFile: (state, action) => {
      const fileId = action.payload;
      if (!state.selectedFiles.includes(fileId)) {
        state.selectedFiles.push(fileId);
      }
    },

    deselectFile: (state, action) => {
      state.selectedFiles = state.selectedFiles.filter(
        (id) => id !== action.payload
      );
    },

    toggleFileSelection: (state, action) => {
      const fileId = action.payload;
      const index = state.selectedFiles.indexOf(fileId);
      if (index > -1) {
        state.selectedFiles.splice(index, 1);
      } else {
        state.selectedFiles.push(fileId);
      }
    },

    selectAllFiles: (state) => {
      state.selectedFiles = state.files.map((file) => file.id);
    },

    clearFileSelection: (state) => {
      state.selectedFiles = [];
    },

    // Upload management
    startUpload: (state, action) => {
      const { uploadId, fileName, fileSize } = action.payload;
      state.uploads[uploadId] = {
        id: uploadId,
        fileName,
        fileSize,
        progress: 0,
        status: "uploading",
        startTime: Date.now(),
      };
      state.activeUploads.push(uploadId);
    },

    updateUploadProgress: (state, action) => {
      const { uploadId, progress } = action.payload;
      if (state.uploads[uploadId]) {
        state.uploads[uploadId].progress = progress;
      }
    },

    completeUpload: (state, action) => {
      const uploadId = action.payload;
      if (state.uploads[uploadId]) {
        state.uploads[uploadId].status = "completed";
        state.uploads[uploadId].endTime = Date.now();
      }
      state.activeUploads = state.activeUploads.filter((id) => id !== uploadId);
    },

    failUpload: (state, action) => {
      const { uploadId, error } = action.payload;
      if (state.uploads[uploadId]) {
        state.uploads[uploadId].status = "failed";
        state.uploads[uploadId].error = error;
        state.uploads[uploadId].endTime = Date.now();
      }
      state.activeUploads = state.activeUploads.filter((id) => id !== uploadId);
    },

    clearCompletedUploads: (state) => {
      Object.keys(state.uploads).forEach((uploadId) => {
        if (state.uploads[uploadId].status === "completed") {
          delete state.uploads[uploadId];
        }
      });
    },

    clearFailedUploads: (state) => {
      Object.keys(state.uploads).forEach((uploadId) => {
        if (state.uploads[uploadId].status === "failed") {
          delete state.uploads[uploadId];
        }
      });
    },

    updateBulkUploadProgress: (state, action) => {
      state.bulkUploadProgress = action.payload;
    },

    resetBulkUploadProgress: (state) => {
      state.bulkUploadProgress = 0;
    },

    // Folder navigation
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
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
        fileType: "all",
        dateRange: "all",
        size: "all",
        sortBy: "created_at",
        sortOrder: "desc",
      };
      state.searchQuery = "";
    },

    // View management
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },

    setSelectedView: (state, action) => {
      state.selectedView = action.payload;
    },

    toggleHiddenFiles: (state) => {
      state.showHiddenFiles = !state.showHiddenFiles;
    },

    // Processing management
    startProcessing: (state, action) => {
      const { fileId, operation } = action.payload;
      state.processingFiles[fileId] = {
        operation,
        status: "processing",
        startTime: Date.now(),
      };
    },

    completeProcessing: (state, action) => {
      const { fileId, result } = action.payload;
      if (state.processingFiles[fileId]) {
        state.processingFiles[fileId].status = "completed";
        state.processingFiles[fileId].result = result;
        state.processingFiles[fileId].endTime = Date.now();
      }
    },

    failProcessing: (state, action) => {
      const { fileId, error } = action.payload;
      if (state.processingFiles[fileId]) {
        state.processingFiles[fileId].status = "failed";
        state.processingFiles[fileId].error = error;
        state.processingFiles[fileId].endTime = Date.now();
      }
    },

    clearProcessingHistory: (state) => {
      state.processingFiles = {};
    },

    // Data management
    clearFiles: (state) => {
      state.files = [];
      state.currentPage = 1;
      state.hasMore = false;
      state.totalCount = 0;
    },

    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch files
      .addCase(fetchMediaFiles.pending, (state, action) => {
        state.loading.files = true;
        state.error.files = null;

        // Clear files if it's a new search or folder change
        if (action.meta.arg?.page === 1) {
          state.files = [];
        }
      })
      .addCase(fetchMediaFiles.fulfilled, (state, action) => {
        state.loading.files = false;
        const { results, count, has_more, page } = action.payload;

        if (page === 1) {
          state.files = results;
        } else {
          state.files = [...state.files, ...results];
        }

        state.totalCount = count;
        state.currentPage = page;
        state.hasMore = has_more;
        state.error.files = null;
      })
      .addCase(fetchMediaFiles.rejected, (state, action) => {
        state.loading.files = false;
        state.error.files = action.payload;
      })

      // Fetch file details
      .addCase(fetchMediaFile.pending, (state) => {
        state.loading.fileDetails = true;
        state.error.fileDetails = null;
      })
      .addCase(fetchMediaFile.fulfilled, (state, action) => {
        state.loading.fileDetails = false;
        const file = action.payload;
        state.fileDetails[file.id] = file;
      })
      .addCase(fetchMediaFile.rejected, (state, action) => {
        state.loading.fileDetails = false;
        state.error.fileDetails = action.payload;
      })

      // Upload file
      .addCase(uploadMediaFile.pending, (state) => {
        state.loading.upload = true;
        state.error.upload = null;
        state.success.upload = false;
      })
      .addCase(uploadMediaFile.fulfilled, (state, action) => {
        state.loading.upload = false;
        state.success.upload = true;

        const { uploadId, ...fileData } = action.payload;
        state.files.unshift(fileData);
        state.totalCount += 1;

        // Clean up upload tracking
        if (uploadId && state.uploads[uploadId]) {
          delete state.uploads[uploadId];
        }
      })
      .addCase(uploadMediaFile.rejected, (state, action) => {
        state.loading.upload = false;
        state.error.upload = action.payload;
        state.success.upload = false;
      })

      // Upload multiple files
      .addCase(uploadMultipleFiles.pending, (state) => {
        state.loading.bulkUpload = true;
        state.error.bulkUpload = null;
        state.success.bulkUpload = false;
        state.bulkUploadProgress = 0;
      })
      .addCase(uploadMultipleFiles.fulfilled, (state, action) => {
        state.loading.bulkUpload = false;
        state.success.bulkUpload = true;
        state.bulkUploadProgress = 100;

        // Add uploaded files to the beginning
        const uploadedFiles = action.payload.files || [];
        state.files = [...uploadedFiles, ...state.files];
        state.totalCount += uploadedFiles.length;
      })
      .addCase(uploadMultipleFiles.rejected, (state, action) => {
        state.loading.bulkUpload = false;
        state.error.bulkUpload = action.payload;
        state.success.bulkUpload = false;
        state.bulkUploadProgress = 0;
      })

      // Delete file
      .addCase(deleteMediaFile.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteMediaFile.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.success.delete = true;

        const fileId = action.payload;
        state.files = state.files.filter((file) => file.id !== fileId);
        state.selectedFiles = state.selectedFiles.filter((id) => id !== fileId);
        delete state.fileDetails[fileId];
        state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteMediaFile.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload;
      })

      // Bulk delete files
      .addCase(bulkDeleteFiles.pending, (state) => {
        state.loading.bulkDelete = true;
        state.error.bulkDelete = null;
      })
      .addCase(bulkDeleteFiles.fulfilled, (state, action) => {
        state.loading.bulkDelete = false;
        state.success.bulkDelete = true;

        const deletedIds = action.payload;
        state.files = state.files.filter(
          (file) => !deletedIds.includes(file.id)
        );
        state.selectedFiles = state.selectedFiles.filter(
          (id) => !deletedIds.includes(id)
        );

        // Clean up file details
        deletedIds.forEach((id) => {
          delete state.fileDetails[id];
        });

        state.totalCount = Math.max(0, state.totalCount - deletedIds.length);
      })
      .addCase(bulkDeleteFiles.rejected, (state, action) => {
        state.loading.bulkDelete = false;
        state.error.bulkDelete = action.payload;
      })

      // Folders
      .addCase(fetchFolders.pending, (state) => {
        state.loading.folders = true;
        state.error.folders = null;
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.loading.folders = false;
        state.folders = action.payload;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.loading.folders = false;
        state.error.folders = action.payload;
      })

      .addCase(createFolder.fulfilled, (state, action) => {
        state.folders.push(action.payload);
        state.success.folderCreate = true;
      })

      .addCase(deleteFolder.fulfilled, (state, action) => {
        const folderId = action.payload;
        state.folders = state.folders.filter(
          (folder) => folder.id !== folderId
        );
        if (state.currentFolder?.id === folderId) {
          state.currentFolder = null;
        }
      })

      // Image processing
      .addCase(resizeImage.pending, (state, action) => {
        const fileId = action.meta.arg.fileId;
        state.loading.processing = true;
        state.error.processing = null;
        state.processingFiles[fileId] = {
          operation: "resize",
          status: "processing",
          startTime: Date.now(),
        };
      })
      .addCase(resizeImage.fulfilled, (state, action) => {
        state.loading.processing = false;
        state.success.processing = true;

        const { fileId, processedImage } = action.payload;

        // Update file in the list
        const fileIndex = state.files.findIndex((f) => f.id === fileId);
        if (fileIndex !== -1) {
          state.files[fileIndex] = {
            ...state.files[fileIndex],
            ...processedImage,
          };
        }

        // Update file details
        if (state.fileDetails[fileId]) {
          state.fileDetails[fileId] = {
            ...state.fileDetails[fileId],
            ...processedImage,
          };
        }

        // Update processing state
        if (state.processingFiles[fileId]) {
          state.processingFiles[fileId].status = "completed";
          state.processingFiles[fileId].result = processedImage;
          state.processingFiles[fileId].endTime = Date.now();
        }
      })
      .addCase(resizeImage.rejected, (state, action) => {
        state.loading.processing = false;
        state.error.processing = action.payload;

        const fileId = action.meta.arg.fileId;
        if (state.processingFiles[fileId]) {
          state.processingFiles[fileId].status = "failed";
          state.processingFiles[fileId].error = action.payload;
          state.processingFiles[fileId].endTime = Date.now();
        }
      })

      // Similar patterns for crop and optimize...
      .addCase(cropImage.fulfilled, (state, action) => {
        const { fileId, processedImage } = action.payload;
        const fileIndex = state.files.findIndex((f) => f.id === fileId);
        if (fileIndex !== -1) {
          state.files[fileIndex] = {
            ...state.files[fileIndex],
            ...processedImage,
          };
        }
      })

      .addCase(optimizeImage.fulfilled, (state, action) => {
        const { fileId, optimizedImage } = action.payload;
        const fileIndex = state.files.findIndex((f) => f.id === fileId);
        if (fileIndex !== -1) {
          state.files[fileIndex] = {
            ...state.files[fileIndex],
            ...optimizedImage,
          };
        }
      })

      // Search
      .addCase(searchMediaFiles.pending, (state) => {
        state.loading.search = true;
        state.error.search = null;
      })
      .addCase(searchMediaFiles.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload.results || [];
      })
      .addCase(searchMediaFiles.rejected, (state, action) => {
        state.loading.search = false;
        state.error.search = action.payload;
      })

      // Storage info
      .addCase(fetchStorageInfo.pending, (state) => {
        state.loading.storage = true;
        state.error.storage = null;
      })
      .addCase(fetchStorageInfo.fulfilled, (state, action) => {
        state.loading.storage = false;
        state.storageInfo = action.payload;
      })
      .addCase(fetchStorageInfo.rejected, (state, action) => {
        state.loading.storage = false;
        state.error.storage = action.payload;
      });
  },
});

export const {
  clearError,
  clearAllErrors,
  clearSuccessFlags,
  selectFile,
  deselectFile,
  toggleFileSelection,
  selectAllFiles,
  clearFileSelection,
  startUpload,
  updateUploadProgress,
  completeUpload,
  failUpload,
  clearCompletedUploads,
  clearFailedUploads,
  updateBulkUploadProgress,
  resetBulkUploadProgress,
  setCurrentFolder,
  setSearchQuery,
  updateFilters,
  clearFilters,
  setViewMode,
  setSelectedView,
  toggleHiddenFiles,
  startProcessing,
  completeProcessing,
  failProcessing,
  clearProcessingHistory,
  clearFiles,
  clearSearchResults,
} = mediaSlice.actions;

// Selectors
export const selectMedia = (state) => state.media;
export const selectMediaFiles = (state) => state.media.files;
export const selectFileDetails = (state, fileId) =>
  state.media.fileDetails[fileId];
export const selectSelectedFiles = (state) => state.media.selectedFiles;
export const selectFolders = (state) => state.media.folders;
export const selectCurrentFolder = (state) => state.media.currentFolder;
export const selectUploads = (state) => state.media.uploads;
export const selectActiveUploads = (state) => state.media.activeUploads;
export const selectProcessingFiles = (state) => state.media.processingFiles;
export const selectStorageInfo = (state) => state.media.storageInfo;
export const selectSearchResults = (state) => state.media.searchResults;
export const selectCurrentFilters = (state) => state.media.currentFilters;
export const selectMediaLoading = (state) => state.media.loading;
export const selectMediaError = (state) => state.media.error;
export const selectMediaSuccess = (state) => state.media.success;
export const selectViewSettings = (state) => ({
  viewMode: state.media.viewMode,
  selectedView: state.media.selectedView,
  showHiddenFiles: state.media.showHiddenFiles,
});

export default mediaSlice.reducer;
