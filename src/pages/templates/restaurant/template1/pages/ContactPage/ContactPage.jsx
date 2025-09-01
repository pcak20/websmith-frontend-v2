import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  MessageCircle,
  Star,
  ChefHat,
  ArrowLeft,
  Instagram,
  Facebook,
  Twitter,
  Calendar,
  Utensils,
  Car,
  Navigation,
  CheckCircle,
  AlertCircle,
  Globe,
  Headphones,
  Users,
  Award,
} from "lucide-react";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const [formStatus, setFormStatus] = useState(null); // 'sending', 'success', 'error'

  const restaurantInfo = {
    name: "Bella Vista",
    address: {
      street: "123 Main Street",
      city: "Downtown",
      state: "NY",
      zip: "10001",
      full: "123 Main Street, Downtown, NY 10001",
    },
    phone: "(555) 123-4567",
    email: "info@bellavista.com",
    website: "www.bellavista.com",
    coordinates: {
      lat: 40.7589,
      lng: -73.9851,
    },
  };

  const hours = [
    { day: "Monday", hours: "11:00 AM - 10:00 PM", isToday: false },
    { day: "Tuesday", hours: "11:00 AM - 10:00 PM", isToday: false },
    { day: "Wednesday", hours: "11:00 AM - 10:00 PM", isToday: true },
    { day: "Thursday", hours: "11:00 AM - 10:00 PM", isToday: false },
    { day: "Friday", hours: "11:00 AM - 11:00 PM", isToday: false },
    { day: "Saturday", hours: "10:00 AM - 11:00 PM", isToday: false },
    { day: "Sunday", hours: "10:00 AM - 10:00 PM", isToday: false },
  ];

  const contactReasons = [
    {
      value: "general",
      label: "General Inquiry",
      icon: <MessageCircle size={16} />,
    },
    {
      value: "reservation",
      label: "Reservations",
      icon: <Calendar size={16} />,
    },
    {
      value: "catering",
      label: "Catering Services",
      icon: <Utensils size={16} />,
    },
    {
      value: "feedback",
      label: "Feedback & Reviews",
      icon: <Star size={16} />,
    },
    {
      value: "complaint",
      label: "Issue or Complaint",
      icon: <AlertCircle size={16} />,
    },
    { value: "careers", label: "Careers", icon: <Users size={16} /> },
    { value: "media", label: "Media & Press", icon: <Globe size={16} /> },
  ];

  const contactMethods = [
    {
      title: "Phone",
      icon: <Phone size={24} />,
      primary: restaurantInfo.phone,
      secondary: "Call us directly",
      action: "Call Now",
      available: "Daily 11:00 AM - 10:00 PM",
      color: "#10b981",
    },
    {
      title: "Email",
      icon: <Mail size={24} />,
      primary: restaurantInfo.email,
      secondary: "Send us a message",
      action: "Send Email",
      available: "24/7 Response",
      color: "#3b82f6",
    },
    {
      title: "Visit Us",
      icon: <MapPin size={24} />,
      primary: restaurantInfo.address.full,
      secondary: "Dine in or pickup",
      action: "Get Directions",
      available: "Open Daily",
      color: "#d97706",
    },
    {
      title: "Support",
      icon: <Headphones size={24} />,
      primary: "Customer Support",
      secondary: "Order help & assistance",
      action: "Contact Support",
      available: "24/7 Available",
      color: "#8b5cf6",
    },
  ];

  const teamMembers = [
    {
      name: "Marco Rossi",
      role: "Owner & Head Chef",
      email: "marco@bellavista.com",
      specialty: "General inquiries & feedback",
    },
    {
      name: "Elena Martinez",
      role: "Restaurant Manager",
      email: "elena@bellavista.com",
      specialty: "Reservations & events",
    },
    {
      name: "Sofia Rossi",
      role: "Catering Director",
      email: "catering@bellavista.com",
      specialty: "Private events & catering",
    },
  ];

  const faqItems = [
    {
      question: "Do you take reservations?",
      answer:
        "Yes, we accept reservations for parties of 2 or more. You can call us at (555) 123-4567 or book online through our reservation system.",
    },
    {
      question: "Do you offer delivery?",
      answer:
        "Yes, we offer delivery within a 5-mile radius. Delivery fee is $3.99 with a $25 minimum order. Average delivery time is 30-45 minutes.",
    },
    {
      question: "What are your COVID-19 safety measures?",
      answer:
        "We follow all local health guidelines including sanitization protocols, contactless payment options, and spacing between tables for dine-in guests.",
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer:
        "Absolutely! We offer vegetarian, vegan, and gluten-free options. Please inform us of any allergies when ordering, and we'll be happy to accommodate your needs.",
    },
    {
      question: "Is parking available?",
      answer:
        "Yes, we have a small parking lot behind the restaurant with 15 spaces. Street parking is also available on Main Street and surrounding areas.",
    },
    {
      question: "Do you offer catering services?",
      answer:
        "Yes, we provide full catering services for events of all sizes. Contact our catering director Sofia at catering@bellavista.com for more information.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success (you'd integrate with your actual API here)
    setFormStatus("success");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
    });

    // Clear success message after 5 seconds
    setTimeout(() => {
      setFormStatus(null);
    }, 5000);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <div className="contact-page">
      {/* Header */}
      <header className="restaurant-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <ChefHat size={28} />
              <span>{restaurantInfo.name}</span>
            </div>
            <nav className="main-nav">
              <a href="#" className="nav-link">
                <ArrowLeft size={16} />
                Back to Home
              </a>
              <a href="#menu">Menu</a>
              <a href="#about">About</a>
              <a href="#reservations">Reservations</a>
            </nav>
            <div className="header-actions">
              <a href={`tel:${restaurantInfo.phone}`} className="call-btn">
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Get in Touch</h1>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>

            <div className="quick-stats">
              <div className="stat">
                <Clock size={20} />
                <span>Open Daily</span>
              </div>
              <div className="stat">
                <Star size={20} />
                <span>4.8 Rating</span>
              </div>
              <div className="stat">
                <Users size={20} />
                <span>Family Owned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="container">
          <div className="section-header">
            <h2>Ways to Reach Us</h2>
            <p>Choose the method that works best for you</p>
          </div>

          <div className="methods-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className="method-card">
                <div
                  className="method-icon"
                  style={{ backgroundColor: method.color }}
                >
                  {method.icon}
                </div>
                <div className="method-info">
                  <h3>{method.title}</h3>
                  <span className="method-primary">{method.primary}</span>
                  <span className="method-secondary">{method.secondary}</span>
                  <span className="method-availability">
                    {method.available}
                  </span>
                </div>
                <button
                  className="method-action"
                  style={{ borderColor: method.color, color: method.color }}
                >
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>
                  Fill out the form below and we'll get back to you within 24
                  hours
                </p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <div className="input-wrapper">
                      <User size={16} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <div className="input-wrapper">
                      <Mail size={16} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="input-wrapper">
                      <Phone size={16} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="subject-select"
                    >
                      {contactReasons.map((reason) => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                {formStatus === "success" && (
                  <div className="form-message success">
                    <CheckCircle size={16} />
                    <span>
                      Thank you! Your message has been sent successfully. We'll
                      get back to you soon.
                    </span>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="form-message error">
                    <AlertCircle size={16} />
                    <span>
                      Sorry, there was an error sending your message. Please try
                      again.
                    </span>
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="submit"
                    className={`submit-btn ${
                      formStatus === "sending" ? "sending" : ""
                    }`}
                    disabled={!isFormValid || formStatus === "sending"}
                  >
                    <Send size={16} />
                    {formStatus === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              {/* Restaurant Info */}
              <div className="info-card">
                <h3>Restaurant Information</h3>

                <div className="info-items">
                  <div className="info-item">
                    <MapPin size={20} />
                    <div>
                      <span className="info-label">Address</span>
                      <span className="info-value">
                        {restaurantInfo.address.full}
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <Phone size={20} />
                    <div>
                      <span className="info-label">Phone</span>
                      <span className="info-value">
                        <a href={`tel:${restaurantInfo.phone}`}>
                          {restaurantInfo.phone}
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <Mail size={20} />
                    <div>
                      <span className="info-label">Email</span>
                      <span className="info-value">
                        <a href={`mailto:${restaurantInfo.email}`}>
                          {restaurantInfo.email}
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <Globe size={20} />
                    <div>
                      <span className="info-label">Website</span>
                      <span className="info-value">
                        <a
                          href={`https://${restaurantInfo.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {restaurantInfo.website}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="info-card">
                <h3>
                  <Clock size={20} />
                  Hours of Operation
                </h3>

                <div className="hours-list">
                  {hours.map((day, index) => (
                    <div
                      key={index}
                      className={`hour-item ${day.isToday ? "today" : ""}`}
                    >
                      <span className="day">{day.day}</span>
                      <span className="hours">{day.hours}</span>
                    </div>
                  ))}
                </div>

                <div className="hours-note">
                  <span>Hours may vary on holidays</span>
                </div>
              </div>

              {/* Team Contacts */}
              <div className="info-card">
                <h3>Direct Contacts</h3>

                <div className="team-contacts">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="team-contact">
                      <div className="contact-avatar">
                        <User size={16} />
                      </div>
                      <div className="contact-details">
                        <span className="contact-name">{member.name}</span>
                        <span className="contact-role">{member.role}</span>
                        <span className="contact-specialty">
                          {member.specialty}
                        </span>
                        <a
                          href={`mailto:${member.email}`}
                          className="contact-email"
                        >
                          {member.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="info-card">
                <h3>Follow Us</h3>

                <div className="social-links">
                  <a href="#" className="social-link instagram">
                    <Instagram size={20} />
                    <div>
                      <span>Instagram</span>
                      <small>@bellavista_nyc</small>
                    </div>
                  </a>

                  <a href="#" className="social-link facebook">
                    <Facebook size={20} />
                    <div>
                      <span>Facebook</span>
                      <small>Bella Vista Restaurant</small>
                    </div>
                  </a>

                  <a href="#" className="social-link twitter">
                    <Twitter size={20} />
                    <div>
                      <span>Twitter</span>
                      <small>@bellavista_nyc</small>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-header">
            <h2>Find Us</h2>
            <div className="map-actions">
              <button className="directions-btn">
                <Navigation size={16} />
                Get Directions
              </button>
              <button className="parking-btn">
                <Car size={16} />
                Parking Info
              </button>
            </div>
          </div>

          <div className="map-container">
            <div className="map-placeholder">
              <MapPin size={48} />
              <span>Interactive Map</span>
              <small>{restaurantInfo.address.full}</small>
            </div>

            <div className="map-info">
              <div className="location-details">
                <h4>Location Details</h4>
                <ul>
                  <li>Located in the heart of Downtown</li>
                  <li>5 minutes from Central Station</li>
                  <li>Accessible by subway lines A, C, E</li>
                  <li>15 parking spaces available behind restaurant</li>
                  <li>Street parking available on Main Street</li>
                  <li>Wheelchair accessible entrance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our restaurant</p>
          </div>

          <div className="faq-grid">
            {faqItems.map((faq, index) => (
              <div key={index} className="faq-card">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="faq-footer">
            <p>Don't see your question answered?</p>
            <button className="contact-us-btn">
              <MessageCircle size={16} />
              Contact Us Directly
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
