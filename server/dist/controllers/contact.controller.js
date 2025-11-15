"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContactSubmission = void 0;
const ContactSubmission_1 = require("../models/ContactSubmission");
const contact_validator_1 = require("../validators/contact.validator");
const apiResponse_1 = require("../utils/apiResponse");
const email_service_1 = require("../services/email.service");
const logger_1 = require("../config/logger");
const handleContactSubmission = async (req, res, next) => {
    try {
        const input = (0, contact_validator_1.validateContactInput)(req.body);
        const submission = await ContactSubmission_1.ContactSubmission.create(input);
        // Best-effort notification
        try {
            await (0, email_service_1.sendEmail)({
                to: input.email,
                subject: "We received your message",
                text: `Hi ${input.name},\n\nThank you for contacting us. Our team will respond shortly.\n\nSubject: ${input.subject}\n\nMessage:\n${input.message}\n\nBest regards,\nAcademic Excellence Team`
            });
        }
        catch (emailError) {
            logger_1.logger.warn("Unable to send contact confirmation email", emailError);
        }
        return (0, apiResponse_1.sendSuccess)(res, {
            id: submission.id,
            status: submission.status
        }, "Message received successfully.", 201);
    }
    catch (error) {
        return next(error);
    }
};
exports.handleContactSubmission = handleContactSubmission;
//# sourceMappingURL=contact.controller.js.map