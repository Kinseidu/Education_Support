import validator from "validator";
import { AppError } from "../utils/appError";
import { sanitizeEmail, sanitizeText } from "../utils/sanitizer";

export interface DonationInitiateInput {
  amount: number;
  currency: string;
  email: string;
  fullName?: string;
  provider?: "paystack" | "stripe";
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface DonationVerifyInput {
  reference: string;
  provider?: "paystack" | "stripe";
}

const allowedCurrencies = ["NGN", "GHS", "USD"];

export const validateDonationInitiateInput = (
  payload: Partial<DonationInitiateInput>
): DonationInitiateInput => {
  const errors: Record<string, string> = {};

  const amount = payload.amount;
  if (amount === undefined || amount === null || Number.isNaN(Number(amount))) {
    errors.amount = "Amount is required and must be a number.";
  } else if (Number(amount) < 1) {
    errors.amount = "Amount must be at least 1.";
  }

  const currency = (payload.currency ?? "GHS").toUpperCase();
  if (!allowedCurrencies.includes(currency)) {
    errors.currency = `Currency must be one of: ${allowedCurrencies.join(", ")}.`;
  }

  const email = payload.email ?? "";
  if (validator.isEmpty(email.trim())) {
    errors.email = "Email is required.";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please provide a valid email address.";
  }

  const callbackUrl = payload.callbackUrl ?? "";
  if (callbackUrl && !validator.isURL(callbackUrl, { require_protocol: true })) {
    errors.callbackUrl = "Callback URL must be a valid URL including protocol.";
  }

  const provider = (payload.provider ?? "paystack").toLowerCase();
  if (!["paystack", "stripe"].includes(provider)) {
    errors.provider = "Provider must be either paystack or stripe.";
  }

  if (Object.keys(errors).length) {
    throw new AppError("Validation failed", 422, true, errors);
  }

  return {
    amount: Number(amount),
    currency,
    email: sanitizeEmail(email),
    fullName: payload.fullName ? sanitizeText(payload.fullName) : undefined,
    provider: provider as "paystack" | "stripe",
    callbackUrl: callbackUrl ? sanitizeText(callbackUrl) : undefined,
    metadata: payload.metadata ?? {}
  };
};

export const validateDonationVerifyInput = (
  payload: Partial<DonationVerifyInput>
): DonationVerifyInput => {
  const errors: Record<string, string> = {};

  const reference = payload.reference ?? "";
  if (validator.isEmpty(reference.trim())) {
    errors.reference = "Transaction reference is required.";
  }

  const provider = (payload.provider ?? "paystack").toLowerCase();
  if (!["paystack", "stripe"].includes(provider)) {
    errors.provider = "Provider must be either paystack or stripe.";
  }

  if (Object.keys(errors).length) {
    throw new AppError("Validation failed", 422, true, errors);
  }

  return {
    reference: sanitizeText(reference),
    provider: provider as "paystack" | "stripe"
  };
};

