"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminProfile = exports.adminLogin = void 0;
const Admin_1 = require("../models/Admin");
const auth_validator_1 = require("../validators/auth.validator");
const appError_1 = require("../utils/appError");
const token_service_1 = require("../services/token.service");
const apiResponse_1 = require("../utils/apiResponse");
const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = (0, auth_validator_1.validateLoginInput)(req.body);
        const admin = await Admin_1.Admin.findOne({ email });
        if (!admin) {
            throw new appError_1.AppError("Invalid credentials", 401);
        }
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            throw new appError_1.AppError("Invalid credentials", 401);
        }
        const token = (0, token_service_1.signAccessToken)({
            id: admin.id,
            email: admin.email,
            role: admin.role
        });
        return (0, apiResponse_1.sendSuccess)(res, {
            token,
            admin: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role
            }
        }, "Login successful.");
    }
    catch (error) {
        return next(error);
    }
};
exports.adminLogin = adminLogin;
const getAdminProfile = (req, res, next) => {
    try {
        if (!req.user) {
            throw new appError_1.AppError("Not authenticated", 401);
        }
        return (0, apiResponse_1.sendSuccess)(res, {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role
        }, "Profile fetched successfully.");
    }
    catch (error) {
        return next(error);
    }
};
exports.getAdminProfile = getAdminProfile;
//# sourceMappingURL=auth.controller.js.map