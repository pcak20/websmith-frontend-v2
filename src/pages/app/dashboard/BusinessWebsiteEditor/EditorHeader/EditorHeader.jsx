import styles from "./EditorHeader.module.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Globe } from "lucide-react";
import AdvancedSettingsButton from "../PageEditor/EditorToolbar/AdvancedSettingsButton/AdvancedSettingsButton";
import UndoRedoButtons from "./UndoRedoButtons/UndoRedoButtons";

function EditorHeader({ conf }) {
  const navigate = useNavigate();
  const { currentWebsite, currentTemplatePage, unsavedChanges } = conf;

  return (
    <div className={styles.editorHeader}>
      <div className={styles.headerLeft}>
        <button
          className={styles.backBtn}
          onClick={() => navigate(`/dashboard/website/detail/${websiteId}`)}
        >
          <ArrowLeft size={20} />
          Back to Website
        </button>

        {/* Navigation Buttons */}

        <div className={styles.headerInfo}>
          <h1>{currentWebsite?.name || "Website Editor"}</h1>
          <span className={styles.headerSubtitle}>
            Editing: {currentTemplatePage.name} •{" "}
            {currentWebsite?.template || "Custom Template"}
          </span>
        </div>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.headerActions}>
          {unsavedChanges && (
            <span className={styles.unsavedIndicator}>
              <div className={styles.unsavedDot}></div>
              Unsaved changes
            </span>
          )}

          <UndoRedoButtons />

          <button className={styles.publishBtn} onClick={() => {}}>
            <Globe size={16} />
            Preview Live
          </button>

          <button className={styles.primaryBtn} onClick={() => {}}>
            <Save size={18} />
            Save & Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorHeader;
