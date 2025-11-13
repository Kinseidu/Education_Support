import validator from "validator";
import { AppError } from "../utils/appError";
import { sanitizeEmail } from "../utils/sanitizer";

export interface LoginInput {
  email: string;
  password: string;
}

export const validateLoginInput = (payload: Partial<LoginInput>): LoginInput => {
  const errors: Record<string, string> = {};

  const email = payload.email ?? "";
  if (validator.isEmpty(email.trim())) {
    errors.email = "Email is required.";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please provide a valid email address.";
  }

  const password = payload.password ?? "";
  if (validator.isEmpty(password)) {
    errors.password = "Password is required.";
  } else if (!validator.isLength(password, { min: 8, max: 128 })) {
    errors.password = "Password must be between 8 and 128 characters.";
  }

  if (Object.keys(errors).length) {
    throw new AppError("Validation failed", 422, true, errors);
  }

  return {
    email: sanitizeEmail(email),
    password
  };
};

