// hooks/useLoadingStates.js
import { useState, useCallback } from "react";

export const useLoadingStates = (initialStates = {}) => {
  const [loading, setLoading] = useState(initialStates);

  const setLoadingState = useCallback((key, isLoading) => {
    setLoading((prev) => ({
      ...prev,
      [key]: isLoading,
    }));
  }, []);

  const withLoading = useCallback(
    async (key, asyncFunction) => {
      setLoadingState(key, true);
      try {
        const result = await asyncFunction();
        return result;
      } finally {
        setLoadingState(key, false);
      }
    },
    [setLoadingState]
  );

  return {
    loading,
    setLoadingState,
    withLoading,
  };
};
