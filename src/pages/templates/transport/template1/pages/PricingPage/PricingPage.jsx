import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Star,
  Clock,
  Shield,
  Car,
  Users,
  MapPin,
  Phone,
  Calendar,
  Award,
  Crown,
  Zap,
  ChevronRight,
  Info,
} from "lucide-react";
import "./PricingPage.css";

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState("hourly");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Pricing tiers data
  const pricingTiers = [
    {
      id: "executive",
      name: "Executive",
      icon: Car,
      description: "Premium comfort for business travel",
      popular: false,
      pricing: {
        hourly: { price: 85, period: "per hour" },
        daily: { price: 650, period: "per day" },
        monthly: { price: 15000, period: "per month" },
      },
      features: [
        "Mercedes E-Class or BMW 5 Series",
        "Professional chauffeur",
        "Complimentary Wi-Fi",
        "Bottled water & mints",
        "Airport pickup included",
        "24/7 customer support",
        "Real-time GPS tracking",
        "Flexible booking",
      ],
      vehicles: ["Mercedes E-Class", "BMW 5 Series", "Audi A6"],
    },
    {
      id: "luxury",
      name: "Luxury",
      icon: Award,
      description: "Ultimate luxury experience",
      popular: true,
      pricing: {
        hourly: { price: 150, period: "per hour" },
        daily: { price: 1200, period: "per day" },
        monthly: { price: 28000, period: "per month" },
      },
      features: [
        "Mercedes S-Class or BMW 7 Series",
        "Elite trained chauffeur",
        "Premium refreshments",
        "Luxury amenities package",
        "Priority scheduling",
        "Concierge services",
        "Multi-city coordination",
        "VIP airport lounge access",
        "Event planning assistance",
      ],
      vehicles: ["Mercedes S-Class", "BMW 7 Series", "Tesla Model S"],
    },
    {
      id: "premium",
      name: "Premium Elite",
      icon: Crown,
      description: "The pinnacle of luxury transportation",
      popular: false,
      pricing: {
        hourly: { price: 300, period: "per hour" },
        daily: { price: 2500, period: "per day" },
        monthly: { price: 55000, period: "per month" },
      },
      features: [
        "Rolls Royce or Bentley",
        "Personal luxury attendant",
        "Champagne service",
        "Red carpet treatment",
        "Security detail available",
        "Private jet coordination",
        "Exclusive venue access",
        "Personal shopping assistance",
        "Fine dining reservations",
        "Unlimited destinations",
        "White-glove service",
      ],
      vehicles: [
        "Rolls Royce Ghost",
        "Bentley Flying Spur",
        "Mercedes-Maybach",
      ],
    },
  ];

  // Vehicle categories for filtering
  const vehicleCategories = [
    { id: "all", name: "All Vehicles", icon: Car },
    { id: "executive", name: "Executive", icon: Car },
    { id: "luxury", name: "Luxury SUV", icon: Car },
    { id: "premium", name: "Premium Sports", icon: Zap },
    { id: "ultra", name: "Ultra Luxury", icon: Crown },
  ];

  // Individual vehicle pricing
  const vehicleFleet = [
    {
      id: 1,
      category: "executive",
      name: "Mercedes E-Class",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
      hourly: 85,
      daily: 650,
      features: [
        "Leather interior",
        "Wi-Fi",
        "Climate control",
        "Premium sound",
      ],
      capacity: "3 passengers",
      rating: 4.8,
    },
    {
      id: 2,
      category: "executive",
      name: "BMW 5 Series",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      hourly: 85,
      daily: 650,
      features: ["Sport seats", "Navigation", "Sunroof", "Premium audio"],
      capacity: "3 passengers",
      rating: 4.9,
    },
    {
      id: 3,
      category: "luxury",
      name: "Mercedes S-Class",
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
      hourly: 150,
      daily: 1200,
      features: [
        "Massage seats",
        "Champagne bar",
        "Privacy glass",
        "Premium entertainment",
      ],
      capacity: "3 passengers",
      rating: 4.9,
    },
    {
      id: 4,
      category: "luxury",
      name: "BMW X7",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
      hourly: 125,
      daily: 950,
      features: [
        "3-row seating",
        "Panoramic roof",
        "Premium sound",
        "Captain's chairs",
      ],
      capacity: "6 passengers",
      rating: 4.8,
    },
    {
      id: 5,
      category: "premium",
      name: "Tesla Model S",
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
      hourly: 200,
      daily: 1500,
      features: [
        "Autopilot",
        "Premium interior",
        "Ludicrous mode",
        "Glass roof",
      ],
      capacity: "4 passengers",
      rating: 4.7,
    },
    {
      id: 6,
      category: "ultra",
      name: "Rolls Royce Ghost",
      image:
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop",
      hourly: 300,
      daily: 2500,
      features: [
        "Starlight headliner",
        "Bespoke interior",
        "Whisper quiet",
        "Spirit of Ecstasy",
      ],
      capacity: "3 passengers",
      rating: 5.0,
    },
  ];

  const filteredVehicles =
    selectedCategory === "all"
      ? vehicleFleet
      : vehicleFleet.filter((vehicle) => vehicle.category === selectedCategory);

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&h=1080&fit=crop"
            alt="Luxury vehicle interior"
            className="hero-image"
          />
        </div>

        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Transparent <span className="highlight">Pricing</span>
            </h1>
            <p className="hero-subtitle">
              Choose from our range of premium transportation services. No
              hidden fees, just luxury you can trust.
            </p>

            {/* Billing Period Toggle */}
            <div className="billing-toggle">
              <div className="toggle-options">
                {[
                  { key: "hourly", label: "Hourly" },
                  { key: "daily", label: "Daily" },
                  { key: "monthly", label: "Monthly", badge: "Best Value" },
                ].map((option) => (
                  <button
                    key={option.key}
                    className={`toggle-option ${
                      billingPeriod === option.key ? "active" : ""
                    }`}
                    onClick={() => setBillingPeriod(option.key)}
                  >
                    {option.label}
                    {option.badge && (
                      <span className="toggle-badge">{option.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="pricing-tiers">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Service Packages</h2>
            <p className="section-subtitle">
              Professional chauffeur services tailored to your needs
            </p>
          </div>

          <div className="tiers-grid">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`pricing-card ${tier.popular ? "popular" : ""}`}
              >
                {tier.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}

                <div className="card-header">
                  <div className="tier-icon">
                    <tier.icon size={32} />
                  </div>
                  <h3 className="tier-name">{tier.name}</h3>
                  <p className="tier-description">{tier.description}</p>
                </div>

                <div className="pricing-info">
                  <div className="price">
                    <span className="currency">$</span>
                    <span className="amount">
                      {tier.pricing[billingPeriod].price.toLocaleString()}
                    </span>
                  </div>
                  <div className="period">
                    {tier.pricing[billingPeriod].period}
                  </div>
                </div>

                <div className="features-list">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <Check size={16} className="check-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="vehicle-examples">
                  <h4 className="vehicles-title">Included Vehicles:</h4>
                  <div className="vehicles-list">
                    {tier.vehicles.map((vehicle, index) => (
                      <span key={index} className="vehicle-tag">
                        {vehicle}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to="/book" className="tier-button">
                  Select {tier.name}
                  <ChevronRight size={20} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Vehicle Pricing */}
      <section className="vehicle-pricing">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Individual Vehicles</h2>
            <p className="section-subtitle">
              Browse our premium fleet and choose your preferred vehicle
            </p>
          </div>

          {/* Vehicle Category Filter */}
          <div className="category-filter">
            {vehicleCategories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon size={20} />
                {category.name}
              </button>
            ))}
          </div>

          {/* Vehicle Grid */}
          <div className="vehicles-grid">
            {filteredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card">
                <div className="vehicle-image">
                  <img src={vehicle.image} alt={vehicle.name} />
                  <div className="vehicle-overlay">
                    <div className="vehicle-rating">
                      <Star size={16} className="star-icon" />
                      <span>{vehicle.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="vehicle-info">
                  <h3 className="vehicle-name">{vehicle.name}</h3>
                  <div className="vehicle-capacity">
                    <Users size={16} />
                    <span>{vehicle.capacity}</span>
                  </div>

                  <div className="vehicle-features">
                    {vehicle.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="feature-chip">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="vehicle-pricing-info">
                    <div className="pricing-option">
                      <span className="price">${vehicle.hourly}</span>
                      <span className="period">per hour</span>
                    </div>
                    <div className="pricing-option">
                      <span className="price">${vehicle.daily}</span>
                      <span className="period">per day</span>
                    </div>
                  </div>

                  <Link to="/book" className="book-vehicle-btn">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="additional-services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Additional Services</h2>
            <p className="section-subtitle">
              Enhance your experience with our premium add-ons
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <Shield size={32} />
              </div>
              <h3 className="service-name">Security Detail</h3>
              <p className="service-description">
                Professional security personnel for high-profile clients
              </p>
              <div className="service-price">From $200/hour</div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <MapPin size={32} />
              </div>
              <h3 className="service-name">Multi-City Tours</h3>
              <p className="service-description">
                Seamless transportation across multiple destinations
              </p>
              <div className="service-price">Custom pricing</div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Calendar size={32} />
              </div>
              <h3 className="service-name">Event Coordination</h3>
              <p className="service-description">
                Complete transportation planning for special events
              </p>
              <div className="service-price">From $500</div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Phone size={32} />
              </div>
              <h3 className="service-name">Concierge Services</h3>
              <p className="service-description">
                Personal assistant services and lifestyle management
              </p>
              <div className="service-price">From $100/hour</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="pricing-faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Pricing Information</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <div className="faq-icon">
                <Info size={24} />
              </div>
              <div>
                <h3 className="faq-title">No Hidden Fees</h3>
                <p className="faq-description">
                  All prices include fuel, tolls, and standard gratuity. What
                  you see is what you pay.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-icon">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="faq-title">Minimum Booking</h3>
                <p className="faq-description">
                  3-hour minimum for hourly bookings. Daily rates apply for
                  bookings over 8 hours.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-icon">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="faq-title">Advance Booking</h3>
                <p className="faq-description">
                  Book 24 hours in advance for guaranteed availability. Same-day
                  bookings subject to fleet availability.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-icon">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="faq-title">Cancellation Policy</h3>
                <p className="faq-description">
                  Free cancellation up to 4 hours before scheduled pickup. 50%
                  charge for late cancellations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience Luxury?</h2>
            <p className="cta-subtitle">
              Book your premium transportation today and travel in style
            </p>
            <div className="cta-actions">
              <Link to="/book" className="btn btn-primary btn-lg">
                Book Your Ride Now
              </Link>
              <a href="tel:+1-555-VIP-RIDE" className="btn btn-outline btn-lg">
                <Phone size={20} />
                Get Custom Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
