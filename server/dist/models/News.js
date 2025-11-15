"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
const mongoose_1 = require("mongoose");
const sanitizer_1 = require("../utils/sanitizer");
const NewsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    excerpt: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
        index: true
    },
    coverImageUrl: {
        type: String,
        trim: true
    },
    publishedAt: {
        type: Date
    }
}, {
    timestamps: true,
    versionKey: false
});
const generateSlug = (title) => (0, sanitizer_1.sanitizeText)(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
NewsSchema.pre("validate", function (next) {
    if (this.isModified("title") || !this.slug) {
        this.slug = generateSlug(this.title);
    }
    next();
});
NewsSchema.index({ slug: 1 }, { unique: true });
NewsSchema.index({ status: 1, publishedAt: -1 });
exports.News = (0, mongoose_1.model)("News", NewsSchema);
//# sourceMappingURL=News.js.map