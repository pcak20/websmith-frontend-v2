import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Star,
  Fuel,
  Shield,
  Wifi,
  Coffee,
  Car,
  Filter,
  Grid3X3,
  List,
  Search,
  ChevronRight,
  MapPin,
  Clock,
  Award,
} from "lucide-react";
import "./FleetPage.css";

// Vehicle data with comprehensive details
const vehicleData = [
  {
    id: 1,
    name: "Mercedes S-Class",
    category: "luxury",
    seats: 4,
    year: 2024,
    color: "Obsidian Black",
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&h=600&fit=crop",
    ],
    pricePerKm: 3.5,
    pricePerHour: 120,
    features: [
      "Premium Leather Seats",
      "Climate Control",
      "WiFi",
      "Refreshments",
      "Privacy Glass",
      "Premium Audio",
    ],
    description:
      "The epitome of luxury and comfort, perfect for executive travel and special occasions.",
    specs: {
      engine: "V6 Turbo",
      transmission: "9-Speed Automatic",
      fuelType: "Premium Gasoline",
    },
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 2,
    name: "BMW 7 Series",
    category: "luxury",
    seats: 4,
    year: 2024,
    color: "Alpine White",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515197-d608d3b0ad1c?w=800&h=600&fit=crop",
    ],
    pricePerKm: 3.2,
    pricePerHour: 115,
    features: [
      "Massage Seats",
      "Entertainment System",
      "Mini Bar",
      "Privacy Glass",
      "Gesture Control",
      "Ambient Lighting",
    ],
    description:
      "Advanced technology meets luxury comfort in this flagship BMW sedan.",
    specs: {
      engine: "V8 Twin Turbo",
      transmission: "8-Speed Automatic",
      fuelType: "Premium Gasoline",
    },
    rating: 4.8,
    reviews: 94,
  },
  {
    id: 3,
    name: "Rolls Royce Ghost",
    category: "ultra-luxury",
    seats: 4,
    year: 2024,
    color: "Arctic White",
    images: [
      "https://images.unsplash.com/photo-1631295868785-3ac2dcf14c4c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544896478-d5c99a1e4ef5?w=800&h=600&fit=crop",
    ],
    pricePerKm: 8.0,
    pricePerHour: 300,
    features: [
      "Chauffeur Service",
      "Champagne Service",
      "Starlight Headliner",
      "Handcrafted Interior",
      "Bespoke Audio",
      "Privacy Suite",
    ],
    description:
      "The ultimate in automotive luxury, offering an unparalleled travel experience.",
    specs: {
      engine: "V12 Twin Turbo",
      transmission: "8-Speed Automatic",
      fuelType: "Premium Gasoline",
    },
    rating: 5.0,
    reviews: 45,
  },
  {
    id: 4,
    name: "Tesla Model S Plaid",
    category: "electric-luxury",
    seats: 5,
    year: 2024,
    color: "Pearl White",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571066811602-716837d681de?w=800&h=600&fit=crop",
    ],
    pricePerKm: 2.8,
    pricePerHour: 95,
    features: [
      "Autopilot",
      "Premium Audio",
      "Glass Roof",
      "Eco-Friendly",
      "Over-the-Air Updates",
      "Gaming Console",
    ],
    description:
      "Cutting-edge electric luxury with incredible performance and zero emissions.",
    specs: {
      engine: "Tri-Motor Electric",
      transmission: "Single-Speed",
      fuelType: "Electric",
    },
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 5,
    name: "Range Rover Vogue",
    category: "suv",
    seats: 7,
    year: 2024,
    color: "Santorini Black",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606016159991-33d48d37b9b9?w=800&h=600&fit=crop",
    ],
    pricePerKm: 4.2,
    pricePerHour: 140,
    features: [
      "All-Terrain Capability",
      "Premium Sound",
      "Panoramic Roof",
      "Luxury Seating",
      "Air Suspension",
      "Terrain Response",
    ],
    description:
      "Luxury SUV combining elegance with capability for any journey or terrain.",
    specs: {
      engine: "V8 Supercharged",
      transmission: "8-Speed Automatic",
      fuelType: "Premium Gasoline",
    },
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 6,
    name: "Mercedes Sprinter VIP",
    category: "group",
    seats: 12,
    year: 2024,
    color: "Brilliant Silver",
    images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    ],
    pricePerKm: 5.5,
    pricePerHour: 180,
    features: [
      "Conference Setup",
      "WiFi",
      "Refreshment Bar",
      "Privacy Partition",
      "Individual Seating",
      "Entertainment System",
    ],
    description:
      "Perfect for group travel and corporate events with luxury amenities throughout.",
    specs: {
      engine: "V6 Turbo Diesel",
      transmission: "9-Speed Automatic",
      fuelType: "Diesel",
    },
    rating: 4.5,
    reviews: 67,
  },
  {
    id: 7,
    name: "Bentley Flying Spur",
    category: "ultra-luxury",
    seats: 4,
    year: 2024,
    color: "Moonbeam Silver",
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&h=600&fit=crop",
    ],
    pricePerKm: 7.5,
    pricePerHour: 280,
    features: [
      "Diamond Quilted Leather",
      "Rotating Display",
      "Massage Seats",
      "Premium Bar",
      "Naim Audio",
      "Handcrafted Details",
    ],
    description:
      "British luxury at its finest, combining performance with unmatched craftsmanship.",
    specs: {
      engine: "W12 Twin Turbo",
      transmission: "8-Speed Automatic",
      fuelType: "Premium Gasoline",
    },
    rating: 4.9,
    reviews: 38,
  },
  {
    id: 8,
    name: "Audi A8 L",
    category: "luxury",
    seats: 4,
    year: 2024,
    color: "Mythos Black",
    images: [
      "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800&h=600&fit=crop",
    ],
    pricePerKm: 3.0,
    pricePerHour: 110,
    features: [
      "Matrix LED Lights",
      "Virtual Cockpit",
      "Bang & Olufsen Audio",
      "Massage Seats",
      "AI Assistant",
      "Predictive Suspension",
    ],
    description:
      "German engineering excellence with advanced technology and refined luxury.",
    specs: {
      engine: "V6 TFSI",
      transmission: "8-Speed Tiptronic",
      fuelType: "Premium Gasoline",
    },
    rating: 4.7,
    reviews: 112,
  },
];

