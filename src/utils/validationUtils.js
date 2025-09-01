// utils/validationUtils.js
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value, fieldName = "Field") => {
  if (!value || (typeof value === "string" && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value, minLength, fieldName = "Field") => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

export const validateMaxLength = (value, maxLength, fieldName = "Field") => {
  if (value && value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters`;
  }
  return null;
};

export const createValidator = (rules) => {
  return (data) => {
    const errors = {};

    Object.keys(rules).forEach((field) => {
      const fieldRules = rules[field];
      const value = data[field];

      for (const rule of fieldRules) {
        const error = rule(value, field);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
};
