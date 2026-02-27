export interface EnvConfig {
  MONGO_URI: string;
  PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  JWT_SECRET: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  NOTIFY_EMAIL: string;
}
