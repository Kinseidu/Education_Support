import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../utils/apiResponse";
import {
  validateDonationInitiateInput,
  validateDonationVerifyInput
} from "../validators/donation.validator";
import { initiateDonation, verifyDonation } from "../services/donation.service";

export const initiateDonationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = validateDonationInitiateInput(req.body);
    const result = await initiateDonation(input);
    return sendSuccess(res, result, "Donation initialized successfully.", 201);
  } catch (error) {
    return next(error);
  }
};

export const verifyDonationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = validateDonationVerifyInput(req.body);
    const result = await verifyDonation(input);
    return sendSuccess(res, result, "Donation verification completed.");
  } catch (error) {
    return next(error);
  }
};

