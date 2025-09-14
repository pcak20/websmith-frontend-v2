import React, { useState, useEffect } from "react";
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
  Palette,
  ChevronDown,
  X,
} from "lucide-react";
import styles from "./HomePage.module.css";

const HomePage = ({
  themes = {},
  defaultTheme = "default",
  restaurantData = {},
  menuData = {},
  showThemeSelector = true,
}) => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("featured");
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  // Default fallback theme if no themes provided
  const defaultThemes = {
    default: {
      name: "Default",
      description: "Default restaurant colors",
      primary: "#d97706",
      secondary: "#f59e0b",
      accent: "#fbbf24",
      highlight: "#dc2626",
    },
  };

  // Use provided themes or fallback to default
  const availableThemes =
    Object.keys(themes).length > 0 ? themes : defaultThemes;

  // Apply theme to CSS custom properties
  const applyTheme = (themeName) => {
    const theme = availableThemes[themeName];
    if (theme) {
      document.documentElement.style.setProperty(
        "--primary-color",
        theme.primary
      );
      document.documentElement.style.setProperty(
        "--secondary-color",
        theme.secondary
      );
      document.documentElement.style.setProperty(
        "--accent-color",
        theme.accent
      );
      document.documentElement.style.setProperty(
        "--highlight-color",
        theme.highlight
      );
      setCurrentTheme(themeName);
      setShowThemeDropdown(false);
    }
  };

  // Initialize theme on component mount or when themes/defaultTheme props change
  useEffect(() => {
    const themeToApply = availableThemes[defaultTheme]
      ? defaultTheme
      : Object.keys(availableThemes)[0];
    if (themeToApply) {
      applyTheme(themeToApply);
    }
  }, [themes, defaultTheme]);

  // Default restaurant info with ability to override via props
  const defaultRestaurantInfo = {
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

  const restaurantInfo = { ...defaultRestaurantInfo, ...restaurantData };

  // Default menu data with ability to override via props
  const defaultFeaturedDishes = [
    {
      id: 1,
      name: "Margherita Pizza",
      description:
        "Fresh mozzarella, tomato sauce, basil, extra virgin olive oil",
      price: 18.99,
      originalPrice: 22.99,
      image: "margheritaPizza",
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
      image: "chickenAlfredo",
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
      image: "caesarSalad",
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
      image: "seafoodRisotto",
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

  const defaultCategories = [
    { id: "featured", name: "Featured", icon: <Star size={20} /> },
    { id: "pizza", name: "Pizza", icon: <Utensils size={20} /> },
    { id: "pasta", name: "Pasta", icon: <ChefHat size={20} /> },
    { id: "mains", name: "Main Courses", icon: <Utensils size={20} /> },
    { id: "appetizers", name: "Appetizers", icon: <Utensils size={20} /> },
    { id: "desserts", name: "Desserts", icon: <Heart size={20} /> },
  ];

  const featuredDishes = menuData.dishes || defaultFeaturedDishes;
  const categories = menuData.categories || defaultCategories;

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
    <div className={styles.restaurantHomepage}>
      {/* Header */}
      <header className={styles.restaurantHeader}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <ChefHat size={28} />
              <span>{restaurantInfo.name}</span>
            </div>
            <nav className={styles.mainNav}>
              <a href="#menu">Menu</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#reviews">Reviews</a>
            </nav>
            <div className={styles.headerActions}>
              {/* Theme Selector - Only show if enabled and multiple themes available */}
              {showThemeSelector && Object.keys(availableThemes).length > 1 && (
                <div className={styles.themeSelector}>
                  <button
                    className={styles.themeButton}
                    onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                  >
                    <Palette size={20} />
                    <ChevronDown size={16} />
                  </button>

                  {showThemeDropdown && (
                    <div className={styles.themeDropdown}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "16px",
                        }}
                      >
                        <h3>Choose Theme</h3>
                        <button
                          onClick={() => setShowThemeDropdown(false)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#6b7280",
                          }}
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className={styles.themeGrid}>
                        {Object.entries(availableThemes).map(([key, theme]) => (
                          <div
                            key={key}
                            className={`${styles.themeCard} ${
                              currentTheme === key ? styles.active : ""
                            }`}
                            onClick={() => applyTheme(key)}
                          >
                            <div className={styles.themeColors}>
                              <div
                                className={styles.themeColor}
                                style={{ backgroundColor: theme.primary }}
                              ></div>
                              <div
                                className={styles.themeColor}
                                style={{ backgroundColor: theme.secondary }}
                              ></div>
                              <div
                                className={styles.themeColor}
                                style={{ backgroundColor: theme.accent }}
                              ></div>
                            </div>
                            <div className={styles.themeInfo}>
                              <h4>{theme.name}</h4>
                              <p>{theme.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button className={styles.cartBtn}>
                <ShoppingCart size={20} />
                <span className={styles.cartCount}>{getTotalItems()}</span>
                <span className={styles.cartTotal}>
                  ${getTotalPrice().toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroImage}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>{restaurantInfo.name}</h1>
              <p className={styles.tagline}>{restaurantInfo.tagline}</p>
              <p className={styles.description}>{restaurantInfo.description}</p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <Star size={20} fill="currentColor" />
                  <span>{restaurantInfo.rating}</span>
                  <span className={styles.reviews}>
                    ({restaurantInfo.reviews} reviews)
                  </span>
                </div>
                <div className={styles.stat}>
                  <Clock size={20} />
                  <span>{restaurantInfo.deliveryTime}</span>
                </div>
                <div className={styles.stat}>
                  <Truck size={20} />
                  <span>${restaurantInfo.deliveryFee} delivery</span>
                </div>
              </div>

              <div className={styles.heroActions}>
                <button className={`${styles.btnPrimary} ${styles.orderNow}`}>
                  <Utensils size={20} />
                  Order Now
                </button>
                <button className={styles.btnSecondary}>
                  <Eye size={20} />
                  View Menu
                </button>
              </div>
            </div>

            <div className={styles.heroInfo}>
              <div className={styles.infoCard}>
                <div className={styles.deliveryOptions}>
                  <div className={`${styles.option} ${styles.active}`}>
                    <Truck size={20} />
                    <div>
                      <span>Delivery</span>
                      <small>{restaurantInfo.deliveryTime}</small>
                    </div>
                  </div>
                  <div className={styles.option}>
                    <Store size={20} />
                    <div>
                      <span>Pickup</span>
                      <small>15-20 mins</small>
                    </div>
                  </div>
                </div>

                <div className={styles.restaurantDetails}>
                  <div className={styles.detail}>
                    <MapPin size={16} />
                    <span>{restaurantInfo.address}</span>
                  </div>
                  <div className={styles.detail}>
                    <Clock size={16} />
                    <span>{restaurantInfo.hours}</span>
                  </div>
                  <div className={styles.detail}>
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
      <section className={styles.menuCategories}>
        <div className={styles.container}>
          <div className={styles.categoriesScroll}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryBtn} ${
                  selectedCategory === category.id ? styles.active : ""
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
      <section id="menu" className={styles.featuredDishes}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>
              {selectedCategory === "featured"
                ? "Featured Dishes"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p>Handpicked favorites from our kitchen</p>
          </div>

          <div className={styles.dishesGrid}>
            {filteredDishes.map((dish) => (
              <div key={dish.id} className={styles.dishCard}>
                {dish.isPopular && (
                  <div className={`${styles.badge} ${styles.popular}`}>
                    Popular
                  </div>
                )}
                {dish.isNew && (
                  <div className={`${styles.badge} ${styles.new}`}>New</div>
                )}
                {dish.originalPrice && (
                  <div className={`${styles.badge} ${styles.sale}`}>Sale</div>
                )}

                <div className={styles.dishImage}>
                  <div
                    className={`${styles.foodImage} ${styles[dish.image]}`}
                  ></div>
                  <button
                    className={`${styles.favoriteBtn} ${
                      favorites.includes(dish.id) ? styles.active : ""
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

                <div className={styles.dishInfo}>
                  <div className={styles.dishHeader}>
                    <h3>{dish.name}</h3>
                    <div className={styles.dishRating}>
                      <Star size={14} fill="currentColor" />
                      <span>{dish.rating}</span>
                      <span className={styles.reviewCount}>
                        ({dish.reviews})
                      </span>
                    </div>
                  </div>

                  <p className={styles.dishDescription}>{dish.description}</p>

                  <div className={styles.dishMeta}>
                    <div className={styles.prepTime}>
                      <Clock size={14} />
                      <span>{dish.prepTime}</span>
                    </div>
                  </div>

                  <div className={styles.dishFooter}>
                    <div className={styles.priceSection}>
                      <span className={styles.price}>${dish.price}</span>
                      {dish.originalPrice && (
                        <span className={styles.originalPrice}>
                          ${dish.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className={styles.quantityControls}>
                      {getItemQuantity(dish.id) > 0 ? (
                        <div className={styles.quantitySelector}>
                          <button
                            className={styles.quantityBtn}
                            onClick={() => updateQuantity(dish.id, -1)}
                          >
                            <Minus size={16} />
                          </button>
                          <span className={styles.quantity}>
                            {getItemQuantity(dish.id)}
                          </span>
                          <button
                            className={styles.quantityBtn}
                            onClick={() => updateQuantity(dish.id, 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className={styles.addBtn}
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

          <div className={styles.viewAll}>
            <button className={styles.btnSecondary}>View Full Menu</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
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

              <div className={styles.aboutStats}>
                <div className={styles.aboutStat}>
                  <Award size={24} />
                  <div>
                    <span>Award Winner</span>
                    <small>Best Italian Restaurant 2023</small>
                  </div>
                </div>
                <div className={styles.aboutStat}>
                  <Users size={24} />
                  <div>
                    <span>Happy Customers</span>
                    <small>Over 50,000 served</small>
                  </div>
                </div>
                <div className={styles.aboutStat}>
                  <ChefHat size={24} />
                  <div>
                    <span>Expert Chefs</span>
                    <small>Trained in Italy</small>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.aboutImage}>
              <div className={styles.chefImage}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.restaurantFooter}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <div className={styles.footerLogo}>
                <ChefHat size={28} />
                <span>{restaurantInfo.name}</span>
              </div>
              <p>Authentic Italian cuisine made with love and tradition.</p>
              <div className={styles.socialLinks}>
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

            <div className={styles.footerSection}>
              <h4>Contact Info</h4>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <MapPin size={16} />
                  <span>{restaurantInfo.address}</span>
                </div>
                <div className={styles.contactItem}>
                  <Phone size={16} />
                  <span>{restaurantInfo.phone}</span>
                </div>
                <div className={styles.contactItem}>
                  <Clock size={16} />
                  <span>{restaurantInfo.hours}</span>
                </div>
              </div>
            </div>

            <div className={styles.footerSection}>
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

            <div className={styles.footerSection}>
              <h4>Order Online</h4>
              <p>Get your favorite dishes delivered to your door.</p>
              <button className={styles.footerOrderBtn}>
                <Truck size={16} />
                Start Order
              </button>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; 2025 {restaurantInfo.name}. All rights reserved.</p>
            <div className={styles.footerLinks}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Cart */}
      {getTotalItems() > 0 && (
        <div className={styles.floatingCart}>
          <div className={styles.cartSummary}>
            <div className={styles.cartInfo}>
              <span>{getTotalItems()} items</span>
              <span className={styles.total}>
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <button className={styles.checkoutBtn}>
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
