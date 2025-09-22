import styles from "./EditorSidebar.module.css";

import { useState } from "react";
import SideBarHeader from "./SideBarHeader/SideBarHeader";
import DesignPanel from "./DesignPanel/DesignPanel";

function EditorSidebar({ conf }) {
  const [activeTab, setActiveTab] = useState("elements");
  return (
    <div className={styles.sidebar}>
      {/* Sidebar Header */}
      <SideBarHeader onActiveTabClick={setActiveTab} activeTab={activeTab} />

      {/* Sidebar Content */}
      <div className={styles.sidebarContent}>
        {activeTab === "design" && <DesignPanel conf={conf} />}
      </div>
    </div>
  );
}

export default EditorSidebar;
