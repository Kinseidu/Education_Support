"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const appError_1 = require("../utils/appError");
const authenticate = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new appError_1.AppError("Authentication required", 401));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        req.user = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role
        };
        return next();
    }
    catch (error) {
        return next(new appError_1.AppError("Invalid or expired token", 401));
    }
};
exports.authenticate = authenticate;
const authorizeAdmin = (req, _res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return next(new appError_1.AppError("Admin privileges required", 403));
    }
    return next();
};
exports.authorizeAdmin = authorizeAdmin;
//# sourceMappingURL=auth.js.map