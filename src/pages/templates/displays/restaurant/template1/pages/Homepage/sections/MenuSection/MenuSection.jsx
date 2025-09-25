import React from "react";
import {
  Star,
  Plus,
  ShoppingCart,
  Utensils,
  ChefHat,
  Heart,
} from "lucide-react";
import DishCard from "../../../../components/cards/DishCard";
import styles from "./MenuSection.module.css";

const MenuSection = ({
  responsiveClass,
  featuredDishes,
  categories,
  selectedCategory,
  setSelectedCategory,
  favorites,
  addToCart,
  updateQuantity,
  toggleFavorite,
  getItemQuantity,
  cartItems,
  getTotalItems,
  getTotalPrice,
}) => {
  const getIconComponent = (iconName) => {
    const iconMap = {
      Star: Star,
      Utensils: Utensils,
      ChefHat: ChefHat,
      Heart: Heart,
    };
    const IconComponent = iconMap[iconName] || Utensils;
    return <IconComponent size={20} />;
  };

  const filteredDishes =
    selectedCategory === "featured"
      ? featuredDishes
      : featuredDishes.filter((dish) => dish.category === selectedCategory);

  return (
    <>
      {/* Menu Categories */}
      <section
        className={`${styles.menuCategories} ${styles[responsiveClass]}`}
      >
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
                {getIconComponent(category.icon)}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section
        id="menu"
        className={`${styles.featuredDishes} ${styles[responsiveClass]}`}
      >
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
              <DishCard
                key={dish.id}
                dish={dish}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
                getItemQuantity={getItemQuantity}
              />
            ))}
          </div>

          <div className={styles.viewAll}>
            <button className={styles.btnSecondary}>View Full Menu</button>
          </div>
        </div>
      </section>

      {/* Floating Cart */}
      {getTotalItems() > 0 && (
        <div className={`${styles.floatingCart} ${styles[responsiveClass]}`}>
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
    </>
  );
};

export default MenuSection;
