import { AppError } from "../utils/appError";

export const initiateDonation = async () => {
  throw new AppError("Donations have been disabled. Use /api/contact-info for payment/contact details.", 410);
};

export const verifyDonation = async () => {
  throw new AppError("Donations have been disabled. Use /api/contact-info for payment/contact details.", 410);
};


