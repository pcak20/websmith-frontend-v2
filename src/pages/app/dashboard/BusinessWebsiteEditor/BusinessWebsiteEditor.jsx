import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Zap } from "lucide-react";
import { useWebsite } from "../../../../hooks/useWebsite";
import styles from "./BusinessWebsiteEditor.module.css";
import { mockTemplatePages } from "../../../../utils/mockData";
import EditorSidebar from "./EditorSidebar/EditorSidebar";
import PageEditor from "./PageEditor/PageEditor";
import FeaturesModal from "./FeaturesModal/FeaturesModal";
import EditorHeader from "./EditorHeader/EditorHeader";
import { useEditor } from "./useEditor";

const BusinessWebsiteEditor = () => {
  const { websiteId } = useParams();
  const {
    currentWebsite,
    currentPage,
    fetchWebsiteDetails,
    fetchPages,
    updatePageContent,
    loading,
  } = useWebsite();

  const [websiteFeatures, handleFeatureToggle] = useEditor();

  // Editor state
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [showFeaturesModal, setShowFeaturesModal] = useState(false);

  // Page data state
  const [currentPageContent, setCurrentPageContent] = useState({});

  // Mock template data - in real app this would come from the website's template

  const [currentTemplatePage, setCurrentTemplatePage] = useState(
    mockTemplatePages[0]
  );

  useEffect(() => {
    if (websiteId) {
      fetchWebsiteDetails(websiteId);
      fetchPages(websiteId);
    }
  }, [websiteId]);

  const getEnabledPagesCount = () => {
    const pageFeatures = [
      "showAboutPage",
      "showServicesPage",
      "showGalleryPage",
      "showBlogPage",
      "showTestimonialsPage",
      "showFaqPage",
      "showPricingPage",
    ];
    return (
      pageFeatures.filter((feature) => websiteFeatures[feature]).length + 1
    ); // +1 for home page
  };

  const getEnabledFeaturesCount = () => {
    return Object.values(websiteFeatures).filter(Boolean).length;
  };

  const handleSaveChanges = async () => {
    if (currentPage && currentPageContent) {
      try {
        await updatePageContent(currentPage.id, currentPageContent);
        setUnsavedChanges(false);
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  const handlePreview = () => {
    if (currentWebsite) {
      window.open(currentWebsite.preview_url, "_blank");
    }
  };

  const handleElementAdd = (elementType) => {
    // Add element to current page
    const newElement = {
      id: `${elementType}_${Date.now()}`,
      type: elementType,
      content: getDefaultContent(elementType),
      styles: {},
    };

    setCurrentPageContent((prev) => ({
      ...prev,
      elements: [...(prev.elements || []), newElement],
    }));
    setUnsavedChanges(true);
  };

  const getDefaultContent = (elementType) => {
    const defaults = {
      text: { text: "Edit this text" },
      heading: { text: "Your Heading Here", level: "h2" },
      paragraph: { text: "Add your paragraph content here..." },
      button: { text: "Click Me", url: "#" },
      image: { src: "", alt: "Image description" },
      link: { text: "Link text", url: "#" },
    };
    return defaults[elementType] || {};
  };

  return (
    <div className={styles.websiteEditor}>
      {/* Header */}
      <EditorHeader
        currentWebsite={currentWebsite}
        currentTemplatePage={currentTemplatePage}
        unsavedChanges={unsavedChanges}
        onPreview={handlePreview}
        onSaveChanges={handleSaveChanges}
      />

      {/* Editor Content */}
      <div className={styles.editorContent}>
        <EditorSidebar
          currentTemplatePage={currentTemplatePage}
          getEnabledPagesCount={getEnabledPagesCount}
          getEnabledFeaturesCount={getEnabledFeaturesCount}
          websiteFeatures={websiteFeatures}
          onShowFeaturesModal={setShowFeaturesModal}
          onElementAdd={handleElementAdd}
          onFeatureToggle={handleFeatureToggle}
        />
        <PageEditor
          currentTemplatePage={currentTemplatePage}
          onPreview={handlePreview}
          onSaveChanges={handleSaveChanges}
          unsavedChanges={unsavedChanges}
        />
      </div>

      {/* Features Configuration Modal */}
      {showFeaturesModal && (
        <FeaturesModal
          websiteFeatures={websiteFeatures}
          getEnabledPagesCount={getEnabledPagesCount}
          getEnabledFeaturesCount={getEnabledFeaturesCount}
          onCloseModal={setShowFeaturesModal}
          onSaveChanges={handleSaveChanges}
        />
      )}

      {/* Loading Overlay */}
      {loading.websiteDetails && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}>
            <Zap size={24} />
            <span>Loading editor...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessWebsiteEditor;
