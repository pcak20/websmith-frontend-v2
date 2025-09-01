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
} from "lucide-react";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    login,
    isLoading,
    errors,
    isAuthenticated,
    user,
    auth,
    clearErrors,
    clearSuccessMessage,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

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

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
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

    // Clear validation errors when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Clear global errors when user modifies form
    if (errors.login) {
      clearErrors();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const resultAction = await login({
        email: formData.email,
        password: formData.password,
        rememberMe,
      });

      // The useAuth hook handles the success/failure logic
      // and will trigger the useEffect above for navigation
      if (login.fulfilled.match(resultAction)) {
        // Additional success handling if needed
        console.log("Login successful, redirecting...");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      // TODO: Implement Google OAuth with your backend
      // This would typically involve:
      // 1. Get Google OAuth URL from backend
      // 2. Redirect to Google OAuth
      // 3. Handle callback with authorization code
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Google login not implemented yet");
    } catch (err) {
      console.error("Google login failed:", err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const isFormValid =
    formData.email &&
    formData.password &&
    Object.keys(validationErrors).length === 0;
  const isBlocked = auth.loginAttempts >= 5;
  const showAttemptsWarning = auth.loginAttempts > 2 && auth.loginAttempts < 5;

  // Calculate time remaining if last attempt was recent
  const getTimeRemaining = () => {
    if (!auth.lastLoginAttempt || auth.loginAttempts < 5) return null;

    const timeSinceLastAttempt = Date.now() - auth.lastLoginAttempt;
    const lockoutDuration = 15 * 60 * 1000; // 15 minutes
    const timeRemaining = lockoutDuration - timeSinceLastAttempt;

    if (timeRemaining <= 0) return null;

    const minutes = Math.ceil(timeRemaining / (1000 * 60));
    return minutes;
  };

  const timeRemaining = getTimeRemaining();

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backLink} onClick={() => navigate("/")}>
            <ArrowLeft size={20} />
            Back to WebCraft
          </button>
        </div>

        <div className={styles.loginCard}>
          {/* Logo and Title */}
          <div className={styles.loginHeader}>
            <div className={styles.logo}>WebCraft</div>
            <h1>Welcome back</h1>
            <p>
              Sign in to your WebCraft account to manage your businesses and
              websites
            </p>
          </div>

          {/* Account Blocked Notice */}
          {isBlocked && (
            <div className={styles.blockedNotice}>
              <AlertCircle size={16} />
              <div>
                <strong>Account temporarily locked</strong>
                <p>
                  Too many failed login attempts.
                  {timeRemaining
                    ? ` Please try again in ${timeRemaining} minute${
                        timeRemaining !== 1 ? "s" : ""
                      }.`
                    : " Please try again later or reset your password."}
                </p>
              </div>
            </div>
          )}

          {/* 2FA Required Notice */}
          {auth.twoFactorRequired && (
            <div className={styles.twoFactorNotice}>
              <Shield size={16} />
              <div>
                <strong>Two-Factor Authentication Required</strong>
                <p>Please enter your authentication code to continue.</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            {/* Global Error Alert */}
            {errors.login && (
              <div className={styles.errorAlert}>
                <AlertCircle size={16} />
                <span>{errors.login}</span>
              </div>
            )}

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
                  disabled={isLoading || isBlocked}
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
                  placeholder="Enter your password"
                  required
                  disabled={isLoading || isBlocked}
                  autoComplete="current-password"
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
            </div>

            {/* Form Options */}
            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span className={styles.checkmark}></span>
                <span>Remember me for 30 days</span>
              </label>
              <button
                type="button"
                className={styles.forgotLink}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || !isFormValid || isBlocked}
            >
              {isLoading ? (
                <>
                  <Loader size={18} className={styles.spinner} />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          {/* Social Login */}
          <div className={styles.socialLogin}>
            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogleLogin}
              disabled={isLoading || isGoogleLoading || isBlocked}
            >
              {isGoogleLoading ? (
                <Loader size={18} className={styles.spinner} />
              ) : (
                <Chrome size={18} />
              )}
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Footer */}
          <div className={styles.loginFooter}>
            <p>
              Don't have an account?{" "}
              <button
                className={styles.signupLink}
                onClick={() => navigate("/register")}
              >
                Sign up for free
              </button>
            </p>
            <div className={styles.helpLinks}>
              <button
                className={styles.helpLink}
                onClick={() => navigate("/help/login")}
              >
                Need help signing in?
              </button>
              <button
                className={styles.helpLink}
                onClick={() => navigate("/privacy")}
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Login Attempts Warning */}
          {showAttemptsWarning && (
            <div className={styles.attemptsWarning}>
              <AlertCircle size={14} />
              <span>
                {5 - auth.loginAttempts} attempt
                {5 - auth.loginAttempts !== 1 ? "s" : ""} remaining before
                temporary lockout
              </span>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <h3>Why choose WebCraft?</h3>
          <div className={styles.featuresList}>
            <div className={styles.feature}>
              <CheckCircle size={16} />
              <span>Create beautiful websites without coding</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={16} />
              <span>Manage multiple businesses in one place</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={16} />
              <span>Real-time analytics and performance insights</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={16} />
              <span>Custom domains and professional templates</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={16} />
              <span>Multi-tenant authentication for client websites</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className={styles.securityNotice}>
          <Shield size={14} />
          <span>
            Your data is protected with enterprise-grade security and encryption
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
