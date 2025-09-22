import styles from "./EditorToolbar.module.css";
import { Save, Smartphone, Monitor, Tablet } from "lucide-react";
import PageSelector from "./PageSelector/PageSelector";
import NextPrevButtons from "./NextPrevButtons/NextPrevButtons";
import AdvancedSettingsButton from "./AdvancedSettingsButton/AdvancedSettingsButton";

function EditorToolbar({ conf, previewDevice, setPreviewDevice }) {
  const {
    currentTemplatePage,
    unsavedChanges,
    handleCurrentTemplatePageChange,
    availablePages,
  } = conf;

  return (
    <div className={styles.editorToolbar}>
      <div className={styles.toolbarLeft}>
        <PageSelector
          onCurrentTemplatePageChange={handleCurrentTemplatePageChange}
          currentTemplatePage={currentTemplatePage}
          availablePages={availablePages}
        />
        <div className={styles.toolbarDivider}></div>
        <NextPrevButtons conf={conf} />
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
        <AdvancedSettingsButton conf={conf} />
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
