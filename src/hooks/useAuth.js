// ================================
// hooks/useAuth.js
// ================================
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  enable2FA,
  logoutLocal,
  clearErrors,
  clearSuccessMessage,
  initializeAuth,
  selectAuth,
  selectIsAuthenticated,
  selectUser,
  selectIsLoading,
  selectErrors,
  selectIsInitialized,
} from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const errors = useSelector(selectErrors);
  const isInitialized = useSelector(selectIsInitialized);

  // Initialize auth on mount
  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, isInitialized]);

  const loginUser = async (credentials) => {
    const result = await dispatch(login(credentials));
    return result;
  };

  const registerUser = async (userData) => {
    const result = await dispatch(register(userData));
    return result;
  };

  const logoutUser = async () => {
    const result = await dispatch(logout());
    return result;
  };

  const logoutLocalUser = () => {
    dispatch(logoutLocal());
  };

  const forgotPasswordRequest = async (email) => {
    const result = await dispatch(forgotPassword({ email }));
    return result;
  };

  const resetPasswordRequest = async (token, password) => {
    const result = await dispatch(resetPassword({ token, password }));
    return result;
  };

  const verifyEmailRequest = async (token) => {
    const result = await dispatch(verifyEmail({ token }));
    return result;
  };

  const enable2FARequest = async () => {
    const result = await dispatch(enable2FA());
    return result;
  };

  const clearAuthErrors = () => {
    dispatch(clearErrors());
  };

  const clearAuthSuccessMessage = () => {
    dispatch(clearSuccessMessage());
  };

  return {
    // State
    auth,
    user,
    isAuthenticated,
    isLoading,
    errors,
    isInitialized,

    // Actions
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    logoutLocal: logoutLocalUser,
    forgotPassword: forgotPasswordRequest,
    resetPassword: resetPasswordRequest,
    verifyEmail: verifyEmailRequest,
    enable2FA: enable2FARequest,
    clearErrors: clearAuthErrors,
    clearSuccessMessage: clearAuthSuccessMessage,
  };
};
