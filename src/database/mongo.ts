import { env } from "@config/env.config";
import mongoose from "mongoose";

export const connectToMongoDB = async () => {
    try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
    }