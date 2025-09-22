import { Move, ChevronDown, ChevronRight } from "lucide-react";
import styles from "./SpacingSection.module.css";

const SpacingSection = ({ isExpanded, onToggle }) => {
  return (
    <div className={styles.section}>
      <button onClick={onToggle} className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <Move size={16} />
          <span>Spacing & Sizing</span>
        </div>
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {isExpanded && (
        <div className={styles.sectionContent}>
          <div className={styles.comingSoon}>
            Spacing controls coming soon...
          </div>
        </div>
      )}
    </div>
  );
};

export default SpacingSection;
