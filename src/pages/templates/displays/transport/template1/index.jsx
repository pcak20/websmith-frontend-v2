// src/pages/templates/transport/index.js
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load template pages for better performance
const HomePage = lazy(() => import("./pages/Homepage/Homepage"));
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage/ContactPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const FleetPage = lazy(() => import("./pages/FleetPage/FleetPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const PricingPage = lazy(() => import("./pages/PricingPage/PricingPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const BookingFlow = lazy(() =>
  import("./pages/booking/BookingFlow/BookingFlow")
);
const BookingSuccess = lazy(() =>
  import("./pages/booking/BookingSuccess/BookingSuccess")
);

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
    <p>Loading page...</p>
  </div>
);

// Transport Template Router Component
const TransportTemplate1Router = ({ websiteData, templateId }) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public pages */}
        <Route
          path="/"
          element={
            <HomePage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/about"
          element={
            <AboutPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/contact"
          element={
            <ContactPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/fleet"
          element={
            <FleetPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/pricing"
          element={
            <PricingPage websiteData={websiteData} templateId={templateId} />
          }
        />

        {/* Authentication pages */}
        <Route
          path="/login"
          element={
            <LoginPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage websiteData={websiteData} templateId={templateId} />
          }
        />

        {/* Protected user pages */}
        <Route
          path="/dashboard"
          element={
            <DashboardPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <DashboardPage websiteData={websiteData} templateId={templateId} />
          }
        />

        {/* Booking flow */}
        <Route
          path="/booking"
          element={
            <BookingFlow websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/booking/step/:step"
          element={
            <BookingFlow websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/booking-success"
          element={
            <BookingSuccess websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/booking-success/:bookingId"
          element={
            <BookingSuccess websiteData={websiteData} templateId={templateId} />
          }
        />

        {/* Fallback route */}
        <Route
          path="*"
          element={
            <div className="page-not-found">
              <h2>Page Not Found</h2>
              <p>The requested page does not exist.</p>
              <a href="/">Return to Home</a>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};

// Template configuration
export const TRANSPORT_TEMPLATE_CONFIG = {
  id: "transport-template-001",
  name: "TransportHub Logistics Template",
  category: "transport",

  // Available pages in this template
  pages: [
    {
      id: "home",
      name: "Home",
      component: "HomePage",
      path: "/",
      isRequired: true,
      showInMenu: true,
      menuOrder: 1,
    },
    {
      id: "about",
      name: "About",
      component: "AboutPage",
      path: "/about",
      isRequired: false,
      showInMenu: true,
      menuOrder: 2,
    },
    {
      id: "fleet",
      name: "Fleet",
      component: "FleetPage",
      path: "/fleet",
      isRequired: false,
      showInMenu: true,
      menuOrder: 3,
    },
    {
      id: "pricing",
      name: "Pricing",
      component: "PricingPage",
      path: "/pricing",
      isRequired: false,
      showInMenu: true,
      menuOrder: 4,
    },
    {
      id: "contact",
      name: "Contact",
      component: "ContactPage",
      path: "/contact",
      isRequired: false,
      showInMenu: true,
      menuOrder: 5,
    },
    {
      id: "login",
      name: "Login",
      component: "LoginPage",
      path: "/login",
      isRequired: false,
      showInMenu: false,
      menuOrder: 0,
    },
    {
      id: "register",
      name: "Register",
      component: "RegisterPage",
      path: "/register",
      isRequired: false,
      showInMenu: false,
      menuOrder: 0,
    },
    {
      id: "dashboard",
      name: "Dashboard",
      component: "DashboardPage",
      path: "/dashboard",
      isRequired: false,
      showInMenu: false,
      menuOrder: 0,
    },
    {
      id: "booking-flow",
      name: "Booking",
      component: "BookingFlow",
      path: "/booking",
      isRequired: false,
      showInMenu: false,
      menuOrder: 0,
    },
    {
      id: "booking-success",
      name: "Booking Success",
      component: "BookingSuccess",
      path: "/booking-success",
      isRequired: false,
      showInMenu: false,
      menuOrder: 0,
    },
  ],
};

export default TransportTemplate1Router;
