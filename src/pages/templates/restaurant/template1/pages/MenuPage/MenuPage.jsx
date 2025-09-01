import React, { useState, useMemo } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Clock,
  Search,
  Filter,
  Heart,
  ChefHat,
  Utensils,
  Leaf,
  Flame,
  ArrowLeft,
  Eye,
  Award,
} from "lucide-react";
import "./MenuPage.css";
import { Link, useNavigate } from "react-router-dom";

const MenuPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [dietaryFilters, setDietaryFilters] = useState([]);
  const [sortBy, setSortBy] = useState("popular");

  const restaurantInfo = {
    name: "Bella Vista",
    tagline: "Authentic Italian Cuisine",
  };

  const menuItems = [
    // Pizza Category
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
      isNew: false,
      prepTime: "15-20 mins",
      dietary: ["vegetarian"],
      spicyLevel: 0,
      ingredients: ["Mozzarella", "Tomato Sauce", "Fresh Basil", "Olive Oil"],
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Classic pepperoni with mozzarella and tomato sauce",
      price: 21.99,
      image: "pepperoni-pizza",
      category: "pizza",
      rating: 4.8,
      reviews: 134,
      isPopular: true,
      prepTime: "15-20 mins",
      dietary: [],
      spicyLevel: 1,
      ingredients: ["Pepperoni", "Mozzarella", "Tomato Sauce"],
    },
    {
      id: 3,
      name: "Quattro Formaggi",
      description:
        "Four cheese pizza: mozzarella, gorgonzola, parmesan, ricotta",
      price: 24.99,
      image: "quattro-formaggi",
      category: "pizza",
      rating: 4.7,
      reviews: 98,
      prepTime: "15-20 mins",
      dietary: ["vegetarian"],
      spicyLevel: 0,
      ingredients: ["Mozzarella", "Gorgonzola", "Parmesan", "Ricotta"],
    },
    {
      id: 4,
      name: "Diavola Pizza",
      description: "Spicy salami, chili peppers, mozzarella, tomato sauce",
      price: 23.99,
      image: "diavola-pizza",
      category: "pizza",
      rating: 4.6,
      reviews: 87,
      prepTime: "15-20 mins",
      dietary: [],
      spicyLevel: 3,
      ingredients: [
        "Spicy Salami",
        "Chili Peppers",
        "Mozzarella",
        "Tomato Sauce",
      ],
    },

    // Pasta Category
    {
      id: 5,
      name: "Spaghetti Carbonara",
      description:
        "Classic Roman pasta with eggs, pancetta, parmesan, black pepper",
      price: 19.99,
      image: "carbonara",
      category: "pasta",
      rating: 4.9,
      reviews: 145,
      isPopular: true,
      prepTime: "18-22 mins",
      dietary: [],
      spicyLevel: 0,
      ingredients: [
        "Spaghetti",
        "Eggs",
        "Pancetta",
        "Parmesan",
        "Black Pepper",
      ],
    },
    {
      id: 6,
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
      dietary: [],
      spicyLevel: 0,
      ingredients: [
        "Fettuccine",
        "Grilled Chicken",
        "Alfredo Sauce",
        "Parmesan",
      ],
    },
    {
      id: 7,
      name: "Penne Arrabbiata",
      description: "Spicy tomato sauce with garlic, chili, and fresh herbs",
      price: 17.99,
      image: "arrabbiata",
      category: "pasta",
      rating: 4.5,
      reviews: 76,
      prepTime: "15-18 mins",
      dietary: ["vegetarian", "vegan"],
      spicyLevel: 3,
      ingredients: ["Penne", "Spicy Tomato Sauce", "Garlic", "Chili", "Herbs"],
    },
    {
      id: 8,
      name: "Seafood Linguine",
      description:
        "Fresh linguine with shrimp, mussels, clams in white wine sauce",
      price: 28.99,
      image: "seafood-linguine",
      category: "pasta",
      rating: 4.8,
      reviews: 92,
      prepTime: "22-28 mins",
      dietary: [],
      spicyLevel: 0,
      ingredients: [
        "Linguine",
        "Shrimp",
        "Mussels",
        "Clams",
        "White Wine Sauce",
      ],
    },

    // Main Courses
    {
      id: 9,
      name: "Osso Buco Milanese",
      description:
        "Braised veal shanks with risotto alla milanese and gremolata",
      price: 34.99,
      image: "osso-buco",
      category: "mains",
      rating: 4.9,
      reviews: 67,
      prepTime: "35-40 mins",
      dietary: [],
      spicyLevel: 0,
      ingredients: ["Veal Shanks", "Risotto", "Saffron", "Gremolata"],
    },
    {
      id: 10,
      name: "Chicken Parmigiana",
      description: "Breaded chicken breast with marinara sauce and mozzarella",
      price: 26.99,
      image: "chicken-parm",
      category: "mains",
      rating: 4.6,
      reviews: 103,
      prepTime: "25-30 mins",
      dietary: [],
      spicyLevel: 0,
      ingredients: [
        "Chicken Breast",
        "Marinara Sauce",
        "Mozzarella",
        "Breadcrumbs",
      ],
    },
    {
      id: 11,
      name: "Seafood Risotto",
      description:
        "Creamy arborio rice with fresh shrimp, scallops, and mussels",
      price: 28.99,
      image: "seafood-risotto",
      category: "mains",
      rating: 4.9,
      reviews: 93,
      isPopular: true,
      prepTime: "25-30 mins",
      dietary: [],
      spicyLevel: 0,
      ingredients: ["Arborio Rice", "Shrimp", "Scallops", "Mussels", "Saffron"],
    },
    {
      id: 12,
      name: "Veal Piccata",
      description: "Pan-seared veal with lemon, capers, and white wine sauce",
      price: 31.99,
      image: "veal-piccata",
      category: "mains",
      rating: 4.7,
      reviews: 58,
      prepTime: "20-25 mins",
      dietary: [],
      spicyLevel: 0,
      ingredients: ["Veal", "Lemon", "Capers", "White Wine", "Butter"],
    },

    // Appetizers
    {
      id: 13,
      name: "Bruschetta Trio",
      description:
        "Three varieties: classic tomato, mushroom, and ricotta-honey",
      price: 14.99,
      image: "bruschetta-trio",
      category: "appetizers",
      rating: 4.5,
      reviews: 89,
      prepTime: "10 mins",
      dietary: ["vegetarian"],
      spicyLevel: 0,
      ingredients: ["Bread", "Tomatoes", "Mushrooms", "Ricotta", "Honey"],
    },
    {
      id: 14,
      name: "Antipasto Platter",
      description:
        "Selection of cured meats, cheeses, olives, and roasted vegetables",
      price: 22.99,
      image: "antipasto",
      category: "appetizers",
      rating: 4.7,
      reviews: 76,
      prepTime: "5 mins",
      dietary: [],
      spicyLevel: 0,
      ingredients: ["Cured Meats", "Cheeses", "Olives", "Roasted Vegetables"],
    },
    {
      id: 15,
      name: "Arancini",
      description:
        "Crispy risotto balls stuffed with mozzarella, served with marinara",
      price: 12.99,
      image: "arancini",
      category: "appetizers",
      rating: 4.6,
      reviews: 67,
      isNew: true,
      prepTime: "12-15 mins",
      dietary: ["vegetarian"],
      spicyLevel: 0,
      ingredients: ["Risotto", "Mozzarella", "Breadcrumbs", "Marinara Sauce"],
    },
    {
      id: 16,
      name: "Calamari Fritti",
      description: "Golden fried squid rings with spicy marinara dipping sauce",
      price: 16.99,
      image: "calamari",
      category: "appetizers",
      rating: 4.4,
      reviews: 94,
      prepTime: "10-12 mins",
      dietary: [],
      spicyLevel: 2,
      ingredients: ["Squid", "Flour", "Spicy Marinara", "Lemon"],
    },

    // Salads
    {
      id: 17,
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce, parmesan cheese, croutons, caesar dressing",
      price: 14.99,
      image: "caesar-salad",
      category: "salads",
      rating: 4.6,
      reviews: 67,
      prepTime: "10-15 mins",
      dietary: ["vegetarian"],
      spicyLevel: 0,
      ingredients: [
        "Romaine Lettuce",
        "Parmesan",
        "Croutons",
        "Caesar Dressing",
      ],
    },
    {
      id: 18,
      name: "Caprese Salad",
      description: "Fresh mozzarella, tomatoes, basil with balsamic glaze",
      price: 16.99,
      image: "caprese",
      category: "salads",
      rating: 4.8,
      reviews: 85,
      prepTime: "5 mins",
      dietary: ["vegetarian"],
      spicyLevel: 0,
      ingredients: ["Mozzarella", "Tomatoes", "Basil", "Balsamic Glaze"],
    },
    {
      id: 19,
      name: "Arugula & Pear Salad",
      description:
        "Baby arugula, roasted pears, gorgonzola, walnuts, honey vinaigrette",
      price: 18.99,
      image: "arugula-pear",
      category: "salads",
      rating: 4.7,
      reviews: 54,
      prepTime: "8 mins",
      dietary: ["vegetarian"],
      spicyLevel: 0,
      ingredients: [
        "Arugula",
        "Roasted Pears",
        "Gorgonzola",
        "Walnuts",
        "Honey Vinaigrette",
      ],
    },

    // Desserts
    {
      id: 20,
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
      dietary: ["vegetarian"],
      spicyLevel: 0,
      ingredients: ["Ladyfingers", "Coffee", "Mascarpone", "Cocoa"],
    },
    {
      id: 21,
      name: "Panna Cotta",
      description: "Silky vanilla panna cotta with berry compote",
      price: 7.99,
      image: "panna-cotta",
      category: "desserts",
      rating: 4.6,
      reviews: 78,
      prepTime: "5 mins",
      dietary: ["vegetarian"],
      spicyLevel: 0,
      ingredients: ["Cream", "Vanilla", "Berry Compote", "Gelatin"],
    },
    {
      id: 22,
      name: "Cannoli Siciliani",
      description:
        "Traditional Sicilian pastries filled with sweet ricotta and chocolate chips",
      price: 9.99,
      image: "cannoli",
      category: "desserts",
      rating: 4.7,
      reviews: 92,
      prepTime: "5 mins",
      dietary: ["vegetarian"],
      spicyLevel: 0,
      ingredients: [
        "Pastry Shells",
        "Sweet Ricotta",
        "Chocolate Chips",
        "Pistachios",
      ],
    },
    {
      id: 23,
      name: "Gelato Selection",
      description:
        "Three scoops of artisanal gelato: vanilla, chocolate, and pistachio",
      price: 6.99,
      image: "gelato",
      category: "desserts",
      rating: 4.5,
      reviews: 63,
      prepTime: "3 mins",
      dietary: ["vegetarian"],
      spicyLevel: 0,
      ingredients: ["Vanilla Gelato", "Chocolate Gelato", "Pistachio Gelato"],
    },
  ];

  const categories = [
    { id: "all", name: "All Items", icon: <Utensils size={20} /> },
    { id: "appetizers", name: "Appetizers", icon: <Utensils size={20} /> },
    { id: "salads", name: "Salads", icon: <Leaf size={20} /> },
    { id: "pizza", name: "Pizza", icon: <Utensils size={20} /> },
    { id: "pasta", name: "Pasta", icon: <ChefHat size={20} /> },
    { id: "mains", name: "Main Courses", icon: <Award size={20} /> },
    { id: "desserts", name: "Desserts", icon: <Heart size={20} /> },
  ];

  const dietaryOptions = [
    { id: "vegetarian", name: "Vegetarian", icon: <Leaf size={16} /> },
    { id: "vegan", name: "Vegan", icon: <Leaf size={16} /> },
  ];

  const sortOptions = [
    { id: "popular", name: "Most Popular" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
    { id: "name", name: "Alphabetical" },
  ];

  // Cart functions
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

  const toggleDietaryFilter = (filter) => {
    setDietaryFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setDietaryFilters([]);
    setPriceRange([0, 50]);
    setSortBy("popular");
    setSearchQuery("");
    setSelectedCategory("all");
  };

  // Filtered and sorted menu items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Price filter
      if (item.price < priceRange[0] || item.price > priceRange[1]) {
        return false;
      }

      // Dietary filters
      if (
        dietaryFilters.length > 0 &&
        !dietaryFilters.some((filter) => item.dietary.includes(filter))
      ) {
        return false;
      }

      return true;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "popular":
        default:
          return (
            (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating
          );
      }
    });

    return filtered;
  }, [
    menuItems,
    selectedCategory,
    searchQuery,
    priceRange,
    dietaryFilters,
    sortBy,
  ]);

  const renderSpicyLevel = (level) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame
        key={i}
        size={12}
        className={i < level ? "text-red-500" : "text-gray-300"}
        fill={i < level ? "currentColor" : "none"}
      />
    ));
  };

  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return menuItems.length;
    return menuItems.filter((item) => item.category === categoryId).length;
  };

  const navigate = useNavigate();

  return (
    <div className="menu-page">
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
              <Link to="../about">About</Link>
              <Link to="../contact">Contact</Link>
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

      {/* Menu Hero */}
      <section className="menu-hero">
        <div className="container">
          <div className="menu-hero-content">
            <h1>Our Menu</h1>
            <p>
              Discover authentic Italian flavors crafted with passion and
              tradition
            </p>

            <div className="menu-controls">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                className={`filter-btn ${showFilters ? "active" : ""}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={20} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <section className="filters-panel">
          <div className="container">
            <div className="filters-content">
              <div className="filter-group">
                <h4>Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <h4>Dietary Preferences</h4>
                <div className="dietary-filters">
                  {dietaryOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`dietary-btn ${
                        dietaryFilters.includes(option.id) ? "active" : ""
                      }`}
                      onClick={() => toggleDietaryFilter(option.id)}
                    >
                      {option.icon}
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Price Range</h4>
                <div className="price-range">
                  <span>${priceRange[0]}</span>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="price-slider"
                  />
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <button className="clear-filters" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          </div>
        </section>
      )}

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
                <span className="item-count">
                  ({getCategoryCount(category.id)})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="menu-items">
        <div className="container">
          <div className="menu-header">
            <h2>
              {selectedCategory === "all"
                ? `All Items (${filteredAndSortedItems.length})`
                : `${
                    categories.find((c) => c.id === selectedCategory)?.name
                  } (${filteredAndSortedItems.length})`}
            </h2>
            <div className="view-controls">
              <span className="results-count">
                Showing {filteredAndSortedItems.length} of {menuItems.length}{" "}
                items
              </span>
            </div>
          </div>

          <div className="dishes-grid">
            {filteredAndSortedItems.map((dish) => (
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
                    <div className="meta-row">
                      <div className="prep-time">
                        <Clock size={14} />
                        <span>{dish.prepTime}</span>
                      </div>
                      {dish.spicyLevel > 0 && (
                        <div className="spicy-level">
                          {renderSpicyLevel(dish.spicyLevel)}
                        </div>
                      )}
                    </div>

                    {dish.dietary.length > 0 && (
                      <div className="dietary-tags">
                        {dish.dietary.map((tag) => (
                          <span key={tag} className="dietary-tag">
                            <Leaf size={12} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="ingredients">
                    <span className="ingredients-label">Ingredients:</span>
                    <span className="ingredients-list">
                      {dish.ingredients.slice(0, 3).join(", ")}
                      {dish.ingredients.length > 3 && "..."}
                    </span>
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

          {filteredAndSortedItems.length === 0 && (
            <div className="no-results">
              <div className="no-results-content">
                <Eye size={48} />
                <h3>No dishes found</h3>
                <p>
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button className="btn-secondary" onClick={clearAllFilters}>
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

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

export default MenuPage;
