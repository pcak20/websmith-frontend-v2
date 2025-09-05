import React, { useState } from "react";
import {
  CreditCard,
  ArrowLeft,
  Lock,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  ChefHat,
  Truck,
  Store,
  Gift,
  Star,
  Shield,
  Calendar,
  Edit3,
  Plus,
  Minus,
} from "lucide-react";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [orderType, setOrderType] = useState("asap"); // 'asap' or 'scheduled'
  const [scheduledTime, setScheduledTime] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    zipCode: "",
    instructions: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [tip, setTip] = useState(18); // tip percentage
  const [customTip, setCustomTip] = useState("");

  // Sample cart items (would come from global state)
  const cartItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      price: 18.99,
      originalPrice: 22.99,
      quantity: 2,
    },
    {
      id: 5,
      name: "Spaghetti Carbonara",
      price: 19.99,
      quantity: 1,
    },
    {
      id: 20,
      name: "Tiramisu",
      price: 8.99,
      quantity: 1,
    },
  ];

  const restaurantInfo = {
    name: "Bella Vista",
    phone: "(555) 123-4567",
    address: "123 Main Street, Downtown",
    deliveryFee: 3.99,
    serviceFee: 2.5,
    taxRate: 0.08875,
    deliveryTime: "30-45 mins",
    pickupTime: "15-20 mins",
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);
  const deliveryFee =
    deliveryOption === "delivery" ? restaurantInfo.deliveryFee : 0;
  const tipAmount =
    tip > 0 ? (subtotal * tip) / 100 : parseFloat(customTip) || 0;
  const taxableAmount = subtotal + tipAmount;
  const tax = taxableAmount * restaurantInfo.taxRate;
  const total = taxableAmount + tax + deliveryFee + restaurantInfo.serviceFee;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const steps = [
    { number: 1, title: "Contact", description: "Your information" },
    { number: 2, title: "Delivery", description: "Address & timing" },
    { number: 3, title: "Payment", description: "Complete order" },
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: <CreditCard size={20} /> },
    { id: "apple", name: "Apple Pay", icon: "🍎" },
    { id: "google", name: "Google Pay", icon: "🔵" },
    { id: "paypal", name: "PayPal", icon: "💙" },
  ];

  const tipOptions = [15, 18, 20, 25];

  const handleInputChange = (section, field, value) => {
    if (section === "customer") {
      setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "delivery") {
      setDeliveryAddress((prev) => ({ ...prev, [field]: value }));
    } else if (section === "payment") {
      setPaymentInfo((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          customerInfo.firstName &&
          customerInfo.lastName &&
          customerInfo.email &&
          customerInfo.phone
        );
      case 2:
        if (deliveryOption === "pickup") return true;
        return (
          deliveryAddress.street &&
          deliveryAddress.city &&
          deliveryAddress.zipCode
        );
      case 3:
        if (paymentMethod !== "card") return true;
        return (
          paymentInfo.cardNumber &&
          paymentInfo.expiryDate &&
          paymentInfo.cvv &&
          paymentInfo.cardholderName
        );
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const placeOrder = async () => {
    if (!validateStep(3)) return;

    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <header className="restaurant-header">
          <div className="container">
            <div className="header-content">
              <div className="logo">
                <ChefHat size={28} />
                <span>{restaurantInfo.name}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="checkout-main">
          <div className="container">
            <div className="order-confirmation">
              <div className="confirmation-content">
                <div className="success-icon">
                  <CheckCircle size={64} />
                </div>
                <h1>Order Confirmed!</h1>
                <p>
                  Thank you for your order. We're preparing your delicious meal!
                </p>

                <div className="order-details">
                  <div className="order-number">
                    <span>Order #12345</span>
                  </div>

                  <div className="order-summary">
                    <h3>Order Summary</h3>
                    {cartItems.map((item) => (
                      <div key={item.id} className="order-item">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="order-total">
                      <span>Total: ${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="delivery-info">
                    <div className="info-item">
                      <Clock size={20} />
                      <div>
                        <span className="info-label">
                          {deliveryOption === "delivery"
                            ? "Delivery Time"
                            : "Pickup Time"}
                        </span>
                        <span className="info-value">
                          {deliveryOption === "delivery"
                            ? restaurantInfo.deliveryTime
                            : restaurantInfo.pickupTime}
                        </span>
                      </div>
                    </div>

                    {deliveryOption === "delivery" ? (
                      <div className="info-item">
                        <MapPin size={20} />
                        <div>
                          <span className="info-label">Delivery Address</span>
                          <span className="info-value">
                            {deliveryAddress.street}, {deliveryAddress.city}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="info-item">
                        <Store size={20} />
                        <div>
                          <span className="info-label">Pickup Address</span>
                          <span className="info-value">
                            {restaurantInfo.address}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="confirmation-actions">
                  <button className="btn-primary">Track Your Order</button>
                  <a href="#menu" className="btn-secondary">
                    Order Again
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Header */}
      <header className="restaurant-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <ChefHat size={28} />
              <span>{restaurantInfo.name}</span>
            </div>
            <nav className="main-nav">
              <a href="#cart" className="nav-link">
                <ArrowLeft size={16} />
                Back to Cart
              </a>
            </nav>
            <div className="secure-indicator">
              <Shield size={16} />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="container">
          <div className="progress-steps">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`progress-step ${
                  step.number === currentStep ? "active" : ""
                } ${step.number < currentStep ? "completed" : ""}`}
              >
                <div className="step-indicator">
                  {step.number < currentStep ? (
                    <CheckCircle size={20} />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <div className="step-info">
                  <span className="step-title">{step.title}</span>
                  <span className="step-description">{step.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="checkout-main">
        <div className="container">
          <div className="checkout-content">
            {/* Checkout Form */}
            <div className="checkout-form">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div className="checkout-step">
                  <div className="step-header">
                    <h2>Contact Information</h2>
                    <p>We'll use this to update you about your order</p>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>First Name</label>
                      <div className="input-wrapper">
                        <User size={16} />
                        <input
                          type="text"
                          placeholder="John"
                          value={customerInfo.firstName}
                          onChange={(e) =>
                            handleInputChange(
                              "customer",
                              "firstName",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Last Name</label>
                      <div className="input-wrapper">
                        <User size={16} />
                        <input
                          type="text"
                          placeholder="Doe"
                          value={customerInfo.lastName}
                          onChange={(e) =>
                            handleInputChange(
                              "customer",
                              "lastName",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Email Address</label>
                      <div className="input-wrapper">
                        <Mail size={16} />
                        <input
                          type="email"
                          placeholder="john.doe@example.com"
                          value={customerInfo.email}
                          onChange={(e) =>
                            handleInputChange(
                              "customer",
                              "email",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Phone Number</label>
                      <div className="input-wrapper">
                        <Phone size={16} />
                        <input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={customerInfo.phone}
                          onChange={(e) =>
                            handleInputChange(
                              "customer",
                              "phone",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Information */}
              {currentStep === 2 && (
                <div className="checkout-step">
                  <div className="step-header">
                    <h2>Delivery Details</h2>
                    <p>Choose how you'd like to receive your order</p>
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
                      {deliveryOption === "delivery" && (
                        <CheckCircle size={16} />
                      )}
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

                  {/* Delivery Address */}
                  {deliveryOption === "delivery" && (
                    <div className="address-section">
                      <h3>Delivery Address</h3>
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label>Street Address</label>
                          <div className="input-wrapper">
                            <MapPin size={16} />
                            <input
                              type="text"
                              placeholder="123 Main Street"
                              value={deliveryAddress.street}
                              onChange={(e) =>
                                handleInputChange(
                                  "delivery",
                                  "street",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Apartment/Suite (Optional)</label>
                          <input
                            type="text"
                            placeholder="Apt 4B"
                            value={deliveryAddress.apartment}
                            onChange={(e) =>
                              handleInputChange(
                                "delivery",
                                "apartment",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="form-group">
                          <label>ZIP Code</label>
                          <input
                            type="text"
                            placeholder="12345"
                            value={deliveryAddress.zipCode}
                            onChange={(e) =>
                              handleInputChange(
                                "delivery",
                                "zipCode",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="form-group full-width">
                          <label>City</label>
                          <input
                            type="text"
                            placeholder="New York"
                            value={deliveryAddress.city}
                            onChange={(e) =>
                              handleInputChange(
                                "delivery",
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="form-group full-width">
                          <label>Delivery Instructions (Optional)</label>
                          <textarea
                            placeholder="Ring doorbell, leave at door, etc."
                            value={deliveryAddress.instructions}
                            onChange={(e) =>
                              handleInputChange(
                                "delivery",
                                "instructions",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pickup Location */}
                  {deliveryOption === "pickup" && (
                    <div className="pickup-section">
                      <h3>Pickup Location</h3>
                      <div className="pickup-info">
                        <MapPin size={20} />
                        <div>
                          <span className="pickup-address">
                            {restaurantInfo.address}
                          </span>
                          <span className="pickup-phone">
                            {restaurantInfo.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Timing */}
                  <div className="timing-section">
                    <h3>When do you want your order?</h3>
                    <div className="timing-options">
                      <button
                        className={`timing-option ${
                          orderType === "asap" ? "active" : ""
                        }`}
                        onClick={() => setOrderType("asap")}
                      >
                        <Clock size={16} />
                        <span>
                          ASAP (
                          {deliveryOption === "delivery"
                            ? restaurantInfo.deliveryTime
                            : restaurantInfo.pickupTime}
                          )
                        </span>
                      </button>
                      <button
                        className={`timing-option ${
                          orderType === "scheduled" ? "active" : ""
                        }`}
                        onClick={() => setOrderType("scheduled")}
                      >
                        <Calendar size={16} />
                        <span>Schedule for later</span>
                      </button>
                    </div>

                    {orderType === "scheduled" && (
                      <div className="schedule-input">
                        <label>Select Date & Time</label>
                        <input
                          type="datetime-local"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          min={new Date().toISOString().slice(0, 16)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="checkout-step">
                  <div className="step-header">
                    <h2>Payment Information</h2>
                    <p>Your payment information is secure and encrypted</p>
                  </div>

                  {/* Payment Methods */}
                  <div className="payment-methods">
                    <h3>Payment Method</h3>
                    <div className="payment-options">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          className={`payment-option ${
                            paymentMethod === method.id ? "active" : ""
                          }`}
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          <div className="payment-icon">{method.icon}</div>
                          <span>{method.name}</span>
                          {paymentMethod === method.id && (
                            <CheckCircle size={16} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === "card" && (
                    <div className="card-details">
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label>Card Number</label>
                          <div className="input-wrapper">
                            <CreditCard size={16} />
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={paymentInfo.cardNumber}
                              onChange={(e) =>
                                handleInputChange(
                                  "payment",
                                  "cardNumber",
                                  formatCardNumber(e.target.value)
                                )
                              }
                              maxLength={19}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) =>
                              handleInputChange(
                                "payment",
                                "expiryDate",
                                formatExpiryDate(e.target.value)
                              )
                            }
                            maxLength={5}
                          />
                        </div>

                        <div className="form-group">
                          <label>CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) =>
                              handleInputChange(
                                "payment",
                                "cvv",
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            maxLength={4}
                          />
                        </div>

                        <div className="form-group full-width">
                          <label>Cardholder Name</label>
                          <div className="input-wrapper">
                            <User size={16} />
                            <input
                              type="text"
                              placeholder="John Doe"
                              value={paymentInfo.cardholderName}
                              onChange={(e) =>
                                handleInputChange(
                                  "payment",
                                  "cardholderName",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tip Section */}
                  <div className="tip-section">
                    <h3>Add Tip for Delivery</h3>
                    <p>Support your delivery driver</p>

                    <div className="tip-options">
                      {tipOptions.map((tipOption) => (
                        <button
                          key={tipOption}
                          className={`tip-option ${
                            tip === tipOption ? "active" : ""
                          }`}
                          onClick={() => {
                            setTip(tipOption);
                            setCustomTip("");
                          }}
                        >
                          {tipOption}%
                        </button>
                      ))}
                      <button
                        className={`tip-option ${customTip ? "active" : ""}`}
                        onClick={() => setTip(0)}
                      >
                        Custom
                      </button>
                    </div>

                    {(customTip || tip === 0) && (
                      <div className="custom-tip">
                        <label>Custom Tip Amount</label>
                        <div className="input-wrapper">
                          <span className="currency">$</span>
                          <input
                            type="number"
                            placeholder="5.00"
                            value={customTip}
                            onChange={(e) => setCustomTip(e.target.value)}
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </div>
                    )}

                    <div className="tip-amount">
                      Tip: ${tipAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="checkout-navigation">
                {currentStep > 1 && (
                  <button onClick={prevStep} className="btn-secondary">
                    <ArrowLeft size={16} />
                    Back
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className={`btn-primary ${
                      !validateStep(currentStep) ? "disabled" : ""
                    }`}
                    disabled={!validateStep(currentStep)}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={placeOrder}
                    className={`place-order-btn ${
                      !validateStep(3) ? "disabled" : ""
                    } ${isProcessing ? "processing" : ""}`}
                    disabled={!validateStep(3) || isProcessing}
                  >
                    <Lock size={16} />
                    {isProcessing
                      ? "Processing..."
                      : `Place Order • $${total.toFixed(2)}`}
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary-sidebar">
              <div className="summary-card">
                <h3>Order Summary</h3>

                <div className="order-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

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

                  {tipAmount > 0 && (
                    <div className="price-row">
                      <span>Tip</span>
                      <span>${tipAmount.toFixed(2)}</span>
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

                <div className="delivery-summary">
                  <div className="summary-item">
                    <Clock size={16} />
                    <span>
                      {deliveryOption === "delivery"
                        ? `Delivery in ${restaurantInfo.deliveryTime}`
                        : `Ready in ${restaurantInfo.pickupTime}`}
                    </span>
                  </div>

                  <div className="summary-item">
                    <MapPin size={16} />
                    <span>
                      {deliveryOption === "delivery"
                        ? deliveryAddress.street || "Add delivery address"
                        : restaurantInfo.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
