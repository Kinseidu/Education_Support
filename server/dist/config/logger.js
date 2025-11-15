"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, printf, errors, colorize, splat } = winston_1.format;
const logFormat = printf(({ level, message, timestamp: time, stack, ...meta }) => {
    const base = `${time} [${level}]: ${message}`;
    const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return stack ? `${base}\n${stack}${metaString}` : `${base}${metaString}`;
});
exports.logger = (0, winston_1.createLogger)({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: combine(colorize(), timestamp(), splat(), errors({ stack: true }), logFormat),
    transports: [new winston_1.transports.Console()]
});
//# sourceMappingURL=logger.js.map