export interface EnvConfig {
  MONGO_URI: string;
  PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  JWT_SECRET: string;
  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_SECURE: boolean;
  MAIL_USER: string;
  MAIL_PASS: string;
  MAIL_FROM: string;
  NOTIFY_EMAIL: string;
}
