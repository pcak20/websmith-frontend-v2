// hooks/useCommonActions.js
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useCommonActions = () => {
  const navigate = useNavigate();

  const handleTemplateAction = useCallback(
    async (action, template, customActions = {}) => {
      try {
        switch (action) {
          case "view":
          case "preview":
            if (customActions.onPreview) {
              await customActions.onPreview(template);
            } else {
              window.open(`/templates/${template.slug}/preview`, "_blank");
            }
            break;
          case "edit":
            if (customActions.onEdit) {
              await customActions.onEdit(template);
            } else {
              navigate(`/templates/${template.id}/edit`);
            }
            break;
          case "use":
          case "install":
            if (customActions.onUse) {
              await customActions.onUse(template);
            }
            break;
          case "like":
            if (customActions.onLike) {
              await customActions.onLike(template);
            }
            break;
          case "duplicate":
            if (customActions.onDuplicate) {
              await customActions.onDuplicate(template);
            }
            break;
          case "delete":
            if (
              window.confirm(
                "Are you sure you want to delete this template?"
              ) &&
              customActions.onDelete
            ) {
              await customActions.onDelete(template);
            }
            break;
          default:
            console.warn(`Unknown template action: ${action}`);
        }
      } catch (error) {
        console.error(`Template ${action} failed:`, error);
        if (customActions.onError) {
          customActions.onError(error, action, template);
        }
      }
    },
    [navigate]
  );

  const handleBusinessAction = useCallback(
    async (action, business, customActions = {}) => {
      try {
        switch (action) {
          case "view":
            if (customActions.onView) {
              await customActions.onView(business);
            } else {
              navigate(`/dashboard/businesses/${business.id}`);
            }
            break;
          case "edit":
            if (customActions.onEdit) {
              await customActions.onEdit(business);
            } else {
              navigate(`/dashboard/businesses/${business.id}/edit`);
            }
            break;
          case "settings":
            if (customActions.onSettings) {
              await customActions.onSettings(business);
            } else {
              navigate(`/dashboard/businesses/${business.id}/settings`);
            }
            break;
          case "delete":
            if (
              window.confirm(
                "Are you sure you want to delete this business?"
              ) &&
              customActions.onDelete
            ) {
              await customActions.onDelete(business);
            }
            break;
          default:
            console.warn(`Unknown business action: ${action}`);
        }
      } catch (error) {
        console.error(`Business ${action} failed:`, error);
        if (customActions.onError) {
          customActions.onError(error, action, business);
        }
      }
    },
    [navigate]
  );

  const handleWebsiteAction = useCallback(
    async (action, website, customActions = {}) => {
      try {
        switch (action) {
          case "view":
          case "preview":
            if (customActions.onPreview) {
              await customActions.onPreview(website);
            } else {
              const url =
                website.custom_domain ||
                website.url ||
                `${website.subdomain}.webcraft.com`;
              window.open(`https://${url}`, "_blank");
            }
            break;
          case "edit":
            if (customActions.onEdit) {
              await customActions.onEdit(website);
            } else {
              navigate(`/websites/${website.id}/editor`);
            }
            break;
          case "settings":
            if (customActions.onSettings) {
              await customActions.onSettings(website);
            } else {
              navigate(`/websites/${website.id}/settings`);
            }
            break;
          case "analytics":
            if (customActions.onAnalytics) {
              await customActions.onAnalytics(website);
            } else {
              navigate(`/websites/${website.id}/analytics`);
            }
            break;
          case "duplicate":
            if (customActions.onDuplicate) {
              await customActions.onDuplicate(website);
            }
            break;
          case "delete":
            if (
              window.confirm("Are you sure you want to delete this website?") &&
              customActions.onDelete
            ) {
              await customActions.onDelete(website);
            }
            break;
          default:
            console.warn(`Unknown website action: ${action}`);
        }
      } catch (error) {
        console.error(`Website ${action} failed:`, error);
        if (customActions.onError) {
          customActions.onError(error, action, website);
        }
      }
    },
    [navigate]
  );

  return {
    handleTemplateAction,
    handleBusinessAction,
    handleWebsiteAction,
  };
};
