import { EnvConfig } from "./types/env";
import dotenv from "dotenv";

dotenv.config();
export const env: EnvConfig = {
  MONGO_URI: process.env.MONGO_URI as string,
  PORT: parseInt(process.env.PORT as string, 10),
  REDIS_HOST: process.env.REDIS_HOST as string,
  REDIS_PORT: parseInt(process.env.REDIS_PORT as string, 10),
  REDIS_USERNAME: process.env.REDIS_USERNAME as string,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
};