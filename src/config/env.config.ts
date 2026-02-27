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
  MAIL_HOST: process.env.MAIL_HOST as string,
  MAIL_PORT: parseInt(process.env.MAIL_PORT as string, 10),
  MAIL_SECURE: process.env.MAIL_SECURE === "true",
  MAIL_USER: process.env.MAIL_USER as string,
  MAIL_PASS: process.env.MAIL_PASS as string,
  MAIL_FROM: process.env.MAIL_FROM as string,
  NOTIFY_EMAIL: process.env.NOTIFY_EMAIL as string,
};
