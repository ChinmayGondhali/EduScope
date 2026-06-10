/**
 * Simple in-memory rate limiter for Next.js API routes.
 * Note: In serverless environments (like Vercel), this state is only preserved
 * during the lifecycle of the warm lambda. For production at scale, 
 * use a distributed store like Redis.
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitOptions {
  limit: number;     // Max requests
  windowMs: number;  // Time window in milliseconds
}

export function rateLimit(ip: string, options: RateLimitOptions) {
  const now = Date.now();
  const key = `ratelimit_${ip}`;

  if (!store[key] || now > store[key].resetTime) {
    store[key] = {
      count: 1,
      resetTime: now + options.windowMs,
    };
    return { success: true, remaining: options.limit - 1 };
  }

  store[key].count++;

  if (store[key].count > options.limit) {
    return { success: false, remaining: 0 };
  }

  return { success: true, remaining: options.limit - store[key].count };
}

/**
 * Helper to get client IP from NextRequest
 */
import { NextRequest } from 'next/server';

export function getIP(request: NextRequest) {
  return request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
}
