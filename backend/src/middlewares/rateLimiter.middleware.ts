// src/middlewares/rateLimiter.middleware.ts
import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

export const rateLimiter = rateLimit({
  windowMs: env.rateLimit.window,
  max: env.rateLimit.max,
  message: {
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => {
    return process.env.NODE_ENV === 'development';
  }
});

export const chatRateLimiter = rateLimit({
  windowMs: env.rateLimit.window,
  max: env.rateLimit.maxChat,
  message: {
    message: 'Too many chat requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => {
    return process.env.NODE_ENV === 'development';
  }
});