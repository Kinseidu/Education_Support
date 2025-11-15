"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDonationVerifyInput = exports.validateDonationInitiateInput = void 0;
const validator_1 = __importDefault(require("validator"));
const appError_1 = require("../utils/appError");
const sanitizer_1 = require("../utils/sanitizer");
const allowedCurrencies = ["NGN", "GHS", "USD"];
const validateDonationInitiateInput = (payload) => {
    const errors = {};
    const amount = payload.amount;
    if (amount === undefined || amount === null || Number.isNaN(Number(amount))) {
        errors.amount = "Amount is required and must be a number.";
    }
    else if (Number(amount) < 1) {
        errors.amount = "Amount must be at least 1.";
    }
    const currency = (payload.currency ?? "GHS").toUpperCase();
    if (!allowedCurrencies.includes(currency)) {
        errors.currency = `Currency must be one of: ${allowedCurrencies.join(", ")}.`;
    }
    const email = payload.email ?? "";
    if (validator_1.default.isEmpty(email.trim())) {
        errors.email = "Email is required.";
    }
    else if (!validator_1.default.isEmail(email)) {
        errors.email = "Please provide a valid email address.";
    }
    const callbackUrl = payload.callbackUrl ?? "";
    if (callbackUrl && !validator_1.default.isURL(callbackUrl, { require_protocol: true })) {
        errors.callbackUrl = "Callback URL must be a valid URL including protocol.";
    }
    const provider = (payload.provider ?? "paystack").toLowerCase();
    if (!["paystack", "stripe"].includes(provider)) {
        errors.provider = "Provider must be either paystack or stripe.";
    }
    if (Object.keys(errors).length) {
        throw new appError_1.AppError("Validation failed", 422, true, errors);
    }
    return {
        amount: Number(amount),
        currency,
        email: (0, sanitizer_1.sanitizeEmail)(email),
        fullName: payload.fullName ? (0, sanitizer_1.sanitizeText)(payload.fullName) : undefined,
        provider: provider,
        callbackUrl: callbackUrl ? (0, sanitizer_1.sanitizeText)(callbackUrl) : undefined,
        metadata: payload.metadata ?? {}
    };
};
exports.validateDonationInitiateInput = validateDonationInitiateInput;
const validateDonationVerifyInput = (payload) => {
    const errors = {};
    const reference = payload.reference ?? "";
    if (validator_1.default.isEmpty(reference.trim())) {
        errors.reference = "Transaction reference is required.";
    }
    const provider = (payload.provider ?? "paystack").toLowerCase();
    if (!["paystack", "stripe"].includes(provider)) {
        errors.provider = "Provider must be either paystack or stripe.";
    }
    if (Object.keys(errors).length) {
        throw new appError_1.AppError("Validation failed", 422, true, errors);
    }
    return {
        reference: (0, sanitizer_1.sanitizeText)(reference),
        provider: provider
    };
};
exports.validateDonationVerifyInput = validateDonationVerifyInput;
//# sourceMappingURL=donation.validator.js.map