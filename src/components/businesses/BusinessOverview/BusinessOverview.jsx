import React from "react";
import {
  Globe,
  FileText,
  Users,
  Edit3,
  Eye,
  Plus,
  BarChart3,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import StatCard from "../../UI/StatCard/StatCard";
import LoadingState from "../../UI/LoadingState/LoadingState";
import EmptyState from "../../UI/EmptyState/EmptyState";
import { formatSocialHandle } from "../../../utils/businessUtils";
import styles from "./BusinessOverview.module.css";

const BusinessOverview = ({
  business,
  websites,
  analytics,
  loading,
  error,
}) => {
  if (loading.businessDetails) {
    return <LoadingState message="Loading business overview..." />;
  }

  return (
    <div className={styles.overviewContent}>
      <div className={styles.overviewGrid}>
        {/* Quick Stats */}
        <div className={styles.section}>
          <h3>Quick Stats</h3>
          <div className={styles.quickStats}>
            <StatCard
              icon={Globe}
              title="Published Sites"
              value={
                websites?.filter((w) => w.status === "published").length || 0
              }
              color="success"
              className={styles.quickStat}
            />
            <StatCard
              icon={FileText}
              title="Draft Sites"
              value={websites?.filter((w) => w.status === "draft").length || 0}
              color="warning"
              className={styles.quickStat}
            />
            <StatCard
              icon={Users}
              title="Monthly Visitors"
              value={analytics?.total_visitors?.toLocaleString() || "0"}
              color="primary"
              className={styles.quickStat}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.section}>
          <h3>Recent Activity</h3>
          <div className={styles.activityList}>
            {loading.businessDetails ? (
              <LoadingState size="small" message="Loading recent activity..." />
            ) : analytics?.recent_activity?.length > 0 ? (
              analytics.recent_activity.map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    {activity.type === "edit" && <Edit3 size={16} />}
                    {activity.type === "domain" && <Globe size={16} />}
                    {activity.type === "publish" && <Eye size={16} />}
                    {activity.type === "report" && <BarChart3 size={16} />}
                    {activity.type === "create" && <Plus size={16} />}
                  </div>
                  <div className={styles.activityContent}>
                    <p>{activity.description || activity.action}</p>
                    <span>
                      {new Date(
                        activity.created_at || activity.date
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                title="No recent activity"
                message="Activity will appear here as you work on your business"
                className={styles.emptyActivity}
              />
            )}
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className={styles.section}>
        <h3>Business Information</h3>
        <div className={styles.businessInfoGrid}>
          <div className={styles.infoCard}>
            <h4>Contact Details</h4>
            <div className={styles.infoList}>
              {business.phone && (
                <div className={styles.infoItem}>
                  <Phone size={16} />
                  <span>{business.phone}</span>
                </div>
              )}
              {business.email && (
                <div className={styles.infoItem}>
                  <Mail size={16} />
                  <span>{business.email}</span>
                </div>
              )}
              {business.address?.full && (
                <div className={styles.infoItem}>
                  <MapPin size={16} />
                  <span>{business.address.full}</span>
                </div>
              )}
              {!business.phone &&
                !business.email &&
                !business.address?.full && (
                  <p className={styles.noInfo}>No contact details added yet</p>
                )}
            </div>
          </div>

          <div className={styles.infoCard}>
            <h4>Social Media</h4>
            <div className={styles.infoList}>
              {business.socialMedia?.facebook && (
                <div className={styles.infoItem}>
                  <Facebook size={16} />
                  <span>
                    {formatSocialHandle(business.socialMedia.facebook)}
                  </span>
                </div>
              )}
              {business.socialMedia?.instagram && (
                <div className={styles.infoItem}>
                  <Instagram size={16} />
                  <span>
                    {formatSocialHandle(business.socialMedia.instagram)}
                  </span>
                </div>
              )}
              {business.socialMedia?.twitter && (
                <div className={styles.infoItem}>
                  <Twitter size={16} />
                  <span>
                    {formatSocialHandle(business.socialMedia.twitter)}
                  </span>
                </div>
              )}
              {!business.socialMedia?.facebook &&
                !business.socialMedia?.instagram &&
                !business.socialMedia?.twitter && (
                  <p className={styles.noInfo}>
                    No social media accounts linked
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;
