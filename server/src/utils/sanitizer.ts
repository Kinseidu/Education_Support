import validator from "validator";

export const sanitizeText = (value: string): string => {
  return validator.stripLow(validator.trim(value), true);
};

export const sanitizeEmail = (value: string): string => {
  const normalized = validator.normalizeEmail(value, { gmail_remove_dots: false });
  return normalized ?? sanitizeText(value.toLowerCase());
};

