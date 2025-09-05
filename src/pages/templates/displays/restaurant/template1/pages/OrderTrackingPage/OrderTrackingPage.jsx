import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  ChefHat,
  Truck,
  MapPin,
  Phone,
  Star,
  ArrowLeft,
  Package,
  Navigation,
  MessageCircle,
  User,
  RefreshCw,
  AlertCircle,
  Calendar,
  Timer,
  Store,
  Receipt,
} from "lucide-react";
import "./OrderTrackingPage.css";

const OrderTrackingPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [orderStatus, setOrderStatus] = useState("preparing"); // confirmed, preparing, ready, out_for_delivery, delivered
  const [estimatedTime, setEstimatedTime] = useState(25); // minutes remaining

  const restaurantInfo = {
    name: "Bella Vista",
    phone: "(555) 123-4567",
    address: "123 Main Street, Downtown",
    rating: 4.8,
    reviews: 1247,
  };

  // Sample order data
  const orderData = {
    orderNumber: "BV-12345",
    placedAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    estimatedDelivery: new Date(Date.now() + estimatedTime * 60 * 1000),
    deliveryType: "delivery", // or "pickup"
    items: [
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
    ],
    customer: {
      name: "John Doe",
      phone: "(555) 987-6543",
      address: "456 Oak Avenue, Apt 3B, Your City, 12345",
    },
    driver: {
      name: "Mike Rodriguez",
      phone: "(555) 555-0123",
      rating: 4.9,
      vehicle: "Honda Civic - ABC 123",
    },
    payment: {
      subtotal: 46.97,
      tip: 8.45,
      deliveryFee: 3.99,
      serviceFee: 2.5,
      tax: 4.85,
      total: 66.76,
    },
  };

  // Order status steps
  const statusSteps = [
    {
      id: "confirmed",
      title: "Order Confirmed",
      description: "We've received your order",
      icon: <CheckCircle size={24} />,
      time: orderData.placedAt,
      completed: true,
    },
    {
      id: "preparing",
      title: "Preparing Your Food",
      description: "Our chefs are working on your order",
      icon: <ChefHat size={24} />,
      time: new Date(orderData.placedAt.getTime() + 5 * 60 * 1000),
      completed: orderStatus === "preparing" || isStatusPast("preparing"),
      active: orderStatus === "preparing",
    },
    {
      id: "ready",
      title:
        orderData.deliveryType === "delivery"
          ? "Ready for Delivery"
          : "Ready for Pickup",
      description:
        orderData.deliveryType === "delivery"
          ? "Your order is ready to be delivered"
          : "Your order is ready for pickup",
      icon: <Package size={24} />,
      time: new Date(orderData.placedAt.getTime() + 20 * 60 * 1000),
      completed: isStatusPast("ready"),
      active: orderStatus === "ready",
    },
    ...(orderData.deliveryType === "delivery"
      ? [
          {
            id: "out_for_delivery",
            title: "Out for Delivery",
            description: "Your order is on its way",
            icon: <Truck size={24} />,
            time: new Date(orderData.placedAt.getTime() + 25 * 60 * 1000),
            completed: isStatusPast("out_for_delivery"),
            active: orderStatus === "out_for_delivery",
          },
        ]
      : []),
    {
      id: "delivered",
      title: orderData.deliveryType === "delivery" ? "Delivered" : "Picked Up",
      description:
        orderData.deliveryType === "delivery"
          ? "Enjoy your meal!"
          : "Thank you for choosing us!",
      icon:
        orderData.deliveryType === "delivery" ? (
          <CheckCircle size={24} />
        ) : (
          <Store size={24} />
        ),
      time: orderData.estimatedDelivery,
      completed: orderStatus === "delivered",
      active: orderStatus === "delivered",
    },
  ];

  function isStatusPast(status) {
    const statusOrder = [
      "confirmed",
      "preparing",
      "ready",
      "out_for_delivery",
      "delivered",
    ];
    const currentIndex = statusOrder.indexOf(orderStatus);
    const statusIndex = statusOrder.indexOf(status);
    return currentIndex > statusIndex;
  }

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());

      // Simulate order progress (for demo)
      const minutesSinceOrder = Math.floor(
        (new Date() - orderData.placedAt) / (1000 * 60)
      );

      if (minutesSinceOrder >= 25 && orderStatus !== "delivered") {
        setOrderStatus("delivered");
      } else if (minutesSinceOrder >= 20 && orderStatus === "preparing") {
        setOrderStatus("ready");
        setEstimatedTime(Math.max(0, 30 - minutesSinceOrder));
      } else if (
        minutesSinceOrder >= 22 &&
        orderStatus === "ready" &&
        orderData.deliveryType === "delivery"
      ) {
        setOrderStatus("out_for_delivery");
        setEstimatedTime(Math.max(0, 30 - minutesSinceOrder));
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [orderStatus]);

  const getStatusMessage = () => {
    switch (orderStatus) {
      case "confirmed":
        return "We've received your order and will start preparing it soon!";
      case "preparing":
        return "Our talented chefs are preparing your delicious meal with care.";
      case "ready":
        return orderData.deliveryType === "delivery"
          ? "Your order is ready and waiting for our delivery driver!"
          : "Your order is ready for pickup! Please come to the restaurant.";
      case "out_for_delivery":
        return `${orderData.driver.name} is on the way with your order!`;
      case "delivered":
        return orderData.deliveryType === "delivery"
          ? "Your order has been delivered. Enjoy your meal!"
          : "Thank you for picking up your order. Enjoy your meal!";
      default:
        return "Tracking your order...";
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatRelativeTime = (date) => {
    const diffMs = currentTime - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1 minute ago";
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return "1 hour ago";
    return `${diffHours} hours ago`;
  };

  const totalItems = orderData.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="order-tracking-page">
      {/* Header */}
      <header className="restaurant-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <ChefHat size={28} />
              <span>{restaurantInfo.name}</span>
            </div>
            <nav className="main-nav">
              <a href="#menu" className="nav-link">
                <ArrowLeft size={16} />
                Back to Menu
              </a>
              <a href="#orders">My Orders</a>
              <a href="#menu">Menu</a>
            </nav>
            <button className="refresh-btn">
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="tracking-main">
        <div className="container">
          <div className="tracking-content">
            {/* Order Header */}
            <div className="order-header">
              <div className="order-title">
                <h1>Order #{orderData.orderNumber}</h1>
                <span className="order-time">
                  Placed {formatRelativeTime(orderData.placedAt)}
                </span>
              </div>
              <div className="order-status-badge">
                <div className={`status-indicator ${orderStatus}`}>
                  <div className="status-dot"></div>
                  <span>
                    {orderStatus
                      .replace("_", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </div>
              </div>
            </div>

            <div className="tracking-layout">
              {/* Left Column - Progress & Details */}
              <div className="tracking-left">
                {/* Current Status */}
                <div className="current-status">
                  <div className="status-icon">
                    {statusSteps.find((step) => step.active)?.icon || (
                      <Clock size={32} />
                    )}
                  </div>
                  <div className="status-info">
                    <h2>
                      {statusSteps.find((step) => step.active)?.title ||
                        "Processing Order"}
                    </h2>
                    <p>{getStatusMessage()}</p>
                    {estimatedTime > 0 && orderStatus !== "delivered" && (
                      <div className="estimated-time">
                        <Timer size={16} />
                        <span>Estimated {estimatedTime} minutes remaining</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="progress-timeline">
                  <h3>Order Progress</h3>
                  <div className="timeline">
                    {statusSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`timeline-item ${
                          step.completed ? "completed" : ""
                        } ${step.active ? "active" : ""}`}
                      >
                        <div className="timeline-marker">
                          {step.completed ? (
                            <CheckCircle size={20} />
                          ) : (
                            step.icon
                          )}
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <h4>{step.title}</h4>
                            <span className="timeline-time">
                              {step.completed && step.time <= currentTime
                                ? formatTime(step.time)
                                : step.active
                                ? "In progress"
                                : formatTime(step.time)}
                            </span>
                          </div>
                          <p>{step.description}</p>
                          {step.active && step.id === "preparing" && (
                            <div className="chef-activity">
                              <div className="cooking-animation">
                                <span>👨‍🍳</span>
                              </div>
                              <span>Our chefs are cooking with love!</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Information */}
                {orderData.deliveryType === "delivery" && (
                  <div className="delivery-info">
                    <h3>Delivery Information</h3>
                    <div className="delivery-details">
                      <div className="delivery-address">
                        <MapPin size={20} />
                        <div>
                          <span className="address-label">
                            Delivery Address
                          </span>
                          <span className="address-value">
                            {orderData.customer.address}
                          </span>
                        </div>
                      </div>

                      {(orderStatus === "out_for_delivery" ||
                        orderStatus === "delivered") && (
                        <div className="driver-info">
                          <div className="driver-header">
                            <User size={20} />
                            <span>Your Delivery Driver</span>
                          </div>
                          <div className="driver-details">
                            <div className="driver-profile">
                              <div className="driver-avatar">
                                <User size={24} />
                              </div>
                              <div className="driver-data">
                                <span className="driver-name">
                                  {orderData.driver.name}
                                </span>
                                <div className="driver-rating">
                                  <Star size={14} fill="currentColor" />
                                  <span>{orderData.driver.rating}</span>
                                </div>
                                <span className="driver-vehicle">
                                  {orderData.driver.vehicle}
                                </span>
                              </div>
                            </div>
                            <div className="driver-actions">
                              <button className="contact-btn">
                                <Phone size={16} />
                                Call
                              </button>
                              <button className="message-btn">
                                <MessageCircle size={16} />
                                Message
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Pickup Information */}
                {orderData.deliveryType === "pickup" && (
                  <div className="pickup-info">
                    <h3>Pickup Information</h3>
                    <div className="pickup-details">
                      <div className="pickup-location">
                        <Store size={20} />
                        <div>
                          <span className="location-label">
                            Pickup Location
                          </span>
                          <span className="location-value">
                            {restaurantInfo.address}
                          </span>
                          <span className="restaurant-phone">
                            {restaurantInfo.phone}
                          </span>
                        </div>
                      </div>

                      {orderStatus === "ready" && (
                        <div className="pickup-ready">
                          <div className="ready-indicator">
                            <Package size={24} />
                          </div>
                          <div className="ready-message">
                            <h4>Your order is ready!</h4>
                            <p>
                              Please come to the restaurant to collect your
                              order.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Order Summary */}
              <div className="tracking-right">
                {/* Order Items */}
                <div className="order-summary-card">
                  <h3>Order Summary</h3>
                  <div className="order-items">
                    {orderData.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <div className="item-details">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">
                            Qty: {item.quantity}
                          </span>
                          {item.originalPrice && (
                            <span className="item-savings">
                              Save $
                              {(
                                (item.originalPrice - item.price) *
                                item.quantity
                              ).toFixed(2)}
                            </span>
                          )}
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
                      <span>${orderData.payment.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="price-row">
                      <span>Tip</span>
                      <span>${orderData.payment.tip.toFixed(2)}</span>
                    </div>
                    <div className="price-row">
                      <span>Service Fee</span>
                      <span>${orderData.payment.serviceFee.toFixed(2)}</span>
                    </div>
                    {orderData.deliveryType === "delivery" && (
                      <div className="price-row">
                        <span>Delivery Fee</span>
                        <span>${orderData.payment.deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="price-row">
                      <span>Tax & Fees</span>
                      <span>${orderData.payment.tax.toFixed(2)}</span>
                    </div>
                    <div className="price-row total-row">
                      <span>Total</span>
                      <span>${orderData.payment.total.toFixed(2)}</span>
                    </div>
                  </div>
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
                      <span>
                        {restaurantInfo.rating} (
                        {restaurantInfo.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                    <div className="detail">
                      <MapPin size={14} />
                      <span>{restaurantInfo.address}</span>
                    </div>
                    <div className="detail">
                      <Phone size={14} />
                      <span>{restaurantInfo.phone}</span>
                    </div>
                  </div>

                  <div className="restaurant-actions">
                    <button className="contact-restaurant">
                      <Phone size={16} />
                      Contact Restaurant
                    </button>
                    <a href="#menu" className="order-again">
                      <Receipt size={16} />
                      Order Again
                    </a>
                  </div>
                </div>

                {/* Help & Support */}
                <div className="help-card">
                  <h3>Need Help?</h3>
                  <div className="help-options">
                    <button className="help-option">
                      <MessageCircle size={16} />
                      <span>Chat Support</span>
                    </button>
                    <button className="help-option">
                      <Phone size={16} />
                      <span>Call Support</span>
                    </button>
                    <button className="help-option">
                      <AlertCircle size={16} />
                      <span>Report Issue</span>
                    </button>
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

export default OrderTrackingPage;
