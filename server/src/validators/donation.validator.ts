import { AppError } from "../utils/appError";

// Donations/payment processing has been removed. Keep the types for
// compatibility but validation functions will indicate the endpoints
// are no longer available.

export interface DonationInitiateInput {
  amount: number;
  currency: string;
  email: string;
  fullName?: string;
  provider?: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface DonationVerifyInput {
  reference: string;
  provider?: string;
}

export const validateDonationInitiateInput = (_payload: Partial<DonationInitiateInput>): DonationInitiateInput => {
  throw new AppError("Donations have been disabled. Use /api/contact-info to get contact/payment details.", 410);
};

export const validateDonationVerifyInput = (_payload: Partial<DonationVerifyInput>): DonationVerifyInput => {
  throw new AppError("Donations have been disabled. Use /api/contact-info to get contact/payment details.", 410);
};

