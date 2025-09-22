import styles from "./PageSelector.module.css";

function PageSelector({
  onCurrentTemplatePageChange,
  currentTemplatePage,
  availablePages,
}) {
  return (
    <div className={styles.pageSelector}>
      <select
        value={currentTemplatePage.id}
        onChange={(e) => {
          const page = availablePages.find((p) => p.id === e.target.value);
          console.log(page);
          if (page) onCurrentTemplatePageChange(page);
        }}
        className={styles.pageSelect}
      >
        {availablePages.map((page) => (
          <option key={page.id} value={page.id}>
            {page.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PageSelector;
