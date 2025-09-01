import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  Chrome,
  ArrowLeft,
  CheckCircle,
  Loader,
  Shield,
  User,
  Check,
  X,
} from "lucide-react";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    isLoading,
    errors,
    isAuthenticated,
    user,
    clearErrors,
    clearSuccessMessage,
    successMessage,
  } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    // Clear errors when component unmounts
    return () => {
      clearErrors();
      clearSuccessMessage();
    };
  }, []);

  // Password strength calculator
  const calculatePasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (!password) {
      return { score: 0, feedback: [] };
    }

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push("At least 8 characters");
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One uppercase letter");
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One lowercase letter");
    }

    // Number check
    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push("One number");
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One special character");
    }

    return { score, feedback };
  };

  const validateForm = () => {
    const errors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (passwordStrength.score < 3) {
      errors.password = "Password is too weak";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement validation
    if (!agreeToTerms) {
      errors.terms = "You must agree to the Terms of Service";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Calculate password strength for password field
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear validation errors when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Clear global errors when user modifies form
    if (errors.register) {
      clearErrors();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const resultAction = await register({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        subscribe_newsletter: subscribeNewsletter,
      });

      if (register.fulfilled.match(resultAction)) {
        // Registration successful - show success message or redirect
        console.log("Registration successful");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      // TODO: Implement Google OAuth registration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Google sign up not implemented yet");
    } catch (err) {
      console.error("Google sign up failed:", err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    passwordStrength.score >= 3 &&
    agreeToTerms &&
    Object.keys(validationErrors).length === 0;

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 1) return "#ef4444";
    if (passwordStrength.score <= 2) return "#f59e0b";
    if (passwordStrength.score <= 3) return "#3b82f6";
    return "#10b981";
  };

  const getPasswordStrengthText = () => {
    if (!formData.password) return "";
    if (passwordStrength.score <= 1) return "Weak";
    if (passwordStrength.score <= 2) return "Fair";
    if (passwordStrength.score <= 3) return "Good";
    return "Strong";
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backLink} onClick={() => navigate("/")}>
            <ArrowLeft size={20} />
            Back to WebCraft
          </button>
        </div>

        <div className={styles.registerCard}>
          {/* Logo and Title */}
          <div className={styles.registerHeader}>
            <div className={styles.logo}>WebCraft</div>
            <h1>Create your account</h1>
            <p>
              Start building beautiful websites for your business in minutes
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className={styles.successAlert}>
              <CheckCircle size={16} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            {/* Global Error Alert */}
            {errors.register && (
              <div className={styles.errorAlert}>
                <AlertCircle size={16} />
                <span>{errors.register}</span>
              </div>
            )}

            {/* Name Fields Row */}
            <div className={styles.nameRow}>
              {/* First Name Field */}
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <div
                  className={`${styles.inputGroup} ${
                    validationErrors.firstName ? styles.inputError : ""
                  }`}
                >
                  <User size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                    disabled={isLoading}
                    autoComplete="given-name"
                    aria-invalid={!!validationErrors.firstName}
                    aria-describedby={
                      validationErrors.firstName ? "firstName-error" : undefined
                    }
                  />
                </div>
                {validationErrors.firstName && (
                  <div id="firstName-error" className={styles.fieldError}>
                    <AlertCircle size={14} />
                    {validationErrors.firstName}
                  </div>
                )}
              </div>

              {/* Last Name Field */}
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <div
                  className={`${styles.inputGroup} ${
                    validationErrors.lastName ? styles.inputError : ""
                  }`}
                >
                  <User size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                    disabled={isLoading}
                    autoComplete="family-name"
                    aria-invalid={!!validationErrors.lastName}
                    aria-describedby={
                      validationErrors.lastName ? "lastName-error" : undefined
                    }
                  />
                </div>
                {validationErrors.lastName && (
                  <div id="lastName-error" className={styles.fieldError}>
                    <AlertCircle size={14} />
                    {validationErrors.lastName}
                  </div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <div
                className={`${styles.inputGroup} ${
                  validationErrors.email ? styles.inputError : ""
                }`}
              >
                <Mail size={18} className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  aria-invalid={!!validationErrors.email}
                  aria-describedby={
                    validationErrors.email ? "email-error" : undefined
                  }
                />
              </div>
              {validationErrors.email && (
                <div id="email-error" className={styles.fieldError}>
                  <AlertCircle size={14} />
                  {validationErrors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div
                className={`${styles.inputGroup} ${
                  validationErrors.password ? styles.inputError : ""
                }`}
              >
                <Lock size={18} className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                  aria-invalid={!!validationErrors.password}
                  aria-describedby={
                    validationErrors.password ? "password-error" : undefined
                  }
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {validationErrors.password && (
                <div id="password-error" className={styles.fieldError}>
                  <AlertCircle size={14} />
                  {validationErrors.password}
                </div>
              )}
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className={styles.passwordStrength}>
                  <div className={styles.strengthBar}>
                    <div
                      className={styles.strengthFill}
                      style={{
                        width: `${(passwordStrength.score / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthColor(),
                      }}
                    />
                  </div>
                  <div className={styles.strengthInfo}>
                    <span
                      className={styles.strengthText}
                      style={{ color: getPasswordStrengthColor() }}
                    >
                      {getPasswordStrengthText()}
                    </span>
                    {passwordStrength.feedback.length > 0 && (
                      <div className={styles.strengthFeedback}>
                        Missing: {passwordStrength.feedback.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div
                className={`${styles.inputGroup} ${
                  validationErrors.confirmPassword ? styles.inputError : ""
                }`}
              >
                <Lock size={18} className={styles.inputIcon} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                  aria-invalid={!!validationErrors.confirmPassword}
                  aria-describedby={
                    validationErrors.confirmPassword
                      ? "confirmPassword-error"
                      : undefined
                  }
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className={styles.matchIndicator}>
                    {formData.password === formData.confirmPassword ? (
                      <Check size={16} className={styles.matchSuccess} />
                    ) : (
                      <X size={16} className={styles.matchError} />
                    )}
                  </div>
                )}
              </div>
              {validationErrors.confirmPassword && (
                <div id="confirmPassword-error" className={styles.fieldError}>
                  <AlertCircle size={14} />
                  {validationErrors.confirmPassword}
                </div>
              )}
            </div>

            {/* Form Options */}
            <div className={styles.formOptions}>
              {/* Terms Agreement */}
              <div className={styles.checkboxContainer}>
                <label
                  className={`${styles.checkboxLabel} ${
                    validationErrors.terms ? styles.checkboxError : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    disabled={isLoading}
                    required
                  />
                  <span className={styles.checkmark}></span>
                  <span>
                    I agree to the{" "}
                    <button
                      type="button"
                      className={styles.linkButton}
                      onClick={() => navigate("/terms")}
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className={styles.linkButton}
                      onClick={() => navigate("/privacy")}
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {validationErrors.terms && (
                  <div className={styles.fieldError}>
                    <AlertCircle size={14} />
                    {validationErrors.terms}
                  </div>
                )}
              </div>

              {/* Newsletter Subscription */}
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  disabled={isLoading}
                />
                <span className={styles.checkmark}></span>
                <span>Send me updates about new features and templates</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <>
                  <Loader size={18} className={styles.spinner} />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span>Or sign up with</span>
          </div>

          {/* Social Login */}
          <div className={styles.socialLogin}>
            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogleSignUp}
              disabled={isLoading || isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader size={18} className={styles.spinner} />
              ) : (
                <Chrome size={18} />
              )}
              <span>Sign up with Google</span>
            </button>
          </div>

          {/* Footer */}
          <div className={styles.registerFooter}>
            <p>
              Already have an account?{" "}
              <button
                className={styles.loginLink}
                onClick={() => navigate("/login")}
              >
                Sign in here
              </button>
            </p>
            <div className={styles.helpLinks}>
              <button
                className={styles.helpLink}
                onClick={() => navigate("/help/signup")}
              >
                Need help signing up?
              </button>
              <button
                className={styles.helpLink}
                onClick={() => navigate("/contact")}
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <h3>Start building today</h3>
          <div className={styles.featuresList}>
            <div className={styles.feature}>
              <CheckCircle size={16} />
              <span>Professional templates to get started quickly</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={16} />
              <span>Drag-and-drop website builder</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={16} />
              <span>Custom domain and SSL certificate</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={16} />
              <span>Built-in analytics and SEO tools</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={16} />
              <span>Mobile-responsive designs</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className={styles.securityNotice}>
          <Shield size={14} />
          <span>Your account is protected with enterprise-grade security</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
