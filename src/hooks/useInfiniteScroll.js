// ================================
// hooks/useInfiniteScroll.js
// ================================
import { useState, useEffect, useCallback } from "react";

export const useInfiniteScroll = (callback, threshold = 100) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - threshold
    ) {
      setIsFetching(true);
    }
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;

    const fetchMoreData = async () => {
      await callback();
      setIsFetching(false);
    };

    fetchMoreData();
  }, [isFetching, callback]);

  return [isFetching, setIsFetching];
};
