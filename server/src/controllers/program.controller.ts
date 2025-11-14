import { NextFunction, Request, Response } from "express";
import { Program } from "../models/Program";
import {
  validateProgramCreateInput,
  validateProgramUpdateInput
} from "../validators/program.validator";
import { sendSuccess } from "../utils/apiResponse";
import { AppError } from "../utils/appError";

export const getPrograms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = (req.query.status as string) ?? "active";
    const criteria = status === "all" ? {} : { status };
    const items = await Program.find(criteria).sort({ startDate: 1, createdAt: -1 });
    return sendSuccess(res, { items, count: items.length }, "Programs fetched successfully.");
  } catch (error) {
    return next(error);
  }
};

export const createProgram = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = validateProgramCreateInput(req.body);
    const program = await Program.create(input);
    return sendSuccess(res, program, "Program created successfully.", 201);
  } catch (error) {
    return next(error);
  }
};

export const updateProgram = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updates = validateProgramUpdateInput(req.body);
    const program = await Program.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });
    if (!program) {
      throw new AppError("Program not found", 404);
    }
    return sendSuccess(res, program, "Program updated successfully.");
  } catch (error) {
    return next(error);
  }
};

export const deleteProgram = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      throw new AppError("Program not found", 404);
    }
    return sendSuccess(res, null, "Program deleted successfully.");
  } catch (error) {
    return next(error);
  }
};

