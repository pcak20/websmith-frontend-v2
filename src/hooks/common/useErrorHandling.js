// hooks/useErrorHandling.js
import { useState, useCallback } from "react";

export const useErrorHandling = (initialErrors = {}) => {
  const [errors, setErrors] = useState(initialErrors);

  const setError = useCallback((key, error) => {
    setErrors((prev) => ({
      ...prev,
      [key]: error,
    }));
  }, []);

  const clearError = useCallback((key) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const withErrorHandling = useCallback(
    async (key, asyncFunction, customErrorHandler) => {
      clearError(key);
      try {
        const result = await asyncFunction();
        return result;
      } catch (error) {
        const errorMessage = customErrorHandler
          ? customErrorHandler(error)
          : error?.message ||
            error?.response?.data?.message ||
            "An error occurred";

        setError(key, errorMessage);
        throw error;
      }
    },
    [setError, clearError]
  );

  return {
    errors,
    setError,
    clearError,
    clearAllErrors,
    withErrorHandling,
  };
};
