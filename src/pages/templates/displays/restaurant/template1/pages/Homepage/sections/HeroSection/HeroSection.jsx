import React from "react";
import {
  Star,
  Clock,
  Truck,
  Store,
  MapPin,
  Phone,
  Utensils,
  Eye,
} from "lucide-react";
import styles from "./HeroSection.module.css";

const HeroSection = ({ responsiveClass, restaurantInfo }) => {
  return (
    <section className={`${styles.hero} ${styles[responsiveClass]}`}>
      <div className={styles.heroBg}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroImage}>
          <img
            src="https://images.unsplash.com/photo-1651981075280-9a9e01acbff0?q=80&w=713&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
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
  );
};

export default HeroSection;
