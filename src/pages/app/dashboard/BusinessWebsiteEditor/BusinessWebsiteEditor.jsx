import { Zap } from "lucide-react";
import styles from "./BusinessWebsiteEditor.module.css";
import EditorSidebar from "./EditorSidebar/EditorSidebar";
import PageEditor from "./PageEditor/PageEditor";
import FeaturesModal from "./FeaturesModal/FeaturesModal";
import EditorHeader from "./EditorHeader/EditorHeader";
import { useEditor } from "./useEditor";

const BusinessWebsiteEditor = () => {
  // TEMPO

  const templateId = "restaurant-template-001";

  // END TEMPO

  const editorConf = useEditor(templateId);

  return (
    <div className={styles.websiteEditor}>
      {/* Header */}
      <EditorHeader conf={editorConf} />

      {/* Editor Content */}
      <div className={styles.editorContent}>
        {editorConf.isAdvancedOpen && <EditorSidebar conf={editorConf} />}
        <PageEditor conf={editorConf} />
      </div>

      {/* Features Configuration Modal */}
      {editorConf.showFeaturesModal && <FeaturesModal conf={editorConf} />}

      {/* Loading Overlay */}
      {editorConf.loading.websiteDetails && (
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
