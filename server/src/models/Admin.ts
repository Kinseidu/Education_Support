import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface AdminDocument extends Document {
  email: string;
  password: string;
  name?: string;
  role: "admin";
  comparePassword(candidate: string): Promise<boolean>;
}

const AdminSchema = new Schema<AdminDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    name: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

AdminSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

AdminSchema.index({ email: 1 }, { unique: true });

export const Admin = model<AdminDocument>("Admin", AdminSchema);

