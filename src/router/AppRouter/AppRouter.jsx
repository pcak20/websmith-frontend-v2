import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/app/public/HomePage/HomePage";
import RestaurantRouter from "./RestaurantRouter";
import TransportRouter from "./TransportRouter";
import DashboardLayout from "../../pages/app/dashboard/components/DashboardLayout/DashboardLayout";
import BusinessDashboard from "../../pages/app/dashboard/pages/BusinessDashboard/BusinessDashboard";
import BusinessDetailDashboard from "../../pages/app/dashboard/pages/BusinessDetailDashboard/BusinessDetailDashboard";
import BusinessWebsiteDetailDashboard from "../../pages/app/dashboard/pages/BusinessWebsiteDetailDashboard/BusinessWebsiteDetailDashboard";
import LoginPage from "../../pages/app/public/LoginPage/LoginPage";
import RegisterPage from "../../pages/app/public/RegisterPage/RegisterPage";
import ProfilePage from "../../pages/app/public/ProfilePage/ProfilePage";
import AdminTemplateManagement from "../../pages/app/dashboard/pages/AdminTemplateManagement/AdminTemplateManagement";
import TemplateDetailPage from "../../pages/app/dashboard/pages/TemplateDetailPage/TemplateDetailPage";
import TemplateSampleViewer from "../../pages/app/dashboard/pages/TemplateSampleViewer/TemplateSampleViewer";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/dashboard/business" element={<BusinessDashboard />} />
        <Route
          path="/dashboard/business/detail/:businessId"
          element={<BusinessDetailDashboard />}
        />
        <Route
          path="/dashboard/business/website/detail"
          element={<BusinessWebsiteDetailDashboard />}
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
        {/* RESTAURANT */}
        <Route path="/restaurant/*" element={<RestaurantRouter />} />

        {/* TRANSPORTATION */}
        <Route path="/transport/*" element={<TransportRouter />} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
