import React, { useState, useEffect } from "react";
import {
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  Video,
  FileText,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Globe,
  Shield,
  CreditCard,
  Settings,
  Download,
  Play,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Send,
  X,
  ArrowRight,
  Lightbulb,
  Target,
  Headphones,
  Calendar,
  Award,
} from "lucide-react";
import styles from "./HelpAndSupport.module.css";

const HelpAndSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [supportTicket, setSupportTicket] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
  });
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [activeTab, setActiveTab] = useState("faq");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  // Mock data
  const categories = [
    { id: "all", name: "All Topics", icon: HelpCircle, count: 45 },
    { id: "getting-started", name: "Getting Started", icon: Play, count: 12 },
    { id: "templates", name: "Templates", icon: FileText, count: 8 },
    { id: "domains", name: "Domains & Hosting", icon: Globe, count: 6 },
    { id: "billing", name: "Billing", icon: CreditCard, count: 7 },
    { id: "security", name: "Security", icon: Shield, count: 5 },
    { id: "customization", name: "Customization", icon: Settings, count: 7 },
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I get started with creating my first website?",
      answer:
        "Getting started is easy! First, sign up for an account, then choose from our professionally designed templates. You can customize colors, fonts, images, and content using our drag-and-drop editor. Once you're happy with your design, publish it with one click.",
      category: "getting-started",
      helpful: 24,
      views: 1250,
      tags: ["beginner", "tutorial", "templates"],
    },
    {
      id: 2,
      question: "Can I use my own domain name?",
      answer:
        "Yes! You can either purchase a new domain through WebCraft or connect an existing domain you own. Go to the Domains section in your dashboard to manage your domains. We provide step-by-step instructions for domain connection.",
      category: "domains",
      helpful: 18,
      views: 890,
      tags: ["domain", "custom", "dns"],
    },
    {
      id: 3,
      question: "What's included in the free plan?",
      answer:
        "Our free plan includes access to basic templates, WebCraft subdomain hosting, basic customization tools, and community support. You get 1GB storage and 10GB monthly bandwidth. Upgrade to premium for custom domains, advanced features, and priority support.",
      category: "billing",
      helpful: 32,
      views: 2100,
      tags: ["pricing", "features", "limits"],
    },
    {
      id: 4,
      question: "How do I customize my template?",
      answer:
        "Our visual editor makes customization simple. Click on any element to edit text, change colors, upload images, or modify layouts. Use the design panel on the left to adjust fonts, spacing, and overall styling. All changes are saved automatically.",
      category: "customization",
      helpful: 15,
      views: 670,
      tags: ["editor", "design", "customization"],
    },
    {
      id: 5,
      question: "Is my website mobile-friendly?",
      answer:
        "Absolutely! All WebCraft templates are fully responsive and automatically adapt to different screen sizes. You can preview your site on mobile, tablet, and desktop views using the device preview buttons in the editor.",
      category: "templates",
      helpful: 28,
      views: 1450,
      tags: ["mobile", "responsive", "preview"],
    },
    {
      id: 6,
      question: "How secure is my website?",
      answer:
        "Security is our top priority. We provide SSL certificates for all websites, regular security updates, automated backups, and 24/7 monitoring. Your data is encrypted and stored securely in our cloud infrastructure.",
      category: "security",
      helpful: 21,
      views: 980,
      tags: ["ssl", "backup", "security"],
    },
  ];

  const supportOptions = [
    {
      id: "live-chat",
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      status: "online",
      responseTime: "< 2 minutes",
      availability: "24/7",
      color: "success",
    },
    {
      id: "video-call",
      title: "Video Support",
      description: "Screen share session with our experts",
      icon: Video,
      status: "available",
      responseTime: "Schedule call",
      availability: "Mon-Fri 9AM-6PM",
      color: "primary",
    },
    {
      id: "email",
      title: "Email Support",
      description: "Detailed help via email",
      icon: Mail,
      status: "available",
      responseTime: "< 4 hours",
      availability: "24/7",
      color: "info",
    },
    {
      id: "phone",
      title: "Phone Support",
      description: "Speak directly with our team",
      icon: Phone,
      status: "premium",
      responseTime: "< 1 minute",
      availability: "Premium only",
      color: "warning",
    },
  ];

  const tutorials = [
    {
      id: 1,
      title: "Building Your First Website",
      description: "Complete walkthrough from template selection to publishing",
      duration: "12 min",
      level: "Beginner",
      views: 15420,
      rating: 4.8,
      thumbnail: "tutorial-1",
    },
    {
      id: 2,
      title: "Advanced Design Customization",
      description: "Master the design tools and create unique layouts",
      duration: "18 min",
      level: "Intermediate",
      views: 8930,
      rating: 4.9,
      thumbnail: "tutorial-2",
    },
    {
      id: 3,
      title: "E-commerce Setup Guide",
      description: "Set up your online store with payments and inventory",
      duration: "25 min",
      level: "Intermediate",
      views: 12100,
      rating: 4.7,
      thumbnail: "tutorial-3",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    console.log("Support ticket submitted:", supportTicket);
    setShowTicketForm(false);
    setSupportTicket({
      subject: "",
      category: "",
      priority: "medium",
      description: "",
    });
  };

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", feedbackRating);
    setShowFeedback(false);
    setFeedbackRating(0);
  };

  return (
    <div className={styles.helpSupport}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Help & Support</h1>
            <p>
              Find answers, get help, and learn how to make the most of WebCraft
            </p>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>45+</div>
              <div className={styles.statLabel}>Help Articles</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Support</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}> 2min</div>
              <div className={styles.statLabel}>Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <Search size={20} />
            <input
              type="text"
              placeholder="Search help articles, tutorials, and guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.quickActions}>
            <button className={styles.quickAction}>
              <MessageCircle size={16} />
              Live Chat
            </button>
            <button
              className={styles.quickAction}
              onClick={() => setShowTicketForm(true)}
            >
              <Mail size={16} />
              Submit Ticket
            </button>
            <button className={styles.quickAction}>
              <Phone size={16} />
              Call Support
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.categoriesSection}>
            <h3>Categories</h3>
            <div className={styles.categories}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryItem} ${
                    activeCategory === category.id ? styles.active : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <category.icon size={18} />
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.categoryCount}>{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.supportOptionsSection}>
            <h3>Need More Help?</h3>
            <div className={styles.supportOptions}>
              {supportOptions.map((option) => (
                <div
                  key={option.id}
                  className={`${styles.supportOption} ${styles[option.color]}`}
                >
                  <div className={styles.supportIcon}>
                    <option.icon size={20} />
                  </div>
                  <div className={styles.supportContent}>
                    <h4>{option.title}</h4>
                    <p>{option.description}</p>
                    <div className={styles.supportMeta}>
                      <span className={styles.responseTime}>
                        {option.responseTime}
                      </span>
                      <span className={styles.availability}>
                        {option.availability}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${styles.statusIndicator} ${
                      styles[option.status]
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "faq" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("faq")}
            >
              <HelpCircle size={16} />
              FAQ
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "tutorials" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("tutorials")}
            >
              <Play size={16} />
              Tutorials
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "guides" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("guides")}
            >
              <Book size={16} />
              Guides
            </button>
          </div>

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className={styles.faqSection}>
              <div className={styles.faqHeader}>
                <h2>Frequently Asked Questions</h2>
                <p>Find quick answers to common questions</p>
              </div>

              {searchQuery && (
                <div className={styles.searchResults}>
                  <p>
                    Showing {filteredFaqs.length} results for "{searchQuery}"
                  </p>
                </div>
              )}

              <div className={styles.faqList}>
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className={styles.faqItem}>
                    <button
                      className={styles.faqQuestion}
                      onClick={() =>
                        setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                      }
                    >
                      <span>{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronDown size={20} />
                      ) : (
                        <ChevronRight size={20} />
                      )}
                    </button>

                    {expandedFaq === faq.id && (
                      <div className={styles.faqAnswer}>
                        <p>{faq.answer}</p>

                        <div className={styles.faqMeta}>
                          <div className={styles.faqTags}>
                            {faq.tags.map((tag) => (
                              <span key={tag} className={styles.faqTag}>
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className={styles.faqActions}>
                            <div className={styles.faqStats}>
                              <span className={styles.faqStat}>
                                <Users size={14} />
                                {faq.views} views
                              </span>
                              <span className={styles.faqStat}>
                                <ThumbsUp size={14} />
                                {faq.helpful} helpful
                              </span>
                            </div>

                            <div className={styles.faqFeedback}>
                              <span>Was this helpful?</span>
                              <button className={styles.feedbackBtn}>
                                <ThumbsUp size={16} />
                              </button>
                              <button className={styles.feedbackBtn}>
                                <ThumbsDown size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tutorials Tab */}
          {activeTab === "tutorials" && (
            <div className={styles.tutorialsSection}>
              <div className={styles.tutorialsHeader}>
                <h2>Video Tutorials</h2>
                <p>Step-by-step video guides to help you succeed</p>
              </div>

              <div className={styles.tutorialsList}>
                {tutorials.map((tutorial) => (
                  <div key={tutorial.id} className={styles.tutorialCard}>
                    <div className={styles.tutorialThumbnail}>
                      <div
                        className={`${styles.thumbnailPlaceholder} ${
                          styles[tutorial.thumbnail]
                        }`}
                      >
                        <Play size={32} />
                      </div>
                      <span className={styles.duration}>
                        {tutorial.duration}
                      </span>
                    </div>

                    <div className={styles.tutorialContent}>
                      <h3>{tutorial.title}</h3>
                      <p>{tutorial.description}</p>

                      <div className={styles.tutorialMeta}>
                        <div className={styles.tutorialStats}>
                          <span className={styles.level}>{tutorial.level}</span>
                          <span className={styles.views}>
                            {tutorial.views.toLocaleString()} views
                          </span>
                          <div className={styles.rating}>
                            <Star size={14} fill="currentColor" />
                            {tutorial.rating}
                          </div>
                        </div>

                        <button className={styles.watchBtn}>
                          <Play size={16} />
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guides Tab */}
          {activeTab === "guides" && (
            <div className={styles.guidesSection}>
              <div className={styles.guidesHeader}>
                <h2>Detailed Guides</h2>
                <p>In-depth documentation and best practices</p>
              </div>

              <div className={styles.guidesList}>
                <div className={styles.guideCard}>
                  <div className={styles.guideIcon}>
                    <Target size={24} />
                  </div>
                  <div className={styles.guideContent}>
                    <h3>Website Planning Guide</h3>
                    <p>
                      Learn how to plan and structure your website for maximum
                      impact
                    </p>
                    <div className={styles.guideMeta}>
                      <span>15 min read</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                <div className={styles.guideCard}>
                  <div className={styles.guideIcon}>
                    <Lightbulb size={24} />
                  </div>
                  <div className={styles.guideContent}>
                    <h3>Design Best Practices</h3>
                    <p>
                      Tips and tricks for creating beautiful, professional
                      websites
                    </p>
                    <div className={styles.guideMeta}>
                      <span>20 min read</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                <div className={styles.guideCard}>
                  <div className={styles.guideIcon}>
                    <Award size={24} />
                  </div>
                  <div className={styles.guideContent}>
                    <h3>SEO Optimization</h3>
                    <p>
                      Optimize your website for search engines and increase
                      visibility
                    </p>
                    <div className={styles.guideMeta}>
                      <span>25 min read</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Support Ticket Modal */}
      {showTicketForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Submit Support Ticket</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setShowTicketForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleTicketSubmit} className={styles.ticketForm}>
              <div className={styles.formGroup}>
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="Brief description of your issue"
                  value={supportTicket.subject}
                  onChange={(e) =>
                    setSupportTicket({
                      ...supportTicket,
                      subject: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select
                    value={supportTicket.category}
                    onChange={(e) =>
                      setSupportTicket({
                        ...supportTicket,
                        category: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="account">Account Help</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Priority</label>
                  <select
                    value={supportTicket.priority}
                    onChange={(e) =>
                      setSupportTicket({
                        ...supportTicket,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  placeholder="Please describe your issue in detail..."
                  rows={6}
                  value={supportTicket.description}
                  onChange={(e) =>
                    setSupportTicket({
                      ...supportTicket,
                      description: e.target.value,
                    })
                  }
                  required
                ></textarea>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowTicketForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  <Send size={16} />
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className={styles.contactSection}>
        <div className={styles.contactContent}>
          <h2>Still Need Help?</h2>
          <p>Our support team is here to help you succeed</p>

          <div className={styles.contactOptions}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <Headphones size={24} />
              </div>
              <h3>Premium Support</h3>
              <p>
                Get priority access to our expert support team with faster
                response times
              </p>
              <button className={styles.contactBtn}>Upgrade to Premium</button>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <Calendar size={24} />
              </div>
              <h3>Schedule a Call</h3>
              <p>
                Book a one-on-one session with our specialists for personalized
                help
              </p>
              <button className={styles.contactBtn}>Book Now</button>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <Users size={24} />
              </div>
              <h3>Community Forum</h3>
              <p>Connect with other WebCraft users and share knowledge</p>
              <button className={styles.contactBtn}>Join Community</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
