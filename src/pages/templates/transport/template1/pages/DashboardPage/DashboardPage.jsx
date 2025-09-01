import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  Star,
  User,
  Phone,
  Mail,
  CreditCard,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Award,
  Shield,
} from "lucide-react";
import "./DashboardPage.css";

// Sample user data
const userData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  memberSince: "2022-03-15",
  totalBookings: 24,
  totalSpent: 8450,
  preferredVehicle: "Mercedes S-Class",
  vipStatus: "Gold Member",
  profileImage:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
};

// Sample bookings data
const bookingsData = [
  {
    id: "VIP001",
    date: "2024-03-20",
    time: "09:30",
    pickup: "Grand Central Terminal, NYC",
    dropoff: "LaGuardia Airport, NYC",
    vehicle: "Mercedes S-Class",
    chauffeur: "Michael Thompson",
    status: "upcoming",
    price: 220,
    distance: "18.5 km",
    duration: "45 min",
    bookingDate: "2024-03-15",
    specialRequests: "Child seat required, Airport assistance needed",
    vehicleImage:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
  },
  {
    id: "VIP002",
    date: "2024-03-25",
    time: "14:00",
    pickup: "Manhattan Hotel, NYC",
    dropoff: "JFK Airport, NYC",
    vehicle: "BMW 7 Series",
    chauffeur: "David Wilson",
    status: "upcoming",
    price: 280,
    distance: "32.1 km",
    duration: "1h 15m",
    bookingDate: "2024-03-18",
    specialRequests: "VIP lounge access, Flight tracking",
    vehicleImage:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
  },
  {
    id: "VIP003",
    date: "2024-03-10",
    time: "19:00",
    pickup: "Corporate Office, Manhattan",
    dropoff: "Restaurant, Brooklyn",
    vehicle: "Tesla Model S",
    chauffeur: "James Rodriguez",
    status: "completed",
    price: 180,
    distance: "22.3 km",
    duration: "52 min",
    bookingDate: "2024-03-08",
    rating: 5,
    feedback: "Excellent service, very professional driver",
    vehicleImage:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop",
  },
  {
    id: "VIP004",
    date: "2024-03-05",
    time: "11:30",
    pickup: "Madison Square Garden, NYC",
    dropoff: "Central Park Hotel, NYC",
    vehicle: "Range Rover Vogue",
    chauffeur: "Robert Chen",
    status: "completed",
    price: 160,
    distance: "12.8 km",
    duration: "35 min",
    bookingDate: "2024-03-03",
    rating: 4,
    feedback: "Good service, arrived on time",
    vehicleImage:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop",
  },
  {
    id: "VIP005",
    date: "2024-02-28",
    time: "16:45",
    pickup: "Business District, Manhattan",
    dropoff: "Newark Airport, NJ",
    vehicle: "Mercedes S-Class",
    chauffeur: "Michael Thompson",
    status: "completed",
    price: 320,
    distance: "45.2 km",
    duration: "1h 30m",
    bookingDate: "2024-02-25",
    rating: 5,
    feedback: "Perfect timing, comfortable ride",
    vehicleImage:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
  },
  {
    id: "VIP006",
    date: "2024-02-20",
    time: "08:00",
    pickup: "Home Address",
    dropoff: "Corporate Meeting Center",
    vehicle: "Rolls Royce Ghost",
    chauffeur: "Alexander Smith",
    status: "cancelled",
    price: 450,
    distance: "28.7 km",
    duration: "1h 10m",
    bookingDate: "2024-02-18",
    cancellationReason: "Meeting postponed",
    vehicleImage:
      "https://images.unsplash.com/photo-1631295868785-3ac2dcf14c4c?w=400&h=300&fit=crop",
  },
];

