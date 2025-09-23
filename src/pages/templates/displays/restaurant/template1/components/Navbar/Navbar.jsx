import React from "react";
import { ShoppingCart, ChefHat } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = ({
  responsiveClass,
  isContained,
  restaurantInfo,
  cartItems,
  getTotalItems,
  getTotalPrice,
}) => {
  return (
    <header className={`${styles.restaurantHeader} ${styles[responsiveClass]}`}>
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
  );
};

export default Navbar;
