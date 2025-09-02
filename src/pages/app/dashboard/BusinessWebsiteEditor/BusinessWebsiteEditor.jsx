import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Eye,
  Globe,
  Settings,
  Layers,
  Type,
  Palette,
  Image,
  Layout,
  Smartphone,
  Monitor,
  Tablet,
  Plus,
  Trash2,
  Copy,
  Move,
  Undo,
  Redo,
  MousePointer,
  Square,
  Circle,
  FileText,
  Link,
  Grid,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  List,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Edit3,
  Zap,
} from "lucide-react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout/DashboardLayout";
import { useWebsite } from "../../../../hooks/useWebsite";
import styles from "./BusinessWebsiteEditor.module.css";

const BusinessWebsiteEditor = () => {
  const { websiteId } = useParams();
  const navigate = useNavigate();
  const {
    currentWebsite,
    currentPage,
    fetchWebsiteDetails,
    fetchPages,
    updatePageContent,
    setCurrentPage,
    loading,
  } = useWebsite();

  // Editor state
  const [activeTab, setActiveTab] = useState("elements");
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPageSettings, setShowPageSettings] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);

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

  // Page data state
  const [pages, setPages] = useState([]);
  const [currentPageContent, setCurrentPageContent] = useState({});

  // Mock template data - in real app this would come from the website's template
  const mockTemplatePages = [
    {
      id: "home",
      name: "Home",
      path: "/",
      template: "home-template",
      sections: [
        { id: "hero", type: "hero", title: "Hero Section", content: {} },
        { id: "about", type: "content", title: "About Section", content: {} },
        { id: "services", type: "grid", title: "Services", content: {} },
        { id: "contact", type: "contact", title: "Contact", content: {} },
      ],
    },
    {
      id: "about",
      name: "About Us",
      path: "/about",
      template: "content-template",
      sections: [
        { id: "header", type: "header", title: "Page Header", content: {} },
        { id: "story", type: "content", title: "Our Story", content: {} },
        { id: "team", type: "team", title: "Team Members", content: {} },
      ],
    },
    {
      id: "services",
      name: "Services",
      path: "/services",
      template: "services-template",
      sections: [
        { id: "header", type: "header", title: "Page Header", content: {} },
        {
          id: "services-grid",
          type: "grid",
          title: "Services Grid",
          content: {},
        },
        { id: "pricing", type: "pricing", title: "Pricing", content: {} },
      ],
    },
    {
      id: "contact",
      name: "Contact",
      path: "/contact",
      template: "contact-template",
      sections: [
        { id: "header", type: "header", title: "Page Header", content: {} },
        {
          id: "contact-form",
          type: "form",
          title: "Contact Form",
          content: {},
        },
        { id: "map", type: "map", title: "Location Map", content: {} },
      ],
    },
  ];

  const [currentTemplatePage, setCurrentTemplatePage] = useState(
    mockTemplatePages[0]
  );

  // Element library
  const elementLibrary = {
    basic: [
      {
        id: "text",
        name: "Text",
        icon: Type,
        description: "Simple text block",
      },
      {
        id: "heading",
        name: "Heading",
        icon: Type,
        description: "Page heading",
      },
      {
        id: "paragraph",
        name: "Paragraph",
        icon: FileText,
        description: "Text paragraph",
      },
      {
        id: "button",
        name: "Button",
        icon: Square,
        description: "Call-to-action button",
      },
      { id: "image", name: "Image", icon: Image, description: "Single image" },
      { id: "link", name: "Link", icon: Link, description: "Hyperlink" },
    ],
    layout: [
      {
        id: "container",
        name: "Container",
        icon: Square,
        description: "Content container",
      },
      { id: "grid", name: "Grid", icon: Grid, description: "Grid layout" },
      {
        id: "columns",
        name: "Columns",
        icon: Layout,
        description: "Column layout",
      },
      {
        id: "spacer",
        name: "Spacer",
        icon: Square,
        description: "Empty space",
      },
    ],
    components: [
      {
        id: "hero",
        name: "Hero Section",
        icon: Layout,
        description: "Hero banner",
      },
      { id: "card", name: "Card", icon: Square, description: "Content card" },
      {
        id: "gallery",
        name: "Gallery",
        icon: Image,
        description: "Image gallery",
      },
      {
        id: "form",
        name: "Contact Form",
        icon: FileText,
        description: "Contact form",
      },
      {
        id: "testimonial",
        name: "Testimonial",
        icon: FileText,
        description: "Customer testimonial",
      },
      {
        id: "pricing",
        name: "Pricing Table",
        icon: Grid,
        description: "Pricing plans",
      },
    ],
  };

  useEffect(() => {
    if (websiteId) {
      fetchWebsiteDetails(websiteId);
      fetchPages(websiteId);
    }
  }, [websiteId]);

  const getEnabledPagesCount = () => {
    const pageFeatures = [
      "showAboutPage",
      "showServicesPage",
      "showGalleryPage",
      "showBlogPage",
      "showTestimonialsPage",
      "showFaqPage",
      "showPricingPage",
    ];
    return (
      pageFeatures.filter((feature) => websiteFeatures[feature]).length + 1
    ); // +1 for home page
  };

  const getEnabledFeaturesCount = () => {
    return Object.values(websiteFeatures).filter(Boolean).length;
  };

  const handleSaveChanges = async () => {
    if (currentPage && currentPageContent) {
      try {
        await updatePageContent(currentPage.id, currentPageContent);
        setUnsavedChanges(false);
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  const handlePreview = () => {
    if (currentWebsite) {
      window.open(currentWebsite.preview_url, "_blank");
    }
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
  };

  const handleElementAdd = (elementType) => {
    // Add element to current page
    const newElement = {
      id: `${elementType}_${Date.now()}`,
      type: elementType,
      content: getDefaultContent(elementType),
      styles: {},
    };

    setCurrentPageContent((prev) => ({
      ...prev,
      elements: [...(prev.elements || []), newElement],
    }));
    setUnsavedChanges(true);
  };

  const getDefaultContent = (elementType) => {
    const defaults = {
      text: { text: "Edit this text" },
      heading: { text: "Your Heading Here", level: "h2" },
      paragraph: { text: "Add your paragraph content here..." },
      button: { text: "Click Me", url: "#" },
      image: { src: "", alt: "Image description" },
      link: { text: "Link text", url: "#" },
    };
    return defaults[elementType] || {};
  };

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

  // Features Modal Component
  const FeaturesModal = () => (
    <div
      className={styles.modalOverlay}
      onClick={() => setShowFeaturesModal(false)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Website Features Configuration</h3>
          <button onClick={() => setShowFeaturesModal(false)}>×</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.featuresGrid}>
            {/* Pages & Navigation */}
            <div className={styles.featureCategory}>
              <h4>Pages & Navigation</h4>
              <div className={styles.featuresList}>
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.showAboutPage}
                    onChange={(e) =>
                      handleFeatureToggle("showAboutPage", e.target.checked)
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>About Us Page</span>
                    <span className={styles.featureDesc}>
                      Show company information and story
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.showServicesPage}
                    onChange={(e) =>
                      handleFeatureToggle("showServicesPage", e.target.checked)
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>Services Page</span>
                    <span className={styles.featureDesc}>
                      Display your services and offerings
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.showGalleryPage}
                    onChange={(e) =>
                      handleFeatureToggle("showGalleryPage", e.target.checked)
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>Gallery Page</span>
                    <span className={styles.featureDesc}>
                      Showcase your work and portfolio
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.showBlogPage}
                    onChange={(e) =>
                      handleFeatureToggle("showBlogPage", e.target.checked)
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>Blog Page</span>
                    <span className={styles.featureDesc}>
                      Share news, articles, and updates
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.showTestimonialsPage}
                    onChange={(e) =>
                      handleFeatureToggle(
                        "showTestimonialsPage",
                        e.target.checked
                      )
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>
                      Testimonials Page
                    </span>
                    <span className={styles.featureDesc}>
                      Display customer reviews and feedback
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.showFaqPage}
                    onChange={(e) =>
                      handleFeatureToggle("showFaqPage", e.target.checked)
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>FAQ Page</span>
                    <span className={styles.featureDesc}>
                      Answer frequently asked questions
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* E-commerce */}
            <div className={styles.featureCategory}>
              <h4>E-commerce & Payments</h4>
              <div className={styles.featuresList}>
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableEcommerce}
                    onChange={(e) =>
                      handleFeatureToggle("enableEcommerce", e.target.checked)
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>
                      Enable E-commerce
                    </span>
                    <span className={styles.featureDesc}>
                      Sell products or services online
                    </span>
                  </div>
                </label>

                {websiteFeatures.enableEcommerce && (
                  <>
                    <label className={styles.featureItem}>
                      <input
                        type="checkbox"
                        checked={websiteFeatures.showPricingPage}
                        onChange={(e) =>
                          handleFeatureToggle(
                            "showPricingPage",
                            e.target.checked
                          )
                        }
                      />
                      <div className={styles.featureInfo}>
                        <span className={styles.featureName}>Pricing Page</span>
                        <span className={styles.featureDesc}>
                          Display pricing plans and packages
                        </span>
                      </div>
                    </label>

                    <label className={styles.featureItem}>
                      <input
                        type="checkbox"
                        checked={websiteFeatures.acceptPaypal}
                        onChange={(e) =>
                          handleFeatureToggle("acceptPaypal", e.target.checked)
                        }
                      />
                      <div className={styles.featureInfo}>
                        <span className={styles.featureName}>
                          PayPal Payments
                        </span>
                        <span className={styles.featureDesc}>
                          Accept payments via PayPal
                        </span>
                      </div>
                    </label>

                    <label className={styles.featureItem}>
                      <input
                        type="checkbox"
                        checked={websiteFeatures.acceptStripe}
                        onChange={(e) =>
                          handleFeatureToggle("acceptStripe", e.target.checked)
                        }
                      />
                      <div className={styles.featureInfo}>
                        <span className={styles.featureName}>
                          Stripe Payments
                        </span>
                        <span className={styles.featureDesc}>
                          Accept credit card payments
                        </span>
                      </div>
                    </label>

                    <label className={styles.featureItem}>
                      <input
                        type="checkbox"
                        checked={websiteFeatures.showShoppingCart}
                        onChange={(e) =>
                          handleFeatureToggle(
                            "showShoppingCart",
                            e.target.checked
                          )
                        }
                      />
                      <div className={styles.featureInfo}>
                        <span className={styles.featureName}>
                          Shopping Cart
                        </span>
                        <span className={styles.featureDesc}>
                          Allow customers to add multiple items
                        </span>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* User Management */}
            <div className={styles.featureCategory}>
              <h4>User Management</h4>
              <div className={styles.featuresList}>
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.allowUserRegistration}
                    onChange={(e) =>
                      handleFeatureToggle(
                        "allowUserRegistration",
                        e.target.checked
                      )
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>
                      User Registration
                    </span>
                    <span className={styles.featureDesc}>
                      Allow visitors to create accounts
                    </span>
                  </div>
                </label>

                {websiteFeatures.allowUserRegistration && (
                  <>
                    <label className={styles.featureItem}>
                      <input
                        type="checkbox"
                        checked={websiteFeatures.requireEmailVerification}
                        onChange={(e) =>
                          handleFeatureToggle(
                            "requireEmailVerification",
                            e.target.checked
                          )
                        }
                      />
                      <div className={styles.featureInfo}>
                        <span className={styles.featureName}>
                          Email Verification
                        </span>
                        <span className={styles.featureDesc}>
                          Require email verification for new accounts
                        </span>
                      </div>
                    </label>

                    <label className={styles.featureItem}>
                      <input
                        type="checkbox"
                        checked={websiteFeatures.enableUserProfiles}
                        onChange={(e) =>
                          handleFeatureToggle(
                            "enableUserProfiles",
                            e.target.checked
                          )
                        }
                      />
                      <div className={styles.featureInfo}>
                        <span className={styles.featureName}>
                          User Profiles
                        </span>
                        <span className={styles.featureDesc}>
                          Allow users to create and edit profiles
                        </span>
                      </div>
                    </label>

                    <label className={styles.featureItem}>
                      <input
                        type="checkbox"
                        checked={websiteFeatures.enableSocialLogin}
                        onChange={(e) =>
                          handleFeatureToggle(
                            "enableSocialLogin",
                            e.target.checked
                          )
                        }
                      />
                      <div className={styles.featureInfo}>
                        <span className={styles.featureName}>
                          Social Media Login
                        </span>
                        <span className={styles.featureDesc}>
                          Login with Google, Facebook, etc.
                        </span>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Communication */}
            <div className={styles.featureCategory}>
              <h4>Communication & Contact</h4>
              <div className={styles.featuresList}>
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableContactForm}
                    onChange={(e) =>
                      handleFeatureToggle("enableContactForm", e.target.checked)
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>Contact Form</span>
                    <span className={styles.featureDesc}>
                      Allow visitors to send messages
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.showPhoneNumber}
                    onChange={(e) =>
                      handleFeatureToggle("showPhoneNumber", e.target.checked)
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>
                      Display Phone Number
                    </span>
                    <span className={styles.featureDesc}>
                      Show your business phone number
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableLiveChat}
                    onChange={(e) =>
                      handleFeatureToggle("enableLiveChat", e.target.checked)
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>Live Chat</span>
                    <span className={styles.featureDesc}>
                      Real-time chat with visitors
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableAppointmentBooking}
                    onChange={(e) =>
                      handleFeatureToggle(
                        "enableAppointmentBooking",
                        e.target.checked
                      )
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>
                      Appointment Booking
                    </span>
                    <span className={styles.featureDesc}>
                      Allow customers to book appointments
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableNewsletterSignup}
                    onChange={(e) =>
                      handleFeatureToggle(
                        "enableNewsletterSignup",
                        e.target.checked
                      )
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>
                      Newsletter Signup
                    </span>
                    <span className={styles.featureDesc}>
                      Collect email subscribers
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Security & Compliance */}
            <div className={styles.featureCategory}>
              <h4>Security & Compliance</h4>
              <div className={styles.featuresList}>
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableSSL}
                    onChange={(e) =>
                      handleFeatureToggle("enableSSL", e.target.checked)
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>SSL Certificate</span>
                    <span className={styles.featureDesc}>
                      Secure your website with HTTPS
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableCookieConsent}
                    onChange={(e) =>
                      handleFeatureToggle(
                        "enableCookieConsent",
                        e.target.checked
                      )
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>Cookie Consent</span>
                    <span className={styles.featureDesc}>
                      GDPR compliant cookie notice
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableGDPRCompliance}
                    onChange={(e) =>
                      handleFeatureToggle(
                        "enableGDPRCompliance",
                        e.target.checked
                      )
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>GDPR Compliance</span>
                    <span className={styles.featureDesc}>
                      European data protection compliance
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableCaptcha}
                    onChange={(e) =>
                      handleFeatureToggle("enableCaptcha", e.target.checked)
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>
                      CAPTCHA Protection
                    </span>
                    <span className={styles.featureDesc}>
                      Prevent spam and bot submissions
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Analytics & Marketing */}
            <div className={styles.featureCategory}>
              <h4>Analytics & Marketing</h4>
              <div className={styles.featuresList}>
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableGoogleAnalytics}
                    onChange={(e) =>
                      handleFeatureToggle(
                        "enableGoogleAnalytics",
                        e.target.checked
                      )
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>Google Analytics</span>
                    <span className={styles.featureDesc}>
                      Track website traffic and user behavior
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableSEOOptimization}
                    onChange={(e) =>
                      handleFeatureToggle(
                        "enableSEOOptimization",
                        e.target.checked
                      )
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>SEO Optimization</span>
                    <span className={styles.featureDesc}>
                      Search engine optimization features
                    </span>
                  </div>
                </label>

                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableSocialSharing}
                    onChange={(e) =>
                      handleFeatureToggle(
                        "enableSocialSharing",
                        e.target.checked
                      )
                    }
                  />
                  <div className={styles.featureInfo}>
                    <span className={styles.featureName}>
                      Social Media Sharing
                    </span>
                    <span className={styles.featureDesc}>
                      Share buttons for social platforms
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <div className={styles.featuresSummary}>
              <span>{getEnabledPagesCount()} pages enabled</span>
              <span>{getEnabledFeaturesCount()} features active</span>
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowFeaturesModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.saveBtn}
                onClick={() => {
                  setShowFeaturesModal(false);
                  handleSaveChanges();
                }}
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div className={styles.sidebar}>
      {/* Sidebar Header */}
      <div className={styles.sidebarHeader}>
        <h3>Editor</h3>
        <div className={styles.editorTabs}>
          <button
            className={`${styles.editorTab} ${
              activeTab === "elements" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("elements")}
          >
            <Layers size={16} />
            Elements
          </button>
          <button
            className={`${styles.editorTab} ${
              activeTab === "design" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("design")}
          >
            <Palette size={16} />
            Design
          </button>
          <button
            className={`${styles.editorTab} ${
              activeTab === "settings" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className={styles.sidebarContent}>
        {activeTab === "elements" && (
          <div className={styles.elementsPanel}>
            {/* Page Sections */}
            <div className={styles.panelSection}>
              <h4>Page Sections</h4>
              <div className={styles.sectionsGrid}>
                {currentTemplatePage.sections.map((section) => (
                  <div key={section.id} className={styles.sectionItem}>
                    <div className={styles.sectionInfo}>
                      <span>{section.title}</span>
                      <span className={styles.sectionType}>{section.type}</span>
                    </div>
                    <button className={styles.sectionAction}>
                      <Edit3 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Element Library */}
            {Object.entries(elementLibrary).map(([category, elements]) => (
              <div key={category} className={styles.panelSection}>
                <h4>
                  {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                  Elements
                </h4>
                <div className={styles.elementsGrid}>
                  {elements.map((element) => (
                    <div
                      key={element.id}
                      className={styles.elementItem}
                      onClick={() => handleElementAdd(element.id)}
                      title={element.description}
                    >
                      <element.icon size={20} />
                      <span>{element.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "design" && (
          <div className={styles.designPanel}>
            <div className={styles.panelSection}>
              <h4>Colors</h4>
              <div className={styles.colorGrid}>
                <div className={styles.colorItem}>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: "#667eea" }}
                  ></div>
                  <span>Primary</span>
                </div>
                <div className={styles.colorItem}>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: "#764ba2" }}
                  ></div>
                  <span>Secondary</span>
                </div>
                <div className={styles.colorItem}>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: "#f8fafc" }}
                  ></div>
                  <span>Background</span>
                </div>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h4>Typography</h4>
              <div className={styles.typographyOptions}>
                <div className={styles.fontOption}>
                  <span>Heading Font</span>
                  <select className={styles.fontSelect}>
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
                <div className={styles.fontOption}>
                  <span>Body Font</span>
                  <select className={styles.fontSelect}>
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h4>Spacing</h4>
              <div className={styles.spacingControls}>
                <label>
                  Section Spacing
                  <input type="range" min="0" max="100" defaultValue="40" />
                </label>
                <label>
                  Element Spacing
                  <input type="range" min="0" max="50" defaultValue="20" />
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className={styles.settingsPanel}>
            <div className={styles.panelSection}>
              <h4>Website Features</h4>
              <div className={styles.featuresOverview}>
                <div className={styles.featuresStats}>
                  <div className={styles.featureStat}>
                    <span className={styles.statNumber}>
                      {getEnabledPagesCount()}
                    </span>
                    <span className={styles.statLabel}>Pages</span>
                  </div>
                  <div className={styles.featureStat}>
                    <span className={styles.statNumber}>
                      {getEnabledFeaturesCount()}
                    </span>
                    <span className={styles.statLabel}>Features</span>
                  </div>
                </div>
                <button
                  className={styles.configureBtn}
                  onClick={() => setShowFeaturesModal(true)}
                >
                  <Settings size={16} />
                  Configure Features
                </button>
              </div>

              {/* Quick Feature Toggles */}
              <div className={styles.quickToggles}>
                <label className={styles.quickToggle}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableEcommerce}
                    onChange={(e) =>
                      handleFeatureToggle("enableEcommerce", e.target.checked)
                    }
                  />
                  <span>E-commerce</span>
                </label>
                <label className={styles.quickToggle}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.allowUserRegistration}
                    onChange={(e) =>
                      handleFeatureToggle(
                        "allowUserRegistration",
                        e.target.checked
                      )
                    }
                  />
                  <span>User Registration</span>
                </label>
                <label className={styles.quickToggle}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableContactForm}
                    onChange={(e) =>
                      handleFeatureToggle("enableContactForm", e.target.checked)
                    }
                  />
                  <span>Contact Form</span>
                </label>
                <label className={styles.quickToggle}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableAppointmentBooking}
                    onChange={(e) =>
                      handleFeatureToggle(
                        "enableAppointmentBooking",
                        e.target.checked
                      )
                    }
                  />
                  <span>Appointment Booking</span>
                </label>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h4>Page Settings</h4>
              <div className={styles.settingsForm}>
                <div className={styles.formGroup}>
                  <label>Page Title</label>
                  <input type="text" defaultValue={currentTemplatePage.name} />
                </div>
                <div className={styles.formGroup}>
                  <label>URL Path</label>
                  <input type="text" defaultValue={currentTemplatePage.path} />
                </div>
                <div className={styles.formGroup}>
                  <label>Meta Description</label>
                  <textarea
                    rows="3"
                    placeholder="Page description for SEO..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h4>Page Visibility</h4>
              <div className={styles.visibilityControls}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked />
                  Show in navigation
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked />
                  Include in sitemap
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  Password protected
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={websiteFeatures.enableSSL}
                    onChange={(e) =>
                      handleFeatureToggle("enableSSL", e.target.checked)
                    }
                  />
                  SSL Security (HTTPS)
                </label>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h4>Active Features Summary</h4>
              <div className={styles.activeFeaturesList}>
                {websiteFeatures.enableEcommerce && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>E-commerce Store</span>
                  </div>
                )}
                {websiteFeatures.allowUserRegistration && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>User Registration</span>
                  </div>
                )}
                {websiteFeatures.enableContactForm && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>Contact Form</span>
                  </div>
                )}
                {websiteFeatures.enableAppointmentBooking && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>Appointment Booking</span>
                  </div>
                )}
                {websiteFeatures.enableLiveChat && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>Live Chat</span>
                  </div>
                )}
                {websiteFeatures.enableNewsletterSignup && (
                  <div className={styles.activeFeature}>
                    <div className={styles.featureIndicator}></div>
                    <span>Newsletter Signup</span>
                  </div>
                )}
                {getEnabledFeaturesCount() === 0 && (
                  <p className={styles.noFeatures}>
                    No additional features enabled
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderPageEditor = () => (
    <div className={styles.editorMain}>
      {/* Editor Toolbar */}
      <div className={styles.editorToolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.pageSelector}>
            <select
              value={currentTemplatePage.id}
              onChange={(e) => {
                const page = mockTemplatePages.find(
                  (p) => p.id === e.target.value
                );
                if (page) setCurrentTemplatePage(page);
              }}
              className={styles.pageSelect}
            >
              {mockTemplatePages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.toolbarDivider}></div>
          <button className={styles.toolbarBtn} title="Undo">
            <Undo size={16} />
          </button>
          <button className={styles.toolbarBtn} title="Redo">
            <Redo size={16} />
          </button>
        </div>

        <div className={styles.toolbarCenter}>
          <div className={styles.deviceSelector}>
            <button
              className={`${styles.deviceBtn} ${
                previewDevice === "desktop" ? styles.active : ""
              }`}
              onClick={() => setPreviewDevice("desktop")}
              title="Desktop View"
            >
              <Monitor size={16} />
            </button>
            <button
              className={`${styles.deviceBtn} ${
                previewDevice === "tablet" ? styles.active : ""
              }`}
              onClick={() => setPreviewDevice("tablet")}
              title="Tablet View"
            >
              <Tablet size={16} />
            </button>
            <button
              className={`${styles.deviceBtn} ${
                previewDevice === "mobile" ? styles.active : ""
              }`}
              onClick={() => setPreviewDevice("mobile")}
              title="Mobile View"
            >
              <Smartphone size={16} />
            </button>
          </div>
        </div>

        <div className={styles.toolbarRight}>
          <button
            className={styles.toolbarBtn}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            title="Toggle Preview Mode"
          >
            <Eye size={16} />
            {isPreviewMode ? "Edit" : "Preview"}
          </button>
          <button className={styles.publishBtn} onClick={handlePreview}>
            <Globe size={16} />
            Preview Live
          </button>
          <button
            className={styles.saveBtn}
            onClick={handleSaveChanges}
            disabled={!unsavedChanges}
          >
            <Save size={16} />
            {unsavedChanges ? "Save Changes" : "Saved"}
          </button>
        </div>
      </div>

      {/* Editor Canvas */}
      <div className={styles.editorCanvas}>
        <div className={`${styles.canvasContainer} ${styles[previewDevice]}`}>
          <div className={styles.canvasContent}>
            {/* Mock page content */}
            <div className={styles.pagePreview}>
              <div className={styles.mockSection}>
                <div className={styles.mockHero}>
                  <div className={styles.mockHeroContent}>
                    <h1 className={styles.mockTitle}>
                      Welcome to{" "}
                      {currentWebsite?.business?.name || "Your Business"}
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
                    <button className={styles.mockFormButton}>
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.websiteEditor}>
      {/* Header */}
      <div className={styles.editorHeader}>
        <div className={styles.headerLeft}>
          <button
            className={styles.backBtn}
            onClick={() => navigate(`/dashboard/website/detail/${websiteId}`)}
          >
            <ArrowLeft size={20} />
            Back to Website
          </button>
          <div className={styles.headerInfo}>
            <h1>{currentWebsite?.name || "Website Editor"}</h1>
            <span className={styles.headerSubtitle}>
              Editing: {currentTemplatePage.name} •{" "}
              {currentWebsite?.template || "Custom Template"}
            </span>
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.headerActions}>
            {unsavedChanges && (
              <span className={styles.unsavedIndicator}>
                <div className={styles.unsavedDot}></div>
                Unsaved changes
              </span>
            )}
            <button className={styles.headerBtn} onClick={handlePreview}>
              <Eye size={18} />
              Preview
            </button>
            <button className={styles.headerBtn}>
              <Settings size={18} />
              Settings
            </button>
            <button className={styles.primaryBtn} onClick={handleSaveChanges}>
              <Save size={18} />
              Save & Publish
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className={styles.editorContent}>
        {renderSidebar()}
        {renderPageEditor()}
      </div>

      {/* Features Configuration Modal */}
      {showFeaturesModal && <FeaturesModal />}

      {/* Loading Overlay */}
      {loading.websiteDetails && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}>
            <Zap size={24} />
            <span>Loading editor...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessWebsiteEditor;
