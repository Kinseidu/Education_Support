import validator from "validator";
import { AppError } from "../utils/appError";
import { sanitizeText } from "../utils/sanitizer";

export interface ProgramInput {
  title: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  status?: "upcoming" | "active" | "completed";
}

const allowedStatuses = ["upcoming", "active", "completed"];

const validateBase = (
  payload: Partial<ProgramInput>,
  requireAll = true
): Partial<ProgramInput> => {
  const errors: Record<string, string> = {};

  const title = payload.title ?? "";
  if (requireAll || title) {
    if (validator.isEmpty(title.trim())) {
      errors.title = "Title is required.";
    } else if (!validator.isLength(title.trim(), { min: 3, max: 150 })) {
      errors.title = "Title must be between 3 and 150 characters.";
    }
  }

  const description = payload.description ?? "";
  if (requireAll || description) {
    if (validator.isEmpty(description.trim())) {
      errors.description = "Description is required.";
    } else if (!validator.isLength(description.trim(), { min: 20 })) {
      errors.description = "Description must be at least 20 characters.";
    }
  }

  const status = (payload.status ?? "upcoming").toLowerCase();
  if (status && !allowedStatuses.includes(status)) {
    errors.status = `Status must be one of: ${allowedStatuses.join(", ")}.`;
  }

  const startDate = payload.startDate ? new Date(payload.startDate) : undefined;
  const endDate = payload.endDate ? new Date(payload.endDate) : undefined;
  if (startDate && Number.isNaN(startDate.getTime())) {
    errors.startDate = "Start date must be a valid date.";
  }
  if (endDate && Number.isNaN(endDate.getTime())) {
    errors.endDate = "End date must be a valid date.";
  }
  if (startDate && endDate && endDate < startDate) {
    errors.endDate = "End date cannot be before start date.";
  }

  if (Object.keys(errors).length) {
    throw new AppError("Validation failed", 422, true, errors);
  }

  const sanitized: Partial<ProgramInput> = {};
  if (title) sanitized.title = sanitizeText(title);
  if (description) sanitized.description = sanitizeText(description);
  if (payload.location) sanitized.location = sanitizeText(payload.location);
  sanitized.status = status as ProgramInput["status"];
  if (startDate) sanitized.startDate = startDate;
  if (endDate) sanitized.endDate = endDate;

  return sanitized;
};

export const validateProgramCreateInput = (payload: Partial<ProgramInput>): ProgramInput => {
  const validated = validateBase(payload, true);
  return validated as ProgramInput;
};

export const validateProgramUpdateInput = (
  payload: Partial<ProgramInput>
): Partial<ProgramInput> => {
  return validateBase(payload, false);
};

