import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./HomePage.module.css";
import conf from "../../conf";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "./sections/HeroSection/HeroSection";
import MenuSection from "./sections/MenuSection/MenuSection";
import AboutSection from "./sections/AboutSection/AboutSection";
import Footer from "../../components/Footer/Footer";

const HomePage = ({
  theme,
  restaurantData = {},
  menuData = {},
  isContained = false,
  containerWidth = null,
  viewportMode = "desktop",
}) => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("featured");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  const currentTheme = useMemo(() => {
    return conf.themes[theme];
  }, [theme]);

  // Container size observer for responsive behavior
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    if (window.ResizeObserver && containerRef.current) {
      const resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    } else {
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  // Apply theme to CSS custom properties
  useEffect(() => {
    const root =
      isContained && containerRef.current
        ? containerRef.current
        : document.documentElement;

    root.style.setProperty("--primary-color", currentTheme.primary);
    root.style.setProperty("--secondary-color", currentTheme.secondary);
    root.style.setProperty("--accent-color", currentTheme.accent);
    root.style.setProperty("--highlight-color", currentTheme.highlight);
  }, [currentTheme, isContained]);

  // Determine responsive class based on container width or viewport mode
  const getResponsiveClass = () => {
    if (containerWidth) {
      if (containerWidth < 480) return "mobile";
      if (containerWidth < 768) return "tablet";
      return "desktop";
    }

    if (viewportMode !== "desktop") {
      return viewportMode;
    }

    const width = containerSize.width || window.innerWidth;
    if (width < 480) return "mobile";
    if (width < 768) return "tablet";
    return "desktop";
  };

  const responsiveClass = getResponsiveClass();

  // Default restaurant info
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

  // Default menu data
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
    { id: "featured", name: "Featured", icon: "Star" },
    { id: "pizza", name: "Pizza", icon: "Utensils" },
    { id: "pasta", name: "Pasta", icon: "ChefHat" },
    { id: "mains", name: "Main Courses", icon: "Utensils" },
    { id: "appetizers", name: "Appetizers", icon: "Utensils" },
    { id: "desserts", name: "Desserts", icon: "Heart" },
  ];

  const featuredDishes = menuData.dishes || defaultFeaturedDishes;
  const categories = menuData.categories || defaultCategories;

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

  const commonProps = {
    responsiveClass,
    isContained,
    restaurantInfo,
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.restaurantHomepage} ${styles[responsiveClass]} ${
        isContained ? styles.contained : ""
      }`}
    >
      <Navbar
        {...commonProps}
        cartItems={cartItems}
        getTotalItems={getTotalItems}
        getTotalPrice={getTotalPrice}
      />

      <HeroSection {...commonProps} />

      <MenuSection
        {...commonProps}
        featuredDishes={featuredDishes}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        favorites={favorites}
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        toggleFavorite={toggleFavorite}
        getItemQuantity={getItemQuantity}
        cartItems={cartItems}
        getTotalItems={getTotalItems}
        getTotalPrice={getTotalPrice}
      />

      <AboutSection {...commonProps} />

      <Footer {...commonProps} />
    </div>
  );
};

export default HomePage;
