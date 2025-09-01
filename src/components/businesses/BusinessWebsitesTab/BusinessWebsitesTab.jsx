import Button from "../../UI/Button/Button";
import styles from "./BusinessWebsiteTab.module.css";
import { Plus, Globe } from "lucide-react";
import EmptyState from "../../UI/EmptyState/EmptyState";

const BusinessWebsitesTab = ({
  business,
  websites,
  templates,
  featuredTemplates,
  templateCategories,
  loading,
  error,
  onCreateWebsite,
  onWebsiteAction,
}) => {
  if (loading.websites) {
    return <LoadingState message="Loading websites..." />;
  }

  if (error.websites) {
    return (
      <ErrorState
        title="Error loading websites"
        message={error.websites}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className={styles.websitesContent}>
      <div className={styles.websitesHeader}>
        <h3>Websites ({websites?.length || 0})</h3>
        <Button
          variant="primary"
          icon={Plus}
          onClick={onCreateWebsite}
          loading={loading.create}
        >
          Create New Website
        </Button>
      </div>

      {websites?.length > 0 ? (
        <div className={styles.websitesGrid}>
          {websites.map((website) => (
            <BusinessWebsiteCard
              key={website.id}
              website={website}
              onAction={onWebsiteAction}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Globe}
          title="No websites yet"
          message="Create your first website to start building your online presence."
          action={
            <Button variant="primary" icon={Plus} onClick={onCreateWebsite}>
              Create Your First Website
            </Button>
          }
        />
      )}
    </div>
  );
};

export default BusinessWebsitesTab;
