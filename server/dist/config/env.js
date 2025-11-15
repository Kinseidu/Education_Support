"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envFile = process.env.NODE_ENV === "test"
    ? ".env.test"
    : process.env.NODE_ENV === "production"
        ? ".env"
        : ".env.local";
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), envFile) });
dotenv_1.default.config(); // fallback to default .env if specific file missing
const requiredInProduction = ["MONGODB_URI", "JWT_SECRET"];
requiredInProduction.forEach((key) => {
    if (process.env.NODE_ENV === "production" &&
        (!process.env[key] || process.env[key]?.trim().length === 0)) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});
exports.env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: Number(process.env.PORT ?? 5000),
    mongodbUri: process.env.MONGODB_URI ?? "",
    clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000",
    jwtSecret: process.env.JWT_SECRET ?? "changeme",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1d",
    emailService: process.env.EMAIL_SERVICE ?? "",
    emailUser: process.env.EMAIL_USER ?? "",
    emailPass: process.env.EMAIL_PASS ?? "",
    emailFrom: process.env.EMAIL_FROM ?? process.env.EMAIL_USER ?? "no-reply@example.com",
    paystackKey: process.env.PAYSTACK_KEY ?? "",
    stripeSecret: process.env.STRIPE_SECRET ?? "",
    paystackBaseUrl: process.env.PAYSTACK_BASE_URL ?? "https://api.paystack.co",
    appUrl: process.env.APP_URL ?? "http://localhost:5000",
    rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
    rateLimitMax: Number(process.env.RATE_LIMIT_MAX ?? 100),
    swaggerEnabled: process.env.SWAGGER_ENABLED !== "false",
    secureCookies: process.env.SECURE_COOKIES === "true"
};
//# sourceMappingURL=env.js.map