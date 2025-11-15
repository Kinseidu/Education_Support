"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donation = void 0;
const mongoose_1 = require("mongoose");
const DonationSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        required: true,
        uppercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        trim: true
    },
    provider: {
        type: String,
        enum: ["paystack", "stripe"],
        required: true
    },
    reference: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
    metadata: {
        type: mongoose_1.Schema.Types.Mixed
    },
    gatewayResponse: {
        type: mongoose_1.Schema.Types.Mixed
    },
    verifiedAt: {
        type: Date
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.Donation = (0, mongoose_1.model)("Donation", DonationSchema);
//# sourceMappingURL=Donation.js.map