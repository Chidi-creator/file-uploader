import mongoose from "mongoose";

export interface AuthenticatedUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  username?: string;
}
