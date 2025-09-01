import React, { useState, useEffect } from "react";
import {
  ChefHat,
  ArrowLeft,
  Filter,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Heart,
  Share2,
  Download,
  Eye,
  Calendar,
  MapPin,
  Users,
  Utensils,
  Star,
  Play,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import "./GalleryPage.css";

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: "all", label: "All Photos", count: 48 },
    { id: "food", label: "Food & Dishes", count: 18 },
    { id: "interior", label: "Restaurant Interior", count: 12 },
    { id: "kitchen", label: "Kitchen & Chefs", count: 8 },
    { id: "events", label: "Events & Celebrations", count: 6 },
    { id: "team", label: "Our Team", count: 4 },
  ];

  const galleryImages = [
    // Food & Dishes
    {
      id: 1,
      category: "food",
      title: "Signature Margherita Pizza",
      description:
        "Our classic Margherita with San Marzano tomatoes, fresh mozzarella, and basil",
      image: "margherita-hero",
      tags: ["pizza", "signature", "classic"],
      date: "2024-01-15",
      photographer: "Marco Rossi",
      likes: 127,
      featured: true,
    },
    {
      id: 2,
      category: "food",
      title: "Homemade Spaghetti Carbonara",
      description:
        "Traditional Roman carbonara with guanciale, eggs, and pecorino romano",
      image: "carbonara-detail",
      tags: ["pasta", "traditional", "roman"],
      date: "2024-01-12",
      photographer: "Sofia Martinez",
      likes: 89,
    },
    {
      id: 3,
      category: "food",
      title: "Fresh Seafood Risotto",
      description:
        "Creamy arborio rice with fresh shrimp, scallops, and mussels",
      image: "seafood-risotto-plated",
      tags: ["risotto", "seafood", "premium"],
      date: "2024-01-10",
      photographer: "Giuseppe Romano",
      likes: 156,
    },
    {
      id: 4,
      category: "food",
      title: "Artisanal Tiramisu",
      description:
        "House-made tiramisu with mascarpone and coffee-soaked ladyfingers",
      image: "tiramisu-elegant",
      tags: ["dessert", "signature", "coffee"],
      date: "2024-01-08",
      photographer: "Sofia Martinez",
      likes: 203,
    },
    {
      id: 5,
      category: "food",
      title: "Antipasto Platter",
      description:
        "Selection of Italian cured meats, cheeses, and marinated vegetables",
      image: "antipasto-spread",
      tags: ["appetizer", "sharing", "charcuterie"],
      date: "2024-01-05",
      photographer: "Marco Rossi",
      likes: 98,
    },
    {
      id: 6,
      category: "food",
      title: "Wood-Fired Pizza Oven",
      description:
        "Our traditional wood-fired oven reaching perfect temperatures",
      image: "pizza-oven-action",
      tags: ["oven", "traditional", "fire"],
      date: "2024-01-03",
      photographer: "Elena Rodriguez",
      likes: 142,
    },

    // Interior
    {
      id: 7,
      category: "interior",
      title: "Main Dining Room",
      description: "Warm and inviting dining space with rustic Italian decor",
      image: "dining-room-ambiance",
      tags: ["dining", "atmosphere", "romantic"],
      date: "2024-01-20",
      photographer: "Professional Photography",
      likes: 234,
      featured: true,
    },
    {
      id: 8,
      category: "interior",
      title: "Wine Display",
      description: "Our curated selection of Italian wines",
      image: "wine-wall",
      tags: ["wine", "selection", "italian"],
      date: "2024-01-18",
      photographer: "Elena Rodriguez",
      likes: 87,
    },
    {
      id: 9,
      category: "interior",
      title: "Cozy Corner Booth",
      description: "Intimate seating perfect for romantic dinners",
      image: "corner-booth",
      tags: ["seating", "intimate", "romantic"],
      date: "2024-01-16",
      photographer: "Sofia Martinez",
      likes: 156,
    },
    {
      id: 10,
      category: "interior",
      title: "Bar Area",
      description: "Elegant bar with Italian marble and vintage fixtures",
      image: "bar-elegant",
      tags: ["bar", "marble", "elegant"],
      date: "2024-01-14",
      photographer: "Professional Photography",
      likes: 178,
    },
    {
      id: 11,
      category: "interior",
      title: "Private Dining Room",
      description: "Exclusive space for special occasions and private events",
      image: "private-dining",
      tags: ["private", "events", "exclusive"],
      date: "2024-01-11",
      photographer: "Elena Rodriguez",
      likes: 203,
    },

    // Kitchen & Chefs
    {
      id: 12,
      category: "kitchen",
      title: "Chef Marco at Work",
      description: "Head Chef Marco Rossi preparing fresh pasta",
      image: "chef-marco-action",
      tags: ["chef", "pasta", "artisan"],
      date: "2024-01-22",
      photographer: "Giuseppe Romano",
      likes: 312,
      featured: true,
    },
    {
      id: 13,
      category: "kitchen",
      title: "Pasta Making Process",
      description:
        "Fresh pasta being made by hand using traditional techniques",
      image: "pasta-making",
      tags: ["pasta", "handmade", "traditional"],
      date: "2024-01-19",
      photographer: "Sofia Martinez",
      likes: 187,
    },
    {
      id: 14,
      category: "kitchen",
      title: "Kitchen Brigade",
      description: "Our talented kitchen team working in perfect harmony",
      image: "kitchen-team",
      tags: ["team", "professional", "brigade"],
      date: "2024-01-17",
      photographer: "Professional Photography",
      likes: 267,
    },
    {
      id: 15,
      category: "kitchen",
      title: "Sauce Preparation",
      description: "Authentic marinara sauce simmering to perfection",
      image: "sauce-cooking",
      tags: ["sauce", "marinara", "authentic"],
      date: "2024-01-13",
      photographer: "Marco Rossi",
      likes: 145,
    },

    // Events
    {
      id: 16,
      category: "events",
      title: "Anniversary Celebration",
      description: "A beautiful 50th anniversary dinner celebration",
      image: "anniversary-table",
      tags: ["anniversary", "celebration", "special"],
      date: "2024-01-25",
      photographer: "Elena Rodriguez",
      likes: 289,
    },
    {
      id: 17,
      category: "events",
      title: "Wine Tasting Evening",
      description: "Monthly wine tasting with Italian wine expert",
      image: "wine-tasting",
      tags: ["wine", "tasting", "education"],
      date: "2024-01-21",
      photographer: "Sofia Martinez",
      likes: 156,
    },
    {
      id: 18,
      category: "events",
      title: "Corporate Event",
      description: "Private corporate dinner in our banquet room",
      image: "corporate-event",
      tags: ["corporate", "private", "business"],
      date: "2024-01-09",
      photographer: "Professional Photography",
      likes: 98,
    },
    {
      id: 19,
      category: "events",
      title: "Cooking Class",
      description: "Interactive pasta making class with Chef Marco",
      image: "cooking-class",
      tags: ["cooking", "class", "interactive"],
      date: "2024-01-07",
      photographer: "Giuseppe Romano",
      likes: 234,
    },

    // Team
    {
      id: 20,
      category: "team",
      title: "The Rossi Family",
      description:
        "Three generations of the Rossi family who founded Bella Vista",
      image: "rossi-family",
      tags: ["family", "founders", "heritage"],
      date: "2024-01-01",
      photographer: "Professional Photography",
      likes: 456,
      featured: true,
    },
    {
      id: 21,
      category: "team",
      title: "Service Team",
      description: "Our professional waitstaff ready to serve you",
      image: "service-team",
      tags: ["service", "professional", "hospitality"],
      date: "2023-12-28",
      photographer: "Elena Rodriguez",
      likes: 178,
    },
    {
      id: 22,
      category: "team",
      title: "Pastry Chef Sofia",
      description: "Sofia crafting one of her signature desserts",
      image: "sofia-pastry",
      tags: ["pastry", "chef", "dessert"],
      date: "2023-12-25",
      photographer: "Marco Rossi",
      likes: 203,
    },
  ];

  const filteredImages = galleryImages.filter((image) => {
    const matchesCategory =
      activeCategory === "all" || image.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const featuredImages = galleryImages.filter((image) => image.featured);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex =
        currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    }

    setSelectedImage(filteredImages[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  const toggleFavorite = (imageId) => {
    setFavorites((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  const shareImage = (image) => {
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: image.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage) {
        if (e.key === "Escape") {
          closeLightbox();
        } else if (e.key === "ArrowLeft") {
          navigateImage("prev");
        } else if (e.key === "ArrowRight") {
          navigateImage("next");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="gallery-page">
      {/* Header */}
      <header className="restaurant-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <ChefHat size={28} />
              <span>Bella Vista</span>
            </div>
            <nav className="main-nav">
              <a href="#" className="nav-link">
                <ArrowLeft size={16} />
                Back to Home
              </a>
              <a href="#menu">Menu</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="header-actions">
              <button className="share-gallery">
                <Share2 size={16} />
                Share Gallery
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
          <div className="hero-image"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1>Gallery</h1>
            <p>
              Discover the story behind Bella Vista through our collection of
              moments, flavors, and memories
            </p>

            <div className="gallery-stats">
              <div className="stat">
                <span className="stat-number">{galleryImages.length}+</span>
                <span className="stat-label">Photos</span>
              </div>
              <div className="stat">
                <span className="stat-number">{categories.length - 1}</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat">
                <span className="stat-number">38+</span>
                <span className="stat-label">Years Captured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="featured-gallery">
        <div className="container">
          <div className="section-header">
            <h2>Featured Highlights</h2>
            <p>Our most memorable moments and signature creations</p>
          </div>

          <div className="featured-grid">
            {featuredImages.map((image, index) => (
              <div
                key={image.id}
                className="featured-card"
                onClick={() => openLightbox(image, index)}
              >
                <div className="featured-image">
                  <div className={`gallery-image ${image.image}`}>
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <Eye size={32} />
                        <span>View Photo</span>
                      </div>
                    </div>
                  </div>
                  <div className="featured-badge">Featured</div>
                </div>
                <div className="featured-info">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                  <div className="featured-meta">
                    <span className="category">
                      {categories.find((c) => c.id === image.category)?.label}
                    </span>
                    <div className="likes">
                      <Heart size={14} />
                      <span>{image.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gallery */}
      <section className="main-gallery">
        <div className="container">
          {/* Gallery Controls */}
          <div className="gallery-controls">
            <div className="search-filter">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{category.label}</span>
                  <span className="category-count">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-results">
            <div className="results-header">
              <h3>
                {activeCategory === "all"
                  ? "All Photos"
                  : categories.find((c) => c.id === activeCategory)?.label}
              </h3>
              <span className="results-count">
                Showing {filteredImages.length} of {galleryImages.length} photos
              </span>
            </div>

            <div className="gallery-grid">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="gallery-card"
                  onClick={() => openLightbox(image, index)}
                >
                  <div className="card-image">
                    <div className={`gallery-image ${image.image}`}>
                      <div className="image-overlay">
                        <div className="overlay-actions">
                          <button
                            className="action-btn favorite"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(image.id);
                            }}
                          >
                            <Heart
                              size={16}
                              fill={
                                favorites.includes(image.id)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                          <button
                            className="action-btn share"
                            onClick={(e) => {
                              e.stopPropagation();
                              shareImage(image);
                            }}
                          >
                            <Share2 size={16} />
                          </button>
                        </div>
                        <div className="overlay-info">
                          <Eye size={20} />
                          <span>View</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-info">
                    <h4>{image.title}</h4>
                    <p>{image.description}</p>
                    <div className="card-meta">
                      <span className="photographer">
                        📸 {image.photographer}
                      </span>
                      <div className="likes">
                        <Heart size={12} />
                        <span>{image.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="no-results">
                <Camera size={48} />
                <h4>No photos found</h4>
                <p>
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
                <button
                  className="clear-filters"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Gallery */}
      <section className="social-gallery">
        <div className="container">
          <div className="section-header">
            <h2>Share Your Experience</h2>
            <p>Tag us in your photos and become part of our story</p>
          </div>

          <div className="social-content">
            <div className="social-info">
              <div className="social-platforms">
                <a href="#" className="platform-link instagram">
                  <Instagram size={24} />
                  <div>
                    <span>@bellavista_nyc</span>
                    <small>Follow us on Instagram</small>
                  </div>
                </a>

                <a href="#" className="platform-link facebook">
                  <Facebook size={24} />
                  <div>
                    <span>Bella Vista Restaurant</span>
                    <small>Like our Facebook page</small>
                  </div>
                </a>

                <a href="#" className="platform-link twitter">
                  <Twitter size={24} />
                  <div>
                    <span>@bellavista_nyc</span>
                    <small>Follow us on Twitter</small>
                  </div>
                </a>
              </div>

              <div className="hashtag-info">
                <h4>Use our hashtags:</h4>
                <div className="hashtags">
                  <span>#BellaVistaExperience</span>
                  <span>#AuthenticItalian</span>
                  <span>#FamilyTradition</span>
                </div>
              </div>
            </div>

            <div className="upload-prompt">
              <Camera size={32} />
              <h4>Share Your Photos</h4>
              <p>
                We love seeing your Bella Vista moments! Tag us and use our
                hashtags to be featured.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>

            <button
              className="lightbox-nav prev"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft size={32} />
            </button>

            <button
              className="lightbox-nav next"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight size={32} />
            </button>

            <div className="lightbox-image">
              <div className={`gallery-image ${selectedImage.image}`}></div>
            </div>

            <div className="lightbox-info">
              <div className="lightbox-header">
                <h3>{selectedImage.title}</h3>
                <div className="lightbox-actions">
                  <button
                    className="lightbox-action"
                    onClick={() => toggleFavorite(selectedImage.id)}
                  >
                    <Heart
                      size={20}
                      fill={
                        favorites.includes(selectedImage.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                  <button
                    className="lightbox-action"
                    onClick={() => shareImage(selectedImage)}
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <p className="lightbox-description">
                {selectedImage.description}
              </p>

              <div className="lightbox-meta">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{formatDate(selectedImage.date)}</span>
                </div>
                <div className="meta-item">
                  <Camera size={16} />
                  <span>{selectedImage.photographer}</span>
                </div>
                <div className="meta-item">
                  <Heart size={16} />
                  <span>{selectedImage.likes} likes</span>
                </div>
              </div>

              <div className="lightbox-tags">
                {selectedImage.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
