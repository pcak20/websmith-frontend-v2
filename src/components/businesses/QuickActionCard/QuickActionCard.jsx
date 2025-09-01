import styles from "./QuickActionCard.module.css";
import { ArrowRight } from "lucide-react";

const QuickActionCard = ({ icon: Icon, title, description, href }) => (
  <div
    className={styles.actionCard}
    onClick={() => (window.location.href = href)}
  >
    <div className={styles.actionIcon}>
      <Icon size={24} />
    </div>
    <div className={styles.actionContent}>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
    <ArrowRight size={20} />
  </div>
);

export default QuickActionCard;
