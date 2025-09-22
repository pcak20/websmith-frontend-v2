import styles from "./EditorHeader.module.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Eye, Settings } from "lucide-react";

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
          <button className={styles.headerBtn} onClick={() => {}}>
            <Eye size={18} />
            Preview
          </button>
          <button className={styles.headerBtn}>
            <Settings size={18} />
            Settings
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
