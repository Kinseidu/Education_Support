import validator from "validator";
import { AppError } from "../utils/appError";
import { sanitizeEmail } from "../utils/sanitizer";

export interface NewsletterInput {
  email: string;
}

export const validateNewsletterInput = (payload: Partial<NewsletterInput>): NewsletterInput => {
  const errors: Record<string, string> = {};
  const email = payload.email ?? "";

  if (validator.isEmpty(email.trim())) {
    errors.email = "Email is required.";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please provide a valid email address.";
  } else if (!validator.isLength(email, { max: 255 })) {
    errors.email = "Email must be less than 255 characters.";
  }

  if (Object.keys(errors).length) {
    throw new AppError("Validation failed", 422, true, errors);
  }

  return { email: sanitizeEmail(email) };
};

