import { useState } from "react";
import useFeatures from "./useFeatures";
import { useWebsite } from "../../../../hooks/useWebsite";
import useTemplate from "./useTemplate";

export const useEditor = (templateId) => {
  const templateData = useTemplate(templateId);

  const [properties, setProperties] = useState({
    theme: "default",
  });

  const handlePropertiesChange = (name, value) => {
    setProperties((prevProperties) => ({
      ...prevProperties,
      [name]: value,
    }));
  };

  const { loading, currentWebsite } = useWebsite();
  const [websiteFeatures, handleFeatureToggle] = useFeatures();

  // Editor state
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);

  // Mock template data - in real app this would come from the website's template

  const [currentTemplatePage, setCurrentTemplatePage] = useState(
    templateData.availablePages[0]
  );

  return {
    websiteFeatures,
    handleFeatureToggle,
    unsavedChanges,
    showFeaturesModal,
    currentTemplatePage,
    setShowFeaturesModal,
    setCurrentTemplatePage,
    currentWebsite,
    loading,
    properties,
    handlePropertiesChange,
    ...templateData,
  };
};
