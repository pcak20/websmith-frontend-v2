// components/ProfilePage/tabs/PrivacyTab.jsx
import React, { memo } from "react";
import { Download, Activity, Trash2, Loader2 } from "lucide-react";
import styles from "../ProfilePage.module.css";

const PrivacyTab = memo(
  ({ loading, onExportData, onViewActivity, onDeleteAccount }) => (
    <div className={styles.tabContent}>
      <div className={styles.privacySection}>
        <h3>Privacy & Data</h3>

        <div className={styles.privacyActions}>
          <div className={styles.privacyItem}>
            <div className={styles.privacyIcon}>
              <Download size={24} />
            </div>
            <div className={styles.privacyInfo}>
              <h4>Download Your Data</h4>
              <p>Export all your personal data and business information</p>
            </div>
            <button
              onClick={onExportData}
              className={styles.privacyAction}
              disabled={loading.export}
            >
              {loading.export ? (
                <Loader2 size={16} className={styles.spinner} />
              ) : (
                "Download"
              )}
            </button>
          </div>

          <div className={styles.privacyItem}>
            <div className={styles.privacyIcon}>
              <Activity size={24} />
            </div>
            <div className={styles.privacyInfo}>
              <h4>Account Activity</h4>
              <p>View your recent account activity and login history</p>
            </div>
            <button onClick={onViewActivity} className={styles.privacyAction}>
              View Activity
            </button>
          </div>

          <div className={styles.privacyItem}>
            <div className={styles.privacyIcon}>
              <Trash2 size={24} />
            </div>
            <div className={styles.privacyInfo}>
              <h4>Delete Account</h4>
              <p>Permanently delete your account and all associated data</p>
            </div>
            <button
              onClick={onDeleteAccount}
              className={`${styles.privacyAction} ${styles.danger}`}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
);

PrivacyTab.displayName = "PrivacyTab";

export default PrivacyTab;
