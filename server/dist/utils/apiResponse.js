"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data, message = "Request successful", statusCode = 200) => {
    return res.status(statusCode).json({ success: true, data, message });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message = "An error occurred", statusCode = 500, errors) => {
    return res.status(statusCode).json({ success: false, message, errors });
};
exports.sendError = sendError;
//# sourceMappingURL=apiResponse.js.map