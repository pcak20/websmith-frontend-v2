// components/ProfilePage/tabs/ProfileTab.jsx
import React, { memo } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  Trash2,
  Loader2,
  Globe,
} from "lucide-react";
import styles from "../ProfilePage.module.css";

const ProfileTab = memo(
  ({
    user,
    profileForm,
    isEditing,
    loading,
    avatarPreview,
    fileInputRef,
    onProfileFormChange,
    onProfileSubmit,
    onEditToggle,
    onCancelEdit,
    onAvatarUpload,
    onDeleteAvatar,
    onAvatarInputClick,
    clearError,
  }) => (
    <div className={styles.tabContent}>
      {/* Avatar Section */}
      <div className={styles.avatarSection}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" />
            ) : user?.profile_image ? (
              <img src={user.profile_image} alt="User avatar" />
            ) : (
              <User size={48} />
            )}
            {loading.avatar && (
              <div className={styles.avatarLoader}>
                <Loader2 size={24} className={styles.spinner} />
              </div>
            )}
          </div>
          <div className={styles.avatarActions}>
            <button
              onClick={onAvatarInputClick}
              className={styles.uploadBtn}
              disabled={loading.avatar}
            >
              <Camera size={16} />
              Change Photo
            </button>
            {user?.profile_image && (
              <button
                onClick={onDeleteAvatar}
                className={styles.deleteBtn}
                disabled={loading.avatar}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onAvatarUpload}
            style={{ display: "none" }}
          />
        </div>
        <div className={styles.userInfo}>
          <h2>
            {user ? `${user.first_name} ${user.last_name}` : user?.username}
          </h2>
          <p>{user?.email}</p>
          <div className={styles.userMeta}>
            <span>
              Joined{" "}
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "Unknown"}
            </span>
            <span>•</span>
            <span>{user?.businesses_count || 0} businesses</span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={onProfileSubmit} className={styles.profileForm}>
        <div className={styles.formHeader}>
          <h3>Personal Information</h3>
          <div className={styles.formActions}>
            {!isEditing ? (
              <button
                type="button"
                onClick={onEditToggle}
                className={styles.editBtn}
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            ) : (
              <div className={styles.editActions}>
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className={styles.cancelBtn}
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={loading.update}
                >
                  {loading.update ? (
                    <Loader2 size={16} className={styles.spinner} />
                  ) : (
                    <Save size={16} />
                  )}
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>First Name</label>
            <div className={styles.inputGroup}>
              <User size={18} />
              <input
                type="text"
                value={profileForm.first_name}
                onChange={(e) =>
                  onProfileFormChange("first_name", e.target.value)
                }
                disabled={!isEditing}
                placeholder="Enter your first name"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Last Name</label>
            <div className={styles.inputGroup}>
              <User size={18} />
              <input
                type="text"
                value={profileForm.last_name}
                onChange={(e) =>
                  onProfileFormChange("last_name", e.target.value)
                }
                disabled={!isEditing}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <div className={styles.inputGroup}>
              <Mail size={18} />
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => onProfileFormChange("email", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Phone</label>
            <div className={styles.inputGroup}>
              <Phone size={18} />
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => onProfileFormChange("phone", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Location</label>
            <div className={styles.inputGroup}>
              <MapPin size={18} />
              <input
                type="text"
                value={profileForm.location}
                onChange={(e) =>
                  onProfileFormChange("location", e.target.value)
                }
                disabled={!isEditing}
                placeholder="Enter your location"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Website</label>
            <div className={styles.inputGroup}>
              <Globe size={18} />
              <input
                type="url"
                value={profileForm.website}
                onChange={(e) => onProfileFormChange("website", e.target.value)}
                disabled={!isEditing}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Birth Date</label>
            <div className={styles.inputGroup}>
              <Calendar size={18} />
              <input
                type="date"
                value={profileForm.birth_date}
                onChange={(e) =>
                  onProfileFormChange("birth_date", e.target.value)
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Bio</label>
          <div className={styles.inputGroup}>
            <textarea
              value={profileForm.bio}
              onChange={(e) => onProfileFormChange("bio", e.target.value)}
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>
        </div>
      </form>
    </div>
  )
);

ProfileTab.displayName = "ProfileTab";

export default ProfileTab;
