"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProgramUpdateInput = exports.validateProgramCreateInput = void 0;
const validator_1 = __importDefault(require("validator"));
const appError_1 = require("../utils/appError");
const sanitizer_1 = require("../utils/sanitizer");
const allowedStatuses = ["upcoming", "active", "completed"];
const validateBase = (payload, requireAll = true) => {
    const errors = {};
    const title = payload.title ?? "";
    if (requireAll || title) {
        if (validator_1.default.isEmpty(title.trim())) {
            errors.title = "Title is required.";
        }
        else if (!validator_1.default.isLength(title.trim(), { min: 3, max: 150 })) {
            errors.title = "Title must be between 3 and 150 characters.";
        }
    }
    const description = payload.description ?? "";
    if (requireAll || description) {
        if (validator_1.default.isEmpty(description.trim())) {
            errors.description = "Description is required.";
        }
        else if (!validator_1.default.isLength(description.trim(), { min: 20 })) {
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
        throw new appError_1.AppError("Validation failed", 422, true, errors);
    }
    const sanitized = {};
    if (title)
        sanitized.title = (0, sanitizer_1.sanitizeText)(title);
    if (description)
        sanitized.description = (0, sanitizer_1.sanitizeText)(description);
    if (payload.location)
        sanitized.location = (0, sanitizer_1.sanitizeText)(payload.location);
    sanitized.status = status;
    if (startDate)
        sanitized.startDate = startDate;
    if (endDate)
        sanitized.endDate = endDate;
    return sanitized;
};
const validateProgramCreateInput = (payload) => {
    const validated = validateBase(payload, true);
    return validated;
};
exports.validateProgramCreateInput = validateProgramCreateInput;
const validateProgramUpdateInput = (payload) => {
    return validateBase(payload, false);
};
exports.validateProgramUpdateInput = validateProgramUpdateInput;
//# sourceMappingURL=program.validator.js.map