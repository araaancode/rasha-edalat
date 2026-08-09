// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  const secret = env.jwt.accessSecret;
  if (!secret) throw new Error('JWT_ACCESS_SECRET is not defined');
  
  // استفاده از as any برای رفع خطای تایپ
  return jwt.sign(payload, secret, {
    expiresIn: env.jwt.accessExpiry,
  } as jwt.SignOptions);
}

export function generateRefreshToken(payload: TokenPayload): string {
  const secret = env.jwt.refreshSecret;
  if (!secret) throw new Error('JWT_REFRESH_SECRET is not defined');
  
  // استفاده از as any برای رفع خطای تایپ
  return jwt.sign(payload, secret, {
    expiresIn: env.jwt.refreshExpiry,
  } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const secret = env.jwt.accessSecret;
    if (!secret) throw new Error('JWT_ACCESS_SECRET is not defined');
    
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    const secret = env.jwt.refreshSecret;
    if (!secret) throw new Error('JWT_REFRESH_SECRET is not defined');
    
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
}