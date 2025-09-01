// src/pages/templates/restaurant/index.js
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load template pages for better performance
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const MenuPage = lazy(() => import("./pages/MenuPage/MenuPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage/ContactPage"));
const ReservationPage = lazy(() =>
  import("./pages/ReservationPage/ReservationPage")
);
const CartPage = lazy(() => import("./pages/CartPage/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage/CheckoutPage"));
const OrderTrackingPage = lazy(() =>
  import("./pages/OrderTrackingPage/OrderTrackingPage")
);
const AccountPage = lazy(() => import("./pages/AccountPage/AccountPage"));

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
    <p>Loading page...</p>
  </div>
);

// Restaurant Template Router Component
const RestaurantTemplate1Router = ({ websiteData, templateId }) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public pages */}
        <Route
          path="/"
          element={
            <Homepage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/menu"
          element={
            <MenuPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/about"
          element={
            <AboutPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/gallery"
          element={
            <GalleryPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/contact"
          element={
            <ContactPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/reservations"
          element={
            <ReservationPage
              websiteData={websiteData}
              templateId={templateId}
            />
          }
        />

        {/* Order flow pages */}
        <Route
          path="/cart"
          element={
            <CartPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/track-order"
          element={
            <OrderTrackingPage
              websiteData={websiteData}
              templateId={templateId}
            />
          }
        />
        <Route
          path="/track-order/:orderId"
          element={
            <OrderTrackingPage
              websiteData={websiteData}
              templateId={templateId}
            />
          }
        />

        {/* User account pages */}
        <Route
          path="/account"
          element={
            <AccountPage websiteData={websiteData} templateId={templateId} />
          }
        />
        <Route
          path="/account/*"
          element={
            <AccountPage websiteData={websiteData} templateId={templateId} />
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
export const RESTAURANT_TEMPLATE_CONFIG = {
  id: "restaurant-template-001",
  name: "Bella Vista Restaurant Template",
  category: "restaurant",

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
      id: "menu",
      name: "Menu",
      component: "MenuPage",
      path: "/menu",
      isRequired: true,
      showInMenu: true,
      menuOrder: 2,
    },
    {
      id: "about",
      name: "About",
      component: "AboutPage",
      path: "/about",
      isRequired: false,
      showInMenu: true,
      menuOrder: 3,
    },
    {
      id: "gallery",
      name: "Gallery",
      component: "GalleryPage",
      path: "/gallery",
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
      id: "reservations",
      name: "Reservations",
      component: "ReservationPage",
      path: "/reservations",
      isRequired: false,
      showInMenu: true,
      menuOrder: 6,
    },
    {
      id: "cart",
      name: "Cart",
      component: "CartPage",
      path: "/cart",
      isRequired: false,
      showInMenu: false,
      menuOrder: 0,
    },
    {
      id: "checkout",
      name: "Checkout",
      component: "CheckoutPage",
      path: "/checkout",
      isRequired: false,
      showInMenu: false,
      menuOrder: 0,
    },
    {
      id: "order-tracking",
      name: "Order Tracking",
      component: "OrderTrackingPage",
      path: "/track-order",
      isRequired: false,
      showInMenu: false,
      menuOrder: 0,
    },
    {
      id: "account",
      name: "Account",
      component: "AccountPage",
      path: "/account",
      isRequired: false,
      showInMenu: false,
      menuOrder: 0,
    },
  ],
};

export default RestaurantTemplate1Router;
