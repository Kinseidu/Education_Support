"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const os_1 = __importDefault(require("os"));
const process_1 = __importDefault(require("process"));
const apiResponse_1 = require("../utils/apiResponse");
const healthCheck = (req, res) => {
    const uptime = process_1.default.uptime();
    const memoryUsage = process_1.default.memoryUsage();
    return (0, apiResponse_1.sendSuccess)(res, {
        status: "ok",
        uptime,
        timestamp: new Date().toISOString(),
        hostname: os_1.default.hostname(),
        memory: {
            rss: memoryUsage.rss,
            heapTotal: memoryUsage.heapTotal,
            heapUsed: memoryUsage.heapUsed
        }
    });
};
exports.healthCheck = healthCheck;
//# sourceMappingURL=health.controller.js.map