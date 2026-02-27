import { connectToMongoDB } from "database/mongo";
import mongoose from "mongoose";

import { env } from "@config/env.config";
import middleware from "./middleware";

import { redisConfig } from "./config";

connectToMongoDB();

mongoose.connection.once("open", () => {
  redisConfig;
  console.log("startting server on port...", env.PORT);
  middleware.getApp().listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
});
