import React, { useState, useMemo } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Clock,
  MapPin,
  CreditCard,
  Truck,
  Store,
  Star,
  ChefHat,
  Utensils,
  Heart,
  Tag,
  Gift,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import "./CartPage.css";

const CartPage = () => {
  // This would typically come from a global state management solution like Redux or Context
  // For demo purposes, using local state with some sample items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      description:
        "Fresh mozzarella, tomato sauce, basil, extra virgin olive oil",
      price: 18.99,
      originalPrice: 22.99,
      image: "margherita-pizza",
      category: "pizza",
      quantity: 2,
      dietary: ["vegetarian"],
      prepTime: "15-20 mins",
    },
    {
      id: 5,
      name: "Spaghetti Carbonara",
      description:
        "Classic Roman pasta with eggs, pancetta, parmesan, black pepper",
      price: 19.99,
      image: "carbonara",
      category: "pasta",
      quantity: 1,
      dietary: [],
      prepTime: "18-22 mins",
    },
    {
      id: 20,
      name: "Tiramisu",
      description:
        "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      price: 8.99,
      image: "tiramisu",
      category: "desserts",
      quantity: 1,
      dietary: ["vegetarian"],
      prepTime: "5 mins",
    },
  ]);

  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showPromoInput, setShowPromoInput] = useState(false);

  const restaurantInfo = {
    name: "Bella Vista",
    deliveryFee: 3.99,
    serviceFee: 2.5,
    minimumOrder: 25.0,
    taxRate: 0.08875,
    deliveryTime: "30-45 mins",
    pickupTime: "15-20 mins",
  };

  // Available promo codes
  const promoCodes = {
    WELCOME10: {
      discount: 0.1,
      type: "percentage",
      description: "10% off your order",
    },
    FREESHIP: { discount: 3.99, type: "fixed", description: "Free delivery" },
    SAVE5: { discount: 5.0, type: "fixed", description: "$5 off your order" },
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyPromoCode = () => {
    const promo = promoCodes[promoCode.toUpperCase()];
    if (promo) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        ...promo,
      });
      setPromoCode("");
      setShowPromoInput(false);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Calculate totals
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const savings = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      if (item.originalPrice) {
        return sum + (item.originalPrice - item.price) * item.quantity;
      }
      return sum;
    }, 0);
  }, [cartItems]);

  const deliveryFee =
    deliveryOption === "delivery" ? restaurantInfo.deliveryFee : 0;

  const promoDiscount = useMemo(() => {
    if (!appliedPromo) return 0;

    if (appliedPromo.type === "percentage") {
      return subtotal * appliedPromo.discount;
    } else {
      return Math.min(appliedPromo.discount, subtotal);
    }
  }, [appliedPromo, subtotal]);

  const taxableAmount = subtotal - promoDiscount;
  const tax = taxableAmount * restaurantInfo.taxRate;
  const total = taxableAmount + tax + deliveryFee + restaurantInfo.serviceFee;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isMinimumMet = subtotal >= restaurantInfo.minimumOrder;

  return (
    <div className="cart-page">
      {/* Header */}
      <header className="restaurant-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <ChefHat size={28} />
              <span>{restaurantInfo.name}</span>
            </div>
            <nav className="main-nav">
              <a href="#" className="nav-link">
                <ArrowLeft size={16} />
                Back to Menu
              </a>
              <a href="#menu">Menu</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="header-actions">
              <div className="cart-indicator">
                <ShoppingCart size={20} />
                <span className="cart-count">{totalItems}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Content */}
      <main className="cart-main">
        <div className="container">
          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="empty-cart">
              <div className="empty-cart-content">
                <ShoppingCart size={64} />
                <h2>Your cart is empty</h2>
                <p>Add some delicious items from our menu to get started!</p>
                <a href="#menu" className="btn-primary">
                  <Utensils size={20} />
                  Browse Menu
                </a>
              </div>
            </div>
          ) : (
            // Cart with Items
            <div className="cart-content">
              <div className="cart-items-section">
                <div className="cart-header">
                  <h1>Your Order</h1>
                  <button onClick={clearCart} className="clear-cart-btn">
                    <Trash2 size={16} />
                    Clear Cart
                  </button>
                </div>

                {/* Delivery Options */}
                <div className="delivery-options">
                  <button
                    className={`delivery-option ${
                      deliveryOption === "delivery" ? "active" : ""
                    }`}
                    onClick={() => setDeliveryOption("delivery")}
                  >
                    <Truck size={20} />
                    <div>
                      <span>Delivery</span>
                      <small>{restaurantInfo.deliveryTime}</small>
                    </div>
                    {deliveryOption === "delivery" && <CheckCircle size={16} />}
                  </button>
                  <button
                    className={`delivery-option ${
                      deliveryOption === "pickup" ? "active" : ""
                    }`}
                    onClick={() => setDeliveryOption("pickup")}
                  >
                    <Store size={20} />
                    <div>
                      <span>Pickup</span>
                      <small>{restaurantInfo.pickupTime}</small>
                    </div>
                    {deliveryOption === "pickup" && <CheckCircle size={16} />}
                  </button>
                </div>

                {/* Minimum Order Warning */}
                {!isMinimumMet && (
                  <div className="minimum-order-warning">
                    <AlertCircle size={16} />
                    <span>
                      Add ${(restaurantInfo.minimumOrder - subtotal).toFixed(2)}{" "}
                      more to meet the ${restaurantInfo.minimumOrder} minimum
                      order
                    </span>
                  </div>
                )}

                {/* Cart Items */}
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <div className={`food-image ${item.image}`}></div>
                      </div>

                      <div className="item-details">
                        <div className="item-header">
                          <h3>{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="remove-item-btn"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <p className="item-description">{item.description}</p>

                        <div className="item-meta">
                          <div className="prep-time">
                            <Clock size={14} />
                            <span>{item.prepTime}</span>
                          </div>
                          {item.dietary.length > 0 && (
                            <div className="dietary-tags">
                              {item.dietary.map((tag) => (
                                <span key={tag} className="dietary-tag">
                                  <Heart size={10} />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="item-footer">
                          <div className="price-section">
                            <span className="price">${item.price}</span>
                            {item.originalPrice && (
                              <>
                                <span className="original-price">
                                  ${item.originalPrice}
                                </span>
                                <span className="savings">
                                  Save $
                                  {(item.originalPrice - item.price).toFixed(2)}
                                </span>
                              </>
                            )}
                          </div>

                          <div className="quantity-controls">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="quantity-btn"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="quantity-btn"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add More Items */}
                <div className="add-more">
                  <a href="#menu" className="add-more-btn">
                    <Plus size={16} />
                    Add more items
                  </a>
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-card">
                  <h2>Order Summary</h2>

                  {/* Promo Code Section */}
                  <div className="promo-section">
                    {!showPromoInput && !appliedPromo && (
                      <button
                        onClick={() => setShowPromoInput(true)}
                        className="promo-trigger"
                      >
                        <Tag size={16} />
                        <span>Add promo code</span>
                      </button>
                    )}

                    {showPromoInput && (
                      <div className="promo-input-section">
                        <div className="promo-input">
                          <input
                            type="text"
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && applyPromoCode()
                            }
                          />
                          <button onClick={applyPromoCode}>Apply</button>
                        </div>
                        <button
                          onClick={() => setShowPromoInput(false)}
                          className="cancel-promo"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {appliedPromo && (
                      <div className="applied-promo">
                        <div className="promo-info">
                          <Gift size={16} />
                          <div>
                            <span className="promo-code">
                              {appliedPromo.code}
                            </span>
                            <small>{appliedPromo.description}</small>
                          </div>
                        </div>
                        <button
                          onClick={removePromoCode}
                          className="remove-promo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {savings > 0 && (
                      <div className="price-row savings-row">
                        <span>
                          <Star size={14} />
                          Total Savings
                        </span>
                        <span className="savings-amount">
                          -${savings.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {appliedPromo && (
                      <div className="price-row discount-row">
                        <span>
                          <Gift size={14} />
                          {appliedPromo.code} Discount
                        </span>
                        <span className="discount-amount">
                          -${promoDiscount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="price-row">
                      <span>Service Fee</span>
                      <span>${restaurantInfo.serviceFee.toFixed(2)}</span>
                    </div>

                    {deliveryOption === "delivery" && (
                      <div className="price-row">
                        <span>Delivery Fee</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="price-row">
                      <span>Tax & Fees</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="price-row total-row">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="delivery-info">
                    <div className="delivery-time">
                      <Clock size={16} />
                      <span>
                        {deliveryOption === "delivery"
                          ? `Delivery in ${restaurantInfo.deliveryTime}`
                          : `Ready for pickup in ${restaurantInfo.pickupTime}`}
                      </span>
                    </div>

                    {deliveryOption === "delivery" && (
                      <div className="delivery-address">
                        <MapPin size={16} />
                        <span>123 Your Street, Your City</span>
                        <button className="change-address">Change</button>
                      </div>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <button
                    className={`checkout-btn ${
                      !isMinimumMet ? "disabled" : ""
                    }`}
                    disabled={!isMinimumMet}
                  >
                    <CreditCard size={20} />
                    <div>
                      <span>Proceed to Checkout</span>
                      <small>${total.toFixed(2)}</small>
                    </div>
                  </button>
                </div>

                {/* Restaurant Info */}
                <div className="restaurant-info-card">
                  <h3>
                    <ChefHat size={20} />
                    {restaurantInfo.name}
                  </h3>
                  <div className="restaurant-details">
                    <div className="detail">
                      <Star size={14} />
                      <span>4.8 (1,247 reviews)</span>
                    </div>
                    <div className="detail">
                      <MapPin size={14} />
                      <span>123 Main Street, Downtown</span>
                    </div>
                    <div className="detail">
                      <Clock size={14} />
                      <span>Open until 10:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;
