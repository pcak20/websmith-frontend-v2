import React, { useState, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  Building,
  CheckCircle,
  AlertCircle,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Star,
  Award,
  Shield,
  Car,
  Users,
  Headphones,
  Calendar,
  Navigation,
  ExternalLink,
} from "lucide-react";
import "./ContactPage.css";

// Contact information data
const contactInfo = [
  {
    icon: Phone,
    title: "Phone Support",
    primary: "+1 (555) VIP-RIDE",
    secondary: "+1 (555) 847-7433",
    description: "24/7 customer support",
    action: "Call Now",
    href: "tel:+15558477433",
  },
  {
    icon: Mail,
    title: "Email Support",
    primary: "support@viptransport.com",
    secondary: "bookings@viptransport.com",
    description: "Response within 2 hours",
    action: "Send Email",
    href: "mailto:support@viptransport.com",
  },
  {
    icon: MapPin,
    title: "Corporate Office",
    primary: "123 Luxury Avenue",
    secondary: "New York, NY 10001",
    description: "Monday - Friday, 9AM - 6PM",
    action: "Get Directions",
    href: "https://maps.google.com",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    primary: "Available 24/7",
    secondary: "Instant responses",
    description: "Chat with our support team",
    action: "Start Chat",
    href: "#chat",
  },
];

// Office locations
const officeLocations = [
  {
    city: "New York",
    address: "123 Luxury Avenue, NY 10001",
    phone: "+1 (555) 847-7433",
    email: "ny@viptransport.com",
    hours: "24/7 Operations",
  },
  {
    city: "Los Angeles",
    address: "456 Sunset Boulevard, CA 90028",
    phone: "+1 (555) 847-7434",
    email: "la@viptransport.com",
    hours: "24/7 Operations",
  },
  {
    city: "Chicago",
    address: "789 Michigan Avenue, IL 60611",
    phone: "+1 (555) 847-7435",
    email: "chicago@viptransport.com",
    hours: "24/7 Operations",
  },
  {
    city: "Miami",
    address: "321 Ocean Drive, FL 33139",
    phone: "+1 (555) 847-7436",
    email: "miami@viptransport.com",
    hours: "24/7 Operations",
  },
];

// FAQ data
const faqData = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 24 hours in advance for guaranteed availability. However, we also accept last-minute bookings based on vehicle availability.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "You can cancel your booking up to 2 hours before the scheduled pickup time for a full refund. Cancellations within 2 hours may incur a 50% cancellation fee.",
  },
  {
    question: "Do you provide car seats for children?",
    answer:
      "Yes, we provide complimentary car seats for infants and children upon request. Please specify the age and weight of the child when booking.",
  },
  {
    question: "Are your vehicles wheelchair accessible?",
    answer:
      "Yes, we have wheelchair-accessible vehicles in our fleet. Please indicate this requirement when making your reservation.",
  },
  {
    question: "Do you offer corporate accounts?",
    answer:
      "Yes, we offer corporate billing accounts with special rates and priority booking. Contact our sales team for more information.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We provide luxury transportation services in major metropolitan areas including NYC, LA, Chicago, Miami, and surrounding regions.",
  },
];

