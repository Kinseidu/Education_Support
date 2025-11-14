import { Schema, model, Document } from "mongoose";
import { sanitizeText } from "../utils/sanitizer";

export interface NewsDocument extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category?: string;
  status: "draft" | "published";
  coverImageUrl?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<NewsDocument>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const generateSlug = (title: string) =>
  sanitizeText(title)
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

export const News = model<NewsDocument>("News", NewsSchema);

