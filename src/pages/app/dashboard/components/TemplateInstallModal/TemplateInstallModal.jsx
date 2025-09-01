// TemplateInstallModal.js
import React, { useState } from "react";
import { X, Globe, Settings, Palette, Package } from "lucide-react";
import styles from "./TemplateInstallModal.module.css";

const TemplateInstallModal = ({ isOpen, onClose, template }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    websiteName: "",
    businessId: "",
    selectedFeatures: {},
    colorScheme: {},
    fontOptions: {},
    customizations: {},
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle template installation
    console.log("Installing template with:", formData);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Install Template</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.templatePreview}>
          <img src={template.thumbnail} alt={template.name} />
          <div className={styles.templateInfo}>
            <h3>{template.name}</h3>
            <p>{template.short_description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalContent}>
            {step === 1 && (
              <div className={styles.step}>
                <h3>
                  <Globe size={20} />
                  Website Details
                </h3>

                <div className={styles.formGroup}>
                  <label>Website Name *</label>
                  <input
                    type="text"
                    value={formData.websiteName}
                    onChange={(e) =>
                      handleInputChange("websiteName", e.target.value)
                    }
                    placeholder="My Restaurant Website"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Business *</label>
                  <select
                    value={formData.businessId}
                    onChange={(e) =>
                      handleInputChange("businessId", e.target.value)
                    }
                    required
                  >
                    <option value="">Select a business...</option>
                    <option value="business1">Bella Vista Restaurant</option>
                    <option value="business2">Downtown Cafe</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.step}>
                <h3>
                  <Settings size={20} />
                  Features
                </h3>

                <div className={styles.featuresGrid}>
                  {template.configurable_features &&
                    Object.entries(template.configurable_features).map(
                      ([key, feature]) => (
                        <div key={key} className={styles.featureOption}>
                          <label className={styles.checkbox}>
                            <input
                              type="checkbox"
                              checked={
                                formData.selectedFeatures[key]?.enabled || false
                              }
                              onChange={(e) =>
                                handleInputChange("selectedFeatures", {
                                  ...formData.selectedFeatures,
                                  [key]: { enabled: e.target.checked },
                                })
                              }
                            />
                            <span className={styles.checkmark}></span>
                            <div className={styles.featureInfo}>
                              <div className={styles.featureName}>
                                {key
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </div>
                              <div className={styles.featureDescription}>
                                {feature.description ||
                                  "Enable this feature for your website"}
                              </div>
                            </div>
                          </label>
                        </div>
                      )
                    )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.step}>
                <h3>
                  <Palette size={20} />
                  Customization
                </h3>

                {template.color_schemes &&
                  template.color_schemes.length > 0 && (
                    <div className={styles.formGroup}>
                      <label>Color Scheme</label>
                      <div className={styles.colorSchemes}>
                        {template.color_schemes.map((scheme, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`${styles.colorScheme} ${
                              JSON.stringify(formData.colorScheme) ===
                              JSON.stringify(scheme)
                                ? styles.selected
                                : ""
                            }`}
                            onClick={() =>
                              handleInputChange("colorScheme", scheme)
                            }
                          >
                            <div className={styles.colorPreview}>
                              <div style={{ background: scheme.primary }}></div>
                              <div
                                style={{ background: scheme.secondary }}
                              ></div>
                              <div style={{ background: scheme.accent }}></div>
                            </div>
                            <span>{scheme.name || `Scheme ${index + 1}`}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                {template.font_options && template.font_options.length > 0 && (
                  <div className={styles.formGroup}>
                    <label>Font Style</label>
                    <div className={styles.fontOptions}>
                      {template.font_options.map((font, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`${styles.fontOption} ${
                            JSON.stringify(formData.fontOptions) ===
                            JSON.stringify(font)
                              ? styles.selected
                              : ""
                          }`}
                          onClick={() => handleInputChange("fontOptions", font)}
                          style={{ fontFamily: font.primary }}
                        >
                          {font.name || `Font ${index + 1}`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.modalFooter}>
            <div className={styles.stepIndicator}>
              <span className={step >= 1 ? styles.completed : ""}>1</span>
              <span className={step >= 2 ? styles.completed : ""}>2</span>
              <span className={step >= 3 ? styles.completed : ""}>3</span>
            </div>

            <div className={styles.actions}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className={styles.backBtn}
                >
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className={styles.nextBtn}
                  disabled={
                    step === 1 &&
                    (!formData.websiteName || !formData.businessId)
                  }
                >
                  Next
                </button>
              ) : (
                <button type="submit" className={styles.installBtn}>
                  <Package size={18} />
                  Install Template
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateInstallModal;
