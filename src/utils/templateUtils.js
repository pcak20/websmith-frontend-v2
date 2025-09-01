// utils/templateUtils.js
export const getTemplateStatusColor = (status) => {
  const colors = {
    published: "#10b981",
    draft: "#f59e0b",
    archived: "#6b7280",
    rejected: "#ef4444",
    review: "#3b82f6",
  };
  return colors[status] || "#6b7280";
};

export const getTemplatePricingColor = (tier) => {
  const colors = {
    free: "#10b981",
    premium: "#f59e0b",
    pro: "#8b5cf6",
    enterprise: "#ef4444",
  };
  return colors[tier] || "#6b7280";
};

export const calculateTemplateScore = (template) => {
  const weights = {
    rating: 0.3,
    downloads: 0.25,
    views: 0.15,
    likes: 0.1,
    recency: 0.2,
  };

  const normalizedRating = (template.average_rating || 0) / 5;
  const normalizedDownloads = Math.min(
    (template.downloads_count || 0) / 10000,
    1
  );
  const normalizedViews = Math.min((template.views_count || 0) / 100000, 1);
  const normalizedLikes = Math.min((template.likes_count || 0) / 1000, 1);

  const daysSinceUpdate = Math.floor(
    (Date.now() - new Date(template.updated_at)) / (1000 * 60 * 60 * 24)
  );
  const normalizedRecency = Math.max(0, 1 - daysSinceUpdate / 365);

  return (
    normalizedRating * weights.rating +
    normalizedDownloads * weights.downloads +
    normalizedViews * weights.views +
    normalizedLikes * weights.likes +
    normalizedRecency * weights.recency
  );
};

export const sortTemplates = (templates, sortBy, sortOrder = "desc") => {
  return [...templates].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "popularity":
        aValue = calculateTemplateScore(a);
        bValue = calculateTemplateScore(b);
        break;
      case "rating":
        aValue = a.average_rating || 0;
        bValue = b.average_rating || 0;
        break;
      case "downloads":
        aValue = a.downloads_count || 0;
        bValue = b.downloads_count || 0;
        break;
      case "recent":
        aValue = new Date(a.updated_at);
        bValue = new Date(b.updated_at);
        break;
      case "name":
        aValue = a.name?.toLowerCase() || "";
        bValue = b.name?.toLowerCase() || "";
        break;
      default:
        aValue = a[sortBy];
        bValue = b[sortBy];
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue?.toLowerCase() || "";
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};
