import styles from "./EditorCanvas.module.css";

function EditorCanvas({ conf, previewDevice }) {
  const { EditorRouter, currentTemplatePage, properties } = conf;

  return (
    <div className={styles.editorCanvas}>
      <div className={`${styles.canvasContainer} ${styles[previewDevice]}`}>
        <div className={styles.canvasContent}>
          <EditorRouter
            currentPage={currentTemplatePage}
            theme={properties.theme}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorCanvas;