// Form subjects
const formSubjects = [
  "General Inquiry",
  "Booking Support",
  "Corporate Services",
  "Complaint or Feedback",
  "Partnership Opportunities",
  "Media Inquiries",
  "Other",
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "General Inquiry",
    priority: "medium",
    message: "",
    preferredContact: "email",
    agreeToContact: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [expandedFaq, setExpandedFaq] = useState(null);
  const formRef = useRef(null);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    if (!formData.agreeToContact) {
      newErrors.agreeToContact =
        "Please agree to be contacted regarding your inquiry";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstError}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success
      setSubmitStatus("success");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "General Inquiry",
        priority: "medium",
        message: "",
        preferredContact: "email",
        agreeToContact: false,
      });

      // Scroll to success message
      setTimeout(() => {
        const successElement = document.querySelector(".submit-success");
        if (successElement) {
          successElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle FAQ expansion
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=800&fit=crop"
            alt="Luxury office interior"
            className="hero-image"
          />
        </div>
        <div className="hero-content">
          <div className="container">
            <h1 className="hero-title">Get in Touch</h1>
            <p className="hero-subtitle">
              We're here to provide exceptional service and answer any questions
              about your luxury transportation needs.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <Award size={24} />
                <span>Premium Service</span>
              </div>
              <div className="stat-item">
                <Clock size={24} />
                <span>24/7 Support</span>
              </div>
              <div className="stat-item">
                <Star size={24} />
                <span>5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        <div className="container">
          {/* Contact Information Cards */}
          <div className="contact-info-section">
            <div className="section-header">
              <h2 className="section-title">Contact Information</h2>
              <p className="section-subtitle">
                Choose your preferred way to reach us
              </p>
            </div>

            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-card">
                  <div className="card-icon">
                    <info.icon size={24} />
                  </div>

                  <div className="card-content">
                    <h3 className="card-title">{info.title}</h3>
                    <div className="card-details">
                      <div className="primary-info">{info.primary}</div>
                      <div className="secondary-info">{info.secondary}</div>
                      <div className="info-description">{info.description}</div>
                    </div>
                  </div>

                  <a
                    href={info.href}
                    className="card-action"
                    onClick={
                      info.href === "#chat"
                        ? (e) => {
                            e.preventDefault();
                            alert("Chat feature would open here");
                          }
                        : undefined
                    }
                  >
                    {info.action}
                    <ExternalLink size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form and Office Locations */}
          <div className="main-content-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2 className="form-title">Send Us a Message</h2>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you within 2
                  hours.
                </p>
              </div>

              {submitStatus === "success" && (
                <div className="submit-success">
                  <CheckCircle size={20} />
                  <div>
                    <h4>Message Sent Successfully!</h4>
                    <p>
                      Thank you for contacting us. We'll respond to your inquiry
                      within 2 hours.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="submit-error">
                  <AlertCircle size={20} />
                  <div>
                    <h4>Message Failed to Send</h4>
                    <p>
                      Please try again or contact us directly at +1 (555)
                      VIP-RIDE.
                    </p>
                  </div>
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="contact-form"
              >
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className={`form-input ${
                        errors.firstName ? "error" : ""
                      }`}
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className={`form-input ${errors.lastName ? "error" : ""}`}
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={16} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className={`form-input ${errors.email ? "error" : ""}`}
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={16} />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className={`form-input ${errors.phone ? "error" : ""}`}
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                    {errors.phone && (
                      <span className="error-message">{errors.phone}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Building size={16} />
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      className="form-input"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MessageSquare size={16} />
                      Subject
                    </label>
                    <select
                      name="subject"
                      className="form-select"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                    >
                      {formSubjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Priority Level</label>
                  <div className="radio-group">
                    {["low", "medium", "high", "urgent"].map((priority) => (
                      <label key={priority} className="radio-option">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={formData.priority === priority}
                          onChange={(e) =>
                            handleInputChange("priority", e.target.value)
                          }
                        />
                        <span className="radio-label">
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MessageSquare size={16} />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    className={`form-textarea ${errors.message ? "error" : ""}`}
                    placeholder="Please describe your inquiry or request in detail..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                  />
                  <div className="character-count">
                    {formData.message.length}/1000 characters
                  </div>
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Contact Method</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === "email"}
                        onChange={(e) =>
                          handleInputChange("preferredContact", e.target.value)
                        }
                      />
                      <span className="radio-label">Email</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === "phone"}
                        onChange={(e) =>
                          handleInputChange("preferredContact", e.target.value)
                        }
                      />
                      <span className="radio-label">Phone</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="either"
                        checked={formData.preferredContact === "either"}
                        onChange={(e) =>
                          handleInputChange("preferredContact", e.target.value)
                        }
                      />
                      <span className="radio-label">Either</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      name="agreeToContact"
                      checked={formData.agreeToContact}
                      onChange={(e) =>
                        handleInputChange("agreeToContact", e.target.checked)
                      }
                    />
                    <div
                      className={`checkbox-custom ${
                        errors.agreeToContact ? "error" : ""
                      }`}
                    >
                      {formData.agreeToContact && <CheckCircle size={16} />}
                    </div>
                    <div className="checkbox-text">
                      I agree to be contacted regarding my inquiry and consent
                      to the collection of my information for this purpose. *
                    </div>
                  </label>
                  {errors.agreeToContact && (
                    <span className="error-message">
                      {errors.agreeToContact}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Office Locations */}
            <div className="office-locations-section">
              <div className="locations-header">
                <h2 className="locations-title">Our Locations</h2>
                <p className="locations-subtitle">
                  Visit us at any of our premium offices
                </p>
              </div>

              <div className="locations-list">
                {officeLocations.map((location, index) => (
                  <div key={index} className="location-card">
                    <div className="location-header">
                      <h3 className="location-city">{location.city}</h3>
                      <span className="location-status">Open</span>
                    </div>

                    <div className="location-details">
                      <div className="location-item">
                        <MapPin size={16} />
                        <span>{location.address}</span>
                      </div>
                      <div className="location-item">
                        <Phone size={16} />
                        <a href={`tel:${location.phone}`}>{location.phone}</a>
                      </div>
                      <div className="location-item">
                        <Mail size={16} />
                        <a href={`mailto:${location.email}`}>
                          {location.email}
                        </a>
                      </div>
                      <div className="location-item">
                        <Clock size={16} />
                        <span>{location.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="social-section">
                <h3 className="social-title">Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="social-link twitter">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="social-link instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="social-link linkedin">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="social-link youtube">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <div className="faq-header">
              <h2 className="faq-title">Frequently Asked Questions</h2>
              <p className="faq-subtitle">
                Find quick answers to common questions about our services
              </p>
            </div>

            <div className="faq-list">
              {faqData.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <div
                      className={`faq-icon ${
                        expandedFaq === index ? "expanded" : ""
                      }`}
                    >
                      +
                    </div>
                  </button>

                  <div
                    className={`faq-answer ${
                      expandedFaq === index ? "expanded" : ""
                    }`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-footer">
              <p>
                Can't find what you're looking for?
                <a
                  href="#contact-form"
                  onClick={() => {
                    formRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {" "}
                  Contact us directly
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
