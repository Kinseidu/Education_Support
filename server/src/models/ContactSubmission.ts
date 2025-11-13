import { Schema, model, Document } from "mongoose";

export interface ContactSubmissionDocument extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "in-progress" | "resolved";
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema = new Schema<ContactSubmissionDocument>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ContactSubmissionSchema.index({ email: 1, createdAt: -1 });

export const ContactSubmission = model<ContactSubmissionDocument>(
  "ContactSubmission",
  ContactSubmissionSchema
);

