import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000'),
  apiUrl: process.env.API_URL || 'http://localhost:5000',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  database: {
    url: process.env.DATABASE_URL!,
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  },

  encryption: {
    key: process.env.ENCRYPTION_KEY!,
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
  },

  zarinpal: {
    merchantId: process.env.ZARINPAL_MERCHANT_ID!,
    callbackUrl: process.env.ZARINPAL_CALLBACK_URL!,
    sandbox: process.env.ZARINPAL_SANDBOX === 'true',
  },

  email: {
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },

  file: {
    maxSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'),
    uploadDir: process.env.UPLOAD_DIR || './uploads',
  },

  rateLimit: {
    window: parseInt(process.env.RATE_LIMIT_WINDOW || '60000'),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    maxChat: parseInt(process.env.RATE_LIMIT_MAX_CHAT || '20'),
  },

  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',

  log: {
    level: process.env.LOG_LEVEL || 'info',
    dir: process.env.LOG_DIR || './logs',
  },
};