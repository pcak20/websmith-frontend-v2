import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Globe,
  Palette,
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  Store,
  Car,
  Utensils,
  LayoutTemplate,
  Shield,
} from "lucide-react";
import styles from "./DashboardLayout.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";

const DashboardLayout = ({ children, activePage: activePageProp }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active page from URL if not passed as prop
  const activePage =
    activePageProp || location.pathname.split("/").pop() || "dashboard";

  const { user: userProfile } = useUser();

  // Use auth user for admin checking and profile for image
  const user = {
    ...userProfile,
    profile_image: userProfile?.profile_image || null,
  };

  // Check if user is admin (staff or superuser)
  const isAdmin = user?.is_staff === true || user?.is_superuser === true;
  const mainNavItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    {
      id: "business",
      label: "My Businesses",
      icon: Briefcase,
      path: "/dashboard/business",
    },
    {
      id: "websites",
      label: "All Websites",
      icon: Globe,
      path: "/dashboard/websites",
    },
    {
      id: "templates",
      label: "Browse Templates",
      icon: LayoutTemplate,
      path: "/dashboard/templates",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      path: "/dashboard/analytics",
    },
  ];

  // Admin-only navigation items
  const adminNavItems = [
    {
      id: "admin-templates",
      label: "Manage Templates",
      icon: Shield,
      path: "/dashboard/admin/templates",
      adminOnly: true,
    },
  ];

  const bottomNavItems = [
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
    { id: "help", label: "Help & Support", icon: HelpCircle, path: "/help" },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getBusinessIcon = (type) => {
    const icons = {
      restaurant: Utensils,
      "vip-car-transfer": Car,
      default: Store,
    };
    return icons[type] || icons.default;
  };

  // Combine regular nav items with admin items if user is admin
  const allNavItems = isAdmin
    ? [...mainNavItems, ...adminNavItems]
    : mainNavItems;

  return (
    <div
      className={`${styles.dashboardLayout} ${
        sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      <aside
        className={`${styles.sidebar} ${
          sidebarOpen ? styles.open : styles.closed
        }`}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.logoSection}>
            <div className={styles.logo} onClick={() => navigate("/")}>
              {sidebarOpen ? "WebCraft" : "WC"}
            </div>
            <button
              className={styles.sidebarToggle}
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? (
                <ChevronLeft size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>
          </div>
          {/* Admin Badge */}
          {isAdmin && sidebarOpen && (
            <div className={styles.adminBadge}>
              <Shield size={14} />
              <span>Admin</span>
            </div>
          )}
        </div>

        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            {allNavItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activePage === item.id;

              return (
                <li key={item.id} className={styles.navItem}>
                  <a
                    href={item.path}
                    className={`${styles.navLink} ${
                      isActive ? styles.active : ""
                    } ${item.adminOnly ? styles.adminOnly : ""}`}
                    title={item.adminOnly ? "Admin Only" : item.label}
                  >
                    <IconComponent size={20} />
                    {sidebarOpen && (
                      <span>
                        {item.label}
                        {item.adminOnly && (
                          <span className={styles.adminIndicator}>
                            <Shield size={12} />
                          </span>
                        )}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <ul className={`${styles.navList} ${styles.bottomNav}`}>
            {bottomNavItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activePage === item.id;
              return (
                <li key={item.id} className={styles.navItem}>
                  <a
                    href={item.path}
                    className={`${styles.navLink} ${
                      isActive ? styles.active : ""
                    }`}
                  >
                    <IconComponent size={20} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className={styles.sidebarOverlay}
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <div className={styles.mainContent}>
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <button
              className={styles.mobileMenuBtn}
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <div className={styles.breadcrumb}>
              <span className={styles.breadcrumbItem}>Dashboard</span>
              {activePage !== "dashboard" && (
                <>
                  <span className={styles.breadcrumbSeparator}>/</span>
                  <span
                    className={`${styles.breadcrumbItem} ${styles.current}`}
                  >
                    {allNavItems.find((item) => item.id === activePage)
                      ?.label || "Page"}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className={styles.headerRight}>
            {/* Admin indicator in header */}
            {isAdmin && (
              <div className={styles.headerAdminBadge}>
                <Shield size={16} />
                <span>Admin</span>
              </div>
            )}
            <button
              className={styles.notificationBtn}
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className={styles.notificationBadge}>3</span>
            </button>
            <div className={styles.userMenu}>
              <button className={styles.userAvatar}>
                {user.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                ) : (
                  <User size={20} />
                )}
              </button>
              <div className={styles.userDropdown}>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>
                    {user.first_name} {user.last_name}
                    {isAdmin && (
                      <span className={styles.userRoleBadge}>
                        {user.is_superuser ? "Super Admin" : "Admin"}
                      </span>
                    )}
                  </div>
                  <div className={styles.userEmail}>{user.email}</div>
                </div>
                <div className={styles.dropdownDivider}></div>
                <a href="/profile" className={styles.dropdownItem}>
                  <User size={16} />
                  <span>Profile</span>
                </a>
                <a href="/settings" className={styles.dropdownItem}>
                  <Settings size={16} />
                  <span>Settings</span>
                </a>
                {/* Admin-only dropdown items */}
                {isAdmin && (
                  <>
                    <div className={styles.dropdownDivider}></div>
                    <div className={styles.dropdownSection}>
                      <span className={styles.dropdownSectionTitle}>Admin</span>
                      <a
                        href="/dashboard/admin/templates"
                        className={styles.dropdownItem}
                      >
                        <Shield size={16} />
                        <span>Manage Templates</span>
                      </a>
                      <a
                        href="/dashboard/admin/users"
                        className={styles.dropdownItem}
                      >
                        <User size={16} />
                        <span>Manage Users</span>
                      </a>
                      <a
                        href="/dashboard/admin/system"
                        className={styles.dropdownItem}
                      >
                        <Settings size={16} />
                        <span>System Settings</span>
                      </a>
                    </div>
                  </>
                )}
                <div className={styles.dropdownDivider}></div>
                <button className={`${styles.dropdownItem} ${styles.logout}`}>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className={styles.pageContent}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
