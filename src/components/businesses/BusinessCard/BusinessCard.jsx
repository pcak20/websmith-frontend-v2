import styles from "./BusinessCard.module.css";
import { Globe, Users, DollarSign, Settings, Clock } from "lucide-react";
import Button from "../../UI/Button/Button";

const BusinessCard = ({
  business,
  icon: IconComponent,
  categoryColor,
  metrics,
  onAction,
}) => (
  <div key={business.id} className={styles.businessCard}>
    <div className={styles.businessHeader}>
      <div
        className={styles.businessIcon}
        style={{ backgroundColor: categoryColor }}
      >
        {business.logo_url ? (
          <img
            src={business.logo_url}
            alt={`${business.name} logo`}
            className={styles.businessLogo}
          />
        ) : (
          <IconComponent size={24} color="white" />
        )}
      </div>
      <div className={styles.businessStatusIndicator}>
        <div className={`${styles.statusDot} ${styles[business.status]}`}></div>
        <span className={styles.statusText}>{business.status}</span>
      </div>
    </div>

    <div className={styles.businessInfo}>
      <h3 className={styles.businessName}>{business.name}</h3>
      <p className={styles.businessDescription}>{business.description}</p>

      {business.average_rating > 0 && (
        <div className={styles.businessRating}>
          <Star size={16} fill="#fbbf24" color="#fbbf24" />
          <span>{metrics.rating}</span>
          <span className={styles.reviewCount}>
            ({metrics.reviews} reviews)
          </span>
        </div>
      )}
    </div>

    <div className={styles.businessMetrics}>
      <div className={styles.metricRow}>
        <div className={styles.metric}>
          <Globe size={16} />
          <span>
            {metrics.websites} website{metrics.websites !== 1 ? "s" : ""}
          </span>
        </div>
        <div className={styles.metric}>
          <Users size={16} />
          <span>{metrics.visitors} visitors</span>
        </div>
      </div>
      <div className={styles.metricRow}>
        <div className={styles.metric}>
          <DollarSign size={16} />
          <span>{metrics.revenue} revenue</span>
        </div>
        {business.monthly_growth > 0 && (
          <div className={`${styles.metric} ${styles.growth}`}>
            <TrendingUp size={16} />
            <span>{metrics.growth} growth</span>
          </div>
        )}
      </div>
    </div>

    <div className={styles.businessActions}>
      <Button
        variant="primary"
        size="small"
        onClick={() => onAction("view", business.id)}
      >
        View
      </Button>
      <Button
        variant="outline"
        size="small"
        onClick={() => onAction("edit", business.id)}
      >
        Edit
      </Button>
      <Button
        variant="outline"
        size="small"
        onClick={() => onAction("settings", business.id)}
      >
        <Settings size={16} />
      </Button>
    </div>

    <div className={styles.businessFooter}>
      <div className={styles.lastUpdated}>
        <Clock size={14} />
        <span>
          Updated {new Date(business.updated_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  </div>
);

export default BusinessCard;
