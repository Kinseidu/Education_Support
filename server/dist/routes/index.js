"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_routes_1 = __importDefault(require("./contact.routes"));
const donation_routes_1 = __importDefault(require("./donation.routes"));
const newsletter_routes_1 = __importDefault(require("./newsletter.routes"));
const news_routes_1 = __importDefault(require("./news.routes"));
const program_routes_1 = __importDefault(require("./program.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const health_routes_1 = __importDefault(require("./health.routes"));
const router = (0, express_1.Router)();
router.use("/health", health_routes_1.default);
router.use("/contact", contact_routes_1.default);
router.use("/donations", donation_routes_1.default);
router.use("/newsletter", newsletter_routes_1.default);
router.use("/news", news_routes_1.default);
router.use("/programs", program_routes_1.default);
router.use("/auth", auth_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map