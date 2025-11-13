import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { logger } from "../config/logger";
import { sendError } from "../utils/apiResponse";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    if (!err.isOperational) {
      logger.error("Critical error encountered", err);
    }
    return sendError(res, err.message, err.statusCode, err.errors);
  }

  logger.error("Unhandled error", err);
  return sendError(res, "Internal server error", 500);
};

