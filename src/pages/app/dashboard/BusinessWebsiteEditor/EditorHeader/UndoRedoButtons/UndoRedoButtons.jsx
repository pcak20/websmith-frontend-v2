import { Undo, Redo } from "lucide-react";
import styles from "./UndoRedoButtons.module.css";
function UndoRedoButtons() {
  return (
    <>
      <button className={styles.toolbarBtn} title="Undo">
        <Undo size={16} />
      </button>
      <button className={styles.toolbarBtn} title="Redo">
        <Redo size={16} />
      </button>
    </>
  );
}

export default UndoRedoButtons;
