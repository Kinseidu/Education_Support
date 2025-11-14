import { Schema, model, Document } from "mongoose";

export interface NewsletterSubscriberDocument extends Document {
  email: string;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  active: boolean;
}

const NewsletterSubscriberSchema = new Schema<NewsletterSubscriberDocument>(
  {
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
  },
  {
    timestamps: false,
    versionKey: false
  }
);

NewsletterSubscriberSchema.index({ email: 1 }, { unique: true });

export const NewsletterSubscriber = model<NewsletterSubscriberDocument>(
  "NewsletterSubscriber",
  NewsletterSubscriberSchema
);

