import React, { useState } from "react";
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  Heart,
  Clock,
  Star,
  Gift,
  Settings,
  LogOut,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ChefHat,
  Package,
  Award,
  Calendar,
  Phone,
  Mail,
  Camera,
  Shield,
  Truck,
} from "lucide-react";
import "./AccountPage.css";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [editingProfile, setEditingProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-06-15",
    avatar: null,
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      street: "123 Main Street",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      street: "456 Business Ave",
      apartment: "Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      isDefault: false,
    },
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      last4: "1234",
      brand: "Mastercard",
      expiryMonth: "08",
      expiryYear: "2024",
      isDefault: false,
    },
  ]);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: true,
    orderUpdates: true,
    specialOffers: true,
    newsletter: false,
  });

  const orderHistory = [
    {
      id: "BV-12345",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "Delivered",
      total: 66.76,
      items: [
        { name: "Margherita Pizza", quantity: 2, price: 18.99 },
        { name: "Spaghetti Carbonara", quantity: 1, price: 19.99 },
        { name: "Tiramisu", quantity: 1, price: 8.99 },
      ],
    },
    {
      id: "BV-12344",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "Delivered",
      total: 45.23,
      items: [
        { name: "Caesar Salad", quantity: 1, price: 14.99 },
        { name: "Chicken Alfredo", quantity: 1, price: 24.99 },
      ],
    },
    {
      id: "BV-12343",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      status: "Delivered",
      total: 78.9,
      items: [
        { name: "Seafood Risotto", quantity: 1, price: 28.99 },
        { name: "Bruschetta Trio", quantity: 1, price: 14.99 },
        { name: "Panna Cotta", quantity: 2, price: 7.99 },
      ],
    },
  ];

  const favoriteItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      price: 18.99,
      originalPrice: 22.99,
      image: "margherita-pizza",
      rating: 4.9,
    },
    {
      id: 5,
      name: "Spaghetti Carbonara",
      price: 19.99,
      image: "carbonara",
      rating: 4.9,
    },
    {
      id: 20,
      name: "Tiramisu",
      price: 8.99,
      image: "tiramisu",
      rating: 4.8,
    },
  ];

  const rewardsData = {
    currentPoints: 1250,
    tier: "Gold",
    nextTier: "Platinum",
    pointsToNextTier: 250,
    totalSpent: 890.45,
    ordersCount: 23,
    achievements: [
      { title: "Welcome Bonus", points: 100, date: "2023-01-15" },
      { title: "Regular Customer", points: 200, date: "2023-03-10" },
      { title: "Birthday Bonus", points: 150, date: "2023-06-15" },
      { title: "Review Master", points: 50, date: "2023-08-22" },
    ],
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "orders", label: "Order History", icon: <Package size={20} /> },
    { id: "favorites", label: "Favorites", icon: <Heart size={20} /> },
    { id: "addresses", label: "Addresses", icon: <MapPin size={20} /> },
    {
      id: "payments",
      label: "Payment Methods",
      icon: <CreditCard size={20} />,
    },
    { id: "rewards", label: "Rewards", icon: <Gift size={20} /> },
    { id: "preferences", label: "Preferences", icon: <Settings size={20} /> },
  ];

  const handleProfileSave = () => {
    setEditingProfile(false);
    // Here you would typically save to API
  };

  const handleAddressEdit = (addressId) => {
    setEditingAddress(addressId);
  };

  const handleAddressSave = (addressId) => {
    setEditingAddress(null);
    // Here you would typically save to API
  };

  const handleAddressDelete = (addressId) => {
    setAddresses(addresses.filter((addr) => addr.id !== addressId));
  };

  const handlePaymentDelete = (paymentId) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== paymentId));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "status-delivered";
      case "preparing":
        return "status-preparing";
      case "out for delivery":
        return "status-delivery";
      default:
        return "status-default";
    }
  };

  const getTierColor = (tier) => {
    switch (tier.toLowerCase()) {
      case "gold":
        return "#f59e0b";
      case "silver":
        return "#6b7280";
      case "platinum":
        return "#8b5cf6";
      default:
        return "#d97706";
    }
  };

  return (
    <div className="account-page">
      {/* Header */}
      <header className="restaurant-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <ChefHat size={28} />
              <span>Bella Vista</span>
            </div>
            <nav className="main-nav">
              <a href="#menu">Menu</a>
              <a href="#orders">Orders</a>
              <a href="#about">About</a>
            </nav>
            <div className="header-actions">
              <span className="welcome-text">
                Welcome, {userProfile.firstName}!
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Account Content */}
      <main className="account-main">
        <div className="container">
          <div className="account-layout">
            {/* Sidebar Navigation */}
            <aside className="account-sidebar">
              <div className="profile-summary">
                <div className="profile-avatar">
                  {userProfile.avatar ? (
                    <img src={userProfile.avatar} alt="Profile" />
                  ) : (
                    <User size={32} />
                  )}
                </div>
                <div className="profile-info">
                  <h3>
                    {userProfile.firstName} {userProfile.lastName}
                  </h3>
                  <span className="member-since">Member since Jan 2023</span>
                  {rewardsData.tier && (
                    <div
                      className="tier-badge"
                      style={{
                        backgroundColor: getTierColor(rewardsData.tier),
                      }}
                    >
                      <Award size={14} />
                      {rewardsData.tier} Member
                    </div>
                  )}
                </div>
              </div>

              <nav className="account-nav">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`nav-item ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}

                <button className="nav-item logout-btn">
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="account-content">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h2>Profile Information</h2>
                    <button
                      className="edit-btn"
                      onClick={() => setEditingProfile(!editingProfile)}
                    >
                      {editingProfile ? <X size={16} /> : <Edit3 size={16} />}
                      {editingProfile ? "Cancel" : "Edit"}
                    </button>
                  </div>

                  <div className="profile-form">
                    <div className="avatar-section">
                      <div className="avatar-upload">
                        {userProfile.avatar ? (
                          <img src={userProfile.avatar} alt="Profile" />
                        ) : (
                          <User size={48} />
                        )}
                        {editingProfile && (
                          <button className="upload-btn">
                            <Camera size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          value={userProfile.firstName}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              firstName: e.target.value,
                            })
                          }
                          disabled={!editingProfile}
                        />
                      </div>

                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          value={userProfile.lastName}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              lastName: e.target.value,
                            })
                          }
                          disabled={!editingProfile}
                        />
                      </div>

                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              email: e.target.value,
                            })
                          }
                          disabled={!editingProfile}
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              phone: e.target.value,
                            })
                          }
                          disabled={!editingProfile}
                        />
                      </div>

                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          value={userProfile.dateOfBirth}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              dateOfBirth: e.target.value,
                            })
                          }
                          disabled={!editingProfile}
                        />
                      </div>
                    </div>

                    {editingProfile && (
                      <div className="form-actions">
                        <button
                          className="btn-primary"
                          onClick={handleProfileSave}
                        >
                          <Save size={16} />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="security-section">
                    <h3>Security</h3>
                    <div className="security-item">
                      <div className="security-info">
                        <Shield size={20} />
                        <div>
                          <span>Password</span>
                          <small>Last updated 3 months ago</small>
                        </div>
                      </div>
                      <button className="btn-secondary">Change Password</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Order History Tab */}
              {activeTab === "orders" && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h2>Order History</h2>
                    <div className="order-stats">
                      <span>{orderHistory.length} orders</span>
                      <span>
                        $
                        {orderHistory
                          .reduce((sum, order) => sum + order.total, 0)
                          .toFixed(2)}{" "}
                        total spent
                      </span>
                    </div>
                  </div>

                  <div className="orders-list">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div className="order-info">
                            <span className="order-number">#{order.id}</span>
                            <span className="order-date">
                              {formatDate(order.date)}
                            </span>
                          </div>
                          <div className="order-status">
                            <span
                              className={`status ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                            <span className="order-total">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="order-items">
                          {order.items.map((item, index) => (
                            <div key={index} className="order-item">
                              <span className="item-name">
                                {item.quantity}x {item.name}
                              </span>
                              <span className="item-price">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="order-actions">
                          <button className="btn-secondary">
                            <Eye size={16} />
                            View Details
                          </button>
                          <button className="btn-primary">
                            <Package size={16} />
                            Reorder
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === "favorites" && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h2>Your Favorites</h2>
                    <span className="favorites-count">
                      {favoriteItems.length} items
                    </span>
                  </div>

                  <div className="favorites-grid">
                    {favoriteItems.map((item) => (
                      <div key={item.id} className="favorite-card">
                        <div className="favorite-image">
                          <div className={`food-image ${item.image}`}></div>
                          <button className="remove-favorite">
                            <Heart size={16} fill="currentColor" />
                          </button>
                        </div>

                        <div className="favorite-info">
                          <h4>{item.name}</h4>
                          <div className="favorite-rating">
                            <Star size={14} fill="currentColor" />
                            <span>{item.rating}</span>
                          </div>
                          <div className="favorite-price">
                            <span className="price">${item.price}</span>
                            {item.originalPrice && (
                              <span className="original-price">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                          <button className="add-to-cart-btn">
                            <Plus size={16} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h2>Delivery Addresses</h2>
                    <button className="btn-primary">
                      <Plus size={16} />
                      Add Address
                    </button>
                  </div>

                  <div className="addresses-list">
                    {addresses.map((address) => (
                      <div key={address.id} className="address-card">
                        <div className="address-header">
                          <div className="address-type">
                            <MapPin size={20} />
                            <span>{address.type}</span>
                            {address.isDefault && (
                              <span className="default-badge">Default</span>
                            )}
                          </div>
                          <div className="address-actions">
                            <button
                              className="edit-address"
                              onClick={() => handleAddressEdit(address.id)}
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              className="delete-address"
                              onClick={() => handleAddressDelete(address.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="address-details">
                          <span className="street">{address.street}</span>
                          {address.apartment && (
                            <span className="apartment">
                              {address.apartment}
                            </span>
                          )}
                          <span className="city">
                            {address.city}, {address.state} {address.zipCode}
                          </span>
                        </div>

                        {!address.isDefault && (
                          <button className="set-default-btn">
                            Set as Default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === "payments" && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h2>Payment Methods</h2>
                    <button className="btn-primary">
                      <Plus size={16} />
                      Add Payment Method
                    </button>
                  </div>

                  <div className="payments-list">
                    {paymentMethods.map((payment) => (
                      <div key={payment.id} className="payment-card">
                        <div className="payment-info">
                          <CreditCard size={24} />
                          <div className="card-details">
                            <span className="card-brand">{payment.brand}</span>
                            <span className="card-number">
                              •••• •••• •••• {payment.last4}
                            </span>
                            <span className="card-expiry">
                              Expires {payment.expiryMonth}/{payment.expiryYear}
                            </span>
                          </div>
                          {payment.isDefault && (
                            <span className="default-badge">Default</span>
                          )}
                        </div>

                        <div className="payment-actions">
                          <button className="edit-payment">
                            <Edit3 size={14} />
                          </button>
                          <button
                            className="delete-payment"
                            onClick={() => handlePaymentDelete(payment.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rewards Tab */}
              {activeTab === "rewards" && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h2>Rewards Program</h2>
                    <div className="tier-info">
                      <Award
                        size={20}
                        style={{ color: getTierColor(rewardsData.tier) }}
                      />
                      <span style={{ color: getTierColor(rewardsData.tier) }}>
                        {rewardsData.tier} Member
                      </span>
                    </div>
                  </div>

                  <div className="rewards-summary">
                    <div className="points-card">
                      <div className="points-header">
                        <h3>Your Points</h3>
                        <span className="points-balance">
                          {rewardsData.currentPoints.toLocaleString()}
                        </span>
                      </div>

                      <div className="tier-progress">
                        <div className="progress-info">
                          <span>Progress to {rewardsData.nextTier}</span>
                          <span>
                            {rewardsData.pointsToNextTier} points to go
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${
                                ((1500 - rewardsData.pointsToNextTier) / 1500) *
                                100
                              }%`,
                              backgroundColor: getTierColor(rewardsData.tier),
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="rewards-stats">
                      <div className="stat">
                        <span className="stat-value">
                          ${rewardsData.totalSpent.toFixed(2)}
                        </span>
                        <span className="stat-label">Total Spent</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">
                          {rewardsData.ordersCount}
                        </span>
                        <span className="stat-label">Orders Placed</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">5%</span>
                        <span className="stat-label">Cashback Rate</span>
                      </div>
                    </div>
                  </div>

                  <div className="achievements-section">
                    <h3>Recent Achievements</h3>
                    <div className="achievements-list">
                      {rewardsData.achievements.map((achievement, index) => (
                        <div key={index} className="achievement-item">
                          <div className="achievement-icon">
                            <Gift size={20} />
                          </div>
                          <div className="achievement-info">
                            <span className="achievement-title">
                              {achievement.title}
                            </span>
                            <span className="achievement-date">
                              {formatDate(new Date(achievement.date))}
                            </span>
                          </div>
                          <span className="achievement-points">
                            +{achievement.points} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h2>Preferences</h2>
                  </div>

                  <div className="preferences-sections">
                    <div className="preference-section">
                      <h3>
                        <Bell size={20} />
                        Notifications
                      </h3>

                      <div className="preference-items">
                        <div className="preference-item">
                          <div className="preference-info">
                            <span>Email Notifications</span>
                            <small>Receive order updates via email</small>
                          </div>
                          <label className="toggle">
                            <input
                              type="checkbox"
                              checked={preferences.emailNotifications}
                              onChange={(e) =>
                                setPreferences({
                                  ...preferences,
                                  emailNotifications: e.target.checked,
                                })
                              }
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        <div className="preference-item">
                          <div className="preference-info">
                            <span>SMS Notifications</span>
                            <small>
                              Receive text messages for order updates
                            </small>
                          </div>
                          <label className="toggle">
                            <input
                              type="checkbox"
                              checked={preferences.smsNotifications}
                              onChange={(e) =>
                                setPreferences({
                                  ...preferences,
                                  smsNotifications: e.target.checked,
                                })
                              }
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        <div className="preference-item">
                          <div className="preference-info">
                            <span>Push Notifications</span>
                            <small>
                              Browser notifications for real-time updates
                            </small>
                          </div>
                          <label className="toggle">
                            <input
                              type="checkbox"
                              checked={preferences.pushNotifications}
                              onChange={(e) =>
                                setPreferences({
                                  ...preferences,
                                  pushNotifications: e.target.checked,
                                })
                              }
                            />
                            <span className="slider"></span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="preference-section">
                      <h3>
                        <Mail size={20} />
                        Marketing Communications
                      </h3>

                      <div className="preference-items">
                        <div className="preference-item">
                          <div className="preference-info">
                            <span>Special Offers</span>
                            <small>
                              Receive exclusive deals and promotions
                            </small>
                          </div>
                          <label className="toggle">
                            <input
                              type="checkbox"
                              checked={preferences.specialOffers}
                              onChange={(e) =>
                                setPreferences({
                                  ...preferences,
                                  specialOffers: e.target.checked,
                                })
                              }
                            />
                            <span className="slider"></span>
                          </label>
                        </div>

                        <div className="preference-item">
                          <div className="preference-info">
                            <span>Newsletter</span>
                            <small>
                              Monthly newsletter with recipes and updates
                            </small>
                          </div>
                          <label className="toggle">
                            <input
                              type="checkbox"
                              checked={preferences.newsletter}
                              onChange={(e) =>
                                setPreferences({
                                  ...preferences,
                                  newsletter: e.target.checked,
                                })
                              }
                            />
                            <span className="slider"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="preferences-actions">
                    <button className="btn-primary">
                      <Save size={16} />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
