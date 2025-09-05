import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  Star,
  User,
  Mail,
  Phone,
  CreditCard,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Info,
  Shield,
  Award,
  Wifi,
  Coffee,
  Building,
  Plane,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import "./BookingFlow.css";

// Vehicle data
const vehicleData = [
  {
    id: 1,
    name: "Mercedes S-Class",
    category: "luxury",
    seats: 4,
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
    pricePerKm: 3.5,
    pricePerHour: 120,
    features: ["Premium Leather", "Climate Control", "WiFi", "Refreshments"],
    rating: 4.9,
    description: "The epitome of luxury and comfort for executive travel.",
  },
  {
    id: 2,
    name: "BMW 7 Series",
    category: "luxury",
    seats: 4,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    pricePerKm: 3.2,
    pricePerHour: 115,
    features: [
      "Massage Seats",
      "Entertainment System",
      "Mini Bar",
      "Privacy Glass",
    ],
    rating: 4.8,
    description: "Advanced technology meets luxury comfort.",
  },
  {
    id: 3,
    name: "Tesla Model S",
    category: "electric-luxury",
    seats: 5,
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop",
    pricePerKm: 2.8,
    pricePerHour: 95,
    features: ["Autopilot", "Premium Audio", "Glass Roof", "Eco-Friendly"],
    rating: 4.7,
    description: "Cutting-edge electric luxury with zero emissions.",
  },
  {
    id: 4,
    name: "Range Rover Vogue",
    category: "suv",
    seats: 7,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop",
    pricePerKm: 4.2,
    pricePerHour: 140,
    features: [
      "All-Terrain",
      "Premium Sound",
      "Panoramic Roof",
      "Luxury Seating",
    ],
    rating: 4.6,
    description: "Luxury SUV combining elegance with capability.",
  },
  {
    id: 5,
    name: "Rolls Royce Ghost",
    category: "ultra-luxury",
    seats: 4,
    image:
      "https://images.unsplash.com/photo-1631295868785-3ac2dcf14c4c?w=400&h=300&fit=crop",
    pricePerKm: 8.0,
    pricePerHour: 300,
    features: [
      "Chauffeur Service",
      "Champagne Service",
      "Starlight Headliner",
      "Handcrafted Interior",
    ],
    rating: 5.0,
    description: "The ultimate in automotive luxury and prestige.",
  },
];

// Payment methods
const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "corporate",
    name: "Corporate Account",
    icon: Building,
    description: "Bill to company account",
  },
  {
    id: "cash",
    name: "Cash Payment",
    icon: User,
    description: "Pay driver directly",
  },
];

// Country codes for phone numbers
const countryCodes = [
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
];

const steps = [
  "Trip Details",
  "Select Vehicle",
  "Passenger & Payment",
  "Review & Book",
];

const BookingFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [countryCode, setCountryCode] = useState("+1");
  const [showCardCVV, setShowCardCVV] = useState(false);
  const [bookingData, setBookingData] = useState({
    // Step 1: Trip Details
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: 1,
    tripType: "one-way",
    returnDate: "",
    returnTime: "",
    specialRequests: "",

    // Step 2: Vehicle Selection
    selectedVehicle: null,

    // Step 3: Passenger Details & Payment
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    flightNumber: "",

    // Payment Information
    paymentMethod: "card",
    cardDetails: {
      number: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      nameOnCard: "",
      billingZip: "",
    },

    // Additional data
    estimatedDistance: 25, // km
    estimatedDuration: 45, // minutes
    totalPrice: 0,
    finalTotal: 0,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if pre-selected vehicle from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const vehicleId = params.get("vehicle");
    if (vehicleId) {
      const vehicle = vehicleData.find((v) => v.id === parseInt(vehicleId));
      if (vehicle) {
        setBookingData((prev) => ({ ...prev, selectedVehicle: vehicle }));
        if (currentStep < 1) setCurrentStep(1);
      }
    }
  }, [location.search]);

  // Calculate price when vehicle or trip details change
  useEffect(() => {
    if (bookingData.selectedVehicle) {
      const vehicle = bookingData.selectedVehicle;
      const distancePrice = bookingData.estimatedDistance * vehicle.pricePerKm;
      const hourlyPrice =
        (bookingData.estimatedDuration / 60) * vehicle.pricePerHour;
      const basePrice = Math.max(distancePrice, hourlyPrice);
      const tripPrice =
        bookingData.tripType === "round-trip" ? basePrice * 1.8 : basePrice;

      // Add service fee and tax
      const serviceFee = tripPrice * 0.08; // 8% service fee
      const tax = (tripPrice + serviceFee) * 0.0825; // 8.25% tax
      const finalTotal = Math.round(tripPrice + serviceFee + tax);

      setBookingData((prev) => ({
        ...prev,
        totalPrice: Math.round(tripPrice),
        finalTotal: finalTotal,
      }));
    }
  }, [
    bookingData.selectedVehicle,
    bookingData.estimatedDistance,
    bookingData.estimatedDuration,
    bookingData.tripType,
  ]);

  const updateBookingData = (field, value) => {
    setBookingData((prev) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhoneChange = (value) => {
    const fullPhone = countryCode + " " + value;
    updateBookingData("phone", fullPhone);
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value, field) => {
    const numericValue = value.replace(/\D/g, "");
    if (field === "expiryMonth") {
      return numericValue.slice(0, 2);
    } else if (field === "expiryYear") {
      return numericValue.slice(0, 4);
    }
    return numericValue;
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Trip Details
        if (!bookingData.pickup.trim())
          newErrors.pickup = "Pickup location is required";
        if (!bookingData.dropoff.trim())
          newErrors.dropoff = "Drop-off location is required";
        if (!bookingData.date) newErrors.date = "Date is required";
        if (!bookingData.time) newErrors.time = "Time is required";
        if (bookingData.passengers < 1)
          newErrors.passengers = "At least 1 passenger required";
        if (bookingData.tripType === "round-trip") {
          if (!bookingData.returnDate)
            newErrors.returnDate = "Return date is required";
          if (!bookingData.returnTime)
            newErrors.returnTime = "Return time is required";
        }
        break;

      case 1: // Vehicle Selection
        if (!bookingData.selectedVehicle)
          newErrors.selectedVehicle = "Please select a vehicle";
        break;

      case 2: // Passenger Details & Payment
        if (!bookingData.firstName.trim())
          newErrors.firstName = "First name is required";
        if (!bookingData.lastName.trim())
          newErrors.lastName = "Last name is required";
        if (!bookingData.email.trim()) newErrors.email = "Email is required";
        if (bookingData.email && !/\S+@\S+\.\S+/.test(bookingData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        if (!bookingData.phone.trim())
          newErrors.phone = "Phone number is required";

        // Payment validation for card payment
        if (bookingData.paymentMethod === "card") {
          if (!bookingData.cardDetails.number.replace(/\s/g, "")) {
            newErrors.cardNumber = "Card number is required";
          } else if (
            bookingData.cardDetails.number.replace(/\s/g, "").length < 15
          ) {
            newErrors.cardNumber = "Please enter a valid card number";
          }

          if (!bookingData.cardDetails.expiryMonth) {
            newErrors.expiryMonth = "Expiry month is required";
          } else if (
            parseInt(bookingData.cardDetails.expiryMonth) < 1 ||
            parseInt(bookingData.cardDetails.expiryMonth) > 12
          ) {
            newErrors.expiryMonth = "Invalid month";
          }

          if (!bookingData.cardDetails.expiryYear) {
            newErrors.expiryYear = "Expiry year is required";
          } else if (bookingData.cardDetails.expiryYear.length !== 4) {
            newErrors.expiryYear = "Please enter full year (YYYY)";
          }

          if (!bookingData.cardDetails.cvv) {
            newErrors.cvv = "CVV is required";
          } else if (bookingData.cardDetails.cvv.length < 3) {
            newErrors.cvv = "CVV must be 3-4 digits";
          }

          if (!bookingData.cardDetails.nameOnCard.trim()) {
            newErrors.nameOnCard = "Cardholder name is required";
          }

          if (!bookingData.cardDetails.billingZip.trim()) {
            newErrors.billingZip = "Billing ZIP code is required";
          }
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate booking reference
      const bookingRef =
        "VIP" + Math.random().toString(36).substr(2, 6).toUpperCase();

      // Navigate to success page with booking data
      navigate("/transport/booking/booking-success", {
        state: {
          bookingRef,
          bookingData,
          message: "Your luxury transportation has been booked successfully!",
        },
      });
    } catch (error) {
      console.error("Booking failed:", error);
      setErrors({ submit: "Booking failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Trip Details</h2>
              <p className="step-description">
                Let us know where you're going and when
              </p>
            </div>

            <div className="form-section">
              <div className="trip-type-selector">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    checked={bookingData.tripType === "one-way"}
                    onChange={(e) =>
                      updateBookingData("tripType", e.target.value)
                    }
                  />
                  <span className="radio-label">One Way</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    checked={bookingData.tripType === "round-trip"}
                    onChange={(e) =>
                      updateBookingData("tripType", e.target.value)
                    }
                  />
                  <span className="radio-label">Round Trip</span>
                </label>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <MapPin size={16} />
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.pickup ? "error" : ""}`}
                    placeholder="Enter pickup address"
                    value={bookingData.pickup}
                    onChange={(e) =>
                      updateBookingData("pickup", e.target.value)
                    }
                  />
                  {errors.pickup && (
                    <span className="error-message">{errors.pickup}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MapPin size={16} />
                    Drop-off Location
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.dropoff ? "error" : ""}`}
                    placeholder="Enter destination address"
                    value={bookingData.dropoff}
                    onChange={(e) =>
                      updateBookingData("dropoff", e.target.value)
                    }
                  />
                  {errors.dropoff && (
                    <span className="error-message">{errors.dropoff}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Calendar size={16} />
                    Date
                  </label>
                  <input
                    type="date"
                    className={`form-input ${errors.date ? "error" : ""}`}
                    min={getTomorrowDate()}
                    value={bookingData.date}
                    onChange={(e) => updateBookingData("date", e.target.value)}
                  />
                  {errors.date && (
                    <span className="error-message">{errors.date}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Clock size={16} />
                    Time
                  </label>
                  <input
                    type="time"
                    className={`form-input ${errors.time ? "error" : ""}`}
                    value={bookingData.time}
                    onChange={(e) => updateBookingData("time", e.target.value)}
                  />
                  {errors.time && (
                    <span className="error-message">{errors.time}</span>
                  )}
                </div>

                {bookingData.tripType === "round-trip" && (
                  <>
                    <div className="form-group">
                      <label className="form-label">
                        <Calendar size={16} />
                        Return Date
                      </label>
                      <input
                        type="date"
                        className={`form-input ${
                          errors.returnDate ? "error" : ""
                        }`}
                        min={bookingData.date || getTomorrowDate()}
                        value={bookingData.returnDate}
                        onChange={(e) =>
                          updateBookingData("returnDate", e.target.value)
                        }
                      />
                      {errors.returnDate && (
                        <span className="error-message">
                          {errors.returnDate}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Clock size={16} />
                        Return Time
                      </label>
                      <input
                        type="time"
                        className={`form-input ${
                          errors.returnTime ? "error" : ""
                        }`}
                        value={bookingData.returnTime}
                        onChange={(e) =>
                          updateBookingData("returnTime", e.target.value)
                        }
                      />
                      {errors.returnTime && (
                        <span className="error-message">
                          {errors.returnTime}
                        </span>
                      )}
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label className="form-label">
                    <Users size={16} />
                    Passengers
                  </label>
                  <select
                    className={`form-input ${errors.passengers ? "error" : ""}`}
                    value={bookingData.passengers}
                    onChange={(e) =>
                      updateBookingData("passengers", parseInt(e.target.value))
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} Passenger{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  {errors.passengers && (
                    <span className="error-message">{errors.passengers}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Special Requests (Optional)
                </label>
                <textarea
                  className="form-textarea"
                  placeholder="Child seat, airport assistance, special occasion, etc."
                  value={bookingData.specialRequests}
                  onChange={(e) =>
                    updateBookingData("specialRequests", e.target.value)
                  }
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Select Your Vehicle</h2>
              <p className="step-description">Choose from our premium fleet</p>
            </div>

            {errors.selectedVehicle && (
              <div className="error-banner">
                <AlertCircle size={16} />
                {errors.selectedVehicle}
              </div>
            )}

            <div className="vehicle-grid">
              {vehicleData.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`vehicle-option ${
                    bookingData.selectedVehicle?.id === vehicle.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => updateBookingData("selectedVehicle", vehicle)}
                >
                  <div className="vehicle-image">
                    <img src={vehicle.image} alt={vehicle.name} />
                    {bookingData.selectedVehicle?.id === vehicle.id && (
                      <div className="selected-overlay">
                        <CheckCircle size={32} />
                      </div>
                    )}
                  </div>

                  <div className="vehicle-info">
                    <div className="vehicle-header">
                      <h3 className="vehicle-name">{vehicle.name}</h3>
                      <div className="vehicle-rating">
                        <Star size={14} className="star-filled" />
                        <span>{vehicle.rating}</span>
                      </div>
                    </div>

                    <p className="vehicle-description">{vehicle.description}</p>

                    <div className="vehicle-capacity">
                      <Users size={16} />
                      <span>Up to {vehicle.seats} passengers</span>
                    </div>

                    <div className="vehicle-features">
                      {vehicle.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="vehicle-pricing">
                      <div className="price-main">
                        $
                        {Math.round(
                          bookingData.estimatedDistance * vehicle.pricePerKm
                        )}
                      </div>
                      <div className="price-detail">
                        ${vehicle.pricePerKm}/km • ${vehicle.pricePerHour}/hr
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="booking-summary-preview">
              <div className="summary-row">
                <span>Estimated Distance:</span>
                <span>{bookingData.estimatedDistance} km</span>
              </div>
              <div className="summary-row">
                <span>Estimated Duration:</span>
                <span>{bookingData.estimatedDuration} minutes</span>
              </div>
              {bookingData.tripType === "round-trip" && (
                <div className="summary-row">
                  <span>Trip Type:</span>
                  <span>Round Trip (1.8x multiplier)</span>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Passenger & Payment Information</h2>
              <p className="step-description">
                We need your details and payment method to complete the booking
              </p>
            </div>

            <div className="form-sections">
              {/* Passenger Information Section */}
              <div className="form-section">
                <div className="section-title-with-icon">
                  <User size={20} />
                  <h3>Passenger Information</h3>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      First Name
                    </label>
                    <input
                      type="text"
                      className={`form-input ${
                        errors.firstName ? "error" : ""
                      }`}
                      placeholder="Enter your first name"
                      value={bookingData.firstName}
                      onChange={(e) =>
                        updateBookingData("firstName", e.target.value)
                      }
                    />
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-input ${errors.lastName ? "error" : ""}`}
                      placeholder="Enter your last name"
                      value={bookingData.lastName}
                      onChange={(e) =>
                        updateBookingData("lastName", e.target.value)
                      }
                    />
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={16} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-input ${errors.email ? "error" : ""}`}
                      placeholder="your.email@example.com"
                      value={bookingData.email}
                      onChange={(e) =>
                        updateBookingData("email", e.target.value)
                      }
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={16} />
                      Phone Number
                    </label>
                    <div className="phone-input-wrapper">
                      <select
                        className="country-select"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        className={`form-input ${errors.phone ? "error" : ""}`}
                        placeholder="555-123-4567"
                        value={
                          bookingData.phone
                            ? bookingData.phone.replace(countryCode + " ", "")
                            : ""
                        }
                        onChange={(e) => handlePhoneChange(e.target.value)}
                      />
                    </div>
                    {errors.phone && (
                      <span className="error-message">{errors.phone}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Building size={16} />
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Company or organization"
                      value={bookingData.companyName}
                      onChange={(e) =>
                        updateBookingData("companyName", e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Plane size={16} />
                      Flight Number (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="AA1234"
                      value={bookingData.flightNumber}
                      onChange={(e) =>
                        updateBookingData("flightNumber", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="form-section">
                <div className="section-title-with-icon">
                  <CreditCard size={20} />
                  <h3>Payment Method</h3>
                </div>

                <div className="payment-methods">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`payment-method ${
                        bookingData.paymentMethod === method.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        updateBookingData("paymentMethod", method.id)
                      }
                    >
                      <div className="payment-icon">
                        <method.icon size={24} />
                      </div>
                      <div className="payment-content">
                        <h4 className="payment-name">{method.name}</h4>
                        <p className="payment-description">
                          {method.description}
                        </p>
                      </div>
                      <div className="payment-radio">
                        <div
                          className={`radio-dot ${
                            bookingData.paymentMethod === method.id
                              ? "selected"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Payment Form */}
                {bookingData.paymentMethod === "card" && (
                  <div className="payment-details">
                    <div className="card-form">
                      <div className="form-group">
                        <label className="form-label">
                          <CreditCard size={16} />
                          Card Number
                        </label>
                        <input
                          type="text"
                          className={`form-input ${
                            errors.cardNumber ? "error" : ""
                          }`}
                          placeholder="1234 5678 9012 3456"
                          value={formatCardNumber(
                            bookingData.cardDetails.number
                          )}
                          onChange={(e) =>
                            updateBookingData(
                              "cardDetails.number",
                              e.target.value.replace(/\s/g, "")
                            )
                          }
                          maxLength={19}
                        />
                        {errors.cardNumber && (
                          <span className="error-message">
                            {errors.cardNumber}
                          </span>
                        )}
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Expiry Month</label>
                          <input
                            type="text"
                            className={`form-input ${
                              errors.expiryMonth ? "error" : ""
                            }`}
                            placeholder="MM"
                            value={bookingData.cardDetails.expiryMonth}
                            onChange={(e) =>
                              updateBookingData(
                                "cardDetails.expiryMonth",
                                formatExpiry(e.target.value, "expiryMonth")
                              )
                            }
                            maxLength={2}
                          />
                          {errors.expiryMonth && (
                            <span className="error-message">
                              {errors.expiryMonth}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">Expiry Year</label>
                          <input
                            type="text"
                            className={`form-input ${
                              errors.expiryYear ? "error" : ""
                            }`}
                            placeholder="YYYY"
                            value={bookingData.cardDetails.expiryYear}
                            onChange={(e) =>
                              updateBookingData(
                                "cardDetails.expiryYear",
                                formatExpiry(e.target.value, "expiryYear")
                              )
                            }
                            maxLength={4}
                          />
                          {errors.expiryYear && (
                            <span className="error-message">
                              {errors.expiryYear}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <Lock size={16} />
                            CVV
                          </label>
                          <div className="cvv-input-wrapper">
                            <input
                              type={showCardCVV ? "text" : "password"}
                              className={`form-input ${
                                errors.cvv ? "error" : ""
                              }`}
                              placeholder="123"
                              value={bookingData.cardDetails.cvv}
                              onChange={(e) =>
                                updateBookingData(
                                  "cardDetails.cvv",
                                  e.target.value.replace(/\D/g, "").slice(0, 4)
                                )
                              }
                              maxLength={4}
                            />
                            <button
                              type="button"
                              className="cvv-toggle"
                              onClick={() => setShowCardCVV(!showCardCVV)}
                            >
                              {showCardCVV ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          </div>
                          {errors.cvv && (
                            <span className="error-message">{errors.cvv}</span>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <User size={16} />
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          className={`form-input ${
                            errors.nameOnCard ? "error" : ""
                          }`}
                          placeholder="Name as it appears on card"
                          value={bookingData.cardDetails.nameOnCard}
                          onChange={(e) =>
                            updateBookingData(
                              "cardDetails.nameOnCard",
                              e.target.value
                            )
                          }
                        />
                        {errors.nameOnCard && (
                          <span className="error-message">
                            {errors.nameOnCard}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <MapPin size={16} />
                          Billing ZIP Code
                        </label>
                        <input
                          type="text"
                          className={`form-input ${
                            errors.billingZip ? "error" : ""
                          }`}
                          placeholder="12345"
                          value={bookingData.cardDetails.billingZip}
                          onChange={(e) =>
                            updateBookingData(
                              "cardDetails.billingZip",
                              e.target.value
                            )
                          }
                        />
                        {errors.billingZip && (
                          <span className="error-message">
                            {errors.billingZip}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Corporate Account Info */}
                {bookingData.paymentMethod === "corporate" && (
                  <div className="payment-details">
                    <div className="info-banner">
                      <Info size={20} />
                      <div>
                        <p>
                          <strong>Corporate Account Required</strong>
                        </p>
                        <p>
                          This option requires a pre-approved corporate account.
                          Contact our sales team to set up corporate billing.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cash Payment Info */}
                {bookingData.paymentMethod === "cash" && (
                  <div className="payment-details">
                    <div className="info-banner warning">
                      <Info size={20} />
                      <div>
                        <p>
                          <strong>Cash Payment</strong>
                        </p>
                        <p>
                          You'll pay the driver directly. Please have exact
                          change ready. A 20% gratuity is recommended for
                          exceptional service.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="security-notice">
                  <div className="security-content">
                    <div className="security-icon">
                      <Shield size={24} />
                    </div>
                    <div className="security-text">
                      <h4>Your Information is Secure</h4>
                      <p>
                        We use industry-standard 256-bit SSL encryption to
                        protect your personal and payment information.
                      </p>
                    </div>
                  </div>
                  <div className="security-badges">
                    <div className="security-badge">
                      <Lock size={16} />
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="security-badge">
                      <Shield size={16} />
                      <span>PCI Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2 className="step-title">Review & Confirm</h2>
              <p className="step-description">
                Please review your booking details
              </p>
            </div>

            <div className="review-section">
              {/* Trip Summary */}
              <div className="review-card">
                <h3 className="review-card-title">Trip Details</h3>
                <div className="review-details">
                  <div className="detail-row">
                    <span className="detail-label">From:</span>
                    <span className="detail-value">{bookingData.pickup}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">To:</span>
                    <span className="detail-value">{bookingData.dropoff}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date & Time:</span>
                    <span className="detail-value">
                      {new Date(bookingData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      at {bookingData.time}
                    </span>
                  </div>
                  {bookingData.tripType === "round-trip" && (
                    <div className="detail-row">
                      <span className="detail-label">Return:</span>
                      <span className="detail-value">
                        {new Date(bookingData.returnDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}{" "}
                        at {bookingData.returnTime}
                      </span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="detail-label">Passengers:</span>
                    <span className="detail-value">
                      {bookingData.passengers}
                    </span>
                  </div>
                  {bookingData.specialRequests && (
                    <div className="detail-row">
                      <span className="detail-label">Special Requests:</span>
                      <span className="detail-value">
                        {bookingData.specialRequests}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Vehicle Summary */}
              <div className="review-card">
                <h3 className="review-card-title">Selected Vehicle</h3>
                <div className="vehicle-summary">
                  <img
                    src={bookingData.selectedVehicle?.image}
                    alt={bookingData.selectedVehicle?.name}
                    className="vehicle-summary-image"
                  />
                  <div className="vehicle-summary-info">
                    <h4>{bookingData.selectedVehicle?.name}</h4>
                    <div className="vehicle-summary-features">
                      {bookingData.selectedVehicle?.features.map(
                        (feature, index) => (
                          <span key={index} className="feature-tag">
                            {feature}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Summary */}
              <div className="review-card">
                <h3 className="review-card-title">Passenger Information</h3>
                <div className="review-details">
                  <div className="detail-row">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">
                      {bookingData.firstName} {bookingData.lastName}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{bookingData.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{bookingData.phone}</span>
                  </div>
                  {bookingData.companyName && (
                    <div className="detail-row">
                      <span className="detail-label">Company:</span>
                      <span className="detail-value">
                        {bookingData.companyName}
                      </span>
                    </div>
                  )}
                  {bookingData.flightNumber && (
                    <div className="detail-row">
                      <span className="detail-label">Flight:</span>
                      <span className="detail-value">
                        {bookingData.flightNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="review-card">
                <h3 className="review-card-title">Payment & Pricing</h3>
                <div className="payment-method-summary">
                  <div className="payment-method-info">
                    <CreditCard size={20} />
                    <span>
                      {bookingData.paymentMethod === "card"
                        ? "Credit Card"
                        : bookingData.paymentMethod === "corporate"
                        ? "Corporate Account"
                        : "Cash Payment"}
                    </span>
                  </div>
                  {bookingData.paymentMethod === "card" &&
                    bookingData.cardDetails.number && (
                      <span className="card-last-four">
                        **** **** ****{" "}
                        {bookingData.cardDetails.number.slice(-4)}
                      </span>
                    )}
                </div>
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Base Rate ({bookingData.estimatedDistance}km)</span>
                    <span>${bookingData.totalPrice}</span>
                  </div>
                  <div className="price-row">
                    <span>Service Fee (8%)</span>
                    <span>${Math.round(bookingData.totalPrice * 0.08)}</span>
                  </div>
                  <div className="price-row">
                    <span>Tax (8.25%)</span>
                    <span>
                      $
                      {Math.round(
                        (bookingData.totalPrice +
                          bookingData.totalPrice * 0.08) *
                          0.0825
                      )}
                    </span>
                  </div>
                  {bookingData.tripType === "round-trip" && (
                    <div className="price-row highlight">
                      <span>Round Trip Included</span>
                      <span>✓</span>
                    </div>
                  )}
                  <div className="price-row total">
                    <span>Total</span>
                    <span>${bookingData.finalTotal}</span>
                  </div>
                </div>
              </div>

              {errors.submit && (
                <div className="error-banner">
                  <AlertCircle size={16} />
                  {errors.submit}
                </div>
              )}

              <div className="booking-guarantee">
                <div className="guarantee-item">
                  <Shield size={20} />
                  <span>Secure Payment Processing</span>
                </div>
                <div className="guarantee-item">
                  <Award size={20} />
                  <span>Professional Chauffeur Service</span>
                </div>
                <div className="guarantee-item">
                  <CheckCircle size={20} />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="booking-flow">
      <div className="container">
        {/* Progress Stepper */}
        <div className="stepper">
          {steps.map((step, index) => (
            <div key={index} className="stepper-item">
              <div
                className={`stepper-circle ${
                  index <= currentStep ? "active" : ""
                } ${index < currentStep ? "completed" : ""}`}
              >
                {index < currentStep ? <CheckCircle size={16} /> : index + 1}
              </div>
              <span className="stepper-label">{step}</span>
              {index < steps.length - 1 && (
                <div
                  className={`stepper-line ${
                    index < currentStep ? "completed" : ""
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="booking-content">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="booking-navigation">
          <button
            className="btn btn-outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={20} />
            Back
          </button>

          <div className="nav-info">
            Step {currentStep + 1} of {steps.length}
          </div>

          {currentStep < steps.length - 1 ? (
            <button className="btn btn-primary" onClick={nextStep}>
              Continue
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              className="btn btn-primary btn-lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Booking...
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Book Now - ${bookingData.finalTotal}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
