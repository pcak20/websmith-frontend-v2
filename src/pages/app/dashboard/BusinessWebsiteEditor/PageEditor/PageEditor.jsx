import styles from "./PageEditor.module.css";
import { mockTemplatePages } from "../../../../../utils/mockData";
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
import { useState } from "react";
import EditorCanvas from "../EditorCanvas/EditorCanvas";

function PageEditor({
  currentTemplatePage,
  onPreview,
  onSaveChanges,
  unsavedChanges,
}) {
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <div className={styles.editorMain}>
      {/* Editor Toolbar */}
      <div className={styles.editorToolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.pageSelector}>
            <select
              value={currentTemplatePage.id}
              onChange={(e) => {
                const page = mockTemplatePages.find(
                  (p) => p.id === e.target.value
                );
                if (page) setCurrentTemplatePage(page);
              }}
              className={styles.pageSelect}
            >
              {mockTemplatePages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
          </div>
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
          <button className={styles.publishBtn} onClick={onPreview}>
            <Globe size={16} />
            Preview Live
          </button>
          <button
            className={styles.saveBtn}
            onClick={onSaveChanges}
            disabled={!unsavedChanges}
          >
            <Save size={16} />
            {unsavedChanges ? "Save Changes" : "Saved"}
          </button>
        </div>
      </div>

      <EditorCanvas previewDevice={previewDevice} />
    </div>
  );
}

export default PageEditor;
