import React from "react";
import {
  Users,
  BarChart3,
  Globe,
  Clock,
  Eye,
  Edit3,
  Settings,
  MoreVertical,
} from "lucide-react";
import Button from "../../UI/Button/Button";
import StatusBadge from "../../UI/StatusBadge/StatusBadge";
import styles from "./BusinessWebsiteCard.module.css";
import { useNavigate } from "react-router-dom";

const BusinessWebsiteCard = ({ website, onAction }) => {
  const handleAction = (action, e) => {
    e.stopPropagation();
    onAction(action, website);
  };

  const navigate = useNavigate();

  const handleWebsiteCardClick = () => {
    navigate("/dashboard/website/detail/" + website.id);
  };

  return (
    <div onClick={handleWebsiteCardClick} className={styles.websiteCard}>
      <div className={styles.websitePreview}>
        <div className={styles.websiteThumbnail}>
          {website.favicon && <img src={website.favicon} alt={website.name} />}
        </div>
        <div className={styles.websiteOverlay}>
          <Button
            size="small"
            variant="outline"
            onClick={(e) => handleAction("preview", e)}
          >
            <Eye size={16} /> Preview
          </Button>
          <Button
            size="small"
            variant="primary"
            onClick={(e) => handleAction("edit", e)}
          >
            <Edit3 size={16} /> Edit
          </Button>
        </div>
      </div>

      <div className={styles.websiteInfo}>
        <div className={styles.websiteHeader}>
          <div>
            <h4 className={styles.websiteName}>{website.name}</h4>
            <p className={styles.websiteTemplate}>
              {website.template_name || website.template || "No template"}
            </p>
          </div>
          <div className={styles.websiteActions}>
            <StatusBadge status={website.status} />
            <Button
              size="small"
              variant="ghost"
              onClick={(e) => handleAction("more", e)}
            >
              <MoreVertical size={16} />
            </Button>
          </div>
        </div>

        <div className={styles.websiteMetrics}>
          <div className={styles.metricItem}>
            <Users size={14} />
            <span>
              {website.total_visitors?.toLocaleString() || "0"} visitors
            </span>
          </div>
          <div className={styles.metricItem}>
            <BarChart3 size={14} />
            <span>{website.conversion_rate || 0}% conversion</span>
          </div>
          <div className={styles.metricItem}>
            <Globe size={14} />
            <span>
              {website.custom_domain ||
                website.url ||
                `${website.subdomain}.webcraft.com`}
            </span>
          </div>
        </div>

        <div className={styles.websiteFooter}>
          <div className={styles.lastModified}>
            <Clock size={12} />
            <span>
              Updated{" "}
              {website.updated_at
                ? new Date(website.updated_at).toLocaleDateString()
                : "Never"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessWebsiteCard;
