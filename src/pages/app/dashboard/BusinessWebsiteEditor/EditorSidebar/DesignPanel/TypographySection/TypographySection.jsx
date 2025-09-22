import { Type, ChevronDown, ChevronRight } from "lucide-react";
import styles from "./TypographySection.module.css";

const TypographySection = ({
  fontFamily,
  onFontChange,
  isExpanded,
  onToggle,
}) => {
  const fontOptions = [
    { name: "Inter", value: "Inter, sans-serif", category: "Modern" },
    { name: "Roboto", value: "Roboto, sans-serif", category: "Clean" },
    { name: "Poppins", value: "Poppins, sans-serif", category: "Friendly" },
    {
      name: "Playfair Display",
      value: "Playfair Display, serif",
      category: "Elegant",
    },
    {
      name: "Merriweather",
      value: "Merriweather, serif",
      category: "Traditional",
    },
    {
      name: "Montserrat",
      value: "Montserrat, sans-serif",
      category: "Versatile",
    },
    { name: "Open Sans", value: "Open Sans, sans-serif", category: "Readable" },
    { name: "Lora", value: "Lora, serif", category: "Sophisticated" },
    {
      name: "Source Sans Pro",
      value: "Source Sans Pro, sans-serif",
      category: "Professional",
    },
    { name: "Nunito", value: "Nunito, sans-serif", category: "Rounded" },
  ];

  const handleFontChange = (value) => {
    if (onFontChange) {
      onFontChange(value);
    }
  };

  return (
    <div className={styles.section}>
      <button onClick={onToggle} className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <Type size={16} />
          <span>Typography</span>
        </div>
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {isExpanded && (
        <div className={styles.sectionContent}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => handleFontChange(e.target.value)}
              className={styles.select}
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name} ({font.category})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fontPreview}>
            <div className={styles.previewLabel}>Preview</div>
            <div
              className={styles.previewTitle}
              style={{ fontFamily: fontFamily }}
            >
              Bella Vista Restaurant
            </div>
            <div
              className={styles.previewText}
              style={{ fontFamily: fontFamily }}
            >
              Experience authentic Italian cuisine with traditional recipes
              passed down through generations.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypographySection;
