// Donation model removed — replaced with a minimal stub to avoid import errors.
// Any attempt to use this will throw an error directing callers to /api/contact-info.
import { AppError } from "../utils/appError";

export const Donation = {
  create: async () => {
    throw new AppError("Donations have been disabled. Use /api/contact-info for payment/contact details.", 410);
  },
  findOne: async () => {
    throw new AppError("Donations have been disabled. Use /api/contact-info for payment/contact details.", 410);
  }
} as const;

