import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Shield,
  Clock,
  Award,
  Star,
  ChevronRight,
  ChevronLeft,
  Users,
  MapPin,
  Phone,
} from "lucide-react";
import "./Homepage.css";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "CEO, TechCorp",
    content:
      "Exceptional service from start to finish. The chauffeur was professional and the vehicle was pristine. I wouldn't trust anyone else with my important business meetings.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Investment Banker",
    content:
      "I use VIP Transport for all my client meetings. They never disappoint and always arrive on time. The attention to detail is what sets them apart from other services.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Event Planner",
    content:
      "Perfect for high-profile events. The attention to detail and luxury service is unmatched. My clients are always impressed with the level of professionalism.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "David Park",
    title: "Corporate Executive",
    content:
      "The fleet is immaculate and the drivers are true professionals. VIP Transport has become an essential part of my business operations.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
];

// Value proposition cards data
const valueProps = [
  {
    icon: Shield,
    title: "Premium Security",
    description:
      "All vehicles equipped with advanced security features and professional chauffeurs undergo extensive background checks.",
  },
  {
    icon: Clock,
    title: "Always On Time",
    description:
      "Our commitment to punctuality ensures you never miss important meetings or events. Real-time tracking available.",
  },
  {
    icon: Award,
    title: "Luxury Fleet",
    description:
      "Experience the finest vehicles from Mercedes, BMW, Rolls Royce, and Tesla. Meticulously maintained and pristine.",
  },
  {
    icon: Users,
    title: "Professional Service",
    description:
      "Our expertly trained chauffeurs provide discreet, professional service tailored to your specific requirements.",
  },
];

const Homepage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop"
            alt="Luxury car interior"
            className="hero-image"
          />
        </div>

        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1 className="hero-title">
                Luxury Transportation
                <span className="highlight">Redefined</span>
              </h1>
              <p className="hero-subtitle">
                Experience premium chauffeur services with our fleet of luxury
                vehicles. Professional, punctual, and private transportation for
                discerning clients.
              </p>
              <div className="hero-actions">
                <Link to="/book" className="btn btn-primary btn-lg">
                  Book Your Ride
                  <ChevronRight size={20} />
                </Link>
                <Link to="/fleet" className="btn btn-outline btn-lg">
                  View Our Fleet
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Available</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Luxury Vehicles</div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="value-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose VIP Transport</h2>
            <p className="section-subtitle">
              We deliver uncompromising quality and service excellence
            </p>
          </div>

          <div className="value-grid">
            {valueProps.map((prop, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <prop.icon size={32} />
                </div>
                <h3 className="value-title">{prop.title}</h3>
                <p className="value-description">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="services-section">
        <div className="container">
          <div className="services-content">
            <div className="services-text">
              <h2 className="section-title">Premium Services</h2>
              <p className="section-subtitle">
                Tailored transportation solutions for every occasion
              </p>

              <div className="services-list">
                <div className="service-item">
                  <div className="service-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4>Airport Transfers</h4>
                    <p>Seamless pickup and drop-off services</p>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4>Corporate Events</h4>
                    <p>Professional transportation for business</p>
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-icon">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4>Special Occasions</h4>
                    <p>Luxury rides for memorable moments</p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn btn-outline">
                Learn More About Us
              </Link>
            </div>

            <div className="services-image">
              <img
                src="https://images.unsplash.com/photo-1555652108-c6545ddc4104?w=600&h=800&fit=crop"
                alt="Luxury chauffeur service"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Trusted by executives, celebrities, and discerning travelers
            </p>
          </div>

          <div className="testimonials-slider">
            <button
              className="slider-btn slider-btn-prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="testimonial-container">
              <div
                className="testimonial-track"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="testimonial-slide">
                    <div className="testimonial-card">
                      <div className="testimonial-rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={20} className="star-filled" />
                        ))}
                      </div>

                      <blockquote className="testimonial-quote">
                        "{testimonial.content}"
                      </blockquote>

                      <div className="testimonial-author">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="author-image"
                        />
                        <div className="author-info">
                          <div className="author-name">{testimonial.name}</div>
                          <div className="author-title">
                            {testimonial.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="slider-btn slider-btn-next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Slider Indicators */}
          <div className="slider-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${
                  index === currentTestimonial ? "active" : ""
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready for Your Next Journey?</h2>
            <p className="cta-subtitle">
              Book your premium transportation experience today
            </p>
            <div className="cta-actions">
              <Link to="/book" className="btn btn-primary btn-lg">
                Book Now
              </Link>
              <a href="tel:+1-555-VIP-RIDE" className="btn btn-outline btn-lg">
                <Phone size={20} />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
