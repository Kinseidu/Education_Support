"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContactInput = void 0;
const validator_1 = __importDefault(require("validator"));
const appError_1 = require("../utils/appError");
const sanitizer_1 = require("../utils/sanitizer");
const validateContactInput = (payload) => {
    const errors = {};
    const name = payload.name ?? "";
    if (validator_1.default.isEmpty(name.trim())) {
        errors.name = "Name is required.";
    }
    else if (!validator_1.default.isLength(name.trim(), { min: 2, max: 100 })) {
        errors.name = "Name must be between 2 and 100 characters.";
    }
    else if (!validator_1.default.matches(name, /^[a-zA-Z\s'-]+$/u)) {
        errors.name = "Name can only contain letters, spaces, hyphens and apostrophes.";
    }
    const email = payload.email ?? "";
    if (validator_1.default.isEmpty(email.trim())) {
        errors.email = "Email is required.";
    }
    else if (!validator_1.default.isEmail(email)) {
        errors.email = "Please provide a valid email address.";
    }
    else if (!validator_1.default.isLength(email, { max: 255 })) {
        errors.email = "Email must be less than 255 characters.";
    }
    const subject = payload.subject ?? "";
    if (validator_1.default.isEmpty(subject.trim())) {
        errors.subject = "Subject is required.";
    }
    else if (!validator_1.default.isLength(subject.trim(), { min: 3, max: 200 })) {
        errors.subject = "Subject must be between 3 and 200 characters.";
    }
    const message = payload.message ?? "";
    if (validator_1.default.isEmpty(message.trim())) {
        errors.message = "Message is required.";
    }
    else if (!validator_1.default.isLength(message.trim(), { min: 10, max: 2000 })) {
        errors.message = "Message must be between 10 and 2000 characters.";
    }
    if (Object.keys(errors).length > 0) {
        throw new appError_1.AppError("Validation failed", 422, true, errors);
    }
    return {
        name: (0, sanitizer_1.sanitizeText)(name),
        email: (0, sanitizer_1.sanitizeEmail)(email),
        subject: (0, sanitizer_1.sanitizeText)(subject),
        message: (0, sanitizer_1.sanitizeText)(message)
    };
};
exports.validateContactInput = validateContactInput;
//# sourceMappingURL=contact.validator.js.map