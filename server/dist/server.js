"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const database_1 = require("./config/database");
const logger_1 = require("./config/logger");
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        const server = http_1.default.createServer(app_1.default);
        server.listen(env_1.env.port, () => {
            logger_1.logger.info(`Server running on port ${env_1.env.port}`);
        });
        const shutdown = async () => {
            logger_1.logger.info("Shutting down gracefully...");
            server.close(() => {
                logger_1.logger.info("HTTP server closed.");
                process.exit(0);
            });
        };
        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
    }
    catch (error) {
        logger_1.logger.error("Failed to start server", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map