// components/ProfilePage/ProfilePage.jsx
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  User,
  Shield,
  Bell,
  Lock,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout/DashboardLayout";
import { useAuth } from "../../../../hooks/useAuth";
import { useUser } from "../../../../hooks/useUser";
import ProfileTab from "./tabs/ProfileTab";
import SecurityTab from "./tabs/SecurityTab";
import NotificationsTab from "./tabs/NotificationsTab";
import PrivacyTab from "./tabs/PrivacyTab";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { user: currentUser } = useAuth();
  const {
    user,
    loading,
    error,
    success,
    updateProfile,
    updatePassword,
    uploadAvatar,
    deleteAvatar,
    updateNotifications,
    exportUserData,
    clearError,
    clearSuccess,
  } = useUser();

  // Local state
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Form states
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    website: "",
    birth_date: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    sms_notifications: false,
    marketing_emails: true,
    security_alerts: true,
    business_updates: true,
    website_analytics: true,
  });

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone_number || "",
        bio: user.bio || "",
        location: user.timezone || "",
        website: user.website || "",
        birth_date: user.birth_date || "",
      });

      if (user.notification_settings) {
        setNotificationSettings(user.notification_settings);
      }
    }
  }, [user]);

  // Clear success messages after delay
  useEffect(() => {
    if (success.update || success.password || success.avatar) {
      const timer = setTimeout(() => {
        clearSuccess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, clearSuccess]);

  // Memoized event handlers
  const handleProfileSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await updateProfile(profileForm);
        setIsEditing(false);
      } catch (error) {
        console.error("Profile update failed:", error);
      }
    },
    [profileForm, updateProfile]
  );

  const handlePasswordSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (passwordForm.new_password !== passwordForm.confirm_password) {
        return;
      }

      try {
        await updatePassword({
          current_password: passwordForm.current_password,
          new_password: passwordForm.new_password,
        });
        setPasswordForm({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
        setShowPasswordForm(false);
      } catch (error) {
        console.error("Password update failed:", error);
      }
    },
    [passwordForm, updatePassword]
  );

  const handleAvatarUpload = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(file);

      // Upload file - pass the file directly (userSlice will create FormData)
      try {
        await uploadAvatar(file); // Pass file, userSlice creates FormData
        setAvatarPreview(null);
      } catch (error) {
        console.error("Avatar upload failed:", error);
        setAvatarPreview(null);
      }
    },
    [uploadAvatar]
  );

  const handleNotificationUpdate = useCallback(
    async (key, value) => {
      const newSettings = { ...notificationSettings, [key]: value };
      setNotificationSettings(newSettings);

      try {
        await updateNotifications(newSettings);
      } catch (error) {
        console.error("Notification update failed:", error);
        // Revert on error
        setNotificationSettings(notificationSettings);
      }
    },
    [notificationSettings, updateNotifications]
  );

  const handleExportData = useCallback(async () => {
    try {
      await exportUserData();
    } catch (error) {
      console.error("Data export failed:", error);
    }
  }, [exportUserData]);

  // Optimized input change handlers
  const handleProfileFormChange = useCallback((field, value) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handlePasswordFormChange = useCallback((field, value) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Additional handlers for child components
  const handleEditToggle = useCallback(() => setIsEditing(true), []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    clearError();
  }, [clearError]);

  const handleAvatarInputClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleTogglePasswordForm = useCallback((show) => {
    setShowPasswordForm(show);
  }, []);

  const handleCancelPasswordForm = useCallback(() => {
    setShowPasswordForm(false);
    setPasswordForm({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });
  }, []);

  const handleViewActivity = useCallback(() => {
    // TODO: Implement view activity logic
    console.log("View activity clicked");
  }, []);

  const handleDeleteAccount = useCallback(() => {
    // TODO: Implement delete account logic
    console.log("Delete account clicked");
  }, []);

  // Memoized tabs configuration
  const tabs = useMemo(
    () => [
      { id: "profile", label: "Profile", icon: User },
      { id: "security", label: "Security", icon: Shield },
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "privacy", label: "Privacy", icon: Lock },
    ],
    []
  );

  // Render the active tab component
  const renderActiveTab = useCallback(() => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileTab
            user={user}
            profileForm={profileForm}
            isEditing={isEditing}
            loading={loading}
            avatarPreview={avatarPreview}
            fileInputRef={fileInputRef}
            onProfileFormChange={handleProfileFormChange}
            onProfileSubmit={handleProfileSubmit}
            onEditToggle={handleEditToggle}
            onCancelEdit={handleCancelEdit}
            onAvatarUpload={handleAvatarUpload}
            onDeleteAvatar={deleteAvatar}
            onAvatarInputClick={handleAvatarInputClick}
            clearError={clearError}
          />
        );
      case "security":
        return (
          <SecurityTab
            showPasswordForm={showPasswordForm}
            passwordForm={passwordForm}
            loading={loading}
            onPasswordFormChange={handlePasswordFormChange}
            onPasswordSubmit={handlePasswordSubmit}
            onTogglePasswordForm={handleTogglePasswordForm}
            onCancelPasswordForm={handleCancelPasswordForm}
          />
        );
      case "notifications":
        return (
          <NotificationsTab
            notificationSettings={notificationSettings}
            onNotificationUpdate={handleNotificationUpdate}
          />
        );
      case "privacy":
        return (
          <PrivacyTab
            loading={loading}
            onExportData={handleExportData}
            onViewActivity={handleViewActivity}
            onDeleteAccount={handleDeleteAccount}
          />
        );
      default:
        return (
          <ProfileTab
            user={user}
            profileForm={profileForm}
            isEditing={isEditing}
            loading={loading}
            avatarPreview={avatarPreview}
            fileInputRef={fileInputRef}
            onProfileFormChange={handleProfileFormChange}
            onProfileSubmit={handleProfileSubmit}
            onEditToggle={handleEditToggle}
            onCancelEdit={handleCancelEdit}
            onAvatarUpload={handleAvatarUpload}
            onDeleteAvatar={deleteAvatar}
            onAvatarInputClick={handleAvatarInputClick}
            clearError={clearError}
          />
        );
    }
  }, [
    activeTab,
    user,
    profileForm,
    isEditing,
    loading,
    avatarPreview,
    showPasswordForm,
    passwordForm,
    notificationSettings,
    handleProfileFormChange,
    handleProfileSubmit,
    handleEditToggle,
    handleCancelEdit,
    handleAvatarUpload,
    deleteAvatar,
    handleAvatarInputClick,
    clearError,
    handlePasswordFormChange,
    handlePasswordSubmit,
    handleTogglePasswordForm,
    handleCancelPasswordForm,
    handleNotificationUpdate,
    handleExportData,
    handleViewActivity,
    handleDeleteAccount,
  ]);

  return (
    <DashboardLayout activePage="profile">
      <div className={styles.profilePage}>
        {/* Success/Error Messages */}
        {success.update && (
          <div className={styles.successMessage}>
            <CheckCircle size={16} />
            Profile updated successfully!
          </div>
        )}

        {success.password && (
          <div className={styles.successMessage}>
            <CheckCircle size={16} />
            Password updated successfully!
          </div>
        )}

        {success.avatar && (
          <div className={styles.successMessage}>
            <CheckCircle size={16} />
            Avatar updated successfully!
          </div>
        )}

        {(error.update || error.password || error.avatar) && (
          <div className={styles.errorMessage}>
            <AlertCircle size={16} />
            {error.update || error.password || error.avatar}
            <button onClick={clearError} className={styles.errorClose}>
              <X size={14} />
            </button>
          </div>
        )}

        {/* Header */}
        <div className={styles.pageHeader}>
          <h1>Profile Settings</h1>
          <p>Manage your account information and preferences</p>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${
                    activeTab === tab.id ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className={styles.contentContainer}>{renderActiveTab()}</div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
