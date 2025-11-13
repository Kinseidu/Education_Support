import validator from "validator";
import { AppError } from "../utils/appError";
import { sanitizeEmail, sanitizeText } from "../utils/sanitizer";

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const validateContactInput = (payload: Partial<ContactInput>): ContactInput => {
  const errors: Record<string, string> = {};

  const name = payload.name ?? "";
  if (validator.isEmpty(name.trim())) {
    errors.name = "Name is required.";
  } else if (!validator.isLength(name.trim(), { min: 2, max: 100 })) {
    errors.name = "Name must be between 2 and 100 characters.";
  } else if (!validator.matches(name, /^[a-zA-Z\s'-]+$/u)) {
    errors.name = "Name can only contain letters, spaces, hyphens and apostrophes.";
  }

  const email = payload.email ?? "";
  if (validator.isEmpty(email.trim())) {
    errors.email = "Email is required.";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please provide a valid email address.";
  } else if (!validator.isLength(email, { max: 255 })) {
    errors.email = "Email must be less than 255 characters.";
  }

  const subject = payload.subject ?? "";
  if (validator.isEmpty(subject.trim())) {
    errors.subject = "Subject is required.";
  } else if (!validator.isLength(subject.trim(), { min: 3, max: 200 })) {
    errors.subject = "Subject must be between 3 and 200 characters.";
  }

  const message = payload.message ?? "";
  if (validator.isEmpty(message.trim())) {
    errors.message = "Message is required.";
  } else if (!validator.isLength(message.trim(), { min: 10, max: 2000 })) {
    errors.message = "Message must be between 10 and 2000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    throw new AppError("Validation failed", 422, true, errors);
  }

  return {
    name: sanitizeText(name),
    email: sanitizeEmail(email),
    subject: sanitizeText(subject),
    message: sanitizeText(message)
  };
};

