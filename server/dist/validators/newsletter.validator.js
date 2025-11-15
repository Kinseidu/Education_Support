"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewsletterInput = void 0;
const validator_1 = __importDefault(require("validator"));
const appError_1 = require("../utils/appError");
const sanitizer_1 = require("../utils/sanitizer");
const validateNewsletterInput = (payload) => {
    const errors = {};
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
    if (Object.keys(errors).length) {
        throw new appError_1.AppError("Validation failed", 422, true, errors);
    }
    return { email: (0, sanitizer_1.sanitizeEmail)(email) };
};
exports.validateNewsletterInput = validateNewsletterInput;
//# sourceMappingURL=newsletter.validator.js.map