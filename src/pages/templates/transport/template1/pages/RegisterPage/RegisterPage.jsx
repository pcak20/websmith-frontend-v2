import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Phone,
  Car,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle successful registration here
      console.log("Registration attempt:", formData);
    }, 2000);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    return strength;
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength < 2) return "#ef4444";
    if (strength < 4) return "#f59e0b";
    return "#10b981";
  };

  const getStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength < 2) return "Weak";
    if (strength < 4) return "Medium";
    return "Strong";
  };

  return (
    <div className="register-page">
      {/* Background Image */}
      <div className="register-background">
        <div className="register-overlay"></div>
        <img
          src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1920&h=1080&fit=crop"
          alt="Luxury car fleet"
          className="background-image"
        />
      </div>

      <div className="register-container">
        {/* Left Side - Branding */}
        <div className="register-branding">
          <div className="brand-content">
            <div className="brand-header">
              <Car size={48} className="brand-icon" />
              <h1 className="brand-title">VIP Transport</h1>
            </div>

            <h2 className="welcome-title">Join the Elite</h2>
            <p className="welcome-subtitle">
              Create your premium account and experience luxury transportation
              like never before.
            </p>

            <div className="brand-benefits">
              <div className="benefit-item">
                <Shield size={20} />
                <div>
                  <h4>Premium Security</h4>
                  <p>Your data is protected with enterprise-grade security</p>
                </div>
              </div>
              <div className="benefit-item">
                <Award size={20} />
                <div>
                  <h4>VIP Treatment</h4>
                  <p>Exclusive access to our luxury fleet and services</p>
                </div>
              </div>
              <div className="benefit-item">
                <Car size={20} />
                <div>
                  <h4>Premium Fleet</h4>
                  <p>Mercedes, BMW, Tesla, and Rolls Royce vehicles</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="register-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">Create Account</h2>
              <p className="form-subtitle">
                {step === 1 ? "Tell us about yourself" : "Secure your account"}
              </p>

              {/* Progress Indicator */}
              <div className="progress-indicator">
                <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
                  <div className="step-number">1</div>
                  <span>Personal Info</span>
                </div>
                <div className="progress-line"></div>
                <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
                  <div className="step-number">2</div>
                  <span>Account Setup</span>
                </div>
              </div>
            </div>

            {step === 1 ? (
              /* Step 1: Personal Information */
              <form className="register-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <div className="input-wrapper">
                      <User size={20} className="input-icon" />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`form-input ${
                          errors.firstName ? "error" : ""
                        }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <div className="input-wrapper">
                      <User size={20} className="input-icon" />
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`form-input ${
                          errors.lastName ? "error" : ""
                        }`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <Mail size={20} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? "error" : ""}`}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <div className="input-wrapper">
                    <Phone size={20} className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input ${errors.phone ? "error" : ""}`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="submit-btn"
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              </form>
            ) : (
              /* Step 2: Account Setup */
              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-wrapper">
                    <Lock size={20} className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-input ${errors.password ? "error" : ""}`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => togglePasswordVisibility("password")}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div
                          className="strength-fill"
                          style={{
                            width: `${(getPasswordStrength() / 5) * 100}%`,
                            backgroundColor: getStrengthColor(),
                          }}
                        ></div>
                      </div>
                      <span
                        className="strength-text"
                        style={{ color: getStrengthColor() }}
                      >
                        {getStrengthText()}
                      </span>
                    </div>
                  )}
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-wrapper">
                    <Lock size={20} className="input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.confirmPassword ? "error" : ""
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => togglePasswordVisibility("confirm")}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword && (
                      <div className="password-match">
                        <CheckCircle size={16} />
                        <span>Passwords match</span>
                      </div>
                    )}
                  {errors.confirmPassword && (
                    <span className="error-message">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Terms and Newsletter */}
                <div className="form-checkboxes">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>I agree to the{" "}
                    <Link to="/terms" className="link">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="link">
                      Privacy Policy
                    </Link>
                  </label>
                  {errors.agreeToTerms && (
                    <span className="error-message">{errors.agreeToTerms}</span>
                  )}

                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Send me updates about new services and exclusive offers
                  </label>
                </div>

                {/* Buttons */}
                <div className="form-buttons">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="back-btn"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Social Registration - Only on Step 1 */}
            {step === 1 && (
              <>
                <div className="divider">
                  <span>or</span>
                </div>

                <button type="button" className="social-btn">
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    className="social-icon"
                  />
                  Continue with Google
                </button>
              </>
            )}

            {/* Login Link */}
            <div className="login-link">
              <span>Already have an account? </span>
              <Link to="/login" className="login-btn">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
