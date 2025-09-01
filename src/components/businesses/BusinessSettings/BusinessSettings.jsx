import React, { useState } from "react";
import {
  Settings,
  User,
  Globe,
  Bell,
  Shield,
  CreditCard,
  Users,
  Trash2,
  Save,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";
import LoadingState from "../../UI/LoadingState/LoadingState";
import ErrorState from "../../UI/ErrorState/ErrorState";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import StatusBadge from "../../UI/StatusBadge/StatusBadge";
import styles from "./BusinessSettings.module.css";

const BusinessSettings = ({ business, loading, error, onUpdate, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);

  if (loading) {
    return <LoadingState message="Loading settings..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error loading settings"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const handleDeleteBusiness = async () => {
    if (onDelete) {
      await onDelete(business.id);
    }
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.settingsContent}>
      <div className={styles.settingsGrid}>
        {/* General Settings */}
        <div className={styles.section}>
          <h3>
            <User size={20} />
            General Settings
          </h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Business Name</h4>
                <p>Change your business display name</p>
              </div>
              <div className={styles.settingValue}>{business.name}</div>
              <Button
                variant="outline"
                size="small"
                onClick={() =>
                  (window.location.href = `/dashboard/businesses/${business.id}/edit`)
                }
              >
                Edit
              </Button>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Business Description</h4>
                <p>Brief description of your business</p>
              </div>
              <div className={styles.settingValue}>
                {business.description || "No description provided"}
              </div>
              <Button variant="outline" size="small">
                Edit
              </Button>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Business Logo</h4>
                <p>Upload or change your business logo</p>
              </div>
              <div className={styles.logoPreview}>
                {business.logo_url ? (
                  <img src={business.logo_url} alt="Business logo" />
                ) : (
                  <div className={styles.noLogo}>No logo uploaded</div>
                )}
              </div>
              <Button variant="outline" size="small" icon={Upload}>
                Upload
              </Button>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Business Category</h4>
                <p>The category that best describes your business</p>
              </div>
              <div className={styles.settingValue}>
                {business.business_category?.name ||
                  business.category?.name ||
                  "Not specified"}
              </div>
              <Button variant="outline" size="small">
                Change
              </Button>
            </div>
          </div>
        </div>

        {/* Website Settings */}
        <div className={styles.section}>
          <h3>
            <Globe size={20} />
            Website Settings
          </h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Default Template</h4>
                <p>Set default template for new websites</p>
              </div>
              <div className={styles.settingValue}>Restaurant Modern</div>
              <Button variant="outline" size="small">
                Change
              </Button>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>SEO Settings</h4>
                <p>Manage meta tags and SEO preferences</p>
              </div>
              <StatusBadge status="active" />
              <Button variant="outline" size="small">
                Configure
              </Button>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Analytics Tracking</h4>
                <p>Google Analytics and other tracking codes</p>
              </div>
              <StatusBadge
                status={business.analytics_enabled ? "active" : "inactive"}
              />
              <Button variant="outline" size="small">
                {business.analytics_enabled ? "Configure" : "Enable"}
              </Button>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Custom Domain</h4>
                <p>Connect your own domain name</p>
              </div>
              <div className={styles.settingValue}>
                {business.custom_domain || "No custom domain"}
              </div>
              <Button variant="outline" size="small">
                Configure
              </Button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className={styles.section}>
          <h3>
            <Bell size={20} />
            Notification Preferences
          </h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Email Notifications</h4>
                <p>Receive updates about your business via email</p>
              </div>
              <StatusBadge
                status={business.email_notifications ? "active" : "inactive"}
              />
              <Button variant="outline" size="small">
                {business.email_notifications ? "Disable" : "Enable"}
              </Button>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Marketing Emails</h4>
                <p>Receive marketing and promotional emails</p>
              </div>
              <StatusBadge
                status={business.marketing_emails ? "active" : "inactive"}
              />
              <Button variant="outline" size="small">
                {business.marketing_emails ? "Disable" : "Enable"}
              </Button>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Website Alerts</h4>
                <p>Get notified about website issues or downtime</p>
              </div>
              <StatusBadge status="active" />
              <Button variant="outline" size="small">
                Configure
              </Button>
            </div>
          </div>
        </div>

        {/* API & Integrations */}
        <div className={styles.section}>
          <h3>
            <Shield size={20} />
            API & Integrations
          </h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>API Keys</h4>
                <p>Manage API access for third-party integrations</p>
              </div>
              <Button
                variant="outline"
                size="small"
                icon={showApiKeys ? EyeOff : Eye}
                onClick={() => setShowApiKeys(!showApiKeys)}
              >
                {showApiKeys ? "Hide" : "Show"}
              </Button>
            </div>

            {showApiKeys && (
              <div className={styles.apiKeys}>
                <div className={styles.apiKey}>
                  <label>Public Key:</label>
                  <code>pk_live_51H...</code>
                  <Button variant="ghost" size="small">
                    Copy
                  </Button>
                </div>
                <div className={styles.apiKey}>
                  <label>Secret Key:</label>
                  <code>sk_live_51H...</code>
                  <Button variant="ghost" size="small">
                    Copy
                  </Button>
                </div>
              </div>
            )}

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Webhooks</h4>
                <p>Configure webhook endpoints for events</p>
              </div>
              <div className={styles.settingValue}>2 configured</div>
              <Button variant="outline" size="small">
                Manage
              </Button>
            </div>
          </div>
        </div>

        {/* Team Management */}
        <div className={styles.section}>
          <h3>
            <Users size={20} />
            Team Management
          </h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Team Members</h4>
                <p>Manage team access and permissions</p>
              </div>
              <div className={styles.settingValue}>
                {business.team_members?.length || 1} member(s)
              </div>
              <Button
                variant="outline"
                size="small"
                onClick={() =>
                  (window.location.href = `/dashboard/businesses/${business.id}/team`)
                }
              >
                Manage
              </Button>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Permissions</h4>
                <p>Set role-based access controls</p>
              </div>
              <StatusBadge status="configured" />
              <Button variant="outline" size="small">
                Configure
              </Button>
            </div>
          </div>
        </div>

        {/* Billing */}
        <div className={styles.section}>
          <h3>
            <CreditCard size={20} />
            Billing & Subscription
          </h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Current Plan</h4>
                <p>Your current subscription plan</p>
              </div>
              <div className={styles.settingValue}>
                {business.subscription_plan || "Free Plan"}
              </div>
              <Button variant="outline" size="small">
                Upgrade
              </Button>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Billing Information</h4>
                <p>Update payment methods and billing details</p>
              </div>
              <Button variant="outline" size="small">
                Manage
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={styles.section}>
          <h3 className={styles.dangerTitle}>
            <Trash2 size={20} />
            Danger Zone
          </h3>
          <div className={styles.dangerZone}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <h4>Delete Business</h4>
                <p>Permanently delete this business and all associated data</p>
              </div>
              <Button
                variant="destructive"
                size="small"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Business
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Business"
        size="medium"
      >
        <div className={styles.deleteModal}>
          <p>
            Are you sure you want to delete <strong>{business.name}</strong>?
            This action cannot be undone and will permanently delete:
          </p>
          <ul>
            <li>All websites associated with this business</li>
            <li>All analytics data and reports</li>
            <li>All team member access</li>
            <li>All custom domains and settings</li>
          </ul>
          <p>
            <strong>This action cannot be reversed.</strong>
          </p>

          <div className={styles.modalActions}>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBusiness}>
              Delete Business
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BusinessSettings;
