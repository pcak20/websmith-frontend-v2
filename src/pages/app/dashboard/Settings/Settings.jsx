import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  CreditCard,
  Shield,
  Smartphone,
  Eye,
  EyeOff,
  Upload,
  Camera,
  Settings as SettingsIcon,
  Palette,
  Monitor,
  Moon,
  Sun,
  Trash2,
  Download,
  AlertTriangle,
  Check,
  X,
  Plus,
  Minus,
  Save,
  RefreshCw,
  Key,
  Database,
  Zap,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import styles from "./Settings.module.css";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true,
    security: true,
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    showEmail: false,
    allowIndexing: true,
    analytics: true,
  });
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    bio: "Web designer and developer passionate about creating beautiful digital experiences.",
    company: "WebCraft Inc.",
    website: "https://johndoe.com",
    timezone: "UTC-5",
    language: "en",
  });
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const settingsSections = [
    {
      id: "profile",
      name: "Profile",
      icon: User,
      description: "Personal information and profile settings",
    },
    {
      id: "account",
      name: "Account",
      icon: SettingsIcon,
      description: "Email, password, and account preferences",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: Bell,
      description: "Manage your notification preferences",
    },
    {
      id: "privacy",
      name: "Privacy",
      icon: Shield,
      description: "Privacy and security settings",
    },
    {
      id: "billing",
      name: "Billing",
      icon: CreditCard,
      description: "Subscription and payment settings",
    },
    {
      id: "appearance",
      name: "Appearance",
      icon: Palette,
      description: "Theme and display preferences",
    },
    {
      id: "advanced",
      name: "Advanced",
      icon: Database,
      description: "Developer tools and advanced options",
    },
  ];

  const handleInputChange = (section, field, value) => {
    if (section === "form") {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else if (section === "password") {
      setPasswordForm((prev) => ({ ...prev, [field]: value }));
    } else if (section === "notifications") {
      setNotifications((prev) => ({ ...prev, [field]: value }));
    } else if (section === "privacy") {
      setPrivacy((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async (section) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setSavedMessage(`${section} settings saved successfully!`);
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handlePasswordReset = () => {
    console.log("Password reset requested");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account requested");
  };

  const handleExportData = () => {
    console.log("Export data requested");
  };

  const handleTwoFactorSetup = () => {
    console.log("Two-factor authentication setup");
  };

  return (
    <div className={styles.settings}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Settings</h1>
            <p>Manage your account preferences and application settings</p>
          </div>
          {savedMessage && (
            <div className={styles.saveMessage}>
              <Check size={16} />
              {savedMessage}
            </div>
          )}
        </div>
      </div>

      <div className={styles.container}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <nav className={styles.navigation}>
            {settingsSections.map((section) => (
              <button
                key={section.id}
                className={`${styles.navItem} ${
                  activeSection === section.id ? styles.active : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <div className={styles.navIcon}>
                  <section.icon size={20} />
                </div>
                <div className={styles.navContent}>
                  <div className={styles.navTitle}>{section.name}</div>
                  <div className={styles.navDescription}>
                    {section.description}
                  </div>
                </div>
                <ChevronRight size={16} className={styles.navArrow} />
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Profile Information</h2>
                <p>Update your personal information and profile details</p>
              </div>

              <div className={styles.profileSection}>
                <div className={styles.avatarSection}>
                  <div className={styles.avatar}>
                    <User size={40} />
                  </div>
                  <div className={styles.avatarActions}>
                    <button className={styles.avatarBtn}>
                      <Upload size={16} />
                      Upload Photo
                    </button>
                    <button className={styles.avatarBtn}>
                      <Camera size={16} />
                      Take Photo
                    </button>
                  </div>
                </div>

                <div className={styles.profileForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("form", "firstName", e.target.value)
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("form", "lastName", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Bio</label>
                    <textarea
                      rows={3}
                      value={formData.bio}
                      onChange={(e) =>
                        handleInputChange("form", "bio", e.target.value)
                      }
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("form", "company", e.target.value)
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("form", "website", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Timezone</label>
                      <select
                        value={formData.timezone}
                        onChange={(e) =>
                          handleInputChange("form", "timezone", e.target.value)
                        }
                      >
                        <option value="UTC-12">UTC-12 (Baker Island)</option>
                        <option value="UTC-8">UTC-8 (Pacific)</option>
                        <option value="UTC-5">UTC-5 (Eastern)</option>
                        <option value="UTC+0">UTC+0 (London)</option>
                        <option value="UTC+3">UTC+3 (Istanbul)</option>
                        <option value="UTC+9">UTC+9 (Tokyo)</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Language</label>
                      <select
                        value={formData.language}
                        onChange={(e) =>
                          handleInputChange("form", "language", e.target.value)
                        }
                      >
                        <option value="en">English</option>
                        <option value="tr">Türkçe</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ja">日本語</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button
                      className={styles.saveBtn}
                      onClick={() => handleSave("Profile")}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <RefreshCw size={16} className={styles.spinning} />
                      ) : (
                        <Save size={16} />
                      )}
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Section */}
          {activeSection === "account" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Account Settings</h2>
                <p>Manage your email, password, and account security</p>
              </div>

              <div className={styles.accountSection}>
                {/* Email Settings */}
                <div className={styles.subsection}>
                  <h3>Email Address</h3>
                  <div className={styles.formGroup}>
                    <label>Primary Email</label>
                    <div className={styles.emailInput}>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("form", "email", e.target.value)
                        }
                      />
                      <button className={styles.verifyBtn}>
                        <Check size={16} />
                        Verified
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Settings */}
                <div className={styles.subsection}>
                  <h3>Password</h3>
                  <div className={styles.passwordForm}>
                    <div className={styles.formGroup}>
                      <label>Current Password</label>
                      <div className={styles.passwordInput}>
                        <input
                          type={showPassword.current ? "text" : "password"}
                          value={passwordForm.current}
                          onChange={(e) =>
                            handleInputChange(
                              "password",
                              "current",
                              e.target.value
                            )
                          }
                        />
                        <button
                          type="button"
                          className={styles.togglePassword}
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              current: !prev.current,
                            }))
                          }
                        >
                          {showPassword.current ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>New Password</label>
                      <div className={styles.passwordInput}>
                        <input
                          type={showPassword.new ? "text" : "password"}
                          value={passwordForm.new}
                          onChange={(e) =>
                            handleInputChange("password", "new", e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className={styles.togglePassword}
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              new: !prev.new,
                            }))
                          }
                        >
                          {showPassword.new ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Confirm New Password</label>
                      <div className={styles.passwordInput}>
                        <input
                          type={showPassword.confirm ? "text" : "password"}
                          value={passwordForm.confirm}
                          onChange={(e) =>
                            handleInputChange(
                              "password",
                              "confirm",
                              e.target.value
                            )
                          }
                        />
                        <button
                          type="button"
                          className={styles.togglePassword}
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              confirm: !prev.confirm,
                            }))
                          }
                        >
                          {showPassword.confirm ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className={styles.passwordActions}>
                      <button className={styles.saveBtn}>
                        <Lock size={16} />
                        Update Password
                      </button>
                      <button
                        className={styles.linkBtn}
                        onClick={handlePasswordReset}
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className={styles.subsection}>
                  <h3>Two-Factor Authentication</h3>
                  <div className={styles.twoFactorSection}>
                    <div className={styles.twoFactorInfo}>
                      <div className={styles.twoFactorStatus}>
                        <AlertTriangle size={20} />
                        <div>
                          <p>Two-factor authentication is not enabled</p>
                          <span>
                            Secure your account with an additional layer of
                            protection
                          </span>
                        </div>
                      </div>
                      <button
                        className={styles.setupBtn}
                        onClick={handleTwoFactorSetup}
                      >
                        <Key size={16} />
                        Setup 2FA
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className={styles.subsection}>
                  <h3>Phone Number</h3>
                  <div className={styles.formGroup}>
                    <label>Mobile Phone</label>
                    <div className={styles.phoneInput}>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("form", "phone", e.target.value)
                        }
                      />
                      <button className={styles.verifyBtn}>
                        <Smartphone size={16} />
                        Verify
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Notification Preferences</h2>
                <p>
                  Choose how you want to be notified about important updates
                </p>
              </div>

              <div className={styles.notificationsSection}>
                <div className={styles.notificationGroup}>
                  <h3>Communication</h3>
                  <div className={styles.notificationItems}>
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4>Email Notifications</h4>
                        <p>Receive important updates via email</p>
                      </div>
                      <button
                        className={`${styles.toggle} ${
                          notifications.email ? styles.on : styles.off
                        }`}
                        onClick={() =>
                          handleInputChange(
                            "notifications",
                            "email",
                            !notifications.email
                          )
                        }
                      >
                        {notifications.email ? (
                          <ToggleRight size={20} />
                        ) : (
                          <ToggleLeft size={20} />
                        )}
                      </button>
                    </div>

                    <div className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4>Push Notifications</h4>
                        <p>Get instant notifications in your browser</p>
                      </div>
                      <button
                        className={`${styles.toggle} ${
                          notifications.push ? styles.on : styles.off
                        }`}
                        onClick={() =>
                          handleInputChange(
                            "notifications",
                            "push",
                            !notifications.push
                          )
                        }
                      >
                        {notifications.push ? (
                          <ToggleRight size={20} />
                        ) : (
                          <ToggleLeft size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.notificationGroup}>
                  <h3>Updates & Marketing</h3>
                  <div className={styles.notificationItems}>
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4>Product Updates</h4>
                        <p>Stay informed about new features and improvements</p>
                      </div>
                      <button
                        className={`${styles.toggle} ${
                          notifications.updates ? styles.on : styles.off
                        }`}
                        onClick={() =>
                          handleInputChange(
                            "notifications",
                            "updates",
                            !notifications.updates
                          )
                        }
                      >
                        {notifications.updates ? (
                          <ToggleRight size={20} />
                        ) : (
                          <ToggleLeft size={20} />
                        )}
                      </button>
                    </div>

                    <div className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4>Marketing Communications</h4>
                        <p>Receive tips, tutorials, and promotional content</p>
                      </div>
                      <button
                        className={`${styles.toggle} ${
                          notifications.marketing ? styles.on : styles.off
                        }`}
                        onClick={() =>
                          handleInputChange(
                            "notifications",
                            "marketing",
                            !notifications.marketing
                          )
                        }
                      >
                        {notifications.marketing ? (
                          <ToggleRight size={20} />
                        ) : (
                          <ToggleLeft size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.notificationGroup}>
                  <h3>Security</h3>
                  <div className={styles.notificationItems}>
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationInfo}>
                        <h4>Security Alerts</h4>
                        <p>Get notified about suspicious account activity</p>
                      </div>
                      <button
                        className={`${styles.toggle} ${
                          notifications.security ? styles.on : styles.off
                        }`}
                        onClick={() =>
                          handleInputChange(
                            "notifications",
                            "security",
                            !notifications.security
                          )
                        }
                      >
                        {notifications.security ? (
                          <ToggleRight size={20} />
                        ) : (
                          <ToggleLeft size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    className={styles.saveBtn}
                    onClick={() => handleSave("Notifications")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw size={16} className={styles.spinning} />
                    ) : (
                      <Save size={16} />
                    )}
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Section */}
          {activeSection === "privacy" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Privacy & Security</h2>
                <p>
                  Control your privacy settings and data sharing preferences
                </p>
              </div>

              <div className={styles.privacySection}>
                <div className={styles.privacyGroup}>
                  <h3>Profile Visibility</h3>
                  <div className={styles.privacyItems}>
                    <div className={styles.privacyItem}>
                      <div className={styles.privacyInfo}>
                        <h4>Public Profile</h4>
                        <p>Make your profile visible to other users</p>
                      </div>
                      <button
                        className={`${styles.toggle} ${
                          privacy.profilePublic ? styles.on : styles.off
                        }`}
                        onClick={() =>
                          handleInputChange(
                            "privacy",
                            "profilePublic",
                            !privacy.profilePublic
                          )
                        }
                      >
                        {privacy.profilePublic ? (
                          <ToggleRight size={20} />
                        ) : (
                          <ToggleLeft size={20} />
                        )}
                      </button>
                    </div>

                    <div className={styles.privacyItem}>
                      <div className={styles.privacyInfo}>
                        <h4>Show Email Address</h4>
                        <p>Display your email on your public profile</p>
                      </div>
                      <button
                        className={`${styles.toggle} ${
                          privacy.showEmail ? styles.on : styles.off
                        }`}
                        onClick={() =>
                          handleInputChange(
                            "privacy",
                            "showEmail",
                            !privacy.showEmail
                          )
                        }
                      >
                        {privacy.showEmail ? (
                          <ToggleRight size={20} />
                        ) : (
                          <ToggleLeft size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.privacyGroup}>
                  <h3>Data & Analytics</h3>
                  <div className={styles.privacyItems}>
                    <div className={styles.privacyItem}>
                      <div className={styles.privacyInfo}>
                        <h4>Search Engine Indexing</h4>
                        <p>Allow search engines to index your public content</p>
                      </div>
                      <button
                        className={`${styles.toggle} ${
                          privacy.allowIndexing ? styles.on : styles.off
                        }`}
                        onClick={() =>
                          handleInputChange(
                            "privacy",
                            "allowIndexing",
                            !privacy.allowIndexing
                          )
                        }
                      >
                        {privacy.allowIndexing ? (
                          <ToggleRight size={20} />
                        ) : (
                          <ToggleLeft size={20} />
                        )}
                      </button>
                    </div>

                    <div className={styles.privacyItem}>
                      <div className={styles.privacyInfo}>
                        <h4>Usage Analytics</h4>
                        <p>
                          Help improve our service by sharing anonymous usage
                          data
                        </p>
                      </div>
                      <button
                        className={`${styles.toggle} ${
                          privacy.analytics ? styles.on : styles.off
                        }`}
                        onClick={() =>
                          handleInputChange(
                            "privacy",
                            "analytics",
                            !privacy.analytics
                          )
                        }
                      >
                        {privacy.analytics ? (
                          <ToggleRight size={20} />
                        ) : (
                          <ToggleLeft size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    className={styles.saveBtn}
                    onClick={() => handleSave("Privacy")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw size={16} className={styles.spinning} />
                    ) : (
                      <Save size={16} />
                    )}
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Billing Section */}
          {activeSection === "billing" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Billing & Subscription</h2>
                <p>
                  Manage your subscription, payment methods, and billing
                  information
                </p>
              </div>

              <div className={styles.billingSection}>
                <div className={styles.planCard}>
                  <div className={styles.planHeader}>
                    <div className={styles.planInfo}>
                      <h3>Pro Plan</h3>
                      <p>Your current subscription</p>
                    </div>
                    <div className={styles.planPrice}>
                      <span className={styles.price}>$19</span>
                      <span className={styles.period}>/month</span>
                    </div>
                  </div>
                  <div className={styles.planFeatures}>
                    <div className={styles.feature}>
                      <Check size={16} />
                      <span>Unlimited websites</span>
                    </div>
                    <div className={styles.feature}>
                      <Check size={16} />
                      <span>Custom domains</span>
                    </div>
                    <div className={styles.feature}>
                      <Check size={16} />
                      <span>Priority support</span>
                    </div>
                  </div>
                  <div className={styles.planActions}>
                    <button className={styles.upgradeBtn}>
                      <Zap size={16} />
                      Upgrade Plan
                    </button>
                    <button className={styles.cancelBtn}>
                      Cancel Subscription
                    </button>
                  </div>
                </div>

                <div className={styles.billingDetails}>
                  <div className={styles.subsection}>
                    <h3>Payment Method</h3>
                    <div className={styles.paymentCard}>
                      <div className={styles.cardInfo}>
                        <CreditCard size={24} />
                        <div>
                          <p>•••• •••• •••• 4242</p>
                          <span>Expires 12/25</span>
                        </div>
                      </div>
                      <button className={styles.linkBtn}>Update</button>
                    </div>
                  </div>

                  <div className={styles.subsection}>
                    <h3>Billing History</h3>
                    <div className={styles.invoiceList}>
                      <div className={styles.invoiceItem}>
                        <div className={styles.invoiceInfo}>
                          <p>Pro Plan - January 2024</p>
                          <span>Jan 1, 2024</span>
                        </div>
                        <div className={styles.invoiceAmount}>$19.00</div>
                        <button className={styles.linkBtn}>
                          <Download size={16} />
                          Download
                        </button>
                      </div>
                      <div className={styles.invoiceItem}>
                        <div className={styles.invoiceInfo}>
                          <p>Pro Plan - December 2023</p>
                          <span>Dec 1, 2023</span>
                        </div>
                        <div className={styles.invoiceAmount}>$19.00</div>
                        <button className={styles.linkBtn}>
                          <Download size={16} />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Section */}
          {activeSection === "appearance" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Appearance</h2>
                <p>Customize the look and feel of your WebCraft experience</p>
              </div>

              <div className={styles.appearanceSection}>
                <div className={styles.themeSelector}>
                  <h3>Theme</h3>
                  <div className={styles.themeOptions}>
                    <button
                      className={`${styles.themeOption} ${
                        !isDarkMode ? styles.active : ""
                      }`}
                    >
                      <Sun size={20} />
                      <span>Light</span>
                    </button>
                    <button
                      className={`${styles.themeOption} ${
                        isDarkMode ? styles.active : ""
                      }`}
                    >
                      <Moon size={20} />
                      <span>Dark</span>
                    </button>
                    <button className={styles.themeOption}>
                      <Monitor size={20} />
                      <span>System</span>
                    </button>
                  </div>
                </div>

                <div className={styles.displaySettings}>
                  <h3>Display</h3>
                  <div className={styles.displayOptions}>
                    <div className={styles.displayOption}>
                      <label>Interface Scale</label>
                      <select>
                        <option value="small">Small</option>
                        <option value="medium" selected>
                          Medium
                        </option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                    <div className={styles.displayOption}>
                      <label>Sidebar Position</label>
                      <select>
                        <option value="left" selected>
                          Left
                        </option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    className={styles.saveBtn}
                    onClick={() => handleSave("Appearance")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw size={16} className={styles.spinning} />
                    ) : (
                      <Save size={16} />
                    )}
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Section */}
          {activeSection === "advanced" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Advanced Settings</h2>
                <p>Developer tools, data management, and advanced options</p>
              </div>

              <div className={styles.advancedSection}>
                <div className={styles.dangerZone}>
                  <h3>Data Management</h3>
                  <div className={styles.dangerActions}>
                    <div className={styles.dangerAction}>
                      <div className={styles.dangerInfo}>
                        <h4>Export Your Data</h4>
                        <p>Download a copy of all your data in JSON format</p>
                      </div>
                      <button
                        className={styles.exportBtn}
                        onClick={handleExportData}
                      >
                        <Download size={16} />
                        Export Data
                      </button>
                    </div>

                    <div className={styles.dangerAction}>
                      <div className={styles.dangerInfo}>
                        <h4>Delete Account</h4>
                        <p>
                          Permanently delete your account and all associated
                          data
                        </p>
                      </div>
                      <button
                        className={styles.deleteBtn}
                        onClick={handleDeleteAccount}
                      >
                        <Trash2 size={16} />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.developerSection}>
                  <h3>Developer Tools</h3>
                  <div className={styles.developerActions}>
                    <div className={styles.developerAction}>
                      <div className={styles.developerInfo}>
                        <h4>API Access</h4>
                        <p>Generate API keys for custom integrations</p>
                      </div>
                      <button className={styles.linkBtn}>
                        <Key size={16} />
                        Manage API Keys
                        <ExternalLink size={14} />
                      </button>
                    </div>

                    <div className={styles.developerAction}>
                      <div className={styles.developerInfo}>
                        <h4>Webhooks</h4>
                        <p>Configure webhooks for real-time notifications</p>
                      </div>
                      <button className={styles.linkBtn}>
                        <Globe size={16} />
                        Setup Webhooks
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
