import { Palette, ChevronDown, ChevronRight } from "lucide-react";
import styles from "./ThemeSection.module.css";

const ThemeSection = ({
  themes,
  currentTheme,
  onThemeChange,
  isExpanded,
  onToggle,
}) => {
  const handleThemeChange = (themeKey) => {
    if (onThemeChange) {
      onThemeChange(themeKey);
    }
  };

  return (
    <div className={styles.section}>
      <button onClick={onToggle} className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <Palette size={16} />
          <span>Theme Colors</span>
        </div>
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {isExpanded && (
        <div className={styles.sectionContent}>
          <div className={styles.themeGrid}>
            {Object.entries(themes || {}).map(([key, theme]) => {
              return (
                <div
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className={`${styles.themeCard} ${
                    currentTheme === key ? styles.active : ""
                  }`}
                >
                  <div className={styles.themeHeader}>
                    <div className={styles.themeColors}>
                      <div
                        className={styles.themeColor}
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div
                        className={styles.themeColor}
                        style={{ backgroundColor: theme.secondary }}
                      />
                      <div
                        className={styles.themeColor}
                        style={{ backgroundColor: theme.accent }}
                      />
                    </div>
                    <div className={styles.themeInfo}>
                      <div className={styles.themeName}>{theme.name}</div>
                      <div className={styles.themeDescription}>
                        {theme.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSection;
