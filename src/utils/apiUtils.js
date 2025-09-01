// utils/apiUtils.js
export const createApiConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { data, status } = error.response;
    return {
      message: data?.message || data?.detail || `HTTP ${status} Error`,
      status,
      data: data || {},
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: "Network error - please check your connection",
      status: 0,
      data: {},
    };
  } else {
    // Something else happened
    return {
      message: error.message || "An unexpected error occurred",
      status: 0,
      data: {},
    };
  }
};

export const buildQueryString = (params) => {
  const filteredParams = Object.entries(params)
    .filter(
      ([_, value]) => value !== null && value !== undefined && value !== ""
    )
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  return new URLSearchParams(filteredParams).toString();
};

export const parseApiResponse = (response, defaultValue = []) => {
  if (!response) return defaultValue;

  // Handle paginated responses
  if (response.results) {
    return {
      data: response.results,
      pagination: {
        count: response.count,
        next: response.next,
        previous: response.previous,
        currentPage: response.current_page || 1,
        totalPages:
          response.total_pages ||
          Math.ceil(response.count / (response.page_size || 20)),
        hasMore: !!response.next,
      },
    };
  }

  // Handle direct array responses
  if (Array.isArray(response)) {
    return { data: response, pagination: null };
  }

  // Handle single object responses
  return { data: response, pagination: null };
};
