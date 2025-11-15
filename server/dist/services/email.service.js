"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
let transporter = null;
const buildTransporter = () => {
    if (!env_1.env.emailService || !env_1.env.emailUser || !env_1.env.emailPass) {
        logger_1.logger.warn("Email service credentials missing. Emails will be logged only.");
        return null;
    }
    return nodemailer_1.default.createTransport({
        service: env_1.env.emailService,
        auth: {
            user: env_1.env.emailUser,
            pass: env_1.env.emailPass
        }
    });
};
const getTransporter = () => {
    if (transporter) {
        return transporter;
    }
    transporter = buildTransporter();
    return transporter;
};
const sendEmail = async ({ to, subject, html, text }) => {
    const mailer = getTransporter();
    const payload = {
        from: env_1.env.emailFrom,
        to,
        subject,
        text,
        html
    };
    if (!mailer) {
        logger_1.logger.info("Email transport not configured. Email payload logged.", payload);
        return;
    }
    await mailer.sendMail(payload);
    logger_1.logger.info("Email dispatched successfully", { to });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.service.js.map