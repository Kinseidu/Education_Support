import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/apiResponse";

export const notFoundHandler = (_req: Request, res: Response, _next: NextFunction) => {
  return sendError(res, "Route not found", 404);
};

