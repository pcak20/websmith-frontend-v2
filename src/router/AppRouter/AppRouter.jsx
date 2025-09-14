import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import HomePage from "../../pages/app/public/HomePage/HomePage";
import BusinessDashboard from "../../pages/app/dashboard/BusinessDashboard/BusinessDashboard";
import BusinessDetailDashboard from "../../pages/app/dashboard/BusinessDetailDashboard/BusinessDetailDashboard";
import BusinessWebsiteDetailDashboard from "../../pages/app/dashboard/BusinessWebsiteDetailDashboard/BusinessWebsiteDetailDashboard";
import LoginPage from "../../pages/app/public/LoginPage/LoginPage";
import RegisterPage from "../../pages/app/public/RegisterPage/RegisterPage";
import ProfilePage from "../../pages/app/public/ProfilePage/ProfilePage";
import AdminTemplateManagement from "../../pages/app/dashboard/AdminTemplateManagement/AdminTemplateManagement";
import TemplateDetailPage from "../../pages/app/dashboard/TemplateDetailPage/TemplateDetailPage";
import TemplateSampleViewer from "../../pages/app/dashboard/TemplateSampleViewer/TemplateSampleViewer";
import BusinessWebsiteEditor from "../../pages/app/dashboard/BusinessWebsiteEditor/BusinessWebsiteEditor";
import AnalyticsDashboard from "../../pages/app/dashboard/AnalyticsDashboard/AnalyticsDashboard";
import BrowseTemplatesDashboard from "../../pages/app/dashboard/BrowseTemplatesDashboard/BrowseTemplatesDashboard";
import AllWebsitesDashboard from "../../pages/app/dashboard/AllWebsitesDashboard/AllWebsitesDashboard";
import DashboardPage from "../../pages/app/dashboard/DashboardPage/DashboardPage";
import HelpAndSupport from "../../pages/app/dashboard/HelpAndSupport/HelpAndSupport";
import Settings from "../../pages/app/dashboard/Settings/Settings";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/business" element={<BusinessDashboard />} />
        <Route
          path="/dashboard/business/detail/:businessId"
          element={<BusinessDetailDashboard />}
        />
        <Route
          path="/dashboard/website/detail/:websiteId"
          element={<BusinessWebsiteDetailDashboard />}
        />
        <Route
          path="/dashboard/website/edit/:websiteId"
          element={<BusinessWebsiteEditor />}
        />

        <Route path="/dashboard/websites/" element={<AllWebsitesDashboard />} />

        <Route path="/dashboard/analytics" element={<AnalyticsDashboard />} />

        <Route
          path="/dashboard/templates/"
          element={<BrowseTemplatesDashboard />}
        />

        <Route
          path="/dashboard/admin/templates"
          element={<AdminTemplateManagement />}
        />
        <Route
          path="/dashboard/admin/templates/:templateId"
          element={<TemplateDetailPage />}
        />

        <Route
          path="/dashboard/sample/:templateId/*"
          element={<TemplateSampleViewer />}
        />

        <Route path="/help" element={<HelpAndSupport />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
