// components/ProfilePage/tabs/SecurityTab.jsx
import React, { memo } from "react";
import { Lock, Shield, Smartphone, Key, Save, Loader2 } from "lucide-react";
import styles from "../ProfilePage.module.css";

const SecurityTab = memo(
  ({
    showPasswordForm,
    passwordForm,
    loading,
    onPasswordFormChange,
    onPasswordSubmit,
    onTogglePasswordForm,
    onCancelPasswordForm,
  }) => (
    <div className={styles.tabContent}>
      <div className={styles.securitySection}>
        <h3>Password & Security</h3>

        {!showPasswordForm ? (
          <div className={styles.passwordSection}>
            <div className={styles.securityItem}>
              <div className={styles.securityIcon}>
                <Lock size={24} />
              </div>
              <div className={styles.securityInfo}>
                <h4>Password</h4>
                <p>Last updated 30 days ago</p>
              </div>
              <button
                onClick={() => onTogglePasswordForm(true)}
                className={styles.securityAction}
              >
                Change Password
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onPasswordSubmit} className={styles.passwordForm}>
            <div className={styles.formGroup}>
              <label>Current Password</label>
              <div className={styles.inputGroup}>
                <Lock size={18} />
                <input
                  type="password"
                  value={passwordForm.current_password}
                  onChange={(e) =>
                    onPasswordFormChange("current_password", e.target.value)
                  }
                  placeholder="Enter current password"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>New Password</label>
              <div className={styles.inputGroup}>
                <Key size={18} />
                <input
                  type="password"
                  value={passwordForm.new_password}
                  onChange={(e) =>
                    onPasswordFormChange("new_password", e.target.value)
                  }
                  placeholder="Enter new password"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Confirm New Password</label>
              <div className={styles.inputGroup}>
                <Key size={18} />
                <input
                  type="password"
                  value={passwordForm.confirm_password}
                  onChange={(e) =>
                    onPasswordFormChange("confirm_password", e.target.value)
                  }
                  placeholder="Confirm new password"
                  required
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={onCancelPasswordForm}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveBtn}
                disabled={
                  loading.password ||
                  passwordForm.new_password !== passwordForm.confirm_password
                }
              >
                {loading.password ? (
                  <Loader2 size={16} className={styles.spinner} />
                ) : (
                  <Save size={16} />
                )}
                Update Password
              </button>
            </div>
          </form>
        )}

        <div className={styles.securityItem}>
          <div className={styles.securityIcon}>
            <Shield size={24} />
          </div>
          <div className={styles.securityInfo}>
            <h4>Two-Factor Authentication</h4>
            <p>Add an extra layer of security to your account</p>
          </div>
          <button className={styles.securityAction}>Enable 2FA</button>
        </div>

        <div className={styles.securityItem}>
          <div className={styles.securityIcon}>
            <Smartphone size={24} />
          </div>
          <div className={styles.securityInfo}>
            <h4>Active Sessions</h4>
            <p>Manage your active login sessions</p>
          </div>
          <button className={styles.securityAction}>View Sessions</button>
        </div>
      </div>
    </div>
  )
);

SecurityTab.displayName = "SecurityTab";

export default SecurityTab;
