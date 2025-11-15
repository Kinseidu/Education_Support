"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterSubscriber = void 0;
const mongoose_1 = require("mongoose");
const NewsletterSubscriberSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    unsubscribedAt: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: false,
    versionKey: false
});
NewsletterSubscriberSchema.index({ email: 1 }, { unique: true });
exports.NewsletterSubscriber = (0, mongoose_1.model)("NewsletterSubscriber", NewsletterSubscriberSchema);
//# sourceMappingURL=NewsletterSubscriber.js.map