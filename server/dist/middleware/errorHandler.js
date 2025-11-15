"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = require("../utils/appError");
const logger_1 = require("../config/logger");
const apiResponse_1 = require("../utils/apiResponse");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof appError_1.AppError) {
        if (!err.isOperational) {
            logger_1.logger.error("Critical error encountered", err);
        }
        return (0, apiResponse_1.sendError)(res, err.message, err.statusCode, err.errors);
    }
    logger_1.logger.error("Unhandled error", err);
    return (0, apiResponse_1.sendError)(res, "Internal server error", 500);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map