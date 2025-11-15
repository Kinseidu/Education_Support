"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSubmission = void 0;
const mongoose_1 = require("mongoose");
const ContactSubmissionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["new", "in-progress", "resolved"],
        default: "new"
    },
    respondedAt: {
        type: Date
    }
}, {
    timestamps: true,
    versionKey: false
});
ContactSubmissionSchema.index({ email: 1, createdAt: -1 });
exports.ContactSubmission = (0, mongoose_1.model)("ContactSubmission", ContactSubmissionSchema);
//# sourceMappingURL=ContactSubmission.js.map