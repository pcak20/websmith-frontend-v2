import { getCategoryIcon } from "../../../utils/businessUtils";
import Button from "../../UI/Button/Button";
import {
  ArrowLeft,
  Share2,
  Download,
  Edit3,
  MapPin,
  Phone,
} from "lucide-react";
import StatCard from "../../UI/StatCard/StatCard";
import styles from "./BusinessHeader.module.css";

const BusinessHeader = ({ business, analytics, onBack, onAction }) => {
  const IconComponent = getCategoryIcon(
    business.category?.slug || business.business_category?.slug
  );

  return (
    <div className={styles.headerSection}>
      <div className={styles.headerTop}>
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={onBack}
          className={styles.backBtn}
        >
          Back to Businesses
        </Button>
        <div className={styles.headerActions}>
          <Button variant="outline" icon={Share2}>
            Share
          </Button>
          <Button variant="outline" icon={Download}>
            Export
          </Button>
          <Button
            variant="primary"
            icon={Edit3}
            onClick={() => onAction("edit")}
          >
            Edit Business
          </Button>
        </div>
      </div>

      <div className={styles.businessHeader}>
        <div className={styles.businessIcon}>
          {business.logoUrl ? (
            <img src={business.logoUrl} alt={business.name} />
          ) : (
            <IconComponent size={32} color="white" />
          )}
        </div>

        <div className={styles.businessInfo}>
          <h1 className={styles.businessName}>{business.name}</h1>
          <p className={styles.businessDescription}>{business.description}</p>

          <div className={styles.businessMeta}>
            {business.address?.full && (
              <div className={styles.metaItem}>
                <MapPin size={16} />
                <span>{business.address.full}</span>
              </div>
            )}
            {business.phone && (
              <div className={styles.metaItem}>
                <Phone size={16} />
                <span>{business.phone}</span>
              </div>
            )}
            {business.averageRating > 0 && (
              <div className={styles.metaItem}>
                <Star size={16} fill="#fbbf24" color="#fbbf24" />
                <span>
                  {business.averageRating} ({business.totalReviews} reviews)
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.businessStats}>
          <StatCard
            title="Websites"
            value={business.websitesCount || 0}
            color="primary"
          />
          <StatCard
            title="Total Visitors"
            value={analytics?.total_visitors?.toLocaleString() || "0"}
            color="success"
          />
          <StatCard
            title="Revenue"
            value={
              analytics?.revenue_this_month
                ? `${(analytics.revenue_this_month / 1000).toFixed(1)}K`
                : "$0"
            }
            color="warning"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessHeader;
