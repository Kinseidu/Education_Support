"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const logger_1 = require("./logger");
const connectDatabase = async () => {
    const uri = env_1.env.mongodbUri;
    if (!uri) {
        logger_1.logger.warn("MONGODB_URI is not set. Database connection will use memory server in tests.");
        throw new Error("Database connection string is missing");
    }
    mongoose_1.default.set("strictQuery", true);
    try {
        const connection = await mongoose_1.default.connect(uri);
        logger_1.logger.info(`MongoDB connected: ${connection.connection.host}`);
        return connection;
    }
    catch (error) {
        logger_1.logger.error("MongoDB connection error", error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    await mongoose_1.default.disconnect();
};
exports.disconnectDatabase = disconnectDatabase;
//# sourceMappingURL=database.js.map