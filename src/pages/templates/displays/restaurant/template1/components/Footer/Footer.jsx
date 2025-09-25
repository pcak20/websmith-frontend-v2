import React from "react";
import {
  ChefHat,
  MapPin,
  Phone,
  Clock,
  Truck,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import styles from "./Footer.module.css";

const Footer = ({ responsiveClass, restaurantInfo }) => {
  return (
    <footer className={`${styles.restaurantFooter} ${styles[responsiveClass]}`}>
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
  );
};

export default Footer;
