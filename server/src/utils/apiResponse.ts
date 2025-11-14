import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string | string[]>;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Request successful",
  statusCode = 200
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json({ success: true, data, message });
};

export const sendError = (
  res: Response,
  message = "An error occurred",
  statusCode = 500,
  errors?: Record<string, string | string[]>
): Response<ApiResponse<null>> => {
  return res.status(statusCode).json({ success: false, message, errors });
};

