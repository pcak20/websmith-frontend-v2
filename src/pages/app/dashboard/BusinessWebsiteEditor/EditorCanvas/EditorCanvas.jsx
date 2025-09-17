import React from "react";
import styles from "./EditorCanvas.module.css";
import MockpageContent from "../MockPageContent/MockPageContent";

function EditorCanvas({ previewDevice = "" }) {
  return (
    <div className={styles.editorCanvas}>
      <div className={`${styles.canvasContainer} ${styles[previewDevice]}`}>
        <div className={styles.canvasContent}>
          <MockpageContent />
        </div>
      </div>
    </div>
  );
}

export default EditorCanvas;
