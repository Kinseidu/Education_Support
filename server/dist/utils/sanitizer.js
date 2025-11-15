"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeEmail = exports.sanitizeText = void 0;
const validator_1 = __importDefault(require("validator"));
const sanitizeText = (value) => {
    return validator_1.default.stripLow(validator_1.default.trim(value), true);
};
exports.sanitizeText = sanitizeText;
const sanitizeEmail = (value) => {
    const normalized = validator_1.default.normalizeEmail(value, { gmail_remove_dots: false });
    return normalized ?? (0, exports.sanitizeText)(value.toLowerCase());
};
exports.sanitizeEmail = sanitizeEmail;
//# sourceMappingURL=sanitizer.js.map