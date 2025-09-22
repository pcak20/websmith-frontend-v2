import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./NextPrevButtons.module.css";

function NextPrevButtons({ conf }) {
  const {
    availablePages,
    currentTemplatePage,
    handleCurrentTemplatePageChange,
  } = conf;

  // Find current page index
  const currentPageIndex = availablePages.findIndex(
    (page) => page.id === currentTemplatePage.id
  );

  // Calculate navigation state
  const hasPrevious = currentPageIndex > 0;
  const hasNext = currentPageIndex < availablePages.length - 1;

  // Navigation handlers
  const onPrevious = () => {
    if (hasPrevious) {
      const previousPage = availablePages[currentPageIndex - 1];
      handleCurrentTemplatePageChange(previousPage);
    }
  };

  const onNext = () => {
    if (hasNext) {
      const nextPage = availablePages[currentPageIndex + 1];
      handleCurrentTemplatePageChange(nextPage);
    }
  };

  return (
    <div className={styles.pageNavigation}>
      <button
        className={`${styles.pageNavBtn} ${
          !hasPrevious ? styles.disabled : ""
        }`}
        onClick={onPrevious}
        disabled={!hasPrevious}
        title="Previous page"
      >
        <ChevronLeft size={16} />
        Previous
      </button>
      <button
        className={`${styles.pageNavBtn} ${!hasNext ? styles.disabled : ""}`}
        onClick={onNext}
        disabled={!hasNext}
        title="Next page"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default NextPrevButtons;
