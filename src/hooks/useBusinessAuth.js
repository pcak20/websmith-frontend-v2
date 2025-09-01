// ================================
// hooks/useBusinessAuth.js
// ================================
import { useSelector, useDispatch } from "react-redux";
import {
  loginToBusiness,
  registerToBusiness,
  logoutFromBusiness,
  initiateWebCraftOAuth,
  handleWebCraftCallback,
  updateDataConsent,
  fetchSharedData,
  fetchBusinessProfile,
  updateBusinessProfile,
  clearError,
  clearSuccessFlags,
  setBusinessSession,
  clearBusinessSession,
  selectBusinessAuth,
  selectBusinessSession,
  selectIsBusinessAuthenticated,
  selectBusinessUser,
  selectSharedData,
  selectConsentSettings,
  selectBusinessAuthLoading,
  selectBusinessAuthError,
  selectBusinessAuthSuccess,
} from "../store/slices/businessAuthSlice";

export const useBusinessAuth = (websiteId) => {
  const dispatch = useDispatch();
  const businessAuth = useSelector(selectBusinessAuth);
  const session = useSelector((state) =>
    selectBusinessSession(state, websiteId)
  );
  const isAuthenticated = useSelector((state) =>
    selectIsBusinessAuthenticated(state, websiteId)
  );
  const user = useSelector((state) => selectBusinessUser(state, websiteId));
  const sharedData = useSelector((state) => selectSharedData(state, websiteId));
  const consentSettings = useSelector((state) =>
    selectConsentSettings(state, websiteId)
  );
  const loading = useSelector(selectBusinessAuthLoading);
  const error = useSelector(selectBusinessAuthError);
  const success = useSelector(selectBusinessAuthSuccess);

  const login = async (authMethod, credentials) => {
    const result = await dispatch(
      loginToBusiness({ websiteId, authMethod, credentials })
    );
    return result;
  };

  const register = async (userData) => {
    const result = await dispatch(registerToBusiness({ websiteId, userData }));
    return result;
  };

  const logout = async () => {
    const result = await dispatch(logoutFromBusiness(websiteId));
    return result;
  };

  const initiateWebCraftConnection = async (
    scope = ["profile", "addresses", "payments"]
  ) => {
    const result = await dispatch(initiateWebCraftOAuth({ websiteId, scope }));
    return result;
  };

  const handleWebCraftOAuthCallback = async (code, state) => {
    const result = await dispatch(
      handleWebCraftCallback({ websiteId, code, state })
    );
    return result;
  };

  const updateConsent = async (consentData) => {
    const result = await dispatch(
      updateDataConsent({ websiteId, consentData })
    );
    return result;
  };

  const getSharedData = async () => {
    const result = await dispatch(fetchSharedData(websiteId));
    return result;
  };

  const getProfile = async () => {
    const result = await dispatch(fetchBusinessProfile(websiteId));
    return result;
  };

  const updateProfile = async (profileData) => {
    const result = await dispatch(
      updateBusinessProfile({ websiteId, profileData })
    );
    return result;
  };

  const clearBusinessError = (errorType) => {
    dispatch(clearError(errorType));
  };

  const clearBusinessSuccessFlags = (successType) => {
    dispatch(clearSuccessFlags(successType));
  };

  const setSession = (sessionData) => {
    dispatch(setBusinessSession({ websiteId, ...sessionData }));
  };

  const clearSession = () => {
    dispatch(clearBusinessSession(websiteId));
  };

  return {
    // State
    businessAuth,
    session,
    isAuthenticated,
    user,
    sharedData,
    consentSettings,
    loading,
    error,
    success,
    websiteId,

    // Actions
    login,
    register,
    logout,
    initiateWebCraftOAuth: initiateWebCraftConnection,
    handleWebCraftCallback: handleWebCraftOAuthCallback,
    updateConsent,
    fetchSharedData: getSharedData,
    fetchProfile: getProfile,
    updateProfile,
    clearError: clearBusinessError,
    clearSuccessFlags: clearBusinessSuccessFlags,
    setBusinessSession: setSession,
    clearBusinessSession: clearSession,
  };
};
