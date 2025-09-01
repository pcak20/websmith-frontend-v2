// utils/businessUtils.js
import {
  Utensils,
  Car,
  Store,
  Coffee,
  Scissors,
  Dumbbell,
  Heart,
  Home,
  Briefcase,
  Camera,
  Palette,
  ShoppingBag,
  Laptop,
  Book,
  Music,
  Plane,
  Building,
} from "lucide-react";

// Category icon mapping based on your Django business categories
export const getCategoryIcon = (categorySlug) => {
  const iconMap = {
    restaurant: Utensils,
    "vip-car-transfer": Car,
    retail: Store,
    cafe: Coffee,
    beauty: Scissors,
    fitness: Dumbbell,
    healthcare: Heart,
    "real-estate": Home,
    consulting: Briefcase,
    photography: Camera,
    creative: Palette,
    ecommerce: ShoppingBag,
    technology: Laptop,
    education: Book,
    entertainment: Music,
    travel: Plane,
  };

  return iconMap[categorySlug] || Building; // Default fallback icon
};

// Format business status for display
export const formatBusinessStatus = (status) => {
  const statusMap = {
    draft: "Draft",
    active: "Active",
    inactive: "Inactive",
    suspended: "Suspended",
  };

  return statusMap[status] || status;
};

// Format verification status for display
export const formatVerificationStatus = (verificationStatus) => {
  const statusMap = {
    unverified: "Unverified",
    pending: "Pending Verification",
    verified: "Verified",
    rejected: "Verification Rejected",
  };

  return statusMap[verificationStatus] || verificationStatus;
};

// Get status color for styling
export const getStatusColor = (status) => {
  const colorMap = {
    draft: "#fbbf24",
    active: "#10b981",
    inactive: "#64748b",
    suspended: "#ef4444",
    published: "#10b981",
    archived: "#64748b",
  };

  return colorMap[status] || "#64748b";
};

// Format business metrics for display
export const formatBusinessMetrics = (business) => {
  return {
    visitors: (business.total_visitors || 0).toLocaleString(),
    revenue: `$${(business.monthly_revenue || 0).toLocaleString()}`,
    websites: business.websites_count || 0,
    growth: business.monthly_growth ? `+${business.monthly_growth}%` : "0%",
    rating: business.average_rating || 0,
    reviews: business.total_reviews || 0,
  };
};

// Format address for display
export const formatBusinessAddress = (business) => {
  if (business.address?.full) {
    return business.address.full;
  }

  const parts = [
    business.address_line1,
    business.city,
    business.state,
    business.postal_code,
  ].filter(Boolean);

  return parts.join(", ") || "No address provided";
};

// Format social media handle from URL
export const formatSocialHandle = (url) => {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    const handle = urlObj.pathname.split("/").filter(Boolean).pop();
    return handle?.startsWith("@") ? handle : `@${handle}`;
  } catch {
    // If URL parsing fails, try to extract handle from string
    const handle = url.split("/").pop();
    return handle?.startsWith("@") ? handle : `@${handle}`;
  }
};

// Get category-specific default colors
export const getCategoryColor = (categorySlug) => {
  const colorMap = {
    restaurant: "#f59e0b",
    "vip-car-transfer": "#3b82f6",
    retail: "#10b981",
    cafe: "#92400e",
    beauty: "#ec4899",
    fitness: "#ef4444",
    healthcare: "#06b6d4",
    "real-estate": "#84cc16",
    consulting: "#6366f1",
    photography: "#f97316",
    creative: "#d946ef",
    ecommerce: "#0ea5e9",
    technology: "#64748b",
    education: "#7c3aed",
    entertainment: "#f43f5e",
    travel: "#06d6a0",
  };

  return colorMap[categorySlug] || "#64748b";
};

// Validate business data
export const validateBusinessData = (businessData) => {
  const errors = {};

  if (!businessData.name?.trim()) {
    errors.name = "Business name is required";
  }

  if (businessData.email && !isValidEmail(businessData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (businessData.phone && !isValidPhone(businessData.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (businessData.website && !isValidURL(businessData.website)) {
    errors.website = "Please enter a valid website URL";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Helper validation functions
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Generate business summary statistics
export const generateBusinessSummary = (businesses) => {
  return {
    total: businesses.length,
    active: businesses.filter((b) => b.status === "active").length,
    draft: businesses.filter((b) => b.status === "draft").length,
    totalWebsites: businesses.reduce(
      (sum, b) => sum + (b.websites_count || 0),
      0
    ),
    totalVisitors: businesses.reduce(
      (sum, b) => sum + (b.total_visitors || 0),
      0
    ),
    totalRevenue: businesses.reduce(
      (sum, b) => sum + (b.monthly_revenue || 0),
      0
    ),
    averageRating:
      businesses.length > 0
        ? businesses.reduce((sum, b) => sum + (b.average_rating || 0), 0) /
          businesses.length
        : 0,
  };
};

// Business search and filtering helpers
export const filterBusinesses = (businesses, filters) => {
  return businesses.filter((business) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (
        !business.name.toLowerCase().includes(searchLower) &&
        !business.description?.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      if (business.category?.slug !== filters.category) {
        return false;
      }
    }

    // Status filter
    if (filters.status && filters.status !== "all") {
      if (business.status !== filters.status) {
        return false;
      }
    }

    return true;
  });
};

// Sort businesses
export const sortBusinesses = (businesses, sortBy, sortOrder = "desc") => {
  return [...businesses].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "created_at":
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
        break;
      case "updated_at":
        aValue = new Date(a.updated_at);
        bValue = new Date(b.updated_at);
        break;
      case "rating":
        aValue = a.average_rating || 0;
        bValue = b.average_rating || 0;
        break;
      case "visitors":
        aValue = a.total_visitors || 0;
        bValue = b.total_visitors || 0;
        break;
      default:
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};