// Status options for filtering
const statusOptions = [
  { value: "all", label: "All Bookings" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  // Filter and search bookings
  const filteredBookings = useMemo(() => {
    return bookingsData.filter((booking) => {
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;
      const matchesSearch =
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.dropoff.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    const upcoming = bookingsData.filter((b) => b.status === "upcoming").length;
    const completed = bookingsData.filter(
      (b) => b.status === "completed"
    ).length;
    const cancelled = bookingsData.filter(
      (b) => b.status === "cancelled"
    ).length;
    const avgRating =
      bookingsData
        .filter((b) => b.rating)
        .reduce((sum, b) => sum + b.rating, 0) /
        bookingsData.filter((b) => b.rating).length || 0;

    return { upcoming, completed, cancelled, avgRating };
  }, []);

  const openBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  };

  const closeBookingDetails = () => {
    setSelectedBooking(null);
    setShowBookingDetails(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      upcoming: {
        className: "status-upcoming",
        icon: Clock,
        label: "Upcoming",
      },
      completed: {
        className: "status-completed",
        icon: CheckCircle,
        label: "Completed",
      },
      cancelled: {
        className: "status-cancelled",
        icon: XCircle,
        label: "Cancelled",
      },
    };

    const config = statusConfig[status] || statusConfig.upcoming;
    const Icon = config.icon;

    return (
      <span className={`status-badge ${config.className}`}>
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="user-info">
              <img
                src={userData.profileImage}
                alt={userData.name}
                className="user-avatar"
              />
              <div className="user-details">
                <h1 className="user-name">Welcome back, {userData.name}</h1>
                <p className="user-subtitle">
                  {userData.vipStatus} • Member since{" "}
                  {formatDate(userData.memberSince)}
                </p>
              </div>
            </div>
            <div className="header-actions">
              <Link to="/book" className="btn btn-primary">
                <Plus size={20} />
                New Booking
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-nav">
          <button
            className={`nav-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <BarChart3 size={20} />
            Overview
          </button>
          <button
            className={`nav-tab ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <Calendar size={20} />
            Bookings
          </button>
          <button
            className={`nav-tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={20} />
            Profile
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="tab-content">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon upcoming">
                  <Clock size={24} />
                </div>
                <div className="stat-info">
                  <div className="stat-number">{stats.upcoming}</div>
                  <div className="stat-label">Upcoming Trips</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon completed">
                  <CheckCircle size={24} />
                </div>
                <div className="stat-info">
                  <div className="stat-number">{stats.completed}</div>
                  <div className="stat-label">Completed Trips</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon rating">
                  <Star size={24} />
                </div>
                <div className="stat-info">
                  <div className="stat-number">
                    {stats.avgRating.toFixed(1)}
                  </div>
                  <div className="stat-label">Average Rating</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon spending">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-info">
                  <div className="stat-number">
                    ${userData.totalSpent.toLocaleString()}
                  </div>
                  <div className="stat-label">Total Spent</div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="overview-section">
              <div className="section-header">
                <h2 className="section-title">Recent Bookings</h2>
                <Link
                  to="#"
                  onClick={() => setActiveTab("bookings")}
                  className="section-link"
                >
                  View All <ChevronRight size={16} />
                </Link>
              </div>

              <div className="recent-bookings">
                {bookingsData.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="booking-summary">
                    <div className="booking-image">
                      <img src={booking.vehicleImage} alt={booking.vehicle} />
                    </div>
                    <div className="booking-details">
                      <div className="booking-route">
                        <MapPin size={16} className="route-icon" />
                        <span className="route-text">
                          {booking.pickup.split(",")[0]} →{" "}
                          {booking.dropoff.split(",")[0]}
                        </span>
                      </div>
                      <div className="booking-meta">
                        <span className="booking-date">
                          {formatDate(booking.date)} at {booking.time}
                        </span>
                        <span className="booking-vehicle">
                          {booking.vehicle}
                        </span>
                      </div>
                    </div>
                    <div className="booking-status">
                      {getStatusBadge(booking.status)}
                      <div className="booking-price">${booking.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VIP Benefits */}
            <div className="overview-section">
              <div className="section-header">
                <h2 className="section-title">Your VIP Benefits</h2>
              </div>

              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <Award size={24} />
                  </div>
                  <h3 className="benefit-title">Priority Booking</h3>
                  <p className="benefit-description">
                    Get first access to our premium vehicles and preferred time
                    slots.
                  </p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <Shield size={24} />
                  </div>
                  <h3 className="benefit-title">24/7 Concierge</h3>
                  <p className="benefit-description">
                    Round-the-clock support for any special requests or
                    assistance.
                  </p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <Star size={24} />
                  </div>
                  <h3 className="benefit-title">Loyalty Rewards</h3>
                  <p className="benefit-description">
                    Earn points on every ride and redeem for exclusive perks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="tab-content">
            {/* Booking Controls */}
            <div className="booking-controls">
              <div className="controls-left">
                <div className="search-bar">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="filter-dropdown">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="controls-right">
                <button className="btn btn-outline">
                  <Download size={20} />
                  Export
                </button>
              </div>
            </div>

            {/* Bookings List */}
            <div className="bookings-list">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <div className="booking-id">#{booking.id}</div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="booking-content">
                    <div className="booking-image">
                      <img src={booking.vehicleImage} alt={booking.vehicle} />
                    </div>

                    <div className="booking-info">
                      <div className="booking-route">
                        <div className="route-point">
                          <div className="route-dot pickup"></div>
                          <div className="route-location">{booking.pickup}</div>
                        </div>
                        <div className="route-line"></div>
                        <div className="route-point">
                          <div className="route-dot dropoff"></div>
                          <div className="route-location">
                            {booking.dropoff}
                          </div>
                        </div>
                      </div>

                      <div className="booking-details-grid">
                        <div className="detail-item">
                          <Calendar size={16} />
                          <span>
                            {formatDate(booking.date)} at {booking.time}
                          </span>
                        </div>
                        <div className="detail-item">
                          <Car size={16} />
                          <span>{booking.vehicle}</span>
                        </div>
                        <div className="detail-item">
                          <User size={16} />
                          <span>{booking.chauffeur}</span>
                        </div>
                        <div className="detail-item">
                          <MapPin size={16} />
                          <span>
                            {booking.distance} • {booking.duration}
                          </span>
                        </div>
                      </div>

                      {booking.rating && (
                        <div className="booking-rating">
                          <div className="rating-stars">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < booking.rating
                                    ? "star-filled"
                                    : "star-empty"
                                }
                              />
                            ))}
                          </div>
                          <span className="rating-text">
                            {booking.feedback}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="booking-actions">
                      <div className="booking-price">${booking.price}</div>
                      <div className="action-buttons">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => openBookingDetails(booking)}
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                        {booking.status === "upcoming" && (
                          <button className="btn btn-outline btn-sm">
                            <Edit size={16} />
                            Modify
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBookings.length === 0 && (
              <div className="no-bookings">
                <Calendar size={64} className="no-bookings-icon" />
                <h3>No bookings found</h3>
                <p>
                  Try adjusting your search criteria or create a new booking.
                </p>
                <Link to="/book" className="btn btn-primary">
                  <Plus size={20} />
                  Create New Booking
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="tab-content">
            <div className="profile-content">
              <div className="profile-section">
                <h2 className="section-title">Personal Information</h2>
                <div className="profile-card">
                  <div className="profile-avatar-section">
                    <img
                      src={userData.profileImage}
                      alt={userData.name}
                      className="profile-avatar-large"
                    />
                    <button className="btn btn-outline btn-sm">
                      Change Photo
                    </button>
                  </div>

                  <div className="profile-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" value={userData.name} readOnly />
                      </div>
                      <div className="form-group">
                        <label>VIP Status</label>
                        <input
                          type="text"
                          value={userData.vipStatus}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" value={userData.email} readOnly />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" value={userData.phone} readOnly />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Member Since</label>
                        <input
                          type="text"
                          value={formatDate(userData.memberSince)}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Preferred Vehicle</label>
                        <input
                          type="text"
                          value={userData.preferredVehicle}
                          readOnly
                        />
                      </div>
                    </div>

                    <button className="btn btn-primary">Update Profile</button>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h2 className="section-title">Account Statistics</h2>
                <div className="stats-summary">
                  <div className="summary-item">
                    <div className="summary-icon">
                      <Calendar size={24} />
                    </div>
                    <div className="summary-info">
                      <div className="summary-number">
                        {userData.totalBookings}
                      </div>
                      <div className="summary-label">Total Bookings</div>
                    </div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-icon">
                      <CreditCard size={24} />
                    </div>
                    <div className="summary-info">
                      <div className="summary-number">
                        ${userData.totalSpent.toLocaleString()}
                      </div>
                      <div className="summary-label">Total Spent</div>
                    </div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-icon">
                      <Star size={24} />
                    </div>
                    <div className="summary-info">
                      <div className="summary-number">
                        {stats.avgRating.toFixed(1)}
                      </div>
                      <div className="summary-label">Average Rating Given</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Details Modal */}
        {showBookingDetails && selectedBooking && (
          <div className="modal-overlay" onClick={closeBookingDetails}>
            <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Booking Details</h2>
                <button className="modal-close" onClick={closeBookingDetails}>
                  ×
                </button>
              </div>

              <div className="modal-content">
                <div className="modal-booking-header">
                  <div className="modal-booking-id">#{selectedBooking.id}</div>
                  {getStatusBadge(selectedBooking.status)}
                </div>

                <div className="modal-booking-info">
                  <div className="info-section">
                    <h3>Trip Details</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <Calendar size={16} />
                        <span>
                          {formatDate(selectedBooking.date)} at{" "}
                          {selectedBooking.time}
                        </span>
                      </div>
                      <div className="info-item">
                        <MapPin size={16} />
                        <span>
                          {selectedBooking.distance} •{" "}
                          {selectedBooking.duration}
                        </span>
                      </div>
                      <div className="info-item">
                        <Car size={16} />
                        <span>{selectedBooking.vehicle}</span>
                      </div>
                      <div className="info-item">
                        <User size={16} />
                        <span>{selectedBooking.chauffeur}</span>
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Route</h3>
                    <div className="route-details">
                      <div className="route-point">
                        <div className="route-dot pickup"></div>
                        <div className="route-info">
                          <div className="route-label">Pickup</div>
                          <div className="route-address">
                            {selectedBooking.pickup}
                          </div>
                        </div>
                      </div>
                      <div className="route-point">
                        <div className="route-dot dropoff"></div>
                        <div className="route-info">
                          <div className="route-label">Dropoff</div>
                          <div className="route-address">
                            {selectedBooking.dropoff}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedBooking.specialRequests && (
                    <div className="info-section">
                      <h3>Special Requests</h3>
                      <p>{selectedBooking.specialRequests}</p>
                    </div>
                  )}

                  <div className="info-section">
                    <h3>Pricing</h3>
                    <div className="pricing-breakdown">
                      <div className="pricing-row">
                        <span>Trip Cost</span>
                        <span>${selectedBooking.price}</span>
                      </div>
                      <div className="pricing-row total">
                        <span>Total</span>
                        <span>${selectedBooking.price}</span>
                      </div>
                    </div>
                  </div>

                  {selectedBooking.rating && (
                    <div className="info-section">
                      <h3>Your Rating & Feedback</h3>
                      <div className="rating-section">
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className={
                                i < selectedBooking.rating
                                  ? "star-filled"
                                  : "star-empty"
                              }
                            />
                          ))}
                        </div>
                        <p className="feedback-text">
                          {selectedBooking.feedback}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  {selectedBooking.status === "upcoming" && (
                    <>
                      <button className="btn btn-outline">
                        Modify Booking
                      </button>
                      <button className="btn btn-danger">Cancel Booking</button>
                    </>
                  )}
                  <button className="btn btn-primary">Download Receipt</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
