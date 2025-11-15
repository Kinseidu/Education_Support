import { Schema, model, Document } from "mongoose";

export interface ProgramDocument extends Document {
  title: string;
  description: string;
  location?: string;
  coverImageUrl?: string;
  status: "upcoming" | "active" | "completed";
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new Schema<ProgramDocument>(
  {
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
    coverImageUrl: {
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
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ProgramSchema.index({ status: 1, startDate: 1 });

export const Program = model<ProgramDocument>("Program", ProgramSchema);

