import { useState } from "react";
import styles from "./EditorToolbar.module.css";
import {
  Save,
  Eye,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Undo,
  Redo,
} from "lucide-react";
import PageSelector from "./PageSelector/PageSelector";

function EditorToolbar({ conf, previewDevice, setPreviewDevice }) {
  const {
    currentTemplatePage,
    unsavedChanges,
    setCurrentTemplatePage,
    availablePages,
  } = conf;

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <div className={styles.editorToolbar}>
      <div className={styles.toolbarLeft}>
        <PageSelector
          onCurrentTemplatePageChange={setCurrentTemplatePage}
          currentTemplatePage={currentTemplatePage}
          availablePages={availablePages}
        />
        <div className={styles.toolbarDivider}></div>
        <button className={styles.toolbarBtn} title="Undo">
          <Undo size={16} />
        </button>
        <button className={styles.toolbarBtn} title="Redo">
          <Redo size={16} />
        </button>
      </div>

      <div className={styles.toolbarCenter}>
        <div className={styles.deviceSelector}>
          <button
            className={`${styles.deviceBtn} ${
              previewDevice === "desktop" ? styles.active : ""
            }`}
            onClick={() => setPreviewDevice("desktop")}
            title="Desktop View"
          >
            <Monitor size={16} />
          </button>
          <button
            className={`${styles.deviceBtn} ${
              previewDevice === "tablet" ? styles.active : ""
            }`}
            onClick={() => setPreviewDevice("tablet")}
            title="Tablet View"
          >
            <Tablet size={16} />
          </button>
          <button
            className={`${styles.deviceBtn} ${
              previewDevice === "mobile" ? styles.active : ""
            }`}
            onClick={() => setPreviewDevice("mobile")}
            title="Mobile View"
          >
            <Smartphone size={16} />
          </button>
        </div>
      </div>

      <div className={styles.toolbarRight}>
        <button
          className={styles.toolbarBtn}
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          title="Toggle Preview Mode"
        >
          <Eye size={16} />
          {isPreviewMode ? "Edit" : "Preview"}
        </button>
        <button className={styles.publishBtn} onClick={() => {}}>
          <Globe size={16} />
          Preview Live
        </button>
        <button
          className={styles.saveBtn}
          onClick={() => {}}
          disabled={!unsavedChanges}
        >
          <Save size={16} />
          {unsavedChanges ? "Save Changes" : "Saved"}
        </button>
      </div>
    </div>
  );
}

export default EditorToolbar;
