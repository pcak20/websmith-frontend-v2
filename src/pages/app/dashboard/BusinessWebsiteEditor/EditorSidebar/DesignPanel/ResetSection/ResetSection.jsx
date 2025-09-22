import { RotateCcw } from "lucide-react";
import styles from "./ResetSection.module.css";

const ResetSection = ({ onResetStyles }) => {
  const handleResetStyles = () => {
    if (onResetStyles) {
      onResetStyles();
    }
  };

  return (
    <div className={styles.resetSection}>
      <button onClick={handleResetStyles} className={styles.resetBtn}>
        <RotateCcw size={14} />
        Reset to Default
      </button>
    </div>
  );
};

export default ResetSection;
