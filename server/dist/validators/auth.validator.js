"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = void 0;
const validator_1 = __importDefault(require("validator"));
const appError_1 = require("../utils/appError");
const sanitizer_1 = require("../utils/sanitizer");
const validateLoginInput = (payload) => {
    const errors = {};
    const email = payload.email ?? "";
    if (validator_1.default.isEmpty(email.trim())) {
        errors.email = "Email is required.";
    }
    else if (!validator_1.default.isEmail(email)) {
        errors.email = "Please provide a valid email address.";
    }
    const password = payload.password ?? "";
    if (validator_1.default.isEmpty(password)) {
        errors.password = "Password is required.";
    }
    else if (!validator_1.default.isLength(password, { min: 8, max: 128 })) {
        errors.password = "Password must be between 8 and 128 characters.";
    }
    if (Object.keys(errors).length) {
        throw new appError_1.AppError("Validation failed", 422, true, errors);
    }
    return {
        email: (0, sanitizer_1.sanitizeEmail)(email),
        password
    };
};
exports.validateLoginInput = validateLoginInput;
//# sourceMappingURL=auth.validator.js.map