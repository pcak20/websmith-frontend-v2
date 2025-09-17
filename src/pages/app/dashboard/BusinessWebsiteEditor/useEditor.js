import React, { useState } from "react";

export const useEditor = () => {
  // Website features state
  const [websiteFeatures, setWebsiteFeatures] = useState({
    // Pages & Navigation
    showAboutPage: true,
    showServicesPage: true,
    showGalleryPage: false,
    showBlogPage: false,
    showTestimonialsPage: false,
    showFaqPage: false,
    showPrivacyPage: true,
    showTermsPage: true,

    // E-commerce
    enableEcommerce: false,
    showPricingPage: false,
    enablePayments: false,
    acceptPaypal: false,
    acceptStripe: false,
    acceptCrypto: false,
    showShoppingCart: false,
    enableWishlist: false,

    // User Management
    allowUserRegistration: false,
    requireEmailVerification: true,
    enableUserProfiles: false,
    enableSocialLogin: false,
    allowGuestCheckout: true,

    // Communication
    enableContactForm: true,
    showPhoneNumber: true,
    showEmailAddress: true,
    showPhysicalAddress: false,
    enableLiveChat: false,
    enableAppointmentBooking: false,
    enableNewsletterSignup: false,

    // Content & Engagement
    enableComments: false,
    enableRatings: false,
    enableSocialSharing: true,
    showSocialMediaLinks: true,
    enableSearch: false,
    enableMultiLanguage: false,

    // Analytics & Marketing
    enableGoogleAnalytics: false,
    enableFacebookPixel: false,
    enableCookieConsent: true,
    enableGDPRCompliance: true,
    enableSEOOptimization: true,
    enableSitemap: true,

    // Security & Performance
    enableSSL: true,
    enableCDN: false,
    enableCaching: true,
    enableBackups: true,
    enable2FA: false,
    enableCaptcha: false,

    // Integrations
    enableGoogleMaps: false,
    enableCalendarIntegration: false,
    enableCRMIntegration: false,
    enableEmailMarketing: false,
    enableZapierIntegration: false,
  });

  const handleFeatureToggle = (featureName, value) => {
    setWebsiteFeatures((prev) => ({
      ...prev,
      [featureName]: value,
    }));
    setUnsavedChanges(true);

    // Handle dependent features logic
    if (featureName === "enableEcommerce" && value) {
      setWebsiteFeatures((prev) => ({
        ...prev,
        showPricingPage: true,
        showShoppingCart: true,
        enablePayments: true,
      }));
    }

    if (featureName === "allowUserRegistration" && value) {
      setWebsiteFeatures((prev) => ({
        ...prev,
        enableUserProfiles: true,
      }));
    }

    if (featureName === "enableEcommerce" && !value) {
      setWebsiteFeatures((prev) => ({
        ...prev,
        showPricingPage: false,
        showShoppingCart: false,
        enablePayments: false,
        acceptPaypal: false,
        acceptStripe: false,
        acceptCrypto: false,
        enableWishlist: false,
      }));
    }

    if (featureName === "allowUserRegistration" && !value) {
      setWebsiteFeatures((prev) => ({
        ...prev,
        enableUserProfiles: false,
        enableSocialLogin: false,
      }));
    }
  };
  return [websiteFeatures, handleFeatureToggle];
};
