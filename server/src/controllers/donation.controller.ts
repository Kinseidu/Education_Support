import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

// Donations/payment processing has been removed. Endpoints retained
// for compatibility but will return 410 Gone directing clients to contact-info.

export const initiateDonationHandler = async (_req: Request, _res: Response, next: NextFunction) => {
  return next(new AppError("Donations have been disabled. Please use the contact-info endpoint.", 410));
};

export const verifyDonationHandler = async (_req: Request, _res: Response, next: NextFunction) => {
  return next(new AppError("Donations have been disabled. Please use the contact-info endpoint.", 410));
};

