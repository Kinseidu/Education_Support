"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const mongoose_1 = require("mongoose");
const ProgramSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["upcoming", "active", "completed"],
        default: "upcoming",
        index: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
}, {
    timestamps: true,
    versionKey: false
});
ProgramSchema.index({ status: 1, startDate: 1 });
exports.Program = (0, mongoose_1.model)("Program", ProgramSchema);
//# sourceMappingURL=Program.js.map