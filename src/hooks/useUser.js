// ================================
// hooks/useUser.js - FIXED VERSION
// ================================
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfileImage,
  deleteProfileImage,
  changePassword,
  updateUserPreferences,
  deleteAccount,
  exportUserData,
  getNotificationSettings,
  updateNotificationSettings,
  getSecuritySettings,
  getLoginHistory,
  terminateSession,
  getUsageStatistics,
  clearError,
  clearUpdateSuccess,
  clearPasswordChangeSuccess,
  clearImageUploadSuccess,
  clearExportSuccess,
  clearPreferencesUpdateSuccess,
  clearNotificationsUpdateSuccess,
  resetUserState,
  selectUserProfile,
  selectUserPreferences,
  selectNotificationSettings,
  selectSecuritySettings,
  selectUsageStats,
  selectLoginHistory,
  selectIsLoading,
  selectError,
} from "../store/slices/userSlice";

export const useUser = (autoFetch = true) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const preferences = useSelector(selectUserPreferences);
  const notificationSettings = useSelector(selectNotificationSettings);
  const securitySettings = useSelector(selectSecuritySettings);
  const usage = useSelector(selectUsageStats);
  const loginHistory = useSelector(selectLoginHistory);
  const isLoading = useSelector(selectIsLoading);
  const errorState = useSelector(selectError);

  // Get individual success flags from the user slice
  const updateSuccess = useSelector((state) => state.user.updateSuccess);
  const passwordChangeSuccess = useSelector(
    (state) => state.user.passwordChangeSuccess
  );
  const imageUploadSuccess = useSelector(
    (state) => state.user.imageUploadSuccess
  );
  const exportSuccess = useSelector((state) => state.user.exportSuccess);
  const isUpdating = useSelector((state) => state.user.isUpdating);
  const isUploadingImage = useSelector((state) => state.user.isUploadingImage);
  const isExporting = useSelector((state) => state.user.isExporting);

  // Auto-fetch profile on mount - ALWAYS fetch to ensure we have user data
  useEffect(() => {
    if (autoFetch) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, autoFetch]);

  const updateProfile = async (profileData) => {
    const result = await dispatch(updateUserProfile(profileData));
    return result;
  };

  const uploadAvatar = async (imageFile) => {
    const result = await dispatch(uploadProfileImage(imageFile));
    return result;
  };

  const deleteAvatar = async () => {
    const result = await dispatch(deleteProfileImage());
    return result;
  };

  const updatePassword = async (passwordData) => {
    const result = await dispatch(changePassword(passwordData));
    return result;
  };

  const updatePreferences = async (prefs) => {
    const result = await dispatch(updateUserPreferences(prefs));
    return result;
  };

  const updateNotifications = async (settings) => {
    const result = await dispatch(updateNotificationSettings(settings));
    return result;
  };

  const requestDataExport = async () => {
    const result = await dispatch(exportUserData());
    return result;
  };

  const deleteUserAccount = async (password) => {
    const result = await dispatch(deleteAccount({ password }));
    return result;
  };

  const fetchLoginHistory = async (params = {}) => {
    const result = await dispatch(getLoginHistory(params));
    return result;
  };

  const endSession = async (sessionId) => {
    const result = await dispatch(terminateSession(sessionId));
    return result;
  };

  const fetchUsageStats = async () => {
    const result = await dispatch(getUsageStatistics());
    return result;
  };

  const clearUserError = () => {
    dispatch(clearError());
  };

  const clearSuccess = () => {
    dispatch(clearUpdateSuccess());
    dispatch(clearPasswordChangeSuccess());
    dispatch(clearImageUploadSuccess());
    dispatch(clearExportSuccess());
    dispatch(clearPreferencesUpdateSuccess());
    dispatch(clearNotificationsUpdateSuccess());
  };

  const resetUser = () => {
    dispatch(resetUserState());
  };

  return {
    // User data - match what ProfilePage expects
    user: userProfile,

    // Loading states - match ProfilePage expectations
    loading: {
      update: isUpdating,
      password: isLoading,
      avatar: isUploadingImage,
      export: isExporting,
    },

    // Error states - match ProfilePage expectations
    error: {
      update: errorState,
      password: errorState,
      avatar: errorState,
    },

    // Success states - match ProfilePage expectations
    success: {
      update: updateSuccess,
      password: passwordChangeSuccess,
      avatar: imageUploadSuccess,
    },

    // Additional state
    preferences,
    notifications: notificationSettings,
    security: securitySettings,
    usage,
    loginHistory,

    // Actions
    fetchProfile: () => dispatch(fetchUserProfile()),
    updateProfile,
    uploadAvatar,
    deleteAvatar,
    updatePassword,
    updatePreferences,
    updateNotifications,
    exportUserData: requestDataExport,
    deleteAccount: deleteUserAccount,
    fetchLoginHistory,
    endSession,
    fetchUsageStats,
    fetchNotificationSettings: () => dispatch(getNotificationSettings()),
    fetchSecuritySettings: () => dispatch(getSecuritySettings()),
    clearError: clearUserError,
    clearSuccess,
    resetUser,
  };
};
