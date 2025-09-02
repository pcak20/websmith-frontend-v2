// components/BusinessDashboard/CreateBusinessModal.js
import React, { useState } from "react";
import {
  X,
  AlertCircle,
  Loader2,
  Check,
  ArrowRight,
  ArrowLeft,
  Utensils,
  Car,
  Store,
  Coffee,
  Scissors,
  Dumbbell,
  Heart,
  Home,
  Briefcase,
  Camera,
  Palette,
  ShoppingBag,
  Laptop,
} from "lucide-react";
import styles from "./CreateBusinessModal.module.css";

const getIconComponent = (iconName) => {
  const iconMap = {
    utensils: Utensils,
    car: Car,
    store: Store,
    coffee: Coffee,
    scissors: Scissors,
    dumbbell: Dumbbell,
    heart: Heart,
    home: Home,
    briefcase: Briefcase,
    camera: Camera,
    palette: Palette,
    "shopping-bag": ShoppingBag,
    laptop: Laptop,
  };
  const IconComponent = iconMap[iconName];
  return <IconComponent size={24} />;
};

const CreateBusinessModal = ({
  categories,
  loading,
  error,
  onSubmit,
  onClose,
}) => {
  const [step, setStep] = useState(1); // 1: Category, 2: Details
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: null,
    phone: "",
    email: "",
    website: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    facebook_url: "",
    instagram_url: "",
    twitter_url: "",
    linkedin_url: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleCategorySelect = (categoryId) => {
    setFormData((prev) => ({ ...prev, category_id: categoryId }));
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Business name is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Business description is required";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (
      formData.phone &&
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))
    ) {
      errors.phone = "Invalid phone format";
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      errors.website = "Website must start with http:// or https://";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Clean up form data - remove empty strings
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) => value !== null && value !== ""
      )
    );

    await onSubmit(cleanedData);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onClose();
    }
  };

  const selectedCategory = categories.find(
    (cat) => cat.id === formData.category_id
  );

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            {step === 2 && (
              <button
                type="button"
                className={styles.backBtn}
                onClick={handleBack}
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <h2>
              {step === 1 ? "Choose Business Category" : "Business Details"}
            </h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Step 1: Category Selection */}
          {step === 1 && (
            <>
              <p className={styles.modalDescription}>
                Choose a business category to get started with pre-designed
                templates and features.
              </p>

              {loading && (
                <div className={styles.loadingState}>
                  <Loader2 size={24} className={styles.spinner} />
                  <p>Loading categories...</p>
                </div>
              )}

              <div className={styles.categoriesGrid}>
                {categories.map((category) => {
                  // Map category icons (you might want to move this to a utils file)

                  return (
                    <div
                      key={category.id}
                      className={styles.categoryCard}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <div
                        className={styles.categoryIcon}
                        style={{ backgroundColor: category.color }}
                      >
                        {getIconComponent(category.icon)}
                      </div>
                      <span className={styles.categoryName}>
                        {category.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Step 2: Business Details Form */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className={styles.businessForm}>
              {selectedCategory && (
                <div className={styles.selectedCategory}>
                  <div
                    className={styles.selectedCategoryIcon}
                    style={{ backgroundColor: selectedCategory.color }}
                  >
                    {getIconComponent(selectedCategory.icon)}
                  </div>
                  <div>
                    <h4>{selectedCategory.name}</h4>
                    <p>{selectedCategory.description}</p>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className={styles.errorAlert}>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Basic Information */}
              <div className={styles.formSection}>
                <h3>Basic Information</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="name">Business Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? styles.inputError : ""}
                    placeholder="Enter your business name"
                    required
                  />
                  {formErrors.name && (
                    <span className={styles.fieldError}>{formErrors.name}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={formErrors.description ? styles.inputError : ""}
                    placeholder="Describe your business"
                    rows={3}
                    required
                  />
                  {formErrors.description && (
                    <span className={styles.fieldError}>
                      {formErrors.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className={styles.formSection}>
                <h3>Contact Information</h3>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? styles.inputError : ""}
                      placeholder="+1 (555) 123-4567"
                    />
                    {formErrors.phone && (
                      <span className={styles.fieldError}>
                        {formErrors.phone}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? styles.inputError : ""}
                      placeholder="business@example.com"
                    />
                    {formErrors.email && (
                      <span className={styles.fieldError}>
                        {formErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="website">Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className={formErrors.website ? styles.inputError : ""}
                    placeholder="https://www.yourbusiness.com"
                  />
                  {formErrors.website && (
                    <span className={styles.fieldError}>
                      {formErrors.website}
                    </span>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className={styles.formSection}>
                <h3>Address (Optional)</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="address_line1">Street Address</label>
                  <input
                    type="text"
                    id="address_line1"
                    name="address_line1"
                    value={formData.address_line1}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="state">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NY"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="postal_code">Postal Code</label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="United States"
                  />
                </div>
              </div>

              {/* Social Media (Optional) */}
              <div className={styles.formSection}>
                <h3>Social Media (Optional)</h3>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="facebook_url">Facebook</label>
                    <input
                      type="url"
                      id="facebook_url"
                      name="facebook_url"
                      value={formData.facebook_url}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/yourbusiness"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="instagram_url">Instagram</label>
                    <input
                      type="url"
                      id="instagram_url"
                      name="instagram_url"
                      value={formData.instagram_url}
                      onChange={handleInputChange}
                      placeholder="https://instagram.com/yourbusiness"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="twitter_url">Twitter</label>
                    <input
                      type="url"
                      id="twitter_url"
                      name="twitter_url"
                      value={formData.twitter_url}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/yourbusiness"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="linkedin_url">LinkedIn</label>
                    <input
                      type="url"
                      id="linkedin_url"
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/company/yourbusiness"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={handleBack}
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={
                    loading ||
                    !formData.name.trim() ||
                    !formData.description.trim()
                  }
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className={styles.spinner} />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      Create Business
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBusinessModal;
