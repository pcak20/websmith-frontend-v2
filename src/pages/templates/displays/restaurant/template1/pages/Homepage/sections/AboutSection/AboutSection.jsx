import React from "react";
import { Award, Users, ChefHat } from "lucide-react";
import styles from "./AboutSection.module.css";

const AboutSection = ({ responsiveClass, restaurantInfo }) => {
  return (
    <section
      id="about"
      className={`${styles.aboutSection} ${styles[responsiveClass]}`}
    >
      <div className={styles.container}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h2>Our Story</h2>
            <p>
              Founded in 1985 by the Rossi family, {restaurantInfo.name} has
              been serving authentic Italian cuisine for over three decades. Our
              recipes are passed down through generations, ensuring every dish
              carries the true taste of Italy.
            </p>
            <p>
              We source only the finest ingredients, from San Marzano tomatoes
              to fresh mozzarella di bufala, creating dishes that transport you
              straight to the heart of Italy.
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
  );
};

export default AboutSection;
