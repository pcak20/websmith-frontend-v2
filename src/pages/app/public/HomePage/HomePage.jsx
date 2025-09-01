import React from "react";
import {
  ArrowRight,
  Zap,
  Layout,
  Smartphone,
  CheckCircle,
  Star,
  Users,
  Globe,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  const handleStartTrial = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  // Authenticated Navigation Component
  const AuthenticatedNav = () => (
    <div className={`${styles.navLinks} ${styles.authenticated}`}>
      <span className={styles.userGreeting}>
        Welcome back, {user?.first_name || user?.email}
      </span>
      <button
        className={styles.btnSecondary}
        onClick={() => navigate("/dashboard")}
      >
        <User size={16} />
        Dashboard
      </button>
      <button
        className={styles.btnSecondary}
        onClick={() => navigate("/settings")}
      >
        <Settings size={16} />
        Settings
      </button>
      <button className={styles.btnOutline} onClick={handleLogout}>
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );

  // Unauthenticated Navigation Component
  const UnauthenticatedNav = () => (
    <div className={styles.navLinks}>
      <a href="#features">Features</a>
      <a href="#templates">Templates</a>
      <a href="#pricing">Pricing</a>
      <button
        className={styles.btnSecondary}
        onClick={() => navigate("/login")}
      >
        Login
      </button>
      <button className={styles.btnPrimary} onClick={handleStartTrial}>
        Start Free Trial
      </button>
    </div>
  );

  return (
    <div className={styles.homepage}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.navBrand}>
            <div className={styles.logo} onClick={() => navigate("/")}>
              WebCraft
            </div>
          </div>
          {isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />}
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            {isAuthenticated ? (
              <>
                <h1>Welcome Back to WebCraft</h1>
                <p>
                  Continue building amazing websites with our professional
                  templates. Your dashboard is ready with all your projects and
                  tools.
                </p>
                <div className={styles.heroCta}>
                  <button
                    className={styles.btnPrimaryLarge}
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard <ArrowRight size={20} />
                  </button>
                  <button
                    className={styles.btnSecondaryLarge}
                    onClick={() => navigate("/templates")}
                  >
                    Browse Templates
                  </button>
                </div>
                <div className={styles.userStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>
                      {user?.businesses?.length || 0}
                    </span>
                    <span className={styles.statLabel}>Active Projects</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>
                      {user?.websites?.length || 0}
                    </span>
                    <span className={styles.statLabel}>Published Sites</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1>Build Professional Websites in Minutes, Not Hours</h1>
                <p>
                  Choose from our premium templates, customize your content, and
                  launch your website instantly. No coding required.
                </p>
                <div className={styles.heroCta}>
                  <button
                    className={styles.btnPrimaryLarge}
                    onClick={handleGetStarted}
                  >
                    Start Building Free <ArrowRight size={20} />
                  </button>
                  <button
                    className={styles.btnSecondaryLarge}
                    onClick={() => navigate("/templates")}
                  >
                    View Templates
                  </button>
                </div>
                <div className={styles.socialProof}>
                  <div className={styles.rating}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span>4.9/5 from 2,500+ users</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.mockupContainer}>
              <div className={styles.mockupBrowser}>
                <div className={styles.browserHeader}>
                  <div className={styles.browserDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className={styles.browserContent}>
                  <div className={styles.templatePreview}>
                    <div className={styles.previewSection}>
                      <div className={styles.previewNav}></div>
                      <div className={styles.previewHero}>
                        <div className={styles.previewText}></div>
                        <div
                          className={`${styles.previewText} ${styles.short}`}
                        ></div>
                        <div className={styles.previewButton}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional Sections - Hide pricing for authenticated users */}
      {!isAuthenticated && (
        <>
          {/* Features Section */}
          <section id="features" className={styles.features}>
            <div className={styles.container}>
              <h2>Why Choose WebCraft?</h2>
              <p className={styles.sectionSubtitle}>
                Everything you need to create stunning websites
              </p>
              <div className={styles.featuresGrid}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <Layout size={32} />
                  </div>
                  <h3>Premium Templates</h3>
                  <p>
                    Choose from 100+ professionally designed templates for any
                    industry or purpose.
                  </p>
                </div>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <Zap size={32} />
                  </div>
                  <h3>Lightning Fast</h3>
                  <p>
                    Build and launch your website in under 10 minutes with our
                    intuitive editor.
                  </p>
                </div>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <Smartphone size={32} />
                  </div>
                  <h3>Mobile Optimized</h3>
                  <p>
                    All templates are fully responsive and look perfect on any
                    device.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className={styles.howItWorks}>
            <div className={styles.container}>
              <h2>Get Online in 3 Simple Steps</h2>
              <div className={styles.steps}>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>1</div>
                  <h3>Choose Template</h3>
                  <p>Pick from our collection of professional templates</p>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>2</div>
                  <h3>Customize Content</h3>
                  <p>Replace images and text with your own content</p>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>3</div>
                  <h3>Launch Website</h3>
                  <p>Publish your site and share it with the world</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Templates Preview - Always show but modify CTA */}
      <section id="templates" className={styles.templates}>
        <div className={styles.container}>
          <h2>Beautiful Templates for Every Need</h2>
          <div className={styles.templateCategories}>
            <button className={`${styles.categoryBtn} ${styles.active}`}>
              All
            </button>
            <button className={styles.categoryBtn}>Business</button>
            <button className={styles.categoryBtn}>Portfolio</button>
            <button className={styles.categoryBtn}>E-commerce</button>
            <button className={styles.categoryBtn}>Blog</button>
          </div>
          <div className={styles.templatesGrid}>
            <div className={styles.templateCard}>
              <div className={styles.templatePreview}>
                <div className={styles.templateContent}>
                  <div className={styles.templateHeader}></div>
                  <div className={styles.templateBody}>
                    <div className={styles.templateText}></div>
                    <div
                      className={`${styles.templateText} ${styles.short}`}
                    ></div>
                  </div>
                </div>
              </div>
              <div className={styles.templateInfo}>
                <h4>Modern Business</h4>
                <p>Perfect for agencies and startups</p>
                {isAuthenticated && (
                  <button
                    className={styles.btnPrimarySmall}
                    onClick={() => navigate("/templates/modern-business")}
                  >
                    Use Template
                  </button>
                )}
              </div>
            </div>
            <div className={styles.templateCard}>
              <div className={styles.templatePreview}>
                <div
                  className={`${styles.templateContent} ${styles.portfolio}`}
                >
                  <div className={styles.templateGallery}>
                    <div className={styles.galleryItem}></div>
                    <div className={styles.galleryItem}></div>
                    <div className={styles.galleryItem}></div>
                  </div>
                </div>
              </div>
              <div className={styles.templateInfo}>
                <h4>Creative Portfolio</h4>
                <p>Showcase your work beautifully</p>
                {isAuthenticated && (
                  <button
                    className={styles.btnPrimarySmall}
                    onClick={() => navigate("/templates/creative-portfolio")}
                  >
                    Use Template
                  </button>
                )}
              </div>
            </div>
            <div className={styles.templateCard}>
              <div className={styles.templatePreview}>
                <div
                  className={`${styles.templateContent} ${styles.ecommerce}`}
                >
                  <div className={styles.productGrid}>
                    <div className={styles.productItem}></div>
                    <div className={styles.productItem}></div>
                  </div>
                </div>
              </div>
              <div className={styles.templateInfo}>
                <h4>Online Store</h4>
                <p>Start selling online today</p>
                {isAuthenticated && (
                  <button
                    className={styles.btnPrimarySmall}
                    onClick={() => navigate("/templates/online-store")}
                  >
                    Use Template
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.templatesCta}>
            <button
              className={styles.btnPrimary}
              onClick={() =>
                navigate(
                  isAuthenticated ? "/dashboard/templates" : "/templates"
                )
              }
            >
              {isAuthenticated ? "Browse All Templates" : "View All Templates"}
            </button>
          </div>
        </div>
      </section>

      {/* Conditional sections for non-authenticated users only */}
      {!isAuthenticated && (
        <>
          {/* Stats Section */}
          <section className={styles.stats}>
            <div className={styles.container}>
              <div className={styles.statsGrid}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>10,000+</div>
                  <div className={styles.statLabel}>Websites Created</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>100+</div>
                  <div className={styles.statLabel}>Premium Templates</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>99.9%</div>
                  <div className={styles.statLabel}>Uptime Guarantee</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>24/7</div>
                  <div className={styles.statLabel}>Customer Support</div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className={styles.testimonials}>
            <div className={styles.container}>
              <h2>What Our Customers Say</h2>
              <div className={styles.testimonialsGrid}>
                <div className={styles.testimonial}>
                  <div className={styles.testimonialContent}>
                    <p>
                      "WebCraft made it incredibly easy to launch my business
                      website. The templates are gorgeous and the customization
                      is so simple!"
                    </p>
                  </div>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.authorAvatar}></div>
                    <div className={styles.authorInfo}>
                      <div className={styles.authorName}>Sarah Johnson</div>
                      <div className={styles.authorTitle}>
                        Small Business Owner
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.testimonial}>
                  <div className={styles.testimonialContent}>
                    <p>
                      "I went from idea to live website in less than an hour.
                      The quality of templates is outstanding and everything
                      just works."
                    </p>
                  </div>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.authorAvatar}></div>
                    <div className={styles.authorInfo}>
                      <div className={styles.authorName}>Michael Chen</div>
                      <div className={styles.authorTitle}>
                        Freelance Designer
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.testimonial}>
                  <div className={styles.testimonialContent}>
                    <p>
                      "The best website builder I've used. Clean interface,
                      beautiful templates, and amazing customer support. Highly
                      recommended!"
                    </p>
                  </div>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.authorAvatar}></div>
                    <div className={styles.authorInfo}>
                      <div className={styles.authorName}>Emily Rodriguez</div>
                      <div className={styles.authorTitle}>
                        Marketing Manager
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing" className={styles.pricing}>
            <div className={styles.container}>
              <h2>Simple, Transparent Pricing</h2>
              <p className={styles.sectionSubtitle}>
                Choose the plan that's right for you
              </p>
              <div className={styles.pricingGrid}>
                <div className={styles.pricingCard}>
                  <h3>Starter</h3>
                  <div className={styles.price}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.amount}>9</span>
                    <span className={styles.period}>/month</span>
                  </div>
                  <ul className={styles.featuresList}>
                    <li>
                      <CheckCircle size={16} /> 1 Website
                    </li>
                    <li>
                      <CheckCircle size={16} /> 50+ Templates
                    </li>
                    <li>
                      <CheckCircle size={16} /> Custom Domain
                    </li>
                    <li>
                      <CheckCircle size={16} /> SSL Certificate
                    </li>
                    <li>
                      <CheckCircle size={16} /> Email Support
                    </li>
                  </ul>
                  <button
                    className={styles.btnSecondary}
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </button>
                </div>
                <div className={`${styles.pricingCard} ${styles.featured}`}>
                  <div className={styles.popularBadge}>Most Popular</div>
                  <h3>Professional</h3>
                  <div className={styles.price}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.amount}>19</span>
                    <span className={styles.period}>/month</span>
                  </div>
                  <ul className={styles.featuresList}>
                    <li>
                      <CheckCircle size={16} /> 5 Websites
                    </li>
                    <li>
                      <CheckCircle size={16} /> 100+ Templates
                    </li>
                    <li>
                      <CheckCircle size={16} /> Custom Domain
                    </li>
                    <li>
                      <CheckCircle size={16} /> SSL Certificate
                    </li>
                    <li>
                      <CheckCircle size={16} /> Priority Support
                    </li>
                    <li>
                      <CheckCircle size={16} /> Advanced Analytics
                    </li>
                  </ul>
                  <button
                    className={styles.btnPrimary}
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </button>
                </div>
                <div className={styles.pricingCard}>
                  <h3>Enterprise</h3>
                  <div className={styles.price}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.amount}>49</span>
                    <span className={styles.period}>/month</span>
                  </div>
                  <ul className={styles.featuresList}>
                    <li>
                      <CheckCircle size={16} /> Unlimited Websites
                    </li>
                    <li>
                      <CheckCircle size={16} /> All Templates
                    </li>
                    <li>
                      <CheckCircle size={16} /> Custom Domain
                    </li>
                    <li>
                      <CheckCircle size={16} /> SSL Certificate
                    </li>
                    <li>
                      <CheckCircle size={16} /> 24/7 Phone Support
                    </li>
                    <li>
                      <CheckCircle size={16} /> White Label Option
                    </li>
                  </ul>
                  <button
                    className={styles.btnSecondary}
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className={styles.cta}>
            <div className={styles.container}>
              <h2>Ready to Build Your Website?</h2>
              <p>
                Join thousands of satisfied customers and create your
                professional website today.
              </p>
              <button
                className={styles.btnPrimaryLarge}
                onClick={handleStartTrial}
              >
                Start Your Free Trial <ArrowRight size={20} />
              </button>
              <p className={styles.ctaNote}>
                No credit card required • 14-day free trial
              </p>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <div className={styles.logo}>WebCraft</div>
              <p>
                Build professional websites in minutes with our easy-to-use
                templates.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" aria-label="Twitter">
                  <Globe size={20} />
                </a>
                <a href="#" aria-label="Facebook">
                  <Users size={20} />
                </a>
              </div>
            </div>
            <div className={styles.footerSection}>
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#templates">Templates</a>
                </li>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="/examples">Examples</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="/help">Help Center</a>
                </li>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="/docs">Documentation</a>
                </li>
                <li>
                  <a href="/api">API</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/careers">Careers</a>
                </li>
                <li>
                  <a href="/press">Press</a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2025 WebCraft. All rights reserved.</p>
            <div className={styles.footerLinks}>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
