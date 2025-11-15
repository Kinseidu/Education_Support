"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewsUpdateInput = exports.validateNewsCreateInput = void 0;
const validator_1 = __importDefault(require("validator"));
const appError_1 = require("../utils/appError");
const sanitizer_1 = require("../utils/sanitizer");
const validateBase = (payload, requireAll = true) => {
    const errors = {};
    const title = payload.title ?? "";
    if (requireAll || title) {
        if (validator_1.default.isEmpty(title.trim())) {
            errors.title = "Title is required.";
        }
        else if (!validator_1.default.isLength(title.trim(), { min: 3, max: 200 })) {
            errors.title = "Title must be between 3 and 200 characters.";
        }
    }
    const content = payload.content ?? "";
    if (requireAll || content) {
        if (validator_1.default.isEmpty(content.trim())) {
            errors.content = "Content is required.";
        }
        else if (!validator_1.default.isLength(content.trim(), { min: 20 })) {
            errors.content = "Content must be at least 20 characters.";
        }
    }
    const status = (payload.status ?? "draft").toLowerCase();
    if (status && !["draft", "published"].includes(status)) {
        errors.status = "Status must be either draft or published.";
    }
    const coverImageUrl = payload.coverImageUrl ?? "";
    if (coverImageUrl && !validator_1.default.isURL(coverImageUrl, { protocols: ["http", "https"], require_protocol: true })) {
        errors.coverImageUrl = "Cover image must be a valid URL.";
    }
    if (Object.keys(errors).length) {
        throw new appError_1.AppError("Validation failed", 422, true, errors);
    }
    const sanitized = {};
    if (title)
        sanitized.title = (0, sanitizer_1.sanitizeText)(title);
    if (content)
        sanitized.content = (0, sanitizer_1.sanitizeText)(content);
    if (payload.excerpt)
        sanitized.excerpt = (0, sanitizer_1.sanitizeText)(payload.excerpt);
    if (payload.category)
        sanitized.category = (0, sanitizer_1.sanitizeText)(payload.category);
    sanitized.status = status;
    if (coverImageUrl)
        sanitized.coverImageUrl = (0, sanitizer_1.sanitizeText)(coverImageUrl);
    if (payload.publishedAt)
        sanitized.publishedAt = payload.publishedAt;
    if (!payload.publishedAt && sanitized.status === "published") {
        sanitized.publishedAt = new Date();
    }
    return sanitized;
};
const validateNewsCreateInput = (payload) => {
    const validated = validateBase(payload, true);
    return validated;
};
exports.validateNewsCreateInput = validateNewsCreateInput;
const validateNewsUpdateInput = (payload) => {
    return validateBase(payload, false);
};
exports.validateNewsUpdateInput = validateNewsUpdateInput;
//# sourceMappingURL=news.validator.js.map