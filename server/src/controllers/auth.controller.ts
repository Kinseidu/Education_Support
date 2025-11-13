import { NextFunction, Request, Response } from "express";
import { Admin } from "../models/Admin";
import { validateLoginInput } from "../validators/auth.validator";
import { AppError } from "../utils/appError";
import { signAccessToken } from "../services/token.service";
import { sendSuccess } from "../utils/apiResponse";

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = validateLoginInput(req.body);
    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = signAccessToken({
      id: admin.id,
      email: admin.email,
      role: admin.role
    });

    return sendSuccess(
      res,
      {
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      },
      "Login successful."
    );
  } catch (error) {
    return next(error);
  }
};

export const getAdminProfile = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    return sendSuccess(
      res,
      {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role
      },
      "Profile fetched successfully."
    );
  } catch (error) {
    return next(error);
  }
};

