import { Star, Clock, Plus, Minus, Heart } from "lucide-react";
import styles from "./DishCard.module.css";

const DishCard = ({
  dish,
  favorites,
  toggleFavorite,
  addToCart,
  updateQuantity,
  getItemQuantity,
}) => {
  return (
    <div className={styles.dishCard}>
      {dish.isPopular && (
        <div className={`${styles.badge} ${styles.popular}`}>Popular</div>
      )}
      {dish.isNew && <div className={`${styles.badge} ${styles.new}`}>New</div>}
      {dish.originalPrice && (
        <div className={`${styles.badge} ${styles.sale}`}>Sale</div>
      )}

      <div className={styles.dishImage}>
        <div className={styles.foodImage}>
          <img src={dish.image} alt="" />
        </div>
        <button
          className={`${styles.favoriteBtn} ${
            favorites.includes(dish.id) ? styles.active : ""
          }`}
          onClick={() => toggleFavorite(dish.id)}
        >
          <Heart
            size={20}
            fill={favorites.includes(dish.id) ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className={styles.dishInfo}>
        <div className={styles.dishHeader}>
          <h3>{dish.name}</h3>
          <div className={styles.dishRating}>
            <Star size={14} fill="currentColor" />
            <span>{dish.rating}</span>
            <span className={styles.reviewCount}>({dish.reviews})</span>
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
              <button className={styles.addBtn} onClick={() => addToCart(dish)}>
                <Plus size={16} />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
