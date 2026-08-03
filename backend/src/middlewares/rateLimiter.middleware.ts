import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

export const rateLimiter = rateLimit({
  windowMs: env.rateLimit.window || 60000,
  max: env.rateLimit.max || 1000, // افزایش به 1000
  message: {
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // اگر در محیط توسعه هستید، Rate Limit را نادیده بگیرید
    return process.env.NODE_ENV === 'development';
  }
});

export const chatRateLimiter = rateLimit({
  windowMs: env.rateLimit.window || 60000,
  max: env.rateLimit.maxChat || 200, // افزایش به 200
  message: {
    message: 'Too many chat requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return process.env.NODE_ENV === 'development';
  }
});