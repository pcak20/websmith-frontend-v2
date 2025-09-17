import styles from "./FeaturesModal.module.css";

function FeaturesModal({
  websiteFeatures,
  getEnabledPagesCount,
  getEnabledFeaturesCount,
  onCloseModal,
  onSaveChanges,
}) {
  return (
    <div className={styles.modalOverlay} onClick={() => onCloseModal(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Website Features Configuration</h3>
          <button onClick={() => onCloseModal(false)}>×</button>
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
                onClick={() => onCloseModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.saveBtn}
                onClick={() => {
                  onCloseModal(false);
                  onSaveChanges();
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
}

export default FeaturesModal;
