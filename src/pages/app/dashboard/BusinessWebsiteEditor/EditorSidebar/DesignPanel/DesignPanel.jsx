import { useState } from "react";
import ThemeSection from "./ThemeSection/ThemeSection";
import TypographySection from "./TypographySection/TypographySection";
import LayoutSection from "./LayoutSection/LayoutSection";
import SpacingSection from "./SpacingSection/SpacingSection";
import ResetSection from "./ResetSection/ResetSection";
import styles from "./DesignPanel.module.css";

const DesignPanel = ({ conf, fontFamily, onFontChange, onResetStyles }) => {
  const { themes, properties, handlePropertiesChange } = conf;

  const [expandedSections, setExpandedSections] = useState({
    theme: true,
    typography: true,
    layout: false,
    spacing: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className={styles.designPanel}>
      <ThemeSection
        themes={themes}
        currentTheme={properties.theme}
        onThemeChange={(value) => handlePropertiesChange("theme", value)}
        isExpanded={expandedSections.theme}
        onToggle={() => toggleSection("theme")}
      />

      <TypographySection
        fontFamily={fontFamily}
        onFontChange={onFontChange}
        isExpanded={expandedSections.typography}
        onToggle={() => toggleSection("typography")}
      />

      <LayoutSection
        isExpanded={expandedSections.layout}
        onToggle={() => toggleSection("layout")}
      />

      <SpacingSection
        isExpanded={expandedSections.spacing}
        onToggle={() => toggleSection("spacing")}
      />

      <ResetSection onResetStyles={onResetStyles} />
    </div>
  );
};

export default DesignPanel;
