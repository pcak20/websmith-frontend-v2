import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChefHat,
  Star,
  MapPin,
  Check,
  ArrowLeft,
  Plus,
  Minus,
  Heart,
  Utensils,
  Wine,
  Music,
  Gift,
  Search,
  Edit,
  X,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import "./ReservationPage.css";

const ReservationPage = ({ mode = "book" }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    occasion: "",
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode); // 'book', 'manage', 'cancel'
  const [reservationLookup, setReservationLookup] = useState({
    email: "",
    confirmationCode: "",
  });
  const [foundReservation, setFoundReservation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Restaurant info (matching your homepage)
  const restaurantInfo = {
    name: "Bella Vista",
    tagline: "Authentic Italian Cuisine",
    phone: "(555) 123-4567",
    address: "123 Main Street, Downtown",
    rating: 4.8,
    reviews: 1247,
  };

  // Mock reservation data - in real app, this would come from your backend
  const mockReservations = {
    "john@email.com": {
      RSV123456: {
        id: "RSV123456",
        name: "John Smith",
        email: "john@email.com",
        phone: "(555) 123-4567",
        date: "2025-09-15",
        time: "7:00 PM",
        guests: 4,
        occasion: "anniversary",
        specialRequests: "Window seat please",
        status: "confirmed",
        createdAt: "2025-08-28",
      },
    },
  };

  const cancelReasons = [
    "Change of plans",
    "Found another restaurant",
    "Party size changed",
    "Date/time no longer works",
    "Personal emergency",
    "Other",
  ];

  // Available time slots
  const timeSlots = [
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
  ];

  // Special occasions
  const occasions = [
    { id: "birthday", name: "Birthday", icon: <Gift size={16} /> },
    { id: "anniversary", name: "Anniversary", icon: <Heart size={16} /> },
    { id: "date", name: "Date Night", icon: <Wine size={16} /> },
    { id: "business", name: "Business Dinner", icon: <Users size={16} /> },
    { id: "celebration", name: "Celebration", icon: <Star size={16} /> },
    { id: "other", name: "Other", icon: <Music size={16} /> },
  ];

  // Get today's date for minimum date selection
  const today = new Date().toISOString().split("T")[0];

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle guest count changes
  const updateGuestCount = (change) => {
    const newCount = Math.max(1, Math.min(12, formData.guests + change));
    handleInputChange("guests", newCount);
  };

  // Handle reservation lookup
  const handleReservationLookup = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userReservations =
        mockReservations[reservationLookup.email.toLowerCase()];
      if (
        userReservations &&
        userReservations[reservationLookup.confirmationCode.toUpperCase()]
      ) {
        const reservation =
          userReservations[reservationLookup.confirmationCode.toUpperCase()];
        setFoundReservation(reservation);
        // Pre-fill form data for editing
        setFormData({
          date: reservation.date,
          time: reservation.time,
          guests: reservation.guests,
          name: reservation.name,
          email: reservation.email,
          phone: reservation.phone,
          specialRequests: reservation.specialRequests,
          occasion: reservation.occasion,
        });
        setSelectedTimeSlot(reservation.time);
      } else {
        setFoundReservation("not_found");
      }
      setIsLoading(false);
    }, 1500);
  };

  // Handle reservation cancellation
  const handleCancelReservation = async () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowCancelConfirm(false);
      setFoundReservation({ ...foundReservation, status: "cancelled" });
      setCurrentMode("cancelled");
    }, 2000);
  };

  // Handle reservation modification
  const handleModifyReservation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsEditing(false);
      setFoundReservation({
        ...foundReservation,
        ...formData,
        time: selectedTimeSlot,
        status: "modified",
      });
      setCurrentMode("modified");
    }, 2000);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      setCurrentStep(4);
    }, 2000);
  };

  // Navigate between steps
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check if current step is valid
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.date && selectedTimeSlot && formData.guests;
      case 2:
        return formData.name && formData.email && formData.phone;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="reservation-page">
      {/* Header */}
      <header className="reservation-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <ChefHat size={28} />
              <span>{restaurantInfo.name}</span>
            </div>

            {/* Navigation Tabs */}
            <div className="reservation-nav">
              <button
                className={`nav-btn ${currentMode === "book" ? "active" : ""}`}
                onClick={() => {
                  setCurrentMode("book");
                  setFoundReservation(null);
                  setCurrentStep(1);
                  setIsConfirmed(false);
                }}
              >
                Make Reservation
              </button>
              <button
                className={`nav-btn ${
                  currentMode === "manage" ? "active" : ""
                }`}
                onClick={() => {
                  setCurrentMode("manage");
                  setFoundReservation(null);
                  setIsEditing(false);
                }}
              >
                Manage Booking
              </button>
            </div>

            <div className="header-info">
              <div className="rating">
                <Star size={16} fill="currentColor" />
                <span>{restaurantInfo.rating}</span>
                <span className="reviews">({restaurantInfo.reviews})</span>
              </div>
              <div className="location">
                <MapPin size={16} />
                <span>{restaurantInfo.address}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Manage Reservation Section */}
      {currentMode === "manage" && !foundReservation && (
        <div className="manage-reservation-container">
          <div className="container">
            <div className="manage-content">
              <div className="manage-header">
                <h1>Manage Your Reservation</h1>
                <p>
                  Enter your details to view, modify, or cancel your reservation
                </p>
              </div>

              <div className="lookup-form-container">
                <div className="lookup-form">
                  <div className="form-group">
                    <label>
                      <Mail size={20} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={reservationLookup.email}
                      onChange={(e) =>
                        setReservationLookup((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <Search size={20} />
                      Confirmation Code
                    </label>
                    <input
                      type="text"
                      value={reservationLookup.confirmationCode}
                      onChange={(e) =>
                        setReservationLookup((prev) => ({
                          ...prev,
                          confirmationCode: e.target.value.toUpperCase(),
                        }))
                      }
                      placeholder="e.g., RSV123456"
                      required
                    />
                  </div>

                  <button
                    className="lookup-btn"
                    onClick={handleReservationLookup}
                    disabled={
                      !reservationLookup.email ||
                      !reservationLookup.confirmationCode ||
                      isLoading
                    }
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw size={16} className="spinning" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search size={16} />
                        Find Reservation
                      </>
                    )}
                  </button>
                </div>

                <div className="lookup-help">
                  <h4>Need Help?</h4>
                  <p>
                    Your confirmation code was sent to your email when you made
                    the reservation. It starts with "RSV" followed by numbers.
                  </p>
                  <p>
                    For demo purposes, try: <strong>john@email.com</strong> with
                    code <strong>RSV123456</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Found - Management Options */}
      {currentMode === "manage" &&
        foundReservation &&
        foundReservation !== "not_found" &&
        !isEditing && (
          <div className="reservation-details-container">
            <div className="container">
              <div className="reservation-details">
                <div className="details-header">
                  <h1>Reservation Details</h1>
                  <div className={`status-badge ${foundReservation.status}`}>
                    {foundReservation.status === "confirmed" && (
                      <Check size={16} />
                    )}
                    {foundReservation.status === "modified" && (
                      <Edit size={16} />
                    )}
                    {foundReservation.status === "cancelled" && <X size={16} />}
                    {foundReservation.status.charAt(0).toUpperCase() +
                      foundReservation.status.slice(1)}
                  </div>
                </div>

                <div className="reservation-info-grid">
                  <div className="info-section">
                    <h3>Booking Information</h3>
                    <div className="info-items">
                      <div className="info-item">
                        <Calendar size={20} />
                        <div>
                          <span>Date</span>
                          <strong>
                            {new Date(foundReservation.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </strong>
                        </div>
                      </div>
                      <div className="info-item">
                        <Clock size={20} />
                        <div>
                          <span>Time</span>
                          <strong>{foundReservation.time}</strong>
                        </div>
                      </div>
                      <div className="info-item">
                        <Users size={20} />
                        <div>
                          <span>Party Size</span>
                          <strong>
                            {foundReservation.guests}{" "}
                            {foundReservation.guests === 1 ? "Guest" : "Guests"}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Contact Details</h3>
                    <div className="info-items">
                      <div className="info-item">
                        <User size={20} />
                        <div>
                          <span>Name</span>
                          <strong>{foundReservation.name}</strong>
                        </div>
                      </div>
                      <div className="info-item">
                        <Mail size={20} />
                        <div>
                          <span>Email</span>
                          <strong>{foundReservation.email}</strong>
                        </div>
                      </div>
                      <div className="info-item">
                        <Phone size={20} />
                        <div>
                          <span>Phone</span>
                          <strong>{foundReservation.phone}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {foundReservation.occasion && (
                  <div className="special-details">
                    <h4>Special Occasion</h4>
                    <p>
                      {
                        occasions.find(
                          (o) => o.id === foundReservation.occasion
                        )?.name
                      }
                    </p>
                  </div>
                )}

                {foundReservation.specialRequests && (
                  <div className="special-details">
                    <h4>Special Requests</h4>
                    <p>{foundReservation.specialRequests}</p>
                  </div>
                )}

                {foundReservation.status === "confirmed" && (
                  <div className="management-actions">
                    <button
                      className="modify-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit size={16} />
                      Modify Reservation
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setShowCancelConfirm(true)}
                    >
                      <X size={16} />
                      Cancel Reservation
                    </button>
                  </div>
                )}

                <div className="confirmation-code">
                  <strong>Confirmation Code: {foundReservation.id}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Reservation Not Found */}
      {foundReservation === "not_found" && (
        <div className="not-found-container">
          <div className="container">
            <div className="not-found-content">
              <div className="not-found-icon">
                <Search size={48} />
              </div>
              <h2>Reservation Not Found</h2>
              <p>
                We couldn't find a reservation with those details. Please check
                your email and confirmation code, or contact us directly.
              </p>

              <div className="not-found-actions">
                <button
                  className="try-again-btn"
                  onClick={() => {
                    setFoundReservation(null);
                    setReservationLookup({ email: "", confirmationCode: "" });
                  }}
                >
                  Try Again
                </button>
                <a href={`tel:${restaurantInfo.phone}`} className="contact-btn">
                  <Phone size={16} />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="modal-overlay">
          <div className="cancel-modal">
            <div className="modal-header">
              <AlertTriangle size={24} />
              <h3>Cancel Reservation</h3>
            </div>

            <p>
              Are you sure you want to cancel your reservation for{" "}
              {foundReservation.guests} guests on{" "}
              {new Date(foundReservation.date).toLocaleDateString()}?
            </p>

            <div className="form-group">
              <label>Reason for cancellation (optional)</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              >
                <option value="">Select a reason...</option>
                {cancelReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => setShowCancelConfirm(false)}
              >
                Keep Reservation
              </button>
              <button
                className="modal-confirm-btn"
                onClick={handleCancelReservation}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Messages */}
      {currentMode === "cancelled" && (
        <div className="success-container">
          <div className="container">
            <div className="success-content">
              <div className="success-icon cancelled">
                <X size={40} />
              </div>
              <h1>Reservation Cancelled</h1>
              <p>
                Your reservation has been successfully cancelled. You should
                receive a confirmation email shortly.
              </p>

              <div className="success-actions">
                <button onClick={() => setCurrentMode("book")}>
                  Make New Reservation
                </button>
                <button onClick={() => (window.location.href = "/")}>
                  Back to Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentMode === "modified" && (
        <div className="success-container">
          <div className="container">
            <div className="success-content">
              <div className="success-icon modified">
                <Edit size={40} />
              </div>
              <h1>Reservation Modified</h1>
              <p>
                Your reservation has been successfully updated. You should
                receive a confirmation email with the new details.
              </p>

              <div className="success-actions">
                <button onClick={() => setCurrentMode("manage")}>
                  View Reservation
                </button>
                <button onClick={() => (window.location.href = "/")}>
                  Back to Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Original Booking Flow */}
      {((currentMode === "book" && !isConfirmed) || isEditing) && (
        <div className="reservation-container">
          <div className="container">
            <div className="reservation-layout">
              {/* Left Side - Form */}
              <div className="reservation-form-section">
                <div className="form-header">
                  <button
                    className="back-btn"
                    onClick={() => {
                      if (isEditing) {
                        setIsEditing(false);
                      } else {
                        window.history.back();
                      }
                    }}
                  >
                    <ArrowLeft size={20} />
                    Back
                  </button>
                  <h1>
                    {isEditing ? "Modify Reservation" : "Make a Reservation"}
                  </h1>
                  <p>
                    {isEditing
                      ? `Update your reservation details`
                      : `Reserve your table at ${restaurantInfo.name}`}
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="progress-steps">
                  <div
                    className={`step ${currentStep >= 1 ? "active" : ""} ${
                      currentStep > 1 ? "completed" : ""
                    }`}
                  >
                    <div className="step-number">1</div>
                    <span>Date & Time</span>
                  </div>
                  <div
                    className={`step ${currentStep >= 2 ? "active" : ""} ${
                      currentStep > 2 ? "completed" : ""
                    }`}
                  >
                    <div className="step-number">2</div>
                    <span>Your Details</span>
                  </div>
                  <div
                    className={`step ${currentStep >= 3 ? "active" : ""} ${
                      currentStep > 3 ? "completed" : ""
                    }`}
                  >
                    <div className="step-number">3</div>
                    <span>Special Requests</span>
                  </div>
                </div>

                <form
                  onSubmit={isEditing ? handleModifyReservation : handleSubmit}
                  className="reservation-form"
                >
                  {/* Step 1: Date & Time Selection */}
                  {currentStep === 1 && (
                    <div className="form-step">
                      <h2>When would you like to dine?</h2>

                      <div className="form-group">
                        <label>
                          <Calendar size={20} />
                          Select Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          min={today}
                          onChange={(e) =>
                            handleInputChange("date", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <Users size={20} />
                          Number of Guests
                        </label>
                        <div className="guest-selector">
                          <button
                            type="button"
                            className="guest-btn"
                            onClick={() => updateGuestCount(-1)}
                            disabled={formData.guests <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="guest-count">
                            {formData.guests}{" "}
                            {formData.guests === 1 ? "Guest" : "Guests"}
                          </span>
                          <button
                            type="button"
                            className="guest-btn"
                            onClick={() => updateGuestCount(1)}
                            disabled={formData.guests >= 12}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          <Clock size={20} />
                          Available Times
                        </label>
                        <div className="time-slots">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              className={`time-slot ${
                                selectedTimeSlot === time ? "selected" : ""
                              }`}
                              onClick={() => {
                                setSelectedTimeSlot(time);
                                handleInputChange("time", time);
                              }}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="next-btn"
                        onClick={nextStep}
                        disabled={!isStepValid()}
                      >
                        Continue
                      </button>
                    </div>
                  )}

                  {/* Step 2: Personal Information */}
                  {currentStep === 2 && (
                    <div className="form-step">
                      <h2>Your Information</h2>

                      <div className="form-row">
                        <div className="form-group">
                          <label>
                            <User size={20} />
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>
                            <Mail size={20} />
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>
                            <Phone size={20} />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="(555) 123-4567"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-actions">
                        <button
                          type="button"
                          className="prev-btn"
                          onClick={prevStep}
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          className="next-btn"
                          onClick={nextStep}
                          disabled={!isStepValid()}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Special Requests */}
                  {currentStep === 3 && (
                    <div className="form-step">
                      <h2>Special Requests</h2>

                      <div className="form-group">
                        <label>What's the occasion?</label>
                        <div className="occasions-grid">
                          {occasions.map((occasion) => (
                            <button
                              key={occasion.id}
                              type="button"
                              className={`occasion-btn ${
                                formData.occasion === occasion.id
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                handleInputChange("occasion", occasion.id)
                              }
                            >
                              {occasion.icon}
                              <span>{occasion.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          <MessageSquare size={20} />
                          Additional Requests
                        </label>
                        <textarea
                          value={formData.specialRequests}
                          onChange={(e) =>
                            handleInputChange("specialRequests", e.target.value)
                          }
                          placeholder="Any dietary restrictions, seating preferences, or special requests..."
                          rows={4}
                        />
                      </div>

                      <div className="form-actions">
                        <button
                          type="button"
                          className="prev-btn"
                          onClick={prevStep}
                        >
                          Previous
                        </button>
                        <button
                          type="submit"
                          className="submit-btn"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? isEditing
                              ? "Updating..."
                              : "Confirming..."
                            : isEditing
                            ? "Update Reservation"
                            : "Confirm Reservation"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Right Side - Summary Card */}
              <div className="reservation-summary">
                <div className="summary-card">
                  <div className="summary-header">
                    <h3>Reservation Summary</h3>
                    <div className="restaurant-badge">
                      <Utensils size={16} />
                      <span>{restaurantInfo.name}</span>
                    </div>
                  </div>

                  <div className="summary-details">
                    {formData.date && (
                      <div className="summary-item">
                        <Calendar size={16} />
                        <div>
                          <span>Date</span>
                          <strong>
                            {new Date(formData.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </strong>
                        </div>
                      </div>
                    )}

                    {selectedTimeSlot && (
                      <div className="summary-item">
                        <Clock size={16} />
                        <div>
                          <span>Time</span>
                          <strong>{selectedTimeSlot}</strong>
                        </div>
                      </div>
                    )}

                    {formData.guests && (
                      <div className="summary-item">
                        <Users size={16} />
                        <div>
                          <span>Guests</span>
                          <strong>
                            {formData.guests}{" "}
                            {formData.guests === 1 ? "Guest" : "Guests"}
                          </strong>
                        </div>
                      </div>
                    )}

                    {formData.name && (
                      <div className="summary-item">
                        <User size={16} />
                        <div>
                          <span>Name</span>
                          <strong>{formData.name}</strong>
                        </div>
                      </div>
                    )}

                    {formData.occasion && (
                      <div className="summary-item">
                        <Gift size={16} />
                        <div>
                          <span>Occasion</span>
                          <strong>
                            {
                              occasions.find((o) => o.id === formData.occasion)
                                ?.name
                            }
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="summary-note">
                    <p>
                      We'll hold your table for 15 minutes past your reservation
                      time.
                    </p>
                  </div>
                </div>

                <div className="contact-card">
                  <h4>Need Help?</h4>
                  <p>
                    Call us directly for special arrangements or large parties.
                  </p>
                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    className="contact-btn"
                  >
                    <Phone size={16} />
                    {restaurantInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Original Confirmation Page */}
      {currentMode === "book" && isConfirmed && (
        <div className="confirmation-container">
          <div className="container">
            <div className="confirmation-content">
              <div className="success-animation">
                <div className="check-circle">
                  <Check size={40} />
                </div>
              </div>

              <h1>Reservation Confirmed!</h1>
              <p>
                Thank you for choosing {restaurantInfo.name}. We're excited to
                host you!
              </p>

              <div className="confirmation-details">
                <h3>Reservation Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <Calendar size={20} />
                    <div>
                      <span>Date</span>
                      <strong>
                        {new Date(formData.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <Clock size={20} />
                    <div>
                      <span>Time</span>
                      <strong>{formData.time}</strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <Users size={20} />
                    <div>
                      <span>Party Size</span>
                      <strong>
                        {formData.guests}{" "}
                        {formData.guests === 1 ? "Guest" : "Guests"}
                      </strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <User size={20} />
                    <div>
                      <span>Reserved for</span>
                      <strong>{formData.name}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="confirmation-actions">
                <button
                  className="primary-action"
                  onClick={() => (window.location.href = "/")}
                >
                  Back to Homepage
                </button>
                <button
                  className="secondary-action"
                  onClick={() => window.print()}
                >
                  Print Confirmation
                </button>
              </div>

              <div className="next-steps">
                <h4>What's Next?</h4>
                <ul>
                  <li>You'll receive a confirmation email shortly</li>
                  <li>
                    We'll send a reminder 24 hours before your reservation
                  </li>
                  <li>Please arrive 5-10 minutes early</li>
                  <li>Call us if you need to make any changes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
