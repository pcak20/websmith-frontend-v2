import React from "react";
import { ShoppingCart, ChefHat } from "lucide-react";
import styles from "./Navbar.module.css";
import TextElement from "../../../../../../../components/editables/TextElement/TextElement";
import IconElement from "../../../../../../../components/editables/IconElement/IconElement";

const Navbar = ({
  responsiveClass,
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
            <IconElement isEdit={false} size={28} iconId={"chefHat"} />
            <TextElement isEdit={false} textElement="span">
              {restaurantInfo.name}
            </TextElement>
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
