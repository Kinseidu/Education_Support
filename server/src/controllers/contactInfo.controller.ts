import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/apiResponse";
import { env } from "../config/env";

export const getContactInfo = async (_req: Request, res: Response, _next: NextFunction) => {
  const data = {
    founderPhone: env.founderPhone,
    whatsappNumber: env.whatsappNumber,
    founderEmail: env.founderEmail,
    bankName: env.bankName,
    accountName: env.accountName,
    accountNumber: env.accountNumber,
  };

  return sendSuccess(res, data, "Contact information retrieved successfully.");
};

export default {
  getContactInfo,
};
