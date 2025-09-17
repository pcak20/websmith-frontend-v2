import styles from "./MockpageContent.module.css";
import { useWebsite } from "../../../../../hooks/useWebsite";

function MockpageContent() {
  const { currentWebsite } = useWebsite();
  return (
    <div className={styles.pagePreview}>
      <div className={styles.mockSection}>
        <div className={styles.mockHero}>
          <div className={styles.mockHeroContent}>
            <h1 className={styles.mockTitle}>
              Welcome to {currentWebsite?.business?.name || "Your Business"}
            </h1>
            <p className={styles.mockSubtitle}>
              Create something amazing with our website builder
            </p>
            <button className={styles.mockButton}>Get Started</button>
          </div>
        </div>
      </div>

      <div className={styles.mockSection}>
        <div className={styles.mockContent}>
          <h2>About Our Services</h2>
          <div className={styles.mockGrid}>
            <div className={styles.mockCard}>
              <div className={styles.mockCardIcon}></div>
              <h3>Service 1</h3>
              <p>Description of your first service offering.</p>
            </div>
            <div className={styles.mockCard}>
              <div className={styles.mockCardIcon}></div>
              <h3>Service 2</h3>
              <p>Description of your second service offering.</p>
            </div>
            <div className={styles.mockCard}>
              <div className={styles.mockCardIcon}></div>
              <h3>Service 3</h3>
              <p>Description of your third service offering.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mockSection}>
        <div className={styles.mockContact}>
          <h2>Get in Touch</h2>
          <div className={styles.mockForm}>
            <div className={styles.mockFormRow}>
              <div className={styles.mockInput}></div>
              <div className={styles.mockInput}></div>
            </div>
            <div className={styles.mockInput}></div>
            <div className={styles.mockTextarea}></div>
            <button className={styles.mockFormButton}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockpageContent;
