import React, { useState } from "react";
import {
  ChefHat,
  Heart,
  Star,
  Users,
  Award,
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ArrowLeft,
  Play,
  Quote,
  Leaf,
  Globe,
  Calendar,
  Camera,
} from "lucide-react";
import "./AboutPage.css";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const restaurantInfo = {
    name: "Bella Vista",
    tagline: "Authentic Italian Cuisine",
    foundedYear: 1985,
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    email: "info@bellavista.com",
    rating: 4.8,
    reviews: 1247,
  };

  const story = {
    founding:
      "Founded in 1985 by the Rossi family, Bella Vista began as a dream to bring authentic Italian flavors to our community. What started as a small family kitchen has grown into a beloved neighborhood institution.",
    tradition:
      "Our recipes have been passed down through three generations, each dish prepared with the same love and attention that Nonna Rossi brought to her kitchen in Naples.",
    mission:
      "We believe that great food brings people together. Every meal we serve is crafted to create memories, celebrate moments, and nourish both body and soul.",
  };

  const values = [
    {
      icon: <Heart size={32} />,
      title: "Made with Love",
      description:
        "Every dish is prepared with passion and care, using time-honored family recipes.",
    },
    {
      icon: <Leaf size={32} />,
      title: "Fresh Ingredients",
      description:
        "We source the finest local and imported ingredients to ensure authentic flavors.",
    },
    {
      icon: <Users size={32} />,
      title: "Family Tradition",
      description:
        "Three generations of culinary expertise, bringing you the true taste of Italy.",
    },
    {
      icon: <Globe size={32} />,
      title: "Authentic Experience",
      description:
        "From San Marzano tomatoes to handmade pasta, we maintain authentic Italian standards.",
    },
  ];

  const team = [
    {
      name: "Marco Rossi",
      role: "Head Chef & Owner",
      bio: "Third-generation chef trained in Naples, bringing 25 years of culinary expertise to every dish.",
      specialties: ["Pasta", "Pizza", "Seafood"],
      image: "marco-chef",
    },
    {
      name: "Sofia Rossi",
      role: "Pastry Chef",
      bio: "Master of traditional Italian desserts, trained at Le Cordon Bleu with a passion for tiramisu.",
      specialties: ["Desserts", "Gelato", "Pastries"],
      image: "sofia-pastry",
    },
    {
      name: "Giuseppe Romano",
      role: "Sous Chef",
      bio: "15 years of experience in fine Italian dining, specializing in regional cuisine from Tuscany.",
      specialties: ["Meat Dishes", "Sauces", "Regional Cuisine"],
      image: "giuseppe-sous",
    },
    {
      name: "Elena Martinez",
      role: "Restaurant Manager",
      bio: "Hospitality expert ensuring every guest feels like family, with 12 years in restaurant management.",
      specialties: ["Guest Experience", "Operations", "Wine Pairing"],
      image: "elena-manager",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Blogger",
      rating: 5,
      text: "Bella Vista transports you straight to Italy. The carbonara is perfection - silky, rich, and made exactly as it should be. This is authentic Italian cooking at its finest.",
      date: "2 weeks ago",
    },
    {
      name: "Michael Chen",
      role: "Local Resident",
      rating: 5,
      text: "I've been coming here for 10 years, and it never disappoints. The Rossi family treats everyone like family, and the food is consistently outstanding. Best Italian restaurant in the city!",
      date: "1 month ago",
    },
    {
      name: "Jessica Williams",
      role: "Anniversary Dinner",
      rating: 5,
      text: "Celebrated our 5th anniversary here and it was magical. The ambiance, service, and food were all perfect. The tiramisu was the best I've ever had outside of Italy.",
      date: "3 weeks ago",
    },
  ];

  const awards = [
    {
      year: "2023",
      title: "Best Italian Restaurant",
      organization: "City Food Awards",
      icon: <Award size={24} />,
    },
    {
      year: "2022",
      title: "Excellence in Dining",
      organization: "Restaurant Association",
      icon: <Star size={24} />,
    },
    {
      year: "2021",
      title: "Family Business of the Year",
      organization: "Chamber of Commerce",
      icon: <Users size={24} />,
    },
    {
      year: "2020",
      title: "Community Choice Award",
      organization: "Local Business Awards",
      icon: <Heart size={24} />,
    },
  ];

  const gallery = [
    {
      id: 1,
      type: "restaurant",
      alt: "Dining room with warm lighting",
      category: "Interior",
    },
    {
      id: 2,
      type: "kitchen",
      alt: "Chef preparing fresh pasta",
      category: "Kitchen",
    },
    {
      id: 3,
      type: "food",
      alt: "Margherita pizza fresh from oven",
      category: "Food",
    },
    {
      id: 4,
      type: "team",
      alt: "Chef team in kitchen",
      category: "Team",
    },
    {
      id: 5,
      type: "exterior",
      alt: "Restaurant exterior at sunset",
      category: "Exterior",
    },
    {
      id: 6,
      type: "preparation",
      alt: "Fresh ingredients being prepared",
      category: "Preparation",
    },
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="about-page">
      {/* Header */}
      <header className="restaurant-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <ChefHat size={28} />
              <span>{restaurantInfo.name}</span>
            </div>
            <nav className="main-nav">
              <Link to={".."} className="nav-link">
                <ArrowLeft size={16} />
                Back to Home
              </Link>
              <Link to="../menu">Menu</Link>
              <Link to="../contact">Contact</Link>
              <Link to="../reservations">Reservations</Link>
            </nav>
            <div className="header-actions">
              <a href="#contact" className="contact-btn">
                <Phone size={16} />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
          <div className="hero-image"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-subtitle">
                Since {restaurantInfo.foundedYear}
              </span>
              <h1>Our Story</h1>
              <p className="hero-description">
                Three generations of Italian culinary tradition, bringing
                authentic flavors and warm hospitality to every meal we serve.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">38+</span>
                  <span className="stat-label">Years of Excellence</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{restaurantInfo.rating}</span>
                  <span className="stat-label">Average Rating</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50k+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>The Rossi Family Legacy</h2>
              <div className="story-paragraphs">
                <p>{story.founding}</p>
                <p>{story.tradition}</p>
                <p>{story.mission}</p>
              </div>

              <div className="story-highlights">
                <div className="highlight">
                  <Calendar size={20} />
                  <div>
                    <span>Established {restaurantInfo.foundedYear}</span>
                    <small>Nearly four decades of tradition</small>
                  </div>
                </div>
                <div className="highlight">
                  <Users size={20} />
                  <div>
                    <span>Third Generation</span>
                    <small>
                      Family recipes passed down through generations
                    </small>
                  </div>
                </div>
                <div className="highlight">
                  <Globe size={20} />
                  <div>
                    <span>Authentic Italian</span>
                    <small>Ingredients imported directly from Italy</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-image">
              <div className="family-photo"></div>
              <div className="photo-caption">
                <span>
                  The Rossi family in their original kitchen, Naples 1980
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="our-values">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="our-team">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate people behind every delicious meal</p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-photo">
                  <div className={`chef-image ${member.image}`}></div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <span className="member-role">{member.role}</span>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-specialties">
                    <span className="specialties-label">Specialties:</span>
                    <div className="specialties-tags">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="awards-section">
        <div className="container">
          <div className="section-header">
            <h2>Recognition & Awards</h2>
            <p>Honored to be recognized for our commitment to excellence</p>
          </div>

          <div className="awards-grid">
            {awards.map((award, index) => (
              <div key={index} className="award-card">
                <div className="award-icon">{award.icon}</div>
                <div className="award-info">
                  <span className="award-year">{award.year}</span>
                  <h4>{award.title}</h4>
                  <span className="award-org">{award.organization}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Guests Say</h2>
            <p>Stories from our valued customers</p>
          </div>

          <div className="testimonials-slider">
            <div className="testimonial-card">
              <div className="quote-icon">
                <Quote size={32} />
              </div>
              <div className="testimonial-content">
                <div className="rating">
                  {[...Array(testimonials[activeTestimonial].rating)].map(
                    (_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    )
                  )}
                </div>
                <blockquote>
                  "{testimonials[activeTestimonial].text}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="author-info">
                    <span className="author-name">
                      {testimonials[activeTestimonial].name}
                    </span>
                    <span className="author-role">
                      {testimonials[activeTestimonial].role}
                    </span>
                  </div>
                  <span className="testimonial-date">
                    {testimonials[activeTestimonial].date}
                  </span>
                </div>
              </div>
            </div>

            <div className="testimonial-navigation">
              <button onClick={prevTestimonial} className="nav-btn">
                ‹
              </button>
              <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${
                      index === activeTestimonial ? "active" : ""
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                  ></button>
                ))}
              </div>
              <button onClick={nextTestimonial} className="nav-btn">
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="photo-gallery">
        <div className="container">
          <div className="section-header">
            <h2>Gallery</h2>
            <p>
              A glimpse into our restaurant, kitchen, and culinary creations
            </p>
          </div>

          <div className="gallery-grid">
            {gallery.map((photo) => (
              <div key={photo.id} className="gallery-item">
                <div className={`gallery-image ${photo.type}`}>
                  <div className="gallery-overlay">
                    <Camera size={24} />
                    <span>{photo.alt}</span>
                  </div>
                </div>
                <div className="gallery-caption">
                  <span className="gallery-category">{photo.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Visit Us Today</h2>
              <p>
                Experience authentic Italian cuisine in a warm, welcoming
                atmosphere
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <MapPin size={20} />
                  <div>
                    <span className="contact-label">Address</span>
                    <span className="contact-value">
                      {restaurantInfo.address}
                    </span>
                  </div>
                </div>

                <div className="contact-item">
                  <Phone size={20} />
                  <div>
                    <span className="contact-label">Phone</span>
                    <span className="contact-value">
                      {restaurantInfo.phone}
                    </span>
                  </div>
                </div>

                <div className="contact-item">
                  <Mail size={20} />
                  <div>
                    <span className="contact-label">Email</span>
                    <span className="contact-value">
                      {restaurantInfo.email}
                    </span>
                  </div>
                </div>

                <div className="contact-item">
                  <Clock size={20} />
                  <div>
                    <span className="contact-label">Hours</span>
                    <span className="contact-value">
                      Mon-Sun: 11:00 AM - 10:00 PM
                    </span>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="#" className="social-link">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="social-link">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="social-link">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-actions">
              <a href="#menu" className="btn-primary">
                <ChefHat size={20} />
                View Menu
              </a>
              <a href="#reservations" className="btn-secondary">
                <Calendar size={20} />
                Make Reservation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
