import { Layout, ChevronDown, ChevronRight } from "lucide-react";
import styles from "./LayoutSection.module.css";

const LayoutSection = ({ isExpanded, onToggle }) => {
  return (
    <div className={styles.section}>
      <button onClick={onToggle} className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <Layout size={16} />
          <span>Layout & Structure</span>
        </div>
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {isExpanded && (
        <div className={styles.sectionContent}>
          <div className={styles.comingSoon}>
            Layout controls coming soon...
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutSection;
