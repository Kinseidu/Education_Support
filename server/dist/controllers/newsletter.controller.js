"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeNewsletter = void 0;
const NewsletterSubscriber_1 = require("../models/NewsletterSubscriber");
const newsletter_validator_1 = require("../validators/newsletter.validator");
const apiResponse_1 = require("../utils/apiResponse");
const sendEmail_1 = require("../utils/sendEmail");
const subscribeNewsletter = async (req, res, next) => {
    try {
        const input = (0, newsletter_validator_1.validateNewsletterInput)(req.body);
        let subscriber = await NewsletterSubscriber_1.NewsletterSubscriber.findOne({ email: input.email });
        const isNewSubscriber = !subscriber || !subscriber.active;
        if (subscriber) {
            if (!subscriber.active) {
                subscriber.active = true;
                subscriber.subscribedAt = new Date();
                subscriber.unsubscribedAt = undefined;
                await subscriber.save();
            }
        }
        else {
            subscriber = await NewsletterSubscriber_1.NewsletterSubscriber.create({
                email: input.email,
            });
        }
        // -----------------------------------------
        // 🚀 Send automatic welcome email
        // Only send if this is a NEW subscription
        // -----------------------------------------
        if (isNewSubscriber) {
            await (0, sendEmail_1.sendEmail)({
                to: subscriber.email,
                subject: "Welcome to our Newsletter!",
                html: `
          <h2>Thanks for subscribing! 🎉</h2>
          <p>We're excited to have you on board.</p>
          <p>You’ll now receive updates and exclusive content.</p>
        `,
            });
        }
        return (0, apiResponse_1.sendSuccess)(res, { id: subscriber.id, email: subscriber.email }, "Subscription successful.");
    }
    catch (error) {
        return next(error);
    }
};
exports.subscribeNewsletter = subscribeNewsletter;
//# sourceMappingURL=newsletter.controller.js.map