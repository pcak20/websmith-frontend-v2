import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  Mail,
  Phone,
  Star,
  Download,
  Share2,
  Copy,
  MessageSquare,
  Navigation,
  Shield,
  Award,
  CreditCard,
  Smartphone,
  Bell,
  Heart,
  ArrowRight,
  Home,
  Plus,
  ExternalLink,
  QrCode,
  FileText,
  Send,
} from "lucide-react";
import "./BookingSuccess.css";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showQrCode, setShowQrCode] = useState(false);
  const [copiedReference, setCopiedReference] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [countdown, setCountdown] = useState("");

  // Extract booking data from navigation state
  const { bookingRef, bookingData, message } = location.state || {};

  // Fallback if no state is provided
  const fallbackBookingRef =
    "VIP" + Math.random().toString(36).substr(2, 6).toUpperCase();
  const fallbackData = {
    pickup: "Times Square, New York, NY",
    dropoff: "John F. Kennedy International Airport, Queens, NY",
    date: "2024-03-25",
    time: "14:30",
    passengers: 2,
    selectedVehicle: {
      name: "Mercedes S-Class",
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
      rating: 4.9,
      estimatedArrival: "8-12 minutes",
    },
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 555-123-4567",
    totalPrice: 280,
    finalTotal: 320,
  };

  const currentBookingRef = bookingRef || fallbackBookingRef;
  const currentData = bookingData || fallbackData;

  // Redirect if no booking data (shouldn't happen in normal flow)
  useEffect(() => {
    if (!location.state) {
      console.warn("No booking state found, using fallback data");
    }
  }, [location.state]);

  // Calculate countdown to pickup time
  useEffect(() => {
    const calculateCountdown = () => {
      if (currentData.date && currentData.time) {
        const pickupDateTime = new Date(
          `${currentData.date}T${currentData.time}`
        );
        const now = new Date();
        const timeDiff = pickupDateTime.getTime() - now.getTime();

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );

          if (days > 0) {
            setCountdown(`${days}d ${hours}h ${minutes}m`);
          } else if (hours > 0) {
            setCountdown(`${hours}h ${minutes}m`);
          } else {
            setCountdown(`${minutes}m`);
          }
        } else {
          setCountdown("Now");
        }
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [currentData.date, currentData.time]);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (timeString) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Copy booking reference to clipboard
  const copyBookingReference = async () => {
    try {
      await navigator.clipboard.writeText(currentBookingRef);
      setCopiedReference(true);
      setTimeout(() => setCopiedReference(false), 2000);
    } catch (err) {
      console.error("Failed to copy booking reference:", err);
    }
  };

  // Request notification permissions
  const enableNotifications = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationsEnabled(true);
        // Schedule notifications for pickup reminder
        setTimeout(() => {
          new Notification("VIP Transport Reminder", {
            body: `Your ${currentData.selectedVehicle?.name} will arrive in 15 minutes`,
            icon: "/favicon.ico",
          });
        }, 5000); // Demo notification after 5 seconds
      }
    }
  };

  // Share booking details
  const shareBooking = async (method) => {
    const shareText = `My VIP Transport booking is confirmed! 
    
Booking Reference: ${currentBookingRef}
Vehicle: ${currentData.selectedVehicle?.name}
Date: ${formatDate(currentData.date)}
Time: ${formatTime(currentData.time)}
From: ${currentData.pickup}
To: ${currentData.dropoff}

Book your luxury ride at: ${window.location.origin}`;

    switch (method) {
      case "native":
        if (navigator.share) {
          try {
            await navigator.share({
              title: "VIP Transport Booking Confirmed",
              text: shareText,
              url: window.location.origin,
            });
          } catch (err) {
            console.log("Share cancelled or failed");
          }
        }
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(shareText);
          alert("Booking details copied to clipboard!");
        } catch (err) {
          console.error("Failed to copy share text:", err);
        }
        break;
      case "email":
        const emailSubject = encodeURIComponent(
          "VIP Transport Booking Confirmation"
        );
        const emailBody = encodeURIComponent(shareText);
        window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`);
        break;
      case "sms":
        const smsBody = encodeURIComponent(shareText);
        window.open(`sms:?body=${smsBody}`);
        break;
    }
    setShowShareModal(false);
  };

  // Download booking confirmation (mock function)
  const downloadConfirmation = () => {
    // In a real app, this would generate and download a PDF
    alert("Booking confirmation will be downloaded as PDF");
  };

  return (
    <div className="booking-success">
      <div className="container">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-animation">
            <div className="success-icon-wrapper">
              <CheckCircle className="success-icon" />
              <div className="success-ripple"></div>
              <div className="success-ripple delay-1"></div>
              <div className="success-ripple delay-2"></div>
            </div>
          </div>

          <div className="success-content">
            <h1 className="success-title">Booking Confirmed!</h1>
            <p className="success-message">
              {message ||
                "Your luxury transportation has been successfully booked. Get ready for a premium experience!"}
            </p>

            <div className="booking-reference">
              <div className="reference-content">
                <span className="reference-label">Booking Reference</span>
                <div className="reference-number">
                  <span className="reference-text">{currentBookingRef}</span>
                  <button
                    className="copy-btn"
                    onClick={copyBookingReference}
                    title="Copy booking reference"
                  >
                    {copiedReference ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div className="reference-note">
                Save this reference number for your records
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary Cards */}
        <div className="summary-grid">
          {/* Trip Details Card */}
          <div className="summary-card trip-card">
            <div className="card-header">
              <div className="card-icon trip">
                <MapPin size={24} />
              </div>
              <div className="card-title">
                <h3>Trip Details</h3>
                <p>Your journey information</p>
              </div>
            </div>

            <div className="trip-summary">
              <div className="trip-route">
                <div className="route-point pickup">
                  <div className="route-dot"></div>
                  <div className="route-info">
                    <div className="route-label">Pickup</div>
                    <div className="route-address">{currentData.pickup}</div>
                  </div>
                </div>

                <div className="route-line"></div>

                <div className="route-point dropoff">
                  <div className="route-dot"></div>
                  <div className="route-info">
                    <div className="route-label">Destination</div>
                    <div className="route-address">{currentData.dropoff}</div>
                  </div>
                </div>
              </div>

              <div className="trip-metadata">
                <div className="metadata-row">
                  <Calendar size={16} />
                  <span>{formatDate(currentData.date)}</span>
                </div>
                <div className="metadata-row">
                  <Clock size={16} />
                  <span>{formatTime(currentData.time)}</span>
                </div>
                <div className="metadata-row">
                  <User size={16} />
                  <span>
                    {currentData.passengers} passenger
                    {currentData.passengers > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Card */}
          <div className="summary-card vehicle-card">
            <div className="card-header">
              <div className="card-icon vehicle">
                <Car size={24} />
              </div>
              <div className="card-title">
                <h3>Your Vehicle</h3>
                <p>Premium transportation</p>
              </div>
            </div>

            <div className="vehicle-summary">
              <img
                src={currentData.selectedVehicle?.image}
                alt={currentData.selectedVehicle?.name}
                className="vehicle-image"
              />
              <div className="vehicle-info">
                <h4 className="vehicle-name">
                  {currentData.selectedVehicle?.name}
                </h4>
                {currentData.selectedVehicle?.rating && (
                  <div className="vehicle-rating">
                    <Star size={14} className="star-filled" />
                    <span>{currentData.selectedVehicle.rating}</span>
                  </div>
                )}
                <div className="arrival-estimate">
                  <CheckCircle size={16} />
                  <span>
                    Arrives{" "}
                    {currentData.selectedVehicle?.estimatedArrival ||
                      "8-12 minutes"}{" "}
                    early
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="summary-card contact-card">
            <div className="card-header">
              <div className="card-icon contact">
                <User size={24} />
              </div>
              <div className="card-title">
                <h3>Contact Details</h3>
                <p>Passenger information</p>
              </div>
            </div>

            <div className="contact-info">
              <div className="contact-row">
                <User size={16} />
                <span>
                  {currentData.firstName} {currentData.lastName}
                </span>
              </div>
              <div className="contact-row">
                <Mail size={16} />
                <span>{currentData.email}</span>
              </div>
              <div className="contact-row">
                <Phone size={16} />
                <span>{currentData.phone}</span>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="summary-card payment-card">
            <div className="card-header">
              <div className="card-icon payment">
                <CreditCard size={24} />
              </div>
              <div className="card-title">
                <h3>Payment Confirmed</h3>
                <p>Transaction completed</p>
              </div>
            </div>

            <div className="payment-summary">
              <div className="payment-amount">
                <span className="amount-value">
                  ${currentData.finalTotal || currentData.totalPrice}
                </span>
                <span className="amount-label">Total Paid</span>
              </div>
              <div className="payment-status">
                <CheckCircle size={16} />
                <span>Payment Successful</span>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        {countdown && (
          <div className="countdown-section">
            <div className="countdown-card">
              <div className="countdown-content">
                <Clock className="countdown-icon" />
                <div className="countdown-text">
                  <h3>Time Until Pickup</h3>
                  <div className="countdown-timer">{countdown}</div>
                </div>
              </div>
              <div className="countdown-progress">
                <div className="progress-bar"></div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="actions-section">
          <div className="actions-header">
            <h3>Quick Actions</h3>
            <p>Manage your booking and stay updated</p>
          </div>

          <div className="actions-grid">
            <button className="action-item" onClick={downloadConfirmation}>
              <div className="action-icon download">
                <Download size={20} />
              </div>
              <div className="action-content">
                <span className="action-title">Download Receipt</span>
                <span className="action-desc">PDF confirmation</span>
              </div>
            </button>

            <button
              className="action-item"
              onClick={() => setShowShareModal(true)}
            >
              <div className="action-icon share">
                <Share2 size={20} />
              </div>
              <div className="action-content">
                <span className="action-title">Share Booking</span>
                <span className="action-desc">Send to contacts</span>
              </div>
            </button>

            <button
              className="action-item"
              onClick={() => setShowQrCode(!showQrCode)}
            >
              <div className="action-icon qr">
                <QrCode size={20} />
              </div>
              <div className="action-content">
                <span className="action-title">QR Code</span>
                <span className="action-desc">Quick access</span>
              </div>
            </button>

            <button
              className="action-item"
              onClick={enableNotifications}
              disabled={notificationsEnabled}
            >
              <div
                className={`action-icon notifications ${
                  notificationsEnabled ? "enabled" : ""
                }`}
              >
                <Bell size={20} />
              </div>
              <div className="action-content">
                <span className="action-title">
                  {notificationsEnabled ? "Notifications On" : "Enable Alerts"}
                </span>
                <span className="action-desc">Trip reminders</span>
              </div>
            </button>

            <Link to="/dashboard" className="action-item">
              <div className="action-icon dashboard">
                <Navigation size={20} />
              </div>
              <div className="action-content">
                <span className="action-title">View Dashboard</span>
                <span className="action-desc">Manage bookings</span>
              </div>
            </Link>

            <a href={`sms:${currentData.phone}`} className="action-item">
              <div className="action-icon sms">
                <MessageSquare size={20} />
              </div>
              <div className="action-content">
                <span className="action-title">Contact Support</span>
                <span className="action-desc">Get assistance</span>
              </div>
            </a>
          </div>
        </div>

        {/* QR Code Display */}
        {showQrCode && (
          <div className="qr-section">
            <div className="qr-card">
              <div className="qr-header">
                <h4>Booking QR Code</h4>
                <button
                  className="qr-close"
                  onClick={() => setShowQrCode(false)}
                >
                  ×
                </button>
              </div>
              <div className="qr-placeholder">
                {/* In a real app, generate actual QR code */}
                <div className="qr-mock">
                  <QrCode size={120} />
                  <p>
                    QR Code for booking
                    <br />
                    {currentBookingRef}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="next-steps">
          <h3>What Happens Next?</h3>
          <div className="steps-timeline">
            <div className="timeline-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Confirmation Email</h4>
                <p>
                  You'll receive a detailed confirmation email within 5 minutes
                  at {currentData.email}
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Driver Assignment</h4>
                <p>
                  Your professional chauffeur will be assigned 2 hours before
                  pickup
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Pickup Notification</h4>
                <p>We'll notify you 15 minutes before your vehicle arrives</p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Enjoy Your Ride</h4>
                <p>Relax and enjoy your premium transportation experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Guarantee */}
        <div className="guarantee-section">
          <div className="guarantee-content">
            <div className="guarantee-icon">
              <Shield size={32} />
            </div>
            <div className="guarantee-text">
              <h4>Our Service Guarantee</h4>
              <p>
                We're committed to providing exceptional luxury transportation.
                If you're not completely satisfied, we'll make it right.
              </p>
            </div>
          </div>

          <div className="guarantee-features">
            <div className="feature-item">
              <Award size={20} />
              <span>Premium Service</span>
            </div>
            <div className="feature-item">
              <Clock size={20} />
              <span>On-Time Guarantee</span>
            </div>
            <div className="feature-item">
              <Shield size={20} />
              <span>Fully Insured</span>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="cta-section">
          <div className="cta-content">
            <h3>Continue Your VIP Experience</h3>
            <p>Explore more ways to travel in luxury</p>
          </div>

          <div className="cta-buttons">
            <Link to="/book" className="btn btn-primary">
              <Plus size={20} />
              Book Another Ride
            </Link>
            <Link to="/dashboard" className="btn btn-outline">
              <Navigation size={20} />
              View All Bookings
            </Link>
            <Link to="/" className="btn btn-outline">
              <Home size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Share Booking</h3>
              <button
                className="modal-close"
                onClick={() => setShowShareModal(false)}
              >
                ×
              </button>
            </div>

            <div className="share-options">
              {navigator.share && (
                <button
                  className="share-option"
                  onClick={() => shareBooking("native")}
                >
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              )}

              <button
                className="share-option"
                onClick={() => shareBooking("copy")}
              >
                <Copy size={20} />
                <span>Copy Details</span>
              </button>

              <button
                className="share-option"
                onClick={() => shareBooking("email")}
              >
                <Mail size={20} />
                <span>Email</span>
              </button>

              <button
                className="share-option"
                onClick={() => shareBooking("sms")}
              >
                <MessageSquare size={20} />
                <span>SMS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSuccess;