// Category definitions
const categories = [
  { id: "all", name: "All Vehicles", icon: Car, count: vehicleData.length },
  {
    id: "luxury",
    name: "Luxury Sedans",
    icon: Star,
    count: vehicleData.filter((v) => v.category === "luxury").length,
  },
  {
    id: "ultra-luxury",
    name: "Ultra Luxury",
    icon: Award,
    count: vehicleData.filter((v) => v.category === "ultra-luxury").length,
  },
  {
    id: "electric-luxury",
    name: "Electric Luxury",
    icon: Fuel,
    count: vehicleData.filter((v) => v.category === "electric-luxury").length,
  },
  {
    id: "suv",
    name: "Luxury SUVs",
    icon: Shield,
    count: vehicleData.filter((v) => v.category === "suv").length,
  },
  {
    id: "group",
    name: "Group Transport",
    icon: Users,
    count: vehicleData.filter((v) => v.category === "group").length,
  },
];

const FleetPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name"); // 'name', 'price', 'rating', 'seats'
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    let filtered = vehicleData.filter((vehicle) => {
      const matchesCategory =
        activeCategory === "all" || vehicle.category === activeCategory;
      const matchesSearch =
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.features.some((feature) =>
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.pricePerKm - b.pricePerKm;
        case "rating":
          return b.rating - a.rating;
        case "seats":
          return b.seats - a.seats;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [activeCategory, searchTerm, sortBy]);

  const openVehicleModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentImageIndex(0);
  };

  const closeVehicleModal = () => {
    setSelectedVehicle(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedVehicle && selectedVehicle.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === selectedVehicle.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedVehicle && selectedVehicle.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedVehicle.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="fleet-page">
      {/* Hero Section */}
      <section className="fleet-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&h=800&fit=crop"
            alt="Luxury car fleet"
            className="hero-image"
          />
        </div>
        <div className="hero-content">
          <div className="container">
            <h1 className="hero-title">Our Premium Fleet</h1>
            <p className="hero-subtitle">
              Discover our collection of meticulously maintained luxury
              vehicles, each selected to provide the ultimate in comfort, style,
              and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="fleet-content">
        <div className="container">
          {/* Filters and Controls */}
          <div className="fleet-controls">
            <div className="controls-top">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search vehicles or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="controls-right">
                <div className="sort-dropdown">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="seats">Sort by Capacity</option>
                  </select>
                </div>

                <div className="view-toggle">
                  <button
                    className={`view-btn ${
                      viewMode === "grid" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={20} />
                  </button>
                  <button
                    className={`view-btn ${
                      viewMode === "list" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <category.icon size={20} />
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Info */}
          <div className="results-info">
            <p>Showing {filteredVehicles.length} vehicles</p>
          </div>

          {/* Vehicle Grid/List */}
          <div className={`vehicle-container ${viewMode}`}>
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="vehicle-card"
                onClick={() => openVehicleModal(vehicle)}
              >
                <div className="vehicle-image-container">
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="vehicle-image"
                  />
                  <div className="vehicle-overlay">
                    <button className="view-details-btn">
                      View Details
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  {vehicle.images.length > 1 && (
                    <div className="image-count">
                      +{vehicle.images.length - 1} photos
                    </div>
                  )}
                </div>

                <div className="vehicle-info">
                  <div className="vehicle-header">
                    <h3 className="vehicle-name">{vehicle.name}</h3>
                    <div className="vehicle-rating">
                      <Star size={16} className="star-filled" />
                      <span>{vehicle.rating}</span>
                      <span className="review-count">({vehicle.reviews})</span>
                    </div>
                  </div>

                  <div className="vehicle-meta">
                    <span className="vehicle-year">{vehicle.year}</span>
                    <span className="vehicle-color">{vehicle.color}</span>
                    <span className="vehicle-capacity">
                      <Users size={16} />
                      {vehicle.seats} seats
                    </span>
                  </div>

                  <p className="vehicle-description">{vehicle.description}</p>

                  <div className="vehicle-features">
                    {vehicle.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                    {vehicle.features.length > 3 && (
                      <span className="feature-more">
                        +{vehicle.features.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="vehicle-pricing">
                    <div className="price-item">
                      <span className="price-label">Per km</span>
                      <span className="price-value">${vehicle.pricePerKm}</span>
                    </div>
                    <div className="price-item">
                      <span className="price-label">Per hour</span>
                      <span className="price-value">
                        ${vehicle.pricePerHour}
                      </span>
                    </div>
                  </div>

                  <div className="vehicle-actions">
                    <Link
                      to={`/book?vehicle=${vehicle.id}`}
                      className="btn btn-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Book Now
                    </Link>
                    <button
                      className="btn btn-outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        openVehicleModal(vehicle);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="no-results">
              <Car size={64} className="no-results-icon" />
              <h3>No vehicles found</h3>
              <p>Try adjusting your search criteria or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="modal-overlay" onClick={closeVehicleModal}>
          <div className="vehicle-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeVehicleModal}>
              ×
            </button>

            <div className="modal-content">
              <div className="modal-gallery">
                <div className="gallery-main">
                  <img
                    src={selectedVehicle.images[currentImageIndex]}
                    alt={selectedVehicle.name}
                    className="gallery-image"
                  />
                  {selectedVehicle.images.length > 1 && (
                    <>
                      <button className="gallery-nav prev" onClick={prevImage}>
                        ‹
                      </button>
                      <button className="gallery-nav next" onClick={nextImage}>
                        ›
                      </button>
                    </>
                  )}
                </div>

                {selectedVehicle.images.length > 1 && (
                  <div className="gallery-thumbnails">
                    {selectedVehicle.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedVehicle.name} ${index + 1}`}
                        className={`thumbnail ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-details">
                <div className="modal-header">
                  <h2 className="modal-title">{selectedVehicle.name}</h2>
                  <div className="modal-rating">
                    <Star size={20} className="star-filled" />
                    <span>{selectedVehicle.rating}</span>
                    <span className="review-count">
                      ({selectedVehicle.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="modal-meta">
                  <div className="meta-item">
                    <span className="meta-label">Year:</span>
                    <span className="meta-value">{selectedVehicle.year}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Color:</span>
                    <span className="meta-value">{selectedVehicle.color}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Capacity:</span>
                    <span className="meta-value">
                      {selectedVehicle.seats} passengers
                    </span>
                  </div>
                </div>

                <div className="modal-description">
                  <p>{selectedVehicle.description}</p>
                </div>

                <div className="modal-specs">
                  <h4>Specifications</h4>
                  <div className="specs-grid">
                    <div className="spec-item">
                      <span className="spec-label">Engine:</span>
                      <span className="spec-value">
                        {selectedVehicle.specs.engine}
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Transmission:</span>
                      <span className="spec-value">
                        {selectedVehicle.specs.transmission}
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Fuel:</span>
                      <span className="spec-value">
                        {selectedVehicle.specs.fuelType}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="modal-features">
                  <h4>Features & Amenities</h4>
                  <div className="features-grid">
                    {selectedVehicle.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <div className="feature-icon">✓</div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-pricing">
                  <div className="pricing-grid">
                    <div className="pricing-item">
                      <span className="pricing-label">Per Kilometer</span>
                      <span className="pricing-value">
                        ${selectedVehicle.pricePerKm}
                      </span>
                    </div>
                    <div className="pricing-item">
                      <span className="pricing-label">Per Hour</span>
                      <span className="pricing-value">
                        ${selectedVehicle.pricePerHour}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <Link
                    to={`/book?vehicle=${selectedVehicle.id}`}
                    className="btn btn-primary btn-lg"
                  >
                    Book This Vehicle
                  </Link>
                  <Link to="/pricing" className="btn btn-outline btn-lg">
                    Get Price Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetPage;
