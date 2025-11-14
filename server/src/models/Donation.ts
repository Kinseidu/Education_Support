import { Schema, model, Document } from "mongoose";

export interface DonationDocument extends Document {
  amount: number;
  currency: string;
  email: string;
  fullName?: string;
  provider: "paystack" | "stripe";
  reference: string;
  status: "pending" | "success" | "failed";
  metadata?: Record<string, unknown>;
  gatewayResponse?: Record<string, unknown>;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<DonationDocument>(
  {
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
      type: Schema.Types.Mixed
    },
    gatewayResponse: {
      type: Schema.Types.Mixed
    },
    verifiedAt: {
      type: Date
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Donation = model<DonationDocument>("Donation", DonationSchema);

