import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

export const connectDatabase = async (): Promise<typeof mongoose> => {
  const uri = env.mongodbUri;

  if (!uri) {
    logger.warn("MONGODB_URI is not set. Database connection will use memory server in tests.");
    throw new Error("Database connection string is missing");
  }

  mongoose.set("strictQuery", true);

  try {
    const connection = await mongoose.connect(uri);
    logger.info(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    logger.error("MongoDB connection error", error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};

