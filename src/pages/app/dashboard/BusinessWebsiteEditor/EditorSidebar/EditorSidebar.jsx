import styles from "./EditorSidebar.module.css";
import { Settings, Layers, Palette, Edit3 } from "lucide-react";
import { elementLibrary } from "../../../../../utils/mockData";
import { useState } from "react";

function EditorSidebar({
  currentTemplatePage,
  getEnabledPagesCount,
  getEnabledFeaturesCount,
  websiteFeatures,
  onShowFeaturesModal,
  onElementAdd,
  onFeatureToggle,
}) {
  const [activeTab, setActiveTab] = useState("elements");
  return (
    <div className={styles.sidebar}>
      {/* Sidebar Header */}
      <div className={styles.sidebarHeader}>
        <h3>Editor</h3>
        <div className={styles.editorTabs}>
          <button
            className={`${styles.editorTab} ${
              activeTab === "elements" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("elements")}
          >
            <Layers size={16} />
            Elements
          </button>
          <button
            className={`${styles.editorTab} ${
              activeTab === "design" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("design")}
          >
            <Palette size={16} />
            Design
          </button>
          <button
            className={`${styles.editorTab} ${
              activeTab === "settings" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className={styles.sidebarContent}>
        {activeTab === "elements" && (
          <div className={styles.elementsPanel}>
            {/* Page Sections */}
            <div className={styles.panelSection}>
              <h4>Page Sections</h4>
              <div className={styles.sectionsGrid}>
                {currentTemplatePage.sections.map((section) => (
                  <div key={section.id} className={styles.sectionItem}>
                    <div className={styles.sectionInfo}>
                      <span>{section.title}</span>
                      <span className={styles.sectionType}>{section.type}</span>
                    </div>
                    <button className={styles.sectionAction}>
                      <Edit3 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Element Library */}
            {Object.entries(elementLibrary).map(([category, elements]) => (
              <div key={category} className={styles.panelSection}>
                <h4>
                  {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                  Elements
                </h4>
                <div className={styles.elementsGrid}>
                  {elements.map((element) => (
                    <div
                      key={element.id}
                      className={styles.elementItem}
                      onClick={() => onElementAdd(element.id)}
                      title={element.description}
                    >
                      <element.icon size={20} />
                      <span>{element.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "design" && (
          <div className={styles.designPanel}>
            <div className={styles.panelSection}>
              <h4>Colors</h4>
              <div className={styles.colorGrid}>
                <div className={styles.colorItem}>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: "#667eea" }}
                  ></div>
                  <span>Primary</span>
                </div>
                <div className={styles.colorItem}>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: "#764ba2" }}
                  ></div>
                  <span>Secondary</span>
                </div>
                <div className={styles.colorItem}>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: "#f8fafc" }}
                  ></div>
                  <span>Background</span>
                </div>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h4>Typography</h4>
              <div className={styles.typographyOptions}>
                <div className={styles.fontOption}>
                  <span>Heading Font</span>
                  <select className={styles.fontSelect}>
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
                <div className={styles.fontOption}>
                  <span>Body Font</span>
                  <select className={styles.fontSelect}>
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h4>Spacing</h4>
              <div className={styles.spacingControls}>
                <label>
                  Section Spacing
                  <input type="range" min="0" max="100" defaultValue="40" />
                </label>
                <label>
                  Element Spacing
                  <input type="range" min="0" max="50" defaultValue="20" />
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className={styles.settingsPanel}>
            <div className={styles.panelSection}>
              <h4>Website Features</h4>
              <div className={styles.featuresOverview}>
                <div className={styles.featuresStats}>
                  <div className={styles.featureStat}>
                    <span className={styles.statNumber}>
                      {getEnabledPagesCount()}
                    </span>
                    <span className={styles.statLabel}>Pages</span>
                  </div>
                  <div className={styles.featureStat}>
                    <span className={styles.statNumber}>
                      {getEnabledFeaturesCount()}
                    </span>
                    <span className={styles.statLabel}>Features</span>
                  </div>
                </div>
                <button
                  className={styles.configureBtn}
                  onClick={() => onShowFeaturesModal(true)}
                >
                  <Settings size={16} />
                  Configure Features
                </button>
              </div>

              {/* Quick Feature Toggles */}
              <div className={styles.quickToggles}>
                <label className={styles.quickToggle}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableEcommerce}
                    onChange={(e) =>
                      onFeatureToggle("enableEcommerce", e.target.checked)
                    }
                  />
                  <span>E-commerce</span>
                </label>
                <label className={styles.quickToggle}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.allowUserRegistration}
                    onChange={(e) =>
                      onFeatureToggle("allowUserRegistration", e.target.checked)
                    }
                  />
                  <span>User Registration</span>
                </label>
                <label className={styles.quickToggle}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableContactForm}
                    onChange={(e) =>
                      onFeatureToggle("enableContactForm", e.target.checked)
                    }
                  />
                  <span>Contact Form</span>
                </label>
                <label className={styles.quickToggle}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableAppointmentBooking}
                    onChange={(e) =>
                      onFeatureToggle(
                        "enableAppointmentBooking",
                        e.target.checked
                      )
                    }
                  />
                  <span>Appointment Booking</span>
                </label>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h4>Page Settings</h4>
              <div className={styles.settingsForm}>
                <div className={styles.formGroup}>
                  <label>Page Title</label>
                  <input type="text" defaultValue={currentTemplatePage.name} />
                </div>
                <div className={styles.formGroup}>
                  <label>URL Path</label>
                  <input type="text" defaultValue={currentTemplatePage.path} />
                </div>
                <div className={styles.formGroup}>
                  <label>Meta Description</label>
                  <textarea
                    rows="3"
                    placeholder="Page description for SEO..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h4>Page Visibility</h4>
              <div className={styles.visibilityControls}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked />
                  Show in navigation
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked />
                  Include in sitemap
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  Password protected
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableSSL}
                    onChange={(e) =>
                      onFeatureToggle("enableSSL", e.target.checked)
                    }
                  />
                  SSL Security (HTTPS)
                </label>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h4>Active Features Summary</h4>
              <div className={styles.activeFeaturesList}>
                {websiteFeatures.enableEcommerce && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>E-commerce Store</span>
                  </div>
                )}
                {websiteFeatures.allowUserRegistration && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>User Registration</span>
                  </div>
                )}
                {websiteFeatures.enableContactForm && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>Contact Form</span>
                  </div>
                )}
                {websiteFeatures.enableAppointmentBooking && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>Appointment Booking</span>
                  </div>
                )}
                {websiteFeatures.enableLiveChat && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>Live Chat</span>
                  </div>
                )}
                {websiteFeatures.enableNewsletterSignup && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>Newsletter Signup</span>
                  </div>
                )}
                {getEnabledFeaturesCount() === 0 && (
                  <p className={styles.noFeatures}>
                    No additional features enabled
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditorSidebar;
