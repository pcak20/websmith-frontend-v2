// components/ProfilePage/tabs/NotificationsTab.jsx
import React, { memo } from "react";
import styles from "../ProfilePage.module.css";

const NotificationsTab = memo(
  ({ notificationSettings, onNotificationUpdate }) => (
    <div className={styles.tabContent}>
      <div className={styles.notificationsSection}>
        <h3>Notification Preferences</h3>

        <div className={styles.notificationGroups}>
          <div className={styles.notificationGroup}>
            <h4>General Notifications</h4>

            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <h5>Email Notifications</h5>
                <p>Receive important updates via email</p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notificationSettings.email_notifications}
                  onChange={(e) =>
                    onNotificationUpdate(
                      "email_notifications",
                      e.target.checked
                    )
                  }
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <h5>SMS Notifications</h5>
                <p>Receive critical alerts via SMS</p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notificationSettings.sms_notifications}
                  onChange={(e) =>
                    onNotificationUpdate("sms_notifications", e.target.checked)
                  }
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <h5>Marketing Emails</h5>
                <p>Receive product updates and promotions</p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notificationSettings.marketing_emails}
                  onChange={(e) =>
                    onNotificationUpdate("marketing_emails", e.target.checked)
                  }
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>

          <div className={styles.notificationGroup}>
            <h4>Business Notifications</h4>

            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <h5>Security Alerts</h5>
                <p>Important security and login notifications</p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notificationSettings.security_alerts}
                  onChange={(e) =>
                    onNotificationUpdate("security_alerts", e.target.checked)
                  }
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <h5>Business Updates</h5>
                <p>Updates about your businesses and websites</p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notificationSettings.business_updates}
                  onChange={(e) =>
                    onNotificationUpdate("business_updates", e.target.checked)
                  }
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <h5>Analytics Reports</h5>
                <p>Weekly and monthly analytics summaries</p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notificationSettings.website_analytics}
                  onChange={(e) =>
                    onNotificationUpdate("website_analytics", e.target.checked)
                  }
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

NotificationsTab.displayName = "NotificationsTab";

export default NotificationsTab;
