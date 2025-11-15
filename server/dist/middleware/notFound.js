"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const notFoundHandler = (_req, res, _next) => {
    return (0, apiResponse_1.sendError)(res, "Route not found", 404);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=notFound.js.map