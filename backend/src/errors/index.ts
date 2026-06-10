import { Response, Request, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Base class for all API-related errors
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Specific error classes for common scenarios
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', details?: any) {
    super(message, 400, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed', details?: any) {
    super(message, 500, details);
    this.name = 'DatabaseError';
  }
}

/**
 * Standardized Express error handling middleware
 */
export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    // Only log operational errors at info/warn level depending on status
    if (error.statusCode >= 500) {
      logger.error(error.message, { details: error.details, stack: error.stack }, 'API');
    } else {
      logger.warn(error.message, { details: error.details }, 'API');
    }

    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details,
    });
  }

  // Handle generic errors
  logger.error('Unhandled Exception', { error, stack: error instanceof Error ? error.stack : undefined }, 'SYSTEM');
  
  return res.status(500).json({
    success: false,
    message: error instanceof Error ? error.message : 'An unexpected error occurred',
  });
}
