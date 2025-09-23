import React from "react";
import {
  Star,
  Clock,
  Plus,
  Minus,
  Heart,
  ShoppingCart,
  Utensils,
  ChefHat,
} from "lucide-react";
import styles from "./MenuSection.module.css";

const MenuSection = ({
  responsiveClass,
  isContained,
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
