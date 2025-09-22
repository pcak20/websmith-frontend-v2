import styles from "./PageEditor.module.css";
import EditorCanvas from "./EditorCanvas/EditorCanvas";
import EditorToolbar from "./EditorToolbar/EditorToolbar";
import { useState } from "react";

function PageEditor({ conf }) {
  const [previewDevice, setPreviewDevice] = useState("desktop");
  return (
    <div className={styles.editorMain}>
      <EditorToolbar
        conf={conf}
        previewDevice={previewDevice}
        setPreviewDevice={setPreviewDevice}
      />

      <EditorCanvas conf={conf} previewDevice={previewDevice} />
    </div>
  );
}

export default PageEditor;
