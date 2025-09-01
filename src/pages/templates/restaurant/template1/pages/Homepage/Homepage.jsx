import React, { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Clock,
  MapPin,
  Phone,
  Truck,
  Store,
  Heart,
  Eye,
  Award,
  Users,
  ChefHat,
  Utensils,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("featured");

  // Mock data - users can customize this
  const restaurantInfo = {
    name: "Bella Vista",
    tagline: "Authentic Italian Cuisine",
    description:
      "Experience the finest Italian flavors with our traditional recipes passed down through generations.",
    phone: "(555) 123-4567",
    address: "123 Main Street, Downtown",
    hours: "Mon-Sun: 11:00 AM - 10:00 PM",
    deliveryTime: "30-45 mins",
    minimumOrder: 25,
    deliveryFee: 3.99,
    rating: 4.8,
    reviews: 1247,
  };

  const featuredDishes = [
    {
      id: 1,
      name: "Margherita Pizza",
      description:
        "Fresh mozzarella, tomato sauce, basil, extra virgin olive oil",
      price: 18.99,
      originalPrice: 22.99,
      image: "margherita-pizza",
      category: "pizza",
      rating: 4.9,
      reviews: 156,
      isPopular: true,
      prepTime: "15-20 mins",
    },
    {
      id: 2,
      name: "Chicken Alfredo",
      description:
        "Grilled chicken breast with creamy alfredo sauce over fettuccine",
      price: 24.99,
      image: "chicken-alfredo",
      category: "pasta",
      rating: 4.7,
      reviews: 89,
      isNew: true,
      prepTime: "20-25 mins",
    },
    {
      id: 3,
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce, parmesan cheese, croutons, caesar dressing",
      price: 14.99,
      image: "caesar-salad",
      category: "salads",
      rating: 4.6,
      reviews: 67,
      prepTime: "10-15 mins",
    },
    {
      id: 4,
      name: "Tiramisu",
      description:
        "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      price: 8.99,
      image: "tiramisu",
      category: "desserts",
      rating: 4.8,
      reviews: 124,
      isPopular: true,
      prepTime: "5 mins",
    },
    {
      id: 5,
      name: "Seafood Risotto",
      description:
        "Creamy arborio rice with fresh shrimp, scallops, and mussels",
      price: 28.99,
      image: "seafood-risotto",
      category: "mains",
      rating: 4.9,
      reviews: 93,
      prepTime: "25-30 mins",
    },
    {
      id: 6,
      name: "Bruschetta",
      description:
        "Toasted bread topped with fresh tomatoes, garlic, and basil",
      price: 9.99,
      image: "bruschetta",
      category: "appetizers",
      rating: 4.5,
      reviews: 45,
      prepTime: "10 mins",
    },
  ];

  const categories = [
    { id: "featured", name: "Featured", icon: <Star size={20} /> },
    { id: "pizza", name: "Pizza", icon: <Utensils size={20} /> },
    { id: "pasta", name: "Pasta", icon: <ChefHat size={20} /> },
    { id: "mains", name: "Main Courses", icon: <Utensils size={20} /> },
    { id: "appetizers", name: "Appetizers", icon: <Utensils size={20} /> },
    { id: "desserts", name: "Desserts", icon: <Heart size={20} /> },
  ];

  const addToCart = (dish) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === dish.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const updateQuantity = (dishId, change) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === dishId) {
            const newQuantity = item.quantity + change;
            return newQuantity <= 0 ? null : { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const toggleFavorite = (dishId) => {
    setFavorites((prev) =>
      prev.includes(dishId)
        ? prev.filter((id) => id !== dishId)
        : [...prev, dishId]
    );
  };

  const getItemQuantity = (dishId) => {
    const item = cartItems.find((item) => item.id === dishId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const filteredDishes =
    selectedCategory === "featured"
      ? featuredDishes
      : featuredDishes.filter((dish) => dish.category === selectedCategory);

  return (
    <div className="restaurant-homepage">
      {/* Header */}
      <header className="restaurant-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <ChefHat size={28} />
              <span>{restaurantInfo.name}</span>
            </div>
            <nav className="main-nav">
              <Link to="./menu">Menu</Link>
              <Link to="./about">About</Link>
              <Link to="./contact">Contact</Link>
              <Link to="./reviews">Reviews</Link>
            </nav>
            <div className="header-actions">
              <button className="cart-btn">
                <ShoppingCart size={20} />
                <span className="cart-count">{getTotalItems()}</span>
                <span className="cart-total">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
          <div className="hero-image"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>{restaurantInfo.name}</h1>
              <p className="tagline">{restaurantInfo.tagline}</p>
              <p className="description">{restaurantInfo.description}</p>

              <div className="hero-stats">
                <div className="stat">
                  <Star size={20} fill="currentColor" />
                  <span>{restaurantInfo.rating}</span>
                  <span className="reviews">
                    ({restaurantInfo.reviews} reviews)
                  </span>
                </div>
                <div className="stat">
                  <Clock size={20} />
                  <span>{restaurantInfo.deliveryTime}</span>
                </div>
                <div className="stat">
                  <Truck size={20} />
                  <span>$3.99 delivery</span>
                </div>
              </div>

              <div className="hero-actions">
                <button className="btn-primary order-now">
                  <Utensils size={20} />
                  Order Now
                </button>
                <button className="btn-secondary">
                  <Eye size={20} />
                  View Menu
                </button>
              </div>
            </div>

            <div className="hero-info">
              <div className="info-card">
                <div className="delivery-options">
                  <div className="option active">
                    <Truck size={20} />
                    <div>
                      <span>Delivery</span>
                      <small>{restaurantInfo.deliveryTime}</small>
                    </div>
                  </div>
                  <div className="option">
                    <Store size={20} />
                    <div>
                      <span>Pickup</span>
                      <small>15-20 mins</small>
                    </div>
                  </div>
                </div>

                <div className="restaurant-details">
                  <div className="detail">
                    <MapPin size={16} />
                    <span>{restaurantInfo.address}</span>
                  </div>
                  <div className="detail">
                    <Clock size={16} />
                    <span>{restaurantInfo.hours}</span>
                  </div>
                  <div className="detail">
                    <Phone size={16} />
                    <span>{restaurantInfo.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="menu-categories">
        <div className="container">
          <div className="categories-scroll">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section id="menu" className="featured-dishes">
        <div className="container">
          <div className="section-header">
            <h2>
              {selectedCategory === "featured"
                ? "Featured Dishes"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p>Handpicked favorites from our kitchen</p>
          </div>

          <div className="dishes-grid">
            {filteredDishes.map((dish) => (
              <div key={dish.id} className="dish-card">
                {dish.isPopular && <div className="badge popular">Popular</div>}
                {dish.isNew && <div className="badge new">New</div>}
                {dish.originalPrice && <div className="badge sale">Sale</div>}

                <div className="dish-image">
                  <div className={`food-image ${dish.image}`}></div>
                  <button
                    className={`favorite-btn ${
                      favorites.includes(dish.id) ? "active" : ""
                    }`}
                    onClick={() => toggleFavorite(dish.id)}
                  >
                    <Heart
                      size={20}
                      fill={
                        favorites.includes(dish.id) ? "currentColor" : "none"
                      }
                    />
                  </button>
                </div>

                <div className="dish-info">
                  <div className="dish-header">
                    <h3>{dish.name}</h3>
                    <div className="dish-rating">
                      <Star size={14} fill="currentColor" />
                      <span>{dish.rating}</span>
                      <span className="review-count">({dish.reviews})</span>
                    </div>
                  </div>

                  <p className="dish-description">{dish.description}</p>

                  <div className="dish-meta">
                    <div className="prep-time">
                      <Clock size={14} />
                      <span>{dish.prepTime}</span>
                    </div>
                  </div>

                  <div className="dish-footer">
                    <div className="price-section">
                      <span className="price">${dish.price}</span>
                      {dish.originalPrice && (
                        <span className="original-price">
                          ${dish.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="quantity-controls">
                      {getItemQuantity(dish.id) > 0 ? (
                        <div className="quantity-selector">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(dish.id, -1)}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="quantity">
                            {getItemQuantity(dish.id)}
                          </span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(dish.id, 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="add-btn"
                          onClick={() => addToCart(dish)}
                        >
                          <Plus size={16} />
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all">
            <button className="btn-secondary">View Full Menu</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 1985 by the Rossi family, {restaurantInfo.name} has
                been serving authentic Italian cuisine for over three decades.
                Our recipes are passed down through generations, ensuring every
                dish carries the true taste of Italy.
              </p>
              <p>
                We source only the finest ingredients, from San Marzano tomatoes
                to fresh mozzarella di bufala, creating dishes that transport
                you straight to the heart of Italy.
              </p>

              <div className="about-stats">
                <div className="about-stat">
                  <Award size={24} />
                  <div>
                    <span>Award Winner</span>
                    <small>Best Italian Restaurant 2023</small>
                  </div>
                </div>
                <div className="about-stat">
                  <Users size={24} />
                  <div>
                    <span>Happy Customers</span>
                    <small>Over 50,000 served</small>
                  </div>
                </div>
                <div className="about-stat">
                  <ChefHat size={24} />
                  <div>
                    <span>Expert Chefs</span>
                    <small>Trained in Italy</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-image">
              <div className="chef-image"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="restaurant-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <ChefHat size={28} />
                <span>{restaurantInfo.name}</span>
              </div>
              <p>Authentic Italian cuisine made with love and tradition.</p>
              <div className="social-links">
                <a href="#" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>{restaurantInfo.address}</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <span>{restaurantInfo.phone}</span>
                </div>
                <div className="contact-item">
                  <Clock size={16} />
                  <span>{restaurantInfo.hours}</span>
                </div>
              </div>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#menu">Menu</a>
                </li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#reservations">Reservations</a>
                </li>
                <li>
                  <a href="#catering">Catering</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Order Online</h4>
              <p>Get your favorite dishes delivered to your door.</p>
              <button className="footer-order-btn">
                <Truck size={16} />
                Start Order
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 {restaurantInfo.name}. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Cart */}
      {getTotalItems() > 0 && (
        <div className="floating-cart">
          <div className="cart-summary">
            <div className="cart-info">
              <span>{getTotalItems()} items</span>
              <span className="total">${getTotalPrice().toFixed(2)}</span>
            </div>
            <button className="checkout-btn">
              <ShoppingCart size={16} />
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
