import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../utils/appError";

interface JwtPayload {
  sub: string;
  email: string;
  role?: string;
}

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authentication required", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role
    };
    return next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

export const authorizeAdmin = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "admin") {
    return next(new AppError("Admin privileges required", 403));
  }

  return next();
};

